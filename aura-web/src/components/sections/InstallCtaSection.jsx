import React, { useState } from "react";
import { FaCopy, FaCheck, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const installCmd = "npm install @aura-adaptive/aura-ui-adaptor";

export default function InstallCtaSection() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(installCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="bg-base-200 py-24 px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                    Open Source · MIT License
                </span>
                <h2 className="text-4xl font-bold text-base-content sm:text-5xl mb-6">
                    Start building adaptive UIs{" "}
                    <span className="text-primary">today</span>
                </h2>
                <p className="text-base-content/60 text-lg mb-10">
                    Free, open-source, and designed to integrate with any React project.
                    No sign-up or account required.
                </p>

                {/* Install command */}
                <div className="flex items-center justify-between bg-base-300 border border-base-content/10 rounded-xl px-5 py-4 font-mono text-sm text-base-content/80 mb-8 max-w-lg mx-auto">
                    <span className="truncate">{installCmd}</span>
                    <button
                        onClick={handleCopy}
                        className="btn btn-sm btn-ghost btn-square ml-3 flex-shrink-0"
                        title="Copy to clipboard"
                    >
                        {copied ? <FaCheck className="text-primary" /> : <FaCopy />}
                    </button>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Link to="/docs/getting-started" className="btn btn-primary btn-lg">
                        Read the docs <FaArrowRight />
                    </Link>
                    <a
                        href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-lg border border-base-content/20"
                    >
                        View on npm
                    </a>
                </div>
            </div>
        </section>
    );
}
