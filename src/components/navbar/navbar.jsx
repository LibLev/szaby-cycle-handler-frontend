import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, Form, Button} from 'react-bootstrap';

class NavBar extends Component {

    logout = () => {
      localStorage.clear();
      window.location.reload();
    };

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand >SzabiCycle</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/newProduct">Új termék</Nav.Link>
                        <Nav.Link href="/editProducts">Termékek szerkesztése</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <Button onClick={this.logout} >Kijelentkezés</Button>
                </Form>
            </Navbar>
        )
    }
}

export default NavBar;