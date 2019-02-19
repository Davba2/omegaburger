import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            email: 'youremail@mail.ru',
            logged: false,
            accessToken: null,
            refreshToken: null,
            expired: null,
            phone: 'fdsf',
            location: 'ул. Ленинская д.23 кв. 2'
        },
        commnets: [],
        burgerArray: [
            {
                id: 1,
                title: 'Бургер с сыром',
                price: 1.5,
                desc: 'Блаженная булочка наполнена котлеткой и облита сыром',
                url: 'http://www.pngmart.com/files/5/Hamburger-PNG-Photos.png',
                nutritional: {
                    protein: 4,
                    carbo: 22,
                    fat: 10,
                    calc: 300
                }
            },
            {
                id: 2,
                title: 'Двойной бурегр с сыром',
                price: 2.1,
                desc: 'Та же булочка с сыром, но с двойном удовольствием',
                url: 'http://pluspng.com/img-png/burger-png-burger-free-download-png-png-image-2126.png',
                nutritional: {
                    protein: 4,
                    carbo: 22,
                    fat: 10,
                    calc: 300
                }
            },
            {
                id: 3,
                title: 'Бургер с двойной котлетой',
                price: 1.75,
                desc: 'Когда 2 котлеты, понимаешь, что такое белок',
                url: 'https://banner2.kisspng.com/20180324/osq/kisspng-hamburger-bacon-sushi-pizza-cheeseburger-burger-king-5ab6e5746c0b92.1832730815219357324426.jpg',
                nutritional: {
                    protein: 4,
                    carbo: 22,
                    fat: 10,
                    calc: 300
                }
            }
        ],
        drinkArray: [
            {
                id: 1,
                title: 'Бургер с сыром',
                price: 1.5,
                desc: 'Блаженная булочка наполнена котлеткой и облита сыром'
            },
            {
                id: 2,
                title: 'Двойной бурегр с сыром',
                price: 2.1,
                desc: 'Та же булочка с сыром, но с двойном удовольствием'
            },
            {
                id: 3,
                title: 'Бургер с двойной котлетой',
                price: 1.75,
                desc: 'Когда 2 котлеты, понимаешь, что такое белок'
            }
        ],
        userOrder: [],
        counterData: {
            burger: {
                first: 0,
                second: 0,
                url: 'https://image.flaticon.com/icons/svg/1046/1046784.svg'
            },
            sweat: {
                first: 0,
                second: 0,
                url: 'https://image.flaticon.com/icons/png/512/1365/1365576.png'
            },
            drinks: {
                first: 0,
                second: 0,
                url: 'https://image.flaticon.com/icons/svg/1365/1365596.svg'
            },
            dishes: {
                first: 0,
                second: 0,
                url: 'https://image.flaticon.com/icons/svg/1408/1408052.svg'
            }
        },
        orderHistory: []
    },
    mutations: {
        setUser (state, payload) {
            state.user.email = payload.email;
            state.user.logged = true;
            state.user.accessToken = payload.accessToken;
            state.user.refreshToken = payload.refreshToken;
            state.user.expired = payload.accessJwt.ValidTo;
        },
        ToOrder (state, payload) {
            state.userOrder.push(payload)
        },
        addPhone (state, payload) {
            state.user.phone = payload;
        },
        addLocation (state, payload) {
            state.user.location = payload;
        },
        removeItem (state, payload) {
            let index = state.userOrder.map(function (item){
                return item.element;
            }).indexOf(payload);
            state.userOrder.splice(index, 1);
            console.log('Удален из заказа');
        },
        updateCounter (state, payload) {
            console.log(payload)
            var obj = state.counterData[payload];
            if (obj.first === 9 && obj.second === 9) {
                return;
                //вывести, что отображаемый диапозон превышен.
                //либо отключить кнопку
            }

            if (obj.second === 9) {
                obj.first++;
                obj.second = 0;
            } else {
                obj.second++;
            }
            console.log(state.counterData)
        },
        decriseCounter (state, payload) {
            var obj = state.counterData[payload];

            if (obj.second === 0 && obj.first === 0) {
                return;
            } else if (obj.first > 0 && obj.second === 0 ) {
                obj.first--;
            } else {
                obj.second--;
            }

        },
        loadHistory (state, payload) {
            state.orderHistory.push(payload);
        }
    },
    actions: {
        registerUser({ commit }, payload) {
            commit('setUser', payload);
        },
        addPhone ({commit}, payload) {
            commit('addPhone', payload);
        },
        addLocation ({commit}, payload) {
            commit('addLocation', payload);
        },
        addToOrder ({commit}, payload) {
            console.log(payload)
            commit('ToOrder', (payload));
        },
        removeFromOrder ({commit}, payload) {
            commit('removeItem', payload);
        },
        updateCounter ({commit}, payload) {
            commit('updateCounter', payload);
        },
        decriseCounter ({commit}, payload) {
            commit('decriseCounter', payload)
        },
        loadHistory ({commit}, payload) {
            commit('loadHistory', payload);
        }

    },
    getters: {
        getOrderHistory (state) {
            return state.orderHistory;
        },
        getPrice (state) {
            return state.userOrder.map(function (element) {
                return element.price
            }).reduce(function (acc, current) {
                return acc + current
            }, 0);
        },
        getCounterData (state) {
            return state.counterData;
        },
        getUserInfo (state) {
            return state.user;
        },
        checkRefreshTokens (state) {
            if (Date.now() > state.user.expired) {
                //return true
                return true;
            }

            return false;
        },
        getToken (state) {
            return state.user.token;
        },
        getEmail(state) {
            return state.user.email;
        },
        getDrinks (state) {
            return state.drinkArray;
        },
        isUserLogin (state) {
            if (state.token !== null && state.user.logged)
            {
                return true;
            }

            return false;
        },
        getBurgers (state) {
            return state.burgerArray;
        },
        getOrder (state) {
            return state.userOrder;
        },
        getItem (state) {
            return id => state.burgerArray.filter(function (element) {
                return element.id === id;
        });
        }
    }
})