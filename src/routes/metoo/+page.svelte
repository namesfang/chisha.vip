<script lang="ts">
	import { redirect } from "@sveltejs/kit";


  redirect(302, '/metoo/party');
  
  console.log(302)

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

<svitekit::head>
  <title>吃啥@呢</title>
</svitekit::head>

<input name="keyword" placeholder="输入ID或名称搜索"/>

<h1>我的派对</h1>

<a href="/metoo/party/create">创建派对</a>
<a href="/metoo/party/join">加入派对</a>
<div class="">
  <ul>
    {#each parties as t}
      <li>
        <a href="/metoo/party/{ t.id }">{ t.name }</a>
      </li>
    {/each}
  </ul>
</div>