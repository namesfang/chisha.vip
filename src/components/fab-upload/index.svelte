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