import { Carousel } from '@mantine/carousel';
import { ProductsCard } from '../../components/ProductsCard';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, actionCreators } from '../../state';
import { useEffect } from 'react';

interface Product {
    _id: string,  
    title: string,
    image: string[],
    oldPrice?: Number,
    price: Number,
  };
  
function Cardslide2() {
    const dispatch = useDispatch();
    const { getProducts } = bindActionCreators(actionCreators, dispatch);
    const { products, error, loading } = useSelector(
        (state: State) => state.products
      
      );
  useEffect(() => {
    getProducts();
    
  }, [dispatch]);


  const cards =
  (Object.keys(products).includes("payload") )? (
  products.payload.map((product : Product ) => (
    <Carousel.Slide>
    <ProductsCard product = { product } key = { Number( product._id )}/>
    </Carousel.Slide>
     )))
    : (
      <>hello world</>
    )
 
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
    >
        {cards}
      {/* <Carousel.Slide>1</Carousel.Slide>
       <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide> */}
   
    </Carousel>
  );
}

export default  Cardslide2