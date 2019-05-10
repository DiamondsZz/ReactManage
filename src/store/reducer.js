import {INIT_SHOP,UPDATE_SHOP,DELETE_SHOP,ADD_SHOP,INIT_USER} from "./actionTypes";

const defaultState={
    shopList:[],
    userList:[],
    user:{
        userName:'123',
        userPetName:'Diamondszz',
        userPwd:'123',
        userPermission:0
    }
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
    if(action.type===ADD_SHOP)
    {
        const newState =JSON.parse(JSON.stringify(state));
        newState.shopList=action.shopList;
        return newState;
    }

    if(action.type===INIT_USER)
    {
        const newState =JSON.parse(JSON.stringify(state));
        newState.userList=action.userList;
        return newState;
    }


    return state;
}