import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OpportunityList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/opportunities")
      .then(res => setList(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      axios.delete(`http://localhost:4000/opportunities/${id}`)
        .then(() => {
          setList(prev => prev.filter(item => item.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: "20px 40px" }}>
        <Topbar />

        <h1 style={styles.header}>Volunteer Opportunities</h1>

        {/* Stats Cards */}
        <div style={styles.cardRow}>
          <div style={styles.card}>
            <div style={styles.num}>{list.length}</div>
            <div>Total Opportunities</div>
          </div>

          <div style={styles.card}>
            <div style={styles.num}>{list.filter(x => x.status === "open").length}</div>
            <div>Open Opportunities</div>
          </div>

          <div style={styles.card}>
            <div style={styles.num}>{list.filter(x => x.status === "closed").length}</div>
            <div>Closed Opportunities</div>
          </div>

          <div style={styles.card}>
            <div style={styles.num}>0</div>
            <div>Pending Approvals</div>
          </div>
        </div>

        <button
          style={styles.createButton}
          onClick={() => navigate("/opportunities/create")}
        >
          + Create Opportunity
        </button>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((o) => (
              <tr key={o.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{o.title}</td>
                <td style={styles.tableCell}>{o.description}</td>
                <td style={styles.tableCell}>{o.date}</td>
                <td style={styles.tableCell}>{o.duration}</td>
                <td style={styles.tableCell}>{o.location}</td>

                <td style={styles.tableCell}>
                  <span
                    style={o.status === "open" ? styles.openTag : styles.closedTag}
                  >
                    {o.status}
                  </span>
                </td>

                <td style={styles.tableCell}>
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.editBtn}
                      onClick={() => navigate(`/opportunities/edit/${o.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(o.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

const styles = {
  header: { fontSize: "28px", marginBottom: "20px" },

  /* CARD STYLING */
  cardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  num: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#007f73",
    marginBottom: "6px",
  },

  createButton: {
    background: "#007f73",
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "16px",
  },

  /* TABLE STYLING */
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    textAlign: "left",
    padding: "10px 15px",
    fontWeight: "600",
    fontSize: "15px",
    background: "#f0f0f0",
  },

  tableRow: {
    background: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    borderRadius: "10px",
  },

  tableCell: {
    padding: "14px 18px",
    fontSize: "15px",
  },

  openTag: {
    background: "#007f73",
    padding: "6px 15px",
    color: "white",
    borderRadius: "8px",
  },

  closedTag: {
    background: "#d9534f",
    padding: "6px 15px",
    color: "white",
    borderRadius: "8px",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  editBtn: {
    background: "#007f73",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#d9534f",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  }
};
