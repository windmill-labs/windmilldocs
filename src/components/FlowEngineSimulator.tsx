import React, { useState, useEffect, useRef, useCallback } from 'react';

type StepStatus = 'idle' | 'queued' | 'running' | 'completed';

interface FlowStep {
  id: string;
  label: string;
  duration: number;
  status: StepStatus;
  executionOrder: number;
  progress: number;
}

interface QueuedJob {
  stepId: string;
  label: string;
  duration: number;
  realQueuedAt: number;
  realStartedAt?: number;
  workerId?: number;
}

interface WorkerState {
  id: number;
  currentJob: QueuedJob | null;
}

const INITIAL_STEPS: FlowStep[] = [
  { id: 'step1', label: 'Step 1', duration: 1, executionOrder: 0, status: 'idle', progress: 0 },
  { id: 'branchA', label: 'Branch A', duration: 1, executionOrder: 1, status: 'idle', progress: 0 },
  { id: 'branchB', label: 'Branch B', duration: 3, executionOrder: 1, status: 'idle', progress: 0 },
  { id: 'result', label: 'Result', duration: 1, executionOrder: 2, status: 'idle', progress: 0 },
];

const styles = `
  .fes-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
    padding: 20px;
    background: transparent;
    border-radius: 12px;
    margin: 20px 0;
  }

  .fes-controls-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }

  .fes-controls {
    display: inline-flex;
    gap: 10px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(8px);
    align-items: center;
  }

  [data-theme='dark'] .fes-controls {
    background: rgba(45, 45, 45, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .fes-controls button {
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .fes-controls button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .fes-controls button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .fes-start-btn {
    background: #4caf50;
    color: white;
  }

  .fes-pause-btn {
    background: #ff9800;
    color: white;
  }

  .fes-reset-btn {
    background: #757575;
    color: white;
  }

  .fes-worker-control {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 10px;
    padding-left: 10px;
    border-left: 2px solid #ddd;
  }

  [data-theme='dark'] .fes-worker-control {
    border-left-color: #555;
  }

  .fes-worker-control label {
    font-size: 12px;
    color: #666;
    margin: 0;
    white-space: nowrap;
  }

  [data-theme='dark'] .fes-worker-control label {
    color: #aaa;
  }

  .fes-worker-control input[type="range"] {
    width: 60px;
  }

  .fes-worker-control input[type="range"]:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .fes-worker-control span {
    font-size: 12px;
    min-width: 16px;
    color: #333;
    font-weight: 600;
  }

  [data-theme='dark'] .fes-worker-control span {
    color: #e0e0e0;
  }

  .fes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .fes-grid {
      grid-template-columns: 1fr;
    }
  }

  .fes-panel {
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  [data-theme='dark'] .fes-panel {
    background: rgba(45, 45, 45, 0.7);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .fes-panel-title {
    margin: 0 0 15px 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  [data-theme='dark'] .fes-panel-title {
    color: #e0e0e0;
  }

  /* DAG layout */
  .fes-dag {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    min-height: 320px;
  }

  .fes-node {
    width: 130px;
    padding: 10px 14px;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    border: 2px solid #ddd;
    background: rgba(249, 249, 249, 0.9);
    color: #555;
    position: relative;
    transition: border-color 0.3s, background 0.3s, color 0.3s, box-shadow 0.3s;
  }

  [data-theme='dark'] .fes-node {
    background: rgba(60, 60, 60, 0.9);
    border-color: #555;
    color: #aaa;
  }

  .fes-node-label {
    margin-bottom: 4px;
  }

  .fes-node-duration {
    font-size: 11px;
    font-weight: 400;
    opacity: 0.7;
  }

  .fes-node-progress {
    height: 3px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-top: 6px;
    overflow: hidden;
  }

  [data-theme='dark'] .fes-node-progress {
    background: rgba(255, 255, 255, 0.1);
  }

  .fes-node-progress-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  .fes-node.idle {
    border-color: #ddd;
    background: rgba(249, 249, 249, 0.9);
    color: #555;
  }

  [data-theme='dark'] .fes-node.idle {
    border-color: #555;
    background: rgba(60, 60, 60, 0.9);
    color: #aaa;
  }

  .fes-node.queued {
    border-color: #ff9800;
    background: rgba(255, 243, 224, 0.95);
    color: #f57c00;
    animation: fes-pulse 1.5s ease infinite;
  }

  [data-theme='dark'] .fes-node.queued {
    background: rgba(74, 44, 0, 0.95);
    color: #ffcc80;
  }

  .fes-node.running {
    border-color: #9c27b0;
    background: rgba(243, 229, 245, 0.95);
    color: #7b1fa2;
    animation: fes-working 1s ease infinite;
  }

  [data-theme='dark'] .fes-node.running {
    background: rgba(74, 20, 140, 0.95);
    color: #ce93d8;
  }

  .fes-node.completed {
    border-color: #4caf50;
    background: rgba(232, 245, 233, 0.95);
    color: #388e3c;
    animation: fes-pop-in 0.3s ease;
  }

  [data-theme='dark'] .fes-node.completed {
    background: rgba(27, 94, 32, 0.95);
    color: #a5d6a7;
  }

  @keyframes fes-pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4); }
    50% { transform: scale(1.02); box-shadow: 0 0 8px 2px rgba(255, 152, 0, 0.3); }
  }

  @keyframes fes-working {
    0%, 100% { box-shadow: 0 0 0 0 rgba(156, 39, 176, 0.4); }
    50% { box-shadow: 0 0 12px 3px rgba(156, 39, 176, 0.3); }
  }

  @keyframes fes-pop-in {
    0% { transform: scale(0.95); }
    70% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .fes-connector {
    width: 2px;
    height: 24px;
    background: #ddd;
  }

  [data-theme='dark'] .fes-connector {
    background: #555;
  }

  .fes-connector.active {
    background: #4caf50;
  }

  .fes-branch-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .fes-branch-fork {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    position: relative;
    padding-top: 0;
  }

  .fes-branch-fork::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 80px);
    right: calc(50% - 80px);
    height: 2px;
    background: #ddd;
  }

  [data-theme='dark'] .fes-branch-fork::before {
    background: #555;
  }

  .fes-branch-fork.active::before {
    background: #4caf50;
  }

  .fes-branch-arm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fes-branch-join {
    width: 160px;
    height: 2px;
    background: #ddd;
    position: relative;
  }

  [data-theme='dark'] .fes-branch-join {
    background: #555;
  }

  .fes-branch-join.active {
    background: #4caf50;
  }

  /* Right panel */
  .fes-engine-section {
    margin-bottom: 15px;
  }

  .fes-section-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #888;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .fes-workers-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  .fes-worker-box {
    background: rgba(249, 249, 249, 0.8);
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 8px;
    width: 100px;
    min-height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
  }

  [data-theme='dark'] .fes-worker-box {
    background: rgba(60, 60, 60, 0.8);
    border-color: #555;
  }

  .fes-worker-box.busy {
    border-color: #9c27b0;
    background: rgba(243, 229, 245, 0.9);
    box-shadow: 0 0 10px rgba(156, 39, 176, 0.2);
  }

  [data-theme='dark'] .fes-worker-box.busy {
    background: rgba(74, 20, 140, 0.9);
  }

  .fes-worker-title {
    font-weight: bold;
    font-size: 11px;
    color: #333;
    margin-bottom: 4px;
  }

  [data-theme='dark'] .fes-worker-title {
    color: #e0e0e0;
  }

  .fes-worker-job {
    font-size: 11px;
    font-weight: 600;
    color: #7b1fa2;
    padding: 4px 8px;
    background: rgba(156, 39, 176, 0.1);
    border-radius: 4px;
  }

  [data-theme='dark'] .fes-worker-job {
    color: #ce93d8;
    background: rgba(156, 39, 176, 0.2);
  }

  .fes-worker-idle {
    font-size: 11px;
    color: #999;
  }

  .fes-queue-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 32px;
    align-items: center;
  }

  .fes-queue-item {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    background: rgba(255, 243, 224, 0.95);
    border: 1px solid #ff9800;
    color: #f57c00;
    animation: fes-pulse 1.5s ease infinite;
  }

  [data-theme='dark'] .fes-queue-item {
    background: rgba(74, 44, 0, 0.95);
    color: #ffcc80;
  }

  .fes-completed-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 32px;
    align-items: center;
  }

  .fes-completed-item {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    background: rgba(232, 245, 233, 0.95);
    border: 1px solid #4caf50;
    color: #388e3c;
  }

  [data-theme='dark'] .fes-completed-item {
    background: rgba(27, 94, 32, 0.95);
    color: #a5d6a7;
  }

  .fes-empty-text {
    font-size: 11px;
    color: #999;
    font-style: italic;
  }

  .fes-metrics {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 15px;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  [data-theme='dark'] .fes-metrics {
    border-top-color: rgba(255, 255, 255, 0.08);
  }

  .fes-metric {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.8);
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  [data-theme='dark'] .fes-metric {
    background: rgba(60, 60, 60, 0.8);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .fes-metric-value {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }

  [data-theme='dark'] .fes-metric-value {
    color: #e0e0e0;
  }

  .fes-metric-label {
    font-size: 10px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export default function FlowEngineSimulator() {
  const [numWorkers, setNumWorkers] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [steps, setSteps] = useState<FlowStep[]>(INITIAL_STEPS.map(s => ({ ...s })));
  const [queue, setQueue] = useState<QueuedJob[]>([]);
  const [workers, setWorkers] = useState<WorkerState[]>([]);
  const [completed, setCompleted] = useState<QueuedJob[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  const animationFrame = useRef<number>();
  const simStartTime = useRef(0);
  const stepsRef = useRef(steps);
  const queueRef = useRef(queue);
  const workersRef = useRef(workers);
  const completedRef = useRef(completed);
  const currentOrder = useRef(0);
  const orderQueued = useRef(false);
  const simulationDone = useRef(false);

  stepsRef.current = steps;
  queueRef.current = queue;
  workersRef.current = workers;
  completedRef.current = completed;

  const initWorkers = useCallback((count: number): WorkerState[] => {
    return Array.from({ length: count }, (_, i) => ({ id: i, currentJob: null }));
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      setWorkers(initWorkers(numWorkers));
    }
  }, [numWorkers, hasStarted, initWorkers]);

  const handleReset = () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    setIsRunning(false);
    setHasStarted(false);
    setSteps(INITIAL_STEPS.map(s => ({ ...s })));
    setQueue([]);
    setWorkers(initWorkers(numWorkers));
    setCompleted([]);
    setElapsedTime(0);
    currentOrder.current = 0;
    orderQueued.current = false;
    simulationDone.current = false;
  };

  const handleStart = () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }
    if (hasStarted) {
      simStartTime.current = Date.now() - elapsedTime * 1000;
      setIsRunning(true);
      return;
    }
    simStartTime.current = Date.now();
    currentOrder.current = 0;
    orderQueued.current = false;
    simulationDone.current = false;
    setSteps(INITIAL_STEPS.map(s => ({ ...s })));
    setQueue([]);
    setWorkers(initWorkers(numWorkers));
    setCompleted([]);
    setElapsedTime(0);
    setHasStarted(true);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      return;
    }

    const QUEUE_DELAY_MS = 300;

    const simulate = () => {
      const now = Date.now();
      const newSteps = stepsRef.current.map(s => ({ ...s }));
      const newQueue = [...queueRef.current];
      const newWorkers = workersRef.current.map(w => ({
        ...w,
        currentJob: w.currentJob ? { ...w.currentJob } : null,
      }));
      const newCompleted = [...completedRef.current];

      // Complete finished jobs
      for (const worker of newWorkers) {
        if (worker.currentJob && worker.currentJob.realStartedAt) {
          const elapsed = (now - worker.currentJob.realStartedAt) / 1000;
          const step = newSteps.find(s => s.id === worker.currentJob!.stepId);
          if (step && step.status === 'running') {
            step.progress = Math.min(1, elapsed / worker.currentJob.duration);
          }
          if (elapsed >= worker.currentJob.duration) {
            if (step) {
              step.status = 'completed';
              step.progress = 1;
            }
            newCompleted.push(worker.currentJob);
            worker.currentJob = null;
          }
        }
      }

      // Check if current order is fully complete
      const currentOrderSteps = newSteps.filter(s => s.executionOrder === currentOrder.current);
      const allCurrentDone = currentOrderSteps.every(s => s.status === 'completed');

      if (allCurrentDone && orderQueued.current) {
        const maxOrder = Math.max(...INITIAL_STEPS.map(s => s.executionOrder));
        if (currentOrder.current < maxOrder) {
          currentOrder.current++;
          orderQueued.current = false;
        } else {
          // All done
          simulationDone.current = true;
        }
      }

      // Queue steps for current order if not yet queued
      if (!orderQueued.current && !simulationDone.current) {
        const toQueue = newSteps.filter(
          s => s.executionOrder === currentOrder.current && s.status === 'idle'
        );
        for (const step of toQueue) {
          step.status = 'queued';
          step.progress = 0;
          newQueue.push({
            stepId: step.id,
            label: step.label,
            duration: step.duration,
            realQueuedAt: now,
          });
        }
        if (toQueue.length > 0) {
          orderQueued.current = true;
        }
      }

      // Assign queued jobs to idle workers
      for (const worker of newWorkers) {
        if (!worker.currentJob && newQueue.length > 0) {
          const eligibleIdx = newQueue.findIndex(j => now - j.realQueuedAt >= QUEUE_DELAY_MS);
          if (eligibleIdx === -1) continue;
          const job = newQueue.splice(eligibleIdx, 1)[0];
          job.realStartedAt = now;
          job.workerId = worker.id;
          worker.currentJob = job;
          const step = newSteps.find(s => s.id === job.stepId);
          if (step) {
            step.status = 'running';
            step.progress = 0;
          }
        }
      }

      const elapsed = (now - simStartTime.current) / 1000;

      setSteps(newSteps);
      setQueue(newQueue);
      setWorkers(newWorkers);
      setCompleted(newCompleted);
      setElapsedTime(elapsed);

      if (simulationDone.current) {
        setIsRunning(false);
        return;
      }

      animationFrame.current = requestAnimationFrame(simulate);
    };

    animationFrame.current = requestAnimationFrame(simulate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [isRunning]);

  const isComplete = hasStarted && !isRunning && steps.every(s => s.status === 'completed');

  const getStep = (id: string) => steps.find(s => s.id === id)!;
  const step1 = getStep('step1');
  const branchA = getStep('branchA');
  const branchB = getStep('branchB');
  const result = getStep('result');

  const branchesActive =
    branchA.status === 'completed' || branchB.status === 'completed' ||
    branchA.status === 'running' || branchB.status === 'running' ||
    branchA.status === 'queued' || branchB.status === 'queued';
  const joinActive = branchA.status === 'completed' && branchB.status === 'completed';

  const progressColor = (step: FlowStep) => {
    if (step.status === 'running') return '#9c27b0';
    if (step.status === 'completed') return '#4caf50';
    return 'transparent';
  };

  const renderNode = (step: FlowStep) => (
    <div className={`fes-node ${step.status}`}>
      <div className="fes-node-label">{step.label}</div>
      <div className="fes-node-duration">{step.duration}s</div>
      {(step.status === 'running' || step.status === 'completed') && (
        <div className="fes-node-progress">
          <div
            className="fes-node-progress-fill"
            style={{
              width: `${step.progress * 100}%`,
              background: progressColor(step),
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="fes-container">
        <div className="fes-controls-wrapper">
          <div className="fes-controls">
            {!isComplete && (
              <button
                onClick={handleStart}
                className={isRunning ? 'fes-pause-btn' : 'fes-start-btn'}
              >
                {isRunning ? '⏸ Pause' : hasStarted ? '▶ Resume' : '▶ Start'}
              </button>
            )}
            <button onClick={handleReset} className="fes-reset-btn">↺ Reset</button>
            <div className="fes-worker-control">
              <label>Workers:</label>
              <input
                type="range"
                min="1"
                max="4"
                value={numWorkers}
                onChange={e => setNumWorkers(parseInt(e.target.value))}
                disabled={hasStarted}
              />
              <span>{numWorkers}</span>
            </div>
          </div>
        </div>

        <div className="fes-grid">
          {/* Left panel: DAG */}
          <div className="fes-panel">
            <div className="fes-panel-title">Flow visualization</div>
            <div className="fes-dag">
              {renderNode(step1)}
              <div
                className={`fes-connector ${step1.status === 'completed' ? 'active' : ''}`}
              />
              <div className="fes-branch-container">
                <div className={`fes-branch-fork ${branchesActive ? 'active' : ''}`}>
                  <div className="fes-branch-arm">
                    <div
                      className={`fes-connector ${branchesActive ? 'active' : ''}`}
                    />
                    {renderNode(branchA)}
                    <div
                      className={`fes-connector ${branchA.status === 'completed' ? 'active' : ''}`}
                    />
                  </div>
                  <div className="fes-branch-arm">
                    <div
                      className={`fes-connector ${branchesActive ? 'active' : ''}`}
                    />
                    {renderNode(branchB)}
                    <div
                      className={`fes-connector ${branchB.status === 'completed' ? 'active' : ''}`}
                    />
                  </div>
                </div>
                <div className={`fes-branch-join ${joinActive ? 'active' : ''}`} />
              </div>
              <div className={`fes-connector ${joinActive ? 'active' : ''}`} />
              {renderNode(result)}
            </div>
          </div>

          {/* Right panel: Engine */}
          <div className="fes-panel">
            <div className="fes-panel-title">Execution engine</div>

            <div className="fes-engine-section">
              <div className="fes-section-label">Workers</div>
              <div className="fes-workers-grid">
                {workers.map(w => (
                  <div
                    key={w.id}
                    className={`fes-worker-box ${w.currentJob ? 'busy' : ''}`}
                  >
                    <div className="fes-worker-title">W{w.id + 1}</div>
                    {w.currentJob ? (
                      <div className="fes-worker-job">{w.currentJob.label}</div>
                    ) : (
                      <div className="fes-worker-idle">Idle</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="fes-engine-section">
              <div className="fes-section-label">Queue</div>
              <div className="fes-queue-items">
                {queue.length === 0 && (
                  <span className="fes-empty-text">Empty</span>
                )}
                {queue.map(j => (
                  <div key={j.stepId} className="fes-queue-item">{j.label}</div>
                ))}
              </div>
            </div>

            <div className="fes-engine-section">
              <div className="fes-section-label">Completed</div>
              <div className="fes-completed-items">
                {completed.length === 0 && (
                  <span className="fes-empty-text">None yet</span>
                )}
                {completed.map(j => (
                  <div key={j.stepId} className="fes-completed-item">{j.label}</div>
                ))}
              </div>
            </div>

            {hasStarted && (
              <div className="fes-metrics">
                <div className="fes-metric">
                  <div>
                    <div className="fes-metric-value">{elapsedTime.toFixed(1)}s</div>
                    <div className="fes-metric-label">Elapsed</div>
                  </div>
                </div>
                <div className="fes-metric">
                  <div>
                    <div className="fes-metric-value">{completed.length}/4</div>
                    <div className="fes-metric-label">Steps done</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
