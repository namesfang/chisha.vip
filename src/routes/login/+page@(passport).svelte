<script lang="ts">
  import FabIcon from '$components/fab-icon/index.svelte';
  import FabButton from '$components/fab-button/index.svelte';
  import FabCheckbox from '$components/fab-checkbox/index.svelte';
</script>

<div class="wrapper">
  <form method="POST" action="">
    <div class="item">
      <FabIcon type="phone"/>
      <input class="typing" placeholder="手机号码"/>
    </div>
    <div class="item">
      <FabIcon type="password"/>
      <input class="typing" placeholder="登录密码"/>
    </div>
    <div class="item">
      <FabCheckbox />
    </div>
    <div class="item">
      <FabButton>登录</FabButton>
    </div>
    <div class="item">
      <a href="/">忘记密码</a>
    </div>
    <div class="item">
      <span>没有账号？去</span>
      <a href="/">注册</a>
    </div>
  </form>
</div>