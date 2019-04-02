import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collpased: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            collpased: !this.state.collpased
        })
    }

    render() {
        return (
            <div className="text-white">
                <Navbar dark expand="md">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto">TodoList</NavbarBrand>
                    <Collapse isOpen={this.state.collpased} className="mr-auto" navbar>
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
        )
    }
}

export default Header;