<script lang="ts">
  import UploadMaster from '$components/upload-master/index.svelte'
  
  const uploadError = ()=> {
    console.log('upload error')
  }
</script>

<h2>主页</h2>

<a href="/login">登录</a>

<a href="/signup">注册</a>

<a href="/metoo">Metoo</a>


<UploadMaster platform="qiniu" type="image" region="华东-浙江2" on:error={ uploadError }/>