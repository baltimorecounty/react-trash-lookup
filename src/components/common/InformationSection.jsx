import React from 'react';

import { Button } from 'reactstrap';
const InformationSection = props => (
  <div className="information-section">
    <h3>Your Schedule</h3>
    <p>showing collection schedule for:</p>
    <em>{props.address}</em>
    <p>
      Not the right address?{' '}
      <Button type="button" color="link" onClick={props.resetForm}>
        Try another search?
      </Button>
    </p>
  </div>
);

export default InformationSection;
