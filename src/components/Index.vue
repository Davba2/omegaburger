<template>
    <div>
        <div id="demo" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active carousel-image-1">
                    <div class="carousel-caption d-none d-sm-block text-right mb-5">
                        <h1 class="display-4">Берите то, что хотите</h1>
                        <p class="lead display-6">
                            Просматривайте тысячи блюд и выбирайте то, что вам по-душе. От блюд до гамбургеров
                        </p>
                        <router-link to="/registration" class="btn btn-lg">
                            Регистрация
                        </router-link>
                    </div>
                </div>
                <div class="carousel-item carousel-image-2">
                    <div class="carousel-caption">
                        <h1 class="display-4">Сочные как сочники</h1>
                        <p class="lead">Доступные как воздух</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
        <section id="facts">
			<div class="container">
				<div class="d-flex d-flex align-items-center">
					<div class="col-md mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="https://image.flaticon.com/icons/svg/1162/1162486.svg" class="img-fluid">
						<p class="lead">Большой ассортиент</p>
					</div>
                    <div class="col-md mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="https://image.flaticon.com/icons/svg/726/726455.svg" class="img-fluid">
						<p class="lead">Быстрая доставка</p>
					</div>
                    <div class="col-md mb-4 text-center merits">
						<i class="fa fa-cog mb-2"/>
						<img src="https://image.flaticon.com/icons/svg/1408/1408430.svg" class="img-fluid">
						<p class="lead">Вкусно</p>
					</div>
				</div>
			</div>
		</section>
        <section>
			 <div class="overlay container-fluid">
				 <div class="row">
					 <div class="col-lg col-md align-items-center">
						 <div class="container">
							 <h1 class="display-2">
								 Сайт все ещё делается
							 </h1>
							 <p class="lead">Некоторый функионал пока не доступен</p>
						 </div>
					 </div>
				 </div>
			 </div>
		</section>
        <section id="comments">
            <div class="container comment-element">
                <transition name="slide-fade">
                    <div class="row" v-if="show">
                        <div class="col-md-4" >
                            <div class="card">
                                <img class="card-img-top" src="https://static-cdn.jtvnw.net/emoticons/v1/128391/3.0"/>
                                <div class="card-body">
                                    Студентка. 20
                                </div>
                            </div>
                        </div>
                    
                    <div class="col-md-8">
                        <div class="comment-body text-left">
                            Невероятно вкусно! После того, как попробовала двойной гамбургер от шефа Пуарди, слюнки аж потекли.
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
                            Эм... очень вкусно
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <img class="card-img-top" src="https://static-cdn.jtvnw.net/emoticons/v1/147833/3.0"/>
                            <div class="card-body">
                                Студентка. 21
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
                            <img class="card-img-top" src="https://static-cdn.jtvnw.net/emoticons/v1/195855/3.0"/>
                            <div class="card-body">
                                Студентка. 19
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="comment-body text-left">
                            Че гамбургер не такой как на пикче?
                        </div>
                    </div>
                </div>
                </transition>
            </div>
        </section>
        <section id="map">
            <div class="container-fluid">
                <div id="mapid" ref="mapElement"></div>
            </div>
        </section>
        <footer id="mainFooter">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <p class="help-text">
                            Магазин
                        </p>
                        <ul>
                            <li>Каталог</li>
                            <li>Помощь</li>
                            <li>Войти</li>
                            <li>Кабинет</li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <p class="help-text">
                            Доставка
                        </p>
                        <ul>
                            <li>Способ доставки</li>
                            <li>Как оплатить</li>
                            <li>Долгая доставка?</li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                       <img src="https://my.mixtape.moe/iwxgkq.PNG"
                        class="img img-fluid"/>
                    </div>
                </div>
            </div>
            <span>
                2019
            </span>
        </footer>

    </div>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import L from 'leaflet';
export default {
    data () {
        return {
           map: null,
           show: true,
           showSecond: true,
           showThird: true
        }
    },
    methods: {
        toggleComments: function () {
            console.log(this.show);
            this.show = !this.show;
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
        this.interval = setInterval(() => this.toggleComments(), 11000);
    },
    mounted () {
        
        this.$nextTick(() => {
            this.map = L.map(this.$refs['mapElement']).setView([53.902237, 30.335839], 14);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
            new L.Marker([53.902237, 30.335839]).bindPopup('OMEGA Burger').addTo(this.map);
        })
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
    background: #cf5c36;
}
#facts img {
    width: 25%;
}
#facts p {
    margin: 15px 0 0 0;
    font-size: 26px;
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
    height: 250px;
    background: url("https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-168649.png");
    background-attachment: fixed;
    background-repeat: no-repeat;
    color:#fff;
}
#comments {
    width: 800px;
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
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>