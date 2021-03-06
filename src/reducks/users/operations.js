//opereationsâ†’acitions

import {signInAction, signOutAction, fetchProductsInCartAction, fetchFavoriteProductsAction, fetchOrdersHistoryAction} from "./actions";
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index';

export const addProductToFavorite = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const favRef = db.collection('users').doc(uid).collection('favorite').doc();
        addedProduct['favoriteId'] = favRef.id;
        await favRef.set(addedProduct);
        dispatch(push(`/product/${addedProduct.productId}`))
    }
}

export const addProductToCart = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const cartRef = db.collection('users').doc(uid).collection('cart').doc();
        addedProduct['cartId'] = cartRef.id;
        await cartRef.set(addedProduct);
        dispatch(push('/'))
    }
}

export const fetchOrdersHistory = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const list = [];

        db.collection('users').doc(uid)
          .collection('orders')
          .orderBy('updated_at', 'desc')
          .get()
          .then((snapshots) => {
              snapshots.forEach(snapshot => {
                  const data = snapshot.data()
                  list.push(data)
              })

              dispatch(fetchOrdersHistoryAction(list))
          })
    }
}

export const fetchFavoriteProducts = (products) => {
    return async (dispatch) => {
        dispatch(fetchFavoriteProductsAction(products));
    }
}

export const fetchProductsInCart = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInCartAction(products));
    }
}

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged( user => {
            if (user) {
                const uid = user.uid

                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }))

                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validation
        if(username === "" || email === "" || password === "" || confirmPassword === ""){
            alert("ĺż…é ?é …ç›®ă?Śč¦‹ĺ…ĄĺŠ›ă?§ă?™")
            return false
        }

        if(password !== confirmPassword){
            alert("ă?‘ă‚ąă?Żă?Ľă?‰ă?Śä¸€č‡´ă?—ă?ľă?›ă‚“ă€‚ă‚‚ă?†ä¸€ĺş¦ă?”ç˘şčŞŤă‚’ă?Šéˇ?ă?„ă?—ă?ľă?™ă€‚")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
               .then(result => {
                   const user = result.user
                   if(user){
                       const uid = user.uid
                       const timestamp = FirebaseTimestamp.now()
                       
                       const userInitialData = {
                           created_at: timestamp,
                           email: email,
                           role: "customer",
                           uid: uid,
                           updated_at: timestamp,
                           username: username
                       }

                       db.collection('users').doc(uid).set(userInitialData)
                          .then(() => {
                              dispatch(push('/'))
                          })
                   }
               })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if(email === ""){
            alert("ĺż…é ?é …ç›®ă?Śč¦‹ĺ…ĄĺŠ›ă?§ă?™")
            return false
        }else{
            auth.sendPasswordResetEmail(email)
               .then(() => {
                   alert("ĺ…ĄĺŠ›ă?•ă‚Śă?źă‚˘ă?‰ă?¬ă‚ąă?«ă?‘ă‚ąă?Żă?Ľă?‰ă?Şă‚»ă??ă??ç”¨ă?®ă?ˇă?Ľă?«ă‚’é€?ă‚Šă?ľă?—ă?źă€‚")
                   dispatch(push("/signin"))
               }).catch(() => {
                   alert("ă?‘ă‚ąă?Żă?Ľă?‰ă?Şă‚»ă??ă??ă?«ĺ¤±ć•—ă?—ă?ľă?—ă?źă€‚é€šäżˇç’°ĺ˘?ă‚’ç˘şčŞŤă?—ă?¦ă?Źă? ă?•ă?„ă€‚")
               })
        }
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        // Validation
        if(email === "" || password === ""){
            alert("ĺż…é ?é …ç›®ă?Śč¦‹ĺ…ĄĺŠ›ă?§ă?™")
            return false
        }

        auth.signInWithEmailAndPassword(email, password)
               .then(result => {
                   const user = result.user
                   if(user){
                       const uid = user.uid

                       db.collection('users').doc(uid).get()
                          .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))

                            dispatch(push('/'))
                          })
                   }
               })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
          .then(() => {
            dispatch(signOutAction());
            dispatch(push('/signin'))
          })
    }
}