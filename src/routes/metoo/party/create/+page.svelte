<script lang="ts">
  import FabInput from '$components/fab-input/index.svelte';
  import FabButton from '$components/fab-button/index.svelte';

  let form = {
    name: '',
    private: '1',
    foods: [
      {
        name: '',
        weight: 5,
      },
      {
        name: '',
        weight: 5,
      }
    ]
  }

  const create = ()=> {
    
  }
</script>

<h1>创建派对</h1>

<h2>吃的东西</h2>
<form method="POST">
  <input type="text" placeholder="派对名称" bind:value={ form.name }/>
  <input id="p" type="checkbox" value={ form.private }/>
  <label for="p">仅允许密码查看</label>
  <h2>吃啥？</h2>
  <ul class="foods">
    {#each form.foods as t}
      <li>
        <FabInput placeholder="名称"/>
      </li>
    {/each}
    <li>
      <button type="button">添加</button>
    </li>
  </ul>
  <FabButton type="submit" prefixIcon="eye" suffixIcon="plus" >创建</FabButton>
</form>

<style lang="scss">
  .foods {
    background-color: #fff;
    padding: 2rem;
    list-style: none;
  }
</style>