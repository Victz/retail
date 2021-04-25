import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, } from 'reactstrap';
import { Link } from 'react-router-dom';

import Auth from "../module/auth";

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentUser: undefined,
            showAdminBoard: false
        };
        this.toggle = this.toggle.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        const user = Auth.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        Auth.logout();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        return <Navbar color="dark" dark expand="md" className="mb-5">
            <NavbarBrand tag={Link} to="/">Example.com</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {currentUser ? (
                            <NavItem>
                                <NavLink href="/login" onClick={this.logOut}>Logout</NavLink>
                            </NavItem>
                                        ) : (
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>

                                        )}
                </Nav>
            </Collapse>
        </Navbar>;

    }
}