export function InfoIcon({
  width = 24,
  height = 24,
  color = '#FACC15',
}: {
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill={color} opacity="0.1" />

      <line x1="12" y1="9" x2="12" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />

      <circle cx="12" cy="6" r="1.5" fill={color} />
    </svg>
  );
}
