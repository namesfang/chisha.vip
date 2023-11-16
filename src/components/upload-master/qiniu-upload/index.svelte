<script lang="ts">
  export let type = '';

  const body = new FormData()

  const change = async (e: Event)=> {
    const $input = e.target as HTMLInputElement

    if(!$input.files || $input.files.length !== 1) {
      return
    }

    const file = $input.files![0]

    const name = file.name;

    const result = await fetch('http://localhost:8080/upload/qiniu', {
      method: 'POST',
      body: JSON.stringify({
        name
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    const { success, data } = await result.json()
    
    if(success) {
      body.append('key', name)
      body.append('token', data.token)
      body.append('file', file)

      const result = await fetch('https://upload-z0.qiniup.com', {
        body,
        method: 'POST',
        mode: 'cors',
      })

      const data2 = await result.json()

      console.log(data2)
    }
  }
</script>

<div class="">
  <input type="file" on:change={ change }/>

  <input type="hidden" data-type={ type }/>
</div>