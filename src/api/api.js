import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // json-server port
  headers: { "Content-Type": "application/json" },
});

export const getOpportunities = () => api.get("/opportunities");
export const getOpportunity = (id) => api.get(`/opportunities/${id}`);
export const createOpportunity = (data) => api.post("/opportunities", data);
export const updateOpportunity = (id, data) => api.put(`/opportunities/${id}`, data);
export const deleteOpportunity = (id) => api.delete(`/opportunities/${id}`);

export default api;
