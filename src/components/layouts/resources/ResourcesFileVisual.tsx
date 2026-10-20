import type { CSSProperties } from "react";
import FileCard, {
  type FormatFileProps,
} from "@/src/components/ui/file-card-collections";

const floatingFiles: {
  format: FormatFileProps;
  position: string;
  delay: number;
  duration: number;
}[] = [
  {
    format: "pdf",
    position: "start-[3%] top-[24%] z-20 -rotate-12 sm:start-[5%]",
    delay: 0,
    duration: 4.2,
  },
  {
    format: "doc",
    position: "start-[41%] top-[2%] z-20 rotate-6",
    delay: 0.45,
    duration: 4.8,
  },
  {
    format: "pptx",
    position: "end-[3%] top-[22%] z-20 rotate-12 sm:end-[5%]",
    delay: 0.9,
    duration: 4.5,
  },
  {
    format: "xlsx",
    position: "start-[1%] bottom-[22%] z-20 rotate-6 sm:start-[4%]",
    delay: 0.25,
    duration: 5,
  },
  {
    format: "tsx",
    position: "end-[1%] bottom-[27%] z-20 -rotate-12 sm:end-[4%]",
    delay: 0.7,
    duration: 4.6,
  },
  {
    format: "zip",
    position: "end-[19%] bottom-[2%] z-20 rotate-6",
    delay: 1.1,
    duration: 5.2,
  },
];

export default function ResourcesFileVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[28rem] select-none"
    >
      <div className="absolute inset-[15%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,rgba(6,182,212,0)_72%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.16)_0%,rgba(59,130,246,0)_72%)]" />
      <div className="absolute inset-x-[19%] bottom-[17%] z-[1] h-[45%] rounded-[1.75rem] bg-linear-to-br from-sky-400 via-blue-600 to-blue-800 shadow-xl shadow-blue-900/20 dark:shadow-blue-950/50" />
      <div className="absolute bottom-[55%] start-[27%] z-[1] h-[10%] w-[27%] rounded-t-2xl bg-sky-400 dark:bg-sky-500" />

      <div className="absolute left-1/2 top-[19%] z-[2] h-[47%] w-[39%] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-900/10 dark:border-white/10 dark:bg-slate-100">
        <div className="mt-2 h-2 w-1/2 rounded-full bg-blue-200" />
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-slate-200" />
          <div className="h-1.5 w-full rounded-full bg-slate-200" />
          <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
        </div>
      </div>

      <div className="absolute bottom-[37%] start-[34%] z-[3] h-[16%] w-[34%] rounded-xl bg-linear-to-r from-amber-300 to-yellow-500 shadow-md shadow-amber-900/15" />
      <div className="absolute inset-x-[19%] bottom-[13%] z-[4] h-[32%] overflow-hidden rounded-[1.75rem] border border-blue-400/60 bg-linear-to-br from-blue-500 via-blue-600 to-indigo-800 shadow-xl shadow-blue-950/25 dark:border-blue-300/20">
        <div className="absolute inset-x-5 top-4 h-2 rounded-full bg-white/15" />
        <div className="absolute -bottom-10 -end-8 size-28 rounded-full border-[12px] border-white/5" />
      </div>

      {floatingFiles.map(({ format, position, delay, duration }) => (
        <div
          key={format}
          className={`resources-file-float absolute ${position}`}
          style={
            {
              "--file-float-duration": `${duration}s`,
              "--file-float-delay": `${delay}s`,
            } as CSSProperties
          }
        >
          <FileCard formatFile={format} />
        </div>
      ))}
    </div>
  );
}
