import React from 'react';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './styles.scss';
import { State } from '../../../../state';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  const [drawerOpened, { toggle: toggleDrawer}] = useDisclosure(false);
  const { isLoggedIn } = useSelector( (state: State) => state.userLogin)
  return (
    <header className="header" style = {{borderBottom: '1px solid grey', padding: '0px 20px'}}>
      <Group style = {{flexWrap: 'nowrap'}}>
        <Link to = '/' className = 'logo'>VACA</Link>
      </Group>

    </header>
  );
}