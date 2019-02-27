import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Search from "../common/search";
import _ from "lodash";
//import Select from "./select";
//import "../App.css";
class Form2 extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleSearchClick = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    data["eventType"] = 1;
    data["searchQuery"] = data["searchboxname"];
    data["selectedAddress"] = "";

    this.setState({ data });
     //this.doSearch(data["searchQuery"]);
  };
  validate = () => {
    //console.log("inside validate()");
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    //console.log(error);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    //console.log("inside validateProperty");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    const data = { ...this.state.data };

    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];
    

    data[input.name] = input.value;
    data["searchQuery"] = input.value;
    data["selectedAddress"] = "";
   data["eventType"] = 0;

    this.setState({ data, errors });
    //this.doChange(input.value);

    // console.log(" errorMessage");
    // console.log(errorMessage);
  };
  handleAddressSelect = address => {
    const data = { ...this.state.data };
    //console.log("inside handleAddressSelect");
    //console.log(address);
    data["searchQuery"] = address.address1;
    data["selectedAddress"] = "";
    data["searchboxname"] = "";
    data["eventType"] = 2;
    this.setState({ data });
    // console.log("Show ---data");
    // console.log(data);
  };

  handleMouseOver = e => {
    const data = { ...this.state.data };
    data["selectedAddress"] = e.address1;
    this.setState({ data });
  };
  renderButton(label) {
    return (
      <button
        type="button"
        className="btn btn-outline"
        disabled={this.validate()}
        onClick={this.handleSearchClick}
      >
        <Search />
      </button>
    );
  }

  renderError(name) {
    const { errors } = this.state;
    return (
      errors[name] && <div className="alert alert-danger">{errors[name]}</div>
    );
  }

  renderList(dataList, valueProperty, textProperty, selectedAddress) {
    //  console.log("inside renderList");
    // console.log(data1);
    //const { data, errors } = this.state;
    const listItems = dataList.map((item, index) => (
      <li
        key={item._id}
        onClick={() => this.handleAddressSelect(item)}
        onMouseOver={() => this.handleMouseOver(item)}
        className={
          _.lowerCase(item.address1) === _.lowerCase(selectedAddress)
            ? "list-group-item active"
            : "list-group-item"
        }
      >
        {item.address1}
      </li>
    ));
    return <ul className="list-group">{listItems}</ul>;
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    // console.log(data);
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        className="form-control"
        placeholder="please type 1"
        //error={errors[name]}
      />
    );
  }
}

export default Form2;
