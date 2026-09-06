import { useEffect, useState } from "react";

const LINES = [
  { delay: 400, text: "$ /Volumes/USB/GrokStick/grok", tone: "cmd" },
  { delay: 1600, text: "Grok Stick: fetching grok 1.0.13 (macos-aarch64) onto this drive...", tone: "muted" },
  { delay: 3200, text: "Ready. Nothing installed on this Mac.", tone: "ok" },
  { delay: 4000, text: "grok · portable · home=/Volumes/USB/GrokStick/home", tone: "fg" },
] as const;

export function TerminalDemo() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      window.setTimeout(() => setShown(i + 1), line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-raised" />
        <span className="size-2.5 rounded-full bg-raised" />
        <span className="size-2.5 rounded-full bg-raised" />
        <span className="ml-2 font-mono text-xs text-subtle">first run · this computer</span>
      </div>
      <div className="min-h-44 space-y-2 px-4 py-4 font-mono text-sm leading-relaxed">
        {LINES.slice(0, shown).map((line) => (
          <p
            key={line.text}
            className={
              line.tone === "cmd"
                ? "text-fg"
                : line.tone === "ok"
                  ? "text-ok"
                  : line.tone === "muted"
                    ? "text-muted"
                    : "text-fg"
            }
          >
            {line.text}
          </p>
        ))}
        {shown < LINES.length ? (
          <span className="inline-block h-4 w-2 bg-accent align-middle" />
        ) : (
          <span className="gs-caret inline-block h-4 w-2 bg-accent align-middle" />
        )}
      </div>
    </div>
  );
}
