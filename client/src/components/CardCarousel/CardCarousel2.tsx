import { Carousel } from '@mantine/carousel';
import { ProductsCard } from '../ProductsCard';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, actionCreators } from '../../state';
import { useEffect } from 'react';
import { Container, MantineProvider, SimpleGrid, createTheme, rem } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

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
  products ? (
  products.map((product : Product ) => (
    <Carousel.Slide >
      <Container style={{height:'600px', display:'flex', }}>
    <ProductsCard product = { product } key = { uuidv4()}/>
    </Container>
     </Carousel.Slide>
     )))
    : (
      <>hello world</>
    )
 
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
    
       {/* {cards} */}
      {/* <Carousel.Slide>1</Carousel.Slide>
       <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide> */}
   
    </Carousel>
  );
}

export default  Cardslide2