import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserChat from './userchat';
import InspectorChat from './inspectorchat';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the InspectorChat component */}
        <Route path="/inspector" element={<InspectorChat App={App} />} />
        
        {/* Route for the UserChat component */}
        <Route path="/" element={<UserChat />} />
      </Routes>
    </Router>
  );
};

export default App;
