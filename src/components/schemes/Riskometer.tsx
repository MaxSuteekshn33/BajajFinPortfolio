import { RISK_LEVELS, RiskLevel } from "@/data/schemes";

const SEGMENT_COLORS = [
  "#15803d",
  "#65a30d",
  "#ca8a04",
  "#ea580c",
  "#dc2626",
  "#991b1b",
];

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function wedgePath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polar(cx, cy, r, startAngle);
  const end = polar(cx, cy, r, endAngle);
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y} Z`;
}

export function Riskometer({
  level,
  size = 160,
  showLabel = true,
}: {
  level: RiskLevel;
  size?: number;
  showLabel?: boolean;
}) {
  const levelIndex = RISK_LEVELS.findIndex((r) => r.level === level);
  const label = RISK_LEVELS[levelIndex]?.label ?? "Moderate";

  const cx = 100;
  const cy = 100;
  const r = 82;
  const segmentAngle = 180 / 6;

  const needleAngle = 180 - (levelIndex + 0.5) * segmentAngle;
  const needleTip = polar(cx, cy, r - 14, needleAngle);

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 200 115" width={size} height={size * 0.575}>
        {RISK_LEVELS.map((_, i) => {
          const start = 180 - i * segmentAngle;
          const end = 180 - (i + 1) * segmentAngle;
          return (
            <path
              key={i}
              d={wedgePath(cx, cy, r, start, end)}
              fill={SEGMENT_COLORS[i]}
              opacity={i === levelIndex ? 1 : 0.25}
              stroke="#fff"
              strokeWidth={1.5}
            />
          );
        })}
        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="#10182b"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={5} fill="#10182b" />
      </svg>
      {showLabel && (
        <div className="-mt-1 text-center">
          <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
            Riskometer
          </p>
          <p className="text-sm font-bold" style={{ color: SEGMENT_COLORS[levelIndex] }}>
            {label}
          </p>
        </div>
      )}
    </div>
  );
}
