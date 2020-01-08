import { GetNextDayOfTheWeek } from "../common/Dates";
import axios from "axios";

/**
 *
 * "ADDRESS2": "400 WASHINGTON AVE",
    "FACILI": "COUNT",
    "CITY": "TOWSON",
    "ZIP_CODE": 21204,
    "TRASH_PICKUP_TYPE": "HAND PICKUP",
    "RECYCLE_PICKUP_TYPE": null,
    "AREA_DESCRIPTION": "M-W-F",
    "AREA_TRASH_DAY": "M",
    "AREA_RECYCLE_DAY": "W",
    "AREA_YARD_DAY": "F",
    "AREA_YARD_START_WEEK2": "N",
    "AREA_TRASH_DAY_2": null
 */

const MockTrashSchedule = {
  address: "400 WASHINGTON AVE",
  city: "Towson",
  zip: "21204",
  trashPickupType: "Hand Pickup",
  recyclePickType: "",
  trashDayOfWeek: "Monday",
  recycleDayOfWeek: "Wednesday",
  yardWasteDayOfWeek: "Friday",
  trashDay: GetNextDayOfTheWeek("Monday", new Date(2020, 0, 7)),
  recycleDay: GetNextDayOfTheWeek("Wednesday", new Date(2020, 0, 7)),
  yardWasteDay: GetNextDayOfTheWeek("Friday", new Date(2020, 0, 7))
  /** TODO: This is still missing the every other week thing */
};

const GetAddresses = () =>
  axios
    .get("../Data/street.json")
    .then(({ status, data = [] }) => (status === 200 ? data : []));

/**
 * Get the first address from addresses
 * @param {string} query part of an address to query addresses
 */
const GetTrashSchedule = (query = "") => {
  let searchQuery = query.trim().toLowerCase();

  return axios
    .get("../Data/street.json", {
      query: searchQuery
    })
    .then(({ status, data }) =>
      status === 200 &&
      data.find(m => m.address1.toLowerCase().indexOf(searchQuery) > -1)
        ? MockTrashSchedule
        : {}
    );
};

/**
 * Gets a formatted address for a given address line, city and zip
 * @param {object} address
 */
const GetFormattedAddress = ({ address = "", city = "", zip = 0 }) => {
  return zip > 0 ? `${address} ${city} ${zip}` : null;
};

export { GetAddresses, GetTrashSchedule, GetFormattedAddress };
