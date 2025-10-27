interface SuccessInfoProps {
  width?: number;
  height?: number;
  color?: string;
}

export function SuccessIcon({ width = 24, height = 24, color = '#22C55E' }: SuccessInfoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill={color} opacity="0.1" />

      <path
        d="M6 12l4 4 8-8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
