export function UsbStick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gs-body" x1="80" y1="20" x2="400" y2="200">
          <stop offset="0%" stopColor="var(--color-fg)" />
          <stop offset="45%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-muted)" />
        </linearGradient>
        <linearGradient id="gs-edge" x1="70" y1="40" x2="70" y2="180">
          <stop offset="0%" stopColor="var(--color-fg)" />
          <stop offset="100%" stopColor="var(--color-muted)" />
        </linearGradient>
        <linearGradient id="gs-plug" x1="0" y1="70" x2="90" y2="150">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-subtle)" />
        </linearGradient>
      </defs>

      <rect x="18" y="78" width="72" height="64" rx="4" fill="url(#gs-plug)" />
      <rect x="8" y="86" width="18" height="48" rx="2" fill="var(--color-subtle)" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={28}
          y={90 + i * 10}
          width="52"
          height="5"
          rx="1"
          fill="var(--color-bg)"
          opacity="0.7"
        />
      ))}

      <rect x="84" y="48" width="312" height="124" rx="18" fill="url(#gs-body)" />
      <rect
        x="90"
        y="54"
        width="300"
        height="112"
        rx="14"
        fill="url(#gs-edge)"
        opacity="0.18"
      />

      <rect x="132" y="72" width="232" height="76" rx="10" fill="var(--color-bg)" />
      <text
        x="248"
        y="118"
        textAnchor="middle"
        fill="var(--color-fg)"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontStyle="italic"
        letterSpacing="4"
      >
        GROK STICK
      </text>

      <rect x="368" y="96" width="10" height="28" rx="2" fill="var(--color-bg)" />
      <rect x="370" y="106" width="6" height="8" rx="1" className="gs-led" fill="var(--color-led)" />

      <circle
        cx="372"
        cy="70"
        r="7"
        fill="none"
        stroke="var(--color-subtle)"
        strokeWidth="3"
      />
    </svg>
  );
}
