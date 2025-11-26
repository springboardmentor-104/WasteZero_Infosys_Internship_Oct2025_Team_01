import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function OpportunityEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    location: "",
    status: "open"
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/opportunities/${id}`)
      .then(res => setForm(res.data));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.put(`http://localhost:4000/opportunities/${id}`, form)
      .then(() => navigate("/opportunities"));
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: "20px 40px" }}>
        <Topbar />

        <h1 style={styles.header}>Edit Opportunity</h1>

        <form onSubmit={handleSubmit} style={styles.form}>

          <label style={styles.label}>Title</label>
          <input
            name="title"
            style={styles.input}
            value={form.title}
            onChange={handleChange}
          />

          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            style={styles.textarea}
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                name="date"
                style={styles.input}
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={styles.label}>Duration</label>
              <input
                name="duration"
                style={styles.input}
                value={form.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <label style={styles.label}>Location</label>
          <input
            name="location"
            style={styles.input}
            value={form.location}
            onChange={handleChange}
          />

          <label style={styles.label}>Status</label>
          <select
            name="status"
            style={styles.input}
            value={form.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          <div style={styles.buttonRow}>
            <button
              type="button"
              style={styles.cancel}
              onClick={() => navigate("/opportunities")}
            >
              Cancel
            </button>

            <button type="submit" style={styles.saveBtn}>Save Changes</button>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  header: { fontSize: "28px", marginBottom: "25px" },

  form: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "95%"
  },

  label: { marginBottom: "5px", display: "block", fontWeight: "600" },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "16px"
  },

  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    height: "120px",
    border: "1px solid #ccc",
    marginBottom: "20px"
  },

  row: { display: "flex", gap: "20px", marginBottom: "20px" },

  buttonRow: { display: "flex", gap: "15px" },

  cancel: {
    background: "white",
    border: "1px solid #aaa",
    padding: "12px 25px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  saveBtn: {
    background: "#007f73",
    color: "white",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  }
};
