import React from 'react'
import { Route, Switch } from 'react-router';
//import { Home } from './Home'と１つ１つimportするのをtemplatesのindex.jsにまとめて書くことで防ぐ 
import { ProductList, SignUp, SignIn, Reset, ProductEdit, ProductDetail } from './templates';
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin/reset" component={Reset} />
            
            <Auth>
                <Route exact path="/product/:id" component={ProductDetail} />
                <Route exact path="/" component={ProductList} />
                <Route path="/product/edit(/:id)?" component={ProductEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;