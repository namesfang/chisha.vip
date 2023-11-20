<script lang="ts">
  import FabIcon from '$components/fab-icon/index.svelte';

  type ButtonType = "button" | "submit" | "reset" | null | undefined;

  export let type: ButtonType = 'button';

  export let prefixIcon = '';
  export let suffixIcon = '';
</script>

<button { type } class="fab-button">
  {#if prefixIcon.length}
    <FabIcon type={ prefixIcon }/>
  {/if}
  <slot/>
  {#if suffixIcon.length}
    <FabIcon type={ suffixIcon }/>
  {/if}
</button>

<style lang="scss">
  .fab-button {
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