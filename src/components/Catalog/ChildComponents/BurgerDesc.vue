<template>
    <div>
        <div  
        :id="current.title"
        class="bg-white col-12 collapse burger show vg" style="padding: 0">
            <div class="burg">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8">
                            <h3>Таблица с характеристиками</h3>
                            <table class="table table-striped table-hover">
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
                                            <p class="nutritional-text">{{nutritional.protein}}</p>
                                        </td>
                                        <td>
                                            <p class="nutritional-text">{{nutritional.carbo}}</p>
                                        </td>
                                        <td>
                                            <p class="nutritional-text">{{nutritional.fat}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">
                                            <p class="nutritional-text">{{nutritional.calc}} кКал</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class='custom-labels'>
                                                <input type="checkbox" :id='current.id + "1"' v-model="checkedPicks" value="Кетчуп">
                                                <label :for='current.id + "1"' v-on:click="calcCalculation" class="ketchupLabel">
                                                
                                                </label>
                                            </div>
                                            <kbd>
                                                Кетчуп
                                            </kbd>
                                        </td>
                                        <td>
                                            <div class='custom-labels'>
                                                <input type="checkbox" :id='current.id + "2"' v-model="checkedPicks" value="Майонез">
                                                <label class="mayoLabel" :for='current.id + "2"' v-on:click="calcCalculation">
                                                </label>
                                            </div>
                                            <kbd>
                                                Майонез
                                            </kbd>
                                        </td>
                                        <td>
                                            <div class='custom-labels'>
                                                <input type="checkbox" :id='current.id + "3"' v-model="checkedPicks" value="Специи">
                                                <label class="spiceLabel" :for='current.id + "3"' v-on:click="calcCalculation"> 
                                                </label>
                                            </div>
                                            <kbd>
                                                Специи
                                            </kbd>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="container" 
                                style="margin-bottom: 20px;
                                border-bottom: 3px double rgb(140, 139, 139);
                                font-size: 32px;
                                font-weight: bold;
                                background: black;
                                color: white;
                                width: 100%">
                                {{current.desc}}
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <p class="plead" style="font-size: 26px; border-bottom: 2px solid;font-weight: bold" >
                                {{current.title}}
                            </p>
                            <img :src="current.url"
                            class="img img-fluid" alt="Гамбургер"/>
                            <div class="facts-text">
                                <p class="current-price" >
                                    Цена - {{curPrice.toFixed(2)}} BYN
                                </p>
                            </div>
                            <div>
                                <button class="btn btn-danger" :id="current.id"  v-on:click="addToOrder">Добавить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['current'],
    data() { return {
      order: '',
      checkedPicks: [],
      title: this.current.title,
      curPrice: this.current.price,
      nutritional: JSON.parse(JSON.stringify(this.current.nutritional)),
      togglerPicks: []
    }},
    methods: {
        addToOrder: function (event) {
            var element = event.target.id;
            var id = element;
            this.order = element;
            console.log(this.curPrice)
            console.log(this.title)
            this.$emit('addToOrder', {
                element: element,
                price: this.curPrice,
                title: this.title,
                picks: this.checkedPicks,
                type: 'burger'
            });
        },
        calcCalculation: function (event) {
            let id = event.target.previousSibling.id;
            if (this.togglerPicks.indexOf(id) > -1) {
                for (var prop in this.nutritional) {
                    this.nutritional[prop] = +this.nutritional[prop] - 7 -id;
                }
                this.togglerPicks.splice(this.togglerPicks.indexOf(id), 1);
                this.curPrice -= 0.4;
            } else {
                this.togglerPicks.push(id)
                console.log(this.togglerPicks)
                this.curPrice += 0.4;
                for (var prop in this.nutritional) {
                    this.nutritional[prop] = +this.nutritional[prop] + 7 + +id;
                }
            }
        }
    },
    watch: {
        current: function({id}) {
            this.checkedPicks = [];
            this.title = this.current.title;
            this.curPrice = this.current.price;
            this.nutritional = JSON.parse(JSON.stringify(this.current.nutritional));
            this.togglerPicks = [];
        },
        checkedPicks: function () {
            console.log('Изменилось')
        }
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
	text-indent: 2px;
	width: 100px;
	height: 38px;
	background: grey;
	display: block;
	border-radius: 20px;
	position: relative;
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
	top: 5px;
	left: 5px;
	width: 30px;
	height: 30px;
	background: #fff;
	border-radius: 30px;
	transition: 0.3s;
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
	background: #9ec716;
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
</style>
