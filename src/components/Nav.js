import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';

const TopNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const {authenticated} = props;
  return (
    <div>
      <Navbar color="light" light expand="md" className="bg-transparent">
        <NavbarBrand href="/">aidn.</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {!authenticated && <NavLink href="/signup/"><Button outline color='secondary'>Sign Up</Button></NavLink>}
            </NavItem>
            <NavItem>
              {!authenticated && <NavLink href="/login/"><Button outline color='secondary'>Log In</Button></NavLink>}
            </NavItem>
            <NavItem>
              <NavLink href="/assist/"><Button outline color='secondary'>Assistant</Button></NavLink>
            </NavItem>
            <NavItem>
              {authenticated && <NavLink href="/medical-history/"><Button outline color='secondary'>Medical History</Button></NavLink>}
            </NavItem>
            <NavItem>
              {authenticated && <NavLink href="/doctors/"><Button outline color='secondary'>Doctors</Button></NavLink>}
            </NavItem>
            <NavItem>
              <NavLink href="/emergency"><Button color='danger'>Medical Emergency</Button></NavLink>
            </NavItem>
          </Nav>
          {props.user && <NavbarText className='pr-2'>{props.user.name} </NavbarText>}
          <NavbarText><img className="rounded-circle img-responsive" style={{width: '3rem', height: '3rem'}} src={props.user && props.user.picUrl}></img></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TopNav;