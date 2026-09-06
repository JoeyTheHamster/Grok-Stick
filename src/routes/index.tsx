import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Copy,
  HardDrive,
  KeyRound,
  ShieldOff,
  Usb,
} from "lucide-react";
import { DownloadKit } from "@/components/download-kit";
import { KitPreview } from "@/components/kit-preview";
import { TerminalDemo } from "@/components/terminal-demo";
import { UsbStick } from "@/components/usb-stick";
import { cn } from "@/lib/cn";
import { PLATFORMS } from "@/lib/kit/manifest";
import { getCliVersion } from "@/lib/kit/version";

export const Route = createFileRoute("/")({
  loader: () => getCliVersion(),
  component: Home,
});

const STEPS = [
  {
    n: "01",
    title: "Unzip onto a stick",
    body: "Format the drive as exFAT so Windows, Mac, and Linux can all read it. Drop the GrokStick folder on the root.",
  },
  {
    n: "02",
    title: "Run the launcher",
    body: "From any project folder, call grok.cmd (Windows) or grok (macOS/Linux) on the stick. First run fetches that computer’s binary onto the drive.",
  },
  {
    n: "03",
    title: "Unplug. Repeat.",
    body: "Login, settings, and sessions live in home/ on the stick. The host is left untouched — no PATH edits, no ~/.grok.",
  },
] as const;

const COMMANDS = [
  {
    label: "Windows",
    lines: ["cd C:\\Users\\you\\project", "E:\\GrokStick\\grok.cmd"],
  },
  {
    label: "macOS",
    lines: ["cd ~/project", "/Volumes/USB/GrokStick/grok"],
  },
  {
    label: "Linux",
    lines: ["cd ~/project", "/media/$USER/USB/GrokStick/grok"],
  },
] as const;

const FAQS = [
  {
    q: "Does this install Grok on the computer?",
    a: "No. The launcher sets GROK_HOME to the stick’s home folder and GROK_DISABLE_AUTOUPDATER so the official CLI never writes into your user profile. Session PATH helpers (env.sh / env.ps1) last only for that terminal.",
  },
  {
    q: "Does it work without internet?",
    a: "After the binary is on the stick, you don’t need the official installer or npm. Grok still needs internet to talk to xAI — this is a portable install, not an offline model.",
  },
  {
    q: "How do I sign in?",
    a: "First launch opens a browser. The session is saved as home/auth.json on the stick and travels with you until it expires (about 7 days). Or paste an API key from console.x.ai into home/api-key.",
  },
  {
    q: "Can I preload every operating system?",
    a: "Yes. Run fetch-all.cmd (Windows) or ./fetch-all.sh (macOS/Linux) once on a fast connection. That puts Windows, Mac, and Linux binaries on the drive so the next machine skips the download.",
  },
  {
    q: "What if macOS or Windows blocks it?",
    a: "These are the official binaries from x.ai/cli, unsigned as a portable copy. On Mac: Privacy & Security → Open Anyway. On Windows: SmartScreen → Run anyway. The Unix launcher also clears the quarantine flag when it can.",
  },
  {
    q: "What if I lose the stick?",
    a: "Treat it like a lost password manager. home/auth.json and home/api-key are your Grok login. Sign out from grok.com if you used browser login, and rotate the API key.",
  },
] as const;

