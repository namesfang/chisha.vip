<script lang="ts">
  let parties = [
    {
      id: 1,
      name: '黑色星期天',
    },
    {
      id: 2,
      name: '暑期闹翻天',
    }
  ];
</script>

<svelte:head>
  <title>我的派对|吃啥网</title>
</svelte:head>

<ul>
  {#each parties as t}
    <li>
      <a href="/metoo/party/{t.id}">{ t.name }</a>
    </li>
  {/each}
</ul>


<a href="/metoo/party/join">加入派对</a>
<a href="/metoo/party/create">创建派对</a>