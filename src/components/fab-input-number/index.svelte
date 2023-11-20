<script lang="ts">
  let value = '';
  const change = ()=> {
    
  }
</script>

<div class="">
  <div class="md">
    <input type="number" on:change={ change } bind:value={ value }>
  </div>
</div>