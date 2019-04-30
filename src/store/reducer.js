import {INIT_SHOP,UPDATE_SHOP} from "./actionTypes";

const defaultState={
    shopList:[],
    showModalVisible: false,
    selectedShop: {},
    updateModalVisible: false,
    updatedShop: {
        shopName: '',
        shopPrice: 0,
        shopIntroduce: ''
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
         newState.shopList.forEach((shop,index)=>{
             if(shop.shopId===action.shop.oldShop.shopId)
             {
                 newState.shopList[index]=Object.assign(newState.shopList[index], action.shop.newShop);
             }
        });
        return newState
    }
    return state;
}