import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeeSummary = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  // Configuration
  const termTargets = [46000, 46000, 46000]; // Targets for Term 1, Term 2, Term 3
  const grandTarget = termTargets.reduce((sum, target) => sum + target, 0); // Total: 138,000
  const [currentValue, setCurrentValue] = useState(49000); // Set to 38,000 for testing
  const concession = 2000; // Example concession value, adjust as needed
  const serviceTaxPaid = 1000; // Example service tax paid, adjust as needed
  const feeDeduction = 500; // Example deduction, adjust as needed
  const feeRefund = 0; // Example refund, adjust as needed
  const serviceTaxToBePaid = 500; // Example tax to be paid, adjust as needed

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
      {/* Hide scrollbar in Webkit browsers (Chrome, Safari) */}
      <style>
        {`
          .container-fluid::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Accordion
        className="mb-2 border-0 bg-light"
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="fee-details-content"
          id="fee-details-header"
          className="bg-white"
        >
          <Typography variant="subtitle1" className="me-3">Fee Details</Typography>
          <div className="ms-auto d-flex align-items-center flex-column">
            <div className="d-flex align-items-center mb-1">
              <span className="me-5" style={{ color: '#82808F' }}>
                {isAllCompleted ? 'Completed' : `Term ${activeTermIndex >= 0 ? activeTermIndex + 1 : 3}`}
              </span>
              <span
                className="text-danger fw-bold me-2"
                style={{ color: isAllCompleted ? '#28a745' : (activeTermIndex >= 0 && termProgress[activeTermIndex].paid >= termTargets[activeTermIndex] ? '#28a745' : '#dc3545') }}
              >
                {isAllCompleted ? 0 : (activeTermIndex >= 0 ? termProgress[activeTermIndex].remaining : 0)}
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
        </AccordionSummary>
        <AccordionDetails className="bg-light p-2">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, marginRight: '15px' }}>
              <Typography variant="body2" gutterBottom><strong>Course Fee:</strong> {grandTarget}</Typography>
              <Typography variant="body2" gutterBottom><strong>Add'I Amount:</strong> {additionalAmount}</Typography>
              <Typography variant="body2" gutterBottom><strong>Concession:</strong> {concession}</Typography>
              <Typography variant="body2" gutterBottom><strong>Net Fee:</strong> {netFee}</Typography>
              <Typography variant="body2" gutterBottom><strong>Service Tax Paid:</strong> {serviceTaxPaid}</Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="body2" gutterBottom><strong>Fee Paid:</strong> {currentValue}</Typography>
              <Typography variant="body2" gutterBottom><strong>Fee Deduction:</strong> {feeDeduction}</Typography>
              <Typography variant="body2" gutterBottom><strong>Fee Refund:</strong> {feeRefund}</Typography>
              <Typography variant="body2" gutterBottom><strong>Over All Due:</strong> {overallDue}</Typography>
              <Typography variant="body2" gutterBottom><strong>Service Tax to be Paid:</strong> {serviceTaxToBePaid}</Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="mb-2 border-0 bg-light"
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pocket-money-content"
          id="pocket-money-header"
          className="bg-white"
        >
          <Typography variant="subtitle1" className="me-3">Pocket Money</Typography>
          <div className="d-flex align-items-center">
            <span className="badge bg-danger text-white me-2">Balance</span>
            <span className="text-danger fw-bold">800</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="bg-light p-2">
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
          <Typography variant="body2">Pocket money balance details.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="mb-2 border-0 bg-light"
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="transport-details-content"
          id="transport-details-header"
          className="bg-white"
        >
          <Typography variant="subtitle1" className="me-3">Transport Details</Typography>
          <div className="d-flex align-items-center">
            <span className="badge bg-success text-white me-2">Status</span>
            <span className="text-success fw-bold">Assigned</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="bg-light p-2">
          <Typography variant="body2">Transport assignment details.</Typography>
          <Typography variant="body2">Transport assignment details.</Typography>
          <Typography variant="body2">Transport assignment details.</Typography>
          <Typography variant="body2">Transport assignment details.</Typography>
          <Typography variant="body2">Transport assignment details.</Typography>
          <Typography variant="body2">Transport assignment details.</Typography>
          <Typography variant="body2">Transport assignment details.</Typography>
          <Typography variant="body2">Transport assignment details.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="mb-2 border-0 bg-light"
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="refunds-content"
          id="refunds-header"
          className="bg-white"
        >
          <strong>Refunds</strong>
          <div className="d-flex align-items-center">
            <span className="badge bg-success text-white me-2">Pending</span>
            <span className="text-success fw-bold">0</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="bg-light p-2">
          <Typography variant="body2">Refund status details.</Typography>
          <Typography variant="body2">Refund status details.</Typography>
          <Typography variant="body2">Refund status details.</Typography>
          <Typography variant="body2">Refund status details.</Typography>
          <Typography variant="body2">Refund status details.</Typography>
          <Typography variant="body2">Refund status details.</Typography>
          <Typography variant="body2">Refund status details.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="mb-2 border-0 bg-light"
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="other-fee-heads-content"
          id="other-fee-heads-header"
          className="bg-white"
        >
          <Typography variant="subtitle1" className="me-3">Other Fee Heads</Typography>
          <div className="d-flex align-items-center">
            <span className="badge bg-success text-white me-2">Pending</span>
            <span className="text-success fw-bold">0</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="bg-light p-2">
          <Typography variant="body2">Other fee heads details.</Typography>
          <Typography variant="body2">Other fee heads details.</Typography>
          <Typography variant="body2">Other fee heads details.</Typography>
          <Typography variant="body2">Other fee heads details.</Typography>
          <Typography variant="body2">Other fee heads details.</Typography>
          <Typography variant="body2">Other fee heads details.</Typography>
          <Typography variant="body2">Other fee heads details.</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FeeSummary;