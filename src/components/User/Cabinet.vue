<template>
    <div>
        <div class="container-fluid" id="userBackground">
        </div>
        <falling-obj v-if='showFallingObj'/>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-12 col-lg-4">
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
                                    <kbd v-else class="phone-number" name="email">{{userInfo.email}}</kbd>
                                </p>
                                <p>
                                    Ваш телефон <br/>
                                    <kbd v-if="userInfo.phone === null" class="phone-number">Неизвестно</kbd>
                                    <kbd v-else class="phone-number" name="phone">{{userInfo.phone}}</kbd>
                                </p>
                                <p>
                                    Ваш адрес  <br/>
                                    <kbd v-if="userInfo.location === null" class="street">Неизвестно</kbd>
                                    <kbd v-else class="street" name="location">{{userInfo.location}}</kbd>
                                </p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn bg-button-info" name="resetPassword">Сбросить пароль</button>
                        </div>
                        <div class="card-footer">
                            <button class="btn bg-button-info" 
                            v-on:click="phoneHide = !phoneHide">Указать телефон</button>
                            <transition name="fade">
                                <div v-if="phoneHide">
                                    <input type="text" class="street-name" name="newPhone"
                                    v-model="phone" placeholder="Введите телефон"/>
                                    <span class="user-confirmed" v-on:click="setUserPhone">Ok</span>
                                    <div v-if="phoneError">
                                        <p>
                                            {{phoneErrorMessage}}
                                        </p>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="card-footer">
                            <button class="btn bg-button-info" v-on:click="showFallingObj = !showFallingObj">Пад. объекты</button>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-white">
                            <p class="coord-info">
                                Ваше местоположение:
                            </p>
                            <div id="mapid" ref="mapElement" class="d-none d-sm-block">

                            </div>
                            <button class="btn bg-button-info" 
                            v-on:click="streetHide = !streetHide">Указать местоположение</button>
                            <transition name="fade">
                                <div v-if="streetHide">
                                    <input class="street-name" type="text" 
                                    v-model="location" placeholder="Название улицы" name="newLocation"/>
                                    <span class="user-confirmed" v-on:click="setUserLocation">Ok</span>
                                    <div v-if="locationError">
                                        <p>
                                            {{locationErrorMessage}}
                                        </p>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-12 col-lg-8">
                    <div class="container m-2">
                    </div>
                    <div class="contaniner">
                        {{summaryPrice}} {{summaryCountProduct}}
                        <div class="row">
                            {{summaryCountProduct}}
                            <div class="col-12 orders-info" v-for="item in order" v-bind:key="item.orderId">
                                <h3>Вы заказали:</h3>
                                <p>
                                    <span v-for="element in item.goods">
                                        {{element.productName}};
                                    </span>
                                </p>
                                <div class="container order-prop">
                                    <div class="row mt-2 text-white">
                                        <div class="col-md-6 col-12 text-left">
                                           <time class="order-date">{{item.orderDate}}</time>
                                        </div>
                                        <div class="col-md-6 col-12  price">
                                            Цена - <kbd>{{item.orderAmount}} BYN</kbd>
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
import axios from 'axios';
export default {
    data () {
        return {
           map: null,
           show: true,
           phoneHide: false,
           streetHide: false,
           date: this.getOrderHistory,
           showFallingObj: true,
           location: null,
           phone: null,
           locationError: false,
           locationErrorMessage: '',
           phoneErrorMessage: '',
           phoneError: false,
           order: null,
           summaryCountProduct: 0,
           summaryPrice: 0,
           showOrder: false
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
        },
        setUserPhone: function (event) {
            if (this.phone === null) {
                return;
            }
            var refresh = this.getToken;
            var access = this.userInfo.accessToken;
            var data = {
                Email: this.email,
                RefreshToken: refresh,
                Phone: this.phone
            };
            var token = 'Bearer ' + access; 
            console.log(token)
            console.log(data)
            var self = this;
            axios({
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: "https://localhost:44302/api/phone",
                data: JSON.stringify(data)
            })
            .then(function(response) {
                console.log(response)
                if (response.data.statusCode.statusCode === 200) {
                    self.$store.dispatch('addPhone', self.phone);
                    self.phoneHide = false;
                    self.phoneError = false;
                } else {
                    self.phoneErrorMessage = response.data.message;
                    self.phoneError = true;
                }
            })
            .catch(function(error) {
                self.phoneError = true;
                self.phoneErrorMessage = 'Ошибка при отправке запроса';
            })
        },
        setUserLocation: function () {
            if (this.location === null) {
                return;
            }
            var refresh = this.getToken;
            var access = this.userInfo.accessToken;
            var data = {
                Email: this.email,
                RefreshToken: refresh,
                Address: this.location
            };
            var token = 'Bearer ' + access; 
            console.log(token)
            console.log(data)
            var self = this;

            axios({
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: "https://localhost:44302/api/address",
                data: JSON.stringify(data)
            })
            .then(function(response) {
                if (response.data.statusCode.statusCode === 200) {
                    self.$store.dispatch('addLocation', self.location);
                    self.streetHide = false;
                    self.locationError = false;
                } else {
                    self.locationErrorMessage = response.data.message;
                    self.locationError = true;
                }
                
            })
            .catch(function(error) {
                self.locationError = true;
                self.locationErrorMessage = 'Ошибка при отправке запроса';
            })
        },
        loadInfo: function () {
            var refresh = this.getToken;
            var access = this.userInfo.accessToken;
            var token = 'Bearer ' + access; 
            var self = this;
            var id = this.userInfo.Id;
            
            axios({
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: `https://localhost:44302/api/orders/${id}`,
            })
            .then(function(response) {
                var data = response.data;
                console.log('Загружен');
                console.log(data)
                self.order = data;
                self.showOrder = true;
                console.log(self.order)
                self.summaryPrice = data.map(function(item) {
                    return item.orderAmount
                }).reduce(function(acc, item) {
                    return acc + item;
                });
                self.summaryCountProduct = data.goods.map(function(item) {
                    return item.productName
                }).length
            })
            .catch(function(error) {
                self.errorText = 'Ошибка при загрузке ваших данных. Повторите попытку';
            });
        }
    },
    computed: {
        getToken () {
            return this.$store.getters.getRefreshToken;
        },
        getOrderHistory() {
            return this.$store.getters.getOrderHistory;
        },
        getFullPrice() {
            var array = this.$store.getters.getOrderHistory;
            var price = array.reduce(function(acc, item) {
                return acc + item.price.toFixed(2)
            })
            return price;
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
        });
        this.loadInfo();
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
    background-position: center;
    background-size: cover;
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
div .order-date {
    color: black;
    font-size: 16px;
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
