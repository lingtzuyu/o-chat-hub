import React from 'react';

// swithc is already replaced by Routes https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

import LoginPage from './authPages/LoginPage/LoginPage';
import SignupPage from './authPages/SignupPage/SignupPage';
import ProfilePage from './Profile/ProfilePage';

// 有點像是API的route
function App() {
  return (
    <>
      <Router>
        {/* switch 在 v6中被Routes取代的，以下皆是v6的寫法: https://reactrouter.com/en/v6.3.0/upgrading/v5#remove-redirects-inside-switch */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Navigate is like Redirect */}
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
