import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const NASA_KEY = "bN3a1BYhIxkja97wnwLhubXIdcyy8RIka4ZNdfQI";

export default new Vuex.Store({
  state: {
    apod: {},
    currentUser: null,
    isLoading: false
  },
  mutations: {
    GET_APOD(state, apod) {state.apod = apod},
    OFF_LOADING(state){state.isLoading = false},
    ON_LOADING(state){ state.isLoading = true},
    UPDATE_CURRENT_USER(state, user) {state.currentUser = user},
  },
  actions: {
    getApod({commit}, date = null) {
      let queryDate = date ? date : new Date().toISOString().substr(0, 10)
      //ACTIVAR SPINNER
      commit("ON_LOADING")
      axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${queryDate}`)

      .then(resp => {
        commit('GET_APOD', resp.data)
      })
      .catch(() => {
        commit('GET_APOD', {url: `https://apod.nasa.gov/apod/image/2010/NGC5643_HubbleZamani_960.jpg`})
      })
      .finally(() => {
        //DESACTIVAR SPINNER
        commit("OFF_LOADING")
      })
    },
    updateCurrentUser({commit}, user) {
      commit('UPDATE_CURRENT_USER', user)
    },
  },
  modules: {
  }
})
