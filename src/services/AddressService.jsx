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
  excludeToday = true,
  refDate = new Date()
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
  trashDay: getNextDayOfTheWeek("Monday"),
  recycleDay: getNextDayOfTheWeek("Wednesday"),
  yardWasteDay: getNextDayOfTheWeek("Friday")
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
