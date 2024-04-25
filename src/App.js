import React from 'react';
import UserChat from './userchat';
import InspectorChat from './inspectorchat';

const App = () => {
  // Assuming you have a way to determine the user type, such as a state variable or context
  const isInspector = window.location.pathname === '/inspector'; // Check current URL path

  return (
    <div>
      {isInspector ? <InspectorChat /> : <UserChat />}
    </div>
  );
};

export default App;
