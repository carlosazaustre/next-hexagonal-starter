import { UserAddress } from './UserAddress';
import { UserCompany } from './UserCompany';

export interface User {
	id: number;
	name: string;
	email: string;
	address: UserAddress;
	phone: string;
	website: string;
	company: UserCompany;
}
