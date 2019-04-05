import React, { useState } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Loading from '../utils/Loading';

function Header(props) {

    const [collpased, setCollapsed] = useState(false);

    return (
        <div className="container">
            <div className="text-white bg-info">
                <Navbar dark expand="md">
                    <NavbarToggler onClick={() => setCollapsed(!collpased)} />
                    <NavbarBrand className="mr-auto">
                        <span className="px-2">Workspace</span>
                        <Loading loading={props.loading} />
                    </NavbarBrand>
                    <Collapse isOpen={collpased} className="mr-auto" navbar>
                        <Nav navbar>
                            <NavItem ><NavLink className="nav-link" to="/todos">
                                <span className="fa fa-tasks fa-lg"></span> Todo
                            </NavLink></NavItem>
                            <NavItem ><NavLink className="nav-link" to="/about">
                                <span className="fa fa-info fa-lg"></span> About
                            </NavLink></NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Header;