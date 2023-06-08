import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { User } from 'src/app/models/User.model';
import { Consignment } from 'src/app/models/Consignment.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  format_consignments: {
    notReceived: Consignment[],
    received: Consignment[],
    assignedConsignments: Consignment[]
  };
  format_roles: Set<string>;

  constructor(
    private userDetailsService: UserDetailsService
  ) { }

  ngOnInit() {
    this.user = this.userDetailsService.viewUser;
    this.format_roles = this.userDetailsService.format_roles;
    this.format_consignments = this.userDetailsService.format_consignments;
    if (this.format_consignments) {
      console.log(this.format_consignments.assignedConsignments)
    }
  }

}
