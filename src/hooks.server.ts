import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve })=> {
  // event.locals.user = {
  //   a: 1312
  // }
  return resolve(event, {
    transformPageChunk: ({ html })=> {
      return html.replaceAll('%copyright%', '@'+String(new Date().getFullYear()))
    },
  })
}