import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    nodes: {
      list: [
        {
          url: 'https://thawing-springs-53971.herokuapp.com',
          online: false,
          name: 'Node 1',
          loading: false
        },
        {
          url: 'https://secret-lowlands-62331.herokuapp.com',
          online: false,
          name: 'Node 2',
          loading: false
        },
        {
          url: 'https://calm-anchorage-82141.herokuapp.com',
          online: false,
          name: 'Node 3',
          loading: false
        },
        {
          url: 'http://localhost:3002',
          online: false,
          name: 'Node 4',
          loading: false
        }
      ]
    }
  },
  getters: {
    getNodes : state => {
      return state.nodes.list;
    }
  },
  mutations: {
    checkNodeStatusStart(state, { el }) {
      let list = state.nodes.list;
      const index = state.nodes.list.findIndex(t => t.url === el.url);
      if (index >= 0) {
        list = [
          ...state.nodes.list.slice(0, index),
          {
            ...state.nodes.list[index],
            loading: false
          },
          ...state.nodes.list.slice(index + 1)
        ];
      }
      state.nodes = {
        list: [
          ...list,
        ]
      }
    },
    checkNodeStatusSuccess(state, { el, name }) {
      let list = state.nodes.list;
      const index = state.nodes.list.findIndex(t => t.url === el.url);
      if (index >= 0) {
        list = [
          ...state.nodes.list.slice(0, index),
          {
            ...state.nodes.list[index],
            name: name,
            online: true,
            loading: false
          },
          ...state.nodes.list.slice(index + 1)
        ];
      }

      state.nodes = {
        list: [
          ...list,
        ]
      }
    },
    checkNodeStatusFailure(state, { el }) {
      let list = state.nodes.list;
      const index = state.nodes.list.findIndex(t => t.url === el.url);
      if (index >= 0) {
        list = [
          ...state.nodes.list.slice(0, index),
          {
            ...state.nodes.list[index],
            online: false,
            loading: false
          },
          ...state.nodes.list.slice(index + 1)
        ];
      }

      state.nodes = {
        list: [
          ...list,
        ]
      }
    },
  },
  actions: {
    statusStart({ commit }, el) {
      commit('checkNodeStatusStart', { el });
    },
    statusSucces({ commit }, params) {
      commit('checkNodeStatusSuccess', params);
    },
    statusError({ commit }, el) {
      commit('checkNodeStatusFailure', { el });
    },
    getAllNodes({ dispatch }, nodeList) {
      nodeList.forEach(el => {
        dispatch('statusStart', el);
        return fetch(`${el.url}/api/v1/status`)
            .then((res) => res.json())
            .then((response) => {
              const params = {
                el,
                name: response.node_name
              }
              dispatch('statusSucces', params);
            })
            .catch(() => dispatch('statusError', el));
      });
    },
  },
  modules: {
  }
})
