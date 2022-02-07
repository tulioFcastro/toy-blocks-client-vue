import { mutations } from '../../src/store/mutations'
import initialState from '../../src/store/initialState';

describe('Store Mutations', () => {
  const { 
    checkNodeStatusStart, 
    checkNodeStatusSuccess, 
    checkNodeStatusFailure,
    setLoadingBlock,
    loadBlockSuccess,
    loadBlockFailure,
    } = mutations; 

  let initState;

  beforeEach(() => {
    initState = initialState();
  });

  it('checkNodeStatusStart', () => {
      checkNodeStatusStart(initState, { url: initState.nodes.list[0].url });
      expect(initState.nodes.list[0].loading).toEqual(true);
  });

  it('checkNodeStatusSuccess', () => {
    const params = {
      el: {
        url: initState.nodes.list[0].url 
      },
      name: 'Thawing Springs'
    };

    checkNodeStatusSuccess(initState, params);
    expect(initState.nodes.list[0].name).toEqual(params.name);
  });

  it('checkNodeStatusFailure', () => {
    checkNodeStatusFailure(initState, { url: initState.nodes.list[0].url });
    expect(initState.nodes.list[0].loading).toEqual(false);
    expect(initState.nodes.list[0].online).toEqual(false);
  });

  it('setLoadingBlock', () => {
    expect(initState.nodes.list[0].loadingBlock).toBeFalsy();
    setLoadingBlock(initState, { url: initState.nodes.list[0].url, value: true });
    expect(initState.nodes.list[0].loadingBlock).toBeTruthy();
    setLoadingBlock(initState, { url: initState.nodes.list[0].url, value: false });
    expect(initState.nodes.list[0].loadingBlock).toBeFalsy();
  });

  it('loadBlockSuccess', () => {
    expect(initState.nodes.list[0].blocks).toBeUndefined();
    loadBlockSuccess(initState, { url: initState.nodes.list[0].url, value: [{ id: 1 }] });
    expect(initState.nodes.list[0].blocks).toEqual([{ id: 1 }]);
  });

  it('loadBlockFailure', () => {
    initState.nodes.list[0].blocks = [{ id: 1 }];
    initState.nodes.list[0].blocksServerOnline = true;
    expect(initState.nodes.list[0].blocks).toBeDefined();
    expect(initState.nodes.list[0].blocksServerOnline).toBeTruthy();
    loadBlockFailure(initState, { url: initState.nodes.list[0].url });
    expect(initState.nodes.list[0].blocks).toBeUndefined();
    expect(initState.nodes.list[0].blocksServerOnline).toBeFalsy();
  });
});