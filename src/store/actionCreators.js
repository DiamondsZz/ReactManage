import * as constants from './actionTypes'

export const getUserData=(user)=> ({
    type:constants.INIT_USER,
    user:user
});

export const getShopData=(shop)=> ({
    type:constants.INIT_SHOP,
    shop:shop
});

