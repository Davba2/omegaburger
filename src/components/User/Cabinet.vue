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
                <div class="col-md-6 col-12 col-lg-8" name="printArea">
                    <div class="container m-2">
                    </div>
                    <div class="contaniner">
                        <span class="summary">
                            Общая стоимость всех заказов - <span name="summaryPrice">{{summaryPrice}}</span> BYN
                        </span>
                        <br/>
                        <span class="summary" >
                            Общее количество зак. продуктов - <span name="summaryCountProduct">{{summaryCountProduct}}</span>
                        </span>
                        <br/>
                        <div v-show="showButtons">
                            <button v-on:click="printOrder" name="printOrder"
                            class="btn bg-button-info">
                                Печать
                            </button>
                        </div>
                        <div class="row">
                            <div class="col-12 orders-info" v-for="(item, index) in order" v-bind:key="item.orderId">
                                <h3>Вы заказывали:</h3>
                                <p>
                                    <span v-for="element in item.goods">
                                        {{element.productName}};
                                    </span>
                                </p>
                                <div class="container order-prop">
                                    <div class="row mt-2 text-white">
                                        <div class="col-md-6 col-12 price text-left">
                                           Дата - <time class="order-date">{{new Date(Date.parse(item.orderDate)).toLocaleString()}}</time>
                                        </div>
                                        <div class="col-md-6 col-12  price">
                                            Цена - <kbd>{{item.orderAmount}} BYN</kbd>
                                        </div>
                                        <div class="col-md-12 col-12 text-center mb-2">
                                            <button class="btn bg-button-info" v-on:click="printCurrentOrder" :data-id="index">Печать</button>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="showButtons">
                            <button v-on:click="toggler" data-name="left" class="btn bg-button-info" 
                            style="margin-right: 2px"
                            >&#8592;</button>
                        
                            <button v-on:click="toggler" data-name="right" class="btn bg-button-info">&#8594;</button>
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
           showFallingObj: false,
           location: null,
           phone: null,
           locationError: false,
           locationErrorMessage: '',
           phoneErrorMessage: '',
           phoneError: false,
           order: null,
           summaryCountProduct: 0,
           summaryPrice: 0,
           showOrder: false,
           togglerCount: 4,
           showButtons: false
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        FallingObj
    },
    methods: {
        toggler: function(event) {
            let row = document.querySelectorAll('.orders-info');
            let buttonValue = event.target.dataset.name;
            let length = row.length;
            var self = this;
            if (buttonValue === 'right') {
                if (this.togglerCount === length - 1) {
                    return;
                }
                if (this.togglerCount + 3 <= length) {
                    let breakC = this.togglerCount + 3;
                    this.iterateBack(row, length - 1, 0);
                    this.iterateTo(row, breakC, this.togglerCount);
                    this.togglerCount += 3;
                } else if (length - this.togglerCount <= 3) {
                    this.iterateTo(row, length - 1, this.togglerCount);
                    this.iterateBack(row, this.togglerCount, 0);
                    this.togglerCount = length - 1;
                }
            }
            if (buttonValue === 'left') {
                if (this.togglerCount === 0) {
                    return;
                }
                if (this.togglerCount - 7 >= 0) {
                    this.iterateBack(row, this.togglerCount, this.togglerCount - 4);
                    let breakC = this.togglerCount - 7;
                    this.togglerCount -= 4; 
                    if (breakC < 0) {
                        breakC = 0;
                    } else if (this.togglerCount < 0) {
                        this.togglerCount = 3;
                    }
                    //this.iterateBack(row, length -1, 0);
                    setTimeout(function(){
                        self.iterateTo(row, self.togglerCount, breakC);
                    }, 0)
                } else if (this.togglerCount - 7 < 0) {
                    this.togglerCount = 3;
                    this.iterateBack(row, length - 1 , 3);
                    setTimeout(function(){
                        self.iterateTo(row, 3, 0);

                    }, 0)
                }
            }
            // for (let i = self.togglerCount; i < row.length; i++) {
            //     row[i].style.display = "none";
            // }
            
        },
        iterateTo: function(array, breakC, start) {
            for (let i = start; i <= breakC; i++) {
                if (array[i] === undefined) {
                    return;
                }
                array[i].style.display = 'block';
            }
        },
        iterateBack: function(array, start, stop) {
            for (let i = start; i >= stop; i--) {
                if (array[i] === undefined) {
                    return;
                }
                array[i].style.display = 'none';
            }
        },
        printOrder: function() {
            var mainDiv = document.querySelector('[name=printArea]');
            var summaryCountProduct = document.querySelector('[name=summaryCountProduct]').textContent;
            var summaryPrice = document.querySelector('[name=summaryPrice]').textContent;
            var print = document.createElement("div");
            var mainRow = mainDiv.querySelector('.row');
            var mywindow = window.open('', 'PRINT', 'height=800,width=800');
            mywindow.document.write(`<html>
                <head>
                <title>Отчет о заказах</title>
                <style>
                    * {
                        text-align: center;
                        color: black;
                        font-family: Fira Code, monospace;
                        font-size: 1.2rem;
                    }
                    body {
                        width: 620px;
                        margin: 0 auto;
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
                        margin-left: 30px;
                        width: 561px;
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
                        margin-bottom: 20px;
                            
                    }
                    hr {
                        border-top: 2px dotted black;
                    }
                    .content * {
                        text-align: left;
                    }
                    img {
                        width: 40%;
                    }
                </style>`);
            mywindow.document.write('</head><body>');
            mywindow.document.write(`
                <div class="text-style top">История заказов аккаунта ${this.userInfo.email}</div>
                <div class="text-style bottom">История заказов аккаунта ${this.userInfo.email}</div>`);
            //mywindow.document.write(document.querySelector('.cat-info').innerHTML);
            
            for (var i = 0; i < mainRow.children.length; i++) {
                let div = document.createElement('div');
                div.classList.add('content');
                var child = mainRow.children[i];
                let timeAndPrice = document.createElement('p');
                timeAndPrice.textContent = 'Дата заказа ' + child.querySelector('time').textContent +
                ' на сумму ' + child.querySelector('kbd').textContent;
                let ul = document.createElement('ol');
                let prodText = document.createElement('p');
                prodText.textContent = 'Товары:';
                let spans = child.querySelectorAll('span');
                for (let o = 0; o < spans.length; o++) {
                    let li = document.createElement('li');
                    li.textContent = spans[o].textContent;
                    ul.appendChild(li);
                }
                div.appendChild(timeAndPrice);
                div.appendChild(prodText);
                div.appendChild(ul);
                mywindow.document.body.appendChild(div);
                if (i === mainRow.children.length - 1) {
                    let hr = document.createElement('hr');
                    hr.style.border = '3px dotted black';
                    mywindow.document.body.appendChild(hr);
                } else {
                    mywindow.document.body.appendChild(document.createElement('hr'));
                }
            }
            let summary = document.createElement('div');
            summary.classList.add('content');
            let countProd = document.createElement('p');
            let priceProd = document.createElement('p');
            countProd.textContent = `Всего было заказано ${summaryCountProduct} товаров`;
            priceProd.textContent = `На сумму ${summaryPrice} BYN`;
            summary.appendChild(countProd);
            summary.appendChild(priceProd);
            mywindow.document.body.appendChild(summary);
            let img = document.createElement('img');
            img.src = 'https://i.ibb.co/cwqw8tq/cut-logo-1.png';
            img.style.cssFloat = 'right';
            mywindow.document.body.appendChild(img);
            mywindow.document.write('</body></html>');
            mywindow.document.close();
            setTimeout(function(){
                mywindow.focus();
                mywindow.print();
            }, 1000);
            //mywindow.close();
        },
        printCurrentOrder: function (event) {
            var id = +event.target.dataset.id;
            var orderData = this.order[id];
            event.preventDefault();
            var mywindow = window.open('', 'PRINT', 'height=800,width=800');
            var date = new Date(Date.parse(orderData.orderDate));
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
                    body {
                        width: 600px;
                        margin: 0 auto;
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
            orderData.goods.forEach(function(item) {
                let li = document.createElement('li');
                li.textContent = item.productName; 
                ol.appendChild(li);
            });
            div.appendChild(ol);
            let hr = document.createElement('hr');
            div.appendChild(hr);
            let time = document.createElement('p');
            time.textContent = 'Дата заказа ' + new Date().toLocaleString();
            let pickDelivery = document.createElement('p');
            pickDelivery.textContent = 'Доставка ' + orderData.delivery.name;
            let productCount =  document.createElement('p');
            productCount.textContent = 'Товаров всего ' + orderData.goods.length + ' шт.';
            let orderCost = document.createElement('p');
            orderCost.textContent = 'Сумма заказа ' + orderData.orderAmount + ' BYN';
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
        
            // var orderLength = orderData.goods.length;
            // var self = this;
            // orderData.goods.forEach(function(item, index) {
            //     self.$store.dispatch('addToOrder', {
            //     id: index,
            //     typeId: 1,
            //     price: item.orderAmount,
            //     title: orderData.goods[],
            //     picks: orderData.,
            //     type: 'burger'
            // });
            // });
            
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
            var self = this;
            axios({
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: "/api/phone",
                data: JSON.stringify(data)
            })
            .then(function(response) {
                if (response.data.statusCode.statusCode === 200) {
                    self.$store.dispatch('addPhone', self.phone);
                    self.phoneErrorMessage = 'Телефон добавлен';
                    self.phoneError = true;
                    setTimeout(function() {
                        self.phoneHide = false;
                        self.phoneError = false;
                    }, 1000)
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
                url: "/api/address",
                data: JSON.stringify(data)
            })
            .then(function(response) {
                if (response.data.statusCode.statusCode === 200) {
                    self.$store.dispatch('addLocation', self.location);
                    self.locationErrorMessage = 'Адрес добавлен';
                    self.locationError = true;
                    setTimeout(function() {
                        self.streetHide = false;
                        self.locationError = false;
                    }, 1400)
                } else {
                    self.locationErrorMessage = response.data.message;
                    self.locationError = true;
                }
                
            })
            .catch(function(error) {
                self.locationError = true;
                self.locationErrorMessage = error;
            })
        },
        loadInfo: function () {
            var refresh = this.getToken;
            var access = this.userInfo.accessToken;
            var token = 'Bearer ' + access; 
            var self = this;
            var id = this.userInfo.Id;
            var email = this.userInfo.email;
            axios({
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: `/api/orders/${id}`,
            })
            .then(function(response) {
                var data = response.data;

                self.order = data;
                if (self.order.length > 0) {
                    self.showButtons = true;
                    self.summaryPrice = data.map(function(item) {
                        return item.orderAmount
                    }).reduce(function(acc, item) {
                        return acc + item;
                    });
                    self.summaryCountProduct = data.map(function(item) {
                        return item.goods.length
                    }).reduce(function(acc, item) {
                        return acc + item;
                    });
                }
                self.showOrder = true;
                
                setTimeout(function(){
                    let row = document.querySelectorAll('.orders-info');
                    if (row.length > 5) {
                        for (let i = self.togglerCount; i < row.length; i++) {
                            row[i].style.display = "none";
                        }
                }
                }, 200)
            })
            .catch(function(error) {
                self.errorText = 'Ошибка при загрузке ваших данных. Повторите попытку';
            });
            if (this.userInfo.phone === null || this.userInfo.location === null) {
                axios({
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: `/api/phone/?email=${email}`
                })
                .then(function(response) {
                    if (response.status === 200) {
                        self.$store.dispatch('addPhone', response.data);
                    }
                })
                .catch(function(error) {
                    self.errorText = 'Ошибка при загрузке ваших данных. Повторите попытку';
                });
                axios({
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    url: `/api/address/?email=${email}`
                })
                .then(function(response) {
                    if (response.status === 200) {
                        self.$store.dispatch('addLocation', response.data);
                    }                    
                })
                .catch(function(error) {
                    self.errorText = 'Ошибка при загрузке ваших данных. Повторите попытку';
                });
            }
            
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
        if (this.userInfo.email === null) {
            this.$router.push('main');
            return;
        }
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
.summary {
    font-size: 22px;
    background-color: black;
    color: white;
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
    font-size: 20px;
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
