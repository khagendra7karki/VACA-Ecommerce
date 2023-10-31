import { Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from './HeaderSearch.module.css';
import  Vaca from '../assets/img/vaca.png'
import { useEffect, useState } from 'react';
import {  actionCreators, State } from '../state';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
//handles general link click 

export function HeaderSearch() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const { logout } = bindActionCreators( 
    actionCreators,
    dispatch
    )
    const [opened, { toggle }] = useDisclosure(false);
    const { userInfo } = useSelector( (state: State) => state.userLogin )
    
    const handleLinkClick = ( url: string ) =>{
      navigate( url )
    }
    
    const handleLogout = ( url: string ) =>{
      logout() 
    }
    
    const initialLinks = [
      { link: '/', label: 'Home', onClick: handleLinkClick },
      { link: '/shop', label: 'Shop' , onClick: handleLinkClick },
      { link: '/Contact', label: 'Contact', onClick: handleLinkClick },
      { link: '/signup', label: 'signup', onClick: handleLinkClick },
      { link: '/cart', label: 'cart', onClick: handleLinkClick },
    ];

  const [ links, setLinks ] = useState( initialLinks )

  useEffect( () =>{
    setLinks( [ ...initialLinks, ( userInfo ? { link: '/logout', label: 'logout', onClick : handleLogout }: { link: '/login', label: 'login', onClick: handleLinkClick} ) ])
  }, [ userInfo ])


  const items = links.map((link) => (
    <>
    <button 
      key = { link.label }
      onClick = { (e) => link.onClick( link.link) }
      className = { classes.link }
      >
      { link.label }
    </button>
    {/* <a
      key={link.label}
      href={link.link  == 'Login' && true ? '/' : '/login'}
      className={classes.link}
      // onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a> */}
    </>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <img src={Vaca} alt="Image" height={50}/>
       
        </Group>

        <Group>
          <Group ml={50} gap={50} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}