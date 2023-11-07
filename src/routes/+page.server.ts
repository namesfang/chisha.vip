export function load({ platform }) {

  console.log('platform', platform)
  const result = platform?.env.CHISHA_D1_PRE.prepare('select * from user where id=1').run()
  
  console.log(result)
  return {
    name: 'ddd',
    result: JSON.stringify(result),
  }
}