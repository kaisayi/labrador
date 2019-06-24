import variables from '@/styles/element-variables.scss'

const state = {
  theme: variables.theme,
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  sidebarLogo: false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

const settings = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default settings
