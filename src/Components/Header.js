import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Assets/Logo.png';
import Profile from '../Assets/Profile.png';
import { Box, InputAdornment } from '@mui/material';

const Header = () => {
  return (
    <div
      className="header-container d-flex justify-content-between align-items-center border-bottom px-3"
      style={{ backgroundColor: '#F6F8F9', height: '8vh', width: '100%' }}
    >
      {/* Left side: Logo and Search */}
      <div className="header-left d-flex align-items-center" style={{ gap: '110px' }}>
        <div className="header-logo fw-bold">
          <figure className="mb-0">
            <img
              src={logo}
              alt="Sri Chaitanya Educational Institutions"
              className="logo-img"
              style={{ height: '30px' }}
            />
          </figure>
        </div>
        <Box
          className="search-box"
          sx={{
            width: 400,
            backgroundColor: '#FFFFFF',
            height: '5vh',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #EBECEF',
            padding: '0 8px',
            '& input::placeholder': {
              color: '#00000040',
              fontSize: '16px',
            },
          }}
        >
          <InputAdornment position="start" className="ms-2 search-icon">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5056 14.4612L15.5047 14.4603L11.5088 10.446C12.333 9.39036 12.8287 8.05883 12.8287 6.61858C12.8287 3.15112 10.0077 0.330078 6.54033 0.330078C3.07299 0.330078 0.251953 3.15112 0.251953 6.61846C0.251953 10.0797 3.07299 12.9007 6.54033 12.9007C7.91898 12.9007 9.18902 12.4534 10.225 11.6964L14.2397 15.7172L14.2402 15.7177C14.4073 15.8913 14.6396 15.9764 14.8757 15.9764C15.3997 15.9764 15.7507 15.5761 15.7507 15.0831C15.7507 14.8397 15.6649 14.6269 15.5056 14.4612ZM1.5283 6.61846C1.5283 3.85436 3.77611 1.60642 6.54033 1.60642C9.30443 1.60642 11.5462 3.85424 11.5462 6.61846C11.5462 9.3765 9.30443 11.6243 6.54033 11.6243C3.77611 11.6243 1.5283 9.3765 1.5283 6.61846Z"
                fill="#A1A5B0"
                stroke="#A1A5B0"
                strokeWidth="0.125984"
              />
            </svg>
          </InputAdornment>
          <input
            type="text"
            placeholder="Ask for anything"
            className="search-input"
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 400,
              backgroundColor: 'transparent',
              width: '100%',
            }}
          />
        </Box>
      </div>

      {/* Right side: User Profile */}
      <div className="header-right d-flex align-items-center gap-4">
        <div className="notification-icon">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6251 18.2083H20.8334L19.3699 16.7449C18.9731 16.348 18.7501 15.8097 18.7501 15.2484V11.9583C18.7501 9.23705 17.0109 6.92197 14.5834 6.06397V5.70833C14.5834 4.55774 13.6507 3.625 12.5001 3.625C11.3495 3.625 10.4167 4.55774 10.4167 5.70833V6.06397C7.98926 6.92197 6.25008 9.23705 6.25008 11.9583V15.2484C6.25008 15.8097 6.02711 16.348 5.63022 16.7449L4.16675 18.2083H9.37508M15.6251 18.2083V19.25C15.6251 20.9759 14.226 22.375 12.5001 22.375C10.7742 22.375 9.37508 20.9759 9.37508 19.25V18.2083M15.6251 18.2083H9.37508"
              stroke="#3F3F46"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="user-info d-flex align-items-center gap-1 fw-semibold">
          <figure className="user-avatar mb-0 d-flex align-items-center me-2">
            <img
              src={Profile}
              alt="User"
              className="profile-img"
              style={{ height: '30px', borderRadius: '50%' }}
            />
          </figure>
          <div className="user-text d-flex flex-row align-items-center">
            <div className="user-details d-flex flex-column align-items-start fw-semibold me-3">
              <span style={{ color: '#344054', fontSize: '14px', fontWeight: 600 }}>HYD 256789</span>
              <span style={{ color: '#676767', fontSize: '12px', fontWeight: 400 }}>Cashier</span>
            </div>
            <div className="dropdown-icon">
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 7.5L10.5 12.5L15.5 7.5"
                  stroke="#344054"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;