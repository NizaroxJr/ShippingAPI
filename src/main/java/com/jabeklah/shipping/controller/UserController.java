package com.jabeklah.shipping.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jabeklah.shipping.model.UpdateUserInfo;
import com.jabeklah.shipping.model.User;
import com.jabeklah.shipping.services.UserService;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/users/all", method = RequestMethod.GET, produces = "application/json")
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
	@RequestMapping(value = "/users/get", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> getUser(@RequestBody Map<String, String> userInfo) {
		User foundUser = userService.getUser(userInfo.get("email"));
		if (foundUser == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(foundUser);
		}
		return ResponseEntity.ok(foundUser);
	}
	
	@RequestMapping(value = "/users/add", method = RequestMethod.POST, produces = "application/json")
	public boolean addUser(@RequestBody User newUser) {
		return userService.addUser(newUser);
	}
	
	@RequestMapping(value = "/users/update", method = RequestMethod.PUT, produces = "application/json")
	public ResponseEntity<?> updateUser(@RequestBody UpdateUserInfo udpated_userInfo) {
		boolean valid = userService.updateUser(udpated_userInfo.getOldEmail(), udpated_userInfo.getUpdatedUser());
		if (valid) {
			return ResponseEntity.ok(valid);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(valid);
	}
	
	@RequestMapping(value = "/users/delete", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> deleteUser(@RequestBody Map<String, String> userInfo) {
		boolean valid = userService.deleteUser(userInfo.get("email"));
		if (valid) {
			return ResponseEntity.ok(valid);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(valid);
	}
}
