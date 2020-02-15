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
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">aidn.</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {!authenticated && <NavLink href="/signup/">sign up</NavLink>}
            </NavItem>
            <NavItem>
              {!authenticated && <NavLink href="/login/">log in</NavLink>}
            </NavItem>
            <NavItem>
              <NavLink href="/emergency"><Button color='danger'>Medical Emergency</Button></NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {props.user && <NavbarText>Hi, {props.user.name}</NavbarText>}
          <NavbarText><img className="rounded-circle" style={{width: '3rem'}} src={props.user && props.user.picUrl}></img></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TopNav;