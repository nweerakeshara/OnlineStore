import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink, Container} from 'reactstrap';
import LogoutCustomer from "./logout.component";
import {Link} from "react-router-dom";

class NavbarComponent extends Component {
    state = {
        isExtend : false
    }

    toggle = () => {
        this.setState({
            isExtend : !this.state.isExtend
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">HINT Fashion</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isExtend={this.state.isExtend} navbar>
                            {/*<div className="collapse navbar-collapse" id="navbarSupportedContent">

                            </div>*/}
                            <Nav className="ml-auto" navbar>
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/'}  className="nav-link">Home</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/guest"} className="nav-link">Guest</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/user"} className="nav-link">User</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/storemanager"} className="nav-link">Store Manager</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/admin"} className="nav-link">Admin</Link>
                                    </li>


                                    <li className="nav-item">
                                        <Link to={'/registerCus'}  className="nav-link">Customer Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/loginCus'}  className="nav-link">Customer Sign In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/editCus'}  className="nav-link"> Customer Edit</Link>
                                    </li>
                                    <li className="nav-item">
                                        <LogoutCustomer/>
                                    </li>

                                </ul>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavbarComponent;