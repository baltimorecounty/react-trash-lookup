import PropTypes from "prop-types";
import React from "react";

const ResetForm = ({ resetForm }) => (
  <p>
    Not the right address?{" "}
    <button type="button" onClick={resetForm}>
      Try Another Search
    </button>
  </p>
);

ResetForm.propTypes = {
  /** The function that will allow you to reset the form */
  resetForm: PropTypes.func.isRequired
};

export default ResetForm;
