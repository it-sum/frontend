"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Code2,
  Database,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Layers,
  LayoutGrid,
  Play,
  Video as VideoIcon,
  type LucideIcon,
} from "lucide-react";

type ItemType = "pdf" | "video" | "quiz" | "course";

type RecentItem = {
  id: string;
  type: ItemType;
  icon: LucideIcon;
  titleKey: string;
  metaKey: string;
  views: string;
  time: string;
};

// المصفوفة مرتبة من الأحدث (3h ago) إلى الأقدم (1w ago)
const items: RecentItem[] = [
  {
    id: "dsa",
    type: "pdf",
    icon: Layers,
    titleKey: "Recent.items.dsa.title",
    metaKey: "Recent.items.dsa.meta",
    views: "1.2K",
    time: "3h ago",
  },
  {
    id: "react",
    type: "video",
    icon: Code2,
    titleKey: "Recent.items.react.title",
    metaKey: "Recent.items.react.meta",
    views: "2.3K",
    time: "5h ago",
  },
  {
    id: "db",
    type: "pdf",
    icon: Database,
    titleKey: "Recent.items.db.title",
    metaKey: "Recent.items.db.meta",
    views: "980",
    time: "8h ago",
  },
  {
    id: "os",
    type: "quiz",
    icon: ClipboardCheck,
    titleKey: "Recent.items.os.title",
    metaKey: "Recent.items.os.meta",
    views: "1.5K",
    time: "12h ago",
  },
  {
    id: "python",
    type: "video",
    icon: Code2,
    titleKey: "Recent.items.python.title",
    metaKey: "Recent.items.python.meta",
    views: "1.8K",
    time: "1d ago",
  },
  {
    id: "js",
    type: "pdf",
    icon: FileText,
    titleKey: "Recent.items.js.title",
    metaKey: "Recent.items.js.meta",
    views: "2.1K",
    time: "2d ago",
  },
  {
    id: "css",
    type: "video",
    icon: Code2,
    titleKey: "Recent.items.css.title",
    metaKey: "Recent.items.css.meta",
    views: "1.9K",
    time: "3d ago",
  },
  {
    id: "node",
    type: "course",
    icon: GraduationCap,
    titleKey: "Recent.items.node.title",
    metaKey: "Recent.items.node.meta",
    views: "3.2K",
    time: "4d ago",
  },
  {
    id: "git",
    type: "quiz",
    icon: ClipboardCheck,
    titleKey: "Recent.items.git.title",
    metaKey: "Recent.items.git.meta",
    views: "1.1K",
    time: "5d ago",
  },
  {
    id: "aws",
    type: "course",
    icon: GraduationCap,
    titleKey: "Recent.items.aws.title",
    metaKey: "Recent.items.aws.meta",
    views: "2.5K",
    time: "1w ago",
  },
];

const filters: { key: "all" | ItemType; icon: LucideIcon }[] = [
  { key: "all", icon: LayoutGrid },
  { key: "pdf", icon: FileText },
  { key: "video", icon: VideoIcon },
  { key: "quiz", icon: ClipboardCheck },
  { key: "course", icon: GraduationCap },
];

const typeStyles: Record<
  ItemType,
  { badge: string; icon: string; thumb: string; action: "download" | "play" }
> = {
  pdf: {
    badge: "bg-[#00b894] dark:bg-[#00dba6]",
    icon: "text-[#00b894] dark:text-[#00e6b0]",
    thumb: "from-[#00dba6]/15 via-transparent to-transparent",
    action: "download",
  },
  video: {
    badge: "bg-[#8b45e8] dark:bg-[#9b4dff]",
    icon: "text-[#8b45e8] dark:text-[#9b4dff]",
    thumb: "from-[#9b4dff]/15 via-transparent to-transparent",
    action: "play",
  },
  quiz: {
    badge: "bg-[#008de5] dark:bg-[#009cff]",
    icon: "text-[#008de5] dark:text-[#009cff]",
    thumb: "from-[#009cff]/15 via-transparent to-transparent",
    action: "play",
  },
  course: {
    badge: "bg-[#d9ae00] dark:bg-[#ffd000]",
    icon: "text-[#d9ae00] dark:text-[#ffd000]",
    thumb: "from-[#ffd000]/15 via-transparent to-transparent",
    action: "download",
  },
};

