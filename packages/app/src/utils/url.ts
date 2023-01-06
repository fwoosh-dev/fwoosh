export function convertMetaTitleToUrlParam(title: string) {
  return title.replace(/\//g, "-");
}
