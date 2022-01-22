import {
    //reduxのstoreを作成
    createStore as reduxCreateStore,
    //分割したReducersをまとめてオブジェクトにまとめてreturnする→stateのデータ構造に合わせる
    combineReducers,
    //routerをreduxのstoreにmiddlewareとして導入する
    applyMiddleware
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from 'redux-thunk';

import { UsersReducer } from "../users/reducers";

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers( {
            router: connectRouter(history),
            users: UsersReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}