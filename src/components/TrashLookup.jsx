import React, { useState } from "react";
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
import moment from "moment";

const TrashLookUp = props => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAutoTextHidden, setIsAutoTextHidden] = useState(false);

  const getAddress = (query = "") => {
    let searchQuery = _.trim(query).toLowerCase();

    return searchQuery
      ? PostData.find(
          m => m.address1.toLowerCase().indexOf(searchQuery) > -1
        ) || {}
      : {};
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

  const { address1, address2, city, state, postalCode } = getAddress(
    selectedAddress
  );
  const Address =
    address1 && postalCode
      ? _.assign({
          address1,
          address2,
          city,
          state,
          postalCode
        })
      : {};
  const fullAddress = getFullAddress(Address);

  const handleAddressSelect = (selectedAddress, isAutoTextHidden) => {
    setSelectedAddress(selectedAddress);
    setIsAutoTextHidden(isAutoTextHidden);
  };

  return (
    <React.Fragment>
      <label htmlFor="address-lookup">Find Your Collection Schedule</label>
      <div className="row">
        <div className="col-5">
          {!isAutoTextHidden && (
            <RenderList
              name="address-lookup"
              dataList={PostData}
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
          address={selectedAddress}
          fullAddress={fullAddress}
          resetForm={resetForm}
        />
      )}
    </React.Fragment>
  );
};

export default TrashLookUp;
