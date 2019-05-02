<template>
    <div class="registraion">
        <div class="under-form">
        </div>
        <div class="form-input">
            <div class="container">
                <div class="row">
                    <div class="col-12 d-block d-sm-none facts-text">
                        Войти
                    </div>
                    <div class="col-md-5 info-body pb-1">
                        <div class="d-none d-sm-block">
                            <img src="@/assets/891389.svg">
                            <h1 class="lead message facts-text">
                                Войти в аккаунт
                            </h1>
                        </div>
                        <p class="login-help">
                            Нет аккаунта? <router-link class="redirection" to="/authentication">Зарегестрируйтесь</router-link> 
                        </p>
                        <p class="password-help">
                            <router-link class="redirection" to="/registration">Проблемы с паролем.</router-link> 
                        </p>
                    </div>
                    <div class="col-md-7 col-sm-12 col-12 inputs-body">
                        <form @submit="checkForm">
                            <div class="section-input">
                                <label for="email">Почта</label>
                                <input type="text" id="email" class="form-control" v-model="email"/>
                                <span class="error-text" 
                                v-if='errorsEmail.length' v-for='value in errorsEmail'>
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
                                <button name="login"
                                type="submit" class="btn btn-lg button"
                                v-on:click="sendUserData">Войти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="container mt-1">
                <p class="lead">
                    {{authMessage}}
                </p>
            </div>
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
            remember: false,
            errorsEmail: [],
            passwordError: [],
            currentPath: this.$route.path,
            authMessage: ''
        }
    },
    methods: {
        sendUserData: function (event) {
            //var isValid = this.checkForm(event);
            event.preventDefault();
            // if (!isValid) {
            //     return false;
            // }

            var userEmail = this.email;
            var userPassword = this.password;
            /**
             * Отправляет запрос к контр. Account - Action Login.
             * Вид объекта:
             * obj = {
             *     userEmail
             *     userPassword,
             *     rememberUser
             * }
             * 
             * */


            var tokenKey = "accessToken";
            var loginData = {
                grant_type: 'password',
                Email: this.email,
                Password: this.password
            };
            console.log(loginData)
            var self = this;
            axios({
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                url: "https://localhost:44302/api/token",
                data: JSON.stringify(loginData)
            })
            .then((response) => {
            // Ответ был получен
            if (response.status === 200) {
                console.log(response)
                var payload = {
                    email: response.data.Username,
                    accessToken: response.data.AccessToken,
                    refreshToken: response.data.RefreshToken,
                    expiredIn: response.data.ExpiredIn,
                    Id: response.data.Id
                };
                this.$store.dispatch('registerUser', payload);
                this.$router.push('/catalog');
                // console.log(response)
            } else {
                self.authMessage = response.data.message;
            }
                // .then(() =>{
                //     this.$router.push('/catalog')
                // })
            }).catch((error) => {
                console.log(error);
            })
            //если ошибка, связянная с проблемой пароля/почты
            // var payload = {
            //     email: userEmail,
            //     access_token: 'hello'
            // };

            // this.$store.dispatch('registerUser', payload)
            //  .then(() => {
            //     this.$router.push('/catalog')
            // });
        },
        checkForm: function (event) {
            this.errorsEmail = [];
            this.passwordError = [];

            if (this.password.length < 6) {
                this.passwordError.push('Указанный пароль меньше 6-ти символов');
            }

            if (!this.email) {
                this.errorsEmail.push('Укажите свою почту');
            } else if (!this.validEmail(this.email)) {
                this.errorsEmail.push('Указанная почта не соотвествует нормам');
            }

            if (!this.errorsEmail.length && !this.passwordError.length) {
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
}
.message {
    margin: 10px 0 25px 0;
    font-size: 30px;
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
.facts-text {
    font-size: 28px;
    font-weight: bold;
    background: black;
    color: white;
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
.section-input .custom-field {
    border-radius: 15px;
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
@media screen and (max-width: 400px) {
    .form-input {
       width: 90%;
       border-radius: 15px;
    }
}
</style>

