import React, { Component } from "react";
import AddressData from "../Data/street.json";
import SearchBox from "./searchBox";
import _ from "lodash";
import ListGroup from "./listGroup";
import Trash from "./common/trash";
import Leaf from "./common/leaf";
import Recycle from "./common/recycle";
import { getTrashService } from "../services/trashService";

class Movies extends Component {
  state = {
    services: getTrashService(),
    searchQuery: "",
	addresses: AddressData,
	filteredAddresses: AddressData,
    issearch: 0,
    selectedAddress: null
  };

  // componentDidMount() {
  // console.log("inside didmount");
  //const fakeAddress = [{ _id: "", name: "" }, ...getFakeAddress()];
  // this.setState({ searchQuery: this.ref.searchboxinput.value });
  // }
  // componentDidUpdate() {
  //   console.log("inside componentDidUpdate" + this.state.searchQuery);
  // }
  handleAddressSelect = address => {
    // console.log("address:" + address.address1);
    this.setState({
      selectedAddress: address.address1,
      searchQuery: address.address1,
      issearch: 3
    });
  };
  handleSearch = query => {
	console.log("handel Search:" + query);
	const isSearch = query.length === 0 ? 0 : 1;
	const filteredAddresses = this.state.addresses.filter(address => {
		return address.address1 && address.address1.toLowerCase().indexOf(query.toLowerCase()) > -1;
	})
	this.setState({ searchQuery: query, issearch: isSearch, filteredAddresses  });
  };

  handleSearchClick = query => {
    if (this.state.searchQuery.length === 0) {
      alert("search criteria misssing");
    } else {
      this.setState({ issearch: 2 });
    }
    console.log("button is click");
  };

  getSearchResult = () => {
    const searchQuery = this.state.searchQuery;
    const issearch = this.state.issearch;
    let filtered = ""; // AddressData;
    // console.log("value of searchQuery " + searchQuery);
    //console.log("value of isearch is " + issearch);
    if (issearch === 1) {
      console.log("searchclicked - false ");
      if (searchQuery)
        filtered = AddressData.filter(m =>
          m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
    } else {
      if (issearch === 2) console.log("searchclicked - true ");
      filtered = AddressData.filter(m =>
        m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    console.log(filtered.length);
    console.log(filtered);
    return { totalCount: filtered.length, data: filtered, issearch: issearch };
  };

  render() {
	const { filteredAddresses } = this.state;
	const totalCount = filteredAddresses.length;
    const { data: data, issearch } = this.getSearchResult();

    const searchQuery = this.state.addresses;
    const searchValue = this.state.searchQuery;
    return (
      <React.Fragment>
        <p>Showing {totalCount} address in the database.</p>
        <SearchBox
          value={searchValue}
          onChange={this.handleSearch}
          onClick={this.handleSearchClick}
        />
        <div className="row">
          {issearch === 1 && totalCount > 0 ? (
            <div className="col-5">
              <ListGroup
                items={filteredAddresses}
                selectedItem={this.state.selectedAddress}
                onItemSelect={this.handleAddressSelect}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {issearch === 3 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Image</th>
                <th>Collection Days</th>
                <th>Next Collection</th>

                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.services.map(service => (
                <tr key={service._id}>
                  <td>{service.type}</td>
                  <td>
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
        ) : issearch === 2 && totalCount > 0 ? (
          <div>
            we could not find {searchValue}
            <p>Did you mean?</p>
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

export default Movies;
