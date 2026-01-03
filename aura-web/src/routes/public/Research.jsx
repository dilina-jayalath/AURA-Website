import React from "react";
import { vectors } from "../../assets";

function Research() {
  const clipPathPolygon = vectors.blobClipPath();
  return (
    <div className="relative isolate bg-base-100">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{ clipPath: clipPathPolygon }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-5xl xl:max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Research
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-base-content sm:text-5xl">
              Help us build adaptive UI that works for everyone.
            </h1>
            <p className="mt-6 text-lg text-pretty text-base-content/75">
              We are collecting real-world feedback and datasets to train our ML
              models. Your responses help us understand behavior, accessibility
              needs, and preferences so AURA can deliver more inclusive,
              responsive experiences.
            </p>
            <p className="mt-4 text-base text-base-content/70">
              The survey takes about 5 minutes. All responses are anonymized and
              used only for research and product improvement.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg"
              >
                Take the survey
              </a>
              <span className="text-sm text-base-content/60">
                <span className="text-primary font-semibold">
                  Prefer mobile?
                </span>{" "}
                &nbsp;Scan the QR code.
              </span>
            </div>
            <div className="mt-6 w-full">
              <div className="stats stats-vertical w-full rounded-2xl border border-primary/70 bg-base-200/70 text-base-content shadow-sm sm:stats-horizontal">
                <div className="stat w-full">
                  <div className="stat-figure text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M12 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title text-sm">Survey responses</div>
                  <div className="stat-value font-bold">53</div>
                  <div className="stat-desc">+18% this month</div>
                </div>

                <div className="stat w-full">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m7-3a10 10 0 11-20 0 10 10 0 0120 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title text-sm">Avg. completion time</div>
                  <div className="stat-value font-bold">4m 50s</div>
                  <div className="stat-desc text-secondary">
                    Quick and focused
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-sm rounded-2xl border border-base-300/70 bg-base-200/70 p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/60">
                QR code
              </p>
              <div className="mt-4 flex items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-100/60 px-6 py-10">
                <span className="text-sm text-base-content/50">
                  Place QR code image here
                </span>
              </div>
              <p className="mt-4 text-xs text-base-content/60">
                Link it to the same survey URL.
              </p>
            </div>

            <div className="card w-full max-w-sm rounded-2xl border border-base-300/70 bg-base-200/60 px-6">
              <div className="card-body">
                <p className="text-lg font-semibold text-base-content text-center">
                What we learn from you?
              </p>
              <ul className="mt-1 list-disc space-y-2 text-sm text-base-content/70">
                <li>UI preferences and accessibility needs.</li>
                <li>Interaction patterns across devices.</li>
                <li>Signals that improve personalization.</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-14rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{ clipPath: clipPathPolygon }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
    </div>
  );
}

export default Research;
