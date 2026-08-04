import { Play } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { DistributorLesson } from "@/data/distributorLessons";

export function LessonModal({
  lesson,
  lang,
  onClose,
}: {
  lesson: DistributorLesson | null;
  lang: "en" | "hi";
  onClose: () => void;
}) {
  const title = lesson && lang === "hi" && lesson.translations ? lesson.translations.hi.title : lesson?.title;
  const summary =
    lesson && lang === "hi" && lesson.translations ? lesson.translations.hi.summary : lesson?.summary;

  return (
    <Modal open={!!lesson} onClose={onClose} maxWidth="max-w-lg">
      {lesson && (
        <div className="p-7">
          <div
            className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
              <Play size={24} fill="currentColor" />
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge tone={lesson.category === "Market Update" ? "orange" : "blue"}>{lesson.category}</Badge>
            <span className="text-[11px] text-gray-400">{lesson.videoMins} min video</span>
          </div>
          <h2 className="mt-2 text-lg font-bold text-primary-dark">{title}</h2>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">{summary}</p>

          <div className="mt-4 space-y-4">
            {lesson.sections.map((s) => (
              <div key={s.heading}>
                <h4 className="text-xs font-bold uppercase tracking-wide text-primary">{s.heading}</h4>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
