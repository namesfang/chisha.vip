<script lang="ts">
  import dayjs from 'dayjs';
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
    const name = 'pdf.png'

    const path = btoa(name);

    // const url = `https://rs.qiniu.com/delete/${path}`;
    const url = `${makeManageDomain(region)}/delete/${path}`
    // const url = 'http://rs.qiniu.com/move/bmV3ZG9jczpmaW5kX21hbi50eHQ=/bmV3ZG9jczpmaW5kLm1hbi50eHQ='

    const { hostname, pathname, search } = new URL(url);

    const headers: {[k: string]: string} = {};
    // const headers = {
    //   'X-Qiniu-Date': dayjs().format('YYYYMMDDTHHmmss') + 'Z',
    // }

    const pieces = [
      search
        ? `${method.toUpperCase()} ${pathname}${search}`
        : `${method} ${pathname}`,
        `Host: ${hostname}`,
        // `Content-Type: application/x-www-form-urlencoded`,
    ];

    if (Object.keys(headers).length > 0) {
      const keys = Object.keys(headers).filter(
        (key) => key.indexOf('X-Qiniu-') === 0,
      );
      keys.forEach((key) => {
        pieces.push(`${key}: ${headers[key]}`);
      });
    }

    pieces.push('');
    pieces.push('');

    // if (body) {
    //   pieces.push(body);
    // }

    const body = pieces.join('\n')

    console.log('body', JSON.stringify({
        body
      }))

    const result = await fetch('http://localhost:8080/storage/qiniu/delete-token', {
      body: JSON.stringify({
        body
      }),
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const { success, data } = await result.json();

    if(success) {
      const qiniuResult = await fetch(url, {
        mode: 'cors',
        method,
        headers: {
          ...headers,
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Qiniu ${data.token}`,
        }
      })

      const qiniuData = await qiniuResult.text()

      console.log('qiniuData', qiniuData);
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
  <input type="file" on:change={ changeHandle }/>

  <input type="hidden" data-type={ type }/>
</div>

<div>
  <button type="button" on:click={ deleteHandle }>删除</button>
</div>

<div class="">
  <input type="text" bind:value={ dirname } />
  <button type="button" on:click={ mkdir }>创建目录</button>
</div>