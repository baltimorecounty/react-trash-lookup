
import _ from 'lodash';
const getFullAddress = address => {

    return !( _.isEmpty(address)) ? (address.address2.length > 0
        ? `${address.address1}${`, `}${address.address2}${`, `} ${address.city}${`, `} ${address.state}${` `} ${address.postalCode}`
        : `${address.address1}${`, `} ${address.city}${`, `} ${address.state}${` `} ${address.postalCode}`)
        : 'none';


};

export {
    getFullAddress
};
