import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import PostData from "../Data/street.json";
//import SearchBox from "./searchBox";
import _ from "lodash";
//import ListGroup from "./listGroup";
import Trash from "./common/trash";
import Leaf from "./common/leaf";
import Recycle from "./common/recycle";
import { getTrashService } from "../services/trashService";
class TrashLookUp1 extends Form {
  constructor(props) {
    super(props);
    //   this.itemSel = React.createRef();
    // }
  // eventType = 0 nothing
  //eventType =1 --button clicked
  //eventType =2 --select list
    this.state = {
      data: {
        selectedAddress: "",
        searchboxname: "",
       // issearch: 0,
        searchQuery: "",
        eventType:0
      },
      services: getTrashService(),
      addresses: PostData,
      errors: {}
    };
  }
  schema = {
    searchboxname: Joi.string()
      .required()
      .label("Search")
  };
  displayText() {
    //const issearch = this.state.data["issearch"];
    const eventType = this.state.data["eventType"];
    const selectedAddress = this.state.data["selectedAddress"];
    if (eventType === 2) {
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
    let searchQuery = this.state.data["searchQuery"];
    const lenVal = _.trim(this.state.data["searchboxname"]).length;
    let issearch = 0 ;//this.state.data["issearch"];
    let eventType = this.state.data["eventType"];
    let filtered = ""; // PostData;
     console.log('eventType:lenVal--' + eventType +":" + lenVal);
  
    if (lenVal >0) 
    {
      if (eventType ===2 )
      {
         searchQuery= this.state.data["selectedAddress"];
          filtered = PostData.filter(m =>
          m.address1.toLowerCase()===searchQuery.toLowerCase());
          issearch =3 
      }
      else 
      {
          filtered = PostData.filter(m =>
          m.address1.toLowerCase().startsWith(searchQuery.toLowerCase()));
          if (eventType ===0 )
          {
              filtered.length >0?issearch =1 : issearch=2;
          }
          else // (eventType ===1)
          {
              issearch =2;
          }
      }
    } 

    return { totalCount: filtered.length, data: filtered, issearch: issearch };
  }

  render() {
    const { totalCount, data, issearch } = this.getSearchResult();
    const searchValue = this.state.data["searchQuery"];
    const firstText = " First paragraph shown here ";
    const secondText = "  second paragraph shown here ";
    const dowloadMessage =
      "Download your complete four year scheduled in PDF format";
    console.log(data);
    return (
      <React.Fragment>
        <p>
          Showing {totalCount} -issearchval -{issearch} address in the database.
        </p>
        <h6>Find Your Collection Schedule.</h6>
        <p>{firstText}</p>
        <p>{secondText}</p>
        <div className="row">
          <div className="col-5">
            <div className="p-3 mb-2 bg-secondary text-white">
              <div className="input-group mb-3">
                {this.renderInput("searchboxname")}

                <div className="input-group-append">
                      {this.renderButton("Search")}  
                </div>
                {this.renderError("searchboxname")}
              </div>
            </div>
          </div>
        </div>

        <div>
          {issearch === 1 && totalCount > 0 ? (
            <div className="col-4">
              {this.renderList(
                data,
                data._id,
                data.address1,
                this.state.data["selectedAddress"]
              )}
            </div>
          ) : issearch === 2 && totalCount === 0 ? (
          <div>
            <i>we could not find address {searchValue}</i>
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
              <h6>Did you mean?</h6>{" "}
            {data[0].address1}
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default TrashLookUp1;
