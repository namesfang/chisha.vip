<script lang="ts">
  import FabIcon from '$components/fab-icon/index.svelte';
  import FabButton from '$components/fab-button/index.svelte';
  import FabCheckbox from '$components/fab-checkbox/index.svelte';
  export let form;
</script>

{#if form?.error}
  <p>{ form.error }</p>
  <p>{ form.error2 }</p>
{/if}

<div class="wrapper">
  <form method="POST" class="form">
    <div class="item">
      <FabIcon type="phone"/>
      <input name="phone" class="typing" placeholder="手机号码"/>
    </div>
    <div class="item">
      <FabIcon type="password"/>
      <input name="password" class="typing" placeholder="登录密码"/>
    </div>
    <div class="item">
      <FabCheckbox />
    </div>
    <div class="item">
      <!-- <button type="button" on:click={ login }>登录</button> -->
      <button type="submit">登录</button>
    </div>
    <div class="item">
      <a href="/">忘记密码</a>
    </div>
    <div class="item">
      <span>没有账号？去</span>
      <a href="/signup">注册</a>
    </div>
  </form>
</div>