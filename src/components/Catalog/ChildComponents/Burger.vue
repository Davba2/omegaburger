<template>
    <div>
        <div class="row" style="margin-right: 0px">
            <div class="col-md-4 col-12"  v-for="item in catalog">
                <div class="items-body">
                     <p class="desc-title">
                        {{item.name}}
                    </p>
                    <a :href="'#'+item.name"  @click="fuckYou" class="plead" data-toggle="collapse">
                        <img src="http://www.pngmart.com/files/5/Hamburger-PNG-Photos.png" style="width: 75%"/>
                    </a>
                </div>
            </div>
        </div>
    <!--Отдельный компонент для просмотра бургера и с возможностью добавлять начинки-->
        <div ref='item-body'>
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
            },
            state: ''
        }
    },
    props: ['catalog'],
    components: {
        comp: DescComponent,
        C
    },
    methods: {
        fuckYou: function (event) {
            console.log('1')
            var name = event.target.closest('a').getAttribute("href").substring(1);
            if (this.state === name) {
                $('.vg').collapse('hide');
                $('html, body').animate({scrollTop: 300},'50');
                this.state = '';
            } else {
                var item = this.catalog.filter(function (item) {
                    return item.name === name;
                });
                console.log('1');
                this.state = name;
                this.current = item[0];
                var compoment = item[0].components;
                this.current.price = this.calculate('cost', compoment);
                this.current.cal = this.calculate('calories', compoment);
                this.current.fat = this.calculate('fat', compoment);
                this.current.carbo = this.calculate('сarbohydrates', compoment);
                this.current.protein = this.calculate('proteint', compoment);
                this.current.comNames = compoment.map(function(item) {
                    return item.name
                })
                console.log(this.current.comNames)
                console.log(item[0].components)
                var element = this.$refs['item-body'];
                var top = element.offsetTop;
                var i = event.clientY;
                $('html, body').animate({scrollTop: top - 100},'50');
                //$('.vg').collapse('hide');
            }
        },
        addToOrder: function (data) {
            //var element = event.target.id;
            this.$emit('addToOrder', data);
        },
        showDesc: function (event) {
            console.log('helo')
            console.log(event.target.id);
        },
        calculate: function (type, array) {
            return array.map(function(item) {
                return item[type];
            }).reduce(function(acc, item) {
                return acc + item;
            })
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
html {
    scroll-behavior: smooth;
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
