<template>
    <div class="container">
        <div class="container comment-element">
                <transition name="slide-fade">               
                    <div class="row" v-if="show">
                        <div class="col-md-4" >
                            <div class="card">
                                <img class="card-img-top" sr="https://static-cdn.jtvnw.net/emoticons/v1/128391/3.0"/>
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
                            <img class="card-img-top" sr="https://static-cdn.jtvnw.net/emoticons/v1/147833/3.0"/>
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
                            <img class="card-img-top" sr="https://static-cdn.jtvnw.net/emoticons/v1/195855/3.0"/>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            showSecond: true,
            showThird: true,
        }
    }
}
</script>
<style scoped>
.comment-element {
    margin: 15px 5px;
}
</style>
