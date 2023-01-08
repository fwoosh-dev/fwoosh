declare module "copy-template-dir" {
  function copy(
    inDir: string,
    outDir: string,
    vars: Record<string, unknown>,
    cb: (err: Error, createdFiles: string[]) => void
  ) {}

  export default copy;
}
