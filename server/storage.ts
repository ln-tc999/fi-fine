import fs from "node:fs";
import path from "node:path";

const STORAGE_DIR = path.resolve(import.meta.dirname, "..", "storage");

function ensureDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  _contentType?: string
): Promise<{ key: string; url: string }> {
  ensureDir();
  const key = relKey.replace(/^\/+/, "");
  const filePath = path.join(STORAGE_DIR, key);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, data);
  return { key, url: `/storage/${key}` };
}

export async function storageGet(
  relKey: string
): Promise<{ key: string; url: string }> {
  const key = relKey.replace(/^\/+/, "");
  return { key, url: `/storage/${key}` };
}
