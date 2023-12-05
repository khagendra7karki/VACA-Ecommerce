import { SimpleGrid, Card, Image, Text, Container} from '@mantine/core';
import {  MantineProvider, createTheme, rem } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { useEffect  } from "react";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useNavigate } from "react-router";
import { ProductsCard } from './ProductsCard';

interface Product {
  _id: string,  
  title: string,
  images: string[],
  oldPrice: number,
  price: number,
};

// interface PageNum {
//   numb : Number
// }



const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: rem(400),
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(1500),
  xxl: rem(900),
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
            ? CONTAINER_SIZES[size]
            : rem(size),
        },
      }),
    }),
  },
});


interface PageNum {
  page: number;
  pages: (data: number) => void; // Define a callback prop
};



const ArticlesCardsGrid: React.FC<PageNum> = ({page, pages}): JSX.Element => 
{
  
  const dispatch = useDispatch();
  //const notifications = useNotifications();

  //const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const { getProducts } = bindActionCreators(actionCreators, dispatch);

  const { products, error, loading } = useSelector(
    (state: State) => state.products
  
  );
  // console.log("getproducts", products)
  // const handlerPageChange = () => {
  //   //setActivePage(page);
  //   getProducts();
  // };
useEffect(()=> {
  getProducts(page);
  
  //pages(products.pages)
}, [page])

  useEffect(() => {
    getProducts(1);
  }, [dispatch]);

  if(!loading) {
    pages(products.pages)
  }
  const cards =
  Object.keys(products).length 
   ? (
  products.products.map((product : Product, index : number ) => (
    <ProductsCard product = { product } key = { index }/>
     )))
    : (
      <>hello world</>
    )
  return (
    <MantineProvider theme={theme}>
      <Container py="md" size="xl">
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4}} spacing="xl">{cards}</SimpleGrid>
      
      </Container>  
    </MantineProvider>
  );
}

export default ArticlesCardsGrid