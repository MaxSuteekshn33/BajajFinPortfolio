import { Sparkles } from "lucide-react";
import { Tooltip } from "./Tooltip";

export function AiTag({ className = "" }: { className?: string }) {
  return (
    <Tooltip content="This content is AI-assisted and descriptive only. It is not a recommendation to buy, hold, or redeem any scheme — please consult a financial advisor before investing.">
      <span
        className={`inline-flex cursor-help items-center gap-1 rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-semibold text-primary ${className}`}
      >
        <Sparkles size={11} />
        AI-assisted, not investment advice
      </span>
    </Tooltip>
  );
}
