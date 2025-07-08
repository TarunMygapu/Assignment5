import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeeSummary = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event) => {
    setExpanded(expanded === panel ? null : panel);
  };

  // Configuration
  const termTargets = [46000, 46000, 46000]; // Targets for Term 1, Term 2, Term 3
  const grandTarget = termTargets.reduce((sum, target) => sum + target, 0); // Total: 138,000
  const [currentValue, setCurrentValue] = useState(4900); // Set to 4,900 for testing
  const concession = 2000; // Example concession value
  const serviceTaxPaid = 1000; // Example service tax paid
  const feeDeduction = 500; // Example deduction
  const feeRefund = 0; // Example refund
  const serviceTaxToBePaid = 500; // Example tax to be paid

  // Calculate cumulative progress and segment details
  const cumulativeTargets = termTargets.reduce((acc, target, index) => {
    acc.push((acc[index] || 0) + target);
    return acc;
  }, []);
  const termProgress = termTargets.map((target, index) => {
    const start = index === 0 ? 0 : cumulativeTargets[index - 1];
    const paid = Math.min(Math.max(0, currentValue - start), target);
    const remaining = index === termTargets.length - 1 ? Math.max(0, grandTarget - currentValue) : Math.max(0, target - paid);
    const segmentProgress = (paid / target) * 100;
    const isCompleted = currentValue >= cumulativeTargets[index];
    return { paid, remaining, target, segmentProgress, start, isCompleted };
  });

  // Determine active term and completion
  const activeTermIndex = termProgress.findIndex(tp => tp.remaining > 0 && tp.start <= currentValue);
  const isAllCompleted = currentValue >= grandTarget;

  // Determine segment colors based on currentValue ranges
  const getSegmentColors = () => {
    if (currentValue < 46000) {
      return ['#dc3545', '#e9ecef', '#e9ecef']; // Term 1 red, others gray
    } else if (currentValue >= 46000 && currentValue < 92000) {
      return ['#28a745', '#dc3545', '#e9ecef']; // Term 1 green, Term 2 red, Term 3 gray
    } else if (currentValue >= 92000 && currentValue < 138000) {
      return ['#28a745', '#28a745', '#dc3545']; // Terms 1 & 2 green, Term 3 red
    } else {
      return ['#28a745', '#28a745', '#28a745']; // All green
    }
  };

  const segmentColors = getSegmentColors();

  // Calculate derived values
  const additionalAmount = currentValue > cumulativeTargets[activeTermIndex >= 0 ? activeTermIndex : 0] ? currentValue - cumulativeTargets[activeTermIndex >= 0 ? activeTermIndex : 0] : 0;
  const netFee = termTargets[0] - concession; // Example net fee calculation
  const overallDue = isAllCompleted ? 0 : termProgress[activeTermIndex >= 0 ? activeTermIndex : 2].remaining;

  return (
    <div
      className="container-fluid p-0"
      style={{
        maxHeight: '300px', // Fixed height to prevent layout shift
        overflowY: 'auto', // Enable vertical scrolling
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
        msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
      }}
    >
      {/* Hide scrollbar and remove accordion button focus outline */}
      <style>
        {`
          .container-fluid::-webkit-scrollbar {
            display: none;
          }
          .accordion-button:focus {
            outline: none;
            box-shadow: none;
          }
        `}
      </style>
      <div className="accordion" id="feeSummaryAccordion">
        {/* Fee Details Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="fee-details-header">
            <button
              className={`accordion-button ${expanded !== 'panel1' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel1')}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E4F0' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* SVG and Fee Details */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#56555C',
                    gap: '8px',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.83958 1.83334C9.71133 1.83426 10.5418 2.25043 11.0625 2.94618L11.8976 4.05718C12.1625 4.40936 12.5832 4.61909 13.0232 4.62001H15.6165C19.0647 4.62001 20.8057 6.43409 20.8057 10.329L20.7801 14.8821C20.7792 18.5194 18.5187 20.7799 14.8795 20.7799H7.746C4.0995 20.7799 1.8335 18.5185 1.8335 14.8793V7.73026C1.8335 3.81701 3.57425 1.83334 7.00625 1.83334H8.83958ZM8.83866 3.20834H7.00625C4.34425 3.20834 3.2085 4.56134 3.2085 7.73026V14.8793C3.2085 17.798 4.82 19.4049 7.746 19.4049H14.8795C17.7982 19.4049 19.4051 17.798 19.4051 14.8793V14.8766L19.4307 10.3253C19.4307 7.20959 18.3619 5.99501 15.6165 5.99501H13.0223C12.1524 5.99409 11.3219 5.57884 10.7994 4.88401L9.9625 3.77118C9.69941 3.41826 9.27866 3.20926 8.83866 3.20834ZM15.3233 13.0284C15.7028 13.0284 16.0108 13.3364 16.0108 13.7159C16.0108 14.0954 15.7028 14.4034 15.3233 14.4034H7.31626C6.93676 14.4034 6.62876 14.0954 6.62876 13.7159C6.62876 13.3364 6.93676 13.0284 7.31626 13.0284H15.3233Z"
                      fill="#56555C"
                    />
                  </svg>
                  <span style={{ fontWeight: 500, fontSize: '16px' }}>Fee Details</span>
                </div>
                {/* Payments Button and Term Progress */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4rem',
                    marginLeft: 'auto',
                  }}
                >
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: '#EEEEEE',
                      color: '#3425FF',
                      height: '36px',
                      width: '6rem',
                      fontSize: '14px',
                      fontWeight: 400,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                      style={{ marginRight: '4px' }}
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Payment
                  </button>
                  <div className="d-flex align-items-center flex-column">
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-5" style={{ color: '#82808F' }}>
                        {isAllCompleted ? 'Completed' : `Term ${activeTermIndex >= 0 ? activeTermIndex + 1 : 3}`}
                      </span>
                      <span
                        className="fw-bold me-2"
                        style={{
                          color: isAllCompleted
                            ? '#28a745'
                            : activeTermIndex >= 0 && termProgress[activeTermIndex].paid >= termTargets[activeTermIndex]
                            ? '#28a745'
                            : '#dc3545',
                        }}
                      >
                        {isAllCompleted ? 0 : activeTermIndex >= 0 ? termProgress[activeTermIndex].remaining : 0}
                      </span>
                    </div>
                    <div
                      style={{
                        width: '200px',
                        height: '10px',
                        display: 'flex',
                        backgroundColor: '#e9ecef',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        position: 'relative',
                        isolation: 'isolate',
                      }}
                    >
                      {termTargets.map((_, index) => (
                        <div
                          key={index}
                          style={{
                            flex: 1,
                            backgroundColor: segmentColors[index],
                            borderRight: index < termTargets.length - 1 ? '1px solid #000' : 'none',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="fee-details-content"
            className={`accordion-collapse collapse ${expanded === 'panel1' ? 'show' : ''}`}
            aria-labelledby="fee-details-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body p-0" style={{ backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <p className="mb-2 "><strong>Course Fee:</strong> {grandTarget.toLocaleString()}</p>
                  <p className="mb-2"><strong>Add’l Amount:</strong> {additionalAmount.toLocaleString()}</p>
                  <p className="mb-2"><strong>Concession:</strong> {concession.toLocaleString()}</p>
                  <p className="mb-2"><strong>Net Fee:</strong> {netFee.toLocaleString()}</p>
                  <p className="mb-2"><strong>Service Tax Paid:</strong> {serviceTaxPaid.toLocaleString()}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="mb-2"><strong>Fee Paid:</strong> {currentValue.toLocaleString()}</p>
                  <p className="mb-2"><strong>Fee Deduction:</strong> {feeDeduction.toLocaleString()}</p>
                  <p className="mb-2"><strong>Fee Refund:</strong> {feeRefund.toLocaleString()}</p>
                  <p className="mb-2"><strong>Over All Due:</strong> {overallDue.toLocaleString()}</p>
                  <p className="mb-2"><strong>Service Tax to be Paid:</strong> {serviceTaxToBePaid.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pocket Money Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="pocket-money-header">
            <button
              className={`accordion-button ${expanded !== 'panel2' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel2')}
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ fontWeight: 500, fontSize: '16px', marginRight: '1rem' }}>Pocket Money</span>
                <div className="d-flex align-items-center">
                  <span className="badge bg-danger text-white me-2">Balance</span>
                  <span className="text-danger fw-bold">800</span>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="pocket-money-content"
            className={`accordion-collapse collapse ${expanded === 'panel2' ? 'show' : ''}`}
            aria-labelledby="pocket-money-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body bg-light p-2">
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
              <p className="mb-2">Pocket money balance details.</p>
            </div>
          </div>
        </div>

        {/* Transport Details Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="transport-details-header">
            <button
              className={`accordion-button ${expanded !== 'panel3' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel3')}
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ fontWeight: 500, fontSize: '16px', marginRight: '1rem' }}>Transport Details</span>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success text-white me-2">Status</span>
                  <span className="text-success fw-bold">Assigned</span>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="transport-details-content"
            className={`accordion-collapse collapse ${expanded === 'panel3' ? 'show' : ''}`}
            aria-labelledby="transport-details-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body bg-light p-2">
              <p className="mb-2">Transport assignment details.</p>
              <p className="mb-2">Transport assignment details.</p>
              <p className="mb-2">Transport assignment details.</p>
              <p className="mb-2">Transport assignment details.</p>
              <p className="mb-2">Transport assignment details.</p>
              <p className="mb-2">Transport assignment details.</p>
              <p className="mb-2">Transport assignment details.</p>
              <p className="mb-2">Transport assignment details.</p>
            </div>
          </div>
        </div>

        {/* Refunds Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="refunds-header">
            <button
              className={`accordion-button ${expanded !== 'panel4' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel4')}
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ fontWeight: 500, fontSize: '16px', marginRight: '1rem' }}>Refunds</span>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success text-white me-2">Pending</span>
                  <span className="text-success fw-bold">0</span>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="refunds-content"
            className={`accordion-collapse collapse ${expanded === 'panel4' ? 'show' : ''}`}
            aria-labelledby="refunds-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body bg-light p-2">
              <p className="mb-2">Refund status details.</p>
              <p className="mb-2">Refund status details.</p>
              <p className="mb-2">Refund status details.</p>
              <p className="mb-2">Refund status details.</p>
              <p className="mb-2">Refund status details.</p>
              <p className="mb-2">Refund status details.</p>
              <p className="mb-2">Refund status details.</p>
            </div>
          </div>
        </div>

        {/* Other Fee Heads Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="other-fee-heads-header">
            <button
              className={`accordion-button ${expanded !== 'panel5' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel5')}
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span style={{ fontWeight: 500, fontSize: '16px', marginRight: '1rem' }}>Other Fee Heads</span>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success text-white me-2">Pending</span>
                  <span className="text-success fw-bold">0</span>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="other-fee-heads-content"
            className={`accordion-collapse collapse ${expanded === 'panel5' ? 'show' : ''}`}
            aria-labelledby="other-fee-heads-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body bg-light p-2">
              <p className="mb-2">Other fee heads details.</p>
              <p className="mb-2">Other fee heads details.</p>
              <p className="mb-2">Other fee heads details.</p>
              <p className="mb-2">Other fee heads details.</p>
              <p className="mb-2">Other fee heads details.</p>
              <p className="mb-2">Other fee heads details.</p>
              <p className="mb-2">Other fee heads details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeSummary;