<template>
    <div>
        <div class="">
            <video autoplay muted loop id="myVideo" class=" d-sm-none d-md-block" style="width: 100%;z-index:1">
                <source src="https://my.mixtape.moe/oerohs.webm" type="video/webm">
            </video>
            <div class="content" style="    z-index: 100;
                bottom: -140px;
                right: 16px;
                position: absolute;
                width: 32%">
                <h1 style="font-size: 36px; font-weight:bold;color: white;font-family: Georgia;" class="lead">Магазин гамбургеров</h1>
                <hr style="border-top: 3px double #8c8b8b;"/>
            </div>
        </div>
        <img src="@/assets/logo.png"/>
        <div id="demo" class=" slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active carousel-image-1">
                    <div class="carousel-caption d-none d-sm-block text-right mb-5" style="right: 9%">
                        <h1 class="display-4">Берите то, что хотите</h1>
                        <p class="lead display-6">
                            Просматривайте тысячи блюд и выбирайте то, что вам по-душе. От блюд до гамбургеров
                        </p>
                        <router-link to="/authentication" class="btn btn-lg">
                            Регистрация
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
        <section id="facts" @mouseover="f">
			<div class="container">
				<div class="d-flex d-flex align-items-center">
					<div class="mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="https://image.flaticon.com/icons/svg/1162/1162486.svg" class="img-fluid">
						<p class="lead facts-text">Большой ассортиент</p>
					</div>
                    <div class="col-md-4 mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="https://image.flaticon.com/icons/svg/726/726455.svg" class="img-fluid">
						<p class="lead facts-text">Быстрая доставка</p>
					</div>
                    <div class="col-md-4 mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="https://image.flaticon.com/icons/svg/1408/1408430.svg" class="img-fluid">
						<p class="lead facts-text">Вкусно</p>
					</div>
				</div>
            </div>
            <div class="container pb-2" style=" border-top: 1px solid gray;">
                <img class="img img-fluid" src="https://image.flaticon.com/icons/svg/265/265699.svg" style="width: 13%"/>
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
                            <h1 class="display-2" style="border-bottom: 1px solid gray;
                                width: 75%;
                                font-weight: bold;
                                font-size: 4.5rem;
                                font-family: Georgia">
                                Аппетитные булочки
                            </h1>
                            <p class="lead">Попробуйте, пока горячие</p>
                        </div>
                    </div>
                </div>
            </div>
		</section>
        <header/>
        <section id="comments" class="text-white">
            <div class="container" style="text-align: center;font-size: 26px">
            <div class="container" 
            style="margin-top: 20px;
            border-bottom: 3px double #8c8b8b;font-size: 32px; font-weight: bold; background: black">
                Вот что думают он нас:
            </div>
            </div>
            <div class="container">
        <div class="container comment-element">
                <transition name="slide-fade" > 
                    <div class="row" v-if="show">
                        <div class="col-md-4" >
                                <div class="card">
                                <img class="card-img-top"  :src="commentFirst.url"/>
                                <div class="card-body">
                                    {{commentFirst.name}}. {{commentFirst.age}}
                                </div>
                            </div>
                           
                        </div>
                        <div class="col-md-8">
                            <div class="comment-body text-left">
                                {{commentFirst.text}}
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            
            <div class="container comment-element">
                <transition name="slide-fade">
                <div class="row" v-if="showSecond">
                    <div class="col-md-8">
                        <div class="comment-body text-right">
                           {{commentSecond.text}}
                        </div>
                    </div>
                    <div class="col-md-4">
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
                    <div class="col-md-4">
                        <div class="card">
                            <img class="card-img-top" :src="commentThird.url"/>
                            <div class="card-body">
                                {{commentThird.name}}. {{commentThird.age}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
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
            <div class="container" 
                style="margin-bottom: 20px;
                border-bottom: 3px double rgb(140, 139, 139);
                font-size: 32px;
                font-weight: bold;
                background: black;
                color: white;
                width: 30%">
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
                        <div class="container" 
                            style="margin-top: 20px;
                            font-size: 32px;
                            font-weight: bold;
                            background: black;
                            color: white;
                            width: 60%" v-if="userDistance">
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
               url: 'https://static-cdn.jtvnw.net/emoticons/v1/128391/3.0'
           },
           commentSecond: {
               name: 'Габриэль',
               age: 17,
               text: 'Очень вкусно!',
               url: 'https://static-cdn.jtvnw.net/emoticons/v1/147833/3.0'
           },
           commentThird: {
               name: 'Жора',
               age: 23,
               text: 'Че гамбургер не такой как на пичке?',
               url: 'https://static-cdn.jtvnw.net/emoticons/v1/195855/3.0'
           }
        }
    },
    components: {
        'fuck-you-nigger':CommentsBody
    },
    methods: {
        toggleComments: function () {
            console.log(this.show);
            this.show = !this.show;
        },
        getUserCoord: function () {
            console.log('wrok');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showCoord);
                this.userDistance = true;
            } else {
                this.position = "Невозможно определить ваши коориданаты";
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
        },
        showError: function (error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                return "User denied the request for Geolocation."
                break;
                case error.POSITION_UNAVAILABLE:
                return "Location information is unavailable."
                break;
                case error.TIMEOUT:
                return  "The request to get user location timed out."
                break;
                case error.UNKNOWN_ERROR:
                return  "An unknown error occurred."
                break;
            }
        },
        calculateDistance: function (coord) {
            //в js нету radiands? WTF
        },
        intervalComment : function (objArray, sortArray) {
            this.commentFirst = sortArray[0];
            this.commentSecond = sortArray[1];
            this.commentThird = sortArray[2];
            this.show = true;
            this.showSecond = true;
            this.showThird = true;
        },
        compareRandom: function () {
            return Math.random() - 0.5;
        },
        f: function () {
            console.log('hello')
            if (!this.statToggle && window.scrollY > 1500) {
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
        window.addEventListener('scroll', this.f);
        let objArray = [self.commentFirst, self.commentSecond, self.commentThird];
        console.log(self.commentSecond)
        //this.interval = setInterval(() => this.toggleComments(), 11000);
        let toggleCommentsInterval = setInterval(function() {
            self.show = false;
            self.showSecond = false;
            self.showThird = false;
            let array = ['commentFirst', 'commentSecond', 'commentThird'];
            let arrayItem = objArray.slice();
            arrayItem.sort(function() {
                return Math.random() - 0.5;
            });
            console.log('вызваю')
            setTimeout(function() {
                 self.intervalComment(objArray, arrayItem);
            }, 500)
        }, 20000)
    },
    mounted () {
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
.carousel-item
{
    clear: both;
    height: 550px;
}
.carousel-item .btn {
    background: yellow;
}
.carousel-item .btn:hover {
    background: rgb(238, 238, 32);
}
.carousel-item p, h1 {
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
.carousel-image-1 {
    box-shadow: 0 0 150px rgba(0, 0, 0, 0.623) inset;
    background: url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-715711.jpg');
    background-size: cover;
}
.carousel-image-2 {
    box-shadow: 0 0 150px rgba(0,0,0,0.623) inset;
    background: url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-709583.jpg');
    background-size: cover;
}
.overlay {
    height: 410px;
    background: url("https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-4870.png");
    background-attachment: fixed;
    background-repeat: no-repeat;
    color:#fff;
}
#comments {
    width: 800px;
    height: 920px;
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
}
.comment-body {
    margin: 50px 0 0 0;
    font-size: 25px;
}
.autho-body {
    border: 1px solid gray;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    text-align: center;
    padding: 30%;
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
.help-text {
    border-bottom: 1px solid;
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

</style>