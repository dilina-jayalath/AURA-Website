import { Outlet, NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logos } from "../assets";

export default function ClientLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-base-300 text-base-content flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-primary/40 bg-base-200/80">
        <div className="px-4 py-5 border-b border-primary/40 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logos.aura} alt="AURA Logo" className="h-6 w-auto" />
            <span className="font-semibold tracking-tight text-sm">
              User Console
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 text-sm space-y-1">
          <SectionLabel label="Overview" />
          <NavItem to="/client/dashboard" label="Dashboard" />
          {/* later: /client/sites, /client/users etc. */}

          <SectionLabel label="Configuration" />
          <NavItem to="/client/settings" label="Personalization Settings" />
        </nav>

        <div className="px-4 py-4 border-t border-primary/40 text-xs text-base-content/60">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-base-content truncate max-w-[9rem]">
                {user?.name || "Client"}
              </div>
              <div className="truncate max-w-[9rem]">{user?.email || "user@example.com"}</div>
            </div>
            <button
              onClick={logout}
              className="text-xs text-base-content/60 hover:text-error"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 border-b border-primary/40 flex items-center justify-between px-4">
          <div className="font-medium text-sm text-base-content">
            Client Dashboard
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/30">
              Organization: Default
            </span>
            <span className="hidden sm:inline text-xs text-base-content/60">
              Role: <span className="text-base-content">{user?.role}</span>
            </span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-base-300 via-base-100 to-base-200">
          <div className="max-w-8xl mx-auto px-12 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div className="mt-4 mb-1 text-md tracking-wide text-base-content font-semibold">
      {label}
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-base-content/70 hover:bg-base-content/10 hover:text-base-content transition text-sm",
          isActive ? "bg-primary/20 text-base-content border border-primary/40" : "",
        ].join(" ")
      }
    >
      <span className="h-1.5 w-1.5 rounded-full bg-base-content/40" />
      <span>{label}</span>
    </NavLink>
  );
}
