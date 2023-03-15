import React from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../Redux/Actions/userActions';

function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut =()=>{
        dispatch(userLogout())
        navigate("/login")
    }
    const onUserProfile = () =>{
        navigate("/profile")
    }
    
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Image src="data:image/jpeg;base64,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" 
            roundedCircle width={30} height={30} className="me-2" onClick={onUserProfile} />
            <Button variant="primary" onClick={logOut}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
