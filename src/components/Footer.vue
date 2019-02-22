<template>
    <div>
        <footer id="mainFooter" class="footer fixed text-white">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <p class="help-text">
                            Магазин
                        </p>
                        <ul>
                            <li>Каталог</li>
                            <li>Помощь</li>
                            <li>Войти</li>
                            <li>Кабинет</li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <p class="help-text">
                            Доставка
                        </p>
                        <ul>
                            <li>Способ доставки</li>
                            <li>Как оплатить</li>
                            <li>Долгая доставка?</li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                       <img src="https://my.mixtape.moe/iwxgkq.PNG"
                        class="img img-fluid"/>
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
</style>
