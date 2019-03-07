import React from "react";

const Recycle = props => {
  let classes = "fa fa-recycle fa-fw";
 
  return (
    <i
     // onClick={props.onClick}
     // style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Recycle;
