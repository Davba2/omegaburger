import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {},
        commnets: []
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        registerUser ({commit}, payload) {
            commit('setUser', payload);
        }
    },
    getters: {
        isUserLogin (state) {
            return Object.keys(state.user).length === 0;
        }
    }
})