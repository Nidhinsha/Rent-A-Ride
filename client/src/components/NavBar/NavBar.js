
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
  Autocomplete,
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
  IconSearch
} from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogOut } from '../../Redux/Actions/userActions';

import { Button } from 'primereact/button';
import ProfileDropDown from '../DropDown/ProfileDropDown';


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


function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.userLoginReducer)
  const { userLoginDetails } = user
  console.log('user', userLoginDetails);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();




  return (
    <Box pb={100}>
      <Header height={70} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          {/* <MantineLogo size={30} /> */}
          <h3 size={30}>Rent&Ride</h3>

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="/" className={classes.link}>
              Home
            </a>
            <HoverCard width={300} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="/bikes" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Bikes
                    </Box>
                    {/* <IconChevronDown size={16} color={theme.fn.primaryColor()} /> */}
                  </Center>
                </a>
              </HoverCard.Target>
              {/* hover */}

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


              </HoverCard.Dropdown> */}

              {/* hover */}
            </HoverCard>
            <a href="/rent-bike" className={classes.link}>
              Rent-Bike
            </a>
            {/* <Link to='/rent-bike'> */}
            <a href='/chat' className={classes.link}>
              Chat
            </a>

            {/* </Link> */}




          </Group>
            {/* search  */}
            <Group>
              <Group ml={50} spacing={5} className={classes.links}>
                {/* {items} */}
              </Group>
              <Autocomplete
                className={classes.search}
                placeholder="Search"
                icon={<IconSearch size="1rem" stroke={1.5} />}
                data={[]}
              />


            {/* search  */}
            {/* checking user */}
            {
              userLoginDetails ?
                <Group className={classes.hiddenMobile}>

                  <ProfileDropDown />

                </Group>
                :
                <Group className={classes.hiddenMobile}>

                  <Link to={'/login'}>
                    <Button variant="default">Log in</Button>
                  </Link>

                  <Link to={'/signup'}>
                    <Button>Sign up</Button>
                  </Link>
                </Group>
            }
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

          <a href="/" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                <Link to='/bikes'>
                  Bikes
                </Link>
              </Box>
              {/* <IconChevronDown size={16} color={theme.fn.primaryColor()} /> */}
            </Center>
          </UnstyledButton>
          {/* <Collapse in={linksOpened}>{links}</Collapse> */}
          <a href="/bikes" className={classes.link}>
            Bikes
          </a>
          <a href="/rent-bike" className={classes.link}>
            Rent-Bike
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Link to='/login'>
              <Button variant="default" >Log in
              </Button>
            </Link>
            <Link to='/signup'>
              <Button variant="default">Sign up</Button>
            </Link>

          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default NavBar