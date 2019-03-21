import { getFullAddress } from './AddressService'


const data = [{ address1: "1745 T Street Southeast1", city: "Louisville", state: "KY", postalCode: "40219" }]

describe('parseAddress', () => {
    it('should return a friendly message when the address is empty', () => {
        //arrange 
        const emptyAddress = {};
        //act 
        const actual = getFullAddress(emptyAddress);
        //assert
        expect(actual).toEqual('Address was null or empty');
    })
    it('should return a friendly message when the address is matched', () => {
        //arrange 
        const emptyAddress = [{ address1: "1745 T Street Southeast1", city: "Louisville", state: "KY", postalCode: "40219" }]
        //act 
        const actual = getFullAddress(emptyAddress);
        //assert
        expect(actual).toEqual('1745 T Street Southeast1,  Louisville,  KY  40219');
    })

    it('should return a friendly message when address2 is not handled by function', () => {
        //arrange 
        const emptyAddress = [{ address1: "1745 T Street Southeast1", address2: "8958 new street", city: "Louisville", state: "KY", postalCode: "40219" }]
        //act 
        const actual = getFullAddress(emptyAddress);
        //assert
        expect(actual).toEqual('Address2 needs to be handle by function');
    })
});