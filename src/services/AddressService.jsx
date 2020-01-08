import PostData from "../Data/street.json";
import { addDays } from "date-fns";

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

function getNextDayOfTheWeek(
  dayName,
  refDate = new Date(),
  excludeToday = true
) {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );
  if (dayOfWeek < 0) return;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(
    refDate.getDate() +
      !!excludeToday +
      ((dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7)
  );
  return refDate;
}

const MockTrashSchedule = {
  address: "400 WASHINGTON AVE",
  city: "Towson",
  zip: "21204",
  trashPickupType: "Hand Pickup",
  recyclePickType: "",
  trashDayOfWeek: "Monday",
  recycleDayOfWeek: "Wednesday",
  yardWasteDayOfWeek: "Friday",
  trashDay: getNextDayOfTheWeek("Monday", new Date(2020, 0, 7)),
  recycleDay: getNextDayOfTheWeek("Wednesday", new Date(2020, 0, 7)),
  yardWasteDay: getNextDayOfTheWeek("Friday", new Date(2020, 0, 7))
};

/**
 * Get the first address from addresses
 * @param {string} query part of an address to query addresses
 */
const GetTrashSchedule = (query = "") => {
  let searchQuery = query.trim().toLowerCase();

  return searchQuery
    ? PostData.find(m => m.address1.toLowerCase().indexOf(searchQuery) > -1)
      ? MockTrashSchedule
      : {}
    : {};
};

/**
 *
 * @param {object} address
 */
const GetFormattedAddress = ({ address = "", city = "", zip = 0 }) => {
  return zip > 0 ? `${address} ${city} ${zip}` : null;
};

export { GetTrashSchedule, GetFormattedAddress };
