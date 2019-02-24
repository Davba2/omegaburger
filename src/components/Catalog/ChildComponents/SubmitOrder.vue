<template>
    <div>
        <div class="container">
            <p class="lead">
                Сейчас {{getCurrentTime}}
            </p>
        </div>
        <div class="container" v-show="getOrder.length > 0">
            <div class="row">
                <div class="col-md-12 text-left">
                    <span class="lead facts-text">Вы заказали:</span>
                </div>
            </div>
        </div>
        <div class="container"  style="overflow:auto; height: 300px;border-top: 1px solid gray; border-left:1px solid gray">
            <div class="row" >
                <div style="    width: 100%; height: 3px;padding: 25px 0px 0px">

                </div>
                <div class="col-md-2" v-for="order in getOrder">
                    <div class="card">
                        <div class="title card-header">
                            <img 
                             src="https://image.flaticon.com/icons/svg/148/148766.svg" 
                             v-on:click="deleteOrder" :id="order.element" :title="order.type" class="remove">
                            <span style="">
                                {{order.title}}
                            </span>
                        </div>
                        <img src="https://image.flaticon.com/icons/svg/660/660522.svg" 
                         v-if="order.picks !== null"/>
                        <div class="card-content" 
                            v-if="order.picks !== null" 
                            v-for="pick in order.picks">
                               &#8728; {{pick}}
                        </div>
                        <div class="card-footer">
                            <input class="form-control" type="number" min="1" max="20" style="padding-right: 8px;
                            padding-left: 35px;
                            margin: 0 auto;
                            font-size: 20px;border-radius: 4.25rem"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" v-show="getOrder.length === 0">
                
                <img src="https://image.flaticon.com/icons/svg/136/136326.svg" 
                style="width: 15%" class="img fluid-img"/>
                <div class="empty-order">
                    <p>
                        Предметов для заказа нету...
                    </p>
                </div>
                 <button class="btn btn-success mt-2" 
                    v-on:click="returnToCatalog" v-show="getOrder.length === 0">Вернуться в каталог
                </button>
            </div>
        </div>
        <div class="container">
            <div class="row" v-show="getOrder.length > 0">
                <div class="col-md-6">
                    <div>
                        <kbd class="user-info" v-if="userInfo.location">Ваш адресс </kbd><br/>
                        <kbd style="background:#2171c0;border-radius: 1.2rem;font-size: 22px;" v-if="userInfo.location !== null">{{userInfo.location}}</kbd>
                        <div v-else>
                            <kbd class="user-info">
                                Укажите <span style="font-weight: bold">адресс</span>
                            </kbd>
                            <input type="text" class="form-control mt-2 mb-2" placeholder="Адрес" v-model="location">
                            <button class="btn btn-info ml-2" v-on:click="addLocation">Ok</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div>
                        <kbd class="user-info" v-if="userInfo.phone">Ваш телефон</kbd> 
                        <br/>
                        <kbd style="background:#2171c0;border-radius: 1.2rem;font-size: 22px;" v-if="userInfo.phone !== null">{{userInfo.phone}}</kbd>
                        <div v-else class="text-center">
                            <kbd class="user-info">
                                Укажите телефон
                            </kbd>
                            <div>
                            <input type="text" class="form-control mt-2 mb-2" style="width: 30%;display:inline-block" 
                            value="+375"placeholder="Телефон" v-model="phone">
                            <button class="btn btn-info ml-2" v-on:click="addPhone">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="alert alert-danger mt-2" role="alert" v-show="showHelp">
                {{messageError}}
            </div>
            <div class="loader text-center" style="margin:0 auto" v-show="spinner"></div>
            <div class="alert alert-success mt-2" 
            style="width: 46%;margin: 0 auto"
            role="alert" v-show="successSubmit">
                Ваш заказ был принят, наши ребята уже приступили к нему. Ждите доставки.
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-10">
                </div>
                <div class="col-md-2">
                    <div class="order-price facts-text">
                        {{priceOrder}} BYN
                    </div>
                    <button class="btn btn-danger" v-on:click="submitOrder" v-show="getOrder.length > 0">Купить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            price: 20,
            showHelp: false,
            messageError: 'Для продолжения, укажите свой адрес и телефон',
            phone: '+375',
            location: '',
            successSubmit: false,
            spinner: false,
            order: null
        }
    },
    methods: {
        deleteOrder: function (event) {
            this.$store.dispatch('removeFromOrder', event.target.id);
            this.$store.dispatch('decriseCounter', event.target.title);
        },
        returnToCatalog: function (event) {
            this.$router.push('catalog');
        },
        submitOrder: function (event) {
            if (this.userInfo.phone === null || this.userInfo.location === null) {
                this.showHelp = true;
                console.log('hello')
                return;
            } 
            //dispatch
            this.showHelp = false;
            this.spinner = true;
            var spinner = document.querySelector('.loader');
            var fun = this.turnOffAnimation;
            spinner.classList.add('spin');
            var titleArray = this.getOrder.map(function (item) {
                     return item.title;
                 })
            let time = new Date().toString();
            this.order = {
                     title: titleArray,
                     price: this.priceOrder,
                     date2: time
                 }
            console.log(this.order)
            new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve ()
                }, 3000);
             }).then(function (item) {
                 spinner.classList.remove('spin');
                 fun();
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
        }
     },
    computed: {
        getCurrentTime() {
            return new Date().toLocaleTimeString();
        },
        getOrder() {
            return  this.$store.getters.getOrder;
        },
        priceOrder() {
            return this.$store.getters.getPrice;
        },
        userInfo () {
            return this.$store.getters.getUserInfo;
        }
    },

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

    .spin {
    animation: spinner 1s linear infinite;
    }

    @keyframes spinner {
        0% { transform: rotate(0deg); }
        20% {transform: rotate(50deg)}
        70% {transform: rotate(290deg)}
        100% { transform: rotate(360deg); }
    }
</style>
