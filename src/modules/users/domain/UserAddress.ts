import { UserAddressGeolocation } from './UserAddressGeolocation';

export interface UserAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: UserAddressGeolocation;
}
