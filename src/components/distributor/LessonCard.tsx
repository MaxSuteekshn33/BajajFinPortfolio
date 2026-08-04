import { Play } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DistributorLesson } from "@/data/distributorLessons";

export function LessonCard({
  lesson,
  lang,
  onOpen,
}: {
  lesson: DistributorLesson;
  lang: "en" | "hi";
  onOpen: () => void;
}) {
  const title = lang === "hi" && lesson.translations ? lesson.translations.hi.title : lesson.title;
  const summary = lang === "hi" && lesson.translations ? lesson.translations.hi.summary : lesson.summary;

  return (
    <Card className="cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-md" onClick={onOpen}>
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white">
          <Play size={18} fill="currentColor" />
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Badge tone={lesson.category === "Market Update" ? "orange" : "blue"}>{lesson.category}</Badge>
          <span className="text-[11px] text-gray-400">{lesson.videoMins} min</span>
        </div>
        <h3 className="mt-2 text-sm font-bold leading-snug text-primary-dark">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{summary}</p>
      </div>
    </Card>
  );
}
