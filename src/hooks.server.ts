import { redirect, type Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { PUBLIC_STATIC_URL } from "$env/static/public";
import { get } from "$lib/request";

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
  const token = event.cookies.get('Authorization');
  if(token) {
    if(['/login', '/signup'].includes(pathname)) {
      throw redirect(302, '/');
    }
    const { success, message, data } = await get('i/profile').send<User.Info>(event.cookies);
    if(success) {
      event.locals = {
        user: data,
      };
    } else {
      console.log(message, success);
    }
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
    }
  })
}