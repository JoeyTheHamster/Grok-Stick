import { KIT_FILES, KIT_FOLDER, KIT_ZIP_NAME } from "./manifest";

export async function buildKitBlob(): Promise<Blob> {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const root = zip.folder(KIT_FOLDER);
  if (!root) throw new Error("Could not create kit folder");

  for (const file of KIT_FILES) {
    const opts: { unixPermissions?: number; binary?: boolean } = {};
    if (file.executable) opts.unixPermissions = 0o100755;
    else opts.unixPermissions = 0o100644;
    root.file(file.path, file.content, opts);
  }

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/zip",
    platform: "UNIX",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

export async function triggerKitDownload(): Promise<void> {
  const blob = await buildKitBlob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = KIT_ZIP_NAME;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  window.setTimeout(() => {
    anchor.remove();
    URL.revokeObjectURL(url);
  }, 4_000);
}
