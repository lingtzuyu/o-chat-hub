import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import ThemeProvider from './theme/ThemeProvider';

import TestPage from './testPages/TestPage';
import CardPage from './testPages/CardPage/CardPageSingle/CardPage';
import ProfilePage from './testPages/ProfilePage/ProfilePage';
import SignInSIde from './authPages/LoginPage/SignInSIde';
import RegisterSide from './authPages/SignupPage/RegisterSide';
import NotionConfirmPage from './testPages/IntegrationPage/NotionConfirmPage';

// 有點像是API的route
function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* switch 在 v6中被Routes取代的，以下皆是v6的寫法: https://reactrouter.com/en/v6.3.0/upgrading/v5#remove-redirects-inside-switch */}
        <Routes>
          <Route path="/login" element={<SignInSIde />} />
          <Route path="/signup" element={<RegisterSide />} />
          <Route path="/homepage" element={<TestPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notion" element={<NotionConfirmPage />} />

          {/* Navigate is like Redirect */}
          <Route path="*" element={<Navigate to="/homepage" replace />} />
        </Routes>
      </Router>
      {/* <AlertMessage /> */}
    </ThemeProvider>
  );
}

export default App;
