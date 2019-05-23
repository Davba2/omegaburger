<template>
    <div>
        <div  
        :id="current.name"
        class="bg-white col-12 collapse burger show vg" style="padding: 0">
            <div class="burg">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-12">
                            <h3>Таблица с характеристиками</h3>
                            <table class="table table-striped table-hover" name="productSummary">
                                <thead>
                                    <tr>
                                        <th>Белки</th>
                                        <th>Углеводы</th>
                                        <th>Жиры</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="nutritional-text">{{current.protein.toFixed(1)}}</p>
                                        </td>
                                        <td>
                                            <p class="nutritional-text">{{current.carbo.toFixed(1)}}</p>
                                        </td>
                                        <td>
                                            <p class="nutritional-text">{{current.fat.toFixed(1)}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">
                                            <p class="nutritional-text">{{current.cal.toFixed(1)}} кКал</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="row">
                                <div class="col-12">
                                    <p style="font-size: 1.6rem; font-weight: bold; border-bottom: 1px solid gray;">
                                        Сюда входит
                                    </p>
                                </div>
                                <div class='custom-labels col-6 mt-1 mb-1' v-for="name in compNames">
                                    <input type="checkbox" :id='name.id'>
                                    <label :for='name.id' v-on:click="calcCalculation">
                                        {{name.name}}
                                    </label>
                                </div>      
                            </div>
                            <div class="container desc-item">
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-12 mb-2">
                            <p class="plead title-item">
                                {{current.name}}
                            </p>
                            <img src="http://www.pngmart.com/files/5/Hamburger-PNG-Photos.png"
                            class="img img-fluid" alt="Гамбургер" name="productImg"/>
                            <div class="facts-text">
                                <p class="current-price">
                                    Цена - {{+current.price.toFixed(1)}} BYN
                                </p>
                            </div>
                            <div>
                                <button class="btn btn-danger" name="addProduct"
                                :id="current.id"  v-on:click="addToOrder">Добавить</button>
                            </div>
                            <transition name="fade">
                                <div v-if="componentExistingError" class="text-danger mt-1">
                                    Добавьте хотя бы <kbd>1</kbd> компонент
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    props: ['current', 'compNames', 'type'],
    data() { return {
      order: '',
      checkedPicks: [],
      togglerPicks: this.compNames.slice(),
      changed: false,
      nutritional: this.current,
      componentExistingError: false
    }},
    methods: {
        addToOrder: function (event) {
            var self = this;
            var checkExistingComponents = this.togglerPicks.every(function(item) {
                return item.notInOrder === true;
            })
            if (checkExistingComponents) {
                this.componentExistingError = true;
                setTimeout(function(){
                    self.componentExistingError = false;
                }, 5000);
                return;
            }
            var element = this.current;
            this.order = element;
            this.$store.state.orderCounter++;
            let fuckme = [];
            for (var i = 0; i < this.togglerPicks.length; i++) {
                fuckme[i] = this.togglerPicks[i]
            }
            // let picks = this.togglerPicks.map(function(item) {
            //     return item;
            // }).slice();
            this.$emit('addToOrder', {
                id: this.$store.state.orderCounter,
                typeId: element.id,
                price: element.price,
                title: element.name,
                picks: fuckme,
                type: this.type
            });
            this.changed = !this.changed;
            this.togglerPicks = null;

            this.togglerPicks = this.compNames.slice();
            this.$forceUpdate();
            this.$forceUpdate();
        },
        calcCalculation: function (event) {

            let componentId;
            let id = event.target.previousSibling.id;
            var self = this;
            this.togglerPicks.forEach(function (item, index) {
                if (item.id === +id && item.notInOrder === false) {
                    self.$emit('updateCurrentNut', item, 'desc');
                    item.notInOrder = true;
                    return;
                } else if (item.id === +id && item.notInOrder) {
                    item.notInOrder = false;
                    self.$emit('updateCurrentNut', item, 'up');
                    return;
                }
            });
            
        }
    },
    watch: {
        current: function({id}) {
            this.checkedPicks = [];
            this.title = this.current.name;
            this.curPrice = this.current.price;
            this.nutritional = this.current.nutritional;
            this.$forceUpdate();
            this.togglerPicks = this.compNames.slice();
        },
        changed: function() {
            this.togglerPicks = this.compNames.slice();
        },
        checkedPicks: function () {
        }
    },
    computed: {
        // togglerPicks () {
        //     return this.compNames.slice()
        // }
    }
}
</script>
<style scoped>

.custom-labels {
    display: flex;
    justify-content: center;
    align-currents: center;
}
h3 {
    margin: 5px 0 15px
}
img {
    width: 150%;
}

input[type=checkbox]{
height: 0;
width: 0;
visibility: hidden;
}

label {
	cursor: pointer;
    margin: 2px 2px 2px 11px;
	text-indent: 1px;
	width: 170px;
	height: 40px;
	background: #9ec716;
	display: block;
	border-radius: 20px;
	position: relative;
    padding: 6px 2px;
    font-weight: bold;
}
.facts-text {
    font-size: 28px;
    font-weight: bold;
    background: black;
    color: white;
}
.nutritional-text {
    font-size: 22px;
    font-weight: bold;
}
label::after {
    position: absolute;
    padding-top: 4px;
	top: 10px;
	left: 5px;
	width: 30px;
	height: 30px;
	background: #9ec716;;
	border-radius: 30px;
	transition: 0.3s;
}
.desc-item {
    margin-bottom: 20px;
    border-bottom: 3px double rgb(140, 139, 139);
    font-size: 32px;
    font-weight: bold;
    background: black;
    color: white;
    width: 100%;
}
.title-item {
    font-size: 26px;
    border-bottom: 2px solid;
    font-weight: bold;
}
.spiceLabel:after {
	content: 'С';
}
.mayoLabel:after {
	content: 'М';
}
.ketchupLabel:after {
	content: 'К';
}
input:checked + label {
	background: #94ac90;
}

input:checked + .ketchupLabel {
	background: red;
}
input:checked + .mayoLabel {
	background: rgb(219, 200, 200);
}
input:checked + .spiceLabel {
	background: rgb(59, 146, 204);
}
input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}
label:active:after {
	width: 45px;
}
    @media (min-width: 200px) {
        div .desc-item {
            font-size: 1.2rem;
        }
    }
    @media (min-width: 800px) {
        div .desc-item {
            font-size: 1.8rem;
        }
    }
    @media (min-width: 1000px) {
        div .desc-item {
            font-size: 2rem;
        }
    }

div.text-danger {
    font-size: 1.4rem;
    border-bottom: 1px black solid;
}
</style>
