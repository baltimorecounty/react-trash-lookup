import React from "react";
import Form from "./common/Form";
import PostData from "../Data/street.json";
import _ from "lodash";
import InformationSection from "./common/InformationSection"
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
    const scheduleType= this.state.scheduleType;
    //TODO: we will use this later
    // const dowloadMessage =
    //   "Download your complete four year scheduled in PDF format";
    return (
      <div className="row">
        <div className="col-5">
          <ScheduleTable services={getTrashService()} scheduleType={scheduleType} renderWeekOfDay={this.renderWeekOfDay} />
          <h6>Download</h6>
          {/* <a href="/test">{dowloadMessage}</a> */}
        </div>
      </div>
    );
  }

  renderWeekOfDay = type => {
    const { scheduleType } = this.state;
    const trash =  scheduleType.trash.toLowerCase();
    const recycle =  scheduleType.recycle.toLowerCase()
    return type === trash
      ? (this.trashNextCollectionDate())
      : type === recycle
        ? (this.recylceNextCollectionDate())
        : (this.leafNextCollectionDate());


  }
  leafNextCollectionDate() {
    const { dateFormat, dayOfWeek } = this.state;
    const today = moment().day();
    return today === dayOfWeek.friday
      ? moment()
        .add(14, "d")
        .format(dateFormat)
      : moment()
        .add(12 - today, "d")
        .format(dateFormat);
  }

  recylceNextCollectionDate() {
    const { dateFormat, dayOfWeek } = this.state;
    const today = moment().day();
    return today >= dayOfWeek.sunday && today < dayOfWeek.friday
      ? moment()
        .add(5 - today, "d")
        .format(dateFormat)
      : moment()
        .add(6, "d")
        .format(dateFormat);
  }

  trashNextCollectionDate() {
    const { dateFormat, dayOfWeek } = this.state;
    const today = moment().day();

    return today >= dayOfWeek.monday && today < dayOfWeek.saturday
      ? moment()
        .add(6 - today, "d")
        .format(dateFormat)
      : today === dayOfWeek.saturday
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
    const isAutoTextHidden = this.state.isAutoTextHidden;
    return (
      <React.Fragment>

        <h6>Find Your Collection Schedule.</h6>
        <p>First paragraph shown here</p>
        <p>Second paragraph shown here</p>
        <div className="row">
          <div className="col-5">
            {!isAutoTextHidden && this.renderList(data)}
          </div>
        </div>


        {!isCollectionScheduleTextHidden && this.displayCollectionSechduleText()}

        {!isCollectionScheduleTextHidden && this.trashSchedule()}


      </React.Fragment>
    );

  }
}

export default TrashLookUp;
