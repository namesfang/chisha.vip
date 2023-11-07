<div class="container">
  <header class="header">
    <img src="http://iph.href.lu/320x100?text=LOGO&fg=666666&bg=f1f1f1" alt="" class="logo"/>
  </header>
  <main class="main">
    <slot></slot>
  </main>
  <footer class="footer">%copyright%</footer>
</div>

<style lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 3.5rem;
    background-color: #f1f1f1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      content: "";
      border-top: 1px solid #e1e1e1;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .logo {
      height: 100%;
    }
  }
  
  .main {
    flex: 1;
  }

  .footer {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 1rem;
    color: #8f8f8f;
  }
}
</style>