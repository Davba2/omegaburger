<template>
    <div>
        <div class="container">
            <p class="lead">
                <span class="facts-text" style="border-bottom: 2px solid">Сейчас {{new Date().toLocaleString()}}</span>
            </p>
        </div>
        <div class="container" v-show="getOrder.length > 0">
            <div class="row">
                <div class="col-md-12 col-12 col-lg-12 text-left">
                    <span class="lead facts-text">Вы заказали:</span>
                </div>
            </div>
        </div>
        <div class="container"  style="overflow:auto; height: 300px;border-top: 1px solid gray; border-left:1px solid gray">
            <div class="row" >
                <div style="    width: 100%; height: 3px;padding: 25px 0px 0px">

                </div>
                <div class="col-md-2 col-12 col-lg-2 mt-2" v-for="order in getOrder">
                    <div class="card" style="width: 195px;">
                        <div class="title card-header">
                            <img 
                             src="https://image.flaticon.com/icons/svg/148/148766.svg" 
                             v-on:click="deleteOrder" :id="order.element" :title="order.type" class="remove" name="remove">
                            <span style="">
                                {{order.title}}
                            </span>
                        </div>
                        <img src="https://image.flaticon.com/icons/svg/660/660522.svg" 
                         v-if="order.picks !== null"
                         data-toggle="collapse" 
                         :href="'#'+order.id"
                         role="button" 
                         name="expand"
                         aria-expanded="false" 
                         aria-controls="multiCollapseExample1"
                         @click="rotateImage"
                         class="rotate-image"
                         />
                         <div class="collapse" :id="order.id">
                            <div class="card-content lead" style="font-size: 18px;"
                                v-for="pick in order.picks" v-if="pick.notInOrder === false">
                                <div v-if="pick.notInOrder === false" class="mt-2">
                                    &#8728;{{pick.name}}
                                    <img src="https://image.flaticon.com/icons/svg/148/148766.svg"
                                    v-on:click="removePick"
                                    :data-name="pick.id"
                                    style="width: 10%;
                                    margin: 0 auto"/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="container" v-show="getOrder.length === 0">
                
                <img src="https://image.flaticon.com/icons/svg/156/156003.svg" 
                style="width: 14%" class="img fluid-img mb-1"/>
                <div class="empty-order">
                    <p>
                        Товаров для заказа нету...
                    </p>
                </div>
                 <button class="btn bg-button-info mt-2" 
                    v-on:click="returnToCatalog" v-show="getOrder.length === 0">Вернуться в каталог
                </button>
            </div>
        </div>
        <div class="container" style="border-top: 2px solid white;
            margin-top: 20px" v-show="getOrder.length > 0">
            <div class="row mt-2">
                <div class="col-md-6 col-12 col-lg-6">
                    <div>
                        <kbd class="user-info" v-if="userInfo.location">Ваш <span style="font-weight: bold">адрес</span> </kbd><br/>
                        <kbd style="background: #FF4136;
                        border-radius: 1.2rem;
                        font-size: 24px" v-if="userInfo.location !== null">{{userInfo.location}}</kbd>
                        <div v-else>
                            <kbd class="user-info">
                                Укажите <span style="font-weight: bold">адрес</span>
                            </kbd>
                            <input type="text" class="form-control mt-2 mb-2" placeholder="Адрес" v-model="location">
                            <button class="btn bg-button-info ml-2" v-on:click="addLocation" name="confirm">Ok</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div>
                        <kbd class="user-info" v-if="userInfo.phone">Ваш <span style="font-weight: bold">телефон</span></kbd> 
                        <br/>
                        <kbd style="background: #FF4136;
                        border-radius: 1.2rem;
                        font-size: 24px" v-if="userInfo.phone !== null">{{userInfo.phone}}</kbd>
                        <div v-else class="text-center">
                            <kbd class="user-info">
                                Укажите <span style="font-weight: bold">телефон</span>
                            </kbd>
                            <div>
                            <input type="text" class="form-control mt-2 mb-2" style="display:inline-block" 
                            value="+375" placeholder="Телефон" v-model="phone">
                            <button class="btn bg-button-info ml-2" v-on:click="addPhone" name="confirm">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-12 mt-2 mb-2">
                    <transition name="fade">
                        <div v-if="responseMessage">
                            <kbd class="user-info">
                                {{responseMessageContent}} 
                            </kbd>
                            
                        </div>
                    </transition>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-md-12 col-12">
                    <kbd class="user-info">Укажите <span style="font-weight: bold">способ</span> доставки </kbd><br/>
                    <label v-for="item in getDelivery"  class="delivery-text" v-on:click="toggleDeliveryText">
                        <input type="radio" v-model="pickedDelivery" :value="item.id"/>
                        {{item.name}}
                    </label>
                </div>
                {{pickedDelivery}}
            </div>
            <div class="alert alert-danger mt-2" role="alert" v-show="showHelp">
                {{messageError}}
            </div>
            <div class="loader text-center" style="margin:0 auto" v-show="spinner"></div>
            <div class="alert alert-success mt-2 success" 
            role="alert" v-show="successSubmit">
                Ваш заказ был принят.<br/> <span style="border-bottom: 2px solid white;font-size: 24px">Распечатайте чек. Ждите звонка</span>
            </div>
            <div class="alert alert-success mt-2 success" 
            role="alert" v-show="successSubmit">
                <div style="border-bottom: 2px solid white;
                    border-top: 2px solid white;font-size: 28px;text-align: center">
                    <span>OMEGA Burger</span>
                    <br/>
                    <span>Чек о заказе</span> 
                    <hr/>
                    <p class="text-left">Товары:</p>
                    <ol>
                        <li v-for="el in goods">
                            {{el.ProductName}} {{el.ProductCost}} BYN
                        </li>
                    </ol>
                    <div class="order-summary-body">
                        <hr class="order-summary-under"/>
                        <time>Дата {{new Date().toLocaleString()}}</time><br/>
                        <span>Доставка {{pickedDeliveryName.toLowerCase()}}</span><br/>
                        <span>Товаров всего {{goods.length}}</span><br/>
                        <span>Сумма заказа {{priceOrder}} BYN</span>
                    </div>
                </div>
                <button class="btn bg-button-info"
                v-on:click="printOrder" 
                name="printOrder">Печать</button>
            </div>
            <div class="container-fluid">
                <div id="mapid" ref="mapElement" name="map"></div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-12">
                </div>
                <div class="col-md-2 col-12">
                    <div class="order-price facts-text">
                        {{priceOrder}} BYN
                    </div>
                    <button class="btn bg-button-info" name="buy"
                     v-on:click="submitOrder" v-show="getOrder.length > 0">Купить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LControlAttribution } from 'vue2-leaflet';
