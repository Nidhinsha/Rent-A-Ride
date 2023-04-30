import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logout from '@mui/icons-material/Logout';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../../Redux/Actions/userActions';

function ProfileDropDown() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.userLoginReducer)
  const { userLoginDetails } = user


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile")
  }
  const handleBooking = () => {
    navigate("/booked-bike")
  }

  const handleRentedBike = () => {
    navigate("/rented-bikes")
  }


  const logOut = () => {
    dispatch(userLogOut())
    navigate("/login")
  }

  return (
    <React.Fragment>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ height: 32 }}>
              <img src={userLoginDetails?.photo
                ? userLoginDetails?.photo
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              } alt="user profile" style={{ borderRadius: '50%', width: '100%', height: '100%' }}
                onError={(e) => {
                  e.target.src = '/path/to/default/image.png'; // Set default image path here
                }}
              />

            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
         <AccountCircleOutlinedIcon/> Profile
        </MenuItem> */}
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleBooking}>
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          Booking
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleRentedBike}>
          <ListItemIcon>
            <TwoWheelerIcon fontSize="small" />
          </ListItemIcon>
          Rented Bike
        </MenuItem>

        <Divider />


        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
export default ProfileDropDown