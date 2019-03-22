import { getFullAddress } from './AddressService'
import _ from 'lodash';
describe('parseAddress', () => {
    it('should return a friendly message when the address is empty', () => {
        //arrange 
        const emptyAddress = {};
        //act 
        const actual = getFullAddress(emptyAddress);
        //assert
        expect(actual).toEqual('address is empty');
    })

    it('should return the full address when all address properties are provided', () => {
        //arrange 
        const actualAddress = _.assign({ 'address1': "1745 T Street Southeast1", 'address2': "Apt 15", 'city': "Louisville", 'state': "KY", 'postalCode': "40219" });
        //act 
        const actual = getFullAddress(actualAddress);
        //assert
        expect(actual).toEqual('1745 T Street Southeast1, Apt 15,  Louisville,  KY  40219');
    })

    it('should return a friendly message when address does not match', () => {
        //arrange 
        const actualAddress = _.assign({ 'address1': "1745 T Street Southeast1", 'address2': "", 'city': "Louisville", 'state': "KY", 'postalCode': "40219" });
        //act 
        const actual = getFullAddress(actualAddress);
        //assert
        expect(actual).toEqual('should return the full address when all address properties are provied except address2');
    })
});
