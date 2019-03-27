<template>
    <div>
        <nav class="navbar navbar-expand-sm header-navigation">
            <div class="container">
                <button class="navbar-toggler" data-toggle="collapse"
                data-target="#navCollapse" style="width: 25%">
                     <img src="https://image.flaticon.com/icons/svg/148/148784.svg" style="width: 40%"/>
                </button>
                <a id="logo">OMEGA Burger</a>
                <div class="collapse navbar-collapse" id="navCollapse">
                    <ul class="navbar-nav ml-auto navigation ">
                        <li class="nav-item"
                        v-for="link in links" v-bind:key="link.title">
                            <router-link class="nav-link active"   :to="link.url">{{link.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </div> 
        </nav>
    </div>
</template>

<script>
export default {
    props: ['links'],
    data: function() {
        return {
            isActiveCat: false,
            isActiveReg: false,
            isActiveMag: false,
            isUserLog: false,
            
        }
    },
    computed: {
        test() {
            //для теста. Просто выводит из стейта объект пользователя
            return this.$store.state.user;
        }
    },
    watch: {
        '$route' () {
            if (this.$route.path === '/log_out') {
                this.$store.dispatch('logOut');
                this.$router.push('/');
            } 
            
        }
    }
}
</script>
<style scoped>
.header-navigation {
    background: #272838;
}
.navbar {
    padding: 0;
}
#logo {
    color: white;
    font-size: 24px;
}
button:focus {
    outline: 0;
}
.row img {
    width: 10%;
    overflow: hidden;
}
.navigation a {
    text-decoration: none;
    color: white;
    display: block;
    font-size: 20px;
    padding: 15px 15px;
}
.active a {
    background-color: white;
    font-weight: bold;
    color: black;
}
.navigation a:hover {
    background-color: white;
}
.navigation li:hover a {
    color: black;
}
</style>
