import VueRouter from 'vue-router'
import MainBody from './components/Index.vue'
import helloworld from './components/HelloWorld.vue'
import Registraion from './components/Login/Registration.vue'
import AuthBody from './components/Login/Auth.vue'
import CatalogBody from './components/Catalog/Catalog.vue'
import CabinetBody from './components/User/Cabinet.vue'
import SumbitBody from './components/Catalog/ChildComponents/SubmitOrder.vue'
export default new VueRouter({
    routes: [
        {
            path: '/',
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
        },
        {
            path: '/catalog',
            component: CatalogBody
        },
        {
            path: '/cabinet',
            component: CabinetBody
        },
        {
            path: '/submit_order',
            component: SumbitBody
        }
    ]
});