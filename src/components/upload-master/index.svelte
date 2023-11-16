<script lang="ts">
  import QiniuUpload from './qiniu-upload/index.svelte'

  export let type = 'image'
  export let platform = 'qiniu'
</script>

<div class="upload-master">
  {#if platform == 'qiniu'}
    <QiniuUpload {type} />
  {/if}
</div>