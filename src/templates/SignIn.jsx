import React, {useCallback, useState} from 'react';
import {push} from "connected-react-router";
import {TextInput, PrimaryButton} from "../components/UIkit";
import {signIn} from '../reducks/users/operations';
import {useDispatch} from "react-redux";

const SignIn = () => {
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword]);

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">サインイン</h2>
            <div className="module-spacer--medium"/>
            <TextInput
            fullWidth={true} label={"Email"} multiline={false} required={true}
            rows={1} value={email} type="email" onChange={inputEmail}
            />
            <TextInput
            fullWidth={true} label={"パスワード"} multiline={false} required={true}
            rows={1} value={password} type="password" onChange={inputPassword}
            />
            <div className="module-spacer--medium"></div>
            <div className="center">
              <PrimaryButton
              label={"アカウントをサインインする"}
              onClick={() => dispatch(signIn(email, password))}
              />
              <div className="module-spacer--medium"></div>
              <p onClick={() => dispatch(push('/signup'))}>アカウント登録をお持ちでない方はこちら</p>
              <p onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
            </div>
        </div>
    )
}

export default SignIn;