const RecentCard = ({
  item,
  title,
  meta,
}: {
  item: RecentItem;
  title: string;
  meta: string;
}) => {
  const Icon = item.icon;
  const styles = typeStyles[item.type];
  const ActionIcon = styles.action === "download" ? Download : Play;

  return (
    <article className="group w-56 shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-[#172638] dark:bg-[#071421]/90 dark:hover:border-[#21364d]">
      <div
        className={`relative flex h-28 items-center justify-center overflow-hidden bg-linear-to-b ${styles.thumb} bg-slate-50 dark:bg-[#040c16]`}
      >
        <span
          className={`absolute inset-s-2.5 top-2.5 rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white ${styles.badge}`}
        >
          {item.type}
        </span>
        <button
          type="button"
          className="absolute inset-e-2.5 top-2.5 flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 backdrop-blur-sm transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <ActionIcon className="size-3.5" strokeWidth={2} />
        </button>
        <Icon
          className={`size-12 opacity-90 transition-transform duration-300 group-hover:scale-105 ${styles.icon}`}
          strokeWidth={1.3}
        />
      </div>

      <div className="p-3.5">
        <h3 className="line-clamp-2 text-[13.5px] font-semibold leading-5 tracking-[-0.01em] text-slate-900 dark:text-[#f3f6fa]">
          {title}
        </h3>
        <p className="mt-1.5 text-[11px] text-slate-500 dark:text-[#8492a3]">
          {meta}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#8492a3]">
            <Eye className="size-3.5" strokeWidth={1.8} />
            {item.views}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#8492a3]">
              <Clock className="size-3.5" strokeWidth={1.8} />
              {item.time}
            </div>
            <button
              type="button"
              className="text-slate-400 transition-colors hover:text-cyan-500 dark:text-[#8492a3] dark:hover:text-[#00c8ff]"
              aria-label="bookmark"
            >
              <Bookmark className="size-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const Recent = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [activeFilter, setActiveFilter] = useState<"all" | ItemType>("all");
  const [[pageIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  // التحقق من حجم الشاشة لتحديد عدد البطاقات في الصف الواحد
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // أقل من sm في Tailwind
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 1 بطاقة للموبايل، 5 بطاقات للشاشات الكبيرة
  const ITEMS_PER_GROUP = isMobile ? 1 : 5;

  // استخدام المصفوفة كما هي لأنها مرتبة من الأحدث للأقدم
  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.type === activeFilter);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_GROUP),
  );

  // ضمان عدم تجاوز المؤشر لحدود الصفحات عند تغيير حجم الشاشة بدون استخدام setState داخل Effect
  const safePageIndex = Math.min(Math.max(0, pageIndex), totalPages - 1);

  const currentItems = filteredItems.slice(
    safePageIndex * ITEMS_PER_GROUP,
    safePageIndex * ITEMS_PER_GROUP + ITEMS_PER_GROUP,
  );

  const handleFilterChange = (key: "all" | ItemType) => {
    setActiveFilter(key);
    setPage([0, 0]);
  };

  const paginate = (newDirection: number) => {
    if (
      safePageIndex + newDirection < 0 ||
      safePageIndex + newDirection >= totalPages
    )
      return;
    setPage([safePageIndex + newDirection, newDirection]);
  };

  const dirMultiplier = isArabic ? -1 : 1;
  const variants = {
    enter: (dir: number) => ({ x: dir * dirMultiplier * 1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: -dir * dirMultiplier * 1000, opacity: 0 }),
  };

  return (
    <section
      id="recent"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden py-10 sm:py-12"
    >
      <div className="relative mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-cyan-500 shadow-[0_0_7px_rgba(6,182,212,0.8)] dark:bg-[#00e0d5] dark:shadow-[0_0_7px_rgba(0,224,213,0.9)]" />
              <span className="text-[9px] font-bold uppercase leading-none tracking-[0.22em] text-cyan-600 dark:text-[#00dbe7]">
                {t("Recent.eyebrow")}
              </span>
            </div>
            <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-slate-950 sm:text-[28px] dark:text-white">
              {t("Recent.title")}
            </h2>
            <p className="mt-1 text-[12px] text-slate-500 dark:text-[#8492a3]">
              {t("Recent.subtitle")}
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-[12px] font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-[#dfe6ee] dark:hover:bg-white/5"
          >
            {t("Recent.viewAll")}
            {isArabic ? (
              <ArrowLeft className="size-3.5" />
            ) : (
              <ArrowRight className="size-3.5" />
            )}
          </a>
        </div>

        {/* Filters + carousel controls */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map(({ key, icon: Icon }) => {
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleFilterChange(key)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    isActive
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-600 dark:border-[#00d8e6]/50 dark:bg-[#00d8e6]/10 dark:text-[#00dbe7]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-[#c7d0da] dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className="size-3.5" strokeWidth={2} />
                  {t(`Recent.filters.${key}`)}
                </button>
              );
            })}
          </div>

          {/* إظهار الأسهم دائماً لأننا سنحتاجها في الموبايل أيضاً */}
          <div className="flex items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={safePageIndex === 0}
              className="flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-white/10 dark:text-[#c7d0da] dark:hover:bg-white/5"
              aria-label="previous"
            >
              <ChevronLeft className="size-4 rtl:hidden" />
              <ChevronRight className="hidden size-4 rtl:block" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={safePageIndex === totalPages - 1}
              className="flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-white/10 dark:text-[#c7d0da] dark:hover:bg-white/5"
              aria-label="next"
            >
              <ChevronRight className="size-4 rtl:hidden" />
              <ChevronLeft className="hidden size-4 rtl:block" />
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative flex min-h-65 w-full items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={safePageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute inset-0 flex items-center justify-center gap-4"
            >
              {currentItems.map((item) => (
                <RecentCard
                  key={item.id}
                  item={item}
                  title={t(item.titleKey)}
                  meta={t(item.metaKey)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage([i, i > safePageIndex ? 1 : -1])}
              className={`h-1.5 rounded-full transition-all ${
                safePageIndex === i
                  ? "w-5 bg-emerald-500 dark:bg-[#00dba6]"
                  : "w-1.5 bg-slate-300 dark:bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recent;
