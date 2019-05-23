<template>
        <div class="load-screen container-fluid" >
            <transition name="fade">
                <div v-if='showLoad'>
                    <div class="black-line">
                    <div class="tr-left">
                    </div>
                    <div class="tr-right">
                    </div>
                    </div>
                    <div class="row ">
                        <div class="col-12 logo">
                            <div class="circle">
                                <div class="logo-text-company top-logo">
                                    OMEGA
                                </div>
                                <div class="logo-text-company bottom-logo">
                                    OMEGA
                                </div>
                                <div class="line"> 
                                </div>
                                <div class="logo-text top">
                                    Burger
                                </div>
                                <div class="bottom logo-text">
                                    Burger
                                </div>
                            </div>
                            <div class="col-12">
                                <!-- <div class="desc-text">
                                    Сеть магазинов быстрого питания с 2019 года
                                </div> -->
                                <div class="loading-text">
                                    <span>{{message}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
</template>
<script>
import axios from 'axios';
export default {
    data: function () {
        return {
            message: 'Загрузка...',
            showLoad: false
    }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo;
        }
    },
    methods: {
        getData: function(data, field) {
            let array = data.filter(function(item) {
                return +item.typeId === +field;
            })
            return array;
        },
        dispatchData: function(data, field) {
            this.$store.dispatch('addCatalog', {
                data: data,
                type: field
            });
        }
    },

    mounted () {
        var self = this;
        this.$store.state.loadScreen = true;
        axios({
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            },
            url: "/api/delivery"
        }).then(function(response) {
            console.log(response)
            if (response.status === 200) {
                self.$store.dispatch('addDelivery', response.data);
            }
        });
        if (this.$store.state.catalog.length > 0) {
            self.$router.push('main');
            return;
            this.$store.state.loadScreen = false;
        } else {
              setTimeout(function(){
                self.showLoad = true;
            }, 900)
            axios({
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                },
                url: "/api/catalog",
            })
            .then(function(response) {
                console.log(response)
                if (response.status === 200) {
                        self.message = 'Все загружено...';
                        setTimeout(function(){
                            self.showLoad = false;
                        }, 3400)
                        setTimeout(function() {
                            var data = response.data;
                            var burgers = self.getData(data, 1);
                            var drinks = self.getData(data, 2);
                            var snacks = self.getData(data, 3);
                            var sweat = self.getData(data, 4);
                            var salad = self.getData(data, 5);
                            self.dispatchData(burgers, 'burger');
                            self.dispatchData(drinks, 'drinks');
                            self.dispatchData(snacks, 'snacks');
                            self.dispatchData(sweat, 'sweat');
                            self.dispatchData(salad, 'salad');
                        }, 4400)
                        setTimeout(function() {
                            self.showLoad = false;
                            self.$router.push('main'); 
                            
                    }, 5400)
                } else {
                    self.message = 'Ошибка при загрузке...';
                    setTimeout(function(){
                        self.showLoad = false;
                    }, 3400) 
                    etTimeout(function() {
                            self.showLoad = false;
                            self.$router.push('main'); 
                            
                    }, 5400)
                }
            }).catch(function(error) {
                return;
                self.message = 'Ошибка при загрузке каталога...';
                setTimeout(function(){
                    self.$router.push('main');
                    self.showLoad = false;
                }, 6000)
            })
        }
      
    }
}
</script>
<style scoped>
html body {
    background-color: black;
    
}
.load-screen {
    width: 100%;
    height: 150vh;
    margin: 0 auto;
    position: relative;
    z-index: -10;

    background-image: url('https://i.ibb.co/zhZ7wS2/Shot-4-tropical.png');
}
div.logo {
    margin-top: 2%;
}
.circle {
    margin: 0 auto;
    background-color: rgb(255, 255, 255);
    width: 460px;
    height: 460px;
    border-radius: 50%;
    z-index: 4;
    background-image: url('https://i.ibb.co/zhZ7wS2/Shot-4-tropical.png');
}

.circe div {
    font-family: 'Six Caps', sans-serif;
}
.logo-text-company {
    padding-top: 20px;
    font-size: 7.6rem;
    letter-spacing: 14px;
    line-height: 1.1;
    font-family: 'Six Caps', sans-serif;
    transform: rotate(-10deg);
    color: #ff7357;
}
.top-logo {
    background: linear-gradient(rgb(233, 152, 71), rgb(230, 200, 160));
    -webkit-background-clip: text;
    background-clip: text;
    position: absolute;
    margin-left: 120px;
    z-index: 5;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
}
.bottom-logo {
    z-index: 4;
    text-shadow: 
    2px 1px rgb(85, 10, 0),
    4px 2px rgb(90, 15, 5),
    6px 4px rgb(100, 20, 15),
    8px 5px rgb(105, 25, 20),
    10px 6px rgb(110, 30, 25),
    12px 7px rgb(115, 30, 30);
}
.line {
    width: 197px;
    margin-left: 141px;
    margin-bottom: 5px;
    border-top: 2px #ff7357 solid;
    transform: rotate(-10deg);
}
.logo-text {
    font-size: 14rem;
    font-family: 'Six Caps', sans-serif;
    letter-spacing: 10px;
    line-height: 1;
    margin: 0;
    z-index: 4;
    position: relative;
}
.top {
    background: linear-gradient(rgb(240, 220, 200), rgb(230, 200, 160));
    -webkit-background-clip: text;
    background-clip: text;
    position: absolute;
    margin-left: 48px;
    z-index: 5;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
}
.bottom {
     z-index: 4;
     text-shadow: 
    2px 1px rgb(85, 10, 0),
    4px 2px rgb(90, 15, 5),
    6px 4px rgb(100, 20, 15),
    8px 5px rgb(105, 25, 20),
    10px 6px rgb(110, 30, 25),
    12px 7px rgb(115, 30, 30),
    14px 8px rgb(120, 30, 35),
    16px 9px black,
    18px 10px black,
    20px 11px black,
    22px 12px black,
    24px 13px black,
    28px 14px rgba(0, 0, 0, 0.9),
    30px 15px rgba(0, 0, 0, 0.7),
    32px 16px rgba(0, 0, 0, 0.5),
    34px 17px rgba(0, 0, 0, 0.3),
    36px 18px rgba(0, 0, 0, 0.1),
    40px 20px rgba(0, 0, 0, 0.1);
}
/* .black-line {
    background: radial-gradient(circle, rgba(25, 65, 57,1 ) 0%, rgba(87, 138, 155, 1) 100%);
    width: 914px;
    height: 160px;
    position: absolute;
    z-index: -1;
    top: 30%;
    left: 16%;
}
.tr-left {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    border-top: 80px solid transparent;
    border-left: 120px solid rgb(255, 255, 255);
    border-bottom: 80px solid transparent;
}
.tr-right {
    position: absolute;
    z-index: 6;
    top: 0;
    right: 0;
    border-top: 80px solid transparent;
    border-right: 120px solid white;
    border-bottom: 80px solid transparent;
} */
.desc-text {
    margin-top: 10px;
    font-family: 'Satisfy', cursive;
    font-size: 2.4rem;
    color: #f9d46c;
}
.loading-text {
    margin-top: 20px;
    transform: rotate(-3deg)
}
.loading-text span {
    font-family: 'Satisfy', cursive;
    font-size: 2.8rem;
    font-weight: bold;
    color: #f9d46c;
}
.loading-text span::after {

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
