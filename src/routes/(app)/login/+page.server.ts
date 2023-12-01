import { post } from '$lib/request.js';
import {  fail, redirect } from '@sveltejs/kit';

type UserInfo = {
  token: string;
}

export const actions = {
  async default({ cookies, request }) {
    const data = await request.formData();

    const formData = {
      phone: '',
      password: '',
    }

    let name: keyof typeof formData;
    let value;
    for(name in formData) {
      value = data.get(name);
      if(value) {
        formData[name] = String(value);
      } else {
        return fail(422, {
          error: '校验错误',
          error2: '<p>{ form.error }</p>',
        })
      }
    }

    const res = await post('login', formData).send<UserInfo>(cookies);

    if(res.success) {
      cookies.set('Authorization', res.data.token, {
        maxAge: 7200,
        sameSite: 'strict',
      });
      throw redirect(302, '/');
    }
  }
}