import Vue from 'vue'
import Vuex from 'vuex'
import initialState from './initialState'
import { mutations } from './mutations';
import { actions } from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...initialState()
  },
  getters: {
    getNodes : state => {
      return state.nodes.list;
    },
    getNodeByUrl: state => url => state.nodes.list.find(node => node.url == url),
  },
  mutations: mutations,
  actions: actions,
})
