import React from "react";
import { Link } from "react-router-dom";
import { logos } from "../../assets";

const footerLinks = {
  Product: [
    { label: "Documentation", to: "/docs/getting-started" },
    { label: "Pricing", to: "/pricing" },
    { label: "NPM Package", href: "https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor" },
  ],
  Resources: [
    { label: "Getting Started", to: "/docs/getting-started" },
    { label: "API Reference", to: "/docs/api-reference" },
    { label: "Component Library", to: "/docs/components/adaptive-button" },
  ],
  Company: [
    { label: "Contact Us", to: "/contact-us" },
    { label: "GitHub", href: "https://github.com/RP-25-26J-474" },
  ],
};

function FooterLink({ item }) {
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-base-content/50 hover:text-base-content transition-colors"
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link
      to={item.to}
      className="text-sm text-base-content/50 hover:text-base-content transition-colors"
    >
      {item.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logos.aura} alt="AURA" className="h-8 w-8" />
              <span className="text-lg font-bold text-base-content">AURA</span>
            </Link>
            <p className="mt-4 text-sm text-base-content/50 leading-relaxed max-w-xs">
              ML-driven adaptive UI that personalizes itself for every user — automatically.
            </p>
            <a
              href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono bg-base-300 border border-base-content/10 px-3 py-1.5 rounded-full text-base-content/50 hover:text-primary hover:border-primary/30 transition-colors"
            >
              📦 @aura-adaptive/aura-ui-adaptor
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-base-content/30 mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="mt-12 border-t border-base-300 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-base-content/30">
            © {new Date().getFullYear()} AURA. All rights reserved.
          </p>
          <p className="text-xs text-base-content/25">
            v1.0.1 · MIT License · Built for the open web
          </p>
        </div>
      </div>
    </footer>
  );
}
