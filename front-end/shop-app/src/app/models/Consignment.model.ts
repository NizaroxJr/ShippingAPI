import { User } from './User.model';

export interface Consignment {
  id: number;
  description: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  price: number;
  currency: string;
  user: User;
  assignedEmployee: User;
  ownerName: string;
  assignedUserName: string;
  received: boolean;
}