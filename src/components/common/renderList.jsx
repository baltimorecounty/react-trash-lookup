import Autocomplete from "react-autocomplete";
import React from "react";

const RenderList = ({ dataList, selectedAddress, onSelect }) => {
  const items = dataList.map((item, index) => ({
    id: item._id,
    label: item.address1
  }));

  return (
    <div className="p-3 mb-2 bg-secondary text-white">
      <div className="inner-addon right-addon">
        <Autocomplete
          getItemValue={item => item.label}
          items={items}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.id}
              style={{ background: isHighlighted ? "lightgray" : "black" }}
            >
              {item.label}
            </div>
          )}
          value={selectedAddress}
          onChange={e => onSelect(e.target.value, false)}
          onSelect={value => onSelect(value, true)}
        />
        <i className="fa fa-search" />
      </div>
    </div>
  );
};
export default RenderList;
