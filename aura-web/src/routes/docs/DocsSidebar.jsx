import { NavLink } from "react-router-dom";
import { FaNpm } from "react-icons/fa6";

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", to: "/docs/getting-started" },
      { label: "Installation", to: "/docs/installation" },
    ],
  },
  {
    title: "Core API",
    items: [
      { label: "AdaptiveProvider", to: "/docs/api-reference" },
      { label: "useAdaptive", to: "/docs/use-adaptive" },
    ],
  },
  {
    title: "Layout",
    items: [
      { label: "AdaptiveGrid", to: "/docs/components/adaptive-grid" },
      { label: "AdaptiveNavbar", to: "/docs/components/adaptive-navbar" },
    ],
  },
  {
    title: "Form Components",
    items: [
      { label: "AdaptiveButton", to: "/docs/components/adaptive-button" },
      { label: "AdaptiveInput", to: "/docs/components/adaptive-input" },
      { label: "AdaptiveTextarea", to: "/docs/components/adaptive-textarea" },
      { label: "AdaptiveSelect", to: "/docs/components/adaptive-select" },
      { label: "AdaptiveCheckbox", to: "/docs/components/adaptive-checkbox" },
      { label: "AdaptiveSwitch", to: "/docs/components/adaptive-switch" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { label: "AdaptiveText", to: "/docs/components/adaptive-text" },
      { label: "AdaptiveCard", to: "/docs/components/adaptive-card" },
      { label: "AdaptiveTable", to: "/docs/components/adaptive-table" },
      { label: "AdaptiveList", to: "/docs/components/adaptive-list" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { label: "AdaptiveMenu", to: "/docs/components/adaptive-menu" },
      { label: "AdaptiveDropdown", to: "/docs/components/adaptive-dropdown" },
      { label: "AdaptivePagination", to: "/docs/components/adaptive-pagination" },
    ],
  },
  {
    title: "Overlay & Feedback",
    items: [
      { label: "AdaptiveAlert", to: "/docs/components/adaptive-alert" },
      { label: "AdaptiveDialog", to: "/docs/components/adaptive-dialog" },
      { label: "AdaptiveDrawer", to: "/docs/components/adaptive-drawer" },
      { label: "AdaptiveTooltip", to: "/docs/components/adaptive-tooltip" },
    ],
  },
];

export default function DocsSidebar({ onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-base-300">
        <a
          href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span className="flex items-center gap-1.5 text-xs font-mono bg-base-200 border border-base-300 group-hover:border-primary/40 px-3 py-1.5 rounded-lg text-base-content/60 group-hover:text-primary transition-colors">
            <FaNpm className="text-red-500 text-base" />
            @aura-adaptive/aura-ui-adaptor
          </span>
        </a>
        <p className="text-xs text-base-content/35 mt-2 ml-0.5">v1.0.1 · MIT License</p>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="px-2 mb-1.5 text-[10px] font-bold tracking-widest uppercase text-base-content/35">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-base-content/55 hover:bg-base-200 hover:text-base-content"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-base-300 text-[11px] text-base-content/30">
        <a
          href="https://github.com/RP-25-26J-474"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          GitHub ↗
        </a>
        <span className="mx-2">·</span>
        <a
          href="https://www.npmjs.com/package/@aura-adaptive/aura-ui-adaptor"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          npm ↗
        </a>
      </div>
    </div>
  );
}
