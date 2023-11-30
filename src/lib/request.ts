import { PUBLIC_SERVE_URL } from "$env/static/public";
import { parse, stringify } from 'qs';
import { recursive } from 'merge';
import type { Cookies } from "@sveltejs/kit";

type ScalarObject = {
  [key: string]: string | number | boolean;
}

type Headers = {
  [key: string]: string;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

type FetchOptions = {
  method: Method;
  path: string;
  timeout?: number;
  data?: ScalarObject,
  params: ScalarObject,
  headers?: Headers,
}

type Options = {
  timeout?: number
}

enum HttpMethod {
  GET     = 'GET',
  POST    = 'POST',
  PUT     = 'PUT',
  DELETE  = 'DELETE',
  OPTIONS = 'OPTIONS',
}

type Res<T> = {
  code: number;
  message: string;
  success: boolean;
  error: string;
  data: T
}

class Request {
  constructor(private options: FetchOptions) {}
  /**
   * 解析并合并params
   */
  private makeUrl(): string {
    // 接口域名
    let serve: string = PUBLIC_SERVE_URL;
    let path: string = this.options.path;
    const params = this.options.params;
    
    // 统一在url后加 /
    if(!serve.endsWith('/')) {
      serve += '/'
    }
    
    // 统一删除path前面的 /
    if(path.startsWith('/')) {
      path = path.substring(1)
    }
    
    // 未设置请求参数
    if(Object.keys(params).length === 0) {
      return serve + path;
    }
    
    // url中未携带参数
    if(path.indexOf('?') === -1) {
      return serve + path + '?' + stringify(params)
    }
    
    // 合并url中的参数和params
    // 'path/to?id=1024' ==> ['path/to', 'id=1024']
    const [pathinfo, query] = path.split('?', 2)
    
    // 保证截取的参数必须包含a=
    if(query.length > 0 && query.indexOf('=') > 0) {
      return `${serve}${pathinfo}?` + stringify(recursive(true, params, parse(query)))
    }
    return serve + pathinfo;
  }

  private async fetch(authorization?: string) {
    try {
      const { method, timeout } = this.options;

      const headers: Headers = {
        'Content-Type': 'application/json; charset=utf-8',
      }

      if(authorization) {
        headers.Authorization = `Bearer ${authorization}`;
      }

      const options: RequestInit = {
        headers,
        method: method,
        signal: AbortSignal.timeout(timeout ?? 30000),
      }

      if(typeof this.options.data === 'object') {
        options.body = JSON.stringify(this.options.data);
      }

      // console.log(this.makeUrl(), options)

      // 请求
      const response = await fetch(this.makeUrl(), options);

      // 根据contentype解析响应内容
      const type = response.headers.get('content-type');

      if(type?.startsWith('application/json')) {
        return await response.json();
      }
      if(type?.startsWith('text/plain') || type?.startsWith('text/html')) {
        return await response.text();
      }
      return await response.blob();
    } catch (error) {
      console.log('request.error', error)
    }
  }

  async send<T>(cookies?: Cookies, options?: Options): Promise<Res<T>> {
    let authorization = '';
    if(cookies) {
      authorization = cookies.get('Authorization') ?? '';
    }

    if(typeof options === 'object') {
      let name: keyof Options;
      for(name in options) {
        this.options[name] = options[name];
      }
    }
    return await this.fetch(authorization);
  }

  async download() {
    // 自定义
    return await this.fetch();
  }
}

export function get(path: string, params: ScalarObject = {}) {
  return new Request({
    method: HttpMethod.GET,
    path,
    params,
  });
}

export function put(path: string, data: ScalarObject = {}, params: ScalarObject = {}) {
  return new Request({
    method: HttpMethod.PUT,
    path,
    data,
    params,
  });
}

export function post(path: string, data: ScalarObject = {}, params: ScalarObject = {}) {
  return new Request({
    method: HttpMethod.POST,
    path,
    data,
    params,
  });
}

export function del(path: string, data: ScalarObject = {}, params: ScalarObject = {}) {
  return new Request({
    method: HttpMethod.DELETE,
    path,
    data,
    params
  });
}