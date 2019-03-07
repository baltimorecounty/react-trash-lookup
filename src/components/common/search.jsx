import React from "react";

const Search = props => {
  let classes = "fa fa-search";

  return (
    <i
     onClick={props.onClick}
       style={{ cursor: "pointer" }} 
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Search;
