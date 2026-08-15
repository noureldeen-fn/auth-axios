import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  UtensilsCrossed,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../../components/common/ErrorAlert";

export const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [authError, setAuthError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setAuthError(null);
    try {
      if (registerUser) {
        await registerUser(data);
      }
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Register error caught in RegisterPage:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please verify your information.";
      setAuthError(message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <Link to="/" className="inline-flex items-center space-x-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-200">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <span className="font-serif font-bold text-3xl text-white tracking-tight">
            Savory<span className="text-brand-500">Bistro</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-serif font-bold text-white">
          Create an Account
        </h2>
        <p className="mt-1 text-sm text-stone-400">
          Sign up to explore our menu & make reservations
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-stone-850 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-stone-800 backdrop-blur-xl">
          {authError && (
            <div className="mb-6">
              <ErrorAlert
                title="Registration Failed"
                message={authError}
              />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Mohamed Ali"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 text-white placeholder-stone-500 text-sm border focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-stone-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  } disabled:opacity-60`}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center space-x-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 inline" />
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Mohamed@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 text-white placeholder-stone-500 text-sm border focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-stone-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  } disabled:opacity-60`}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center space-x-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 inline" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-stone-900 text-white placeholder-stone-500 text-sm border focus:outline-none transition-colors ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-stone-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  } disabled:opacity-60`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center space-x-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 inline" />
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 disabled:bg-stone-700 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-glow flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-stone-900"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-stone-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-400 hover:text-brand-300 font-semibold transition-colors underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-stone-400 hover:text-white transition-colors"
          >
            ← Back to SavoryBistro Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;