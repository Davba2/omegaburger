<template>
    <div class="game">
    </div>
</template>
<script>
export default {
    data () {
        return {
            imageObj: [
                'https://image.flaticon.com/icons/svg/135/135589.svg',
                'https://image.flaticon.com/icons/svg/135/135646.svg',
                'https://image.flaticon.com/icons/svg/135/135595.svg',
                'https://image.flaticon.com/icons/svg/1046/1046808.svg',
                'https://image.flaticon.com/icons/svg/1365/1365560.svg',
                'https://image.flaticon.com/icons/svg/1365/1365551.svg',
                'https://image.flaticon.com/icons/svg/1365/1365548.svg',
                'https://image.flaticon.com/icons/svg/1365/1365534.svg',
                'https://image.flaticon.com/icons/svg/1365/1365545.svg'
            ]
        }
    },
    methods: {
        getImage() {
            return this.imageObj[Math.floor(Math.random() * this.imageObj.length)];
        },
        randomValue (min, max) {
            return Math.round(Math.random() * (max - min) + min);
        },
        dropBox() {
            var length = this.randomValue(40, ($(".game").width() - 50));
            console.log(length)
            var velocity = this.randomValue(820, 13000);
            var thisBox = $("<div/>", {
                class: "box",
                style: "width:" + 70 + "px; height:" + 70 + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
            });
            thisBox.data("test", Math.round(Math.random()));
            thisBox.css({ "background": "url(" + this.getImage() + ")", "background-size": "contain" });
            $(".game").append(thisBox);
            setTimeout(function () {
                thisBox.addClass("move");
            }, this.randomValue(0, 1000));
            thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function (event) {
                    $(this).remove();
                });
        }
    },
    created() {
        this.interval = setInterval(() => {
            for (var i = 0; i < 10; i++) {
                this.dropBox();
            }
        }, 12000);
    }
}
</script>
<style>
.game {
    width: 100%;
    overflow: hidden;
}
.box {
    display: inline-block;
    position: absolute;
    top: 150px;
    z-index: -100;
}
.move {
   transform: translateY(185vmin);
}
</style>
