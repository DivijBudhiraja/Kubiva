import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IndividualFlow from './pages/IndividualFlow/IndividualFlowContainer';
import BusinessFlow from './pages/BusinessFlow/BusinessFlowContainer';
import StartupFlow from './pages/StartupFlow/Container';
import InvestorDashboard from './pages/InvestorFlow/InvestorDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/borrower/individual" element={<IndividualFlow />} />
          <Route path="/borrower/business" element={<BusinessFlow />} />
          <Route path="/borrower/startup" element={<StartupFlow />} />
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
