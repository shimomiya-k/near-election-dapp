// 以下を追加してください
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./src/pages/home";
import Candidate from "./src/pages/candidate";
import Voter from "./src/pages/voter";

// Change with url
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/voter" element={<Voter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
