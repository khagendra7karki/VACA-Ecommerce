import React, { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  Group,
  Image,
  InputBase,
  Modal,
  NumberInput,
  NumberInputHandlers,
  Pill,
  ScrollArea,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import classes from "./product.module.css";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Carousel } from "@mantine/carousel";
import Reactangle from "../../components/Rectangle";
import CardCarousel from "../../components/CardCarousel";
import { useDisclosure } from "@mantine/hooks";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiTrashAlt } from "react-icons/bi";

const Product = () => {
  const navigate = useNavigate();
  const numRef = useRef(null);
  const [openSidebar, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const params = useParams();
  const dispatch = useDispatch();

  const { getProduct, addToCart, addToWishList,getCart, removeFromCart, updateCart } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const selectItem = (id: string) => {
    setOpened(true);
    setSelectedItem(id);
  };
  const handlerUpdateCartItems = (value: number, id: string) => {
    updateCart(id, value);
  };
  const handlerDeleteCartItem = (id: string) => {
    setOpened(false);
    console.log(id);
    removeFromCart(id);
  };

  const [value, setValue] = useState<any>(1);

  const handlers = useRef<NumberInputHandlers>(null);

  const { product, loading } = useSelector((state: State) => state.product);
  const { cartItems } = useSelector((state: State) => state.cart);
  const handlerAddToCart = (quantity: number, id: string) => {
    addToCart(id, quantity);
  };

  useEffect(() => {
    getProduct(params.id as string);
  }, [dispatch, params]);

  useEffect( () =>{
    getCart()
  }, [])

  const productImages: string[] = product.images;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageName: string) => {
    setSelectedImage(imageName);
  };

  const handlerAddToWishList = (id: string) =>{ 
      addToWishList( id );
  }

  function productSideCarousel() {
    return (
      <Carousel
      px={35}
        className={classes.carousel}
        height='100%'
        slideSize={{ base: "33.333333%", sm: "25%", md: "20%" }}
        slideGap={{ base: 0, sm: "0" , xl :'0' }}
        controlsOffset="xs"
        align="start"
      >
        {productImages.map((image, index) => {
            if ( index == 0 )
              return 
            
            return <Carousel.Slide  key = {index}>
              <Image
                src={image}
                h={100}
                fit="contain"
                onClick={() => handleImageClick(image)}
              />
            </Carousel.Slide>
          }
        )}
      </Carousel>
    );
  }

  const addCart = () => {
    open()
    handlerAddToCart(value, product._id)
   
  }

  const pills = product.size?.map((size: string, index: number) => (
    <Pill key={index} withRemoveButton>
      size {size}
    </Pill>
  ));

  return (
    <>
      <ScrollRestoration />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container size= "100%"> 
            {Object.keys(product).length && (
              <>
                <Grid mb={50} gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
                  <Grid.Col span={{ base: 12, md: 4, lg: 6 }}>
                    <Stack >
                      <Group justify="center">
                        <Image
                          radius="md"
                          h={500}
                          //w="auto"
                          fit="contain"
                          src={selectedImage || product.images[0]}
                          alt="product image"
                        />
                      </Group>
                      <Group  justify="center">
                        <div style={{width:"500px"}}>{productSideCarousel()}</div></Group>
                    </Stack>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 8, lg: 6 }}>
                    <Stack  justify="flex-start">
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
                        <Text>Rs. {product.price}</Text>
                        <Badge variant="outline">25% off</Badge>
                      </Group>
                      <Divider my="sm" />
                      <Group gap="lg">
                        <Text>Option</Text>
                        <Select
                          placeholder="Choose an Option"
                          data={product.options}
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
                          onClick={(() => addCart())  }
                         
                        >
                          Add To Cart
                        </Button>
                      
                      </Group>
                      
                      <Group>
                        <Button variant="filled" onClick = {() => handlerAddToWishList( product._id)}>Add to Wishlist</Button>
                      </Group>

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

                <Group>
                  <Reactangle />
                  <h5 className="sub-title">Related Product</h5>
                </Group>
                <CardCarousel />
              </>
            )}
            {/* {Object.keys(product).length && (
          <Review reviewM={product.reviews} />
        )} */}
         <Drawer position= 'right' size={300} opened={openSidebar} onClose={close} title="Your Cart">
        {/* Drawer content */}
        <Divider/>
        <ScrollArea h={650} >
        {cartItems && cartItems.length ? (
          cartItems.map((item: any, index: number) => {
            return (
              
              <div key = {index} >

                <Modal
                  title="Delete Item?"
                  size="lg"
                  onClose={() => setOpened(false)}
                  opened={opened}
                >
                  <Text size="sm">
                    Are you sure that you want to remove this item?
                  </Text>
                  <div className="button-container">
                    <Button
                      onClick={() => setOpened(false)}
                      color="gray"
                      size="lg"
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handlerDeleteCartItem(selectedItem)}
                      color="red"
                      size="lg"
                      fullWidth
                    >
                      Yes
                    </Button>
                  </div>
                </Modal>
                <Container fluid h='100%' style={{borderStyle:'solid', borderWidth:'1px', borderColor:'grey'}} mb={10}>
     
   
                <Grid gutter={{ base: 5}} my={20}>
                  <Grid.Col span={{ base: 12 }}>
                    <Grid gutter={{ base: 5 }}>
                      <Grid.Col span={{ base: 12}}>
                        {" "}
                        <Group justify="center"><Button
                          size="sm"
                          px={0}
                          mt={10}
                          radius="md"
                          variant="subtle"
                          color="#DB4444"
                          onClick={() => selectItem(item.product)}
                        >
                        <BiTrashAlt size={15} style ={{margin:"auto"}} />
                        </Button> </Group>
                        
              
                      </Grid.Col>
                      <Grid.Col span={{ base: 12}}>
                        {" "}
                        <Group justify="center"> <Image
                          fit="contain"
                          radius="sm"
                          height={50}
                          width={50}
                          src={item.image}
                        /> </Group>
                       
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                      <Group justify="center">{item.title} </Group></Grid.Col>
                    </Grid>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12 }}>
                  <Group justify="center">Rs. {item.price}</Group>
                     </Grid.Col>
                  <Grid.Col span={{ base: 12}}>
                  <Group justify="center"> <NumberInput
                      style = {{maxWidth: '70px'}}
                      radius="sm"
                      value={item.quantity}
                      ref={numRef}
                      onChange={(e) => {
                        handlerUpdateCartItems(e as number, item.product);
                      }}
                      min={1}
                      //max={item.countInStock}
                      max={5}
                      required
                    /></Group>
                   
                  </Grid.Col>
                  <Grid.Col span={{ base: 12 }}>
                  <Group justify="center">  Rs. {item.price * item.quantity}</Group>
                   </Grid.Col>
                </Grid> </Container>
              </div>
            );
          })
        ) : (
          <>
            {" "}
            <Alert
              icon={<RiShoppingBagLine size={16} />}
              style={{ marginTop: "1rem" }}
              color="blue"
              radius="lg"
            >
              No items in the cart
            </Alert>
          </>
        )}
        </ScrollArea>
        <Grid>
            <Grid.Col span = {6}> <Text>
              Subtotal 
            </Text></Grid.Col>
            <Grid.Col span = {6} >
            <Text  ta = 'right' >
              Rs.
              {cartItems
                .reduce(
                  (acc: any, item: any) => acc + item.quantity * item.price,
                  0
                )
                .toFixed(2)}
            </Text>
            </Grid.Col>
          </Grid>
          <Text size='xs'>To find out your shipping cost , Please proceed to checkout.</Text>
          <Button
                style={{ marginTop: ".5rem" }}
                color="#DB4444"
                size="md"
                fullWidth
                onClick={() => navigate("/cart")}
              >
                Go To Cart
              </Button>
          {cartItems && cartItems.length ? (
              <Button
                style={{ marginTop: ".5rem" }}
                color="#DB4444"
                size="md"
                fullWidth
                onClick={() => navigate("/shipping")}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <></>
            )}
            <Button
                style={{ marginTop: ".5rem" }}
                color="#DB4444"
                size="md"
                fullWidth
                onClick={close}
              >
                Continue Shopping
              </Button>
      </Drawer>
      
          </Container>
        </>
      )}
    </>
  );
};

export default Product;
