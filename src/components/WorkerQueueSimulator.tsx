import React, { useState, useEffect, useRef } from 'react';

interface Job {
  id: number;
  submittedAt: number;
  queuedAt?: number;
  startedAt?: number;
  completedAt?: number;
  workerId?: number;
  realQueuedAt?: number;
  realStartedAt?: number;
}

interface Worker {
  id: number;
  currentJob: Job | null;
  totalIdleTime: number;
  totalBusyTime: number;
  lastStateChange: number;
  isIdle: boolean;
}

interface Metrics {
  throughput: number;
  elapsedTime: number;
  completedJobs: number;
}

interface SimulationState {
  jobPool: Job[];
  jobQueue: Job[];
  workers: Worker[];
  completedJobs: Job[];
  metrics: Metrics;
}

const styles = `
  .wqs-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
    padding: 20px;
    background: transparent;
    border-radius: 12px;
    margin: 20px 0;
  }

  .wqs-controls {
    display: inline-flex;
    gap: 10px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(8px);
  }

  .wqs-controls-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }

  [data-theme='dark'] .wqs-controls {
    background: rgba(45, 45, 45, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .wqs-controls button {
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .wqs-controls button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .wqs-controls button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .wqs-start-btn {
    background: #4caf50;
    color: white;
  }

  .wqs-pause-btn {
    background: #ff9800;
    color: white;
  }

  .wqs-reset-btn {
    background: #757575;
    color: white;
  }

  .wqs-flow-pipeline {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wqs-flow-pipeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #e0e0e0;
    transform: translateX(-50%);
    z-index: 0;
  }

  [data-theme='dark'] .wqs-flow-pipeline::before {
    background: #444;
  }

  .wqs-flow-pipeline.running::before {
    background: linear-gradient(180deg, #2196f3 0%, #2196f3 50%, transparent 50%, transparent 100%);
    background-size: 4px 20px;
    animation: wqsFlowDown 0.5s linear infinite;
  }

  @keyframes wqsFlowDown {
    0% { background-position: 0 0; }
    100% { background-position: 0 20px; }
  }

  .wqs-flow-node {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 800px;
  }

  .wqs-flow-connector {
    height: 40px;
    position: relative;
    z-index: 1;
  }

  .wqs-flow-connector::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #e0e0e0;
    transform: translateX(-50%);
  }

  [data-theme='dark'] .wqs-flow-connector::before {
    background: #444;
  }

  .running .wqs-flow-connector::before {
    background: linear-gradient(180deg, #2196f3 0%, #2196f3 50%, transparent 50%, transparent 100%);
    background-size: 4px 20px;
    animation: wqsFlowDown 0.5s linear infinite;
  }

  .wqs-flow-dot {
    position: absolute;
    left: 50%;
    width: 10px;
    height: 10px;
    background: #2196f3;
    border-radius: 50%;
    transform: translateX(-50%);
    opacity: 0;
    box-shadow: 0 0 6px 2px rgba(33, 150, 243, 0.5);
  }

  .running .wqs-flow-dot {
    animation: wqsFlowDot 0.8s ease-in-out infinite;
  }

  .running .wqs-flow-dot:nth-child(2) {
    animation-delay: 0.4s;
  }

  @keyframes wqsFlowDot {
    0% { top: -5px; opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { top: calc(100% + 5px); opacity: 0; }
  }

  .wqs-box {
    background: rgba(255, 255, 255, 0.7);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 100px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  [data-theme='dark'] .wqs-box {
    background: rgba(45, 45, 45, 0.7);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .wqs-box h3 {
    margin: 0 0 10px 0;
    text-align: center;
    font-size: 14px;
    color: #333;
  }

  [data-theme='dark'] .wqs-box h3 {
    color: #e0e0e0;
  }

  .wqs-inline-control {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    margin-bottom: 10px;
    justify-content: center;
  }

  [data-theme='dark'] .wqs-inline-control {
    background: rgba(255, 255, 255, 0.05);
  }

  .wqs-inline-control label {
    font-size: 12px;
    color: #666;
    margin: 0;
    white-space: nowrap;
  }

  [data-theme='dark'] .wqs-inline-control label {
    color: #aaa;
  }

  .wqs-inline-control input[type="range"] {
    flex: 1;
    min-width: 60px;
    max-width: 100px;
  }

  .wqs-inline-control input[type="range"]:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .wqs-inline-control span {
    font-size: 12px;
    min-width: 25px;
    color: #333;
  }

  [data-theme='dark'] .wqs-inline-control span {
    color: #e0e0e0;
  }

  .wqs-jobs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    min-height: 50px;
    justify-content: center;
  }

  .wqs-job {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-weight: bold;
    font-size: 11px;
    transition: all 0.3s ease;
  }

  @keyframes wqsSlideDown {
    from { opacity: 0; transform: translateY(-15px) scale(0.8); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes wqsPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4); }
    50% { transform: scale(1.02); box-shadow: 0 0 8px 2px rgba(255, 152, 0, 0.3); }
  }

  @keyframes wqsPopIn {
    0% { opacity: 0; transform: scale(0.5); }
    70% { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes wqsWorking {
    0%, 100% { box-shadow: 0 0 0 0 rgba(156, 39, 176, 0.4); }
    50% { box-shadow: 0 0 12px 3px rgba(156, 39, 176, 0.3); }
  }

  .wqs-pool-job {
    background: #e3f2fd;
    border: 2px solid #2196f3;
    color: #1976d2;
  }

  [data-theme='dark'] .wqs-pool-job {
    background: #1a237e;
    border-color: #42a5f5;
    color: #90caf9;
  }

  .wqs-queue-job {
    background: #fff3e0;
    border: 2px solid #ff9800;
    color: #f57c00;
    animation: wqsSlideDown 0.3s ease, wqsPulse 1.5s ease infinite 0.3s;
  }

  [data-theme='dark'] .wqs-queue-job {
    background: #4a2c00;
    border-color: #ffb74d;
    color: #ffcc80;
  }

  .wqs-working-job {
    background: #f3e5f5;
    border: 2px solid #9c27b0;
    color: #7b1fa2;
    animation: wqsPopIn 0.3s ease, wqsWorking 1s ease infinite 0.3s;
  }

  [data-theme='dark'] .wqs-working-job {
    background: #4a148c;
    border-color: #ba68c8;
    color: #ce93d8;
  }

  .wqs-completed-job {
    background: #e8f5e9;
    border: 2px solid #4caf50;
    color: #388e3c;
    animation: wqsSlideDown 0.3s ease;
  }

  [data-theme='dark'] .wqs-completed-job {
    background: #1b5e20;
    border-color: #81c784;
    color: #a5d6a7;
  }

  .wqs-valve-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

  .wqs-valve {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(8px);
  }

  [data-theme='dark'] .wqs-valve {
    background: rgba(45, 45, 45, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .wqs-valve-btn {
    padding: 8px 16px;
    border: 2px solid #ddd;
    background: white;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s;
  }

  [data-theme='dark'] .wqs-valve-btn {
    background: #3d3d3d;
    border-color: #555;
    color: #e0e0e0;
  }

  .wqs-valve-btn:hover:not(:disabled) {
    border-color: #2196f3;
    background: #e3f2fd;
  }

  [data-theme='dark'] .wqs-valve-btn:hover:not(:disabled) {
    background: #1a237e;
  }

  .wqs-valve-btn.active {
    border-color: #2196f3;
    background: #2196f3;
    color: white;
  }

  .wqs-valve-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .wqs-valve-settings {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 15px;
    padding-left: 15px;
    border-left: 2px solid #ddd;
  }

  [data-theme='dark'] .wqs-valve-settings {
    border-left-color: #555;
  }

  .wqs-valve-settings input[type="range"] {
    width: 80px;
  }

  .wqs-valve-settings span {
    font-size: 12px;
    min-width: 60px;
    color: #333;
  }

  [data-theme='dark'] .wqs-valve-settings span {
    color: #e0e0e0;
  }

  .wqs-workers-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  .wqs-worker-box {
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 8px;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
  }

  [data-theme='dark'] .wqs-worker-box {
    background: rgba(60, 60, 60, 0.8);
    border-color: #555;
  }

  .wqs-worker-box.idle {
    border-color: #ccc;
    background: rgba(249, 249, 249, 0.8);
  }

  [data-theme='dark'] .wqs-worker-box.idle {
    border-color: #444;
    background: rgba(45, 45, 45, 0.8);
  }

  .wqs-worker-box.busy {
    border-color: #9c27b0;
    background: rgba(252, 228, 236, 0.9);
    box-shadow: 0 0 10px rgba(156, 39, 176, 0.3);
  }

  [data-theme='dark'] .wqs-worker-box.busy {
    background: rgba(74, 20, 140, 0.9);
  }

  .wqs-worker-title {
    font-weight: bold;
    font-size: 11px;
    margin-bottom: 5px;
    flex-shrink: 0;
    color: #333;
  }

  [data-theme='dark'] .wqs-worker-title {
    color: #e0e0e0;
  }

  .wqs-worker-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .wqs-worker-content .wqs-job {
    width: 36px;
    height: 36px;
    font-size: 10px;
  }

  .wqs-worker-idle-text {
    color: #999;
    font-size: 11px;
  }

  .wqs-metrics-panel {
    margin-top: 15px;
    padding: 15px;
    background: rgba(248, 249, 250, 0.5);
    border-radius: 12px;
    backdrop-filter: blur(8px);
  }

  [data-theme='dark'] .wqs-metrics-panel {
    background: rgba(30, 30, 30, 0.5);
  }

  .wqs-metrics-row {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  .wqs-metric-card {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px 14px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    min-width: 100px;
    backdrop-filter: blur(4px);
  }

  [data-theme='dark'] .wqs-metric-card {
    background: rgba(60, 60, 60, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .wqs-metric-card.clickable {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .wqs-metric-card.clickable:hover {
    background: #f8f9fa;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  [data-theme='dark'] .wqs-metric-card.clickable:hover {
    background: #4d4d4d;
  }

  .wqs-metric-icon {
    font-size: 18px;
  }

  .wqs-metric-content {
    display: flex;
    flex-direction: column;
  }

  .wqs-metric-value {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    line-height: 1.2;
  }

  [data-theme='dark'] .wqs-metric-value {
    color: #e0e0e0;
  }

  .wqs-metric-label {
    font-size: 10px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .wqs-worker-metrics {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 350px;
    margin: 0 auto;
  }

  .wqs-worker-metric {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .wqs-worker-metric-label {
    font-size: 11px;
    font-weight: 600;
    color: #666;
    min-width: 25px;
  }

  [data-theme='dark'] .wqs-worker-metric-label {
    color: #aaa;
  }

  .wqs-occupancy-bar {
    flex: 1;
    height: 6px;
    background: #e0e0e0;
    border-radius: 3px;
    overflow: hidden;
  }

  [data-theme='dark'] .wqs-occupancy-bar {
    background: #444;
  }

  .wqs-occupancy-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .wqs-worker-metric-value {
    font-size: 11px;
    font-weight: bold;
    color: #333;
    min-width: 30px;
    text-align: right;
  }

  [data-theme='dark'] .wqs-worker-metric-value {
    color: #e0e0e0;
  }
`;

