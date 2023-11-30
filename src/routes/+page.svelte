<script lang="ts">
  import ClassicLayout from '$layouts/ClassicLayout.svelte';
  import FabUpload from '$components/fab-upload/index.svelte'
  
  export let data;

  console.log('df', data)

  const uploadError = ()=> {
    console.log('upload error')
  }
</script>

<ClassicLayout>
  {#if data?.user}
    <p>
      <a href="/i">{ data?.user.nickname }</a>
    </p>
  {:else}
    <a href="/login">登录</a>
    <a href="/signup">注册</a>
  {/if}


  <a href="/metoo">Metoo</a>

  <!-- <FabUpload platform="qiniu" type="image" region="华东-浙江2" on:error={ uploadError }/> -->

</ClassicLayout>
