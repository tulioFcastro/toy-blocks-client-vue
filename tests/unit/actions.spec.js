import { actions } from '../../src/store/actions';

describe('Store Actions', () => {
	beforeAll(() => {
		global.fetch = jest.fn();
	});

	describe('#getAllNodes', () => {

		beforeEach(() => {
			fetch.mockResolvedValue({
				json: () =>
					Promise.resolve({
						el: { url: 'https://thawing-springs-53971.herokuapp.com' },
						node_name: 'Test Name',
					}),
			});
		});

		it('getAllNodes With Success', async () => {
			const commit = jest.fn();
			const block = {
				nodes: {
					list: [
						{
							url: 'https://thawing-springs-53971.herokuapp.com',
							online: false,
							name: 'Node 1',
							loading: false,
						},
					],
				},
			};
			const param = block.nodes.list;
			await actions.getAllNodes({ commit }, param);
			expect(commit).toHaveBeenCalledTimes(2);
			expect(commit).toHaveBeenCalledWith('checkNodeStatusStart', param[0]);
			expect(commit).toHaveBeenCalledWith('checkNodeStatusSuccess', {
				el: param[0],
				name: 'Test Name',
			});
		});

		it('getAllNodes With failure', async () => {
			const commit = jest.fn();
			fetch.mockImplementationOnce(() => Promise.reject());
			const block = {
				nodes: {
					list: [
						{
							url: 'http://localhost:3002',
							online: false,
							name: 'Node 4',
							loading: false,
						},
					],
				},
			};
			const param = block.nodes.list;
			await actions.getAllNodes({ commit }, param);
			expect(commit).toHaveBeenCalledTimes(2);
			expect(commit).toHaveBeenCalledWith('checkNodeStatusStart', param[0]);
			expect(commit).toHaveBeenCalledWith('checkNodeStatusFailure', param[0]);
		});
	});

	describe('#getBlocks', () => {
		const respone = {
			data: [
				{
					id: '5',
					type: 'blocks',
					attributes: {
						index: 1,
						timestamp: 1530679678,
						data: 'The Human Torch',
						'previous-hash': 'KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=',
						hash: 'oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=',
					},
				},
			],
		};
	
		beforeEach(() => {
			fetch.mockResolvedValue({
				json: () => Promise.resolve(respone),
			});
		});

		it('getBlocks With Success', async () => {
			const commit = jest.fn();
			const block = {
				nodes: {
					list: [
						{
							url: 'https://thawing-springs-53971.herokuapp.com',
							online: false,
							name: 'Node 1',
							loading: false,
							blocks: undefined,
							loadingBlock: false,
						},
					],
				},
			};
			const param = block.nodes.list;
			await actions.getBlocks({ commit }, param[0]);
			expect(commit).toHaveBeenCalledTimes(3);
			expect(commit).toHaveBeenCalledWith('setLoadingBlock', { url: param[0].url, value: true });
			expect(commit).toHaveBeenCalledWith('setLoadingBlock', { url: param[0].url, value: false });
			expect(commit).toHaveBeenCalledWith('loadBlockSuccess', {
				url: param[0].url,
				value: respone.data,
			});
		});

		it('getBlocks With failure', async () => {
			const commit = jest.fn();
			fetch.mockImplementationOnce(() => Promise.reject());
			const block = {
				nodes: {
					list: [
						{
							url: 'http://localhost:3002',
							online: false,
							name: 'Node 4',
							loading: false,
						},
					],
				},
			};
			const param = block.nodes.list;
			await actions.getBlocks({ commit }, param[0]);
			expect(commit).toHaveBeenCalledTimes(2);
			expect(commit).toHaveBeenCalledWith('setLoadingBlock', { url: param[0].url, value: true });
			expect(commit).toHaveBeenCalledWith('loadBlockFailure', param[0]);
		});
	});
});
