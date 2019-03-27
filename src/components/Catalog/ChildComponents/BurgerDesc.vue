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
                                            <p class="nutritional-text">{{current.protein}}</p>
                                        </td>
                                        <td>
                                            <p class="nutritional-text">{{current.carbo}}</p>
                                        </td>
                                        <td>
                                            <p class="nutritional-text">{{current.fat}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">
                                            <p class="nutritional-text">{{current.cal}} кКал</p>
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
                                <div class='custom-labels col-6 mt-1 mb-1' v-for="name in current.comNames">
                                    <input type="checkbox" :id='name'>
                                    <label :for='name' v-on:click="calcCalculation">
                                        {{name}}
                                    </label>
                                </div>
                                        <!-- <kbd class="d-none d-sm-block">
                                            Кетчуп
                                        </kbd>
                                        <div class='custom-labels col-4'>
                                            <input type="checkbox" :id='current.id + "2"' v-model="checkedPicks" value="Майонез">
                                            <label class="mayoLabel" :for='current.id + "2"' v-on:click="calcCalculation">
                                            </label>
                                        </div>
                                        <!-- <kbd class="d-none d-sm-block">
                                            Майонез
                                        </kbd>
                                        <div class='custom-labels col-4'>
                                            <input type="checkbox" :id='current.id + "3"' v-model="checkedPicks" value="Специи">
                                            <label class="spiceLabel" :for='current.id + "3"' v-on:click="calcCalculation"> 
                                            </label>
                                        </div>
                                        <!-- <kbd class="d-none d-sm-block">
                                            Специи
                                        </kbd> -->
                                        
                            </div>
                            <div class="container desc-item">
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-12 mb-2">
                            <p class="plead title-item">
                                {{current.name}}
                            </p>
                            <img src="http://www.pngmart.com/files/5/Hamburger-PNG-Photos.png"
                            class="img img-fluid" alt="Гамбургер"/>
                            <div class="facts-text">
                                <p class="current-price" >
                                    Цена - {{current.price}} BYN
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
</style>
