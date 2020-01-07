import React from "react";
import TrashLookUp from "./TrashLookup";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("should be able to get address results with a valid address that has data", async () => {
  const { getByText, getByLabelText } = render(<TrashLookUp />);

  // Verify form elements
  const addressInput = getByLabelText(/find your collection schedule/i);
  const submitButton = getByText(/get schedule/i);

  await userEvent.type(addressInput, "1745 T Street Southeast1");

  // TODO: Unless the user selects an item from the list they cannot see results, this should be able to happen through a button click
  // In the provided mockup the button is the magnifying glass, so this test might slightly need to change

  userEvent.click(submitButton);
});
