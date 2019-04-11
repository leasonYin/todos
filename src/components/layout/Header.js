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
                            <NavItem ><NavLink className="nav-link" to="/todos" activeClassName="navlinkActive">
                                <span className="fa fa-tasks fa-lg"></span> Todo
                            </NavLink></NavItem>
                            <NavItem ><NavLink className="nav-link" to="/hooks" activeClassName="navlinkActive">
                                <span className="fa fa-laptop fa-lg"></span> Hooks
                            </NavLink></NavItem>
                            <NavItem ><NavLink className="nav-link" to="/formik" activeClassName="navlinkActive">
                                <span className="fa fa-newspaper-o fa-lg"></span> Formik
                            </NavLink></NavItem>
                            <NavItem ><NavLink className="nav-link" to="/about" activeClassName="navlinkActive">
                                <span className="fa fa-institution fa-lg"></span> About
                            </NavLink></NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Header;