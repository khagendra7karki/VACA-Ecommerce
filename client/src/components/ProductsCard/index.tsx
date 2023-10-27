import { useNavigate } from 'react-router-dom';

import './style.css';

interface Product {
    _id: string,
    title: string,
    image: string[],
    oldPrice?: Number,
    price: Number,
};


export function ProductsCard( {product} : { product: Product} ){
    const navigate = useNavigate();

    return <>
    <div className = 'products-card'
        onClick = { (e) => { navigate(`/product/${product._id}`)}}>
        <div className = 'image-wraper'>
            <img  src ={product.image[0]}/>
        </div>
        <div className = 'text-wraper'>
            <p className = 'title' >{product.title}</p>
            <div className="price-wraper">
                <p className = 'price'>{`Rs. ${String(product.price)}` }</p>
                <p className = 'oldPrice'>{`Rs. ${String(product.oldPrice)}`}</p>
            </div>
        </div>
    </div>
    </>
}