import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  state: {
    settings: {
      visitedViews: JSON.parse(localStorage.getItem('visitedViews')) || []
    }
  },
  mutations: {
    addVisitedViews(state, route) {
      const { visitedViews } = state.settings
      if (visitedViews.some(v => v.fullPath === route.fullPath)) {
        return
      }
      const idx = visitedViews.findIndex(v => v.name === route.name)
      if (idx > -1) {
        visitedViews[idx].fullPath = route.fullPath
      } else {
        visitedViews.unshift(route)
      }
      state.settings.visitedViews = visitedViews.slice(0, 5)
      localStorage.setItem('visitedViews', JSON.stringify(state.settings.visitedViews))
    },
    updateSettings(state, settings) {
      state.settings = { ...state.settings, ...settings }
      Object.keys(settings).forEach(key => {
        localStorage.setItem(key, JSON.stringify(settings[key]))
      })
    }
  },
  getters
})

export default store
