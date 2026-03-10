import React from "react";

const features = [
    {
        icon: "🧩",
        title: "15+ Adaptive Components",
        description:
            "Drop-in replacements for every common UI primitive — buttons, inputs, cards, tables, modals, navbars, and more. Each component reads the active personalization profile and adapts automatically.",
        chips: ["AdaptiveButton", "AdaptiveCard", "AdaptiveInput", "AdaptiveTable", "AdaptiveModal"],
    },
    {
        icon: "🧠",
        title: "ML-Driven Personalization",
        description:
            "Integrates with the AURA browser extension to read a real-time user profile. Falls back gracefully to a bundled prediction model when no extension is present — zero configuration required.",
        chips: ["AdaptiveProvider", "useAdaptive", "predictFallbackTokens"],
    },
    {
        icon: "♿",
        title: "WCAG-Aligned by Default",
        description:
            "Adapts contrast, font size, target sizes, spacing, and layout complexity based on visual, motor, and literacy signals. All adaptations are ethical, non-intrusive, and fully reversible.",
        chips: ["Visual", "Motor", "Literacy", "MIT License"],
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-base-100 py-24 px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                        Why AURA
                    </span>
                    <h2 className="text-4xl font-bold text-base-content sm:text-5xl">
                        Everything you need to build{" "}
                        <span className="text-primary">adaptive interfaces</span>
                    </h2>
                    <p className="mt-4 text-base-content/60 text-lg max-w-2xl mx-auto">
                        One package. One provider. Infinite adaptability.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group relative rounded-2xl border border-base-300 bg-base-200 p-8 hover:border-primary/50 hover:bg-base-200/80 transition-all duration-300"
                        >
                            <div className="text-4xl mb-5">{f.icon}</div>
                            <h3 className="text-xl font-bold text-base-content mb-3">{f.title}</h3>
                            <p className="text-base-content/60 text-sm leading-relaxed mb-5">{f.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {f.chips.map((chip) => (
                                    <span
                                        key={chip}
                                        className="text-xs font-mono bg-base-300 text-base-content/70 px-2.5 py-1 rounded-full border border-base-300"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
