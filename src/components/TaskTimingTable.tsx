import React from 'react';
import {
  getTaskTimings,
  Engine,
  Usecase,
  Scenario,
  Language,
  TaskTiming
} from '../utils/benchmarkLoader';

interface TaskTimingTableProps {
  usecase: Usecase;
  scenario: Scenario;
  language: Language;
  engine: Engine;
  workers?: number;
}

export function TaskTimingTable({
  usecase,
  language,
  engine,
  workers = 1
}: TaskTimingTableProps) {
  let timings: TaskTiming[] = [];
  let error: string | null = null;

  try {
    timings = getTaskTimings(engine, usecase, language, workers);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred';
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Check if we have worker execution data
  const hasWorkerData = timings.length > 0 && timings[0].worker_execution !== undefined;
  return (
    <div className="task-timing-table text-xs">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-1 px-2 text-left">Task</th>
            <th className="py-1 px-2 text-right">Created at</th>
            <th className="py-1 px-2 text-right">Started at</th>
            <th className="py-1 px-2 text-right">Completed at</th>
            {hasWorkerData && <th className="py-1 px-2 text-center">Worker ID</th>}
          </tr>
        </thead>
        <tbody>
          {timings.map((timing, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-1 px-2 text-left"><strong>task_{index.toString().padStart(2, '0')}</strong></td>
              <td className="py-1 px-2 text-right">{timing.created_at.toFixed(3)}</td>
              <td className="py-1 px-2 text-right">{timing.started_at.toFixed(3)}</td>
              <td className="py-1 px-2 text-right">{timing.completed_at.toFixed(3)}</td>
              {hasWorkerData && (
                <td className="py-1 px-2 text-center">
                  <span className="worker-badge inline-block min-w-[1.5rem] text-center rounded-sm">
                    {timing.worker_execution}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
