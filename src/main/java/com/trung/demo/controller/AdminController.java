package com.trung.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.trung.demo.model.AdminAddUserRequest;
import com.trung.demo.model.AssignConsignment;
import com.trung.demo.model.User;
import com.trung.demo.model.UserConsignment;
import com.trung.demo.services.AdminService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController {
	
	@Autowired
	public AdminService adminService;
	
	@RequestMapping(value = "admin/employees/all", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<?> loadAllEmployees() {
		List<User> employees = adminService.loadAllEmployees();
		return ResponseEntity.ok(employees);
	}
	
	@RequestMapping(value = "admin/add", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> adminAddUser(@RequestBody AdminAddUserRequest user) {
		User newUser = adminService.adminAddUser(user);
		if (newUser != null) {
			return ResponseEntity.ok(newUser);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(newUser);
	}
	
	@RequestMapping(value = "admin/assign", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> adminAssignEmployee(@RequestBody AssignConsignment payload) {
		UserConsignment res = adminService.assignConsignment(payload);
		if (res != null) {
			return ResponseEntity.ok(res);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
	}
	
	@RequestMapping(value = "admin/unassign", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> adminUnassignEmployee(@RequestBody AssignConsignment payload) {
		UserConsignment res = adminService.unassignConsignment(payload);
		if (res != null) {
			return ResponseEntity.ok(res);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
	}
}
