import { Carousel } from '@mantine/carousel';
import { ProductsCard } from '../ProductsCard';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, actionCreators } from '../../state';
import { useEffect } from 'react';
import { Container } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

interface Iprops{
  page?: number
}

interface Product {
    _id: string,  
    title: string,
    image: string[],
    oldPrice?: number,
    price: number,
    rating: number
  };
  
  
function CardCarousel({page = 1 }: Iprops) {
    const dispatch = useDispatch();
    const { getProducts } = bindActionCreators(actionCreators, dispatch);
    const { products } = useSelector(
        (state: State) => state.products
      
      );
  useEffect(() => {
    getProducts(page);
    
  }, [dispatch]);


  
    const cards =
    products ? (
    products.map((product : Product ) => (
      <Carousel.Slide >
        <Container style={{ margin: '20px 0',height:'640px', display:'flex', }}>
          <ProductsCard product = { product } key = { uuidv4()}/>
        </Container>
      </Carousel.Slide>
       )))
    :<></>
      
 
  return (
   
    <Carousel
      withIndicators
      height={700}
      slideSize="25%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={4}
    >
       
        {cards}
   
    </Carousel>
  );
}

export default  CardCarousel