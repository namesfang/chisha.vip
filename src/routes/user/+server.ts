import { json } from '@sveltejs/kit'

export async function GET({ platform }) {
  console.log('platform', platform)
  const result = platform?.env.CHISHA_D1_PRE.prepare('select * from user where id=1').run()

  console.log('result', result)

  return json(result)
}