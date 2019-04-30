import * as constants from './actionTypes'


export const getShopData=(shopList)=> ({
    type:constants.INIT_SHOP,
    shopList:shopList
});

export const updateShopData=(shop)=> ({
    type:constants.UPDATE_SHOP,
    shop:shop
});
