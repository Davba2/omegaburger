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
                            <img :src="getImgUrl(current.imgURL)"
                            class="img img-fluid" alt="Гамбургер" :id="current.imgURL"/>
                            <div class="facts-text">
                                <p class="current-price">
                                    Цена - {{+current.price.toFixed(1)}} BYN
                                </p>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <button class="btn btn-danger" name="addProduct"
                                    :id="current.id"  v-on:click="addToOrder">Добавить</button>
                                </div>
                                <div class="col-md-6 col-12">
                                    <button class="btn btn-danger" name="printProduct"
                                    :id="current.id"  v-on:click="printProduct">Распечатать</button>
                                </div>
                                <div class="col-md-12 col-12 mt-1 mb-1">
                                    <select v-model="selected" class="compare">
                                        <option v-for="subling in catalog" :id="subling.id">
                                            {{subling.name}}
                                        </option>
                                    </select>
                                    <button class="btn btn-danger" name="compareProduct"
                                    :id="current.id"  v-on:click="compareProduct" style="margin-left: 12px;">Сравнить</button>
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
    </div>
</template>
<script>


export default {
    props: ['current', 'compNames', 'type', 'catalog'],
    data() { return {
      selected: this.catalog[0].name,
      order: '',
      checkedPicks: [],
      togglerPicks: this.compNames.slice(),
      changed: false,
      nutritional: this.current,
      componentExistingError: false
    }},
    methods: {
        getImgUrl(image) {
            var images = require.context('@/assets/', false)
            return images('./' + image)
        },
        calComponent: function(data, type) {
            let val = data.components.reduce(function(acc, item){
                return acc + item[type]
            }, 0);
            return +val.toFixed(1);
        },
        compareProduct: function(event) {
            let id;
            var self = this;
            this.catalog.forEach(function(item, index){
                if (item.name === self.selected) {
                    id = index;
                }
            });
            var item = this.catalog[id];
            var mywindow = window.open('', 'PRINT', 'height=800,width=800');
            
            mywindow.document.write(`<html>
                <head>
                <title>Сравнения продуктов</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <style>
                    * {
                        text-align: center;
                        color: black;
                        font-family: Fira Code, monospace;
                        font-size: 1.2rem;
                    }
                    .text-style {
                        font-size: 52px;
                        letter-spacing: 6px;
                        line-height: 1;
                        margin: 0;
                        position: relative;
                    }
                    .top {
                        background: white;
                        -webkit-background-clip: text;
                        background-clip: text;
                        position: absolute;
                        z-index: 1;
                        -webkit-text-fill-color: transparent;
                        text-fill-color: transparent;
                        margin-left: 51px;
                        margin-top: 1px;
                        width: 600px;
                    }
                    .bottom {
                         text-shadow: 
                            2px 1px rgb(0, 0, 0),
                            4px 2px rgb(0, 0, 0), 
                            6px 4px rgb(0, 0, 0),
                            8px 5px rgb(0, 0, 0),
                            10px 6px rgb(0, 0, 0),
                            12px 7px rgb(0, 0, 0),
                            14px 8px rgb(0, 0, 0);
                    }
                    body {
                        width: 700px;
                        margin: 0 auto;
                    }
                    hr {
                        border-top: 2px dotted black;
                    }
                    .content * {
                        text-align: left;
                    }
                    time {
                        text-align: left;
                    }
                    .col-md-4 {
                        font-weight: 550;
                    }
                    div .img-fluid {
                        width: 400px;
                    }
                    img {
                        margin: 0 auto;
                        width: 40%;
                    }
            </style>`);
            mywindow.document.write('</head><body>');
            mywindow.document.write(
                '<h1>' + `
                <div class="top text-style">Сравнение</div>
                <div class="bottom text-style">Сравнение</div>
                ` + 
                '</h1>'
            );
            let div = document.createElement('div');
            div.classList.add('container');
            let Product = document.createElement('div');
            Product.classList.add('col-md-12');
            Product.classList.add('col-12');
            Product.classList.add('data');
            let price = this.calComponent(item, 'cost')
            let cal = this.calComponent(item, 'calories');
            let fat = this.calComponent(item, 'fat')
            let proteint = this.calComponent(item, 'proteint')
            let сarbohydrates = this.calComponent(item, 'сarbohydrates');
            let imgUrl = this.current.imgURL;
            let trueIMg = document.getElementById(imgUrl);
            let imgUrl2 = item.imgURL;
            let trueIMg2 = document.getElementById(imgUrl2);
            Product.innerHTML = `
                <br/>
                <div class="row">
                    <div class="col-md-4" style="border-bottom: 1px solid">
                        ${this.current.name}
                    </div>
                    <div class="col-md-4">
                        
                    </div>
                    <div class="col-md-4" style="border-bottom: 1px solid">
                        ${item.name}
                    </div>
                </div>
                <p>
                    Цена
                </p>
                <div class="row">
                    <div class="col-md-4">
                        ${this.current.price.toFixed(1)}
                    </div>
                    <div class="col-md-4">
                        <kbd>VS</kbd>
                    </div>
                    <div class="col-md-4">
                        ${price}
                    </div>
                </div>
                <p>
                    Жиры
                </p>
                <div class="row">
                    <div class="col-md-4">
                        ${this.current.fat.toFixed(1)}
                    </div>
                    <div class="col-md-4">
                        <kbd>VS</kbd>
                    </div>
                    <div class="col-md-4">
                        ${fat}
                    </div>
                </div>
                <p>
                    Углеводы
                </p>
                <div class="row">
                    <div class="col-md-4">
                        ${this.current.carbo.toFixed(1)}
                    </div>
                    <div class="col-md-4">
                        <kbd>VS</kbd>
                    </div>
                    <div class="col-md-4">
                        ${сarbohydrates}
                    </div>
                </div>
                <p>
                    Белки
                </p>
                <div class="row">
                    <div class="col-md-4">
                        ${this.current.protein.toFixed(1)}
                    </div>
                    <div class="col-md-4">
                        <kbd>VS</kbd>
                    </div>
                    <div class="col-md-4">
                        ${proteint}
                    </div>
                </div>
                <p>
                    Калорийность
                </p>
                <div class="row">
                    <div class="col-md-4">
                        ${this.current.cal.toFixed(1)}
                    </div>
                    <div class="col-md-4">
                        <kbd>VS</kbd>
                    </div>
                    <div class="col-md-4">
                        ${cal}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <img src="${trueIMg.src}"
                            class="img img-fluid"/>
                    </div>
                    <div class="col-md-4">
                        
                    </div>
                    <div class="col-md-4">
                        <img src="${trueIMg2.src}"
                            class="img img-fluid"/>
                    </div>
                </div>
                
            `;
            div.appendChild(Product);
            let img = document.createElement('img');
            img.src = 'https://i.ibb.co/cwqw8tq/cut-logo-1.png';
            img.style.cssFloat = 'right';
            div.appendChild(img);
            mywindow.document.body.appendChild(div);
            mywindow.document.write('</body></html>');
            mywindow.document.close();
            setTimeout(function() {
                mywindow.focus();
                mywindow.print();
            }, 3000)
            
        },
        printProduct: function(event) {
            var mywindow = window.open('', 'PRINT', 'height=800,width=800');
            
            mywindow.document.write(`<html>
                <head>
                <title>Информация о продукте</title>
                <style>
                    * {
                        text-align: center;
                        color: black;
                        font-family: Fira Code, monospace;
                        font-size: 1.2rem;
                    }
                    .text-style {
                        font-size: 52px;
                        letter-spacing: 6px;
                        line-height: 1;
                        margin: 0;
                        position: relative;
                    }
                    .top {
                        background: white;
                        -webkit-background-clip: text;
                        background-clip: text;
                        position: absolute;
                        z-index: 1;
                        -webkit-text-fill-color: transparent;
                        text-fill-color: transparent;
                        margin-left: 1px;
                        margin-top: 1px;
                        width: 600px;
                    }
                    .bottom {
                         text-shadow: 
                            2px 1px rgb(0, 0, 0),
                            4px 2px rgb(0, 0, 0), 
                            6px 4px rgb(0, 0, 0),
                            8px 5px rgb(0, 0, 0),
                            10px 6px rgb(0, 0, 0),
                            12px 7px rgb(0, 0, 0),
                            14px 8px rgb(0, 0, 0);
                    }
                    body {
                        width: 600px;
                        margin: 0 auto;
                    }
                    hr {
                        border-top: 2px dotted black;
                    }
                    .content * {
                        text-align: left;
                    }
                    time {
                        text-align: left;
                    }
                    .table {
                        width: 100%;
                        padding: 0px;
                        border-collapse: collapse;
                    }
                    .table th {
                        text-align: center;
                    }
                    .table td {
                        font-weight: normal;
                        text-align: center;
                        padding: 0.25rem 0;
                        border-bottom: 1px solid;
                        white-space: nowrap;
                    }
                    .main-img {
                        width: 70%;
                    }
                    img {
                        margin: 0 auto;
                        width: 40%;
                    }
            </style>`);
            mywindow.document.write('</head><body>');
            mywindow.document.write(
                '<h1>' + `
                <div class="top text-style">Информация о ${this.current.name}</div>
                <div class="bottom text-style">Информация о ${this.current.name}</div>
                ` + 
                '</h1>'
            );
            let div = document.createElement('div');
            div.classList.add('content');
            let paragraph = document.createElement('p');
            let imgMain = document.createElement('img');
            let hr = document.createElement('hr');
            let imgUrl = this.current.imgURL;
            let trueIMg = document.getElementById(imgUrl);
            imgMain.src = trueIMg.src;
            imgMain.classList.add('main-img');
            div.appendChild(imgMain);
            div.appendChild(hr);
            paragraph.textContent = 'Компоненты:';
            div.appendChild(paragraph);
            let ol = document.createElement('ol');
            this.current.components.forEach(function(item) {
                let li = document.createElement('li');
                li.textContent = item.name
                ol.appendChild(li);
            });
            div.appendChild(ol);
            div.appendChild(hr);
            let table = document.createElement('table');
            table.classList.add('table')
            table.innerHTML = `
            <tbody>
                <tr>
                    <th>Белки</th>
                    <th>Углеводы</th>
                    <th>Жиры</th>
                    <th>Калорийность</th>
                </tr>
                <tr>
                    <td>${this.current.protein.toFixed(1)}</td>
                    <td>${this.current.carbo.toFixed(1)}</td>
                    <td>${this.current.fat.toFixed(1)}</td>
                    <td>${this.current.cal.toFixed(1)}</td>
                </tr>
            </tbody>
            `;

            let price = document.createElement('p');
            price.textContent = 'Стоимость ' + this.current.price.toFixed(1) + ' BYN';
            price.style.textAlign = 'center';
            div.appendChild(table);
            div.appendChild(price);
            let img = document.createElement('img');
            img.src = 'https://i.ibb.co/cwqw8tq/cut-logo-1.png';
            img.style.cssFloat = 'right';
            div.appendChild(img);
            mywindow.document.body.appendChild(div);
            mywindow.document.write('</body></html>');
            mywindow.document.close();
            setTimeout(function() {
                mywindow.focus();
                mywindow.print();
            }, 2000)
        },
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
    mounted() {
        
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
.compare {
    padding: 5px;
    text-align: left;
    margin: 0 auto;

}
</style>
