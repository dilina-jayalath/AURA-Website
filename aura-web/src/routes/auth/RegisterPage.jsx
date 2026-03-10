import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logos } from "../../assets";
import ExitButton from "../../components/buttons/ExitButton";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    login({ email: form.email, password: form.password })
      .then((user) => {
        if (user.role === "developer") navigate("/dev/dashboard");
        else navigate("/client/dashboard");
      })
      .catch(() => setError("Registration failed. Please try again."));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logos.aura} alt="AURA" className="mx-auto h-14 w-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-base-content tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-base-content/50">Start personalizing UIs with AURA</p>
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
                Full name
              </label>
              <label className="input w-full">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-base-content/60 uppercase tracking-wide">
                Email
              </label>
              <label className="input w-full">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-base-content/60 uppercase tracking-wide">
                Password
              </label>
              <label className="input w-full">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-base-content/60 uppercase tracking-wide">
                I am a…
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="select w-full"
              >
                <option disabled value="">Select your role</option>
                <option value="client">Client / Organization</option>
                <option value="developer">Developer</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Create account
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-base-content/50">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