import L from 'leaflet';
import axios from 'axios';
export default {
    data() {
        return {
            map: null,
            price: 20,
            showHelp: false,
            messageError: 'Для продолжения, проверьте, что вы указали: адрес, телефон, способ доставки',
            phone: '+375',
            location: '',
            successSubmit: false,
            spinner: false,
            order: null,
            popup: '',
            orderText: 'Ждите доставки',
            errorText: '',
            responseMessage: false,
            responseMessageContent: '',
            pickedDelivery: '',
            pickedDeliveryName: '', 
            goods: []
        }
    },
    methods: {
        toggleDeliveryText: function (event) {
            let labels = document.querySelectorAll('.delivery-text');
            let label = event.target;
            if (label.tagName === 'LABEL') {
                for (let i = 0; i < labels.length; i++) {
                    labels[i].classList.remove('check');
                }
                label.classList.add('check');
               
            }
        },
        printOrder: function(event) {
            event.preventDefault();
            var mywindow = window.open('', 'PRINT', 'height=800,width=800');
            
            mywindow.document.write(`<html>
                <head>
                <title>Чек о заказе</title>
                <style>
                    * {
                        text-align: center;
                        color: black;
                        font-family: Fira Code, monospace;
                        font-size: 1.2rem;
                    }
                    .text-style {
                        font-size: 52px;
                        letter-spacing: 6px;
                        line-height: 1;
                        margin: 0;
                        position: relative;
                    }
                    .top {
                        background: white;
                        -webkit-background-clip: text;
                        background-clip: text;
                        position: absolute;
                        z-index: 1;
                        -webkit-text-fill-color: transparent;
                        text-fill-color: transparent;
                        margin-left: 93px;
                        margin-top: 1px;
                    }
                    .bottom {
                         text-shadow: 
                            2px 1px rgb(0, 0, 0),
                            4px 2px rgb(0, 0, 0), 
                            6px 4px rgb(0, 0, 0),
                            8px 5px rgb(0, 0, 0),
                            10px 6px rgb(0, 0, 0),
                            12px 7px rgb(0, 0, 0),
                            14px 8px rgb(0, 0, 0);
                    }
                    body {
                        width: 600px;
                        margin: 0 auto;
                    }
                    hr {
                        border-top: 2px dotted black;
                    }
                    .content * {
                        text-align: left;
                    }
                    time {
                        text-align: left;
                    }
                    img {
                        width: 40%;
                    }
            </style>`);
            mywindow.document.write('</head><body>');
            mywindow.document.write(
                '<h1>' + `
                <div class="top text-style">Чек о заказе</div>
                <div class="bottom text-style">Чек о заказе</div>
                <p>Клиента ${this.userInfo.email}</p>
                ` + 
                '</h1>'
            );
            let div = document.createElement('div');
            div.classList.add('content');
            let paragraph = document.createElement('p');
            paragraph.textContent = 'Товары:';
            div.appendChild(paragraph);
            let ol = document.createElement('ol');
            this.goods.forEach(function(item) {
                let li = document.createElement('li');
                li.textContent = item.ProductName + ' ' + item.ProductCost + ' BYN'; 
                ol.appendChild(li);
            });
            div.appendChild(ol);
            let hr = document.createElement('hr');
            div.appendChild(hr);
            let time = document.createElement('p');
            time.textContent = 'Дата заказа ' + new Date().toLocaleString();
            let pickDelivery = document.createElement('p');
            pickDelivery.textContent = 'Доставка ' + this.pickedDeliveryName.toLowerCase();
            let productCount =  document.createElement('p');
            productCount.textContent = 'Товаров всего ' + this.goods.length + ' шт.';
            let orderCost = document.createElement('p');
            orderCost.textContent = 'Сумма заказа ' + this.priceOrder + ' BYN';
            div.appendChild(time);
            div.appendChild(pickDelivery);
            div.appendChild(productCount);
            div.appendChild(orderCost);
            let img = document.createElement('img');
            img.src = 'https://i.ibb.co/cwqw8tq/cut-logo-1.png';
            img.style.cssFloat = 'right';
            div.appendChild(img);
            mywindow.document.body.appendChild(div);
            mywindow.document.write('</body></html>');
            mywindow.document.close();
            setTimeout(function() {
                mywindow.focus();
                mywindow.print();
            }, 1000)
        
        },
        savePickedDelivery: function(event) {
            
        },
        removePick: function(event) {
            var id = event.target.closest('.collapse').getAttribute('id');
            var element = +event.target.dataset.name;
            var idItem;
            var self = this;
            this.$store.state.userOrder.forEach(function(item) {
                if (item.id === +id) {
                    item.picks.forEach(function(el, index) {
                        if (el.id === +element) {
                            item.picks[index].notInOrder = true;
                            self.$forceUpdate();
                            return;
                        }
                    })
                    return;
                }
            });
        },
        deleteOrder: function (event) {
            if (this.successSubmit) {
                return;
            }
            this.$store.dispatch('removeFromOrder', event.target.id);
            this.$store.dispatch('decriseCounter', event.target.title);
        },
        returnToCatalog: function (event) {
            this.$router.push('catalog');
        },
        submitOrder: function (event) {
            if (this.userInfo.phone === null || this.userInfo.location === null || this.pickedDelivery === ' ') {
                this.showHelp = true;
                return;
            } 
            var self = this;
            this.getDelivery.forEach(function(item) {
                if (item.id === self.pickedDelivery) {
                    self.pickedDeliveryName = item.name;
                    return;
                }
            })
            var refresh = this.getToken;
            var access = this.userInfo.accessToken;
            var token = 'Bearer ' + access; 
            this.showHelp = false;
            this.spinner = true;
            var spinner = document.querySelector('.loader');
            var animationToggler = this.turnOffAnimation;
            spinner.classList.add('spin');
            this.getOrder.forEach(function(item) {
                let obj = {};
                let components = [];
                obj.ProductName = item.title;
                obj.ProductId = item.typeId;
                obj.ProductCost = item.price;
                obj.ProductComponents = [];
                item.picks.forEach(function(elem, index) {
                    if (elem.notInOrder === false) {
                        obj.ProductComponents.push({
                        Name: elem.name,
                        Id: elem.id
                    });
                    }
                });
                self.goods.push(obj);
            });
            var data = {
                UserId: this.userInfo.Id,
                OrderId: 10,
                DeliveryId: this.pickedDelivery,
                Goods: this.goods
            }
            axios({
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: "https://localhost:44302/api/orders",
                data: JSON.stringify(data)
            })
            .then(function(response) {
                spinner.classList.remove('spin');
                self.spinner = false;
                if (response.data.statusCode.statusCode === 200) {
                    self.successSubmit = true;
                } else {
                    self.errorText = response.message;
                }
            }).catch(function (error) {
                self.errorText = 'Проблема с отправкой запроса. Повторите попытку'
            });
        },
        resetResponseMessage: function () {
            let self = this;
            setTimeout(function (){
                self.responseMessage = false;
                self.responseMessageContent = '';
            }, 2000);
        },
        addPhone: function (event) {
            if (this.phone.length === 13) {
                var refresh = this.getToken;
                var access = this.userInfo.accessToken;
                var data = {
                    Email: this.userInfo.email,
                    RefreshToken: refresh,
                    Phone: this.phone
                };
                var self = this;
                var token = 'Bearer ' + access; 
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
                    if (response.data.statusCode.statusCode === 200) {
                        self.responseMessage = true;
                        self.responseMessageContent = 'Телефон был добавлен';
                        self.resetResponseMessage();
                        self.$store.dispatch('addPhone', self.phone);

                    } else {
                        self.responseMessage = true;
                        self.responseMessageContent = response.data.message;
                        self.resetResponseMessage();
                    }
                })
                .catch(function(error) {
                    self.responseMessage = true;
                    self.responseMessageContent = 'Ошибка при отправке запроса';
                    self.resetResponseMessage();
                })
            }
        },
        addLocation: function (event) {
            var refresh = this.getToken;
            var access = this.userInfo.accessToken;
            refresh = refresh.slice(0, -1);
            var data = {
                Email: this.userInfo.email,
                RefreshToken: refresh,
                Address: this.location
            };
            var token = 'Bearer ' + access; 
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
                    self.responseMessage = true;
                    self.responseMessageContent = 'Адрес был добавлен';
                    self.resetResponseMessage();
                    self.$store.dispatch('addLocation', self.location);

                } else {
                    self.responseMessage = true;
                    self.responseMessageContent = response.data.message;
                    self.resetResponseMessage();
                }
            })
            .catch(function(error) {
                self.responseMessage = true;
                self.responseMessageContent = 'Ошибка при отправке запроса';
                self.resetResponseMessage();
            })
        },
        turnOffAnimation: function () {
            this.spinner = false;
            this.successSubmit = true;
            this.$store.dispatch('loadHistory', this.order);
            let coord = [53.902237, 30.335839];
            let lag = coord[0] - 0.021;
            let lat = coord[1] - 0.021;
            this.popup = new L.Marker([lag, lat])
                .bindPopup('Курьер')
                .addTo(this.map);
            let doWork = true;
            let self = this;
            
            let a = setInterval (function(){
                    lag += 0.001;
                    lat += 0.001;
                    if (coord[0] <= lag && coord[1] <= lat) {
                        clearInterval(a);
                        self.popup.setLatLng([lat, lat]);
                        self.popup = new L.Marker([coord[0]+ 0.0001, coord[1]])
                        .bindPopup('Курьер')
                        .addTo(self.map);
                        self.orderText = 'Курьер подъехал';
                        return;
                    }
                    self.map.removeLayer(self.popup);
                    self.popup = new L.Marker([lag, lat])
                    .bindPopup('Курьер')
                    .addTo(self.map);
            }, 2000)
            
        },
        rotateImage: function (event) {
            let target = event.target;
            if (target.classList.contains('rotate-image')) {
                target.classList = 'rotate-image-back';
            } else {
                target.classList = 'rotate-image';
            }          
        }
     },
    mounted () {
        let a = this.$store.state.userOrder.map(function(item) {
            return item.price
        })
        if (this.userInfo.email === null) {
            this.$router.push('main');
            return;
        }
        window.scrollTo(0, 60);
        // this.$nextTick(() => {
        //     this.map = L.map(this.$refs['mapElement']).setView([53.902237, 30.335839], 14);
        //     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
        //     new L.Marker([53.902237, 30.335839]).bindPopup('Вы').addTo(this.map);
        // });
    },
    computed: {
        getDelivery () {
            return this.$store.getters.getDelivery;
        },
        getToken () {
            return this.$store.getters.getRefreshToken;
        },
        getCurrentTime() {
            return new Date().toLocaleTimeString();
        },
        getOrder() {
            return  this.$store.state.userOrder;
        },
        getDate() {
            return Date()
        },
        priceOrder() {
            return this.$store.getters.getPrice;
        },
        userInfo () {
            return this.$store.getters.getUserInfo;
        }
    }
}
</script>
<style scoped>

    .order-price {
        border: 0;
        border-bottom: 2px solid gray;  
        font-size: 22px;
        margin: 0 0 9px 0;
    }
    .title {
        font-size: 22px;
    }
    .card img {
        width: 15%;
        margin: -13px 0 0 0;
    }
    .title img {
        position: absolute;
        right: -6px;
        top: 0;
    }
    .user-info {
        font-size: 24px;
    }
    .bg-button-info {
        background: #E0FF4F;
    }
    .bg-button-info:hover {
        background: rgb(208, 240, 68);
    }
    #mapid {
        margin: 10px auto;
        width: 60%;
        height: 200px;
    }   
    .facts-text {
        font-size: 28px;
        font-weight: bold;
        background: black;
        color: white;
    }
    .empty-order {
        font-size: 32px;
        font-weight: bold;
        background: black;
        color: white;
        width: 51%;
        margin: 0 auto;
    }
    .card input {
        margin: 0 auto;
        width: 60%;
        /* padding-right: 8px; */
        /* padding-left: 35px; */
        border-radius: 4.25rem;
        font-size: 22px;
    }    
    .loader {
        width: 120px;
        height: 120px;
        border: 4px solid white;
        border-top: 4px solid rgb(57, 211, 91);
        border-radius: 50%;
    }
    .rotate-image {
        transform: rotate(45deg);
        transition: all .1s ease;
    }
    .rotate-image-back {
        transform: rotate(0deg);
        transition: all .1s ease;
    }
    .spin {
        animation: spinner 1s linear infinite;
    }
    .delivery-text {
        background: rgb(255, 65, 54);
        border-radius: 1.2rem;
        font-size: 24px;
        padding: 5px;
    }
    .check {
        background: rgb(194, 252, 37);
        border-radius: 1.2rem;
        font-size: 25px;
    }
    input[type=radio] {
        display: none;
    }
    input[type=number] {
        padding: 5px auto;
        margin: 0 auto;
        font-size: 20px;border-radius: 4.25rem;
    }
    .success {
        background: black;
        width: 68%;
        font-weight: bold;
        font-size: 27px;
        color: white;
        margin: 0px auto;
    }
    .success ol li {
        text-align: left;
    }
    .success .order-summary-body {
        text-align: left;
    }
    @keyframes spinner {
        0% { transform: rotate(0deg); }
        20% {transform: rotate(50deg)}
        70% {transform: rotate(290deg)}
        100% { transform: rotate(360deg); }
    }
    @media (min-width: 200px) {
        .empty-order p, .success {
            font-size: 1.2rem;
        }
        .success {
            width: 90%;
        }
        div .remove, div .rotate-image-back, .rotate-image {
            width: 10%;
        }
        div input[type=number] {
            text-align: center;
        }
    }
    @media (min-width: 800px) {
        .empty-order p, .success {
            font-size: 1.8rem;
        }
        .success {
            width: 75%;
        }
        div .remove, div .rotate-image-back, .rotate-image {
            width: 20%;
        }
    }
    @media (min-width: 1000px) {
        .empty-order p, .success {
            font-size: 2.1rem;
        }
        .success {
            width: 55%;
        }
        div .remove, div .rotate-image-back, .rotate-image {
            width: 25%;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>
