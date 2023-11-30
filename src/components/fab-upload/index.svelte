<script lang="ts">
  import QiniuUpload from './qiniu-upload/index.svelte'
	import type { Label } from './qiniu-upload/utils';

  export let type = 'image'
  export let platform: UploadPlatform = 'qiniu'
  export let region: Label = '华东-浙江';
</script>

<div class="upload-master">
  {#if platform == 'qiniu'}
    <QiniuUpload {type} {region} />
  {/if}
</div>

<div class="fab-upload">

</div>

<style lang="scss">
  .fab-upload {
    width: 100%;
    height: 100%;
    position: relative;
    &::after {
      content: "";
      border: 1px solid #39f;
      border-radius: 1rem;
      position: absolute;
      inset: 0;
      transform: scale(.5);
      transform-origin: 0 0;
    }
  }
</style>