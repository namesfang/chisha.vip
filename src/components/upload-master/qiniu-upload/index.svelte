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

    const name = file.name;

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

    const url = `${makeManageDomain(region)}/delete/${path}`

    const { hostname, pathname, search } = new URL(url);

    const headers: {[k: string]: string} = {
      'X-Qiniu-Date': dayjs().format('YYYYMMDDTHHmmss') + 'Z',
    }

    const pieces = [
      search
        ? `${method.toUpperCase()} ${pathname}${search}`
        : `${method} ${pathname}`,
        `Host: ${hostname}`,
        `Content-Type: application/x-www-form-urlencoded`,
    ];

    if (headers) {
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

    console.log('body', body)

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
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Qiniu ${data.token}`,
        }
      })

      const qiniuData = await qiniuResult.json()

      console.log('qiniuData', qiniuData);
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