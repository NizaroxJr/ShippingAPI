import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Consignment } from '../models/Consignment.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  viewUser: User;
  format_consignments: {
    notReceived: Consignment[],
    received: Consignment[],
    assignedConsignments: Consignment[]
  };
  format_roles: Set<string>;

  constructor() { }

  setViewUser(user: User) {
    // console.log(user);
    this.format_roles = this.formatRoles(user);
    const format_consignments = this.constructConsignments(user);
    this.viewUser = user;
    this.format_consignments = format_consignments;
  }

  formatRoles(user: User) {
    const format_roles = [];
    user.roles.forEach(r => format_roles.push(r['role']));
    return new Set(format_roles);
  }

  constructConsignments(user: User) {
    const map = {
      notReceived: [],
      received: [],
      assignedConsignments: [...user.assignedConsignments]
    };

    user.consignments.forEach(consignment => {
      if (consignment.received) {
        map.received.push(consignment);
      } else {
        map.notReceived.push(consignment);
      }
    })
    return map;
  }
}
