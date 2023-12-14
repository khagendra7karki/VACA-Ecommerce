import React from 'react';
import { Group, Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './styles.scss';
import SearchBar from '../SearchBar';
import HeaderNav from './HeaderNav';
import { Link } from 'react-router-dom';
import MenuProfile from "../profileMenu"

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer}] = useDisclosure(false);

  return (
    <header className="header">
      <Group>
        <Group hiddenFrom = 'sm'>
          <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" hiddenFrom="sm" />
        </Group>
        
        <Link to = '/' className = 'logo'>VACA</Link>

        <HeaderNav drawerOpened = {drawerOpened}/>
        <Group visibleFrom = 'sm'>
          <MenuProfile/>
          <SearchBar />
        </Group>
      </Group>

    </header>
  );
}
