import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  return (
  <React.Fragment>

       <input {...rest} name={name} id={name} className="form-control" />

      </React.Fragment>

   );
};

 export default Input;