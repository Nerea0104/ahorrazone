import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <Navbar expand="lg" style={{ backgroundColor: "#fff" }} className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    {/* Logo tipográfico */}
                    <span
                        style={{
                            fontWeight: "700",
                            fontSize: "1.5rem",
                            color: "#6f42c1",
                            marginRight: "8px",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Ahorrazone
                    </span>
                    <span style={{ fontSize: "1.5rem" }}>💰</span>
                </Navbar.Brand>

                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/privacy" style={{ color: "#6f42c1", fontWeight: "500" }}>
                        Privacy Policy
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;
