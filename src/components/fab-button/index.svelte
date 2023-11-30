<script lang="ts">
  type ButtonType = "button" | "submit" | "reset";
  export let type: ButtonType = 'button';
</script>

<button { type } class="fab-button">
  <slot/>
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