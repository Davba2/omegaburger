<template>
    <div>
        <div class="row">
            <div class="col-md-4" v-bind:key="item.id" v-for="item in burgersArray">
                <div class="items-body">
                     <p class="desc-title">
                        {{item.title}}
                    </p>
                    <a :href="'#'+item.title"  @click="fuckYou" class="plead" data-toggle="collapse">
                        <img src="https://image.flaticon.com/icons/svg/1046/1046784.svg" />
                    </a>
                </div>
            </div>
        </div>
    <!--Отдельный компонент для просмотра бургера и с возможностью добавлять начинки-->
        <div class="" >
           <C :current="current" @addToOrder='addToOrder'/>
        </div>
    </div>
</template>

<script>
import DescComponent from './BurgerDesc.vue'
import C from './BurgerDesc.vue'
export default {
    data () {
        return {
            currentIt: 'comp',
            current: {
                id: 1,
                title: 'Бургер с сыром',
                price: 1.5,
                desc: 'Блаженная булочка наполнена котлеткой и облита сыром',
                url: 'http://www.pngmart.com/files/5/Hamburger-PNG-Photos.png',
                nutritional: {
                    protein: 4,
                    carbo: 22,
                    fat: 10,
                    calc: 300
                }
            }
        }
    },
    props: ['burgersArray'],
    components: {
        comp: DescComponent,
        C
    },
    methods: {
        fuckYou: function (event) {
            var item = this.burgersArray.filter(function (item) {
                return item.title === event.target.closest('a').getAttribute("href").substring(1);
            });
            this.current = item[0];

            console.log(event.target.closest('a').getAttribute("href"));
            //$('.vg').collapse('hide');
        },
        addToOrder: function (data) {
            //var element = event.target.id;
            this.$emit('addToOrder', data);
        },
        showDesc: function (event) {
            console.log('helo')
            console.log(event.target.id);
        }
    },
    computed: {
        currentItem: function () {
            this.DescComponent;
        }
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
    margin-top: 5%;
    margin-bottom: 10%;
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
.desc-title {
    font-weight : bold;
    font-size: 25px;
}
.option, .catalog, .drinks, .sweat, .dishes {
    padding: 0;
    text-align: center
}
.catalog-items {
    margin-top: 5%;
    height: 100%;
}
.option-element {
    height: 70px;
    width: 100%;
    text-align: center;
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
.catalog-nav-left {
    left: -60px;
}
.catalog-nav-right {
    right: -60px;
}
.items-body {
    margin: 3% 0 0 0;
    font-size: 22px;
    font-family: fantasy
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
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.burg {
    margin: 15px 0 0 0;
    border-top: 2px solid;
    /*border-image: url(http://www.clker.com/cliparts/H/8/G/H/k/8/stylish-pink-border-md.png) 20 round;*/
}
.col-md-4 {
    margin: 5px 0 5px 0;
}
</style>
