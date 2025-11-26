import React from "react";

export default function Topbar() {
  return (
    <div style={styles.topbar}>
      <input type="text" placeholder="Search" style={styles.search} />
    </div>
  );
}

const styles = {
  topbar: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "40px",
    paddingTop: "20px",
    marginBottom: "10px"
  },
  search: {
    padding: "12px 18px",
    width: "260px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px"
  }
};
