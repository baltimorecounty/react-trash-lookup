import React from "react";
import "../App.css";

const SearchBox = ({ value, onChange, onClick, onBlur }) => {
  //console.log("value:" + value);
  return (
    <React.Fragment>
      <div className="flexContainer">
        <input
          type="text"
          name="query1"
          className="form-control  my-1"
          placeholder="please type 1"
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />

        <button onClick={e => onClick()} className="btn  btn-sm">
          Search
        </button>
      </div>
    </React.Fragment>
  );
};
export default SearchBox;
