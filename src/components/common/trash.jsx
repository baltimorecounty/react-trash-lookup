import React from "react";

const Trash = props => {
  let classes = "fa fa-trash";

  return (
    <i
    //   onClick={props.onClick}
    //   style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Trash;
