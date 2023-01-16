import { CONTENT_ID } from "./constants.js";

export function resetContentScrollPosition() {
  const content = document.querySelector(`#${CONTENT_ID}`);

  if (content) {
    content.scrollTop = 0;
  }
}
