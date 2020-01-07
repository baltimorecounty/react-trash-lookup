import { fireEvent, render } from "@testing-library/react";

import React from "react";
import TrashLookUp from "./trashlookup";

test("should be able to get address results", () => {
  const { getByLabelText } = render(<TrashLookUp />);

  const addressInput = getByLabelText(/find your collection schedule/i);
});
