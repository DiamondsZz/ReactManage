import * as constants from './actionTypes'
import store from './../store'
import {getShopList, deleteShop,updateShop} from "../node";

export const getShopData = () => {
    return (dispatch) => {
        getShopList().then((res) => {
            //console.log("ShopList:", res);
            if (res.success_code === 200) {
                store.dispatch({
                    type: constants.INIT_SHOP,
                    shopList: res.message
                });
            }

        })
    }
}


export const updateShopData = (shop) => {

    return (dispatch) => {
        //console.log(shop);
        updateShop(shop).then((res)=>{

            if(res.success_code===200)
            {
                store.dispatch({
                    type: constants.UPDATE_SHOP,
                    shopList: res.message
                });
            }
        })

    }

};


export const deleteShopData = (shop) => {
    return (dispatch) => {
        console.log(shop);
        deleteShop(shop).then((res) => {
            console.log(res);
            if (res.success_code === 200) {
                store.dispatch({
                    type: constants.DELETE_SHOP,
                    shopList:res.message
                });
            }

        }).catch((e)=>{
            console.log(e);
        })
    }
}