import { SimpleGrid, Container } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { ProductsCard } from './ProductsCard';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  _id: string,  
  title: string,
  image: string[],
  oldPrice?: Number,
  price: Number,
};



interface PageNum {
  page: number;
  pages: (data: number) => void; // Define a callback prop
};



const ArticlesCardsGrid: React.FC<PageNum> = ({page, pages}): JSX.Element => 
{
  
  const dispatch = useDispatch();

  const { getProducts } = bindActionCreators(actionCreators, dispatch);

  // _page => 
  // _pages =>
  const { products, _pages, loading } = useSelector(
    (state: State) => state.products
  
  );

useEffect(()=> {
  getProducts(page);
  
  //pages(products.pages)
}, [page])

  useEffect(() => {
    getProducts(1);
  }, [dispatch]);

  if(!loading) {
    pages(_pages)
  }
  const cards =
  Object.keys(products).length 
   ? (
  products.map((product : Product ) => (
    <ProductsCard product = { product } key = { uuidv4()}/>
     )))
    : (
      <>hello world</>
    )
  return (
    <Container py="md" size="xl">
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4}} spacing="xl">
        {cards}
      </SimpleGrid>    
    </Container>  
  );
}

export default ArticlesCardsGrid