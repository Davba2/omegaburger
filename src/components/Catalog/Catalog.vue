<template>
    <div>
        <div class="container">
            <div class="row omega">
                <div class="col-md-12 bg-danger">
                    Тут может быть заказ?
                </div>   

            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-9 catalog bg-primary">
                        <div class="collapse burger" id="demo">
                            <div class="card">
                                Hello There parthner
                                <div class="card-header">Header</div>
                                <div class="card-body">Content</div> 
                                <div class="card-footer">Footer</div>
                            </div>
                           
                        </div>
                        <div class="collapse salad" id="demo2">
                            <div class="card">
                                <div class="card-header">здесь изображение </div>
                                <div class="card-body">Бургер лососевый</div> 
                                <div class="card-footer">цена</div>
                            </div>
                        </div>
                        <div class="collapse sweat" id="demo3">
                            <div class="card">
                                <div class="card-header">здесь изображение </div>
                                <div class="card-body">Бургер лососевый</div> 
                                <div class="card-footer">цена</div>
                            </div>
                        </div>
                        <div class="collapse drinks" id="demo4">
                            <div class="card">
                                <div class="card-header">здесь изображение </div>
                                <div class="card-body">Бургер лососевый</div> 
                                <div class="card-footer">цена</div>
                            </div>
                        </div>
                        <div class="collapse dishes" id="demo5">
                            <div class="card">
                                <div class="card-header">здесь изображение </div>
                                <div class="card-body">Бургер лососевый</div> 
                                <div class="card-footer">цена</div>
                            </div>
                        </div>
                </div>
                <div class="col-md-3 option">
                    <div class="option-element">
                        <a href="#demo" @click="toggle" class="plead" data-toggle="collapse" data-type="burger">
                            Бургеры
                        </a>
                    </div>
                    <div class="option-element">
                        <a href="#demo2" @click="toggle" class="plead" data-toggle="collapse" data-type="salad">
                            Салаты
                        </a>
                    </div>
                    <div class="option-element">
                        <a href="#demo3" @click="toggle" class="plead" data-toggle="collapse" data-type="sweat">
                            Десерты
                        </a>
                    </div>
                    <div class="option-element">
                        <a href="#demo4" @click="toggle" class="plead" data-toggle="collapse" data-type="drinks">
                            Напитки
                        </a>
                    </div>
                    <div class="option-element">
                        <a href="#demo5" @click="toggle" class="plead" data-toggle="collapse" data-type="dishes">
                            Закуски
                        </a>
                    </div>
                    2
                </div>
            </div>
        </div>
        Дарова нафиг
    </div>
</template>
<script>
export default {
    data() {
        return {
            burgerShow: false
        }
    },
    methods: {
        toggle: function (event) {
            
            var target = event.target;
            var divParent = target.closest('div');
            var parent = target.closest('.option');
            console.log(parent.children)
            for (var i = 0; i < parent.children.length; i++) {
                parent.children[i].className = 'option-element'; //second console output
            }

            console.log(parent)
            var className = target.dataset.type;
            divParent.classList = 'option-element ' + className;
            //из документации bootstrap
            $('.collapse').collapse('hide');
            console.log(event.target.closest('div'))
        }
    }
}
</script>
<style scoped>
.omega {
    margin-bottom: 10%;
}
.option, .catalog, .drinks, .sweat, .dishes {
    padding: 0;
    text-align: center
}
.option-element {
    height: 50px;
    width: 100%;
    font-size: 22px;
    border-bottom: 2px black;
}
.collapse {
    width: 100%;
    height: 100%;
    text-align: center;
}
.card {
    width: 20%;
    height: 100%;
}
.burger {
    background:#FFD700;
}
.salad {
    background: #A463F2;
}
.dishes {
    background: #FFA3D7;
}
.drinks {
    background:  #E8FDF5;
}
.sweat {
    background: #001B44;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
