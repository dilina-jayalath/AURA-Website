import React from "react";

const PRIORITY_STYLES = {
  High: "border-red-400/40 bg-red-500/10 text-red-200",
  Medium: "border-amber-400/40 bg-amber-500/10 text-amber-200",
  Low: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
};

function RecommendationCard({ title, action, reason, priority, category }) {
  return (
    <div className="rounded-2xl border border-primary/30 bg-base-200/60 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] ${
            PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low
          }`}
        >
          {priority}
        </span>
      </div>
      <p className="mt-2 text-xs text-slate-400">{category}</p>
      <p className="mt-3 text-sm text-slate-200">{action}</p>
      <p className="mt-2 text-xs text-slate-400">{reason}</p>
    </div>
  );
}

export default function RecommendationsPanel({ recommendations }) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-200">Recommendations</p>
        <p className="text-xs text-slate-400">
          Prioritized improvements based on category aggregates.
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} {...rec} />
        ))}
      </div>
    </section>
  );
}
