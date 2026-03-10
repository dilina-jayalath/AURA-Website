import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

/**
 * DocsShellLayout — wraps the /docs route.
 * No footer (docs pages are self-contained), navbar is shared.
 * The inner DocsLayout handles the sidebar+content split.
 */
export default function DocsShellLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
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
            <div className="flex-1 flex overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}
