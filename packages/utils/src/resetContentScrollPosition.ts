export const CONTENT_ID = "content-scroll-area";

export function resetContentScrollPosition() {
  const content = document.querySelector(`#${CONTENT_ID}`);

  if (content) {
    content.scrollTop = 0;
  }
}
