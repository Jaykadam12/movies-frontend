import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { login } = useAuth();

  async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Register failed");
      }

      login({ user: result.user, token: result.token });
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
      console.error("Register error:", error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      <div
        className="w-full max-w-md rounded-2xl bg-zinc-900/70 backdrop-blur-xl
               border border-white/10 shadow-2xl p-8"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-orange-500 text-center">
          Movies
        </h2>
        <p className="text-zinc-400 text-center mt-1">Create your account</p>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <span className="flex-1 h-px bg-zinc-700"></span>
          <span className="text-xs text-zinc-500 uppercase tracking-wide">
            register with email
          </span>
          <span className="flex-1 h-px bg-zinc-700"></span>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="mt-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700
                     px-4 py-3 text-white placeholder-zinc-500
                     focus:outline-none focus:ring-2 focus:ring-orange-500
                     focus:border-orange-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700
                     px-4 py-3 text-white placeholder-zinc-500
                     focus:outline-none focus:ring-2 focus:ring-orange-500
                     focus:border-orange-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700
                     px-4 py-3 text-white placeholder-zinc-500
                     focus:outline-none focus:ring-2 focus:ring-orange-500
                     focus:border-orange-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl font-semibold text-black
                   bg-linear-to-r from-orange-500 to-orange-400
                   hover:from-orange-600 hover:to-orange-500
                   shadow-lg shadow-orange-500/30 cursor-pointer transition"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-400 font-semibold hover:text-orange-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
