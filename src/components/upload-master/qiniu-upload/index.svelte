<script lang="ts">
	import { makeUploadDomain, makeManageDomain, type Label } from "./utils";

  export let type = '';
  export let region: Label;

  const changeHandle = async (e: Event)=> {
    const $input = e.target as HTMLInputElement

    if(!$input.files || $input.files.length !== 1) {
      return
    }

    const file = $input.files![0]

    const name = `dirname/${file.name}`;

    const method = 'POST';

    const body = new FormData()

    const result = await fetch('http://localhost:8080/storage/qiniu/upload-token', {
      method,
      body: JSON.stringify({
        name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { success, data } = await result.json()
    
    if(success) {
      body.append('key', name)
      body.append('token', data.token)
      body.append('file', file)

      const result = await fetch(makeUploadDomain(region), {
        body,
        method,
      })

      const data2 = await result.json()

      console.log(data2)
    }
  }

  const deleteHandle = async ()=> {
    const method = 'POST'
    const bucket = 'chisha-bucket'
    const region = '华东-浙江2'
    const path = 'b.jpg'

    const result = await fetch('http://localhost:8080/storage/qiniu/delete-token', {
      body: JSON.stringify({
        path,
        bucket,
        region,
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

  let dirname = 'dirname';

  const mkdir = async ()=> {

    const name = `${dirname}/`;
    const file = new File([''], name);

    const method = 'POST';

    const body = new FormData()

    const result = await fetch('http://localhost:8080/storage/qiniu/upload-token', {
      method,
      body: JSON.stringify({
        name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { success, data } = await result.json()
    
    if(success) {
      body.append('key', name)
      body.append('token', data.token)
      body.append('file', file)

      const result = await fetch(makeUploadDomain(region), {
        body,
        method,
      })

      const data2 = await result.json()

      console.log(data2)
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
  <button type="button" on:click={ deleteHandle }>删除</button>
</div>

<div class="">
  <input type="text" bind:value={ dirname } />
  <button type="button" on:click={ mkdir }>创建目录</button>
</div>