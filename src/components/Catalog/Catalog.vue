<template>
    <div>
        <transition  name="fade">
        <div class="load-data" v-show="loading">
            <div class="loader text-center" style="margin:0 auto" v-show="spinner">
            </div>
            <h3 class="facts-text mt-2 display-3" v-show="spinner">Загрузка каталога</h3>
        </div>
        </transition>
        <transition  name="fade">
            <div class="catalog-body">
                <div class="sticky d-none d-sm-block" style="    position: sticky;
                top: -165px;
                z-index: 2;"
                id="stickyCounter"
                >
                    <div class="row omega" style="margin-right: 0px">
                        <Counter v-bind:counterData="counterData.drinks"/>
                        <Counter v-bind:counterData="counterData.burger"/>
                        <Counter v-bind:counterData="counterData.sweat"/>   
                        <Counter v-bind:counterData="counterData.dishes"/> 
                    </div>
                </div>
                <div class="container-fluid" style="padding: 0;">
                    <div class="row" id="catalogPicks" style="margin-right: 0px">
                        <div class="col-md-3 col-4 option">
                            <div class="option-element">
                                <a href="#demo" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="burger">
                                    Бургеры
                                </a>
                            </div>
                        </div>
                        <div class="col-md-2 col-4 option">
                            <div class="option-element">
                                <a href="#demo2" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="salad">
                                    Салаты
                                </a>
                            </div>
                        </div>
                        <div class="col-md-3 col-4 option">
                            <div class="option-element">
                                <a href="#demo3" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="sweat">
                                    Десерты
                                </a>
                            </div>
                        </div>
                        <div class="col-md-2 col-6 option">
                            <div class="option-element">
                                <a href="#demo4" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="drinks">
                                    Напитки
                                </a>
                            </div>
                        </div>
                        <div class="col-md-2 col-6 option">
                            <div class="option-element">
                                <a href="#demo5" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="dishes">
                                    Закуски
                                </a>
                            </div>
                        </div>
                        </div>
                    
                </div>
                <div class="container-fluid catalog bg-primary">
                    <div class="collapse burger" id="demo">
                        <div class="catalog-items text-center">
                            <burger 
                            v-bind:catalog="catalog"
                            @addToOrder='addToOrder'/>
                        </div>
                    </div>
                    <div class="collapse salad" id="demo2">
                        <div class="container text-center">
                            <div class="carousel-item row equal catalog-items active" style="margin-right: 0px">
                                <burger 
                                v-bind:drinksArray="drinksArray"
                                @addToOrder='addToOrder'/>
                            </div>
                        </div>
                    </div>
                        <div class="collapse sweat" id="demo3">
                            
                    <div class="card">
                        <div class="card-header">здесь изображение </div>
                        <div class="card-body">Бургер лососевый</div> 
                        <div class="card-footer">цена</div>
                    </div>
                        </div>
                    <div class="collapse drinks" id="demo4">
                        <div class="container text-center">
                    
                            <div class="row" style="margin-right: 0px">
                                <div class="carousel-item row equal catalog-items active " style="margin-right: 0px">
                                    <drinks 
                                    v-bind:drinksArray="drinksArray"
                                    @addToOrder='addToOrder'/>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="collapse dishes" id="demo5">
                        <div class="card">
                            <div class="card-header">здесь изображение </div>
                            <div class="card-body">Бургер лососевый</div> 
                            <div class="card-footer">цена</div>
                        </div>
                    </div>
                </div>
                <hr/>
                <transition name="fade">
                    <div style="container continue-order" v-if="order.length > 0">
                        <button class="btn bg-button-info" v-on:click="submitOrder" name="succeedOrder">Оформить заказ</button>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>
