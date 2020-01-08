import { GetAddresses, GetTrashSchedule } from "../services/AddressService";
import React, { useEffect, useState } from "react";

import InformationSection from "./common/InformationSection";
import RenderList from "./common/renderList";
import TrashSchedule from "./common/trashSchedule";

const TrashLookUp = props => {
  const [addresses, setAddresses] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [trashSchedule, setTrashSchedule] = useState({});
  const [selectedAddress, setSelectedAddress] = useState("");

  const resetForm = () => {
    setIsFormSubmitted(false);
    setSelectedAddress("");
    setTrashSchedule({});
  };

  useEffect(() => {
    GetAddresses().then(setAddresses);
  }, []);

  const handleAddressSelect = selectedAddress => {
    setSelectedAddress(selectedAddress);

    GetTrashSchedule(selectedAddress)
      .then(setTrashSchedule)
      .then(() => {
        setIsFormSubmitted(true);
      });
  };

  const hasTrashSchedule = Object.keys(trashSchedule).length > 0;

  return (
    <React.Fragment>
      <label htmlFor="address-lookup">Find Your Collection Schedule</label>
      <div className="row">
        <div className="col-5">
          {!hasTrashSchedule > 0 && (
            <RenderList
              name="address-lookup"
              dataList={addresses}
              selectedAddress={selectedAddress}
              onSelect={handleAddressSelect}
              onChange={setSelectedAddress}
            />
          )}
        </div>
      </div>

      {hasTrashSchedule > 0 && (
        <InformationSection
          address={trashSchedule.address}
          resetForm={resetForm}
        />
      )}

      {isFormSubmitted && (
        <TrashSchedule
          schedule={trashSchedule}
          address={selectedAddress}
          resetForm={resetForm}
        />
      )}
    </React.Fragment>
  );
};

export default TrashLookUp;
