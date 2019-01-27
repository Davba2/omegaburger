<template>
  <div id="app">
    <HeaderBody/>
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HeaderBody from './components/Header.vue'
import axios from 'axios';
export default {
  data: function () {
  return {
    count: ''
  }
},
  components: {
    HeaderBody
  },
  methods: {
    getApi: function (c) {
      axios.get('http://localhost:2375/Home/GetAPI')
      .then((response) => {
      this.count = response;
    })
    .catch(function (error) {
    })
    }
  },
}
</script>

<style>
body {
  margin: 0;
  background: #EEE5E9;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
