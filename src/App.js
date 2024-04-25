import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserChat from './userchat';
import InspectorChat from './inspectorchat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/inspector" element={<InspectorChat />} />
        <Route path="/" element={<UserChat />} />
      </Routes>
    </Router>
  );
};

export default App;
