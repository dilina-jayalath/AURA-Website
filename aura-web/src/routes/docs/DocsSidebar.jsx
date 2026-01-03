import { NavLink } from "react-router-dom";
import { sections } from "../../docs";

export default function DocsSidebar() {
  return (
    <nav className="sticky top-24 space-y-6 rounded-2xl border border-base-300/70 bg-base-200/70 p-6 text-sm">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-base-content/50">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-md px-2 py-1.5 transition ${
                      isActive
                        ? "bg-base-100 font-semibold text-primary"
                        : "text-base-content/70 hover:bg-base-100 hover:text-base-content"
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
  );
}
