import React from "react";

function buildConicGradient(data) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (!total) return "conic-gradient(#374151 0% 100%)";

  let acc = 0;
  const stops = data.map((item) => {
    const start = (acc / total) * 100;
    acc += item.value;
    const end = (acc / total) * 100;
    return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function SummarySection({ activeUsers, distribution }) {
  const total = distribution.reduce((sum, item) => sum + item.value, 0);
  const gradient = buildConicGradient(distribution);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-200">Summary</p>
          <p className="text-xs text-slate-400">Instant overview</p>
        </div>
        <span className="rounded-full border border-primary/40 bg-base-200/60 px-3 py-1 text-xs text-primary">
          Aggregated insights
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
        <div className="rounded-2xl border border-primary/30 bg-base-200/60 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Active Extension Users
          </p>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-4xl font-semibold text-slate-100">
              {formatNumber(activeUsers)}
            </p>
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
              +8.4% vs last week
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Count represents aggregated extension activity across all sandbox
            environments.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-base-200/60 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Category Distribution
              </p>
              <p className="text-xs text-slate-400">
                Visual, motor, literacy, and baseline mix
              </p>

              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {distribution.map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span className="min-w-[6rem] text-slate-300">
                      {item.label}
                    </span>
                    <span className="text-slate-100">
                      {Math.round((item.value / total) * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div
                className="relative h-36 w-36 rounded-full"
                style={{ background: gradient }}
              >
                <div className="absolute inset-4 rounded-full bg-base-300 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Total
                    </p>
                    <p className="text-lg font-semibold text-slate-100">
                      {formatNumber(total)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Profiles inferred from demo datasets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
