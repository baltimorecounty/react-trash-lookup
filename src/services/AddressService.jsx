import PostData from "../Data/street.json";

/**
 * Get the first address from addresses
 * @param {string} query part of an address to query addresses
 */
const GetAddressFirstOrDefault = (query = "") => {
  let searchQuery = query.trim().toLowerCase();

  return searchQuery
    ? PostData.find(m => m.address1.toLowerCase().indexOf(searchQuery) > -1) ||
        {}
    : {};
};

/**
 *
 * @param {object} address
 */
const GetFormattedAddress = (address = {}) => {
  return Object.keys(address).length > 0
    ? address.address2.length > 0
      ? `${address.address1}${`, `}${address.address2}${`, `}${
          address.city
        }${`, `}${address.state}${` `}${address.postalCode}`
      : `${address.address1}${`, `}${address.city}${`, `}${
          address.state
        }${` `}${address.postalCode}`
    : null;
};

export { GetAddressFirstOrDefault, GetFormattedAddress };
