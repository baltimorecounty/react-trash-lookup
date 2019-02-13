import React from "react";

const Recycle = props => {
  let classes = "fa fa-recycle";
 
  return (
    <i
     // onClick={props.onClick}
      style={{ textAlign:"center" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Recycle;
