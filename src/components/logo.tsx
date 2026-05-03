export function Logo({
  variant = "navy",
  size = 38,
  withMark = true,
}: {
  variant?: "navy" | "white" | "gold";
  size?: number;
  withMark?: boolean;
}) {
  const fill =
    variant === "white"
      ? "#F6F3EC"
      : variant === "gold"
        ? "#C89A3A"
        : "#0E1A3A";
  const accent =
    variant === "navy" ? "#C89A3A" : variant === "white" ? "#ECD28F" : "#0E1A3A";

  return (
    <span className="inline-flex items-center gap-3" aria-label="Edubros">
      {withMark ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle
            cx="32"
            cy="32"
            r="30.5"
            stroke={fill}
            strokeOpacity="0.7"
            strokeWidth="1"
          />
          <circle
            cx="32"
            cy="32"
            r="27.5"
            stroke={fill}
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          {/* Mortarboard top */}
          <path
            d="M32 18 L52 26 L32 34 L12 26 Z"
            fill={fill}
          />
          {/* Top highlight */}
          <path
            d="M32 18 L52 26 L32 34"
            fill={fill}
            fillOpacity="0.85"
          />
          {/* Cap base / scholar's cap underside */}
          <path
            d="M20 30 V40 C20 44 25 47 32 47 C39 47 44 44 44 40 V30"
            stroke={fill}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tassel cord */}
          <path
            d="M52 26 L52 38"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Tassel ball */}
          <circle cx="52" cy="40" r="2.4" fill={accent} />
        </svg>
      ) : null}
      <span
        className="font-serif font-medium tracking-[0.2em] uppercase"
        style={{ color: fill, fontSize: size * 0.42 }}
      >
        Edubros
      </span>
    </span>
  );
}

export function Fleur({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3 C 11 7, 8 9, 5 9 C 8 10, 11 12, 12 16 C 13 12, 16 10, 19 9 C 16 9, 13 7, 12 3 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="12" cy="20" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
