// import React from 'react';
// import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { userLogout } from '../../Redux/Actions/userActions';

// function NavBar() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const logOut =()=>{
//         dispatch(userLogout())
//         navigate("/login")
//     }
//     const onUserProfile = () =>{
//         navigate("/profile")
//     }

//   return (
//     <Navbar bg="light" expand="lg">
//       <Container>
//         <Navbar.Brand href="#">Company</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="ms-auto">
//             <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAI4AjgMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABgcIBAIFAwH/xAA3EAABAwMCBAQEBAQHAAAAAAABAAIDBAURBiEHEjFhQVFxgRMUkbEiMlKhQoKywRUWJTNicpL/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAAgEQEBAAICAwADAQAAAAAAAAAAAQIRAwQSITETIsEF/9oADAMBAAIRAxEAPwC40REBERAREQEREBERAREQEREBERAREQEREBERAREQERRzWGsrZpWFnznPNVSjMVNFjmcPM+Q7o5bJN1I0VJ1XGK9PlJpbdQQx52D+Z59zkfZdlq4y1AkDbxaonR+L6R5Dh/K7Y/UKXjVX58FwIuCyXmgvtAyutdQ2aB23kWn9Lh4Fd6itl2IiI6IiICIiAiIgIiICIiDnuNXHQW+prZv9unhfK/0aCT9lmbUN9r9RXF1fc5A6QjDGNADY25yGgdsrQOv6iCn0XefmpfhslpJIQ7lJ/E8crRt3IWa1PCMvZy+QREVjImHC2+zWbVdNB8Qikr3iCZnhzHZjvUHb0JWhFliyTw0t7ttTVPLIIKyGWRwaSQ1rw47DsFqZrg4BzdwdwfNV5xt693i/qIig0CIiAiIgIiICIiAiIg+ZqSzx36x1lsldyCojLWvxnkd1afYgFZputvqbTcai31rA2op38kgByPMEdiCD7rVKpTjZZHU17gvMTCYKxgjleBs2RgwM+rf6Sp4X2z9jDc2rZERWMSRaG01UanvkdNEQ2nhLZamQ/wALM9B3PQe60iAAAAMAdFAODNjfbdOyXCojLJ7i8PAcNxE3IZ9ck+hCsBVZXdb+HDxxERFFcIiICIiAiIgIiICLy5wY0ucQ1oGSSegVLa64m1ddPLQ6cmdTUbSWuqmbSTY8Wn+Fvl4nsuybQz5JjPa0r9qiyafb/qlfFFJjaFv4pD/KN1CDxEsGqq2WxXahdDaapvJHUTOw74mdicfk7HO3iqccS5znOJLnHLnE5Lj5k+K/nr0U5hGW89qw73wlvdLUONokhrqYn8BfII3tHkc7H1B9l2af4YfIF1z1lVU8FDTD4j4GPznH63dMdhnKjWneIOoLBTNpaeeKopmDEcVUwvDB5NIIIHbK4dSasvGpnt/xSpBhYcsp4m8sbT548T3JKarnlxz3Is+2cXLM+tlp6ukmpKNruWmnY3mBYOnMwbt9sqe2y6UF2p/mLZWQ1UX6onZx6jqPdZXXRQ1lVbqltVQVEtNUN6SRO5XencdilwiWPYs+tWIq54c8RDfJWWm9cjLgQfgzN2bUYHQjwf1O2xwrGULNNWOUym4IiLiQiIgIiICIiCDcYbvJbdIup4HlktfKIMj9HV/1Ax7qhOyuHjwT8lZh4GaX+lqp5W4fGHnv7aERFJQIm2cZ3QYI2KO6EREce4ZpaeVk9PI6OaNwdG9vVrhuD9VqKxXAXay0NxaMfMwMkI8iRuPqstLR3DUEaEs3N1+AfpzHChm1da+7EmREVbWIiICIiAiIgi/EDSf+bLTHBFOIaqneZIHO/ISRgtd2O246d1Q19sN00/UGG7UckGThsmMxv/6u6H7rUK8TQxTxOinjZJG4Ycx7QQfUFSxy0p5OKZ+2Tl+tNA+pqYaePHxJpGxsz5uIA+60BcuGmlrg90goHUsjurqWVzB/5/L+y+RQ8LqOyXGK60d0qX/Kh7xFPG05PKcfiGMdfJTmcrPlw5Y+3xqipptH0UFNbaGrnLi5vNSjldJyHlc+SQAnc5w0bDHguDUlJS3/AE4+8Np5YKuGJ83NNGGSEMOHsf05hghwd1+qlFnFRXVkdMa6eJrgTzNeT4Z6ZS3yVE90hp31Mr2vkMZLnEgg5G4JVlxeDx9+Xwy8bu3W9/xSKEgDJIAHXPgrqoeDlniLTW3KuqcDdrQ2Nv2J/dSmzaI03ZniSitcRlHSWYmVw9C4nHsqvOPfnXyv1SuldB3rUb2SMgNJQnd1VO0gEf8AAdXH9u60BabfFarXS2+nLnRU0TY2ud1IA6ldaKNytaePjmAiIorBERAREQEREBERAXiVgkifGSQHtLSR3C9ojlks1UcbpCiZjlqakY8nAf2X7UmmKOlqoqlk07nxu5hzEYz9F91FLzyY8f8AO6uN3MIIiKLaIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg/9k=" 
//             roundedCircle width={30} height={30} className="me-2" onClick={onUserProfile} />
//             <Button variant="primary" onClick={logOut}>Logout</Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;


import {
  createStyles,
  Header,
  HoverCard,
  Group,

  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../Redux/Actions/userActions';

import { Button } from 'primereact/button';


const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut = () => {
    dispatch(userLogout())
    navigate("/login")
  }
  const onUserProfile = () => {
    navigate("/profile")
  }

  // const links = mockdata.map((item) => (
  //   <UnstyledButton className={classes.subLink} key={item.title}>
  //     <Group noWrap align="flex-start">
  //       <ThemeIcon size={34} variant="default" radius="md">
  //         <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
  //       </ThemeIcon>
  //       <div>
  //         <Text size="sm" fw={500}>
  //           {item.title}
  //         </Text>
  //         <Text size="xs" color="dimmed">
  //           {item.description}
  //         </Text>
  //       </div>
  //     </Group>
  //   </UnstyledButton>
  // ));

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          {/* <MantineLogo size={30} /> */}
          <h3>Rent&Ride</h3>

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="#" className={classes.link}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    {/* <IconChevronDown size={16} color={theme.fn.primaryColor()} /> */}
                  </Center>
                </a>
              </HoverCard.Target>

              {/* <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" color="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown> */}
            </HoverCard>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>

            <Link to={'/login'}>
              <Button variant="default">Log in</Button>
            </Link>

            <Link to={'/signup'}>
              <Button>Sign up</Button>
            </Link>

            <Link to={'/profile'}>
              <Button icon="pi pi-user" rounded severity="info" aria-label="User" />
            </Link>

          </Group>


          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>


      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              {/* <IconChevronDown size={16} color={theme.fn.primaryColor()} /> */}
            </Center>
          </UnstyledButton>
          {/* <Collapse in={linksOpened}>{links}</Collapse> */}
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>

          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default NavBar