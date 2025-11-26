import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OpportunityList from "./components/Opportunities/OpportunityList";
import OpportunityForm from "./components/Opportunities/OpportunityForm";
import OpportunityEdit from "./components/Opportunities/OpportunityEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpportunityList />} />
        <Route path="/opportunities" element={<OpportunityList />} />
        <Route path="/opportunities/create" element={<OpportunityForm />} />
        <Route path="/opportunities/edit/:id" element={<OpportunityEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
