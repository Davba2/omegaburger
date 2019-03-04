<template>
    <div>
        <div class="container-fluid" style="padding: 0">
            <div>
                <p class="help-header-text" style="min-width: 22%;margin: 0 auto"> 
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
                    Плохое качество? Вам нагрубили?
                </p>
                <div class="container-fluid">
                    <div class="row">
                        <div class='col-md-6 mt-5 d-none d-sm-block d-md-block' style="text-align: center">
                            <p style="color: white; font-size: 26px;">
                                В случае если, приобретаемый товар выглядел неподобающе, 
                                вы нашли посторонние предметы в нем, курьер вам нагрубил - 
                                вы гарантирована возвратим вам деньги. В случае, если заказ
                                больше 70 BYN - то мы вас побъем.
                            </p>
                        </div>
                        <div class='col-md-6'>
                            <img src="@/assets/Badge_15 (0-00-07-05).png" class="img img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="help-header-text" style="min-width: 22%;margin: 0 auto"> 
                    Как оплатить?
                </p>
                <div class="container-fluid">
                    <div class="row">
                        <div class='col-md-6 col-lg-6'>
                            <img src="@/assets/Ribbon_01 (0-00-04-02).png" style="width: 80%"/>
                        </div>
                        <div class='col-md-6 col-lg-6 col-12 d-sm-none d-none d-sm-block d-md-block'>
                            <p style="color: white; font-size: 26px">
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
                                он нету, то мы приносим глубочайшие извинения.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.help-header-text {
    font-size: 28px;
    font-weight: bold;
    background: black;
    color: white;
    border-bottom: 2px solid white;
}
</style>
