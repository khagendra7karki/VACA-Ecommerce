import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Modal,
  Button,
  Image,
  Alert,
  Container,
  Grid,
  Divider,
} from "@mantine/core";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiTrashAlt } from "react-icons/bi";

export default function WishList( ) {
    const numRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [opened, setOpened] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const { cartItems } = useSelector((state: State) => state.cart);

    const { removeFromCart, updateCart } = bindActionCreators(
    actionCreators,
    dispatch
    );

    const handlerUpdateCartItems = (value: number, id: string) => {
    updateCart(id, value);
    };

    const selectItem = (id: string) => {
    setOpened(true);
    setSelectedItem(id);
    };

    const handlerDeleteCartItem = (id: string) => {
    setOpened(false);
    console.log(id);
    removeFromCart(id);
    };

    return (
    <>
        <Container size="80%" mb = {50}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
            <Grid.Col span={6}>Product</Grid.Col>
            <Grid.Col span={3}>Price</Grid.Col>
            <Grid.Col span={3}>Stock Status</Grid.Col>
        </Grid>
        <Divider mb={30} />
        {cartItems && cartItems.length ? (
            cartItems.map((item: any, index: number) => {
            return (
                <>
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
                <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} my={20}>
                    <Grid.Col span={6}>
                    <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
                        <Grid.Col span={2}>
                        {" "}
                        <Button
                            size="sm"
                            radius="lg"
                            variant="filled"
                            color="#DB4444"
                            onClick={() => selectItem(item.product)}
                            fullWidth
                        >
                            <BiTrashAlt />
                        </Button>
                        </Grid.Col>
                        <Grid.Col span={2}>
                        {" "}
                        <Image
                            fit="contain"
                            radius="lg"
                            height={50}
                            width={50}
                            src={item.image}
                        />
                        </Grid.Col>
                        <Grid.Col span={6}>{item.title}</Grid.Col>
                    </Grid>
                    </Grid.Col>
                    <Grid.Col span={3}> Rs. {item.price}</Grid.Col>
                    <Grid.Col span={3}>
                        { item.availableQuantity > 0 ? 'In Stock'  : "Out of Stock" }
                    </Grid.Col>
                    <Grid.Col span={3}>Rs. {item.price * item.quantity}</Grid.Col>
                </Grid>
                </>
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
                No items added to Wish List
            </Alert>
            </>
        )}
        </Container>
        </>
    )
}

