import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, User, ShieldUser, UserCog } from "lucide-react";

const SignupPage = () => {
  const [role, setRole] = useState("User");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const roles = [
    { name: "User", icon: User },
    { name: "Agent", icon: ShieldUser },
    { name: "Admin", icon: UserCog },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("❗ Passwords do not match");
      return;
    }
    setError("");
    alert("✅ Account Created Successfully!");
    navigate("/login"); // ✅ Navigate to login after signup
  };

  return (
    <div className="flex min-h-screen w-full bg-green-100 dark:bg-zinc-900 transition-colors">
      {/* 🌿 Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center text-center p-10 bg-green-200 dark:bg-zinc-800 w-1/2 transition-colors">
        <div className="max-w-md">
          <h2 className="font-bold text-5xl mb-8 py-5 text-gray-900 dark:text-white">
            Start Your Journey to{" "}
            <span className="text-green-700 dark:text-green-400">Zero Waste</span>
          </h2>

          {[
            {
              title: "Easy Waste Scheduling",
              desc: "Schedule pickups at your convenience with just a few clicks.",
            },
            {
              title: "Track Your Impact",
              desc: "Monitor your waste statistics and environmental contribution.",
            },
            {
              title: "Smart Agent Matching",
              desc: "Get paired with nearby agents for efficient pickups.",
            },
          ].map((item, i) => (
            <div key={i} className="mb-6">
              <h5 className="flex items-center justify-center gap-2 text-2xl font-semibold mb-1 text-gray-900 dark:text-white">
                <ShieldCheck size={48} className="text-green-700 dark:text-green-400" />
                {item.title}
              </h5>
              <p className="text-m text-gray-700 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🌍 Right Section (Form Card) */}
      <div className="flex justify-center items-center p-6 md:p-10 w-full md:w-1/2 relative">
        {/* ✅ Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-green-700 dark:text-green-400 font-medium text-sm hover:underline"
        >
          ← Back to Home
        </button>

        <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 md:p-10 transition-colors">
          <div className="flex items-center justify-center space-x-2 my-4">
            <img src="/Logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="text-gray-900 dark:text-white">Waste</span>Zero
            </span>
          </div>

          {/* 👤 Role Selection */}
          <div className="text-center mb-5">
            <p className="mb-2 text-gray-700 dark:text-gray-300">I want to join as</p>
            <div className="flex justify-center gap-3">
              {roles.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setRole(name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all
                    ${
                      role === name
                        ? "bg-green-700 border-green-700 text-white"
                        : "border-green-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-zinc-700"
                    }`}
                >
                  <Icon
                    size={20}
                    className={`${
                      role === name ? "text-white" : "text-green-700 dark:text-green-400"
                    }`}
                  />
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* 📝 Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { type: "text", placeholder: "Enter your Full Name" },
              { type: "email", placeholder: "Enter your Email" },
              { type: "text", placeholder: "Choose a Username" },
            ].map((input, i) => (
              <input
                key={i}
                type={input.type}
                placeholder={input.placeholder}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ))}

            <input
              type="password"
              placeholder="Enter your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="text"
              placeholder="Enter your Location (e.g., India)"
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input type="checkbox" required className="mt-1 accent-green-600" />
              <span>
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => navigate("/terms")}
                  className="text-green-700 dark:text-green-400 hover:underline"
                >
                  Terms and Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => navigate("/privacy")}
                  className="text-green-700 dark:text-green-400 hover:underline"
                >
                  Privacy Policy
                </button>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all"
              disabled={!password || !confirmPassword || password !== confirmPassword}
            >
              Create Account
            </button>

            {/* OR divider */}
            <div className="text-center text-gray-600 dark:text-gray-400">OR</div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-zinc-700 flex items-center justify-center gap-2 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width="20"
              />
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              className="w-full py-2 border border-gray-700 text-gray-700 dark:border-gray-400 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 flex items-center justify-center gap-2 transition"
            >
              <img
                src="https://www.svgrepo.com/show/349375/github.svg"
                alt="GitHub"
                width="20"
              />
              Continue with GitHub
            </button>
          </form>

          {/* ✅ Footer Navigation */}
          <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-700 dark:text-green-400 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
