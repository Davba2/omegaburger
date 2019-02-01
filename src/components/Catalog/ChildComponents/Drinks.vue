<template>
    <div>
        <div class="col-3 float-left" v-for="item in drinksArray">
            <div class="items-body">
                <p>
                    {{item.title}}
                </p>
                <img src="https://image.flaticon.com/icons/svg/1046/1046784.svg"/>
                <p class="item-decsription">
                    {{item.desc}}
                </p>
                <p class="item-price">
                    Цена - {{item.price}} BYN
                </p>
                <div>
                    <button class="btn btn-danger" :id="item.id"  v-on:click="addToOrder">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['drinksArray'],
    methods: {
        addToOrder: function (event) {
            var element = event.target.id;
            console.log(event.target)
            this.$emit('addToOrder', {
                element: element,
                type: 'drinks'
            });
            //this.$store.dispatch('addToOrder', event.target.id);
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
.items-body img {
    width: 70%;
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
</style>
