import React from 'react';

const InformationSection = props => (
  <div className="information-section">
    <h3>Your Schedule</h3>
    <p>Showing collection schedule for:</p>
    <em>{props.address}</em>
    <p>
      Not the right address?{' '}
      <button type="button" color="link" onClick={props.resetForm}>
        Try another search?
      </button>
    </p>
  </div>
);

export default InformationSection;
