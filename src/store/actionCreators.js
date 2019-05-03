import * as constants from './actionTypes'
import store from './../store'

export const getShopData = (shopList) => {
    return (dispatch) => {
       store.dispatch({
            type: constants.INIT_SHOP,
            shopList: shopList
        });
    }
}


export const updateShopData = (shop) => {

    return (dispatch) => {
        store.dispatch({
            type: constants.UPDATE_SHOP,
            shop: shop
        });
    }

};
