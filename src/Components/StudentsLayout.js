import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import StudentInfoHeader from './StudentInfoHeader';
import FeeSummary from './FeeSummary';
import Information from './Information';

// Placeholder components for student routes
const PaymentsPage = () => <div>Payments Page</div>;
const TransportPage = () => <div>Transport Page</div>;
const AcademicsPage = () => <div>Academics Page</div>;
const AlertsPage = () => <div>Alerts Page</div>;
const HistoryPage = () => <div>History Page</div>;
const RoomAllotmentPage = () => <div>Room Allotment Page</div>;
const IssueFormsPage = () => <div>Issue Forms Page</div>;
const CertificatesPage = () => <div>Certificates Page Content</div>;

const StudentsLayout = () => {
  const location = useLocation();
  const showStudentInfoHeader = location.pathname.endsWith('/studentsprofile');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: '#F6F8F9',
      }}
    >
      {/* Left Section (73%) */}
      <div style={{ width: '73%', padding: '10px' }}>
        <MainNavbar />
        
        {/* Only show StudentInfoHeader on /students/studentsprofile */}
        {showStudentInfoHeader && <StudentInfoHeader />}

        <div style={{ padding: '10px' }}>
          <Routes>
        
            <Route path="studentsprofile" element={<FeeSummary />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="transport" element={<TransportPage />} />
            <Route path="academics" element={<AcademicsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="roomallotment" element={<RoomAllotmentPage />} />
            <Route path="issueforms" element={<IssueFormsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
          </Routes>
        </div>
      </div>

      {/* Right Section (27%) */}
      <div
        style={{
          width: '27%',
          padding: '10px',
          backgroundColor: '#F6F8F9',
          overflowY: 'auto',
        }}
      >
        <Information/>
      </div>
    </div>
  );
};

export default StudentsLayout;