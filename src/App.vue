<template>
  <div id="app">
    <nav id="nav">
      <h3>Nav</h3>
      <router-link :to="{ name: 'CustomerList'}">Customers</router-link> |
      <router-link :to="{ name: 'About'}">About</router-link>
    </nav>
    <div class="container">
      <section class="left">
        <h3>Left</h3>
      </section>

      <section class="content">
        <h3>Content</h3>
        <router-view />
      </section>

      <section class="right">
        <h3>Right</h3>
      </section>
    </div>
    <footer>
      <h3>Footer</h3>
    </footer>
  </div>
</template>

<script>

</script>


<style>
* {
  box-sizing: border-box;
  margin: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d303d;
  font-size: 14px;
}

h3 {
  color: black;
  padding: 20px;
  font-size: 1.18em;
}

.container {
  height: 80%;
  display: grid;
  grid-template-areas:
    "left content right";
  grid-template-columns: 1fr 6fr 1fr;
}

.left {
  background-color: cornflowerblue;
  grid-area: left;
}

.content {
  background-color: beige;
  grid-area: content;
}

.right {
  background-color: cornflowerblue;
  grid-area: right
}

#app {
  height: 100%;
}

#nav {
  height: 10%;
  background-color: bisque;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #FF3232;
}

footer {
  height: 10%;
  background-color: bisque;
}

</style>
