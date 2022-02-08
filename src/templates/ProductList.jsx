import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {ProductCard} from '../components/Products';
import {fetchProducts} from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';

const ProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const products = getProducts(selector);

    const query = selector.router.location.search;
    //queryをtest()で検証して先頭が「?gender」であれば〇〇、そうでなければ△△
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

    useEffect(() => {
        dispatch(fetchProducts(gender, category))
        //query変更する度に実行する
    }, [query]);

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {products.length > 0 && (
                    products.map(product => (
                        <ProductCard key={product.id} id={product.id} name={product.name}
                        images={product.images} price={product.price}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default ProductList;