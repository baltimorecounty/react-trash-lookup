import React from "react";
import Form from "./common/Form";
import PostData from "../Data/street.json";
import { Button } from 'reactstrap';
import _ from "lodash";


import { getTrashService } from "../services/trashService";
import * as moment from "moment";
import ScheduleTable from './common/scheduleTable';
class TrashLookUp extends Form {
 
  displayText() {
    const selectedAddress = _.trim(this.state.value);
    const linkMessage = "Not the right address?";
      let message = [];
      message.push(<h6>Your Schedule</h6>);
      message.push("showing collection schedule for:");
      message.push(<h6> {selectedAddress} </h6>);
      message.push("Not the right address?Try another search");
   

      const displayMessage = message.map((data, index) => {
        return <span key={index}>{data}</span>;
      });

    return(
     
<div>
   {displayMessage} <Button color="link" onClick={this.handleClick}>Try another search</Button>
   </div>               
    );
  }

  getAddresses() {
    let searchQuery =  _.trim(this.state.value);
    let filtered =PostData;
    const isHidden = this.state.isHidden;
 
    if (searchQuery.length > 0) {
   
         if (isHidden) 
         {
          filtered = PostData.filter(m =>
            m.address1.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
          }
          else{
            filtered = PostData.filter(
             m => m.address1.toLowerCase() === searchQuery.toLowerCase());
      
          }
        }
    return {  data: filtered };
  }

   renderConditionTable() {
     const dowloadMessage =
       "Download your complete four year scheduled in PDF format";

    return (
      <div className="row">
        <div className="col-5">
        <ScheduleTable services = {getTrashService()} renderWeekOfDay= {this.renderWeekOfDay} />
          <h6>Download</h6>
          {/* <a href="/test">{dowloadMessage}</a> */}
        </div>
      </div>
    );
 }
  renderNotFoundMessage() {
  
    const searchValue = this.state.data["searchboxname"];
    return (
      <div>
        <i>we could not find address {searchValue}</i>
      </div>
    );
  }

  renderWeekOfDay = type =>  {
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
    const {  data } = this.getAddresses();
    const isHidden = this.state.isHidden;
    const firstText = " First paragraph shown here ";
    const secondText = "  second paragraph shown here ";

    return (
      <React.Fragment>
  
        <h6>Find Your Collection Schedule.</h6>
        <p>{firstText}</p>
        <p>{secondText}</p>
        <div className="row">
          <div className="col-5">
          {!this.state.isAutoTextHidden &&  this.renderList(data)}    
          </div>
        </div>
     
         { !isHidden && this.displayText() } 
      
        { !isHidden && this.renderConditionTable()}
        
 
      </React.Fragment>
    );

  }
}

export default TrashLookUp;
