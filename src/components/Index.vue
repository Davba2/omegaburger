<template>
    <div>
        <div class="">
            <video autoplay muted loop id="myVideo" class="d-none d-sm-none d-md-block" style="width: 100%;z-index:1">
                <source src="@/assets/FatherlySilkyGemsbok.webm" type="video/webm">
            </video>
        </div>
        <div class="content d-none d-sm-none d-md-block gam-shop">
                <h1 class="magazine">Магазин гамбургеров</h1>
                <hr style="border-top: 3px double #8c8b8b;"/>
            </div>
            <div class="content">
                <h1 class="d-block d-sm-none"
                style="font-size: 36px; font-weight:bold;color: white;font-family: Georgia;background:black;border-bottom: 2px solid;">Магазин гамбургеров</h1>
        </div>
        <div id="demo" class=" slide">
            <div id="overlay-fixed">
                <div class="row" style="margin-right: 0px;">
                    <div class="col-lg col-md align-items-center">
                        <div class="container your-choise">
                        
                            <h1 class="display-4 secret">Берите то, что хотите</h1>
                            <p class="lead help-text">
                                Просматривайте тысячи блюд и выбирайте то, что вам по-душе
                            </p>
                            <router-link to="/authentication" class="btn btn-lg text-center">
                                Регистрация
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <div class="overlay-fact container-fluid">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 align-items-center">
                        <div class="container" style="text-align: -webkit-right;
                                                            margin-top: 240px">
                            <h1 class="display-2 secret">
                                Секретные технологии
                            </h1>
                            <p class="help-text"> С любовью к покупателям</p>
                        </div>
                    </div>
                </div>
            </div>
		</section>
        <section id="facts" @mouseover="countNumber">
			<div class="container">
				<div class="row align-items-center">
					<div class="mb-4 col-12 col-md-4 col-lg-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="@/assets/1162486.svg" class="img-fluid">
						<p class="lead facts-text">Большой ассортиент</p>
					</div>
                    <div class="col-12 col-md-4 col-lg-4 mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="@/assets/726455.svg" class="img-fluid">
						<p class="lead facts-text">Быстрая доставка</p>
					</div>
                    <div class="col-12 col-md-4 col-lg-4 mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="@/assets//1408430.svg" class="img-fluid">
						<p class="lead facts-text">Вкусно</p>
					</div>
				</div>
            </div>
            <div class="container pb-2" style=" border-top: 1px solid gray;">
                <img class="img img-fluid" src="@/assets/265699.svg" style="width: 13%"/>
                <br/>
                <div class="row mt-4">
                    <div class="col-md-4">
                        <h3 class="facts-text">
                            Кол-во заказов
                        </h3>
                        <kbd id="ordersCountJs" style="font-size: 26px;
                            letter-spacing: 6px;text-shadow: 5px 1px 2px darkmagenta;background:#108591d1
                        }">{{orderSucc}}</kbd>
                    </div>
                    <div class="col-md-4">
                        <h3 class="facts-text">
                            Кол-во заказывающих
                        </h3>
                        <kbd id="ordersCountJs" style="font-size: 26px;
                            letter-spacing: 6px;text-shadow: 5px 1px 2px darkmagenta;background:#108591d1
                        }">{{orderPeople}}</kbd>
                    </div>
                    <div class="col-md-4">
                        <h3 class="facts-text">
                            Кол-во прод. товаров
                        </h3>
                        <kbd id="ordersCountJs" style="font-size: 26px;
                            letter-spacing: 6px;text-shadow: 5px 1px 2px darkmagenta;background:#108591d1
                        }">{{orderCol}}</kbd>
                    </div>
                </div>
            </div>
		</section>
        <section>
            <div class="overlay container-fluid">
                <div class="row">
                    <div class="col-lg col-md align-items-center">
                        <div class="container" style="text-align: -webkit-right;
                                                            margin-top: 240px">
                            <h1 class="display-2 facts-text tasty">
                                Аппетитные булочки
                            </h1>
                            <p class="help-text">Попробуйте, пока горячие</p>
                        </div>
                    </div>
                </div>
            </div>
		</section>
        <header/>
        <section id="comments" class="text-white">
            <div class="container comments-capition ">
                Вот что думают он нас:
            </div>
            <div class="container">
        <div class="container comment-element">
                <transition name="slide-fade" > 
                    <div class="row" v-if="show">
                        <div class="col-md-4 col-12 col-sm-4 col-lg-4" >
                                <div class="card">
                                <img class="card-img-top"  :src="commentFirst.url"/>
                                <div class="card-body">
                                    {{commentFirst.name}}. {{commentFirst.age}}
                                </div>
                            </div>
                           
                        </div>
                        <div class="col-md-8 col-12 col-sm-8 col-lg-8">
                            <div class="comment-body text-left">
                                {{commentFirst.text}}
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            
            <div class="container comment-element d-none d-sm-block">
                <transition name="slide-fade">
                <div class="row" v-if="showSecond">
                    <div class="col-md-8 col-12 col-sm-8 col-lg-8">
                        <div class="comment-body text-right">
                           {{commentSecond.text}}
                        </div>
                    </div>
                    <div class="col-md-4 col-12 col-sm-4 col-lg-4">
                        <div class="card">
                            <img class="card-img-top" :src="commentSecond.url"/>
                            <div class="card-body">
                                {{commentSecond.name}}. {{commentSecond.age}}
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
            </div>
            <div class="container comment-element">
                <transition name="slide-fade">
                <div class="row" v-if="showThird">
                    <div class="col-md-4 col-12 col-sm-4 col-lg-4">
                        <div class="card">
                            <img class="card-img-top" :src="commentThird.url"/>
                            <div class="card-body">
                                {{commentThird.name}}. {{commentThird.age}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-12 col-sm-8 col-lg-8">
                        <div class="comment-body text-left">
                            {{commentThird.text}}
                        </div>
                    </div>
                </div>
                </transition>
            </div>
    </div>
        </section>
        <section id="map">
            <div class="container available-shop">
                Доступные магазины
            </div>
            <div class="container-fluid">
                <div id="mapid" ref="mapElement"></div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mt-3">
                        <button class="btn" style="    background: #E0FF4F"  v-on:click="getUserCoord">
                            Отправить координаты
                        </button>
                        <div class="container user-distance" name="userCoord" v-if="userDistance">
                            {{distanceMessage}}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import CommentsBody from '../../src/components/Comments/Comments.vue';
import Counter from '../components/Catalog/Catalog.vue'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import L from 'leaflet';
export default {
    data () {
        return {
           map: null,
           show: true,
           showSecond: true,
           showThird: true,
           position: {},
           orderSucc: 1600,
           current: 5,
           orderPeople: 510,
           orderCol: 8999,
           statToggle: false,
           userDistance: false,
           distanceMessage: 'Вы в 2.4 км, доставка около 15 мин',
           commentFirst: {
               name: 'Олечка',
               age: 23,
               text: 'Невероятно вкусно! После того, как попробовала двойной гамбургер от шефа Пуарди, слюнки аж потекли.',
               url: 'https://static-cdn.jtvnw.net/emoticons/v1/1651240/3.0'
           },
           commentSecond: {
               name: 'Габриэль',
               age: 17,
               text: 'Очень вкусно!',
               url: 'https://static-cdn.jtvnw.net/emoticons/v1/1589348/3.0'
           },
           commentThird: {
               name: 'Жора',
               age: 23,
               text: 'Че гамбургер не такой как на пичке?',
               url: 'https://static-cdn.jtvnw.net/emoticons/v1/1794029/3.0'
           }
        }
    },
    components: {
        'fuck-you-nigger':CommentsBody
    },
    methods: {
        toggleComments: function () {
            this.show = !this.show;
        },
        getUserCoord: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showCoord, this.showError);
            }
        },
        showCoord: function (coord) {
            this.position = {
                lat: coord.coords.latitude,
                lon: coord.coords.longitude
            };

            var icon = L.icon({
                iconUrl: "http://www.goldshieldservices.com/wp-content/blogs.dir/22/files/2015/11/map-marker-icon.png",
                iconSize: [48, 48],
                iconAnchor: [8, 8],
                popupAnchor: [0, 0]
            });
            var popup = L.popup({
                closeButton: true,
                autoClose: true,
                className: "user-popup",
            }).setContent('Вы здесь')
            .setLatLng([this.position.lat, this.position.lon])
            .openOn(this.map)
            new L.Marker([this.position.lat, this.position.lon])
            .bindPopup(popup)
            .addTo(this.map);
            this.calculateDistance(this.position);
        },
        showError: function (error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                this.position = 'Невозможно запросить геолокацию для вас'
                break;
                case error.POSITION_UNAVAILABLE:
                this.position = 'Местонахождение не доступно'
                return "Location information is unavailable."
                break;
                case error.TIMEOUT:
                this.position = 'Время запроса истекло'
                return  "The request to get user location timed out."
                break;
                case error.UNKNOWN_ERROR:
                this.position = 'Неизвестная ошибка'
                break;
            }
        },
        calRadians: function (degrees) {
            return degrees * Math.PI / 180;
        },
        calculateDistance: function (coord) {
            //в js нету radiands? WTF
            let shopCoord = [53.902237, 30.335839];
            let calc = 6371 * Math.acos(Math.sin(this.calRadians(coord.lat)) * Math.sin(this.calRadians(shopCoord[0]))
            + Math.cos(this.calRadians(coord.lat)) * Math.cos(this.calRadians(shopCoord[0])) * Math.cos(this.calRadians(coord.lon)-this.calRadians(shopCoord[1])));
            this.userDistance = true;
            let min = (calc / 15);
            this.distanceMessage = `Вы в ${calc.toFixed(1)} км. Это в ~${ (min * 100).toFixed(0)} минутах от нас.`;
        },
        intervalComment : function (objArray, sortArray) {
            this.commentFirst = sortArray[0];
            this.commentSecond = sortArray[1];
            this.commentThird = sortArray[2];
            this.show = true;
            this.showSecond = true;
            this.showThird = true;
        },
        countNumber: function () {
            if (this.$route.path === '/main') {
                if (!this.statToggle && window.scrollY > 1600) {
                let duration = 4;
                let end = 4000;
                let self = this;
                let a = setInterval(function() {
                    self.orderSucc += 6;
                    self.orderPeople += 14
                    self.orderCol +=22;
                    if (self.orderSucc > end) {
                        clearInterval(a);
                        self.statToggle = true;
                    };
                    duration += 0.3;
                }, duration) 
            }
            }
        }
    },
    props: {
        msg: String
    },
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    created() {
        let self = this;
        window.addEventListener('scroll', this.countNumber);
        let objArray = [
                {
                    name: 'Олечка',
                    age: 23,
                    text: 'Невероятно вкусно! После того, как попробовала двойной гамбургер от шефа Пуарди, слюнки аж потекли.',
                    url: 'https://image.flaticon.com/icons/svg/145/145844.svg'
                },
                {
                    name: 'Габриэль',
                    age: 17,
                    text: 'Очень вкусно!',
                    url: 'https://image.flaticon.com/icons/svg/145/145847.svg' 
                },
                {
                    name: 'Жора',
                    age: 23,
                    text: 'Че гамбургер не такой как на пичке?',
                    url: 'https://image.flaticon.com/icons/svg/145/145849.svg'
                },
                {
                    name: 'Сергей',
                    age: 24,
                    text: 'Цены немного завышены, но в целом покупать здесь можно',
                    url: 'https://image.flaticon.com/icons/svg/145/145845.svg'
                },
                {
                    name: 'Гоша',
                    age: 35,
                    text: 'Вкусно....',
                    url: 'https://image.flaticon.com/icons/svg/145/145845.svg'
                },
                {
                    name: 'Вика',
                    age: 22,
                    text: 'Быстро доставили + всегда вкусно.',
                    url: 'https://image.flaticon.com/icons/svg/145/145850.svg'
                },
                {
                    name: 'Александра',
                    age: 28,
                    text: 'Рекомендую!',
                    url: 'https://image.flaticon.com/icons/svg/145/145850.svg'
                }
        ];
        //this.interval = setInterval(() => this.toggleComments(), 11000);
        let toggleCommentsInterval = setInterval(function() {
            self.show = false;
            self.showSecond = false;
            self.showThird = false;
            let array = ['commentFirst', 'commentSecond', 'commentThird'];
            let arrayItem = objArray.slice();
            arrayItem.sort(function() {
                return Math.random() - 0.5;
            }).slice(0, 4);
            setTimeout(function() {
                 self.intervalComment(objArray, arrayItem);
            }, 500)
        }, 20000)
    },
    mounted () {
        document.querySelector('body').style.backgroundColor = "#841424";
        this.$store.state.loadScreen = false;
        //document.querySelector('#facts').addEventListener('hover', this.countNumber);
        //this.countNumber();
        this.$nextTick(() => {
            this.map = L.map(this.$refs['mapElement']).setView([53.902237, 30.335839], 14);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
            new L.Marker([53.902237, 30.335839]).bindPopup('OMEGA Burger').addTo(this.map);
            new L.Marker([53.904237, 30.345839]).bindPopup('OMEGA Burger').addTo(this.map);
        });
    }
}
</script>
<style scoped>
@import "~leaflet/dist/leaflet.css";
html body {
  margin: 0;
  background: #841424;
}
.magazine {
    font-size: 36px;
    font-weight:bold;color: white;
    font-family: Georgia;background:black;
    border-bottom: 2px solid;
}
#overlay-fixed
{
    clear: both;
    height: 550px;
}
#overlay-fixed .btn {
    background: yellow;
}
#overlay-fixed .btn:hover {
    background: rgb(238, 238, 32);
}
#overlay-fixed p, h1 {
    color: #E8FDF5;
}
#facts {
    background: #F3DE8A;
}
#facts img {
    width: 32%;
}
#facts p {
    margin: 15px 0 0 0;
    font-size: 26px;
}
.facts-text {
    font-size: 28px;
    font-weight: bold;
    background: black;
    color: white;
}
#facts img {
    overflow: hidden;
    transition: .3s ease-in-out;
}
#facts img:hover  {
    transform: scale(1.2);
}
.merits {
    padding: 20px 10px 5px 10px;
}
#overlay-fixed {
    height: 610px;
    background: url("https://w.wallhaven.cc/full/83/wallhaven-83okz2.jpg");
    color:#fff;
}
.carousel-image-1 {
    box-shadow: 0 0 150px rgba(0, 0, 0, 0.623) inset;
    background: url('../assets/wallhaven-715711.jpg');
    background-size: cover;
}
.overlay {
    height: 410px;
    background: url("../assets/wallhaven-4870.png");
    background-attachment: fixed;
    background-repeat: no-repeat;
    color:#fff;
}
.overlay-fact {
    height: 410px;
    background: url("../assets/wallhaven-692427.jpg");
    background-attachment: fixed;
    background-repeat: no-repeat;
    color:#fff;
}
#comments {
    height: 980px;
    margin: 0 auto;
    border-bottom: 1px black;
    margin-bottom: 10px;
}
.comment-element {
    margin: 15px 5px;
}
.card {
    width: 200px;
    height: 250px;
    border-radius: 15px;
    background: inherit;
    margin: 0 auto;
}
.comment-body {
    margin: 50px 0 0 0;
    font-size: 1.6rem;
}
.autho-body {
    border: 1px solid gray;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    text-align: center;
    padding: 30%;
}
.comments-capition {
    margin-top: 20px;
    border-bottom: 3px double #8c8b8b;
    font-size: 2.6rem;; 
    font-weight: bold;
     background: black;
}
.gam-shop {
    z-index: 100;
    bottom: -80px;
    right: 16px;
    position: absolute;
    width: 32%;
}
.your-choise {
    text-align: right;
    margin-top: 350px
}
.available-shop {
    margin-bottom: 20px;
    border-bottom: 3px double rgb(140, 139, 139);
    font-size: 2.6rem;
    font-weight: bold;
    background: black;
    color: white;
    width: 30%;
}
.user-distance {
    margin-top: 20px;
    font-size: 2.6rem;
    font-weight: bold;
    background: black;
    color: white;
    width: 63%;
}
.tasty {
    border-bottom: 3px solid white;
    width: 75%;
    font-weight: bold;
    font-size: 4.5rem;
    font-family: Georgia;
}
.secret {
    border-bottom: 3px solid white;
    width: 76%;
    font-weight: bold;
    font-size: 2.5rem;
    font-family: Georgia;
    background: black
}
.help-text {
    font-size: 1.2rem;
}
#mainFooter {
    background: #EFC88B;
    padding: 40px 20px 15px 20px;
}
#mainFooter ul {
    list-style-type: none;
    padding: 0;
}
#mainFooter img {
    width: 35%;
}
#map {
    border-top: 2px black;
    border-bottom: 2px black; 
    margin: 10px 0 10px 0;
}
#mapid {
    width: 100%;
    height: 400px;
}
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
@media (min-width: 200px) {
        body .comment-body {
            font-size: 1rem;
        }
        body .available-shop, .user-distance, .comments-capition, .tasty, .secret {
            font-size: 1.4rem;
            width: 100%;
            text-align: center;
        }
        .help-text {
            text-align: center;
            font-size: 1.1rem;
        }
        .your-choise {
            text-align: center;
        }
        #comments {
            height: 800px;
        }
    }
    @media (min-width: 400px) {
        body .comment-body {
            font-size: 1.3rem;
        }
        body .available-shop, .user-distance, .comments-capition, .tasty {
            font-size: 1.4rem;
            width: 45%;
        }
        body .tasty, body .secret {
            font-size: 2rem;
            width: 80%;
            text-align: right;
        }
        .secret {
            text-align: right;
        }
         .card img {
            width: 100%;
        }
        .help-text {
            text-align: right;
            font-size: 1.2rem;
        }
        html body div .your-choise {
            text-align: -webkit-right;
        }
        #comments {
            height: 900px;
        }
    }
    @media (min-width: 1000px) {
        body .comment-body {
            font-size: 1.6rem;
        }
        body .available-shop, .user-distance, .comments-capition {
            font-size: 2.4rem;
            width: 40%;
        }
        body .tasty, body .secret {
            font-size: 2.8rem;
            width: 48%;
        }
        body .secret {
            width: 54%;
        }
         .card img {
            width: 100%;
        }
        .help-text {
            font-size: 1.3rem;
        }
        html body div .your-choise {
            text-align: -webkit-right;
        }
    }
    @media (max-width: 1100px) {
        html body div.gam-shop {
            display: none !important;
        }
    }
</style>