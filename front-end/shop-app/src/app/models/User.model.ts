import { Consignment } from './Consignment.model';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: Set<string>;
  consignments: Set<Consignment>;
  assignedConsignments: Set<Consignment>;
}