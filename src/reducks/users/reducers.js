import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.FETCH_ORDERS_HISTOY:
            return {
                ...state,
                orders: [...action.payload]
            }
        case Actions.FETCH_FAVORITE_PRODUCTS:
            return {
                ...state,
                favorits: [...action.payload]
            }
        case Actions.FETCH_PRODUCTS_IN_CART:
            //cartの配列の内容を更新する
            return {
                ...state,
                cart: [...action.payload]
            }
        case Actions.SIGN_IN:
            //...stateを...action.payloadへ上書き(...stateにあるけど...actions.payloadにない値があれば、...stateの値がそのままacitions.payloadに入る)
            return {
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return {
                ...action.payload
            };
        default:
            return state
    }
}