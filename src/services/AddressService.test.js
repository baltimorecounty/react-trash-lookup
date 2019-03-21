import { getFullAddress } from './AddressService';

describe('parseAddress', () => {
    it('should return a friendly message when the address is empty', () => {
        //arrange
        const emptyAddress = {};

        //act
        const actual = getFullAddress(emptyAddress);

        //assert
        expect(actual).toEqual(
            '1745 T Street Southeast1, Louisville, KY  40219'
        );
    });

    it('should return a friendly message when the address is matched', () => {
        //arrange
        const emptyAddress = [
            {
                address1: '1745 T Street Southeast1',
                address2: 'Apt 15',
                city: 'Louisville',
                state: 'KY',
                postalCode: '40219'
            }
        ];

        //act
        const actual = getFullAddress(emptyAddress);

        //assert
        expect(actual).toEqual(
            '1745 T Street Southeast1, Apt 15, Louisville, KY 40219'
        );
    });

    it('should return a friendly message when address does not match', () => {
        //arrange
        const emptyAddress = [
            {
                address1: '1745 T Street Southeast1',
                address2: 'Apt 15',
                city: 'Louisville',
                state: 'KY',
                postalCode: '40219'
            }
        ];

        //act
        const actual = getFullAddress(emptyAddress);

        //assert
        expect(actual).toEqual(
            '1745 T Street Southeast1, Louisville, KY 40219'
        );
    });
});