export default function WorkerQueueSimulator() {
  const [mode, setMode] = useState<'batch' | 'continuous' | 'random'>('continuous');
  const [jobsPerSecond, setJobsPerSecond] = useState(3);
  const [jobsPerSecondMin, setJobsPerSecondMin] = useState(1);
  const [jobsPerSecondMax, setJobsPerSecondMax] = useState(5);
  const [poolSize, setPoolSize] = useState(15);
  const [jobDuration, setJobDuration] = useState(1);
  const [numWorkers, setNumWorkers] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showWorkerMetrics, setShowWorkerMetrics] = useState(false);

  const [simState, setSimState] = useState<SimulationState>({
    jobPool: [],
    jobQueue: [],
    workers: [],
    completedJobs: [],
    metrics: { throughput: 0, elapsedTime: 0, completedJobs: 0 }
  });

  const jobIdCounter = useRef(0);
  const realStartTime = useRef(0);
  const lastRealSubmission = useRef(0);
  const nextJobIndex = useRef(0);
  const animationFrame = useRef<number>();
  const simulationComplete = useRef(false);

  useEffect(() => {
    if (!isRunning) {
      const newWorkers: Worker[] = [];
      for (let i = 0; i < numWorkers; i++) {
        newWorkers.push({
          id: i,
          currentJob: null,
          totalIdleTime: 0,
          totalBusyTime: 0,
          lastStateChange: 0,
          isIdle: true
        });
      }
      const previewPool: Job[] = [];
      for (let i = 0; i < poolSize; i++) {
        previewPool.push({ id: i, submittedAt: 0 });
      }
      setSimState(prev => ({ ...prev, workers: newWorkers, jobPool: previewPool }));
    }
  }, [numWorkers, poolSize]);

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    jobIdCounter.current = 0;
    realStartTime.current = 0;
    lastRealSubmission.current = 0;
    nextJobIndex.current = 0;
    simulationComplete.current = false;

    const previewPool: Job[] = [];
    for (let i = 0; i < poolSize; i++) {
      previewPool.push({ id: i, submittedAt: 0 });
    }

    const newWorkers: Worker[] = [];
    for (let i = 0; i < numWorkers; i++) {
      newWorkers.push({
        id: i,
        currentJob: null,
        totalIdleTime: 0,
        totalBusyTime: 0,
        lastStateChange: 0,
        isIdle: true
      });
    }

    setSimState({
      jobPool: previewPool,
      jobQueue: [],
      workers: newWorkers,
      completedJobs: [],
      metrics: { throughput: 0, elapsedTime: 0, completedJobs: 0 }
    });
  };

  const handleStart = () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }

    if (hasStarted) {
      setIsRunning(true);
      return;
    }

    jobIdCounter.current = 0;
    realStartTime.current = Date.now();
    lastRealSubmission.current = Date.now();
    nextJobIndex.current = 0;
    simulationComplete.current = false;

    const initialPool: Job[] = [];
    for (let i = 0; i < poolSize; i++) {
      initialPool.push({
        id: jobIdCounter.current++,
        submittedAt: 0
      });
    }

    const newWorkers: Worker[] = [];
    for (let i = 0; i < numWorkers; i++) {
      newWorkers.push({
        id: i,
        currentJob: null,
        totalIdleTime: 0,
        totalBusyTime: 0,
        lastStateChange: 0,
        isIdle: true
      });
    }

    setSimState({
      jobPool: initialPool,
      jobQueue: [],
      workers: newWorkers,
      completedJobs: [],
      metrics: { throughput: 0, elapsedTime: 0, completedJobs: 0 }
    });

    setHasStarted(true);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      return;
    }

    const simulate = () => {
      const realNow = Date.now();

      setSimState(prevState => {
        const newPool = [...prevState.jobPool];
        const newQueue = [...prevState.jobQueue];
        const newCompleted = [...prevState.completedJobs];

        const newWorkers = prevState.workers.map(w => ({
          id: w.id,
          currentJob: w.currentJob ? { ...w.currentJob } : null,
          totalIdleTime: w.totalIdleTime,
          totalBusyTime: w.totalBusyTime,
          lastStateChange: w.lastStateChange,
          isIdle: w.isIdle
        }));

        for (const worker of newWorkers) {
          if (worker.currentJob && worker.currentJob.startedAt !== undefined) {
            const realJobStart = worker.currentJob.realStartedAt!;
            const realJobElapsed = (realNow - realJobStart) / 1000;
            if (realJobElapsed >= jobDuration) {
              worker.currentJob.completedAt = worker.currentJob.startedAt + jobDuration;
              const simTimeDelta = worker.currentJob.completedAt - worker.lastStateChange;
              worker.totalBusyTime += simTimeDelta;
              worker.lastStateChange = worker.currentJob.completedAt;
              newCompleted.push(worker.currentJob);
              worker.currentJob = null;
              worker.isIdle = true;
            }
          }
        }

        const minVisualQueueTime = 350;

        if (mode === 'continuous' && newPool.length > 0) {
          const realTimeSinceLastSubmission = (realNow - lastRealSubmission.current) / 1000;
          const interval = 1 / jobsPerSecond;

          if (realTimeSinceLastSubmission >= interval || nextJobIndex.current === 0) {
            const job = newPool.shift()!;
            job.queuedAt = nextJobIndex.current / jobsPerSecond;
            job.realQueuedAt = realNow;
            newQueue.push(job);
            lastRealSubmission.current = realNow;
            nextJobIndex.current++;
          }
        } else if (mode === 'batch' && newPool.length > 0 && newQueue.length === 0 && newWorkers.every(w => !w.currentJob)) {
          const submitted = newPool.splice(0);
          submitted.forEach((job, i) => {
            job.queuedAt = 0;
            job.realQueuedAt = realNow + i * 50;
          });
          newQueue.push(...submitted);
        } else if (mode === 'random' && newPool.length > 0) {
          const realTimeSinceLastSubmission = (realNow - lastRealSubmission.current) / 1000;
          const randomRate = jobsPerSecondMin + Math.random() * (jobsPerSecondMax - jobsPerSecondMin);
          const randomInterval = 1 / randomRate;
          if (realTimeSinceLastSubmission >= randomInterval || nextJobIndex.current === 0) {
            const job = newPool.shift()!;
            job.queuedAt = nextJobIndex.current / ((jobsPerSecondMin + jobsPerSecondMax) / 2);
            job.realQueuedAt = realNow;
            newQueue.push(job);
            lastRealSubmission.current = realNow;
            nextJobIndex.current++;
          }
        }

        for (const worker of newWorkers) {
          if (!worker.currentJob && newQueue.length > 0) {
            const eligibleIndex = newQueue.findIndex(j => realNow - j.realQueuedAt! >= minVisualQueueTime);
            if (eligibleIndex === -1) continue;
            const job = newQueue.splice(eligibleIndex, 1)[0];

            const workerAvailableAt = worker.lastStateChange;
            job.startedAt = Math.max(job.queuedAt!, workerAvailableAt);
            job.workerId = worker.id;

            const idleTime = job.startedAt - worker.lastStateChange;
            if (idleTime > 0) {
              worker.totalIdleTime += idleTime;
            }
            worker.lastStateChange = job.startedAt;
            job.realStartedAt = realNow;
            worker.currentJob = job;
            worker.isIdle = false;
          }
        }

        const isComplete = newPool.length === 0 && newQueue.length === 0 && newWorkers.every(w => !w.currentJob);
        if (isComplete) {
          simulationComplete.current = true;
        }

        let maxCompletionTime = 0;
        for (const job of newCompleted) {
          if (job.completedAt && job.completedAt > maxCompletionTime) {
            maxCompletionTime = job.completedAt;
          }
        }

        const elapsedTime = maxCompletionTime;
        const throughput = elapsedTime > 0 ? newCompleted.length / elapsedTime : 0;

        return {
          jobPool: newPool,
          jobQueue: newQueue,
          workers: newWorkers,
          completedJobs: newCompleted,
          metrics: { throughput, elapsedTime, completedJobs: newCompleted.length }
        };
      });

      if (simulationComplete.current) {
        setIsRunning(false);
        return;
      }

      animationFrame.current = requestAnimationFrame(simulate);
    };

    animationFrame.current = requestAnimationFrame(simulate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isRunning, mode, jobsPerSecond, jobsPerSecondMin, jobsPerSecondMax, jobDuration]);

  const isSimComplete = hasStarted && !isRunning && simState.jobPool.length === 0 && simState.jobQueue.length === 0 && simState.workers.every(w => !w.currentJob);

  return (
    <>
      <style>{styles}</style>
      <div className="wqs-container">
        <div className="wqs-controls-wrapper">
          <div className="wqs-controls">
            {!isSimComplete && (
              <button
                onClick={handleStart}
                className={isRunning ? 'wqs-pause-btn' : 'wqs-start-btn'}
              >
                {isRunning ? '⏸ Pause' : (hasStarted ? '▶ Resume' : '▶ Start')}
              </button>
            )}
            <button onClick={handleReset} className="wqs-reset-btn">↺ Reset</button>
          </div>
        </div>

        <div className={`wqs-flow-pipeline ${isRunning ? 'running' : ''}`}>
          {/* Job Pool */}
          <div className="wqs-flow-node">
            <div className="wqs-box">
              <h3>Job pool ({simState.jobPool.length})</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                {!hasStarted && (
                  <div className="wqs-inline-control">
                    <label>Jobs:</label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={poolSize}
                      onChange={(e) => setPoolSize(parseInt(e.target.value))}
                    />
                    <span>{poolSize}</span>
                  </div>
                )}
                <div className="wqs-inline-control">
                  <label>Duration:</label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.5"
                    value={jobDuration}
                    onChange={(e) => setJobDuration(parseFloat(e.target.value))}
                    disabled={hasStarted}
                  />
                  <span>{jobDuration}s</span>
                </div>
              </div>
              <div className="wqs-jobs-container">
                {simState.jobPool.map((job) => (
                  <div key={job.id} className="wqs-job wqs-pool-job">{job.id}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="wqs-flow-connector">
            <div className="wqs-flow-dot"></div>
            <div className="wqs-flow-dot"></div>
          </div>

          {/* Valve */}
          <div className="wqs-flow-node">
            <div className="wqs-valve-container">
              <div className="wqs-valve">
                {!hasStarted ? (
                  <>
                    <button
                      className={`wqs-valve-btn ${mode === 'batch' ? 'active' : ''}`}
                      onClick={() => setMode('batch')}
                    >
                      Batch
                    </button>
                    <button
                      className={`wqs-valve-btn ${mode === 'continuous' ? 'active' : ''}`}
                      onClick={() => setMode('continuous')}
                    >
                      Continuous
                    </button>
                    <button
                      className={`wqs-valve-btn ${mode === 'random' ? 'active' : ''}`}
                      onClick={() => setMode('random')}
                    >
                      Random
                    </button>
                  </>
                ) : (
                  <button className="wqs-valve-btn active" disabled>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                )}

                {mode === 'continuous' && (
                  <div className="wqs-valve-settings">
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.5"
                      value={jobsPerSecond}
                      onChange={(e) => setJobsPerSecond(parseFloat(e.target.value))}
                      disabled={hasStarted}
                    />
                    <span>{jobsPerSecond} jobs/s</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="wqs-flow-connector">
            <div className="wqs-flow-dot"></div>
            <div className="wqs-flow-dot"></div>
          </div>

          {/* Queue */}
          <div className="wqs-flow-node">
            <div className="wqs-box">
              <h3>Job queue ({simState.jobQueue.length})</h3>
              <div className="wqs-jobs-container">
                {simState.jobQueue.map((job) => (
                  <div key={job.id} className="wqs-job wqs-queue-job">{job.id}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="wqs-flow-connector">
            <div className="wqs-flow-dot"></div>
            <div className="wqs-flow-dot"></div>
          </div>

          {/* Workers */}
          <div className="wqs-flow-node">
            <div className="wqs-box">
              <h3>Workers</h3>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <div className="wqs-inline-control">
                  <label>Count:</label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={numWorkers}
                    onChange={(e) => setNumWorkers(parseInt(e.target.value))}
                    disabled={hasStarted}
                  />
                  <span>{numWorkers}</span>
                </div>
              </div>
              <div className="wqs-workers-container">
                {simState.workers.map((worker) => (
                  <div
                    key={worker.id}
                    className={`wqs-worker-box ${worker.currentJob ? 'busy' : 'idle'}`}
                  >
                    <div className="wqs-worker-title">W{worker.id + 1}</div>
                    <div className="wqs-worker-content">
                      {worker.currentJob ? (
                        <div className="wqs-job wqs-working-job">{worker.currentJob.id}</div>
                      ) : (
                        <div className="wqs-worker-idle-text">Idle</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="wqs-flow-connector">
            <div className="wqs-flow-dot"></div>
            <div className="wqs-flow-dot"></div>
          </div>

          {/* Completed */}
          <div className="wqs-flow-node">
            <div className="wqs-box">
              <h3>Completed ({simState.completedJobs.length})</h3>
              <div className="wqs-jobs-container">
                {simState.completedJobs.map((job) => (
                  <div key={job.id} className="wqs-job wqs-completed-job">{job.id}</div>
                ))}
              </div>

              {hasStarted && (
                <div className="wqs-metrics-panel">
                  <div className="wqs-metrics-row">
                    <div className="wqs-metric-card">
                      <span className="wqs-metric-icon">⏱</span>
                      <div className="wqs-metric-content">
                        <span className="wqs-metric-value">{simState.metrics.elapsedTime.toFixed(2)}s</span>
                        <span className="wqs-metric-label">Elapsed</span>
                      </div>
                    </div>
                    <div className="wqs-metric-card">
                      <span className="wqs-metric-icon">⚡</span>
                      <div className="wqs-metric-content">
                        <span className="wqs-metric-value">{simState.metrics.throughput.toFixed(2)}</span>
                        <span className="wqs-metric-label">Jobs/sec</span>
                      </div>
                    </div>
                    <div
                      className="wqs-metric-card clickable"
                      onClick={() => setShowWorkerMetrics(!showWorkerMetrics)}
                    >
                      <span className="wqs-metric-icon">📊</span>
                      <div className="wqs-metric-content">
                        <span className="wqs-metric-value">
                          {simState.workers.length > 0
                            ? (simState.workers.reduce((sum, w) => {
                                const total = w.totalIdleTime + w.totalBusyTime;
                                return sum + (total > 0 ? (w.totalBusyTime / total) * 100 : 0);
                              }, 0) / simState.workers.length).toFixed(0)
                            : 0}%
                        </span>
                        <span className="wqs-metric-label">Avg occupancy {showWorkerMetrics ? '▲' : '▼'}</span>
                      </div>
                    </div>
                  </div>

                  {showWorkerMetrics && (
                    <div className="wqs-worker-metrics">
                      {simState.workers.map((worker) => {
                        const totalTime = worker.totalIdleTime + worker.totalBusyTime;
                        const occupancy = totalTime > 0 ? (worker.totalBusyTime / totalTime) * 100 : 0;
                        return (
                          <div key={worker.id} className="wqs-worker-metric">
                            <span className="wqs-worker-metric-label">W{worker.id + 1}</span>
                            <div className="wqs-occupancy-bar">
                              <div className="wqs-occupancy-fill" style={{ width: `${occupancy}%` }}></div>
                            </div>
                            <span className="wqs-worker-metric-value">{occupancy.toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