function Home() {
  const { version } = Route.useLoaderData();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-96 gs-wash" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <Usb className="size-4 text-accent" strokeWidth={1.75} />
          <span className="text-sm font-medium tracking-wide">Grok Stick</span>
        </div>
        <p className="font-mono text-xs text-subtle">CLI {version}</p>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-6 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pt-10 lg:pb-24">
        <div className="gs-stagger">
          <p className="mb-5 font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Portable Grok CLI
          </p>
          <h1 className="font-display text-3xl leading-tight tracking-tight text-fg">
            Keep Grok on a flash drive.
            <span className="mt-2 block italic text-muted">Leave nothing installed.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted">
            A tiny kit that launches the official Grok CLI from USB. The binary, your
            login, and your sessions stay on the stick — so the next machine is just
            plug in and run.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <DownloadKit />
            <p className="text-sm text-subtle">
              ~20 KB zip. The CLI binary downloads onto the stick on first run.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl border border-border bg-surface px-4 py-8 sm:px-8">
            <UsbStick className="mx-auto w-full max-w-md" />
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="font-mono text-xs text-subtle uppercase">On the stick</p>
                <p className="mt-1 text-sm text-fg">Launcher + home + bin</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-subtle uppercase">Host</p>
                <p className="mt-1 text-sm text-fg">Untouched</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.n} className="bg-bg px-5 py-8 sm:px-8 sm:py-10">
              <p className="font-mono text-xs text-subtle">{step.n}</p>
              <h2 className="mt-3 font-display text-xl italic tracking-tight">{step.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div>
          <h2 className="font-display text-2xl tracking-tight italic">What’s in the kit</h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Launchers for every desktop OS, a home folder Grok will actually use, and
            empty bin slots that fill themselves the first time you run.
          </p>
          <div className="mt-8">
            <KitPreview />
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl tracking-tight italic">First plug-in</h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Same stick, new computer: if that OS is already in bin/, it starts
            immediately. Otherwise it fetches once, onto the drive.
          </p>
          <div className="mt-8">
            <TerminalDemo />
          </div>
        </div>
      </section>

      <RunFromProject />

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 className="font-display text-2xl tracking-tight italic">
            How it stays portable
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Fact
              icon={HardDrive}
              title="GROK_HOME on the stick"
              body="Config, auth.json, sessions, and memory write under GrokStick/home — not ~/.grok on the host."
            />
            <Fact
              icon={ShieldOff}
              title="No host installer"
              body="Auto-update is off. PATH helpers are session-only. Unplug and the computer is as you found it."
            />
            <Fact
              icon={KeyRound}
              title="Login travels with you"
              body="Browser sign-in is stored on the drive. Optional API key file if you would rather skip the browser."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl tracking-tight italic">Platforms</h2>
            <p className="text-sm text-muted">Official binaries from x.ai/cli</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs tracking-wide text-subtle uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium sm:px-5">System</th>
                  <th className="px-4 py-3 font-medium sm:px-5">CPU</th>
                  <th className="px-4 py-3 font-medium sm:px-5">On-stick size</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3.5 sm:px-5">{p.os}</td>
                    <td className="px-4 py-3.5 text-muted sm:px-5">{p.cpu}</td>
                    <td className="px-4 py-3.5 font-mono text-muted sm:px-5">{p.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            First run stores only the current computer’s binary. Preload all six with
            fetch-all if you want the stick ready for whatever you plug into next.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 className="font-display text-2xl tracking-tight italic">Questions</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-subtle transition-transform duration-200 ease-out group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div>
            <h2 className="font-display text-2xl tracking-tight italic">
              Copy it onto a stick and go.
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              Uses the official Grok CLI from x.ai. This kit is a portable wrapper — it
              does not modify the binary.
            </p>
          </div>
          <DownloadKit size="md" />
        </div>
      </section>
    </main>
  );
}

function Fact({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof HardDrive;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <Icon className="size-4 text-accent" strokeWidth={1.75} />
      <h3 className="mt-4 text-base font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}

function RunFromProject() {
  const [os, setOs] = useState<(typeof COMMANDS)[number]["label"]>("Windows");
  const [copied, setCopied] = useState(false);
  const active = COMMANDS.find((c) => c.label === os) ?? COMMANDS[0];
  const block = active.lines.join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(block);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl tracking-tight italic">
              Run it from a project
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              The working directory is whatever folder you are in — the stick only
              supplies the binary and GROK_HOME.
            </p>
          </div>
          <div className="flex rounded-md border border-border bg-bg p-1">
            {COMMANDS.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setOs(c.label)}
                className={cn(
                  "h-11 min-w-20 rounded-sm px-3 text-sm transition-colors duration-150",
                  os === c.label ? "bg-raised text-fg" : "text-muted hover:text-fg",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-xl border border-border bg-bg">
          <button
            type="button"
            onClick={copy}
            className="absolute top-3 right-3 inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 text-xs text-muted hover:text-fg"
          >
            {copied ? (
              <Check className="size-3.5 text-ok" strokeWidth={2} />
            ) : (
              <Copy className="size-3.5" strokeWidth={1.75} />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <pre className="overflow-x-auto px-5 py-6 pr-28 font-mono text-sm leading-7 text-fg">
            {active.lines.map((line) => (
              <span key={line} className="block">
                <span className="text-subtle">$ </span>
                {line}
              </span>
            ))}
          </pre>
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <ArrowRight className="size-3.5" strokeWidth={1.75} />
          Optional: source env.sh or env.ps1 so this terminal can just type grok.
        </p>
      </div>
    </section>
  );
}
