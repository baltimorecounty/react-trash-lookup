import React from "react";
import ResetForm from "./ResetForm";

const InformationSection = ({ address, resetForm }) => (
  <div className="information-section">
    <h3>Your Schedule</h3>
    {address && (
      <React.Fragment>
        <p>Showing collection schedule for:</p>
        <em>{address}</em>
        <ResetForm resetForm={resetForm} />
      </React.Fragment>
    )}
  </div>
);

export default InformationSection;
