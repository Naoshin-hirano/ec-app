import {db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';

const productsRef = db.collection('products')

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