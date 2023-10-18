import { Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import classes from './HeaderSearch.module.css';
import  Vaca from '../assets/img/vaca.png'
const links = [
  { link: '/Home', label: 'Home' },
  { link: '/About', label: 'About' },
  { link: '/Contact', label: 'Contact' },
  { link: '/Signup', label: 'Signup' },
];

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <img src={Vaca} alt="Image" height={50}/>;
       
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