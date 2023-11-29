import React, { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  InputBase,
  NumberInput,
  NumberInputHandlers,
  Pill,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import classes from "./product.module.css";
import img1 from "../assets/img/img1.jpg"
import img2 from "../assets/img/img2.jpg"

import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Review from "../components/reviews/Review";
import { Carousel } from "@mantine/carousel";
import Reactangle from "../components/Rectangle";
import CardCarousel from "../components/CardCarousel";

const Product = () => {
  const [image, setImage] = useState<string>();
  const params = useParams();
  const dispatch = useDispatch();

  const { getProduct, addToCart } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [value, setValue] = useState<any>(1);

  const handlers = useRef<NumberInputHandlers>(null);

  const { product, loading } = useSelector((state: State) => state.product);

  const handlerAddToCart = (quantity: number, id: string) => {
    addToCart(id, quantity);
  };

  useEffect(() => {
    getProduct(params.id as string);
    
  }, [dispatch, params]);


  // const productImages : string[] = [product.images[0], img1 , img2 , product.images[0] , img2 , img1]
  const productImages : string[] = product.images
  const [selectedImage, setSelectedImage] = useState<string | null>( null );
  
  const handleImageClick = (imageName: string) => {
    setSelectedImage(imageName);
  };
 
  function productSideCarousel() {
    return (
      <Carousel
        className={classes.carousel}
        
        slideSize={{ base: '33.333333%', sm: '25%', md: '25%' }}
        slideGap={{ base: 0, sm: 'md' }}
        controlsOffset="sm"
        //loop
        align="start"
        //orientation="vertical"
        
      >
        {productImages.map((image) => (
          
            <Carousel.Slide mt={5}>
              <Image src = {image}  fit="contain" onClick={() => handleImageClick(image)} /></Carousel.Slide>
        
        ))}
        
        
      </Carousel>
    );
  }

  
  const pills = product.size?.map(( size : string, index : number ) => (
      <Pill key={index} withRemoveButton>
        size {size}
      </Pill>
    ));

  return (<>
    {loading ? (
      <Loading />
    ) : (
      <><Container size = '80%' >
        {Object.keys(product).length && (<>
          <Grid mb={100} gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
            <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
              <Group justify="center">
                {productSideCarousel()}
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
              <Group justify="center">
                <Image
                  radius="md"
                  h={500}
                  //w="auto"
                  fit="contain"
                  src={ selectedImage || product.images[0] }
                  alt="product image"
                />
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8, lg: 6 }}>
              <Stack
                ml ="50px"
                justify="flex-start"
              >
                <Group gap="lg">
                  {" "}
                  <Text fw={400} style={{ fontSize: "32px" }}>
                    {product.title}
                  </Text>
                  {product.availableQuantity === 0 ? (
                    <Badge
                      color="red"
                      style={{ marginLeft: "10px" }}
                      variant="filled"
                    >
                      {" "}
                      Sold Out
                    </Badge>
                  ) : (
                    <Badge
                      color="green"
                      style={{ marginLeft: "10px" }}
                      variant="filled"
                    >
                      {" "}
                      In Stock
                    </Badge>
                  )}
                </Group>
                <Space h="xs" />
                <Group gap="lg">
                  <Text>Rs.  {product.price}</Text>
                  <Badge variant="outline">25% off</Badge>
                </Group>
                <Divider my="sm" />
                <Group gap="lg">
                  <Text>Option</Text>
                  <Select
                    placeholder="Choose an Option"
                    data={ product.options }
                  />
                </Group>
                <Group>
                  {" "}
                  <InputBase component="div" multiline>
                    <Pill.Group>{pills}</Pill.Group>
                  </InputBase>
                </Group>
                <Divider my="sm" />

                <Group gap={30}>
                  <Group>
                    <ActionIcon
                      size={28}
                      radius="lg"
                      variant="filled"
                      color="dark"
                      onClick={() => handlers?.current?.decrement()}
                    >
                      –
                    </ActionIcon>
                    <NumberInput
                      hideControls
                      value={value}
                      onChange={(val) => setValue(val)}
                      handlersRef={handlers}
                      max={10}
                      min={1}
                      step={1}
                      styles={{
                        input: { width: 54, textAlign: "center" },
                      }}
                      radius="lg"
                    />
                    <ActionIcon
                      size={28}
                      radius="lg"
                      variant="filled"
                      color="dark"
                      onClick={() => handlers?.current?.increment()}
                    >
                      +
                    </ActionIcon>
                  </Group>

                  <Button
                    variant="outline"
                    color="rgba(0, 0, 0, 0.71)"
                    //style={{ flex: 1 }}
                    onClick={() =>
                      handlerAddToCart(value, product._id)
                    }
                  >
                    Add To Cart
                  </Button>
                </Group>
                {/* <Group>
                  <Button variant="filled">Add to Wishlist</Button>
                </Group> */}

                <Text fz="sm" c="dimmed" className={classes.label}>
                  Description
                </Text>

                <Group>
                  <Text size="md" c="dimmed">
                    {product.description}
                  </Text>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>

          <Group >
            <Reactangle />
            <h5 className = 'sub-title'>Related Product</h5>
            
          </Group>
          <CardCarousel />
        </>
          
         
        )}
        {/* {Object.keys(product).length && (
          <Review reviewM={product.reviews} />
        )} */}
         </Container>
      </>
    )}
  </>
  );
};

export default Product;
