export const mutations = {
  checkNodeStatusStart(state, { url }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
    if (index >= 0) {
      list = [
        ...state.nodes.list.slice(0, index),
        {
          ...state.nodes.list[index],
          loading: true
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
  checkNodeStatusSuccess(state, { el : { url }, name }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
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
  checkNodeStatusFailure(state, { url }) {
    let list = state.nodes.list;
    const index = state.nodes.list.findIndex(t => t.url === url);
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

	// BLOCKS
	setLoadingBlock(state, { url, value }) {
		const index = state.nodes.list.findIndex((t) => t.url === url);
		if (index >= 0) {
			state.nodes.list[index].blocksServerOnline = value;
		}
	},
	loadBlockSuccess(state, { url, value }) {
		const index = state.nodes.list.findIndex((t) => t.url === url);
		if (index >= 0) {
			state.nodes.list[index].blocks = value;
			state.nodes.list[index].blocksServerOnline = true;
		}
	},
	loadBlockFailure(state, { url, value }) {
		const index = state.nodes.list.findIndex((t) => t.url === url);
		if (index >= 0) {
			state.nodes.list[index].blocks = value;
		}
	},
}