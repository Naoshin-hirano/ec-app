import React, { useEffect } from 'react';
import { useDispatch ,useSelector} from "react-redux";
import { listenAuthState } from './reducks/users/operations';
import {getIsSignedIn} from "./reducks/users/selectors";

const Auth = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);

    //Auth内のレンダリングが行われたあとに１回だけuseEffect内の処理が実行される
    useEffect( () => {
        if(!isSignedIn){
            dispatch(listenAuthState())
        }
    }, []);

    if(!isSignedIn){
        return <></>
    }else{
        return children
    }
}

export default Auth;