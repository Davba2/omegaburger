<template>
    <div class="registraion">
        <div class="under-form">
        </div>
        <div class="form-input">
            <div class="container">
                <div class="row">
                    <div class="col-md-5 info-body">
                        <div>
                            <img src="@/assets/1265427.svg">
                            <h1 class="lead message facts-text">
                                Регистрация
                            </h1>
                        </div>
                        <p class="login-help">
                            Уже есть аккаунт? <router-link class="redirection" to="/registration">Войти</router-link> 
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
                                <button 
                                type="submit" class="btn btn-lg button"
                                v-on:click="sendUserData">Войти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <form>
            </form>
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
            passwordCheckError: []
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

            /**
             * Отправляет запрос к контр. User - Action Auth.
             * Вид объекта:
             * obj = {
             *     userEmail
             *     userPassword
             * }
             * 
             * */

            axios.post({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                url: "http://localhost:64349/Account/Auth",
                data: {
                    userEmail,
                    userPassword
                }
            })
            .then((response) => {
            // Ответ был получен
            console.log(response);
            })
            .catch(function (error) {
            //если ошибка
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
    }
}
</script>
<style scoped>
.under-form {
    margin-bottom: 5%;
}
.form-input {
    margin-top: 150px;
    border-radius: 7px;
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
    -webkit-text-fill-color: rgb(191, 241, 210);
    border: none;
    border-bottom: 2px solid white;
    border-radius: 0;
    background: inherit;
    outline: none;
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
</style>

