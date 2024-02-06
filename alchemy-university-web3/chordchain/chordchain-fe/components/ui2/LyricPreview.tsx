import { cn } from "@/lib/utils";

export default function LyricPreview({
  lyric,
  className,
}: {
  lyric: string;
  className?: string;
}) {
  if (!lyric) return "";
  const lyricWithBr = lyric.replace(/\n/gi, "<br/>");
  const chords = lyricWithBr.replace(
    /(\[[\w\/]+\])([^\s]+)/gi,
    `<span class="h-11 relative inline-flex items-end">$2 <strong class="absolute top-0 left-0">$1</strong></span>`
  );

  return (
    <section
      dangerouslySetInnerHTML={{ __html: chords }}
      className={cn("w-fit", className)}
    ></section>
  );
}
