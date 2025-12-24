import React from "react";
import { Container, Card } from "react-bootstrap";

function Privacy() {
    return (
        <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh", paddingTop: "50px", paddingBottom: "50px" }}>
            <Container>
                <Card
                    style={{
                        borderRadius: "20px",
                        padding: "40px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    }}
                >
                    <Card.Body>
                        <h1 style={{ color: "#6f42c1", fontWeight: "700", marginBottom: "20px" }}>
                            Privacy Policy
                        </h1>

                        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "25px" }}>
                            This Privacy Policy describes how <strong>Ahorrazone</strong> ("we", "our", "us") handles user information when you use our services on Telegram or WhatsApp.
                        </p>

                        <h5 style={{ color: "#6f42c1", fontWeight: "600", marginTop: "25px" }}>1. Information We Collect</h5>
                        <p style={{ color: "#555" }}>
                            We do not collect personal data such as names, addresses, or payment information. The only data processed is the Amazon product link provided by the user and the selected price alert settings.
                        </p>

                        <h5 style={{ color: "#6f42c1", fontWeight: "600", marginTop: "25px" }}>2. How We Use the Information</h5>
                        <p style={{ color: "#555" }}>
                            The provided information is used exclusively to monitor price changes and product availability and notify users when their alert conditions are met.
                        </p>

                        <h5 style={{ color: "#6f42c1", fontWeight: "600", marginTop: "25px" }}>3. Affiliate Disclosure</h5>
                        <p style={{ color: "#555" }}>
                            Ahorrazone participates in the Amazon Affiliate Program. When users click on an Amazon link provided by Ahorrazone and make a purchase, we may earn a commission at no extra cost to the user.
                        </p>

                        <h5 style={{ color: "#6f42c1", fontWeight: "600", marginTop: "25px" }}>4. Cookies</h5>
                        <p style={{ color: "#555" }}>
                            We may use essential cookies required for basic website functionality. No tracking or advertising cookies are used.
                        </p>

                        <h5 style={{ color: "#6f42c1", fontWeight: "600", marginTop: "25px" }}>5. External Links</h5>
                        <p style={{ color: "#555" }}>
                            Our website may contain links to external websites, including Amazon. We are not responsible for the privacy practices of those websites.
                        </p>

                        <h5 style={{ color: "#6f42c1", fontWeight: "600", marginTop: "25px" }}>6. Changes to This Policy</h5>
                        <p style={{ color: "#555" }}>
                            We reserve the right to update this Privacy Policy at any time. Updates will be published on this page.
                        </p>

                        <h5 style={{ color: "#6f42c1", fontWeight: "600", marginTop: "25px" }}>7. Contact</h5>
                        <p style={{ color: "#555" }}>
                            If you have questions about this Privacy Policy, please contact us at: <strong>darkseams@gmail.com</strong>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Privacy;
