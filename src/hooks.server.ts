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
  const passport = ['/login', '/signup'];
  const everyone = [...passport, '/metoo'];
  if(token) {
    // 登录后不允许再访问登录和注册页面
    if(passport.includes(pathname)) {
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
    // 未登录时且访问的页面需要登录时自动跳转到登录页面
    if(!pathname.startsWith('/help') && !everyone.includes(pathname)) {
      // throw redirect(302, '/');
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