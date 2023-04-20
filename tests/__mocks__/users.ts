import { User } from '@/modules/users/domain/User';

export const users: User[] = [
    { id: 1, name: 'User 1', email: 'user1@mail.com', address: { street: 'Street 1', suite: 'Suite 1', city: 'City 1', zipcode: 'Zipcode 1', geo: { lat: 'Lat 1', lng: 'Lng 1' } }, phone: 'Phone 1', website: 'Website 1', company: { name: 'Company 1', catchPhrase: 'Catch phrase 1', bs: 'BS 1' }},
    { id: 2, name: 'User 2', email: 'user2@mail.com', address: { street: 'Street 2', suite: 'Suite 2', city: 'City 2', zipcode: 'Zipcode 2', geo: { lat: 'Lat 2', lng: 'Lng 2' } }, phone: 'Phone 2', website: 'Website 2', company: { name: 'Company 2', catchPhrase: 'Catch phrase 2', bs: 'BS 2' }}
];