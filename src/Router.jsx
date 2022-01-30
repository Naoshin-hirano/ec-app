import React from 'react'
import { Route, Switch } from 'react-router';
//import { Home } from './Home'と１つ１つimportするのをtemplatesのindex.jsにまとめて書くことで防ぐ 
import { Home, SignUp, SignIn, Reset } from './templates';
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin/reset" component={Reset} />
            
            <Auth>
                <Route exact path="/" component={Home} />
            </Auth>
        </Switch>
    );
};

export default Router;