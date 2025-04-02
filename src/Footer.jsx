import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#222",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        position: "relative",
        bottom: "0",
    
      }}
    >
      <p style={{ margin: "0", fontSize: "14px" }}>
        © {new Date().getFullYear()} PrajwolMerce. All rights reserved.
      </p>
      <div style={{ marginTop: "10px" }}>
        <a
          href="#"
          style={{
            color: "#fff",
            textDecoration: "none",
            margin: "0 10px",
            fontSize: "16px",
          }}
        >
          Privacy Policy
        </a>
        |
        <a
          href="#"
          style={{
            color: "#fff",
            textDecoration: "none",
            margin: "0 10px",
            fontSize: "16px",
          }}
        >
          Terms of Service
        </a>
      </div>
    </div>
  );
};

export default Footer;
