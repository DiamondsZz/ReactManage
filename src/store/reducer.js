import {INIT_SHOP,UPDATE_SHOP,DELETE_SHOP} from "./actionTypes";

const defaultState={
    shopList:[],
};

export default (state=defaultState, action) => {
    if(action.type===INIT_SHOP)
    {
        const newState =JSON.parse(JSON.stringify(state));
          newState.shopList=action.shopList;
        return newState;
    }
    if(action.type===UPDATE_SHOP)
    {
        let newState =JSON.parse(JSON.stringify(state));
        newState.shopList=action.shopList;
        return newState
    }
    if(action.type===DELETE_SHOP)
    {
        const newState =JSON.parse(JSON.stringify(state));
        newState.shopList=action.shopList;
        return newState;
    }
    return state;
}