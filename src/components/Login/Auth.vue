<template>
    <div class="registraion">
        <div class="under-form">
        </div>
        <div class="form-input">
            <div class="container">
                <div class="row">
                    <div class="col-12 d-block d-sm-none facts-text">
                        Регистрация
                    </div>
                    <div class="col-md-5 pb-1 info-body">
                        <div class="d-none d-sm-block">
                            <img src="@/assets/1265427.svg">
                            <h1 class="lead message facts-text">
                                Регистрация
                            </h1>
                        </div>
                        <p class="login-help">
                            Уже есть аккаунт? <router-link class="redirection" to="/registration">Войти в аккаунт</router-link> 
                        </p>
                        <p class="password-help">
                            <router-link class="redirection" to="/registration">Проблемы с паролем?</router-link> 
                        </p>
                    </div>
                    <div class="col-md-7 inputs-body">
                        <form @submit="checkForm">
                            <div class="section-input">
                                <label for="email">Почта</label>
                                <input type="text" id="email" class="form-control" v-model="email"/>
                                <span class="error-text" 
                                v-if='errorsEmail.length' v-for='(value, key) in errorsEmail'>
                                    {{value}}
                                </span>
                            </div>
                            <div class="section-input">
                                <label for="password">Пароль</label>
                                <input type="password" id="password" class="form-control" v-model="password"/>
                                <span class="error-text"  
                                v-if='passwordError.length > 0' v-for='(value, key) in passwordError'>
                                    {{value}}
                                </span>
                            </div>
                            <div class="section-input">
                                <label for="passwordCheck">Проверка пароля</label>
                                <input type="password" id="passwordCheck" class="form-control" v-model="passwordCheck"/>
                                <span class="error-text"  
                                v-if='passwordCheckError.length > 0' v-for='(value, key) in passwordCheckError'>
                                    {{value}}
                                </span>
                            </div>
                            <div class="section-input">
                                <button name="createAccount"
                                type="submit" class="btn btn-lg button"
                                v-on:click="sendUserData">Создать</button>
                            </div>
                             <transition  name="fade">
                                <div class="load-data" v-show="loading">
                                    <div class="loader text-center" style="margin:0 auto" v-show="spinner">
                                    </div>
                                    <h3 class="facts-text mt-2 display-3" v-show="spinner">Загрузка..</h3>
                                </div>
                            </transition>
                        </form>
                    </div>
                </div>
            </div>
            <transition  name="fade">
                <div class="container mt-1 auth-message">
                    <p class="lead facts-text">
                        {{authMessage}}
                    </p>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
        return {
            email: '',
            password: '',
            passwordCheck: '',
            errorsEmail: [],
            passwordError: [],
            passwordCheckError: [],
            authMessage: '',
            spinner: false,
            loading: false
        }
    },
    methods: {
        sendUserData: function (event) {
            var isValid = this.checkForm(event);
            event.preventDefault();
            if (!isValid) {
                return false;
            }

            var userEmail = this.email;
            var userPassword = this.password;
            var dataObj = {
                Email: userEmail,
                Password: userPassword
            }
            var self = this;
            var spinner = document.querySelector('.loader');
            this.spinner = true;
            this.loading = true;
            spinner.classList.add('spin');
            axios({
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                url: "/api/registration",
                data: JSON.stringify(dataObj)
            })
            .then((response) => {
            // Ответ был получен
                spinner.classList.remove('spin');
                self.spinner = false;
                console.log(response);
                if (response.data.statusCode.statusCode === 200) {
                    self.authMessage = response.data.message;
                    setTimeout(function(){
                        self.$router.push('registration')
                    }, 3200)
                }
            })
            .catch(function (error) {
            //если ошибка
                self.authMessage = response.data.message;
            })
            
        },
        checkForm: function (event) {
            console.log(this.$router.currentRoute);
            this.errorsEmail = [];
            this.passwordError = [];
            this.passwordCheckError = [];

            if (this.password.length < 6) {
                this.passwordError.push('Указанный пароль меньше 6-ти символов');
            }

            if (!this.email) {
                this.errorsEmail.push('Укажите свою почту');
            } else if (!this.validEmail(this.email)) {
                this.errorsEmail.push('Указанная почта не соотвествует нормам');
            }

            if (this.password !== this.passwordCheck) {
                this.passwordCheckError.push('Пароли не совпадают');
            }

            if (!this.errorsEmail.length && !this.passwordError.length && !this.passwordCheckError.length) {
                return true;
            }

            event.preventDefault();
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    },
    mounted () {
        this.$store.state.loadScreen = false;
        document.querySelector('body').style.backgroundColor = "#841424";
    }
}
</script>
<style scoped>
.under-form {
    margin-bottom: 5%;
}
.form-input {
    margin-top: 150px;
    border-radius: 15px;
    background: #A6B1E1;
    margin: 0 auto;
    width: 60%;
    color: #F7FFF7;
}
.redirection {
    color: black;
}
.info-body img {
    width: 35%;
    margin: 0 0 0 25px;
}
.message {
    margin: 10px 0 25px 0;
    font-size: 30px;
}
.facts-text {
    font-size: 28px;
    font-weight: bold;
    background: black;
    color: white;
}
.login-help, .password-help {
    font-size: 14px;
}
.inputs-body, .info-body {
    padding: 30px;
}
.inputs-body {
    margin-top: 2%;
}
.inputs-body label {
    display: block;
    text-align: left;
}
.section-input {
    margin: 15px 0 15px 0;
}
.section-input input {
    -webkit-text-fill-color: black;
    border: none;
    border-bottom: 2px solid white;
    border-radius: 0;
    background: inherit;
    outline: none;
    font-size: 20px;
}
.section-input input:focus {
    outline-style: none;
    box-shadow: none;
}
.button {
    width: 100%;
    background: #F7FFF7
}
.button:hover {
    background: #EEEEEE;
}
.error-text {
    color: #FCE70C;
    font-size: 18px;
}
div.auth-message {
    padding-right: 0px;
    padding-left: 0px;
}
@media screen and (max-width: 400px) {
    .form-input {
       width: 90%;
       border-radius: 15px;
    }
}
</style>

