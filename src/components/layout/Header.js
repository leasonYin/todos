import React, { useState } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Loading from '../utils/Loading';

function Header(props) {

    const [collpased, setCollapsed] = useState(false);

    return (
        <div className="container">
            <div className="text-white bg-dark">
                <Navbar dark expand="md">
                    <NavbarToggler onClick={() => setCollapsed(!collpased)} />
                    <NavbarBrand className="mr-auto">
                        <span className="px-2">Todo List</span>
                        <Loading waiting={props.waiting} />
                    </NavbarBrand>
                    <Collapse isOpen={collpased} className="mr-auto" navbar>
                        <Nav navbar>
                            <NavItem ><NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
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