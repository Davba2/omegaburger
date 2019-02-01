import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            email: null,
            logged: false,
            token: null
        },
        commnets: [],
        burgerArray: [
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
        userOrder: []
    },
    mutations: {
        setUser (state, payload) {
            state.user.email = payload.email;
            state.user.logged = true;
            state.user.token = payload.access_token;
        },
        ToOrder (state, payload) {
            state.userOrder.push(payload)
        }
    },
    actions: {
        registerUser({ commit }, payload) {
            commit('setUser', payload);
        },
        addToOrder ({commit}, payload) {
            
            commit('ToOrder', (payload));
        }

    },
    getters: {
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