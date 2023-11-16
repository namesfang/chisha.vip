/*
  {
    "success": true,
    "meta": {
      "served_by": "v3-prod",
      "duration": 0.2487,
      "changes": 0,
      "last_row_id": 0,
      "changed_db": false,
      "size_after": 24576,
      "rows_read": 1,
      "rows_written": 0
    },
    "results": [
      {
        "id": 1,
        "role_id": 1,
        "avatar": "https://chisha.vip/assets/images/logo.png",
        "username": "kaixin",
        "nickname": "开心寿司",
        "phone": 15212429999,
        "email": "jixiang.f@gmail.com",
        "enabled": 1,
        "created_at": 1699341896
      }
    ]
  }
*/

// export async function load({ platform }) {

//   console.log('platform', platform)
//   const result = await platform?.env.CHISHA_D1_PRE.prepare('select * from user where id=1').run()
  
//   console.log(result)
//   return {
//     result: JSON.stringify(result),
//   }
// }