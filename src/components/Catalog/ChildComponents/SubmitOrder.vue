<template>
    <div>
        <div class="container">
            <p class="lead">
                <span class="facts-text" style="border-bottom: 2px solid">Сейчас</span>
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
                    <div class="card">
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
                            <div class="card-content lead" style="font-size: 18px"
                                v-for="pick in order.picks">
                                &#8728;{{pick}}
                                <img src="https://image.flaticon.com/icons/svg/148/148766.svg"
                                v-on:click="removePick"
                                :data-name="pick"
                                style="width: 8%;
                                margin: 0 auto"/>
                            </div>
                        </div>
                        <div class="card-footer">
                            <input class="form-control" type="number" value="1" min="1" max="20"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" v-show="getOrder.length === 0">
                
                <img src="https://image.flaticon.com/icons/svg/156/156003.svg" 
                style="width: 14%" class="img fluid-img mb-1"/>
                <div class="empty-order">
                    <p>
                        Предметов для заказа нету...
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
            </div>
            <div class="alert alert-danger mt-2" role="alert" v-show="showHelp">
                {{messageError}}
            </div>
            <div class="loader text-center" style="margin:0 auto" v-show="spinner"></div>
            <div class="alert alert-success mt-2 success" 
            role="alert" v-show="successSubmit">
                Ваш заказ был принят, наши ребята уже приступили к нему<br/> <span style="border-bottom: 2px solid white;font-size: 28px">{{orderText}}</span>
            </div>
            <div class="alert alert-success mt-2 success" 
            role="alert" v-show="successSubmit">
                <span style="border-bottom: 2px solid white;font-size: 28px">
                    <!-- {{orderDate}}<br/>
                    На сумму  BYN<br/>
                    По адресу {{location}}<br/>
                    Товаров {{productCount}}<br/>
                    Товары:{{productInfo}}<br/> -->
                </span>
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
export default {
    data() {
        return {
            map: null,
            price: 20,
            showHelp: false,
            messageError: 'Для продолжения, укажите свой адрес и телефон',
            phone: '+375',
            location: '',
            successSubmit: false,
            spinner: false,
            order: null,
            popup: '',
            orderText: 'Ждите доставки',
            errorText: ''
        }
    },
    methods: {
        removePick: function(event) {
            var id = event.target.closest('.collapse').getAttribute('id');
            var element = event.target.dataset.name;
            var idItem;
            this.$store.state.userOrder.forEach(function(item) {
                if (item.id === +id) {
                    item.picks.forEach(function(el, index) {
                        if (el === element) {
                            item.picks.splice(index, 1);
                        }
                    })
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
            if (this.userInfo.phone === null || this.userInfo.location === null) {
                this.showHelp = true;
                return;
            } 
            this.showHelp = false;
            this.spinner = true;
            var spinner = document.querySelector('.loader');
            var fun = this.turnOffAnimation;
            spinner.classList.add('spin');
            var titleArray = this.getOrder.map(function (item) {
                return item.title;
            });
            let time = new Date().toString();
            var token = this.getToken();
            this.order = {
                title: titleArray,
                price: this.priceOrder,
                date2: time
            }
            var self = this;
            axios({
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                url: "https://localhost:44302/api/order",
                data: JSON.stringify(data)
            })
            .then(function(response) {
                if (response.data.StatusData === 200) {
                    spinner.classList.remove('spin');
                    fun();
                    self.$store.dispatch('addToOrder', response);
                    // self.orderPrice = self.priceOrder;
                    // self.orderDate = time;
                    // self.productInfo = titleArray;
                    // self.location = self.getLocation();
                    // self.productCount = titleArray.length;
                    // self.successSubmit = true;
                }
            }).catch(function (error) {
                self.errorText = 'Проблема с отправкой запроса. Повторите попытку'
            });
        },
        addPhone: function (event) {
            if (this.phone.length === 13) {
                this.$store.dispatch('addPhone', this.phone);
            }
        },
        addLocation: function (event) {
            this.$store.dispatch('addLocation', this.location);
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
        window.scrollTo(0, 60);
        // this.$nextTick(() => {
        //     this.map = L.map(this.$refs['mapElement']).setView([53.902237, 30.335839], 14);
        //     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
        //     new L.Marker([53.902237, 30.335839]).bindPopup('Вы').addTo(this.map);
        // });
    },
    computed: {
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
        width: 20%;
        margin: -20px 0 0 0;
    }
    .title img {
        position: absolute;
        right: 1px
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
        border-top: 4px solid rgb(91, 183, 211);
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
    input[type=number] {
        padding: 5px auto;
        margin: 0 auto;
        font-size: 20px;border-radius: 4.25rem;
    }
    .success {
        background: black;
        width: 55%;
        font-weight: bold;
        font-size: 27px;
        color: white;
        margin: 0px auto;
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
</style>
