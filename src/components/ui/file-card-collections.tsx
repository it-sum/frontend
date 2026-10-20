import { cn } from "@/src/lib/utils";

export type FormatFileProps =
  | "doc"
  | "pdf"
  | "md"
  | "mdx"
  | "csv"
  | "xls"
  | "xlsx"
  | "txt"
  | "ppt"
  | "pptx"
  | "zip"
  | "rar"
  | "tar"
  | "gz"
  | "code"
  | "html"
  | "js"
  | "jsx"
  | "tsx"
  | "css"
  | "json"
  | "img"
  | "png"
  | "jpg"
  | "jpeg"
  | "video";

type FileCardProps = {
  formatFile: FormatFileProps;
  className?: string;
};

const colorBannerMap: Record<FormatFileProps, string> = {
  doc: "bg-blue-600 text-white",
  pdf: "bg-rose-600 text-white",
  md: "bg-slate-600 text-white",
  mdx: "bg-slate-600 text-white",
  csv: "bg-teal-600 text-white",
  xls: "bg-emerald-600 text-white",
  xlsx: "bg-emerald-600 text-white",
  txt: "bg-slate-500 text-white",
  ppt: "bg-orange-500 text-white",
  pptx: "bg-orange-500 text-white",
  zip: "bg-amber-500 text-white",
  rar: "bg-purple-600 text-white",
  tar: "bg-amber-600 text-white",
  gz: "bg-amber-600 text-white",
  code: "bg-violet-600 text-white",
  html: "bg-orange-600 text-white",
  js: "bg-yellow-500 text-slate-950",
  jsx: "bg-cyan-600 text-white",
  tsx: "bg-blue-600 text-white",
  css: "bg-indigo-600 text-white",
  json: "bg-yellow-500 text-slate-950",
  img: "bg-pink-600 text-white",
  png: "bg-slate-600 text-white",
  jpg: "bg-green-700 text-white",
  jpeg: "bg-green-700 text-white",
  video: "bg-green-700 text-white",
};

function DocumentLines() {
  return (
    <div className="space-y-1.5">
      <div className="h-1 w-7 rounded-full bg-slate-300 dark:bg-white/20" />
      <div className="h-1 w-10 rounded-full bg-slate-200 dark:bg-white/10" />
      <div className="h-1 w-9 rounded-full bg-slate-200 dark:bg-white/10" />
      <div className="h-1 w-5 rounded-full bg-slate-200 dark:bg-white/10" />
    </div>
  );
}

function FilePreview({ formatFile }: FileCardProps) {
  if (["xls", "xlsx", "csv"].includes(formatFile)) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-2 rounded-[2px]",
              index < 3
                ? "bg-emerald-500/30 dark:bg-emerald-300/25"
                : "bg-slate-200 dark:bg-white/10",
            )}
          />
        ))}
      </div>
    );
  }

  if (["code", "html", "js", "jsx", "tsx", "css", "json"].includes(formatFile)) {
    return (
      <div className="space-y-1.5 font-mono text-[6px] leading-none">
        <div className="flex items-center gap-1">
          <span className="text-violet-500 dark:text-violet-300">&lt;/&gt;</span>
          <span className="h-1 w-5 rounded-full bg-cyan-500/50" />
        </div>
        <span className="ml-1 block h-1 w-8 rounded-full bg-blue-500/30" />
        <span className="ml-1 block h-1 w-6 rounded-full bg-emerald-500/40" />
        <span className="block h-1 w-4 rounded-full bg-violet-500/30" />
      </div>
    );
  }

  if (["zip", "rar", "tar", "gz"].includes(formatFile)) {
    return (
      <div className="flex h-10 items-center justify-center">
        <span className="h-8 w-2 rounded-full border border-amber-500/40 bg-amber-400/20 dark:border-amber-300/40 dark:bg-amber-300/20" />
      </div>
    );
  }

  if (["ppt", "pptx"].includes(formatFile)) {
    return (
      <div className="space-y-2">
        <div className="mx-auto h-5 w-7 rounded border border-orange-400/30 bg-orange-400/20" />
        <div className="mx-auto h-1 w-8 rounded-full bg-slate-300 dark:bg-white/20" />
        <div className="mx-auto h-1 w-5 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>
    );
  }

  return <DocumentLines />;
}

export function FileCard({ formatFile, className }: FileCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-[4.5rem] w-14 select-none", className)}
    >
      <span
        className={cn(
          "absolute -end-2 bottom-2 z-10 rounded px-1.5 py-1 text-[8px] font-bold uppercase tracking-wide shadow-sm",
          colorBannerMap[formatFile],
        )}
      >
        {formatFile}
      </span>
      <div className="relative flex h-full items-center overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2.5 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30 dark:ring-white/5">
        <div className="w-full">
          <FilePreview formatFile={formatFile} />
        </div>
        <span className="absolute end-0 top-0 h-3 w-3 rounded-bl-md border-b border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default FileCard;
