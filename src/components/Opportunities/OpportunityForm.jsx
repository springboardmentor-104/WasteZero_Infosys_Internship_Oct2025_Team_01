import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OpportunityForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    location: "",
    status: "open"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:4000/opportunities", form)
      .then(() => navigate("/opportunities"));
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: "20px 40px" }}>
        <Topbar />

        <h1 style={styles.header}>Create Opportunity</h1>

        <form onSubmit={handleSubmit} style={styles.form}>

          <label style={styles.label}>Title</label>
          <input
            type="text"
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
                type="text"
                name="duration"
                placeholder="Eg: 4 hours"
                style={styles.input}
                value={form.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <label style={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Eg: Marina Beach, Chennai"
            style={styles.input}
            value={form.location}
            onChange={handleChange}
          />

          <div style={styles.buttonRow}>
            <button
              type="button"
              style={styles.cancel}
              onClick={() => navigate("/opportunities")}
            >
              Cancel
            </button>

            <button type="submit" style={styles.createBtn}>Create</button>
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

  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },

  buttonRow: { display: "flex", gap: "15px" },

  cancel: {
    background: "white",
    border: "1px solid #aaa",
    padding: "12px 25px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  createBtn: {
    background: "#007f73",
    color: "white",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  }
};
