import "@testing-library/jest-dom/extend-expect";

import {
  GetAddresses as mockGetAddresses,
  GetTrashSchedule as mockGetTrashSchedule
} from "../services/AddressService";
import { render, wait, within } from "@testing-library/react";

import React from "react";
import TrashLookUp from "./TrashLookup";
import userEvent from "@testing-library/user-event";

jest.mock("../services/AddressService");

beforeEach(() => {
  mockGetAddresses.mockResolvedValueOnce([
    {
      _id: 1,
      address1: "1745 T Street Southeast",
      address2: "Apt 007",
      city: "Washington",
      state: "DC",
      postalCode: "20020",
      coordinates: {
        lat: 38.867033,
        lng: -76.979235
      }
    },
    {
      _id: 2,
      address1: "1745 T Street Southeast1",
      address2: "Apt 15",
      city: "Louisville",
      state: "KY",
      postalCode: "40219",
      coordinates: {
        lat: 38.1343013,
        lng: -85.6498512
      }
    },
    {
      _id: 3,
      address1: "560 Penstock Drive",
      address2: "",
      city: "Grass Valley",
      state: "CA",
      postalCode: "95945",
      coordinates: {
        lat: 39.213076,
        lng: -121.077583
      }
    },
    {
      _id: 4,
      address1: "150 Carter Street",
      address2: "",
      city: "Manchester",
      state: "CT",
      postalCode: "06040",
      coordinates: {
        lat: 41.76556000000001,
        lng: -72.473091
      }
    }
  ]);
});

afterEach(() => {
  jest.resetAllMocks();
});

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

//TODO: Need to add a test, where the trash data doesn't exist
test("should be able to get address results with a valid address that has data", async () => {
  mockGetTrashSchedule.mockResolvedValueOnce({});

  const { getByText, getByLabelText } = render(<TrashLookUp />);

  let addressInput;
  let submitButton;

  // Since data is on component mount wait to get elements
  await wait(() => {
    // Verify form elements on load
    addressInput = getByLabelText(/find your collection schedule/i);
    submitButton = getByText(/get schedule/i);
  });

  // Input address
  await userEvent.type(addressInput, "Not a real address.");

  // Submit the address to see the results
  userEvent.click(submitButton);

  expect(mockGetTrashSchedule).toHaveBeenCalledTimes(1);

  await wait(() => {
    // Verify a friendly message is displayed that we can't find the schedule
    getByText(/we were unable to find a schedule for not a real address.*/i);
    getByText(/try another search/i);
  });
});

test("should be able to get address results with a valid address that has data", async () => {
  mockGetTrashSchedule.mockResolvedValueOnce({
    address: "400 WASHINGTON AVE",
    city: "Towson",
    zip: "21204",
    trashPickupType: "Hand Pickup",
    recyclePickType: "",
    trashDayOfWeek: "Monday",
    recycleDayOfWeek: "Wednesday",
    yardWasteDayOfWeek: "Friday",
    trashDay: new Date(2020, 0, 13),
    recycleDay: new Date(2020, 0, 8),
    yardWasteDay: new Date(2020, 0, 10)
    /** TODO: This is still missing the every other week thing */
  });

  const { getByText, getByLabelText } = render(<TrashLookUp />);

  let addressInput;
  let submitButton;

  // Since data is on component mount wait to get elements
  await wait(() => {
    // Verify form elements on load
    addressInput = getByLabelText(/find your collection schedule/i);
    submitButton = getByText(/get schedule/i);
  });

  // Input address
  await userEvent.type(addressInput, "1745 T Street Southeast");

  // Submit the address to see the results
  userEvent.click(submitButton);

  expect(mockGetTrashSchedule).toBeCalledWith("1745 T Street Southeast");
  expect(mockGetTrashSchedule).toHaveBeenCalledTimes(1);

  await wait(() => {
    // Get the results table, so that we can check if the data exists
    const trashScheduleElm = document.getElementById("trash-schedule");
    const withinTable = within(trashScheduleElm);
    // Verify the results page has been shown
    getByText(/try another search?/i);
    const withInTrashRow = within(
      withinTable.getByText(/trash/i).closest("tr")
    );
    const withinRecycleRow = within(
      withinTable.getByText(/recycling/i).closest("tr")
    );
    const withingYardWasteRow = within(
      withinTable.getByText(/yard waste/i).closest("tr")
    );
    // Trash
    expect(withInTrashRow.getByText(/monday/i)).toBeInTheDocument();
    expect(withInTrashRow.getByText("1/13/2020")).toBeInTheDocument();

    // Recycling
    expect(withinRecycleRow.getByText(/wednesday/i)).toBeInTheDocument();
    expect(withinRecycleRow.getByText("1/8/2020")).toBeInTheDocument();
    // Yard Waste
    expect(withingYardWasteRow.getByText(/friday/i)).toBeInTheDocument();
    expect(withingYardWasteRow.getByText("1/10/2020")).toBeInTheDocument();
  });
});
