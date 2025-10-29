export const ErrorIcon = ({
  width = 24,
  height = 24,
  color = '#EF4444',
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill={color} opacity="0.1" />

      <line x1="7" y1="7" x2="17" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="7" x2="7" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
