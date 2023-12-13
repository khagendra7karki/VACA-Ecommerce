import React from 'react';
import { Group, Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './styles.scss';
import SearchBar from '../SearchBar';
import HeaderNav from './HeaderNav';
import { Link } from 'react-router-dom';
import MenuProfile from "../profileMenu"
import { useSelector } from 'react-redux';
import { State } from '../../state';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer}] = useDisclosure(false);
  const { isLoggedIn } = useSelector( (state: State) => state.userLogin)
  return (
    <div>
    <header className="header" style = {{borderBottom: '1px solid grey', padding: '0px 20px'}}>
      <Group style = {{flexWrap: 'nowrap'}}>
        <Group hiddenFrom = 'sm'>
          <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" hiddenFrom="md" />
        </Group>
        
        <Link to = '/' className = 'logo'>VACA</Link>

        <HeaderNav drawerOpened = {drawerOpened} toggleDrawer = {toggleDrawer}/>
        <Group visibleFrom = 'md' style = {{flexWrap: 'nowrap'}}>
          <SearchBar />
          {isLoggedIn && <MenuProfile/>}
        </Group>
      </Group>

    </header>
        <ul className='mobile-nav' style={{ height: `${ drawerOpened ? '100%' : '0px'}`, overflow: 'hidden'}}>
          <li><Link className='mobile-nav-item linked' onClick={toggleDrawer} to="/">Home</Link></li>
          <li><Link className='mobile-nav-item linked' onClick={toggleDrawer} to="/contact">Contact</Link></li>
          <li><Link className='mobile-nav-item linked' onClick={toggleDrawer} to="/cart">Cart</Link></li>
          <li><Link className='mobile-nav-item linked' onClick={toggleDrawer} to="/wishlist"> Wish List</Link></li>
          <li><Link className='mobile-nav-item linked' onClick={toggleDrawer} to="/login">Login</Link></li>
          <li><Link className='mobile-nav-item linked' onClick={toggleDrawer} to="/signup">Sign Up</Link></li>
        </ul>
      
    </div>
  );
}
