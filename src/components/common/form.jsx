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
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSearchClick = query => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.setState({ issearch: 2 });
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
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  handleMouseOver = e => {
    console.log("mouseover:" + e.address1);

    //console.log("address:" + address.address1);
    // address.setfocus();
    this.setState({
      selectedAddress: e.address1
      // searchQuery: address.address1,
    });
  };
  renderButton(label) {
    return (
      <button
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

  renderList(data1, valueProperty, textProperty,selectedAddress) {
    console.log("inside renderList");
    console.log(data1);
    const { data, errors } = this.state;
 const listItems = data1.map((item, index) => (

         <li
     //selectedItem={selectedAddress}
       tabIndex={index + 1}
       key={item._id}
           //onClick={this.handleAddressSelect(item)}
           //onMouseOver={this.handleMouseOver(item)}
          className={
             _.lowerCase(item.address1) === _.lowerCase(this.state.selectedAddress)
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
