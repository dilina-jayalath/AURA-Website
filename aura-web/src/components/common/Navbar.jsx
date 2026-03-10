import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ThemeButton from "./ThemeButton";
import { logos } from "../../assets";

export default function Navbar({
  brand = "AURA",
  slogan = "Unleash the future of UI",
  menuItems = [],
  rightItems = [],
}) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  // Track scroll for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full glass-effect transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-none"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <img src={logos.aura} alt="AURA" className="h-8 w-8" />
              <span className="text-lg font-bold text-base-content">{brand}</span>
              <span className="hidden md:block text-xs text-base-content/50 border-l border-base-content/20 pl-2.5">
                {slogan}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative group">
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-base-content/70 hover:text-base-content rounded-lg hover:bg-base-200 transition-colors">
                      {item.label}
                      <svg className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-base-100 border border-base-300 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
                      {item.children.map((sub) => (
                        <NavLink
                          key={sub.label}
                          to={sub.to}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm transition-colors ${isActive
                              ? "text-primary font-medium bg-primary/5"
                              : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                        ? "text-primary bg-primary/10"
                        : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <ThemeButton />

              {user ? (
                <>
                  <span className="hidden md:inline text-sm text-base-content/60">
                    Hi, {user.name}
                  </span>
                  <button onClick={logout} className="btn btn-sm btn-ghost">
                    Logout
                  </button>
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  {rightItems.map((btn) => (
                    <Link key={btn.label} to={btn.to} className={btn.className + " btn-sm"}>
                      {btn.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden btn btn-ghost btn-square btn-sm"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-base-100 border-l border-base-300 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <img src={logos.aura} alt="AURA" className="h-7 w-7" />
            <span className="font-bold text-base-content">{brand}</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="btn btn-ghost btn-square btn-sm"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {menuItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-base-content/70 hover:text-base-content rounded-lg hover:bg-base-200 transition-colors"
                >
                  {item.label}
                  <svg
                    className={`h-4 w-4 transition-transform ${openSubmenu === item.label ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSubmenu === item.label && (
                  <div className="ml-3 mt-1 pl-3 border-l-2 border-primary/30 space-y-0.5">
                    {item.children.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-lg transition-colors ${isActive
                            ? "text-primary font-medium bg-primary/10"
                            : "text-base-content/60 hover:text-base-content hover:bg-base-200"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
                    ? "text-primary bg-primary/10"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Drawer footer — auth buttons */}
        {!user && rightItems.length > 0 && (
          <div className="px-4 py-5 border-t border-base-300 flex flex-col gap-2">
            {rightItems.map((btn) => (
              <Link
                key={btn.label}
                to={btn.to}
                className={`${btn.className} justify-center`}
                onClick={() => setMobileOpen(false)}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
