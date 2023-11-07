import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve })=> {
  return resolve(event, {
    transformPageChunk: ({ html })=> {
      return html.replaceAll('%copyright%', '@'+String(new Date().getFullYear()))
    },
  })
}