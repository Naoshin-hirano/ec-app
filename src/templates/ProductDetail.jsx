import React, {useEffect, useState, useCallback} from 'react';
import {makeStyles} from "@material-ui/styles";
import {useSelector, useDispatch} from "react-redux";
import {db, FirebaseTimestamp} from "../firebase";
import HTMLReactParser from "html-react-parser";
import {SizeTable, ImageSwiper } from "../components/Products";
import {getUserId} from "../reducks/users/selectors";
import {addProductToCart, addProductToFavorite} from '../reducks/users/operations'
import {toggleSizeFavorite} from '../reducks/products/operations'

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        },
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    },
    price: {
        fontSize: 36
    }
}))

const ProductDetail = () => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    const uid = getUserId(selector);
    const path = selector.router.location.pathname
    const id = path.split('/product/')[1]

    const [product, setProduct] = useState(null);
    const [sizeArr, setSizeArr] = useState([]);

    const returnCodeToBr = (text) => {
        if (text === "") {
            return text
        } else {
            return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
        }
    };

    const dispatch = useDispatch();

    //[]のproductに変更がない限り中の処理を再生成しない。
    //addProductの処理意外の変更でSizeTableを再レンダリングしない
    const addProduct = useCallback((selectedSize) => {
        const timstamp = FirebaseTimestamp.now();
        dispatch(addProductToCart({
            added_at: timstamp,
            description: product.description,
            gender: product.gender,
            images: product.images,
            name: product.name,
            price: product.price,
            productId: product.id,
            quantity: 1,
            size: selectedSize
        }))

    }, [product]);


    //お気に入りを登録
    //[]をproductにするとproduct意外で再再レンダリングされなくなるので、sizeArrを変更しても表示が変化しなくなる
    // ? setSizeArr のみだとエラー出るのはなぜ
    const addFavorite = useCallback((selectedSize, index) => {
        const timstamp = FirebaseTimestamp.now();
        dispatch(addProductToFavorite({
            added_at: timstamp,
            description: product.description,
            gender: product.gender,
            images: product.images,
            name: product.name,
            price: product.price,
            productId: product.id,
            size: selectedSize
        }));
        sizeArr[index].fav = true;
        setSizeArr(sizeArr)

        dispatch(toggleSizeFavorite(product.id, index));
    }, [sizeArr]);


    //お気に入りを削除
    const deleteFavorite = useCallback( async (index, favId) => {
       await db.collection('users').doc(uid).collection('favorite').doc(favId).delete()
       sizeArr[index].fav = false;
       setSizeArr(sizeArr)
       dispatch(toggleSizeFavorite(product.id, index))
    }, [sizeArr]);

    useEffect(() => {
        db.collection('products').doc(id).get().then(doc => {
            const data = doc.data()
            //この画面の商品をセット
            setProduct(data)
            //この画面の商品のサイズ情報をセット
            setSizeArr([...data.sizes])
        })
    },[])


    return (
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>¥{(product.price).toLocaleString()}</p>
                        <div className="module-spacer--small"/>
                        <SizeTable
                        id={id}
                        deleteFavorite={deleteFavorite}
                        addProduct={addProduct} 
                        addFavorite={addFavorite}
                        sizes={product.sizes} />
                        <div className="module-spacer--small"/>
                        <p>{returnCodeToBr(product.description)}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetail;