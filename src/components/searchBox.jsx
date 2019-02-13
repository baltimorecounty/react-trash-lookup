import React from "react";
import "../App.css";
import ContainerBg from "./common/containerbg";
import Search from "./common/search";
const SearchBox = ({ name,value, onChange, onClick, onKeyDown,error }) => {
  //console.log("value:" + value);
  return (
    <React.Fragment>
    <div className="p-3 mb-2 bg-secondary text-white">
      <div className="input-group mb-3">
        <input
          name ={name} 
          type="text"
          className="form-control"
          placeholder="please type 1"
          value={value}
         // onChange={e => onChange(e.currentTarget.value)}
          onChange ={onChange}
          onKeyDown={e => onKeyDown({value})}
          error ={error}
        />
 
        <div  className="input-group-append">
        <button onClick={e => onClick()} className="btn btn-outline">
         <Search />
        </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>} 
    </div>
    </React.Fragment>
  );
};
export default SearchBox;
