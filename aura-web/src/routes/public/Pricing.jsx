import { Link } from "react-router-dom";

const stats = [
  { label: "Competitive advantage", value: "~90%", note: "No direct end-to-end competitors" },
  { label: "Deployment model", value: "Client-side", note: "Most processing via browser extension" },
  { label: "Integration effort", value: "< 5 min", note: "Standard React + NPM ecosystem" },
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-none text-primary mt-0.5" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      />
    </svg>
  );
}

const audiences = [
  {
    icon: "🖥️",
    title: "Web Developers & Product Teams",
    desc: "Build with adaptive components freely during development. Register your website when ready for production.",
  },
  {
    icon: "♿",
    title: "Accessibility-Focused Organizations",
    desc: "Automatic WCAG-aligned adaptations without per-user manual configuration — powered by the user's AURA profile.",
  },
  {
    icon: "🏥",
    title: "Social, Education & Charitable Platforms",
    desc: "Special pricing consideration for charity, education, social services, and donation platforms. Contact us.",
  },
];

export default function Pricing() {
  return (
    <div className="bg-base-100">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-24 px-6 lg:px-8 text-center">
        <div aria-hidden="true" className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden px-36 blur-3xl pointer-events-none">
          <div
            className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-primary to-secondary opacity-10"
            style={{ clipPath: "polygon(8.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
          />
        </div>
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">Pricing</span>
        <h1 className="text-5xl font-bold text-base-content sm:text-6xl">
          Free to build.<br className="hidden sm:block" />
          <span className="text-primary">Licensed to deploy.</span>
        </h1>
        <p className="mt-6 text-lg text-base-content/60 max-w-2xl mx-auto">
          AURA is free for end users and developers. Websites that want to integrate with the AURA extension in production need a registered website license.
        </p>
      </section>

      {/* ── Market stats ────────────────────────────────── */}
      <section className="border-y border-base-300 bg-base-200">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-base-content">{s.label}</p>
              <p className="text-xs text-base-content/40 mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="border-y border-base-300 bg-base-200 py-14 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">How it works</span>
          <h2 className="mt-2 text-2xl font-bold text-base-content">The AURA ecosystem</h2>
        </div>
        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            {
              icon: "🧩",
              label: "Browser Extension",
              note: "Always free",
              desc: "End users create a free account. Their ML personalization profile is generated in the cloud and delivered to the extension.",
            },
            {
              icon: "📦",
              label: "NPM Package",
              note: "Free for development",
              desc: "Developers use the npm package freely in any project during development.",
            },
            {
              icon: "🔑",
              label: "Website License",
              note: "Required for production",
              desc: "For production deployment, websites register a license to allow extension–npm communication. Without it, the extension rejects profile access.",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-base-300 bg-base-100 p-5">
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="font-semibold text-base-content">{item.label}</p>
              <span className="inline-block mt-1 mb-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {item.note}
              </span>
              <p className="text-xs text-base-content/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tiers ─────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* End Users */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-7 flex flex-col gap-5">
            <div>
              <span className="text-2xl">👤</span>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-base-content/40">End Users</p>
              <div className="mt-1 text-3xl font-bold text-base-content">Free</div>
              <p className="mt-2 text-sm text-base-content/55 leading-relaxed">
                Create a free AURA account to generate your personalization profile. The ML model runs in the cloud and syncs to the browser extension — no manual setup needed.
              </p>
            </div>
            <ul className="space-y-2 flex-1 text-sm text-base-content/65">
              {[
                "Free account to generate your ML profile",
                "Cloud-powered personalization engine",
                "Profile delivered via browser extension",
                "Works on all registered websites",
                "Always free — no payment needed",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2"><Check />{f}</li>
              ))}
            </ul>
          </div>


          {/* Developers */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-7 flex flex-col gap-5">
            <div>
              <span className="text-2xl">💻</span>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-base-content/40">Developers</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-base-content">Free</span>
                <span className="text-xs text-base-content/40">npm package</span>
              </div>
              <p className="mt-2 text-sm text-base-content/55 leading-relaxed">
                Use the npm package freely — components work as standard UI elements out of the box.
                A website license is required to unlock ML-driven adaptive personalization.
              </p>
            </div>
            <ul className="space-y-2 flex-1 text-sm text-base-content/65">
              {[
                "Free npm package — all 19 components",
                "Default components work without a license",
                "License required to unlock adaptiveness",
                "License required for production deployment",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2"><Check />{f}</li>
              ))}
            </ul>
            <a
              href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline w-full mt-auto"
            >
              Get the npm package
            </a>
          </div>


          {/* Website License */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 ring-2 ring-primary/20 p-7 flex flex-col gap-5 shadow-lg">
            <div>
              <span className="text-2xl">🔑</span>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">Website License</p>
              <div className="mt-1 text-3xl font-bold text-base-content">Contact Us</div>
              <p className="mt-2 text-sm text-base-content/55 leading-relaxed">
                Required for production websites. Registers your domain so the AURA extension allows profile access for your users. Pricing coming soon.
              </p>
            </div>
            <ul className="space-y-2 flex-1 text-sm text-base-content/65">
              {[
                "Domain registration with AURA",
                "Extension–npm profile access enabled",
                "Required for live production deployments",
                "Special rates for social & charity orgs",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2"><Check />{f}</li>
              ))}
            </ul>
            <Link to="/contact-us" className="btn btn-primary w-full mt-auto">
              Get in touch
            </Link>
          </div>

        </div>
      </section>

      {/* ── Special pricing callout ────────────────────────── */}
      <section className="py-6 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <span className="text-3xl flex-shrink-0">🤝</span>
          <div className="flex-1">
            <h3 className="font-bold text-base-content">Charity, Education & Social Services</h3>
            <p className="mt-1 text-sm text-base-content/55 leading-relaxed">
              We are actively considering special pricing for non-profit, educational, charitable, social service, and donation platforms.
              If your organization qualifies, reach out — we want AURA to be accessible to those who need it most.
            </p>
          </div>
          <Link to="/contact-us" className="btn btn-outline flex-shrink-0">
            Contact us
          </Link>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────── */}
      <section className="bg-base-200 border-t border-base-300 py-20 px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Who it's for</span>
            <h2 className="mt-2 text-3xl font-bold text-base-content">Built for teams who care about every user</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-xl border border-base-300 bg-base-100 p-6">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-semibold text-base-content mb-1.5">{a.title}</h3>
                <p className="text-sm text-base-content/55 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Market context ────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Why AURA</span>
            <h2 className="mt-2 text-3xl font-bold text-base-content">A market gap — captured early</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🤖", title: "Automatic personalization", desc: "UI adapts based on real user behavior and abilities — no manual configuration or accessibility overrides needed." },
              { icon: "🏁", title: "No direct competitors", desc: "No publicly available end-to-end behavior-driven UI personalization library exists — giving AURA a first-mover advantage." },
              { icon: "💰", title: "Low deployment cost", desc: "Most personalization runs client-side via the browser extension and npm package — minimal cloud infrastructure needed." },
              { icon: "�", title: "User privacy first", desc: "All personalization profiles are stored locally on the user's device. No tracking, no cloud upload by default." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-xl border border-base-300 bg-base-200 p-5">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-base-content mb-1">{item.title}</h3>
                  <p className="text-sm text-base-content/55 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Adoption roadmap ──────────────────────────────── */}
      <section className="bg-base-200 border-t border-base-300 py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Rollout</span>
          <h2 className="mt-2 text-3xl font-bold text-base-content mb-10">How we're growing</h2>
          <ol className="relative border-l-2 border-primary/30 text-left space-y-8 pl-8">
            {[
              { step: "01", title: "Pilot integrations", desc: "Selected web platforms and developer communities get early access." },
              { step: "02", title: "Public NPM + Extension launch", desc: "Full public rollout — free for all developers and end users worldwide." },
              { step: "03", title: "Website licensing rollout", desc: "Production website licensing system goes live, with special consideration for social and educational platforms." },
            ].map((item) => (
              <li key={item.step} className="relative">
                <span className="absolute -left-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-content text-xs font-bold">
                  {item.step}
                </span>
                <h3 className="font-semibold text-base-content">{item.title}</h3>
                <p className="mt-1 text-sm text-base-content/55">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-base-content">Ready to start building?</h2>
        <p className="mt-3 text-base-content/55 max-w-xl mx-auto">
          The npm package and browser extension are free. When you're ready to go live, we'll be here.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg px-8"
          >
            Get the package
          </a>
          <Link to="/contact-us" className="btn btn-outline btn-lg px-8">
            Contact us
          </Link>
        </div>
      </section>

    </div>
  );
}
