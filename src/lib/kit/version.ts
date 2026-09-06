import { createServerFn } from "@tanstack/react-start";

const FALLBACK = "1.0.13";

export const getCliVersion = createServerFn({ method: "GET" }).handler(
  async () => {
    const urls = [
      "https://x.ai/cli/stable",
      "https://storage.googleapis.com/grok-build-public-artifacts/cli/stable",
    ];
    for (const url of urls) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) continue;
        const version = (await res.text()).trim().split(/\s+/)[0] ?? "";
        if (/^\d+\.\d+\.\d+/.test(version)) return { version };
      } catch {
        /* try next */
      }
    }
    return { version: FALLBACK };
  },
);
