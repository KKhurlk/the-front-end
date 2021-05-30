import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).username
    },
	adminMenus: []
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
	logout (state) {
	      state.user = []
	      window.sessionStorage.removeItem('user')
		  // window.localStorage.setItem('user', JSON.stringify({"name":"哈哈哈"}));
	},
	initAdminMenu (state, menus) {
	   state.adminMenus = menus
	}
  }
})