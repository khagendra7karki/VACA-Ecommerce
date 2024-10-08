import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
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
    const dispatch = useDispatch();

    const [opened, setOpened] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const { wishListItems } = useSelector((state: State) => state.wishList);
    const { isLoggedIn } = useSelector( (state: State) => state.userLogin )
    const { getWishList, removeFromWishList, clearWishList } = bindActionCreators(
        actionCreators,
        dispatch
    );


    const selectItem = (id: string) => {
        setOpened(true);
        console.log( id )
        setSelectedItem(id);
    };

    const handlerDeleteCartItem = (id: string) => {
        setOpened(false);
        // console.log( id )
        removeFromWishList(id);
    };

    useEffect(() =>{
        getWishList();
    }, [])

    useEffect( () => {
        if( !isLoggedIn ) clearWishList()
    }, [ isLoggedIn])

    return (
    <>
        <Container size="80%" mb = {50}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
            <Grid.Col span={6}>Product</Grid.Col>
            <Grid.Col span={3}>Price</Grid.Col>
            <Grid.Col span={3}>Stock Status</Grid.Col>
        </Grid>
        <Divider mb={30} />
        {wishListItems && wishListItems.length ? (
            wishListItems.map((item: any, index: number) => {
            return (
                <div key = {index}>
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
                            onClick={() => selectItem(item.product._id)}
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
                        { item.product.availableQuantity > 0 ? 'In Stock'  : "Out of Stock" }
                    </Grid.Col>
                </Grid>
                <Divider mb={20} />
                </div>
            );
            })
        ) : (
            <>
            {" "}
            <Alert
                icon={<RiShoppingBagLine size={16} />}
                style={{ marginTop: "1rem" , background: 'white'}}
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

