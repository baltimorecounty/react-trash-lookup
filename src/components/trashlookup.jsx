import React, { Component } from "react";
//import Joi from "joi-browser";
import PostData from "../Data/street.json";
import SearchBox from "./searchBox";
//import _ from "lodash";
import ListGroup from "./listGroup";
import Trash from "./common/trash";
import Leaf from "./common/leaf";
import Recycle from "./common/recycle";
import { getTrashService } from "../services/trashService";

class TrashLookUp extends Component {
  constructor(props) {
    super(props);
    //   this.itemSel = React.createRef();
    // }

    this.state = {
      services: getTrashService(),
      searchQuery: "",
      addresses: PostData,
      issearch: 0,
      selectedAddress: null,
      listData: null,
      searchinputtype: { searchboxname: "" },
      errors: {}
    };
  }
  // schema = { searchboxname: Joi.string().required() };
  componentDidMount() {
    //  console.log("inside didmount");
    //const fakeAddress = [{ _id: "", name: "" }, ...getFakeAddress()];
    // this.setState({ searchQuery: this.ref.searchboxinput.value });
  }
  componentDidUpdate() {
    // console.log("inside componentDidUpdate" + this.state.searchQuery);
    //this._itemfocus.focus();
  }
  handleAddressSelect = address => {
    // console.log("address:" + address.address1);
    this.setState({
      //selectedAddress: address.address1,
      searchQuery: "",
      issearch: 3
    });
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
  validate = () => {
    // const options = { abortEarly: false };

    // const { error } = Joi.validate(
    //   this.state.searchinputtype,
    //   this.schema,
    //   options
    // );

    // if (!error) return null;

    // //console.log("not here in validate()");
    // const errors = {};
    // for (let item of error.details) errors[item.path[0]] = item.message;

    // return error;

    //---- for previous validation logic
    const errors = {};
    if (this.state.searchinputtype.searchboxname.trim() === "")
      errors.searchboxname = "Search string is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = input => {
    //  const obj ={[input.name]: input.value};
    //  const schema ={[input.name]: this.schema[input.name]};
    //  console.log(obj);
    //  console.log(schema);
    //  console.log(Joi.validate(obj,schema));
    //  const {error} =  Joi.validate(obj,schema);

    //  if (error) return null;
    //  return error.details;

    //  console.log("inside vlaidateProperty");
    if (input.name === "searchboxname") {
      if (input.value.trim() === "") return "search is required";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    //console.log("handel Search:" + input.value);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const searchinputtype = { ...this.state.searchinputtype };
    searchinputtype[input.name] = input.value;
    this.setState({ searchinputtype, errors });
    //this.setState({ errors:  {} });
    if (input.value.length === 0) {
      this.setState({
        searchQuery: input.value,
        selectedAddress: null,
        issearch: 0
      });
    } else {
      this.setState({
        searchQuery: input.value,
        selectedAddress: null,
        issearch: 1
      });
    }
  };

  handleSearchClick = query => {
    console.log("inside searchClicked");

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    console.log("before return");
    if (errors) return;

    /*  if (this.props.searchbox === "") {
      // if (this.state.searchQuery.length === 0) {
      this.setState({ errors: errors || {} });
      console.log("search criteria misssing");
    } else { */
    this.setState({ issearch: 2 });
    // }
    console.log("button is click");
  };
  handleKeyDown = query => {
    console.log("value:" + query);
    if (query !== 0) {
    }
    // if (this.props.value.length === 0) {
    //   this.setState({ searchQuery: this.props.value, selectedAddress: null, issearch: 0 });
    // } else {
    //   this.setState({ searchQuery: this.props.value, selectedAddress: null, issearch: 1 });
    // }
    // const errors = this.validate();
    // console.log("errrors:" + errors);
    // this.setState({ errors: errors || {} });
    //   if(errors) return;
    // console.log("keydown!!!" + e);
    //  console.log("selectedAddress---" + this.state.selectedAddress);
  };
  handleKeyDown1 = e => {
    console.log("keydown1");
    //console.log("address:" + address.address1);
    //this.setState({selectedAddress: address.address1 });
    //this.setState({ ListData: address.address1 });
  };

  displayText() {
    const issearch = this.state.issearch;
    const selectedAddress = this.state.selectedAddress;
    if (issearch === 3) {
      let message = [];
      message.push(<h6>Your Schedule</h6>);
      message.push("showing collection schedule for:");
      message.push(<h6> {selectedAddress} </h6>);

      const displayMessage = message.map((data, index) => {
        return <span key={index}>{data}</span>;
      });

      return <div>{displayMessage}</div>;
    }
  }

  getSearchResult() {
    const searchQuery = this.state.searchQuery;
    const issearch = this.state.issearch;
    let filtered = ""; // PostData;
    // console.log("value of searchQuery " + searchQuery);
    //console.log("value of isearch is " + issearch);
    if (issearch === 1) {
      // console.log("searchclicked - false ");
      if (searchQuery)
        filtered = PostData.filter(m =>
          m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
    } else {
      if (issearch === 2)
        //console.log("searchclicked - true ");
        filtered = PostData.filter(m =>
          m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
    }

    // console.log(filtered.length);
    // console.log(filtered);

    return { totalCount: filtered.length, data: filtered, issearch: issearch };
  }

  render() {
    const { totalCount,  data, issearch } = this.getSearchResult();
    //const searchQuery = this.state.addresses;
    const searchValue = this.state.searchQuery;
    const firstText = " First paragraph shown here ";
    const secondText = "  second paragraph shown here ";
    const dowloadMessage =
      "Download your complete four year scheduled in PDF format";
    return (
      <React.Fragment>
        <p>Showing {totalCount} address in the database.</p>
        <h6>Find Your Collection Schedule.</h6>
        <p>{firstText}</p>
        <p>{secondText}</p>

        <div className="row">
          <div className="col-5">
            <SearchBox
              name="searchboxname"
              value={searchValue}
              error={this.state.errors.searchboxname}
              onChange={this.handleChange}
              onClick={this.handleSearchClick}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
        <div className="row">
          {issearch === 1 && totalCount > 0 ? (
            <div className="col-4">
              <ListGroup
                items={data}
                selectedItem={this.state.selectedAddress}
                onItemSelect={this.handleAddressSelect}
                onMouseOver={this.handleMouseOver}
                onKeyDown={this.handleKeyDown1}
                // ref={this.handleRef}
                //onClick={this.handleAddressSelect}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {this.displayText()}
        {issearch === 3 ? (
          <div className="row">
            <div className="col-5">
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Image</th>
                    <th>Collection Days</th>
                    <th>Next Collection</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.services.map(service => (
                    <tr key={service._id}>
                      <td>{service.type}</td>
                      <td align="center">
                        {service.type === "Trash" ? (
                          <Trash />
                        ) : service.type === "Leaf" ? (
                          <Leaf />
                        ) : (
                          <Recycle />
                        )}
                      </td>
                      <td>{service.collectionDays}</td>
                      <td>{service.nextCollection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h6>Download</h6>
              <a href="/test">{dowloadMessage}</a>
            </div>
          </div>
        ) : issearch === 2 && totalCount > 0 ? (
          <div>
            <i>we could not find {searchValue}</i>
            <p>
              <h6>Did you mean?</h6>{" "}
            </p>
            {data[0].address1}
          </div>
        ) : (
          ""
        )}

        {/* {data.length === 1 ? data[0].address1 : "none"}
        <ul className="list-group-item">
          {data.map((item, i) => (
            <div key={i}> {item.address1}</div>
          ))}
        </ul> */}
      </React.Fragment>
    );
  }
}

export default TrashLookUp;
