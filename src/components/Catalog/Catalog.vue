<template>
    <div class="catalog-body">
        <div class="sticky" style="    position: sticky;
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
                <div class="col-md-3 option">
                    <div class="option-element">
                        <a href="#demo" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="burger">
                            Бургеры
                        </a>
                    </div>
                </div>
                <div class="col-md-2 option">
                    <div class="option-element">
                        <a href="#demo2" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="salad">
                            Салаты
                        </a>
                    </div>
                </div>
                <div class="col-md-3 option">
                    <div class="option-element">
                        <a href="#demo3" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="sweat">
                            Десерты
                        </a>
                    </div>
                </div>
                <div class="col-md-2 option">
                    <div class="option-element">
                        <a href="#demo4" @click="toggle" class="plead info-text" data-toggle="collapse" data-type="drinks">
                            Напитки
                        </a>
                    </div>
                </div>
                <div class="col-md-2 option">
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
                    v-bind:burgersArray="burgersArray"
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
                <button class="btn bg-button-info" v-on:click="submitOrder" >Оформить заказ</button>
            </div>
        </transition>
    </div>
</template>
<script>
import Burger from './ChildComponents/Burger.vue'
import Drinks from './ChildComponents/Drinks.vue'
import Counter from './ChildComponents/Counter.vue'
export default {
    data() {
        return {
            pick: null,
            burgerShow: false,
            hello: null,
            showConOrder: false,
            array: [],
           
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
            divParent.classList = target.dataset.type + ' option-element';
            this.pick = {
                type: target.dataset.type
            }
            //из документации bootstrap
            $('.collapse').collapse('hide');

        },
        addToOrder: function (data) {
            this.$store.dispatch('addToOrder', data);
            this.toggleNumber(data.type);
            this.showConOrder = true;
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
        }
    },
    mounted () {
        this.array.push(this.burgersArray);
    },
    created () {
        window.addEventListener('scroll', this.changeStickyBG);
    }
}
</script>
<style scoped>

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
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.sticky {
   transition: background-color 1s ease-in-out;
   border-radius: 0 10px 10px 10px;
   margin: 0 0 5px 0;
}
.sticky-active {
    background: rgb(255, 255, 255);
}
</style>
