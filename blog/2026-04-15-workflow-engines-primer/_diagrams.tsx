import React from 'react';

// Shared styles
const box = "rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm";
const label = "text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2";
const arrow = "flex items-center justify-center text-gray-400 dark:text-gray-500";

// --- 1. DAG Scheduler Model ---
export function DAGSchedulerModel() {
  const tasks = ['Task A', 'Task B', 'Task C'];
  const steps = [
    'Parse graph',
    'Poll: which tasks are ready?',
    'Dispatch ready tasks',
    'Wait for completion',
    'Repeat',
  ];
  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 p-6">
      <div className="text-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-5">
        DAG Scheduler Model
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className={label}>You define</div>
          <div className="space-y-2">
            {tasks.map((t, i) => (
              <div key={t} className={`${box} font-mono flex items-center gap-2`}>
                <span className="inline-block w-6 h-6 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs flex items-center justify-center font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className={label}>Scheduler does</div>
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s} className={`${box} flex items-start gap-2`}>
                <span className="inline-block w-6 h-6 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-5 text-xs text-center text-gray-500 dark:text-gray-400 italic">
        Data passes via external storage (DB, S3, XCom). Tasks are independent processes.
      </div>
    </div>
  );
}

// --- 2. Airflow State Machine ---
export function AirflowStateMachine() {
  const states = [
    { name: 'none', color: 'gray' },
    { name: 'scheduled', color: 'blue' },
    { name: 'queued', color: 'indigo' },
    { name: 'running', color: 'amber' },
    { name: 'success', color: 'green' },
  ];
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600',
    blue: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    indigo: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
    amber: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    green: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-800',
    red: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800',
  };
  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 p-6">
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
        {states.map((s, i) => (
          <React.Fragment key={s.name}>
            <span className={`px-3 py-1.5 rounded border ${colorMap[s.color]}`}>{s.name}</span>
            {i < states.length - 1 && <span className="text-gray-400">→</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-gray-500 dark:text-gray-400">
        <span className={`px-2 py-1 rounded border ${colorMap.amber}`}>running</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded border ${colorMap.red}`}>failed</span>
        <span>→</span>
        <span className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600">up_for_retry</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded border ${colorMap.blue}`}>scheduled</span>
        <span>→ ...</span>
      </div>
    </div>
  );
}

// --- 3. Persistence Spectrum ---
export function PersistenceSpectrum() {
  const points = [
    { label: 'No persistence', sub: 'plain code', pos: 0 },
    { label: 'Per-task', sub: 'Airflow', pos: 33 },
    { label: 'Per-step', sub: 'Temporal, Inngest, Windmill WAC', pos: 66 },
    { label: 'Per-side-effect', sub: 'Restate-style journaling', pos: 100 },
  ];
  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 p-6">
      <div className="relative h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 dark:from-green-800 dark:via-yellow-800 dark:to-red-800 rounded-full mb-12">
        {points.map((p) => (
          <div
            key={p.label}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${p.pos}%`, transform: `translateX(-50%) translateY(-50%)` }}
          >
            <div className="w-3 h-3 bg-gray-700 dark:bg-gray-200 rounded-full mx-auto" />
            <div className="mt-2 text-center whitespace-nowrap">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{p.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-8 pt-2 border-t border-gray-200 dark:border-slate-700">
        <div>
          <div>Fastest</div>
          <div>No durability</div>
          <div>No overhead</div>
        </div>
        <div className="text-right">
          <div>Most durable</div>
          <div>Most overhead</div>
        </div>
      </div>
    </div>
  );
}

// --- 4. Worker Architecture ---
export function WorkerArchitecture() {
  const columns = [
    {
      title: 'Workers → DB directly',
      examples: 'Airflow, Windmill',
      cost: '~1-5ms per step',
      note: 'Each step = DB round-trip',
      color: 'amber',
    },
    {
      title: 'Workers → Server → DB',
      examples: 'Temporal, Inngest',
      cost: '~0.3-1ms per step',
      note: 'Server mediates + batches',
      color: 'blue',
    },
    {
      title: 'Workers = Runtime',
      examples: 'Restate',
      cost: '~0.01ms per step',
      note: 'No external DB',
      color: 'green',
    },
  ];
  const bar: Record<string, string> = {
    amber: 'bg-amber-200 dark:bg-amber-900',
    blue: 'bg-blue-200 dark:bg-blue-900',
    green: 'bg-green-200 dark:bg-green-900',
  };
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      {columns.map((c) => (
        <div key={c.title} className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 font-mono">{c.title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.examples}</div>
          <div className={`${bar[c.color]} h-1.5 rounded-full mt-3`} />
          <div className="mt-3 text-sm font-mono text-gray-800 dark:text-gray-200">{c.cost}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.note}</div>
        </div>
      ))}
    </div>
  );
}

// --- 5. GitHub Stars Bar Chart ---
export function GithubStarsChart() {
  const engines = [
    { name: 'Airflow', stars: 45050, color: 'bg-sky-500' },
    { name: 'Prefect', stars: 22177, color: 'bg-indigo-500' },
    { name: 'Temporal', stars: 19598, color: 'bg-violet-500' },
    { name: 'Windmill', stars: 16241, color: 'bg-emerald-500' },
    { name: 'Dagster', stars: 13500, color: 'bg-cyan-500' },
    { name: 'Hatchet', stars: 6826, color: 'bg-orange-500' },
    { name: 'Inngest', stars: 5202, color: 'bg-pink-500' },
    { name: 'Restate', stars: 3729, color: 'bg-rose-500' },
    { name: 'DBOS (TS+Py)', stars: 2404, color: 'bg-amber-500' },
  ];
  const max = Math.max(...engines.map((e) => e.stars));
  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 p-6">
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
        GitHub Stars (April 2026)
      </div>
      <div className="space-y-2">
        {engines.map((e) => (
          <div key={e.name} className="flex items-center gap-3">
            <div className="w-28 text-xs font-mono text-gray-700 dark:text-gray-300 text-right shrink-0">
              {e.name}
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-slate-800 rounded h-5 overflow-hidden">
              <div
                className={`${e.color} h-full rounded flex items-center justify-end pr-2 text-xs text-white font-mono font-semibold`}
                style={{ width: `${(e.stars / max) * 100}%`, minWidth: '3rem' }}
              >
                {e.stars.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center italic">
        DBOS combined: 1,137 TypeScript + 1,267 Python
      </div>
    </div>
  );
}

// --- 6. Replay Sequence Diagram (Temporal) ---
export function TemporalReplaySequence() {
  const runs = [
    {
      label: 'Execution 1',
      steps: [
        { name: 'await getOrder', status: 'run', note: 'no event' },
        { name: 'schedule activity', status: 'yield', note: '' },
      ],
    },
    {
      label: 'Execution 2',
      steps: [
        { name: 'await getOrder', status: 'cached', note: 'event: completed(order)' },
        { name: 'await chargePayment', status: 'run', note: 'no event' },
        { name: 'schedule activity', status: 'yield', note: '' },
      ],
    },
    {
      label: 'Execution 3',
      steps: [
        { name: 'await getOrder', status: 'cached', note: 'event' },
        { name: 'await chargePayment', status: 'cached', note: 'event' },
        { name: 'await shipOrder', status: 'run', note: 'no event' },
        { name: 'schedule activity', status: 'yield', note: '' },
      ],
    },
  ];
  const statusStyle: Record<string, string> = {
    cached: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900',
    run: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    yield: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
  };
  const statusLabel: Record<string, string> = {
    cached: 'skipped (replay)',
    run: 'executed',
    yield: 'suspend',
  };
  return (
    <div className="my-6 space-y-3">
      {runs.map((run) => (
        <div key={run.label} className="rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 p-4">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2 font-mono">{run.label}</div>
          <div className="flex flex-wrap items-center gap-2">
            {run.steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className={`rounded border px-2 py-1 text-xs font-mono ${statusStyle[s.status]}`}>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-[10px] opacity-75">
                    {statusLabel[s.status]}{s.note && ` · ${s.note}`}
                  </div>
                </div>
                {i < run.steps.length - 1 && <span className="text-gray-400">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- 7. Inngest HTTP Roundtrips ---
export function InngestHttpRoundtrips() {
  const requests = [
    {
      label: 'Request 1',
      memo: [],
      body: [
        { name: 'get-order', status: 'run' },
      ],
      response: 'step_result: get-order',
    },
    {
      label: 'Request 2',
      memo: ['get-order'],
      body: [
        { name: 'get-order', status: 'cached' },
        { name: 'charge', status: 'run' },
      ],
      response: 'step_result: charge',
    },
    {
      label: 'Request 3',
      memo: ['get-order', 'charge'],
      body: [
        { name: 'get-order', status: 'cached' },
        { name: 'charge', status: 'cached' },
        { name: 'ship', status: 'run' },
      ],
      response: 'step_result: ship',
    },
    {
      label: 'Request 4',
      memo: ['get-order', 'charge', 'ship'],
      body: [
        { name: 'get-order', status: 'cached' },
        { name: 'charge', status: 'cached' },
        { name: 'ship', status: 'cached' },
      ],
      response: 'complete: true',
    },
  ];
  const statusStyle: Record<string, string> = {
    cached: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300',
    run: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold',
  };
  return (
    <div className="my-6 space-y-3">
      {requests.map((r) => (
        <div key={r.label} className="rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 p-4">
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 font-mono">{r.label}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
              memo: [{r.memo.join(', ') || '∅'}]
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {r.body.map((s, i) => (
              <React.Fragment key={i}>
                <span className={`rounded px-2 py-1 text-xs font-mono ${statusStyle[s.status]}`}>
                  {s.name}
                </span>
                {i < r.body.length - 1 && <span className="text-gray-400 text-xs">→</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono mt-2">
            ← response: {`{ ${r.response} }`}
          </div>
        </div>
      ))}
    </div>
  );
}
