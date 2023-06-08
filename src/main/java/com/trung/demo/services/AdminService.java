package com.trung.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trung.demo.model.AdminAddUserRequest;
import com.trung.demo.model.AssignConsignment;
import com.trung.demo.model.Consignment;
import com.trung.demo.model.Role;
import com.trung.demo.model.User;
import com.trung.demo.model.UserConsignment;
import com.trung.demo.repository.ConsignmentRepository;
import com.trung.demo.repository.UserRepository;

@Service
public class AdminService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ConsignmentRepository consignmentRepository;
	
	@Autowired
	private UserService userService;
	
	public User adminAddUser(AdminAddUserRequest user) {
		boolean isFirstNameFilled = !user.getFirstName().equals("");
		boolean isLastNameFilled = !user.getLastName().equals("");
		boolean isEmailFilled = !user.getEmail().equals("");
		boolean isRoleSelected = !user.getRole().equals("");
				
		if (!isFirstNameFilled || !isLastNameFilled || !isEmailFilled || !isRoleSelected
				|| !userService.isValid(user.getFirstName(), user.getLastName(), user.getEmail())) {
			return null;
		}
		
		String encodedPass = generateBcryptPassword();
		User newUser = new User(user.getFirstName(), user.getLastName(), user.getEmail(), encodedPass, encodedPass);
		newUser.addRole(new Role(user.getRole(), newUser));
		userRepository.save(newUser);
		return newUser;
	}
	
	public String generateBcryptPassword() {
		String encodedPass = new BCryptPasswordEncoder().encode("pass");
		return encodedPass;
	}
	
	public UserConsignment assignConsignment(AssignConsignment payload) {
		// unassign from another employee
		List<User> employees = loadAllEmployees();
		for (User employee:employees) {
			Set<Consignment> assignedConsignments = employee.getAssignedConsignments();
			for (Consignment consignment : assignedConsignments) {
				if (consignment.getId() == payload.getConsignment().getId()) {
					employee.unassignConsignment(consignment);
					consignment.setAssignedEmployee(null);
					consignment.setAssignedUserName(null);
					consignmentRepository.save(consignment);
					break;
				}
			}
		}
		
		User foundUser = userRepository.findByEmail(payload.getUserEmail());
		if (foundUser != null) {
			Consignment consignment = payload.getConsignment();
			Consignment foundConsignment = consignmentRepository.findById(consignment.getId());
			
			foundConsignment.setAssignedEmployee(foundUser);
			foundConsignment.setAssignedUserName(foundUser.getFirstName() + " " + foundUser.getLastName());
			foundUser.assignConsignment(foundConsignment);
			consignmentRepository.save(foundConsignment);
			return new UserConsignment(foundUser, foundConsignment);
		}
		return null;
	}
	
	public UserConsignment unassignConsignment(AssignConsignment payload) {
		User foundUser = userRepository.findByEmail(payload.getUserEmail());
		if (foundUser != null) {
			System.out.println("Found user " + foundUser.getFirstName());
			Consignment consignment = payload.getConsignment();
			Consignment foundConsignment = consignmentRepository.findById(consignment.getId());
			
			foundConsignment.setAssignedEmployee(null);
			foundConsignment.setAssignedUserName(null);
			
			foundUser.unassignConsignment(foundConsignment);
			System.out.println("HERE....");
			consignmentRepository.save(foundConsignment);
			return new UserConsignment(foundUser, foundConsignment);
		}
		return null;
	}
	
	public List<User> loadAllEmployees() {
		List<User> users = (List<User>) userRepository.findAll();
		List<User> employees = new ArrayList<>();
		
		for (User user:users) {
			Set<Role> roles = user.getRoles();
			for (Role role: roles) {
				if (role.getRole().equals("EMPLOYEE")) {
					employees.add(user);
				}
			}
		}
		return employees;
	}
}
