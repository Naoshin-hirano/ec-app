import React from 'react'
import {getUserId, getUserName} from "../reducks/users/selectors";
import {useSelector} from "react-redux";

const Home = () => {
    //useSelectorでreact全体のstateを受け取る
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const username = getUserName(selector);

    return(
        <div>
            <h2>Home</h2>
            <p>ユーザーID: {uid}</p>
            <p>ユーザー名: {username}</p>
        </div>
    )
}

export default Home