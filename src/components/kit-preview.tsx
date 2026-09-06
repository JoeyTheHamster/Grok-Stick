import { File, Folder } from "lucide-react";
import { TREE_ROWS } from "@/lib/kit/manifest";

export function KitPreview() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <p className="mb-4 font-mono text-xs tracking-wide text-subtle uppercase">
        GrokStick/
      </p>
      <ul className="space-y-2.5">
        {TREE_ROWS.map((row) => (
          <li key={row.name} className="flex items-start gap-3">
            {row.kind === "dir" ? (
              <Folder className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={1.5} />
            ) : (
              <File className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={1.5} />
            )}
            <div className="min-w-0">
              <p className="font-mono text-sm text-fg">{row.name}</p>
              <p className="text-sm text-muted">{row.hint}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
