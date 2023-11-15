<script lang="ts">

  const body = new FormData()

  const change = async (e)=> {

    const $input: HTMLInputElement = e.target;

    if(!$input.files || $input.files.length !== 1) {
      return
    }

    const file = $input.files![0]

    const bucket = 'codeoc';
    const name = file.name;

    const result = await fetch('http://localhost:8080/upload', {
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
      body.append('key',  `${bucket}:${name}`)
      body.append('upload_token', data.token)
      body.append('file', file)
    }
  }

  const upload = async ()=> {

    const result = await fetch('https://upload-z0.qiniup.com', {
      body,
      method: 'POST',
    })

    console.log(result)
  }
</script>

<div class="form">
  <input type="file" on:change={ change }/>
  <button type="button" on:click={ upload }>Upload</button>
</div>

<style lang="scss">
  .form {
    padding: 3rem;
    button {
      margin-top: 2rem;
    }
  }
</style>