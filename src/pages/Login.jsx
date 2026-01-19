import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loadingForgot, setLoadingForgot] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;

    setLoadingForgot(true);
    setForgotMessage("");

    try {
      await api.post("/users/forgot-password", { email: forgotEmail });
      setForgotMessage("Reset link sent! Check your email.");
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setForgotMessage("");
        setForgotEmail("");
      }, 3000);
    } catch (err) {
      setForgotMessage(err.response?.data?.message || "Failed to send link. Try again.");
    } finally {
      setLoadingForgot(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await api.post("/users/login", { email, password });

      const accessToken = res.data?.data?.accessToken;
      const user = res.data?.data?.user;

      if (!accessToken) throw new Error("Token not received");

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">


      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>


      <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">


        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            ClipprX
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Welcome back, creator.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-gray-600"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
              <button type="button" onClick={() => setIsForgotModalOpen(true)} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-gray-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="h-px bg-gray-700 flex-1"></div>
          <span className="text-gray-500 text-xs font-medium">OR</span>
          <div className="h-px bg-gray-700 flex-1"></div>
        </div>


        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Register
          </Link>
        </p>
      </div>

      {
        isForgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsForgotModalOpen(false)}>
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl w-full max-w-md shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white mb-4">Reset Password</h2>
              <p className="text-gray-400 text-sm mb-6">Enter your email address and we'll send you a link to reset your password.</p>

              {forgotMessage && (
                <div className={`mb-4 p-3 rounded-lg text-sm text-center ${forgotMessage.includes("success") || forgotMessage.includes("sent") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                  {forgotMessage}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-600"
                  placeholder="name@example.com"
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingForgot}
                    className="px-6 py-2 bg-purple-600 rounded-lg font-bold text-white hover:bg-purple-500 disabled:opacity-50 transition-colors"
                  >
                    {loadingForgot ? "Sending..." : "Send Link"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Login;
