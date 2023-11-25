import { Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './styles.scss';
import SearchBar from '../SearchBar';
import HeaderNav from './HeaderNav';
import { Link } from 'react-router-dom';

export function Header() {
  
  
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <header className ='header' style = {{borderBottom: '1px solid grey'}}>
        <div className='inner'>
          <Group >
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
            <Link to = '/' style = {{fontSize: '32px', textDecoration: 'none' , color: 'black', fontWeight: '500' , padding: '10px'}}>
              VACA
            </Link>
        
          </Group>

          <Group>
            <Group gap={50} visibleFrom="sm" style={{ flexWrap :'nowrap'}}>
              <HeaderNav />
              <SearchBar />
            </Group>
          
          </Group>
        </div>
      </header> 
    </>
  ); 
}