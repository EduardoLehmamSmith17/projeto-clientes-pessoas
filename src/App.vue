<template>
  <nav>
    <router-link to="../physicalPerson"><strong>Pessoa físicas</strong></router-link> |
    <router-link to="../legalPerson"><strong>Pessoa jurídicas</strong></router-link>
  </nav>
  <router-view/>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin-bottom: 20px;
  text-align: center;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}
</style>
