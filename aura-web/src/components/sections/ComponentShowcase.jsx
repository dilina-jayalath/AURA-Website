import React from "react";

// Exact exports from @aura-adaptive/aura-ui-adaptor v1.0.1
const utilities = [
    "AdaptiveProvider",
    "useAdaptive",
    "predictFallbackTokens",
];

const components = [
    "AdaptiveAlert",
    "AdaptiveButton",
    "AdaptiveCard",
    "AdaptiveCheckbox",
    "AdaptiveDialog",
    "AdaptiveDrawer",
    "AdaptiveDropdown",
    "AdaptiveGrid",
    "AdaptiveInput",
    "AdaptiveList",
    "AdaptiveMenu",
    "AdaptiveNavbar",
    "AdaptivePagination",
    "AdaptiveSelect",
    "AdaptiveSwitch",
    "AdaptiveTable",
    "AdaptiveText",
    "AdaptiveTextarea",
    "AdaptiveTooltip",
];

export default function ComponentShowcase() {
    return (
        <section className="bg-base-100 py-24 px-6 lg:px-8 overflow-hidden">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                        Component Library
                    </span>
                    <h2 className="text-4xl font-bold text-base-content sm:text-5xl">
                        <span className="text-primary">{components.length}</span> adaptive components,{" "}
                        ready to use
                    </h2>
                    <p className="mt-4 text-base-content/60 text-lg">
                        Every component adapts automatically. Drop them in — no extra props needed.
                    </p>
                </div>

                {/* Utilities row */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {utilities.map((name) => (
                        <span
                            key={name}
                            className="font-mono text-sm px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/30 font-semibold"
                        >
                            {name}
                        </span>
                    ))}
                </div>

                {/* Components grid */}
                <div className="flex flex-wrap justify-center gap-2.5">
                    {components.map((name) => (
                        <span
                            key={name}
                            className="font-mono text-xs px-3 py-1.5 rounded-full bg-base-200 text-base-content/70 border border-base-300 hover:border-primary/40 hover:text-base-content transition-colors duration-200 cursor-default"
                        >
                            {name}
                        </span>
                    ))}
                </div>

                {/* NPM link */}
                <div className="text-center mt-12">
                    <a
                        href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-primary"
                    >
                        View full package on npm →
                    </a>
                </div>
            </div>
        </section>
    );
}
