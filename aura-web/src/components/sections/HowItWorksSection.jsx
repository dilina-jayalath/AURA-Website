import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa6";

const steps = [
    {
        number: "01",
        title: "Install the package",
        description: "Add the adaptor to your React project with npm or yarn.",
        code: `npm install @aura-adaptive/aura-ui-adaptor`,
        lang: "bash",
    },
    {
        number: "02",
        title: "Wrap with AdaptiveProvider",
        description:
            "Drop the provider at the root of your app. It handles profile loading, fallback prediction, and token injection automatically.",
        code: `import { AdaptiveProvider } from "@aura-adaptive/aura-ui-adaptor";

function App() {
  return (
    <AdaptiveProvider>
      <YourApp />
    </AdaptiveProvider>
  );
}`,
        lang: "jsx",
    },
    {
        number: "03",
        title: "Use Adaptive components",
        description:
            "Replace your existing components with their Adaptive equivalents. They auto-adapt to each user's personalization profile.",
        code: `import {
  AdaptiveText,
  AdaptiveButton,
  AdaptiveCard,
} from "@aura-adaptive/aura-ui-adaptor";

function Page() {
  return (
    <AdaptiveCard>
      <AdaptiveText variant="h1">Welcome</AdaptiveText>
      <AdaptiveButton variant="primary">
        Continue
      </AdaptiveButton>
    </AdaptiveCard>
  );
}`,
        lang: "jsx",
    },
];

function CodeBlock({ code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-xl bg-base-300 border border-base-content/10 overflow-hidden">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 btn btn-xs btn-ghost z-10"
                title="Copy"
            >
                {copied ? <FaCheck className="text-primary" /> : <FaCopy />}
            </button>
            <pre className="overflow-x-auto p-5 pr-12 text-sm font-mono text-base-content/80 leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export default function HowItWorksSection() {
    return (
        <section className="bg-base-200 py-24 px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                        Quick Start
                    </span>
                    <h2 className="text-4xl font-bold text-base-content sm:text-5xl">
                        Up and running in{" "}
                        <span className="text-primary">3 steps</span>
                    </h2>
                    <p className="mt-4 text-base-content/60 text-lg">
                        No complex setup. No backend required. Works out of the box.
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-12">
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className="flex flex-col lg:flex-row gap-8 items-start"
                        >
                            {/* Left: step info */}
                            <div className="lg:w-80 flex-shrink-0">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-primary/20 leading-none">
                                        {step.number}
                                    </span>
                                    <div className="h-px flex-1 bg-base-300" />
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-base-content/60 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Right: code */}
                            <div className="flex-1 w-full">
                                <CodeBlock code={step.code} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
