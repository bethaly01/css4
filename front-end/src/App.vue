<template>
  <div id="app">
    <div id="nav">
      <div class="HomeButtonDiv">
        <b-button variant="danger" href="/" class="HomeButton">HOME</b-button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  
}
.navbar-nav{
  padding-left: 45px;
}
.text-title{
    text-align: center;
    position: absolute;
    margin-left: 31%;
}
.b-navbar-brand{
  font-size: 25px;
}
.HomeButtonDiv{
  position: absolute;
    float: right;
    margin-left: 90%;
    margin-top: 1.5%;
}
.HomeButton{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    font-weight: bold;
}
#nav a {
  color:white;
}
</style>
