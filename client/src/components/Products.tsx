import { SimpleGrid, Card, Image, Text, Container, AspectRatio, Button } from '@mantine/core';
import classes from './Products.module.css';
import {  MantineProvider, createTheme, rem } from '@mantine/core';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useNotifications } from "@mantine/notifications";


import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import Loading from "./Loading";
import { useNavigate } from "react-router";

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






export default function ArticlesCardsGrid() {
  const dispatch = useDispatch();
  //const notifications = useNotifications();

  //const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const { getProducts } = bindActionCreators(actionCreators, dispatch);

  const { products, error, loading } = useSelector(
    (state: State) => state.products
  
  );
  console.log("getproducts", products)
  // const handlerPageChange = () => {
  //   //setActivePage(page);
  //   getProducts();
  // };

  useEffect(() => {
    getProducts();
    
  }, [dispatch]);
console.log( products)
console.log( products.payload, "tttttttt")
console.log( products.products, "ppppppppp")
  // useEffect(() => {
  //   if (error) {
  //     notifications.showNotification({
  //       title: "Error!",
  //       message: error,
  //       color: "red",
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [error]);

  const cards =
  (Object.keys(products).includes("payload") )? (
  products.payload.map((product :any) => (
    <Card key={product.title} p="md" radius="md" component="a" href="#" className={classes.card} >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={product.image} />
      </AspectRatio>
      <Text className={classes.title} mt={5}>
        {product.title}
      </Text>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {product.oldPrice}
      </Text>
      
            <Button
              onClick={() => navigate(`/product/${product._id}`)}
              variant="filled"
              radius="lg"
              color="dark"
              fullWidth
            >
              View Product
            </Button>
        
    </Card>
     )))
    : (
      <>hello world</>
    )
 

  return (
    <MantineProvider theme={theme}>
    <Container py="md" size="xl" bg="var(--mantine-color-blue-light)">
      <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="xl">{cards}</SimpleGrid>
    </Container>  </MantineProvider>
  );
}