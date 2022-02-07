//selectors:storeで管理しているstateを参照するための関数
//state の中から自分が関心のあるツリー部分だけを抜き出してきて,抜き出してきたパラメータから必要な計算を行う

import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
    //stateの内、自分の関心のあるツリー
    [usersSelector],
    //そのツリーの中のパラメータの何を使いたいか
    state => state.isSignedIn
)

export const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders
)

export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
)

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)

export const getUserName = createSelector(
    [usersSelector],
    state => state.username
)