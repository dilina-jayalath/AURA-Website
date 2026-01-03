import React from "react";
import { vectors } from "../../assets";

function ContactUs() {
  const clipPathPolygon = vectors.blobClipPath();
  return (
    <div className="relative isolate bg-base-100">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{ clipPath: clipPathPolygon }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>
      <div className="mx-auto max-w-5xl lg:max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-base-content sm:text-5xl">
              Get in touch with{" "}
              <span className="text-primary font-bold">AURA</span>
            </h1>
            <p className="mt-6 text-lg text-pretty text-base-content/75">
              Tell us about your product, accessibility goals, or research
              needs. We will respond with recommendations and next steps.
            </p>
            <div className="flex flex-row items-center justify-between rounded-2xl border border-base-300/70 bg-base-200/60 p-4 mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-base-content/60">
                Email
              </p>
              <a
                href="mailto:dev.auraui@gmail.com"
                className="text-base text-secondary/80"
              >
                dev.auraui@gmail.com
              </a>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-base-200/70 p-5 mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                Sponsor us
              </p>
              <p className="mt-3 text-sm text-base-content/75">
                Help us fund accessibility research and build adaptive UI for
                everyone. Sponsorships support data collection, inclusive
                design audits, and community testing.
              </p>
              <a
                href="mailto:dev.auraui@gmail.com"
                className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80"
              >
                Become a sponsor
              </a>
            </div>
          </div>

          <form
            action="#"
            method="POST"
            className="rounded-2xl border border-base-300/70 bg-base-200/70 p-6 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <label
                htmlFor="first-name"
                className="input input-bordered w-full"
              >
                <input
                  id="first-name"
                  type="text"
                  name="first-name"
                  autoComplete="given-name"
                  placeholder="First name"
                />
              </label>
              <label
                htmlFor="last-name"
                className="input input-bordered w-full"
              >
                <input
                  id="last-name"
                  type="text"
                  name="last-name"
                  autoComplete="family-name"
                  placeholder="Last name"
                />
              </label>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="input input-bordered w-full"
                >
                  <input
                    id="company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company"
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="input input-bordered w-full">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <div className="flex flex-row gap-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="select select-bordered"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <label
                    htmlFor="phone-number"
                    className="input input-bordered w-full"
                  >
                    <input
                      id="phone-number"
                      type="text"
                      name="phone-number"
                      placeholder="123-456-7890"
                    />
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="4"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-base-100 p-px inset-ring inset-ring-base-300/70 outline-offset-2 outline-primary transition-colors duration-200 ease-in-out has-checked:bg-primary has-focus-visible:outline-2">
                    <span className="size-4 rounded-full bg-base-100 shadow-xs ring-1 ring-base-300/70 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
                    <input
                      id="agree-to-policies"
                      type="checkbox"
                      name="agree-to-policies"
                      aria-label="Agree to policies"
                      className="absolute inset-0 appearance-none focus:outline-hidden"
                    />
                  </div>
                </div>
                <label
                  htmlFor="agree-to-policies"
                  className="text-sm text-base-content/60"
                >
                  By selecting this, you agree to our{" "}
                  <a
                    href="#"
                    className="font-semibold text-primary hover:text-primary/80"
                  >
                    privacy policy
                  </a>
                  .
                </label>
              </div>
            </div>
            <div className="mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Let's talk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
