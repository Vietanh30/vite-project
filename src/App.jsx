import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import DataTableDemo from "./pages/TableDemo/TableDemo";
import Test from "./pages/TableDemo/test";


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tableDemo" element={<DataTableDemo />} />
        <Route path="/test" element={<Test />} />

      </Routes>
    </Router>
  );
}

export default App;
