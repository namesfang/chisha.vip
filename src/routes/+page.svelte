<script lang="ts">
  import FabUpload from '$components/fab-upload/index.svelte'
  
  const uploadError = ()=> {
    console.log('upload error')
  }
</script>

<h2>主页</h2>

<a href="/login">登录</a>

<a href="/signup">注册</a>

<a href="/metoo">Metoo</a>


<FabUpload platform="qiniu" type="image" region="华东-浙江2" on:error={ uploadError }/>