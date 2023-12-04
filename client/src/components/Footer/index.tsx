import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Space,
  SimpleGrid,
  Title,
  TextInput,
  Divider,
  Grid,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export function Footer() {
  const groups = data.map((group, index) => {
    const links = group.links.map((link, index) => (
        <Text<"a">
          key={index}
          className={classes.link}
          component="a"
          href={link.link}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </Text>
    ));

    return (
      <div className={classes.wrapper} key = {index}>
        <SimpleGrid cols={3} spacing="md">
          <Text className={classes.title}>{group.title}</Text>
        </SimpleGrid>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size = 'xxxl'>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <div className={classes.logo}>
              {/* <MantineLogo size={30} /> */}
              <Title order={2} c="white">
                VACA
              </Title>
              <Space h="md" />
              <Text size="lg" c="white" className={classes.description}>
                Subscribe
              </Text>
              <Text size="sm" c="white" className={classes.description}>
                Get 10% off on your first order
              </Text>
              <TextInput placeholder="Enter your email" mt="15px" style={{ width: rem(300) }}/>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }} >
            {" "}
            <div className={classes.groups}>{groups}</div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            {" "}
            <div>
              <Title order={2} c="white">
                Connect With Us
              </Title>
              <Space h="md" />
              <Text size="lg" c="white" className={classes.description}>
                Vaca here,
              </Text>
              <Text size="sm" c="white" className={classes.description}>
                TakeFree
              </Text>
              
                <Group
                  gap={0}
                  
                >
                  <ActionIcon size="lg" color="gray" variant="subtle">
                    <IconBrandTwitter
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <ActionIcon size="lg" color="gray" variant="subtle">
                    <IconBrandYoutube
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <ActionIcon size="lg" color="gray" variant="subtle">
                    <IconBrandInstagram
                      style={{ width: rem(18), height: rem(18) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
             
            </div>
          </Grid.Col>
        </Grid>
      </Container>

      <Group justify="center" style = {{borderTop: '1px solid rgba(255,255,255,0.3)', marginTop: '20px'}}>
        <Text c="dimmed" size="sm" ta="center" mt="20px" mb="10px">
          © 2023 vaca.dev. All rights reserved.
        </Text>
      </Group>
    </footer>
  );
}
