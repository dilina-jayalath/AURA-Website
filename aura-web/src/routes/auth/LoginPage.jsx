import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logos } from "../../assets";
import ExitButton from "../../components/buttons/ExitButton";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(form);
      if (user.role === "developer") navigate("/dev/dashboard");
      else navigate("/client/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logos.aura} alt="AURA" className="mx-auto h-14 w-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-base-content tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-base-content/50">Sign in to your AURA account</p>
        </div>

        <ExitButton />

        {/* Card */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-7 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-base-content/60 uppercase tracking-wide">
                Email
              </label>
              <label className="input w-full">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-base-content/60 uppercase tracking-wide">
                  Password
                </label>
                <Link to="/forgot" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <label className="input w-full">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-base-content/50">
          Not a member?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
