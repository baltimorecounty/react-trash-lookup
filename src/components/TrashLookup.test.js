import "@testing-library/jest-dom/extend-expect";

import { render, within } from "@testing-library/react";

import React from "react";
import TrashLookUp from "./TrashLookup";
import userEvent from "@testing-library/user-event";

//TODO: Need to add a test, where the trash data doesn't exist
test("should be able to get address results with a valid address that has data", async () => {
  const { getByText, getByLabelText } = render(<TrashLookUp />);

  // Verify form elements on load
  const addressInput = getByLabelText(/find your collection schedule/i);
  const submitButton = getByText(/get schedule/i);

  // Input address
  await userEvent.type(addressInput, "Not a real address.");

  // Submit the address to see the results
  userEvent.click(submitButton);

  // Verify a friendly message is displayed that we can't find the schedule
  getByText(/we were unable to find a schedule for not a real address.*/i);
  getByText(/try another search/i);
});

test("should be able to get address results with a valid address that has data", async () => {
  const { getByText, getByLabelText } = render(<TrashLookUp />);

  // Verify form elements on load
  const addressInput = getByLabelText(/find your collection schedule/i);
  const submitButton = getByText(/get schedule/i);

  // Input address
  await userEvent.type(addressInput, "1745 T Street Southeast1");

  // Submit the address to see the results
  userEvent.click(submitButton);

  // Get the results table, so that we can check if the data exists
  const trashScheduleElm = document.getElementById("trash-schedule");
  const withinTable = within(trashScheduleElm);

  // Verify the results page has been shown
  getByText(/try another search?/i);
  const withInTrashRow = within(withinTable.getByText(/trash/i).closest("tr"));
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
