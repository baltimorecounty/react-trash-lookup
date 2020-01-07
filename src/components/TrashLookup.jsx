import * as moment from "moment";

import React, { Component, useState } from "react";
import {
  DefaultDateFormat as dateFormat,
  DayOfWeekDictionary as dayOfWeek
} from "../common/Dates";

import InformationSection from "./common/InformationSection";
import PostData from "../Data/street.json";
import RenderList from "./common/renderList";
import TrashSchedule from "./common/trashSchedule";
import _ from "lodash";
import { getFullAddress } from "../services/AddressService";
import { getTrashService } from "../services/trashService";

const TrashLookUp = props => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAutoTextHidden, setIsAutoTextHidden] = useState(false);

  const addressData = () => {
    let searchQuery = _.trim(selectedAddress);
    let filtered = PostData;

    if (searchQuery.length > 0) {
      filtered = PostData.filter(
        m => m.address1.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      );
    }
    return { data: filtered };
  };

  const resetForm = () => {
    setIsAutoTextHidden(false);
    setSelectedAddress("");
  };

  const renderDayOfWeek = type => {
    return type === "trash"
      ? trashNextCollectionDate()
      : type === "recycle"
      ? recycleNextCollectionDate()
      : leafNextCollectionDate();
  };

  const leafNextCollectionDate = () => {
    const today = moment().day();
    return today === dayOfWeek.friday
      ? moment()
          .add(14, "d")
          .format(dateFormat)
      : moment()
          .add(12 - today, "d")
          .format(dateFormat);
  };

  const recycleNextCollectionDate = () => {
    const today = moment().day();
    return today >= dayOfWeek.sunday && today < dayOfWeek.friday
      ? moment()
          .add(5 - today, "d")
          .format(dateFormat)
      : moment()
          .add(6, "d")
          .format(dateFormat);
  };

  const trashNextCollectionDate = () => {
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
  };

  const { data } = addressData(isAutoTextHidden);
  const Address =
    data.length > 0
      ? _.assign({
          address1: data[0].address1,
          address2: data[0].address2,
          city: data[0].city,
          state: data[0].state,
          postalCode: data[0].postalCode
        })
      : {};
  const fullAddress = getFullAddress(Address);

  const handleAddressSelect = (selectedAddress, isAutoTextHidden) => {
    setSelectedAddress(selectedAddress);
    setIsAutoTextHidden(isAutoTextHidden);
  };

  return (
    <React.Fragment>
      <h6>Find Your Collection Schedule.</h6>
      <div className="row">
        <div className="col-5">
          {!isAutoTextHidden && (
            <RenderList
              dataList={data}
              selectedAddress={selectedAddress}
              onSelect={handleAddressSelect}
            />
          )}
        </div>
      </div>

      {isAutoTextHidden && (
        <InformationSection address={fullAddress} resetForm={resetForm} />
      )}

      {isAutoTextHidden && (
        <TrashSchedule
          services={getTrashService()}
          renderDayOfWeek={renderDayOfWeek}
        />
      )}
    </React.Fragment>
  );
};

export default TrashLookUp;
