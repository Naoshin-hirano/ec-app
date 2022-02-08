import {db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';
import {fetchProductsAction, deleteProductAction } from "./actions";

const productsRef = db.collection('products')

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
          .then(() => {
              //getState: 現在のstateを取得できる
              const prevProducts = getState().products.list;
              const nextProducts = prevProducts.filter(product => product.id !== id)
              dispatch(deleteProductAction(nextProducts))
          })
    }
}

export const fetchProducts = (gender, category) => {
    return async (dispatch) => {
        let query = productsRef.orderBy('updated_at', 'desc');
        //productsの'gender'というフィールドに今回の引数gender(メンズでクリックしたならメンズ)が合致するものを抽出
        query = (gender !== "") ? query.where('gender', '==', gender) : query;
        query = (category !== "") ? query.where('category', '==', category) : query;

        query.get()
            .then(snapshots => {
                const productList = []
                snapshots.forEach(snapshot => {
                    const product = snapshot.data();
                    productList.push(product)
                })
                dispatch(fetchProductsAction(productList))
            })
    }
}

export const orderProduct = (productsInCart, price) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid);
        const timestamp = FirebaseTimestamp.now();

        let products = [];
        let soldOutProducts = [];
        
        const batch = db.batch();

        for(const product of productsInCart){
            const snapshot = await productsRef.doc(product.productId).get();
            const sizes = snapshot.data().sizes;

            //size.size: firestoreのproductsにあるsizesをループさせたsize (在庫)
            //product.size: firestoreのusersにあるcartの中身 (カートに入れた中身)
            const updatedSizes = sizes.map(size => {
                if(size.size === product.size){
                    if(size.quantity === 0){
                        soldOutProducts.push(product.name);
                        return size
                    }
                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    return size
                }
            });

            //注文履歴の商品内容
            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            });

            //在庫のsizeとquantityを更新
            batch.update(
                productsRef.doc(product.productId),
                {sizes: updatedSizes}
            )

            //カートにある商品を削除
            batch.delete(
                userRef.collection('cart').doc(product.cartId)
            )
        }

        if(soldOutProducts.length > 0){
            const errorMessage = (soldOutProducts.length > 1) ?
                                 soldOutProducts.join('と') :
                                 soldOutProducts[0];
            alert('大変申し訳ございません。' + errorMessage + 'が在庫切れとなったため、注文処理を中断しました。' )
            return false
        }else{
            //注文処理が成功したあとの処理
            batch.commit()
                 .then(() => {
                     //注文履歴のdocument
                     const orderRef = userRef.collection('orders').doc();
                     //toDate(): 'YYYY-MM-DD' のようなDATE型へ変換
                     const date = timestamp.toDate();
                     //fromDate: timestamp型に変換
                     const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

                     const history = {
                         price: price,
                         created_at: timestamp,
                         id: orderRef.id,
                         products: products,
                         shipping_date: shippingDate,
                         updated_at: timestamp
                     }

                     orderRef.set(history);
                     dispatch(push('/order/complete'));

                 }).catch(() => {
                     alert('注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。')
                 })
        }
    }
}

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: price,
            images: images,
            updated_at: timestamp,
            sizes: sizes
        }

        //新規追加の時のみの条件分岐
        if(id === ""){
            //?
            const ref = productsRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp;
        }

        //setだけだと全部入れ替えるので、{merge: true}で変更点だけ更新する
        return productsRef.doc(id).set(data, {merge: true})
          .then(() => {
              dispatch(push('/'))
          }).catch((error) => {
              throw new Error(error)
          })
    }
}