<script lang="ts">
  let form = {
    phone: '',
    password: ''
  }
</script>
<form method="POST" action="?/register">
  <ul>
    <li>
      <label for="">手机：</label>
      <input name="phone" bind:value={ form.phone }/>
    </li>
    <li>
      <label for="">密码：</label>
      <input name="password" bind:value={ form.password }/>
    </li>
  </ul>
  <button type="submit">登录</button>
  <a href="/register">注册</a>
</form>