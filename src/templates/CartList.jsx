import React, {useCallback} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import List from "@material-ui/core/List";
import {getProductsInCart} from '../reducks/users/selectors';
import {CartListItem} from '../components/Products';
import { PrimaryButton, GreyButton } from '../components/UIkit';
import {push} from 'connected-react-router';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '0 auto',
      maxWidth: 512,
      width: '100%'
    }
  }));

const CartList = () => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const productsInCart = getProductsInCart(selector);
    const dispatch = useDispatch();

    //useCallback: 子のprops（goToOrder）の処理に変更がある度に再レンダリングされるのを防ぐ。goToOrderの処理の変更時だけ子の再レンダリング起こるように制御
    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    }, []);

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    }, []);

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                ショッピングカート
            </h2>
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
                )}
            </List>
            <div className="module-spcer--medium" />
            <div className="p-grid__column">
                <PrimaryButton label={"レジへ進む"}  onClick={goToOrder} />
                <div className="module-spacer--extra-extra-small" />
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    )
}

export default CartList;