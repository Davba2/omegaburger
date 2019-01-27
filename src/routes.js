import VueRouter from 'vue-router'
import MainBody from './components/Index.vue'
import helloworld from './components/HelloWorld.vue'
import Registraion from './components/Login/Registration.vue'
import AuthBody from './components/Login/Auth.vue'
export default new VueRouter({
    routes: [
        {
            path: '/index',
            component: MainBody
        },
        {
            path: '/helloworld',
            component: helloworld
        },
        {
            path: '/registration',
            component: Registraion
        },
        {
            path: '/authentication',
            component: AuthBody
        }
    ]
});