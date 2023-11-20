<script lang="ts">
  import UploadMaster from '$components/upload-master/index.svelte'
  
  const uploadError = ()=> {
    console.log('upload error')
  }
</script>

<a href="/login">登录</a>

<a href="/register">注册</a>

<a href="/metoo">Metoo</a>

<h2>User from D1:</h2>

<UploadMaster platform="aliyun" type="image" region="华东-浙江2" on:error={ uploadError }/>