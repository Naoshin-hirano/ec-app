import React from 'react'
import {getUserId, getUserName} from "../reducks/users/selectors";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from '../reducks/users/operations';

const Home = () => {
    const dispatch = useDispatch()
    //useSelectorでreact全体のstateを"state"という変数で受け取る
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const username = getUserName(selector);

    return(
        <div>
            <h2>Home</h2>
            <p>ユーザーID: {uid}</p>
            <p>ユーザー名: {username}</p>
            <button onClick={() => dispatch(signOut())} >SIGN OUT</button>
        </div>
    )
}

export default Home