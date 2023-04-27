import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UsersIcon from '@mui/icons-material/Group';
import BranchIcon from '@mui/icons-material/Business';
import ReportIcon from '@mui/icons-material/Assessment';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RuleIcon from '@mui/icons-material/Rule';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate } from 'react-router-dom';

// import Table from '../Users/Users';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

 function SideBar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("adminInfo")
        window.location = '/admin/login'
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: '#6366F1' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Rent & Ride Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Drawer variant="permanent" open={open}> 
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>

                    {[
                        { name: 'Dashboard', icon: <DashboardIcon style={{ color:'#6366F1'}}  /> },
                        { name: 'Users', icon: <UsersIcon  style={{ color:'#6366F1'}} /> },
                        { name: 'Bike List', icon: <TwoWheelerIcon style={{ color:'#6366F1'}} /> },
                        { name: 'Add Bike', icon: <AddCircleOutlineIcon style={{ color:'#6366F1'}}  /> },
                        { name: 'Bike Rent Request', icon: <RuleIcon style={{ color:'#6366F1'}}  /> },
                        { name: 'View Booked bike', icon: <BookmarkAddIcon style={{ color:'#6366F1'}}  /> },
                        { name: 'Location', icon: <BranchIcon style={{ color:'#6366F1'}}  /> },
                        { name: 'Coupons', icon: <LocalOfferIcon style={{ color:'#6366F1'}}  /> },
                        { name: 'Bike Report', icon: <ReportIcon style={{ color:'#6366F1'}}  /> },
                        // { name: 'Other Donations', icon: <OthersIcon /> },
                        { name: 'Logout', icon: <LogoutIcon style={{ color:'#6366F1'}}  /> }

                    ].map((text, index) => (
                        <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }}
                                    onClick={() => {
                                        console.log(text.name);
                                        let text2 = text.name.toLowerCase()
                                        text2 === "users" && navigate('/admin/user-manage')
                                        text2 === "dashboard"  && navigate('/admin/dashboard')
                                        text2 === "bike list"  && navigate('/admin/view-bike')
                                        text2 === "add bike"  && navigate('/admin/add-bike')
                                        text2 === "bike rent request"  && navigate('/admin/bike-request')
                                        text2 === "view booked bike"  && navigate('/admin/view-booked-bike')
                                        text2 === "location"  && navigate('/admin/location')
                                        text2 === "bike report"  && navigate('/admin/bikes-report')
                                        text2 === "coupons"  && navigate('/admin/coupons')
                                        text2 === "logout"  && handleLogout() 
                                        
                                    }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                
                <Divider />
            </Drawer>
        </Box >
    );
}

export default SideBar