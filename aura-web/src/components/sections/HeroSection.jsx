import React, { useState } from "react";
import { FaArrowRight, FaNpm, FaCopy, FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCmd = "npm install @aura-adaptive/aura-ui-adaptor";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clipPathPolygon =
    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="relative isolate px-6 lg:px-8 flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-4rem)] py-16">
        {/* Top gradient blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{ clipPath: clipPathPolygon }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <div className="mx-auto max-w-3xl w-full">
          {/* Badge */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-base-content/75 ring-1 ring-base-content/20 hover:ring-base-content/40 transition">
              <span>Now on npm — v1.0.1&nbsp;</span>
              <a
                href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                View on npm →
              </a>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-base-content sm:text-7xl">
              Adaptive UI Components,{" "}
              <span className="text-primary font-bold">Powered by ML</span>
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-base-content/70 sm:text-xl/8 max-w-2xl mx-auto">
              <strong className="text-base-content">@aura-adaptive/aura-ui-adaptor</strong> —
              a React library that personalizes your UI in real-time based on each
              user's visual, motor, and literacy profile. Drop-in components. Zero config defaults.
            </p>

            {/* Install snippet */}
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-2 bg-base-200 border border-base-300 rounded-xl px-5 py-3 font-mono text-sm text-base-content/80 w-full max-w-lg">
                <FaNpm className="text-red-500 text-lg flex-shrink-0" />
                <span className="flex-1 text-left truncate">{installCmd}</span>
                <button
                  onClick={handleCopy}
                  className="btn btn-sm btn-ghost btn-square"
                  title="Copy to clipboard"
                >
                  {copied ? <FaCheck className="text-primary" /> : <FaCopy />}
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex items-center justify-center gap-x-4">
              <Link to="/docs/getting-started" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <a
                href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
              >
                npm page <FaArrowRight />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom gradient blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-50 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{ clipPath: clipPathPolygon }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
