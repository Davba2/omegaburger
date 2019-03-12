<template>
    <div>
        <footer id="mainFooter" class="footer fixed text-white">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6 col-6">
                        <p class="help-text" style="margin-top: 30%">
                            Магазин
                        </p>
                        <ul>
                            <li>
                                <router-link to="/catalog">Каталог</router-link>
                            </li>
                            <li>
                                <router-link to="/help">Помощь</router-link>
                            </li>
                            <li>
                                <router-link to="/registration">Войти</router-link>
                            </li>
                            <li>
                                <router-link to="/cabinet">Кабинет</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-3 col-sm-6 col-6">
                        <p class="help-text" style="margin-top: 30%">
                            Доставка
                        </p>
                        <ul>
                            <li>
                                <router-link to="/help">Способ доставки</router-link>
                            </li>
                            <li>Как оплатить</li>
                            <li>Долгая доставка?</li>
                        </ul>
                    </div>
                    <div class="col-md-6 col-sm-12 col-12">
                       <img src="@/assets/Label_04 (0-00-05-07).png"
                        class="img img-fluid mb-2" style="width: 50%"/>
                    </div>
                </div>
            </div>
            <span>
                2019
            </span>
        </footer>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#mainFooter {
    margin: 40px 0 0 0;
    background: #272838;
    padding: 40px 20px 15px 20px;
}
#mainFooter ul {
    list-style-type: none;
    padding: 0;
}
#mainFooter img {
    width: 35%;
}
.help-text {
    border-bottom: 1px solid;
}
li a {
    text-decoration: none;
    color: white;
}
li a:hover {
    background: black;
}
</style>
