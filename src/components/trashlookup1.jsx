import React from "react";
import Joi from "joi-browser";
import PostData from "../Data/street.json";
import { getTrashService } from "../services/trashService";
import Form from "./common/form";
class TrashLookUp1 extends Form {
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
      data: { searchboxname: "" },
      errors: {}
    };
  }
  schema = {
    searchboxname: Joi.string()
      .required()
      .label("Search")
  };

  getSearchResult() {
    const searchQuery = this.state.searchQuery;
    const issearch = this.state.issearch;
    let filtered = ""; // PostData;
    // console.log("value of searchQuery " + searchQuery);
    //console.log("value of isearch is " + issearch);
    // if (issearch === 1) {
    //   // console.log("searchclicked - false :issearch === 1)");
    //   if (searchQuery)
    //     filtered = PostData.filter(m =>
    //       m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
    //     );
    // } else {
    //   if (issearch === 2)
    //     console.log("searchclicked - true :issearch === 2");
    //     filtered = PostData.filter(m =>
    //       m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
    //     );
    // }

    // console.log(filtered.length);
    // console.log('in filter');
    //console.log(filtered);
    filtered = PostData.filter(m =>
      m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    return { totalCount: filtered.length, data: filtered, issearch: issearch };
  }

  render() {
    const { totalCount, data, issearch } = this.getSearchResult();
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
            <div className="p-3 mb-2 bg-secondary text-white">
              <div className="input-group mb-3">
                {this.renderInput("searchboxname")}
                <div className="input-group-append">
                  {this.renderButton("Login")}
                </div>
              </div>
              {this.renderError("searchboxname")}
            </div>
          </div>
       
          { totalCount > 0 ? (
            <div className="col-4">
          {this.renderList(data, data._id, data.address1,this.state.selectedAddress)}
            </div>
     
          ) : (
            ""
          )}
        </div>
       
      </React.Fragment>
    );
  }
}

export default TrashLookUp1;
