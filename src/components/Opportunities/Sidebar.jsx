import React from "react";
import logo from "/wastezero_logo.png";  // From public folder

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logoSection}>
        <img src={logo} alt="WasteZero Logo" style={styles.logo} />
        <h2 style={styles.logoText}>WasteZero</h2>
        <p style={styles.subtitle}>SMART WASTE PICKUP & RECYCLING PLATFORM</p>
      </div>

      <div style={styles.menu}>
        <div style={styles.item}>Dashboard</div>
        <div style={styles.item}>Schedule Pickup</div>
        <div style={{ ...styles.item, ...styles.active }}>Opportunities</div>
        <div style={styles.item}>Messages</div>
        <div style={styles.item}>My Impact</div>
        <div style={styles.item}>My Profile</div>
        <div style={styles.item}>Settings</div>
        <div style={styles.item}>Help & Support</div>
        <div style={styles.item}>No Access</div>
        <div style={{ ...styles.item, marginTop: "25px" }}>Logout</div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    backgroundColor: "#0d3b29",
    color: "white",
    padding: "25px",
    minHeight: "100vh"
  },
  logoSection: { textAlign: "center" },
  logo: { width: "80px" },
  logoText: { marginTop: "8px", fontSize: "24px", fontWeight: "bold" },
  subtitle: { fontSize: "12px", opacity: "0.7", marginBottom: "20px" },
  menu: { marginTop: "30px" },
  item: {
    padding: "12px 8px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px"
  },
  active: {
    background: "rgba(255,255,255,0.15)"
  }
};
