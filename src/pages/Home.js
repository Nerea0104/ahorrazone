import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HoverButton from "../components/HoverButton";

function Home() {
    return (
        <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col md={6}>
                        <p
                            style={{
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                fontSize: "0.75rem",
                                color: "#6f42c1",
                                marginBottom: "16px",
                                fontWeight: "600",
                            }}
                        >
                            Amazon price & stock alerts
                        </p>


                        <h1 style={{ fontWeight: "700", fontSize: "2.8rem" }}>
                            Save money on Amazon
                            <br />
                            <span style={{ color: "#6f42c1" }}>without watching prices</span>
                        </h1>

                        <p className="mt-4 text-muted" style={{ fontSize: "1.1rem" }}>
                            <strong>Ahorrazone</strong> tracks Amazon prices and stock for you.
                            Just send a product link and choose when you want to be notified.
                        </p>

                        <div className="d-flex gap-3">
                            <HoverButton
                                size="lg"
                                style={{
                                    backgroundColor: "#6f42c1",
                                    border: "none",
                                    boxShadow: "0 10px 20px rgba(111,66,193,0.3)",
                                }}
                                onClick={() => window.open("https://t.me/Ahorrazone_bot", "_blank")}
                            >
                                Use on Telegram
                            </HoverButton>

                            <div style={{ position: "relative", display: "inline-block" }}>
                                <HoverButton size="lg" variant="success" disabled>
                                    Use on WhatsApp
                                </HoverButton>
                                <span style={{
                                    position: "absolute",
                                    top: "-10px",
                                    right: "-10px",
                                    backgroundColor: "#ffc107",
                                    color: "#fff",
                                    padding: "2px 6px",
                                    borderRadius: "12px",
                                    fontSize: "0.7rem",
                                    fontWeight: "600"
                                }}>
                                    Soon
                                </span>
                            </div>

                        </div>

                    </Col>

                    <Col md={6} className="mt-5 mt-md-0">
                        <div
                            style={{
                                background: "white",
                                borderRadius: "20px",
                                padding: "30px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                            }}
                        >
                            <h5 style={{ fontWeight: "600" }}>Available alerts</h5>

                            <ul className="mt-3" style={{ listStyle: "none", paddingLeft: 0 }}>
                                <li>📉 Any price drop</li>
                                <li>🔔 5%, 10%, 15% or 20% drop</li>
                                <li>🎯 Set a target price</li>
                                <li>📦 Back in stock alert</li>
                            </ul>

                            <p className="text-muted mt-3" style={{ fontSize: "0.95rem" }}>
                                When an alert is triggered, you’ll receive a message with a
                                direct Amazon purchase link.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
