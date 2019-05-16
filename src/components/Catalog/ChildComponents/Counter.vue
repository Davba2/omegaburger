<template>
    <div class="col-md-2 col-2 food-body">
        <div class="d-none d-sm-block">
            <img :src="counterData.url"/>
        </div>
        <div class="container sticky">
            <div class="row">
                <div class="col-md-12 col-2 d-none d-sm-block counter">
                    <p>
                        {{counterData.first}}
                    </p>
                    <p>
                        {{counterData.second}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["counterData"],
    data () {
        return {
            first: 0,
            second: 0
        }
    }
}
</script>
<style>
.food-body {
    margin: 0 auto;
}
.food-body img {
    width: 50%;
    margin-bottom: 3%; 
}
.food-body p {
    font-size: 25px;
    width: 35px;
    border: 2px black;
    background: rgb(0, 0, 0);
    color: white;
    display: inline-block;
    margin: 0 5px 0 5px;
}
</style>
