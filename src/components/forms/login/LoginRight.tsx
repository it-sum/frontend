"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/src/assets/images/logo.webp";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { login } from "@/src/services/auth.service";
import { ApiError } from "@/src/lib/api";
import { useAuthStore } from "@/src/stores/auth.store";

const inputBaseClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-slate-100/80 ps-11 pe-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-700/80 dark:bg-[#0a1424]/80 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-cyan-400/60 dark:focus:ring-cyan-400/10 [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_rgba(241,245,249,0.8)] [&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a] dark:[&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_#0a1424] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#fff]";

const inputIconClass =
  "pointer-events-none absolute start-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400";

const LoginRight = () => {
  const t = useTranslations("Auth.Right");
  const locale = useLocale();
  const router = useRouter();
  const { setSession } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /** Verbatim error message from the backend — never replaced with a custom string. */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    setErrorMessage(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const identifier = (formData.get("identifier") as string).trim();
    const password = formData.get("password") as string;

    try {
      const res = await login(identifier, password);
      const { accessToken, user } = res.data;

      // Persist token in memory (Zustand) — never in localStorage.
      setSession(accessToken, user);

      // Redirect based on role.
      const role = user.roleName;
      if (role === "admin") {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}/dashboard`);
      }
    } catch (err) {
      // Display the exact backend message — do not invent a more specific one.
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 lg:w-1/2 xl:px-8 dark:bg-[#020817]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,51,85,.05),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(15,51,85,.13),transparent_55%)]" />
      <div className="pointer-events-none absolute -inset-e-20 top-20 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/3" />

      {/* Dots */}
      <div
        className="pointer-events-none absolute bottom-8 inset-e-8 h-24 w-32 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,.5) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-xl sm:p-10 dark:border-white/5 dark:bg-white/2 dark:shadow-[0_20px_60px_rgba(0,0,0,.3)]">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-50 shadow-sm dark:border-cyan-400/40 dark:bg-[#071626]/60 dark:shadow-[0_0_20px_rgba(34,211,238,.08)]">
            <Image
              src={Logo}
              alt="IT-SUM"
              priority
              className="h-8 w-8 object-contain"
            />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Error message — verbatim from the backend */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                strokeWidth={1.8}
              />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email / Student ID */}
          <div>
            <label
              htmlFor="identifier"
              className="mb-2 block text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {t("identifierLabel")}
            </label>
            <div className="group relative">
              <UserRound className={inputIconClass} strokeWidth={1.5} />
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                placeholder={t("identifierPlaceholder")}
                required
                disabled={isLoading}
                className={inputBaseClass}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {t("passwordLabel")}
            </label>
            <div className="group relative">
              <LockKeyhole className={inputIconClass} strokeWidth={1.5} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder={t("passwordPlaceholder")}
                required
                disabled={isLoading}
                className={`${inputBaseClass} pe-10`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between gap-4">
            <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="peer sr-only"
              />
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-400 bg-slate-100 transition-all peer-checked:border-cyan-500 peer-checked:bg-cyan-500 dark:border-slate-500 dark:bg-[#07101f] dark:peer-checked:border-cyan-400 dark:peer-checked:bg-cyan-400">
                {rememberMe && (
                  <Check
                    className="h-3 w-3 text-white dark:text-[#020817]"
                    strokeWidth={3}
                  />
                )}
              </span>
              {t("rememberMe")}
            </label>

            <Link
              href={`/${locale}/forgot-password`}
              className="text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
            >
              {t("forgotPassword")}
            </Link>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            id="login-submit-btn"
            disabled={isLoading}
            aria-busy={isLoading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-400 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(6,182,212,.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(6,182,212,.25)] active:translate-y-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                {t("signingIn")}
              </>
            ) : (
              <>
                {t("submitButton")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={1.8}
                />
              </>
            )}
          </button>

          {/* Secure access */}
          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
            <span>{t("secureAccess")}</span>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-slate-200 dark:bg-slate-700/40" />

        {/* Support */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          {t("supportPrefix")}{" "}
          <Link
            href={`/${locale}/contact`}
            className="ms-1 font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            {t("supportLink")}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginRight;
