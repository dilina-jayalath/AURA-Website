

const CONTACT_EMAIL = "dev.auraui@gmail.com";

const demoPerks = [
  { icon: "🤖", title: "See ML personalization live", desc: "Watch AURA adapt button sizes, font scales, and layout in real-time as user profiles change." },
  { icon: "♿", title: "Accessibility in action", desc: "See WCAG-aligned adaptations applied automatically — no config, no custom CSS." },
  { icon: "⚡", title: "5-minute integration walkthrough", desc: "We'll show you how to drop AURA into any React project and have adaptive components running instantly." },
  { icon: "📊", title: "Analytics & profile dashboard", desc: "Explore the personalization analytics panel and see per-component adaptation data." },
];

export default function ContactUs() {
  return (
    <div className="bg-base-100">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[55vh] flex flex-col items-center justify-center px-6 lg:px-8 text-center py-16">
        <div aria-hidden="true" className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden px-36 blur-3xl pointer-events-none">
          <div
            className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-primary to-secondary opacity-10"
            style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
          />
        </div>

        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
          Contact Us
        </span>
        <h1 className="text-5xl font-bold text-base-content sm:text-6xl">
          Get in touch with <span className="text-primary">AURA</span>
        </h1>
        <p className="mt-5 text-lg text-base-content/55 max-w-xl mx-auto">
          Questions, enterprise enquiries, or want to see AURA live? We're here.
          <br />
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline font-medium">
            {CONTACT_EMAIL}
          </a>
        </p>
      </section>

      {/* ── Request a Demo ─────────────────────────────────── */}
      <section className="border-t border-base-300 bg-base-200 py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Live Demo
            </span>
            <h2 className="text-4xl font-bold text-base-content">See AURA in action</h2>
            <p className="mt-4 text-base-content/55 max-w-xl mx-auto">
              Book a 30-minute session and watch adaptive personalization work live — across components, profiles, and accessibility modes.
            </p>
          </div>

          {/* Perks grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {demoPerks.map((perk) => (
              <div
                key={perk.title}
                className="flex items-start gap-4 rounded-xl border border-base-300 bg-base-100 p-5"
              >
                <span className="text-2xl flex-shrink-0">{perk.icon}</span>
                <div>
                  <h3 className="font-semibold text-base-content mb-1">{perk.title}</h3>
                  <p className="text-sm text-base-content/50 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA card */}
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-8 text-center">
            <h3 className="text-xl font-bold text-base-content mb-2">Ready to see it live?</h3>
            <p className="text-base-content/55 mb-6 text-sm">
              Email us with your preferred time and we'll set it up — no commitment required.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Demo%20Request%20%E2%80%94%20AURA&body=Hi%20AURA%20team%2C%0A%0AI%27d%20like%20to%20schedule%20a%20live%20demo.%0A%0AMy%20preferred%20time%3A%20`}
              className="btn btn-primary btn-lg px-10"
            >
              Request a demo
            </a>
            <p className="mt-4 text-xs text-base-content/30">
              Or email us directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
