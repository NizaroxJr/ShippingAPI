import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as AdminActions from '../../actions/admin.action';
import { User } from 'src/app/models/User.model';
import { Consignment } from 'src/app/models/Consignment.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  available_employees: Set<User> = new Set<User>();
  @Input() target_user: User;
  @Input() target_user_roles: Set<string>;
  @Input() assigned_consignment: Consignment;
  assigned_employee_email: string;

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(AdminActions.LOAD_EMPLOYEES());

    this.store.pipe(select('employee')).subscribe(res => {
      // console.log(res.all_employees);  
      const allEmployees = new Set<User>();
      res.all_employees.forEach(employee => {
        if (!this.target_user_roles.has('EMPLOYEE') || this.target_user.email !== employee.email) {
          allEmployees.add(employee);
        }
        const assignedConsignments = [...employee.assignedConsignments];
        for (let i = 0; i < assignedConsignments.length; i++) {
          const assignedConsignment = assignedConsignments[i];
          if (assignedConsignment.id === this.assigned_consignment.id) {
            this.assigned_employee_email = employee.email;
            break;
          }
        }
      })
      this.available_employees = allEmployees;
      // console.log(this.available_employees);
    })
  }

  onAssign(assigned_employee_email: string) {
    console.log(this.assigned_employee_email);
    console.log(assigned_employee_email);

    if (this.assigned_employee_email !== assigned_employee_email) {
      this.assigned_employee_email = assigned_employee_email;
      this.store.dispatch(AdminActions.ADMIN_ASSIGN_EMPLOYEE({
        payload: {
          employeeEmail: this.assigned_employee_email,
          assigned_consignment: this.assigned_consignment,
          owner_name: this.target_user.firstName + ' ' + this.target_user.lastName,
          owner_email: this.target_user.email
        }
      }));
    } else {
      this.store.dispatch(AdminActions.ADMIN_UNASSIGN_EMPLOYEE({
        payload: {
          employeeEmail: this.assigned_employee_email,
          assigned_consignment: this.assigned_consignment,
          owner_name: this.target_user.firstName + ' ' + this.target_user.lastName,
          owner_email: this.target_user.email
        }
      }));
      this.assigned_employee_email = null;
    }
  }

  setBtnStyle(employee: User) {
    const assignedConsignments = [...employee.assignedConsignments];
    for (let i = 0; i < assignedConsignments.length; i++) {
      const assignedConsignment = assignedConsignments[i];
      if (assignedConsignment.id === this.assigned_consignment.id) {
        return { 'btn-warning': true }
      }
    }
    return { 'btn-light': true }
  }

  setBtnTextStyle(employee: User) {
    const assignedConsignments = [...employee.assignedConsignments];
    for (let i = 0; i < assignedConsignments.length; i++) {
      const assignedConsignment = assignedConsignments[i];
      if (assignedConsignment.id === this.assigned_consignment.id) {
        return { 'font-weight-bold': true }
      }
    }
    return { 'font-weight-bold': false }
  }

}
