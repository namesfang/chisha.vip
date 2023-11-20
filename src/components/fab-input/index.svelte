<script lang="ts">
  let value = '';
  export let placeholder = ''
  export let rows = 1
</script>

{#if rows === 1}
  <input type="text" placeholder={ placeholder } bind:value={ value } class="fab-typing"/>
{:else}
  <textarea bind:value={ value } class="fab-typing"></textarea>
{/if}

<style lang="scss">
  .fab-typing {
    width: 100%;
    height: 2.36rem;
    padding: 0 1rem;
    box-sizing: border-box;
    border: 0;
    border-radius: var(--input-primary-border-radius);
    color: var(--input-primary-color);
    outline: none;
    background-color: var(--input-primary-background-color);
    &:active {
      animation-name: button-wave-spread, button-wave-opacity;
    }
    &:focus {
      box-shadow: var(--input-primary-box-shadow);
    }
    &::placeholder {
      color: var(--input-primary-placeholder-color);
    }
  }
</style>