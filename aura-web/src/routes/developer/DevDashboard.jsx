import React, { useMemo } from "react";
import SummarySection from "../../components/developer/SummarySection";
import SimulationLab from "../../components/developer/SimulationLab";
import RecommendationsPanel from "../../components/developer/RecommendationsPanel";

const DISTRIBUTION = [
  { label: "Baseline", value: 46, color: "#22c55e" },
  { label: "Visual", value: 22, color: "#38bdf8" },
  { label: "Motor", value: 18, color: "#f59e0b" },
  { label: "Low literacy", value: 14, color: "#a855f7" },
];

const RECOMMENDATION_LIBRARY = {
  Visual: {
    title: "Boost contrast and text clarity",
    action: "Increase contrast ratios and bump body text size on key flows.",
    reason: "Visual profiles respond best to stronger contrast and larger text.",
    category: "Visual adaptations",
  },
  Motor: {
    title: "Expand tap targets",
    action: "Increase button padding and reduce dense clusters in menus.",
    reason: "Motor profiles benefit from larger targets and clearer spacing.",
    category: "Motor adaptations",
  },
  "Low literacy": {
    title: "Simplify multi-step content",
    action: "Use icon+text buttons and provide short helper hints.",
    reason: "Low literacy profiles engage better with simplified layouts.",
    category: "Literacy adaptations",
  },
  Baseline: {
    title: "Maintain default density",
    action: "Keep baseline layout compact but readable for most users.",
    reason: "Baseline audiences still rely on clean, consistent layout rules.",
    category: "Baseline experience",
  },
};

export default function DevDashboard() {
  const recommendations = useMemo(() => {
    const sorted = [...DISTRIBUTION].sort((a, b) => b.value - a.value);
    const top = sorted.slice(0, 3);

    const recs = top.map((item, index) => {
      const template = RECOMMENDATION_LIBRARY[item.label];
      return {
        id: `${item.label}-${index}`,
        ...template,
        priority: item.value >= 25 ? "High" : item.value >= 18 ? "Medium" : "Low",
      };
    });

    recs.push({
      id: "universal-1",
      title: "Audit focus visibility",
      action: "Ensure every interactive control has a visible focus ring.",
      reason: "Universal accessibility checks support all adaptation profiles.",
      category: "Universal safeguards",
      priority: "Medium",
    });

    return recs.slice(0, 5);
  }, []);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-100">
          Developer Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Monitor aggregated insights and simulate adaptive UI behavior.
        </p>
      </header>

      <SummarySection activeUsers={12849} distribution={DISTRIBUTION} />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <SimulationLab />
        <RecommendationsPanel recommendations={recommendations} />
      </div>
    </div>
  );
}
