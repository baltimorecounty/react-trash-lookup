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

    // eventType = 0 nothing//eventType =1 --button clicked //eventType =2 --select list

    state = {
      data: {
        searchboxname: '',
        selectedAddress:'',
        eventType: 0
      },
      services: getTrashService(),
      addresses: PostData,
      errors: {}
    };

  schema = {
    searchboxname: Joi.string().required(),
      selectedAddress: Joi.string().allow(''),
      searchQuery: Joi.string().allow(''),
      eventType: Joi.number(),
  };
  displayText(issearch,topOneAddress) {

  const selectedAddress =  _.trim(topOneAddress);
    if (issearch === 2 || issearch === 3 ) {
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
  
    let searchQuery =  _.trim(this.state.data["searchQuery"]);
    const lenVal = _.trim(this.state.data["searchQuery"]).length;
    let issearch = 0; //this.state.data["issearch"];
    let eventType = this.state.data["eventType"];
    let filtered = ""; // PostData;

    if (lenVal > 0) {
      if (eventType === 2) {
        filtered = PostData.filter(
          m => m.address1.toLowerCase() === searchQuery.toLowerCase()
        );
     
        issearch = 2;
      } 
      else {
            filtered = PostData.filter(m =>
                      m.address1.toLowerCase().startsWith(searchQuery.toLowerCase()));
            if (eventType === 0) 
              {
                filtered.length > 0 ? (issearch = 0) : (issearch = 1);
              } 
            else {
                  // issearch =1  there are no address 
                  // issearch =3 there is only one address
                  // issearch =4 there are multiple addresses 
                  filtered.length ===0 ?  issearch = 1 : (filtered.length === 1? issearch =3 :issearch=4)
      
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
               <div className="input-group"> 
                {this.renderInput("searchboxname","Search")}

                 <div className="input-group-append "> 
                   {this.renderButton("Search")} 
                 </div>
             
               </div> 
               {this.renderError("searchboxname")}   
           </div>
          </div>
         </div> 

        <div>
          {issearch === 0 && totalCount > 0 ? (
            <div className="col-4">
              {this.renderList(
                data,
                data._id,
                data.address1,
                this.state.data["selectedAddress"]
              )}
            </div>
          ) : issearch === 1 && totalCount === 0 ? (
            <div>
              <i>we could not find address {searchValue}</i>
            </div>
          ) : (
            ""
          )}
        </div>
        {data.length > 0 ? this.displayText(issearch, data[0].address1):""}

        {issearch === 2 || issearch === 3?(
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
        ) : issearch === 4 && totalCount > 0 ? (
          <div>
            <i>we could not find {searchValue}</i>
            <h6>Did you mean?</h6> {data[0].address1}
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default TrashLookUp1;
