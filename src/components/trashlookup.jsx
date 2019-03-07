import React from "react";
import Form from "./common/Form";
import PostData from "../Data/street.json";
import _ from "lodash";
import InformationSection from "./InformationSection"


import { getTrashService } from "../services/trashService";
import * as moment from "moment";
import ScheduleTable from './common/scheduleTable';
class TrashLookUp extends Form {

  displayCollectionSechduleText() {
    const selectedAddress = _.trim(this.state.selectedAddress);
    return (<InformationSection
      address={selectedAddress}
      resetForm={this.handleClick} />);
  }

  addressData() {
    let searchQuery = _.trim(this.state.selectedAddress);
    let filtered = PostData;
    const isCollectionScheduleTextHidden = this.state.isCollectionScheduleTextHidden;

    if (searchQuery.length > 0) {
      //TODO REFACTOR IT 
      if (isCollectionScheduleTextHidden) {
        filtered = PostData.filter(m =>
          m.address1.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
      }
      else {
        filtered = PostData.filter(
          m => m.address1.toLowerCase() === searchQuery.toLowerCase());

      }
    }
    return { data: filtered };
  }
  trashSchedule() {
    const dowloadMessage =
      "Download your complete four year scheduled in PDF format";
    return (
      <div className="row">
        <div className="col-5">
          <ScheduleTable services={getTrashService()} renderWeekOfDay={this.renderWeekOfDay} />
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
  renderWeekOfDay = type => {
   const scheduleType={ trash: 1 , recycle:2, leaf: 3};
    return type === scheduleType.trash
      ? (this.trashNextCollectionDate())
      : type === scheduleType.recycle
        ? (this.recylceNextCollectionDate())
        : (this.leafNextCollectionDate());


  }
  leafNextCollectionDate() {
    const dateFormat = 'D/M/YYYY';
    const dayOfWeek = moment().day();

    return dayOfWeek === 5
      ? moment()
        .add(14, "d")
        .format(dateFormat)
      : moment()
        .add(12 - dayOfWeek, "d")
        .format(dateFormat);
  }

  recylceNextCollectionDate() {
    const dateFormat = 'D/M/YYYY';
    const dayOfWeek = moment().day();
    return dayOfWeek >= 0 && dayOfWeek < 5
      ? moment()
        .add(5 - dayOfWeek, "d")
        .format(dateFormat)
      : moment()
        .add(6, "d")
        .format(dateFormat);
  }

  trashNextCollectionDate() {
    const dateFormat = 'D/M/YYYY';
    const dayOfWeek = moment().day();

    return dayOfWeek >= 1 && dayOfWeek < 6
      ? moment()
        .add(6 - dayOfWeek, "d")
        .format(dateFormat)
      : dayOfWeek === 6
        ? moment()
          .add(2, "d")
          .format(dateFormat)
        : moment()
          .add(1, "d")
          .format(dateFormat);
  }

  render() {
    const { data } = this.addressData();
    const isCollectionScheduleTextHidden = this.state.isCollectionScheduleTextHidden;
    return (
      <React.Fragment>

        <h6>Find Your Collection Schedule.</h6>
        <p>First paragraph shown here</p>
        <p>Second paragraph shown here</p>
        <div className="row">
          <div className="col-5">
            {!this.state.isAutoTextHidden && this.renderList(data)}
          </div>
        </div>


        {!isCollectionScheduleTextHidden && this.displayCollectionSechduleText()}

        {!isCollectionScheduleTextHidden && this.trashSchedule()}


      </React.Fragment>
    );

  }
}

export default TrashLookUp;
