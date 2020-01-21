import Autocomplete from "react-autocomplete";
import React from "react";

const RenderList = ({ dataList = [], selectedAddress, onSelect, name }) => {
  const items = dataList.map((item, index) => ({
    id: item._id,
    label: item.address1
  }));

  const handleClick = () => {
    onSelect(selectedAddress, true);
  };

  return (
    <div className="p-3 mb-2 bg-secondary text-white">
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
        renderInput={({ name: nameFromProps, ...rest }) => (
          <input id={name} name={name} {...rest} />
        )}
        value={selectedAddress}
        onChange={e => onSelect(e.target.value, false)}
        onSelect={value => onSelect(value, true)}
      />
      <button type="button" onClick={handleClick}>
        <i className="fa fa-search" aria-hidden="true" />
        <span className="sr-only">Get Schedule</span>
      </button>
    </div>
  );
};
export default RenderList;
