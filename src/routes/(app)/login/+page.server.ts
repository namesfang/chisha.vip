import { post } from '$lib/request.js';
import {  fail, redirect } from '@sveltejs/kit';

type UserInfo = {
  token: string;
}

export const actions = {
  async default({ cookies, request }) {
    const formData = await request.formData();

    const form = {
      phone: '',
      password: '',
    }

    let name: keyof typeof form;
    let value;
    for(name in form) {
      value = formData.get(name);
      if(value) {
        form[name] = String(value);
      } else {
        return fail(422, {
          error: '校验错误',
          error2: '<p>{ form.error }</p>',
        })
      }
    }

    const { success, code, message, data } = await post('login', form).send<UserInfo>(cookies);

    if(success) {
      cookies.set('Authorization', data.token, {
        maxAge: 7200,
        sameSite: 'strict',
      });
      throw redirect(302, '/');
    } else {
      throw fail(code, {
        message,
      });
    }
  }
}