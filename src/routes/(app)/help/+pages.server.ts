import { get } from "$lib/request";

export async function load({ cookies }) {
  // const email = 'namo.fang@ixiaoshuidi.com';//'jixiang.f@gmail.com';//'jixiang_f@163.com';
  // const lower = email.trim().toLowerCase();
  // const hash = createHash('md5').update(lower, 'utf-8').digest('hex');

  // const d = encodeURIComponent('http://static.chisha.vip/static/favicon-114.png')

  const d = await get('upload/params', { key: 'file.name' }).send(cookies);

  console.log(d)

  return {
    // avatar: `https://gravatar.com/avatar/${hash}`,
  }
}