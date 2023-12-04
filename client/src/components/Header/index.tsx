import React from 'react';
import { Group, Burger, ListItem, List, Divider, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './styles.scss';
import SearchBar from '../SearchBar';
import HeaderNav from './HeaderNav';
import { Link } from 'react-router-dom';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <div>
      <header className="header" style={{ borderBottom: '1px solid grey' }}>
        <div className="inner">
          <Group>
            <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" hiddenFrom="sm" />
            <Link
              to="/"
              style={{
                fontSize: '32px',
                textDecoration: 'none',
                color: 'black',
                fontWeight: '500',
                padding: '10px',
              }}
            >
              VACA
            </Link>
          </Group>
          <Group>
              <Group gap={50} visibleFrom="sm" style={{ flexWrap: 'nowrap' }}>
                <HeaderNav />
                <SearchBar />
              </Group>
            </Group>
        </div>
      </header>
      {drawerOpened ? (
            <Box hiddenFrom='sm' style={{zIndex:"10000" , backgroundColor:"#ffffff"}} mt={2}>
             <Group></Group>
              <List>
                <ListItem onClick={closeDrawer}><Link className='linked' to="/">Home</Link></ListItem>
                <ListItem onClick={closeDrawer}><Link className='linked' to="/contact">Contact</Link></ListItem>
                <ListItem onClick={closeDrawer}><Link className='linked' to="/cart">Cart</Link></ListItem>
                <ListItem onClick={closeDrawer}><Link className='linked' to="/wishlist"> Wish List</Link></ListItem>
                <ListItem onClick={closeDrawer}><Link className='linked' to="/login">Login</Link></ListItem>
                <ListItem onClick={closeDrawer}><Link className='linked' to="/signup">Sign Up</Link></ListItem>
              </List>
            </Box>
          ) : (
            <></>
          )}
    </div>
  );
}
