<template>
    <div class="header-navigation container-fluid">
        <div class="row">
            <div class="col-md-7 text-left">
            </div>
            <div class="col-md-5">
                <ul class="navigation">
                    <li v-bind:class="{ active: isActiveCat }">
                        <router-link to="/index">Главная</router-link>
                    </li>
                    <li>
                        <router-link to="/helloworld">Каталог</router-link>
                    </li>
                    <li>
                        <router-link to="/helloworld">Помощь</router-link>
                    </li>
                    <li v-bind:class="{ active: isActiveReg }">
                        <router-link to="/registration">Войти</router-link>
                    </li>
                    <li>
                        <a href="#">Кабинет</a>
                    </li>
                </ul>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data: function() {
        return {
            isActiveCat: false,
            isActiveReg: false
        }
    },
    watch: {
        '$route' () {
            if (this.$route.path === '/registration') {
                this.isActiveReg = true;
            } else {
                this.isActiveReg = false;
            }
            if (this.$route.path === '/index') {
                this.isActiveCat = true;
            } else {
                this.isActiveCat = false;
            }
            
        }
    }
}
</script>


<style scoped>
.header-navigation {
    background: #000000;
}
.row img {
    width: 10%;
    overflow: hidden;
}
.navigation {
    list-style-type: none;
    font-size: 18px;
    overflow: hidden;
    padding: 0;
    margin: 0;
}
.navigation a {
    text-decoration: none;
    color: white;
    display: block;
    padding: 16px 16px;
}
.navigation li {
    float: left;
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
