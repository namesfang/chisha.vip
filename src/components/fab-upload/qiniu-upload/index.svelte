<script lang="ts">
  export let type = '';

  const changeHandle = async (e: Event)=> {
    const $input = e.target as HTMLInputElement

    if(!$input.files || $input.files.length !== 1) {
      return
    }

    const file = $input.files![0]

    const method = 'POST';

    const body = new FormData()

    const result = await fetch('http://localhost:8080/upload/token', {
      method,
      body: JSON.stringify({
        name: file.name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { success, data } = await result.json()
    
    if(success) {
      body.append('key', file.name)
      body.append('token', data.token)
      body.append('file', file)

      const result = await fetch(data.host, {
        body,
        method,
      })

      const data2 = await result.json()

      console.log(data2)
    }
  }

  let path = ''

  const deleteHandle = async ()=> {
    const method = 'POST'

    const result = await fetch('http://localhost:8080/upload/remove', {
      body: JSON.stringify({
        path
      }),
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const { success, data } = await result.json();

    if(success) {
      console.log('mt', data)
    }
  }
</script>

<div class="">
  <ul>
    <li>
      <input type="file" on:change={ changeHandle }/>
    </li>
  </ul>

  <input type="hidden" data-type={ type }/>
</div>

<div>
  <input type="text" bind:value={ path } />
  <button type="button" on:click={ deleteHandle }>删除</button>
</div>