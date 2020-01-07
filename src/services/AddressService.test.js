import { GetFormattedAddress } from "./AddressService";

describe("GetFormattedAddress", () => {
  it("should return a friendly message when the address is empty", () => {
    //arrange
    const emptyAddress = {};

    //act
    const actual = GetFormattedAddress(emptyAddress);

    //assert
    expect(actual).toEqual(null);
  });

  it("should return the full address when all address properties are provided", () => {
    //arrange
    const actualAddress = {
      address: "1745 T Street Southeast1, Apt 15",
      city: "Louisville",
      zip: "40219"
    };

    //act
    const actual = GetFormattedAddress(actualAddress);

    //assert
    expect(actual).toEqual("1745 T Street Southeast1, Apt 15 Louisville 40219");
  });
});
