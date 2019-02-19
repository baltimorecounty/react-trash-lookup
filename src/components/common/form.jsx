import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Search from "../common/search";
import _ from "lodash";
//import Select from "./select";
//import "../App.css";
class Form extends Component {
  state = {
    data: {},
    errors: {},
    selectedAddress: ""
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSearchClick = ({ currentTarget: input }) => {
    console.log("inside button clicked");
    const data = { ...this.state.data };
    const errors = this.validate();
    this.setState({ errors: errors || {} });
   // if (errors) return;
    data["eventType"] = 1;
    data[input.name] = input.value;

   
    this.setState({ data });
    if (errors) return;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    const data = { ...this.state.data };
    data["selectedAddress"] = '';
    if (errorMessage) {
      errors[input.name] = errorMessage;
     // data["issearch"] = 0;
    } else {
   
      delete errors[input.name];
     // data["issearch"] = 1;
      data["searchQuery"] = input.value;
    }
    data["eventType"] = 0;
    data[input.name] = input.value;
    this.setState({ data, errors });
    console.log(" errorMessage");
    console.log(errorMessage);
  };
  handleAddressSelect = address => {
    const data = { ...this.state.data };
    console.log("inside handleAddressSelect");
    //console.log(address);
   // data["issearch"] = 3;
    data["searchQuery"] = "";
    data["searchboxname"] = "";
    data["selectedAddress"] = address.address1;
    data["eventType"] = 2;
     console.log(  data["selectedAddress"]);
    this.setState({ data });
  };

  handleMouseOver = e => {
    // console.log("mouseover:" + i.address1);
    // console.log(e.address1);
    const data = { ...this.state.data };
    // console.log(test);
   // data["issearch"] = 1;
    // data["searchQuery"] = e.address1;
    data["selectedAddress"] = e.address1;
    // console.log(test);
    this.setState({ data });

    //this.setState({
    //  selectedAddress: e.address1

    // });
    //console.log("address:" + address.address1);
    // address.setfocus();
    //this.setState({
    // selectedAddress: e.address1
    //  // searchQuery: address.address1,
    // });
  };
  renderButton(label) {
    return (
      <button
          type="button"
        className="btn btn-outline"
       // disabled={this.validate()}
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
      //  tabIndex={index + 1}
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

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        // error={errors[name]}
        className="form-control"
        placeholder="please type 1"
      />
    );
  }
}

export default Form;
