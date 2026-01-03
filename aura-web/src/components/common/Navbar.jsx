import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ThemeButton from "./ThemeButton";
import { logos } from "../../assets";

export default function Navbar({
  brand = "AURA",
  slogan = "Unlease the future of UI",
  menuItems = [],
  rightItems = [],
}) {
  const { user, logout } = useAuth();
  const closeDetails = (event) => {
    const details = event.currentTarget.closest("details");
    if (details) {
      details.open = false;
    }
  };

  return (
    <div className="navbar relative bg-base-300 shadow-sm px-4 py-3 sticky top-0 z-50 glass-effect">
      {/* LEFT: brand + mobile menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>

          {/* Mobile dropdown content */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-200 rounded-box w-64"
          >
            {menuItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <details>
                    <summary>{item.label}</summary>
                    <ul className="p-2 bg-base-100">
                      {item.children.map((sub) => (
                        <li key={sub.label}>
                          <NavLink
                            to={sub.to}
                            className={({ isActive }) =>
                              isActive ? "text-primary font-semibold bg-base-100" : ""
                            }
                            onClick={closeDetails}
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-semibold bg-base-100" : ""
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            <li className="menu-title mt-2">Account</li>
            {user ? (
              <li>
                <button onClick={logout} className="btn btn-sm btn-ghost">
                  Logout
                </button>
              </li>
            ) : (
              rightItems.map((btn) => (
                <li key={btn.label}>
                  <NavLink to={btn.to}>{btn.label}</NavLink>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* BRAND */}
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl font-bold items-center gap-2 hidden lg:inline-flex">
          <img src={logos.aura} alt="AURA" className="h-8" />
          <div className="flex flex-row items-center gap-2">
            <span className="mb-1">{brand}</span>
            <span className="hidden md:inline text-xs opacity-70">{slogan}</span>
          </div>
        </Link>
      </div>

      <div className="navbar-center lg:hidden absolute left-1/2 -translate-x-1/2">
        <Link to="/" className="btn btn-ghost">
          <img src={logos.aura} alt="AURA" className="h-8" />
        </Link>
      </div>

      {/* CENTER: desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 md:gap-4">
          {menuItems.map((item) =>
            item.children ? (
              <li key={item.label}>
                <details>
                  <summary>{item.label}</summary>
                  <ul className="p-2 bg-base-200 w-40">
                    {item.children.map((sub) => (
                      <li key={sub.label}>
                          <NavLink
                            to={sub.to}
                            className={({ isActive }) =>
                              isActive ? "text-primary font-semibold bg-base-100" : ""
                            }
                            onClick={closeDetails}
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-semibold bg-base-100" : ""
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
        </ul>
      </div>

      {/* RIGHT side */}
      <div className="navbar-end gap-2 sm:gap-3">
        {user ? (
          <>
            <span className="hidden md:inline text-sm opacity-70">
              Hi, {user.name}
            </span>
            <button onClick={logout} className="btn btn-md hidden lg:inline-flex">
              Logout
            </button>
          </>
        ) : (
          <>
            {rightItems.map((btn) => (
              <Link key={btn.label} to={btn.to} className={`hidden lg:inline-flex ${btn.className}`}>
                {btn.label}
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="ml-2 sm:ml-4">
        <ThemeButton />
      </div>
    </div>
  );
}
