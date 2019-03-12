<template>
    <div>
        <div class="container-fluid helper" style="padding: 0">
            <div>
                <p class="help-header-text" style="min-width: 22%;margin: 0 auto" ref="howOrderWork"> 
                    Как происходит доставка?
                </p>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 d-sm-none d-none d-sm-block d-md-block">
                            <video autoplay muted loop id="myVideo" class=" d-sm-none d-md-block" style="width: 100%;z-index:1">
                            <source src="https://my.mixtape.moe/phfcws.mp4" type="video/mp4">
                        </video>
                        </div>
                        <div class='col-md-6'>
                            <p style="color: white; font-size: 26px">
                                Вы можете забрать свой заказ сами, либо 
                                курьер доставит ваш заказ к вам.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="help-header-text" style="min-width: 22%;margin: 0 auto"> 
                    Плохое качество?
                </p>
                <div class="container-fluid">
                    <div class="row">
                        <div class='col-md-6 d-none d-sm-block d-md-block' style="text-align: center">
                            <p style="color: white; font-size: 26px;">
                                В случае если, приобретаемый товар выглядел неподобающе, 
                                вы нашли посторонние предметы в нем, курьер вам нагрубил - 
                                вы гарантирована возвратим вам деньги. В случае, если заказ
                                больше 70 BYN - то мы вас побъем.
                            </p>
                        </div>
                        <div class='col-md-6'>
                            <img src="../assets/Badge_15 (0-00-07-05).png" class="img img-fluid" style="width: 70%"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="help-header-text" style="min-width: 22%;margin: 0 auto"> 
                    Чем можно оплачивать?
                </p>
                <div class="container-fluid">
                    <div class="row">
                        <div class='col-md-6 col-lg-6'>
                            <img src="../assets/Ribbon_01 (0-00-04-02).png" style="width: 70%"/>
                        </div>
                        <div class='col-md-6 col-lg-6 col-12 d-sm-none d-none d-sm-block d-md-block'>
                            <p style="color: white; font-size: 26px; margin-top: 10%; margin-bottom: 10%" >
                                Наш магазин принимает оплату как за безналичный расчет, так и 
                                с помощью пластиковых карт.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="help-header-text" style="min-width: 22%;margin: 0 auto"> 
                    Долгая доставка?
                </p>
                <div class="container-fluid">
                    <div class="row">
                        <div class='col-md-6'>
                            <p style="color: white; font-size: 26px">
                                Если за ваш заказ взялся курьер, но длительное время
                                его нету, то мы приносим глубочайшие извинения.
                            </p>
                        </div>
                        <div class="col-md-6">
                            <img style="width: 60%"
                            src="https://images.vexels.com/media/users/3/126918/isolated/preview/e35891eb09f47ce73743e6c2ffe5fe46-100-percent-guaranteed-vintage-badge-by-vexels.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        scrollMeTo(refName) {
            var element = this.$refs[refName];
            var top = element.offsetTop;
            window.scrollTo(0, top);
        }
    }
}
</script>

<style scoped>
.help-header-text {
    font-size: 28px;
    font-weight: bold;
    background: black;
    color: white;
    border-bottom: 2px solid white;
}
.helper p {
    margin-top: 10%;
    margin-bottom: 10%
}
.col-md-6 {
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>
