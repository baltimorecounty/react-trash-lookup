import React from "react";
import _ from "lodash";

 class ListGroup extends React.Component{

   render(){

   // console.log("selectedItem:" + selectedItem);

   const listItems = items.map((item, index) => (
    <li
      tabIndex={index + 1}
      onClick={() => onItemSelect(item)}
      key={item[valueProperty]}
      onMouseOver={() => onMouseOver(item)}
      onKeyDown={e => onKeyDown(e.keyCode)}
      ref={item => {
        this.itemSel = item;
      }}
      className={
        _.lowerCase(item.address1) === _.lowerCase(selectedItem)
          ? "list-group-item active"
          : "list-group-item"
      }
    >
      {" "}
      {/* onMouseOver={() => onMouseOver(item)} */}
      {item[textProperty]}
    </li>
  ));
  return <ul className="list-group">{listItems}</ul>;
}
};

 // ListGroup.defaultProps = {
//   textProperty: "address1",
//   valueProperty: "_id"
// };
}
export default ListGroup;