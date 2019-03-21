import { parseAddress } from './AddressService'


const data = [{ address1: "1745 T Street Southeast1", city: "Louisville", state: "KY", postalCode: "40219" }]

it('passing address data', () => {
    expect(parseAddress(data))
});