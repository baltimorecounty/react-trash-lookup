const getFullAddress = address => {
    return address.length > 0 ? address[0].address2.length > 0
        ? `${address[0].address1}${`, `}${address[0].address2}${`, `} ${address[0].city}${`, `} ${address[0].state}${` `} ${address[0].postalCode}`
        : `${address[0].address1}${`, `} ${address[0].city}${`, `} ${address[0].state}${` `} ${address[0].postalCode}`
        : 'none';
};

export {
    getFullAddress
};