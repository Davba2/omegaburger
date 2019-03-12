<template>
    <div>
        <div class="container-fluid" id="userBackground">
        </div>
        <falling-obj v-if='showFallingObj'/>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-12 col-lg-4">
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
                                    Ваша почта <br/>
                                    <kbd v-if="userInfo.email === null" class="phone-number">Неизвестно</kbd>
                                    <kbd v-else class="phone-number">{{userInfo.email}}</kbd>
                                </p>
                                <p>
                                    Ваш телефон <br/>
                                    <kbd v-if="userInfo.phone === null" class="phone-number">Неизвестно</kbd>
                                    <kbd v-else class="phone-number">{{userInfo.phone}}</kbd>
                                </p>
                                <p>
                                    Ваш адрес  <br/>
                                    <kbd v-if="userInfo.location === null" class="street">Неизвестно</kbd>
                                    <kbd v-else class="street">{{userInfo.location}}</kbd>
                                </p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn bg-button-info">Сбросить пароль</button>
                        </div>
                        <div class="card-footer">
                            <button class="btn bg-button-info" 
                            v-on:click="phoneHide = !phoneHide">Указать телефон</button>
                            <transition name="fade">
                                <div v-if="phoneHide">
                                    <input type="text" class="street-name" placeholder="Введите телефон"/>
                                    <span class="user-confirmed">Ok</span>
                                </div>
                            </transition>
                        </div>
                        <div class="card-footer">
                            <button class="btn bg-button-info" v-on:click="showFallingObj = !showFallingObj">Пад. объекты</button>
                        </div>
                    </div>
                    <div class="card d-none d-sm-block">
                        <div class="card-body text-white">
                            <p class="coord-info">
                                Ваше местоположение:
                            </p>
                            <div id="mapid" ref="mapElement">

                            </div>
                            <button class="btn bg-button-info" 
                            v-on:click="streetHide = !streetHide">Указать местоположение</button>
                            <transition name="fade">
                                <div v-if="streetHide">
                                    <input class="street-name" type="text" placeholder="Название улицы"/>
                                    <span class="user-confirmed">Ok</span>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-12 col-lg-8">
                    <div class="contaniner">
                        <div class="row" v-if=" getOrderHistory !==null">
                            <div class="col-12 orders-info"  v-bind:key ="order.title" v-for="order in getOrderHistory">
                                <h3>Вы заказали:</h3>
                                <p>
                                    
                                </p>
                                <div class="container order-prop">
                                    <div class="row mt-2 text-white">
                                        <div class="col-md-6 col-12 text-left">
                                           {{order.date2}}
                                        </div>
                                        <div class="col-md-6 col-12  price">
                                            Цена - <kbd>{{order.price.toFixed(2)}} BYN</kbd>
                                        </div>
                                        <div class="col-md-12 col-12 text-center mb-2">
                                            <button class="btn bg-button-info" v-on:click="show2"> Заказать такой же</button>
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
import FallingObj from './FallingObj'
import L from 'leaflet';
export default {
    data () {
        return {
           map: null,
           show: true,
           phoneHide: false,
           streetHide: false,
           date: this.getOrderHistory,
           showFallingObj: true

        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        FallingObj
    },
    methods: {
        show2: function () {
            console.log(this.date)
        }
    },
    computed: {
        getOrderHistory() {
            return this.$store.getters.getOrderHistory;
        },
        order2() {
            return this.$store.getters.getOrder;
        },
        token () {
            return this.$store.getters.getToken;
        },
        email () {
            return this.$store.getters.getEmail;
        },
        userInfo () {
            return this.$store.getters.getUserInfo;
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.map = L.map(this.$refs['mapElement']).setView([53.902237, 30.335839], 14);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
            new L.Marker([53.902237, 30.335839]).bindPopup('OMEGA Burger').addTo(this.map);
        })
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
.card {
    background: #0B3954;
}
.profile {
    margin: -250px 0 50px 0 ;
    color: white;
}
.phone {
    margin: 10px 0 10px 0;
    border-top: 1px solid gray;
}
.phone-number, .street {
    background: #BFD7EA;
    color: black;
    margin: 5px 0 0 0;
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
    font-size: 18px;
    font-weight: bold;
}
.row time {
    font-size: 25px;
}
time, .price {
    color: black;
}
.price {
    font-size: 25px;
}
.orders-info {
    background: rgb(191, 215, 234);
}
.street-name {
    -webkit-text-fill-color: rgb(191, 241, 210);
    border: none;
    border-bottom: 2px solid white;
    border-radius: 0;
    background: inherit;
    outline: none;
    margin: 10px 0 5px 0;
}
.bg-button-info {
    background: #E0FF4F;
    font-size: 1.2rem;
}
.bg-button-info:hover {
    background: rgb(208, 240, 68);
}
.order-prop {
    border-top: 1px solid black;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0 .5s;
}
.user-confirmed {
    display: inline-block;
    border: 2px solid;
    background: black;
    padding: 0 5px 0 5px;
    margin: 15px 0 0 10px;
}
.user-confirmed:hover{
    cursor: pointer;
    background: rgb(14, 13, 13);
}
</style>
