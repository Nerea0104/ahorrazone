import React, { useState } from "react";
import { Button } from "react-bootstrap";

function HoverButton({ children, variant, style, onClick, disabled }) {
    const [hover, setHover] = useState(false);

    const hoverStyle = {
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover
            ? "0 12px 25px rgba(111,66,193,0.4)"
            : "0 10px 20px rgba(111,66,193,0.3)",
        transition: "all 0.2s ease-in-out",
        ...style,
    };

    return (
        <Button
            variant={variant}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={hoverStyle}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}

export default HoverButton;