<script>
import Burger from './ChildComponents/Burger.vue'
import Drinks from './ChildComponents/Drinks.vue'
import Counter from './ChildComponents/Counter.vue';
import axios from 'axios';
export default {
    data() {
        return {
            pick: null,
            burgerShow: false,
            hello: null,
            showConOrder: false,
            array: [],
            isChanged: false,
            spinner: false,
            loading: true
           
    }},
    components: {
        Burger,
        Drinks,
        Counter
    },
    methods: {
        toggle: function (event) {
            var target = event.target;
            var divParent = target.closest('div');
            var parent = document.getElementById('catalogPicks');
            for (var i = 0; i < parent.children.length; i++) {
                parent.children[i].children[0].className = 'option-element'; //second console output
            }
            var className = target.dataset.type;

            divParent.classList = className + ' option-element';
            if (this.isChanged) {
                if (this.pick === className) {
                    divParent.classList = 'option-element';
                    this.isChanged = false;
                    this.pick = '';
                    $('.collapse').collapse('hide');
                    return;
                }
            }
            this.pick = className;
            this.isChanged = true;
            $('.collapse').collapse('hide');
            function sum(a) {
                return function(b) {
                    return function (c) {
                        console.log('hello')
                    }
                }
            }

        },
        addToOrder: function (data) {
            this.$store.dispatch('addToOrder', data);
            this.toggleNumber(data.type);
            this.showConOrder = true;
            console.log(this.$store.state.userOrder)
            console.log(typeof this.$store.state.userOrder)
        },
        toggleNumber: function (type) {
            this.$store.dispatch('updateCounter', type);
        },
        changeStickyBG: function (event) {
            if (document.querySelector('.catalog-body')) {
                if (window.scrollY > 330) {
                document.getElementById('stickyCounter')
                .classList.add('sticky-active');
            } else {
                document.getElementById('stickyCounter')
                .className = 'sticky'
            }
            }
        },
        submitOrder: function () {
            this.$router.push('submit_order'); 
        },
        loadCatalog: function () {

        }
    },
    computed: {
        counterData () {
            return this.$store.getters.getCounterData;
        },
        drinksArray () {
            return this.$store.getters.getDrinks;
        },
        burgersArray () {
            return this.$store.getters.getBurgers;
        },
        item () {
            return this.$store.getters.getItem
        },
        order () {
            return this.$store.getters.getOrder;
        },
        catalog () {
            return this.$store.getters.getCatalog;
        }
    },
    mounted () {
        var array = this.catalog;
        var spinner = document.querySelector('.loader');
        document.querySelector('body').style.backgroundColor = "#841424";
        if (array.length === 0) {
            this.spinner = true;
            spinner.classList.add('spin');
            var self = this;
            axios({
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                },
                url: "https://localhost:44302/api/delivery"
            }).then(function(response) {
                if (response.status === 200) {
                    self.$store.dispatch('addDelivery', response.data);
                }
            });
            axios({
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                    },
                    url: "https://localhost:44302/api/catalog",
                })
                .then(function(response) {
                    console.log(response);
                    if (response.status === 200) {
                            setTimeout(function() {
                            self.loading = false;
                            var data = response.data;
                            self.$store.dispatch('addCatalog', data);
                            console.log(data);
                            setTimeout(function() {
                                spinner.classList.remove('spin');
                            }, 500)
                            setTimeout(function() {
                                $('.catalog-body').slideToggle('fast');
                            }, 480)
                        }, 2000)
                    } else {
                        spinner.classList.remove('spin');
                    }
                    //this.array.push(this.burgersArray);
                    // this.$store.dispatch('addPhone', this.phone);
                    // this.phoneHide = false;
                })
        } else {
            this.spinner = false;
            this.loading = false;
            spinner.classList.remove('spin');
            $('.catalog-body').toggle();
        }
    },
    created () {
        this.loadCatalog()
        window.addEventListener('scroll', this.changeStickyBG);
    }
}
</script>
<style scoped>
.catalog-body {
    display: none;
    transition: display, opacity 1s;
}
.opac {
    opacity: 1;
}
.equal {
    display: table;
}
.equal .col-3 {
    float: none;
    display: table-cell;
    vertical-align: top;
}
.omega {
    position: sticky;
    top: 0;
    margin-top: 2%;
    margin-bottom: 9%;
}
.food-body img {
    width: 50%;
    margin-bottom: 3%; 
}
.food-body p {
    font-size: 25px;
    width: 35px;
    border: 2px black;
    background: rgb(0, 0, 0);
    color: white;
    display: inline-block;
    margin: 0 5px 0 5px;
}

.option, .catalog, .drinks, .sweat, .dishes {
    padding: 0;
    text-align: center
}
.catalog-items {
    height: 100%;
}
.option-element {
    height: 70px;
    width: 100%;
    text-align: center;
}
.info-text {
    font-size: 32px;
    font-weight: bold;
    border-bottom: 4px solid;
    padding-bottom: 10px
}
.option-element a {
    font-size: 25px;
    color: black;
}
.option-element a:hover {
    text-decoration: none;
}
#catalogPicks {
    margin: 0;
}
.collapse {
    width: 100%;
    height: 100%;
    text-align: center;
}
.bg-button-info {
        background: #E0FF4F;
}
.bg-button-info:hover {
    background: rgb(208, 240, 68);
}
.catalog-nav-left {
    left: -60px;
}
.catalog-nav-right {
    right: -60px;
}
.items-body img {
    width: 50%;
}
.price {
    vertical-align: bottom;
}
.card {
    width: 20%;
    height: 100%;
}
.burger {
    background:#FFD700;
}
.salad {
    background: #A463F2;
}
.dishes {
    background: #FFA3D7;
}
.drinks {
    background:  #E8FDF5;
}
.sweat {
    background: #001B44;
}
.facts-text {
    font-size: 28px;
    font-weight: bold;
    background: black;
    color: white;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
}
.loader {
    width: 220px;
    height: 220px;
    border: 4px solid white;
    border-top: 4px solid rgb(2, 184, 240);
    border-radius: 50%;
}
.spin {
    animation: spinner 1s linear infinite;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.sticky {
   transition: background-color 1s ease-in-out;
   border-radius: 0 10px 10px 10px;
   margin: 0 0 5px 0;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.sticky-active {
    background: rgb(255, 255, 255);
}
    @media (min-width: 200px) {
        body .info-text {
            font-size: 1rem;
        }
    }
    @media (min-width: 800px) {
        body .info-text {
            font-size: 1.2rem;
        }
    }
    @media (min-width: 1000px) {
        body .info-text {
            font-size: 1.2rem;
        }
    }
.option-element {
    transition: all 1s;
}
@keyframes spinner {
    0% { transform: rotate(0deg); }
    20% {transform: rotate(50deg)}
    70% {transform: rotate(290deg)}
    100% { transform: rotate(360deg); }
}
</style>
