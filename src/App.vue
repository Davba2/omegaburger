<template>
  <div id="app">
    <HeaderBody v-bind:links="links" v-if="this.$store.state.loadScreen === false"/>
    <transition  name="page" mode="out-in">
      <router-view ></router-view>
    </transition>
    <footer-body v-if="this.$store.state.loadScreen === false" />
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
            title: 'Главная', url: '/main'
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
          title: 'Главная', url: '/main'
        },
        {
          title: 'Каталог', url: '/catalog'
        },
        {
          title: 'Войти', url: '/registration'
        }
      ];
    }
  },
  methods: {
  },
}
</script>

<style>
body {
  margin: 0;
  /*background: #841424;*/
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
  transition: opacity 1.2s, transform 0.8s ease-out;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-36%);
}
</style>
