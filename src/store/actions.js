export const actions = {
  async getAllNodes({ commit }, nodeList) {
    for(const el of nodeList) {
      await commit('checkNodeStatusStart', el);
      
      try {
        const res = await fetch(`${el.url}/api/v1/status`);
        const response = await res.json();
        const params = {
          el,
          name: response.node_name
        };
        await commit('checkNodeStatusSuccess', params);
      }
      catch (e) {
        await commit('checkNodeStatusFailure', el);
      }
    }
  },
	async getBlocks({ commit }, node) {
		await commit('setLoadingBlock', { url: node.url, value: true });

		try {
			const res = await fetch(`${node.url}/api/v1/blocks`);
			const response = await res.json();

			await commit('setLoadingBlock', { url: node.url, value: false });
			await commit('loadBlockSuccess', { url: node.url, value: response.data });

			return response;
		} catch (e) {
			await commit('loadBlockFailure', { url: node.url, value: true });
		}




	},
};
