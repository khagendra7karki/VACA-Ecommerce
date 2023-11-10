import React, { PropsWithChildren, useState } from "react";

import { Container, Group, Select, Text, useMantineTheme } from "@mantine/core";
import { HeaderSearch } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../state";
import { getProduct } from "../state/action-creators";
import { IconSearch } from '@tabler/icons-react';

interface LayoutProps {
  children: any;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  const { userInfo } = useSelector((state: State) => state.user);
  const { cartItems } = useSelector((state: State) => state.cart);
  const { quickSearch } = useSelector((state: State) => state.quickSearch);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quickSearchProducts } = bindActionCreators(actionCreators, dispatch);

  const handlerSearch = (value: any) => {
    quickSearchProducts(value);
  };

  const handlerSearchSelect = (id: any) => {
    getProduct(id);
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Group justify="flex-end" gap="xl" style ={{backgroundColor: 'grey'}}>
        <Text>Search</Text>
        <Select
        style ={{width: '400px'}}
          my = '5px'
          mx = '20px'
          size="sm"
          placeholder="Search for an item..."
          leftSection={<IconSearch style={{ width: '16px', height: '16px' }} stroke={1.5} />}
          onSearchChange={(e) => handlerSearch(e)}
          onChange={(e) => handlerSearchSelect(e)}
          data={quickSearch}
          searchable
          nothingFoundMessage="Nothing found..."
        />
      </Group>

      <HeaderSearch />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "90vh",
        }}
      >
        <Container
          style={{
            marginTop: "7rem",
            maxWidth: "1620px",
            width: "100%",
          }}
        >
          {children}
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
