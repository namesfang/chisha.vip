import { redirect, type Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { PUBLIC_STATIC_URL } from "$env/static/public";
import local from "$extend/storage/local";

type Prepls = {
  [key: string]: (origin: string)=> string
}

const prepls: Prepls = {
  // CDN资源
  '%cdn.assets%': (origin)=> {
    if(building) {
      return PUBLIC_STATIC_URL;
    }
    return origin;
  },
  // 版权
  '%copyright%': ()=> {
    return '@'+ String(new Date().getFullYear());
  }
}

export const handle: Handle = async ({ event, resolve })=> {
  const { pathname } = event.url;
  const auth = event.cookies.get('Authorization');
  if(auth) {
    if(['/login', '/signup'].includes(pathname)) {
      throw redirect(302, '/');
    }

    // const info = await event.fetch();

    event.locals = local.user as App.Locals;
  } else {
    if(!['/login', '/signup', '/metoo'].includes(pathname)) {
      throw redirect(302, '/login');
    }
  }
  
  return resolve(event, {
    transformPageChunk: ({ html })=> {
      Object.keys(prepls).forEach((n, i)=> {
        html = html.replaceAll(n, Object.values(prepls)[i](event.url.origin))
      })
      return html;
    },
  })
}