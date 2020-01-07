import React from "react";

const ResetForm = ({ resetForm }) => (
  <p>
    Not the right address?{" "}
    <button type="button" onClick={resetForm}>
      Try Another Search
    </button>
  </p>
);

export default ResetForm;
