<template>
    <div>
        <div class="container-fluid" id="userBackground">

        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card profile">
                        <div class="card-header">
                            <img class="card-img-top" 
                            src="https://image.flaticon.com/icons/svg/149/149071.svg" 
                            alt="">
                        </div>
                        <div class="card-body">
                            <p class="card-text">То, что мы о вас знаем</p>
                            <div class="phone">
                                <p>
                                    +4325325
                                </p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary">Сбросить пароль</button>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary">Указать телефон</button>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <p class="coord-info">
                                Ваше местоположение:
                            </p>
                            <div id="mapid" ref="mapElement">

                            </div>
                            <button class="btn btn-primary">Указать местоположение</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    Твои заказы чувак
                    <div class="contaniner">
                        <div class="row">
                            <div class="col-12 orders-info" v-bind:key ="order.title" v-for="order in userOrders">
                                <p>Вы заказали:</p>
                                {{order.title}}
                                <div class="container">
                                    <div class="row text-white">
                                        <div class="col-md-6 text-left">
                                            <time>
                                                {{order.date}}
                                            </time>
                                        </div>
                                        <div class="col-md-6 text-right price">
                                            Цена - <kbd>{{order.price}} $</kbd>
                                        </div>
                                        <div class="col-md-12 text-center">
                                            <button class="btn btn-info">Заказать такой же</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import L from 'leaflet';
export default {
    data () {
        return {
           map: null,
           show: true,
           userOrders : [
               {
                   title: 'Мексиканский мейнстрим, отличная фрутешница',
                   price: 2.2,
                   date: '4.1.2019'
               },
               {
                   title: 'Жаренная курочка, кола и жока',
                   price: 3.1,
                   date: '4.1.2019'
               }
           ]
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    computed: {
        token () {
            return this.$store.getters.getToken;
        },
        email () {
            return this.$store.getters.getEmail;
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.map = L.map(this.$refs['mapElement']).setView([53.902237, 30.335839], 14);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
            new L.Marker([53.902237, 30.335839]).bindPopup('OMEGA Burger').addTo(this.map);
        });
    }
}
</script>
<style scoped>
body {
    background: darkslategrey;
}
#userBackground {
    min-height: 420px;
    background: url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-448540.png');
    background-attachment: fixed;
    background-repeat: no-repeat;
    color: #fff;
}
.profile {
    margin: -250px 0 50px 0 ;
}
.phone {
    height: 25px;
    margin: 10px 0 10px 0;
    border-top: 1px solid gray;
}
.phone p {
    font-size: 20px;
}
#mapid {
    height: 300px;
    margin: 0 0 15px 0;
    width: inherit;
}
.coord-info {
    font-size: 20px;
}
.col-12 {
    margin: 10px 0 10px 0;
}
.col-12 p {
    font-size: 30px;
    font-weight: bold;
}
.row time {
    font-size: 25px;
}
.price {
    font-size: 25px;
}
.orders-info {
    background: #28A6C0;
}
</style>
