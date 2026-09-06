import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { triggerKitDownload } from "@/lib/kit/download";
import { KIT_ZIP_NAME } from "@/lib/kit/manifest";

export function DownloadKit({ size = "lg" }: { size?: "md" | "lg" }) {
  const [busy, setBusy] = useState(false);

  async function onDownload() {
    if (busy) return;
    setBusy(true);
    try {
      await triggerKitDownload();
      toast.success(`${KIT_ZIP_NAME} is ready — unzip it onto a USB drive.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Download failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      size={size}
      onClick={onDownload}
      disabled={busy}
      className="min-h-12 w-full sm:w-auto"
    >
      <Download className="size-4" strokeWidth={1.75} />
      {busy ? "Building kit…" : "Download Grok Stick"}
    </Button>
  );
}
