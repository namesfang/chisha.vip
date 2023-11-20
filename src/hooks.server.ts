import type { Handle } from "@sveltejs/kit";

type Prepls = {
  [key: string]: (prod: boolean, origin: string)=> string
}

const prepls: Prepls = {
  // CDN资源
  '%cdn.assets%': (prod, origin)=> {
    if(prod) {
      return 'http://static.chisha.vip';
    }
    return origin;
  },
  // 版权
  '%copyright%': ()=> {
    return '@'+ String(new Date().getFullYear());
  }
}

export const handle: Handle = async ({ event, resolve })=> {
  // event.locals.user = {
  //   a: 1312
  // }
  return resolve(event, {
    transformPageChunk: ({ html })=> {
      Object.keys(prepls).forEach((n, i)=> {
        html = html.replaceAll(n, Object.values(prepls)[i](process.env.NODE_ENV === 'production', event.url.origin))
      })
      return html;
    },
  })
}