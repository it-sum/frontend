"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  Loader2,
  Mail,
  PencilLine,
  Send,
  UserRound,
  type LucideIcon,
} from "lucide-react";

const TONE_STYLES = {
  icon: "text-emerald-400",
  bg: "bg-emerald-400/8",
};

const CONTACT_LINKS: {
  key: "email";
  icon: LucideIcon;
}[] = [{ key: "email", icon: Mail }];

const SUBJECT_OPTIONS = [
  "support",
  "feedback",
  "collaboration",
  "other",
] as const;

const Contact = ({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) => {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const Heading = headingLevel;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const arrowClass =
    "transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setErrorMessage(t("form.sendError"));
    }
  };

  return (
    <section
      id="contact"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-transparent px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[12%] top-[30%] h-75 w-75 rounded-full bg-blue-500/2.5 blur-[120px] dark:bg-blue-500/3.5" />
        <div className="absolute bottom-[5%] right-[12%] h-80 w-80 rounded-full bg-cyan-500/2.5 blur-[130px] dark:bg-cyan-500/3.5" />
      </div>

      <div className="relative mx-auto w-full max-w-300">
        <div className="relative overflow-hidden rounded-[18px] border border-slate-200/80 bg-white/18 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.04)] backdrop-blur-[2px] dark:border-white/9 dark:bg-[#06111d]/28 dark:shadow-[0_30px_100px_rgba(0,0,0,0.16)] sm:p-5 lg:p-6">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/15 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-s-10 top-8 h-36 w-64 opacity-10 dark:opacity-8 bg-[radial-gradient(circle,rgba(14,165,233,.55)_1px,transparent_1px)] bg-size-[16px_16px] mask-[linear-gradient(to_right,black,transparent)] rtl:mask-[linear-gradient(to_left,black,transparent)]"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-10">
            <div className="flex flex-col">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/3.5 px-3 py-1.5">
                <Send className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-500 dark:text-emerald-300">
                  {t("eyebrow")}
                </span>
              </div>

              <Heading className="max-w-72.5 text-[26px] font-semibold leading-[1.18] tracking-[-0.04em] text-slate-950 dark:text-white sm:text-[29px] lg:text-[31px]">
                {t("titleStart")}{" "}
                <span className="bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {t("titleHighlight")}
                </span>
              </Heading>

              <p className="mt-3.5 max-w-72.5 text-[12px] leading-[1.75] text-slate-500 dark:text-slate-400">
                {t("description")}
              </p>

              <div className="my-5 h-px bg-slate-200/80 dark:bg-white/6" />

              <div className="space-y-2">
                {CONTACT_LINKS.map(({ key, icon: Icon }) => (
                  <a
                    key={key}
                    href={`mailto:${t("contact.email.description")}`}
                    className="flex w-full items-center rounded-xl border border-transparent p-1.5 text-start transition-colors hover:bg-slate-50/70 dark:hover:bg-white/2.5"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] ${TONE_STYLES.bg}`}
                    >
                      <Icon
                        strokeWidth={1.7}
                        className={`h-4.5 w-4.5 ${TONE_STYLES.icon}`}
                      />
                    </div>
                    <div className="min-w-0 px-3">
                      <h3 className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">
                        {t(`contact.${key}.title`)}
                      </h3>
                      <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                        {t(`contact.${key}.description`)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <form
                onSubmit={handleSubmit}
                className="overflow-hidden rounded-[16px] border border-slate-200/80 bg-white/36 shadow-[0_15px_45px_rgba(15,23,42,.035)] backdrop-blur-md dark:border-white/7 dark:bg-[#081421]/55 dark:shadow-[0_20px_60px_rgba(0,0,0,.12)]"
              >
                <div className="p-3.5 sm:p-4">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field icon={UserRound} color="text-emerald-400">
                      <label htmlFor="contact-name" className="sr-only">
                        {t("form.name")}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("form.name")}
                        className="contact-input"
                      />
                    </Field>
                    <Field icon={Mail} color="text-emerald-400">
                      <label htmlFor="contact-email" className="sr-only">
                        {t("form.email")}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        maxLength={100}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("form.email")}
                        className="contact-input"
                      />
                    </Field>
                  </div>

                  <div className="mt-3.5">
                    <Field
                      icon={LayoutGrid}
                      color="text-sky-400"
                      focusColor="focus-within:border-sky-400/45 focus-within:ring-sky-400/8"
                    >
                      <label htmlFor="contact-subject" className="sr-only">
                        {t("form.subject.placeholder")}
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="contact-input contact-select"
                      >
                        <option value="" disabled>
                          {t("form.subject.placeholder")}
                        </option>
                        {SUBJECT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {t(`form.subject.${option}`)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute inset-e-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400/70"
                        strokeWidth={2}
                      />
                    </Field>
                  </div>

                  <div className="relative mt-3.5 min-h-40 overflow-hidden rounded-[12px] border border-slate-200 bg-white/35 transition duration-300 focus-within:border-purple-400/40 focus-within:ring-2 focus-within:ring-purple-400/5 dark:border-white/10 dark:bg-[#091625]/55">
                    <PencilLine
                      className="absolute inset-s-5 top-4.5 h-4.5 w-4.5 text-purple-400"
                      strokeWidth={1.7}
                    />
                    <label htmlFor="contact-message" className="sr-only">
                      {t("form.message")}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={5000}
                      placeholder={t("form.message")}
                      className="contact-input min-h-40 w-full resize-none bg-transparent pb-8 pe-5 ps-13 pt-4 text-[13px] text-slate-900 outline-none placeholder:text-slate-500 dark:text-slate-100 dark:placeholder:text-slate-400"
                    />
                    <span className="absolute bottom-3 inset-e-4 text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
                      {formData.message.length}/5000
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200/80 bg-slate-50/25 px-4 py-3.5 dark:border-white/5.5 dark:bg-black/4 sm:flex-row sm:items-center sm:justify-end">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    {status === "success" && (
                      <span
                        role="status"
                        aria-live="polite"
                        className="text-xs font-medium text-emerald-500"
                      >
                        {t("form.success")}
                      </span>
                    )}
                    {status === "error" && (
                      <span
                        role="alert"
                        className="max-w-50 text-xs font-medium text-red-500"
                      >
                        {errorMessage}
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group flex h-11 min-w-40 items-center justify-center gap-6 rounded-[9px] bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-400 px-6 text-[13px] font-semibold text-white shadow-[0_8px_30px_rgba(6,182,212,.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(6,182,212,.27)] disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {t("form.submit")}
                          <ArrowRight className={`h-4 w-4 ${arrowClass}`} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .contact-input {
          width: 100%;
          height: 100%;
          background: transparent;
          outline: none;
          border: 0;
          padding-inline-end: 18px;
          font-size: 13px;
          color: rgb(15 23 42);
        }
        .contact-input::placeholder {
          color: rgb(100 116 139);
        }
        .contact-select {
          appearance: none;
          cursor: pointer;
          padding-inline-end: 34px;
        }
        .dark .contact-input {
          color: rgb(241 245 249);
        }
        .dark .contact-input::placeholder {
          color: rgb(148 163 184);
        }
        .dark .contact-input option {
          background: #081421;
          color: #e2e8f0;
        }

        /* === FIX: TRANSPARENT AUTO-FILL === */
        .contact-input:-webkit-autofill,
        .contact-input:-webkit-autofill:hover,
        .contact-input:-webkit-autofill:focus,
        .contact-input:-webkit-autofill:active {
          -webkit-text-fill-color: rgb(15 23 42) !important;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          caret-color: rgb(15 23 42);
          transition: background-color 5000s ease-in-out 0s;
        }
        .dark .contact-input:-webkit-autofill,
        .dark .contact-input:-webkit-autofill:hover,
        .dark .contact-input:-webkit-autofill:focus,
        .dark .contact-input:-webkit-autofill:active {
          -webkit-text-fill-color: rgb(241 245 249) !important;
          -webkit-box-shadow: 0 0 0px 1000px #091625 inset !important;
          caret-color: rgb(241 245 249);
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
};

function Field({
  icon: Icon,
  color,
  focusColor = "focus-within:border-cyan-400/40 focus-within:ring-cyan-400/5",
  children,
}: {
  icon: React.ElementType;
  color: string;
  focusColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex h-13 items-center rounded-[12px] border border-slate-200 bg-white/35 transition-all duration-300 focus-within:ring-2 dark:border-white/10 dark:bg-[#091625]/55 ${focusColor}`}
    >
      <Icon
        strokeWidth={1.7}
        className={`ms-4 h-4.5 w-4.5 shrink-0 ${color}`}
      />
      <div className="relative h-full min-w-0 flex-1 ps-3">{children}</div>
    </div>
  );
}

export default Contact;
