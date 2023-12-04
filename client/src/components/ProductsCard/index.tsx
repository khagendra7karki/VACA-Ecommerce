import { useNavigate } from 'react-router-dom';

import './productStyle.scss';
import RatingStars from '../reviews/RatingStars';
import Reactangle from '../Rectangle';

interface Product {
    _id: string,
    title: string,
    images: string[],
    oldPrice: number,
    price: number,
    rating : number,
};

const calculateDiscout = ( actual : number , discounted : number ) => {
    return  (( actual - discounted) * 100 / actual).toFixed(0) 

}

export function ProductsCard( {product} : { product: Product} ){
    const navigate = useNavigate();

    return <>
    <div className = 'products-card'
        onClick = { (e) => { navigate(`/product/${product._id}`)}}>
        <div className = 'image-wraper'>
            <img  src ={product.images[0]}/>
            {
                (product.oldPrice != product.price) 
                && 
                <Reactangle width = '55px'
                        height = '30px' 
                        sx = {{display: 'flex',borderRadius: '6px', justifyContent: 'center', alignItems: 'center', color: 'white', position: 'absolute', top: '20px', left: '30px'}}>
                    {`${calculateDiscout( product.oldPrice, product.price )}%`}
                </Reactangle>
            }
        </div>
        <div className = 'text-wraper'>
            <h3 className = 'title' >{product.title}</h3>
            <div className="price-wraper">
                <p className = 'price'>{`Rs. ${String(product.price)}` }</p>
                { ( product.price != product.oldPrice)
                    &&
                    <p className = 'oldPrice'>{`Rs. ${String(product.oldPrice)}`}</p>}
            </div>
            {/* <RatingStars rating = {product.rating || 0} /> */}
        </div>
    </div>
    </>
}