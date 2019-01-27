<template>
    <div class="header-navigation container-fluid">
        <div class="row">
            <div class="col-md-8">
            </div>
            <div class="col-md-4">
                <ul class="navigation">
                    <li v-bind:class="{ active: isActive }">
                        <router-link to="/index">Каталог</router-link>
                    </li>
                    <li v-bind:class="{ active: isActive }">
                        <router-link to="/helloworld">Помощь</router-link>
                    </li>
                    <li v-bind:class="{ active: isActive }">
                        <router-link to="/registration">Войти</router-link>
                    </li>
                    <li v-bind:class="{ active: isActive }">
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
            isActive: false
        }
    },
    watch: {
        '$route' () {
            if (this.$route.path === '/registration') {
                console.lothis.$refs.uniqueName
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        }
    }
}
</script>


<style scoped>
.header-navigation {
    background: #000000;
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
.active {
    background-color: white;
    font-weight: bold;
}
.navigation a:hover {
    background-color: white;
}
.navigation li:hover a {
    color: black;
}
</style>
