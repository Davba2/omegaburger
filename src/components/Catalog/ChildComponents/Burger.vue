<template>
    <div>
        <div class="row" style="margin-right: 0px">
            <div class="col-md-4 col-12"  v-for="item in catalog">
                <div class="items-body">
                     <p class="desc-title">
                        {{item.name}}
                    </p>
                    <a :href="'#'+item.name" :data-type="item.typeId" @click="fuckYou" class="plead" data-toggle="collapse">
                        <img src="http://www.pngmart.com/files/5/Hamburger-PNG-Photos.png" style="width: 75%"/>
                    </a>
                </div>
            </div>
        </div>
    <!--Отдельный компонент для просмотра бургера и с возможностью добавлять начинки-->
        <div ref='item-body'>
           <C :current="current" @addToOrder='addToOrder' @updateCurrentNut='updateCurrentNut' :compNames="compNames"/>
        </div>
    </div>
</template>

<script>
import DescComponent from './BurgerDesc.vue'
import C from './BurgerDesc.vue'
export default {
    data () {
        return {
            compNames: [],
            co: 0,
            currentIt: 'comp',
            current: {},
            state: '',
            component: {}
        }
    },
    props: ['catalog'],
    components: {
        comp: DescComponent,
        C
    },
    methods: {
        updateCurrentNut: function(data, toggle) {
            if (toggle === 'up') {
                this.current.cal += data.calories;
                this.current.price += data.cost;
                this.current.fat += data.fat ;
                this.current.carbo += data.сarbohydrates;  
                this.current.protein += data.proteint;
            } else if (toggle === 'desc') {
                this.current.cal -= data.calories;
                this.current.price -= data.cost;
                this.current.fat -= data.fat ;
                this.current.carbo -= data.сarbohydrates;  
                this.current.protein -= data.proteint;
            }
            let clone = JSON.parse(JSON.stringify(this.current));
            this.current = null;
            this.current = clone;
            this.$forceUpdate();
        },
        fuckYou: function (event) {

            let dataType = event.target.dataset.type;
            var name = event.target.closest('a').getAttribute("href").substring(1);
            if (this.state === name) {
                $('html, body').animate({scrollTop: 300},'50');
                this.state = '';
            } else if (this.state !== name) {
                var item = this.catalog.filter(function (item) {
                    return item.name === name;
                });
                this.state = name;
                this.current = item[0];
                this.compoment = item[0].components;
                if (this.component.length !== 0) {
                    this.current.price = this.calculate('cost', this.compoment);
                    this.current.cal = this.calculate('calories', this.compoment);
                    this.current.fat = this.calculate('fat', this.compoment);
                    this.current.carbo = this.calculate('сarbohydrates', this.compoment);
                    this.current.protein = this.calculate('proteint', this.compoment);
                    this.compNames = this.compoment.slice();
                    this.compNames.forEach(function(item) {
                        item.notInOrder = false;
                    })
                }
                var element = this.$refs['item-body'];
                var top = element.offsetTop;
                var i = event.clientY;
                $('.vg').collapse('show');
                $('html, body').animate({scrollTop: top - 100}, '50');
                //$('.vg').collapse('hide');
            }
        },
        addToOrder: function (data) {
            this.$emit('addToOrder', data);
            let clone = JSON.parse(JSON.stringify(this.current));
            let cloneComponent = JSON.parse(JSON.stringify(this.compoment));
            this.current = null;
            this.$forceUpdate();
            this.compNames = null;
            this.current = clone;
            this.compNames = cloneComponent;
        },
        showDesc: function (event) {

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
