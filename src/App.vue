<template>
  <div id="app">
    <HeaderBody v-bind:links="links"/>
    <transition  name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <footer-body/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HeaderBody from './components/Header.vue'
import axios from 'axios';
import FooterBody from './components/Footer.vue'
export default {
  data: function () {
  return {
    count: '',
  }
},
  components: {
    HeaderBody,
    FooterBody
  },
  computed: {
    isUserLogged () {
      return this.$store.getters.isUserLogin;
    },
    links () {
      if (this.isUserLogged) {
        return [
          {
            title: 'Главная', url: '/'
          },
          {
            title: 'Каталог', url: '/catalog'
          },
          {
            title: 'Кабинет', url: '/cabinet'
          },
          {
            title: 'Выйти', url: '/log_out'
          }
        ];
      }
      return [
        {
          title: 'Главная', url: '/'
        },
        {
          title: 'Войти', url: '/registration'
        }
      ];
    }
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
  background: #841424;
}
body * {
  font-family: Georgia;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page-enter-active, .page-leave-active {
  transition: opacity 0.8s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}
</style>
