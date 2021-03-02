import onImport from "await-to-js";
import { promises as fs } from "fs";

const on = (onImport as any).default as typeof onImport;

export const exists = async (p: string) => {
  const [, mockPagesExists] = await on(fs.stat(p));

  return Boolean(mockPagesExists);
};
