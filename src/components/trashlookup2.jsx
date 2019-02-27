import React from "react";
import Form2 from "./common/form2";
import Joi from "joi-browser";
import PostData from "../Data/street.json";
//import SearchBox from "./searchBox";
import _ from "lodash";
//import ListGroup from "./listGroup";
import Trash from "./common/trash";
import Leaf from "./common/leaf";
import Recycle from "./common/recycle";
import { getTrashService } from "../services/trashService";
import * as moment from "moment";
class TrashLookUp2 extends Form2 {
  // eventType = 0 nothing//eventType =1 --button clicked //eventType =2 --select list

  state = {
    data: {
      searchboxname: "",
      selectedAddress: "",
      eventType: 0
    },
    services: getTrashService(),
    addresses: PostData,
    errors: {}
  };

  schema = {
    searchboxname: Joi.string().required(),
    selectedAddress: Joi.string().allow(""),
    searchQuery: Joi.string().allow(""),
    eventType: Joi.number()
  };

  // doSearch = searchQuery => {
  //   console.log("inside - doSearch()");
  //   const data = this.state.data;
  //   data["searchQuery"] = _.trim(data["searchboxname"]);;
  //   data["eventType"] = 1;
  //   //  console.log(data["searchboxname"]);
  //   this.setState({ data });
  // };

  displayText(issearch, topOneAddress) {
    const selectedAddress = _.trim(topOneAddress);
    if (issearch === 2 || issearch === 3) {
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
    console.log("inside getSearchResult()");
    const stateData = this.state.data;
    let searchQuery = _.trim(stateData["searchQuery"]);
    console.log("searchQuery:" + searchQuery);
    const lenVal = _.trim(stateData["searchQuery"]).length;
    let issearch = 0;
    let eventType = stateData["eventType"];

    let filtered = ""; // PostData;
    console.log("eventype:lenval--" + eventType + ":" + lenVal);
    if (lenVal > 0) {
      if (eventType === 2) {
        filtered = PostData.filter(
          m => m.address1.toLowerCase() === searchQuery.toLowerCase()
        );

        issearch = 2;
      } else {
        filtered = PostData.filter(m =>
          m.address1.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        if (eventType === 0) {
          filtered.length > 0 ? (issearch = 0) : (issearch = 1);
        } else {
          // issearch =1  there are no address
          // issearch =3 there is only one address
          // issearch =4 there are multiple addresses
          filtered.length === 0
            ? (issearch = 1)
            : filtered.length === 1
            ? (issearch = 3)
            : (issearch = 4);
        }
      }
    }

    return { totalCount: filtered.length, data: filtered, issearch: issearch };
  }

  renderConditionTable(issearch, data, totalCount) {
    const dowloadMessage =
      "Download your complete four year scheduled in PDF format";

    return (
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
                  <td>
                    {service.type === "Trash"
                      ? this.renderWeekOfDay(1)
                      : service.type === "Leaf"
                      ? this.renderWeekOfDay(3)
                      : this.renderWeekOfDay(2)}
                  </td>
                  {/* <td>{service.nextCollection}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <h6>Download</h6>
          <a href="/test">{dowloadMessage}</a>
        </div>
      </div>
    );
  }
  renderNotFoundMessage() {
    console.log("inside -renderNotFoundMessage");
    const searchValue = this.state.data["searchboxname"];
    return (
      <div>
        <i>we could not find address {searchValue}</i>
      </div>
    );
  }
  renderDidYouMean(data) {
    const searchValue = this.state.data["searchboxname"];
    return (
      <div>
        <i>we could not find {searchValue}</i>
        <h6>Did you mean?</h6> {data[0].address1}
      </div>
    );
  }
  renderWeekOfDay(type) {
   return  type === 1
      ? (this.trashNextCollectionDate())
      : type === 2
      ? (this.recylceNextCollectionDate())
      : (this.leafNextCollectionDate());

 
  }
  leafNextCollectionDate() {
    
    const dayOfWeek = moment().day();
    return dayOfWeek === 5
      ? moment()
          .add(14, "d")
          .format("D/M/YYYY")
      : moment()
          .add(12 - dayOfWeek, "d")
          .format("D/M/YYYY");
  }

  recylceNextCollectionDate() {
    const dayOfWeek = moment().day();
    return dayOfWeek >= 0 && dayOfWeek < 5
      ? moment()
          .add(5 - dayOfWeek, "d")
          .format("D/M/YYYY")
      : moment()
          .add(6, "d")
          .format("D/M/YYYY");
  }

  trashNextCollectionDate() {
    const dayOfWeek = moment().day();

    return dayOfWeek >= 1 && dayOfWeek < 6
      ? moment()
          .add(6 - dayOfWeek, "d")
          .format("D/M/YYYY")
      : dayOfWeek === 6
      ? moment()
          .add(2, "d")
          .format("D/M/YYYY")
      : moment()
          .add(1, "d")
          .format("D/M/YYYY");
  }

  render() {
    const { totalCount, data, issearch } = this.getSearchResult();
    const firstText = " First paragraph shown here ";
    const secondText = "  second paragraph shown here ";

    return (
      <React.Fragment>
        <p>
          {this.renderWeekOfDay()}
          Showing {totalCount} -issearchval -{issearch} address in the database.
        </p>
        <h6>Find Your Collection Schedule.</h6>
        <p>{firstText}</p>
        <p>{secondText}</p>
        <div className="row">
          <div className="col-5">
            <div className="p-3 mb-2 bg-secondary text-white">
              <div className="input-group">
                {this.renderInput("searchboxname", "Search")}
                <div className="input-group-append ">
                  {this.renderButton("Search")}
                </div>
              </div>
              {this.renderError("searchboxname")}
            </div>
          </div>
        </div>

        {data.length > 0 ? this.displayText(issearch, data[0].address1) : ""}
        {issearch === 0 && totalCount > 0 ? (
          <div className="col-4">
            {this.renderList(
              data,
              data._id,
              data.address1,
              this.state.data["selectedAddress"]
            )}
          </div>
        ) : issearch === 2 || issearch === 3 ? (
          this.renderConditionTable(issearch, data, totalCount)
        ) : issearch === 4 && totalCount > 0 ? (
          this.renderDidYouMean(data)
        ) : issearch === 1 && totalCount === 0 ? (
          this.renderNotFoundMessage()
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default TrashLookUp2;
