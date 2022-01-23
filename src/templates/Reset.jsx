import React, {useCallback, useState} from 'react';
import {push} from 'connected-react-router';
import {TextInput, PrimaryButton} from "../components/UIkit";
import {resetPassword} from '../reducks/users/operations';
import {useDispatch} from "react-redux";

const Reset = () => {
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState("")

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードをリセット</h2>
            <div className="module-spacer--medium"/>
            <TextInput
            fullWidth={true} label={"Email"} multiline={false} required={true}
            rows={1} value={email} type="email" onChange={inputEmail}
            />
            <div className="module-spacer--medium"></div>
            <div className="center">
              <PrimaryButton
              label={"Reset Password"}
              onClick={() => dispatch(resetPassword(email))}
              />
              <div className="module-spacer--medium"></div>
              <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
            </div>
        </div>
    )
}

export default Reset;