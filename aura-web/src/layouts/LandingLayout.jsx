import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        brand="AURA"
        menuItems={[
          { label: "Home", to: "/home" },
          { label: "Pricing", to: "/pricing" },
          {
            label: "Docs",
            children: [
              { label: "Getting Started", to: "/docs/getting-started" },
              { label: "Components", to: "/docs/components" },
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

      <Footer />
    </div>
  );
}
