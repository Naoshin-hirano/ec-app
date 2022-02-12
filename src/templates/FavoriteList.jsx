import React, {useCallback} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import List from "@material-ui/core/List";
import {getFavoriteSize} from '../reducks/users/selectors';
import {FavListItem} from '../components/Products';
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

const FavoriteList = () => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const favoriteProducts = getFavoriteSize(selector);
    const dispatch = useDispatch();

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    }, []);

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                お気に入り商品
            </h2>
            <List className={classes.root}>
                {favoriteProducts.length > 0 && (
                    favoriteProducts.map(product => <FavListItem key={product.favoriteId} product={product} />)
                )}
            </List>
            <div className="module-spcer--medium" />
            <div className="p-grid__column">
                <PrimaryButton label={"レジへ進む"} />
                <div className="module-spacer--extra-extra-small" />
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    )
}

export default FavoriteList;