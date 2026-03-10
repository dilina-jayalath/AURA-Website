import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/** Pages that show the full footer */
const FULL_FOOTER_PATHS = ["/"];

export default function LandingLayout() {
  const { pathname } = useLocation();
  const showFullFooter = FULL_FOOTER_PATHS.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        brand="AURA"
        menuItems={[
          { label: "Home", to: "/" },
          { label: "Pricing", to: "/pricing" },
          {
            label: "Docs",
            children: [
              { label: "Getting Started", to: "/docs/getting-started" },
              { label: "Installation", to: "/docs/installation" },
              { label: "API Reference", to: "/docs/api-reference" },
            ],
          },
          { label: "Contact Us", to: "/contact-us" },
        ]}
        rightItems={[
          { label: "Login", to: "/login", className: "btn border border-primary/75" },
          { label: "Register", to: "/register", className: "btn btn-primary" },
        ]}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      {showFullFooter ? (
        <Footer />
      ) : (
        /* Copyright-only bar for Pricing, ContactUs, etc. */
        <div className="bg-base-200 border-t border-base-300 py-4 text-center">
          <p className="text-xs text-base-content/30">
            © {new Date().getFullYear()} AURA. All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
}
