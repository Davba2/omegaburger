import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            email: null,
            logged: false
        },
        commnets: []
    },
    mutations: {
        setUser (state, payload) {
            state.user.email = payload;
            state.user.logged = true;
        }
    },
    actions: {
        registerUser ({commit}, payload) {
            commit('setUser', payload);
        }
    },
    getters: {
        isUserLogin (state) {
            return state.user.logged;
        }
    }
})