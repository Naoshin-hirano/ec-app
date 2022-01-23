import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
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