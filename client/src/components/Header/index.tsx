import React from 'react';
import { Group, Burger} from '@mantine/core';
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

        <ul className='mobile-nav' style={{ height: `${ drawerOpened ? '100%' : '0px'}`, overflow: 'hidden'}}>
          <li><Link className='mobile-nav-item linked' to="/">Home</Link></li>
          <li><Link className='mobile-nav-item linked' to="/contact">Contact</Link></li>
          <li><Link className='mobile-nav-item linked' to="/cart">Cart</Link></li>
          <li><Link className='mobile-nav-item linked' to="/wishlist"> Wish List</Link></li>
          <li><Link className='mobile-nav-item linked' to="/login">Login</Link></li>
          <li><Link className='mobile-nav-item linked' to="/signup">Sign Up</Link></li>
        </ul>

    </div>
  );
}
