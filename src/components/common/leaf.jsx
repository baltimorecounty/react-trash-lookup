import React from "react";

const Leaf = props => {
  let classes = "fa fa-leaf fa-fw";

  return (
    <i
     // onClick={props.onClick}
     // style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    
    />
  );
};

export default Leaf;
