import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import StudentProfile from './Components/StudentProfile';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StudentsLayout from './Components/StudentsLayout'; // Student layout (includes student routing)
import Information from './Components/Information';


function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const handleProfileToggle = (expanded) => {
    setIsProfileExpanded(expanded);
  };

  return (
    <Router>
      <AppContent
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        isProfileExpanded={isProfileExpanded}
        handleProfileToggle={handleProfileToggle}
      />
    </Router>
  );
}

const AppContent = ({ isSidebarExpanded, setIsSidebarExpanded, isProfileExpanded, handleProfileToggle }) => {
  const location = useLocation();
  const isStudentRoute = location.pathname.startsWith('/students');

  useEffect(() => {
    if (!isStudentRoute) {
      handleProfileToggle(false);
    }
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#F6F8F9', position: 'relative' }}>
      <header className="border-bottom" style={{ height: '8vh', backgroundColor: '#f0f8ff' }}>
        <Header />
      </header>

      <main className="d-flex flex-row" style={{ height: '92vh', position: 'relative' }}>
        {/* Sidebar */}
        <aside
          className="border-end"
          style={{
            width: isSidebarExpanded ? '15vw' : '5vw',
            backgroundColor: '#f5f5f5',
            transition: 'width 0.3s ease',
            zIndex: 1,
          }}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
        >
          <Sidebar isExpanded={isSidebarExpanded} />
        </aside>

        {/* Main Content Area */}
        <div className="main-container d-flex flex-row" style={{ flexGrow: 1, position: 'relative', overflow: 'visible', width:'95vw' }}>
          <div
            className="content-area d-flex flex-column"
            style={{
              flexGrow: 1,
              padding: '10px',
              height: '50%',
              transition: 'transform 0.3s ease',
              transform: isProfileExpanded ? 'translateY(56%)' : 'translateY(0)',
              position: 'relative',
              width:'100%'
            }}
          >
            <Routes>
              <Route path="/students/*" element={<StudentsLayout />} />
              <Route path="/application/*" element={<div> Application Layout </div>} />
              <Route path="/employee" element={<div>Employee</div>} />
              <Route path="/fleet" element={<div>Fleet</div>} />
              <Route path="/warehouse" element={<div>Warehouse</div>} />
              <Route path="/sms" element={<div>SMS</div>} />
              <Route path="/question-bank" element={<div>Question-bank</div>} />
              <Route path="/assets-management" element={<div>Assets Management</div>} />
              <Route path="/payment-services" element={<div>Payment Services</div>} />
              <Route path="/cctv" element={<div>CCTV</div>} />
              <Route path="/hrms" element={<div>HRMS</div>} />
              <Route path="/" element={<div></div>} />
            </Routes>
          </div>

          {/* Student Profile (Floating Panel) */}
          {isStudentRoute && (
            <div style={{ position: 'absolute', top: 0, right: 0, width:'100%' }}>
              <StudentProfile onToggle={handleProfileToggle} isExpanded={isProfileExpanded} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;