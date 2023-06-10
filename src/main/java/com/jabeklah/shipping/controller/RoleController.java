package com.jabeklah.shipping.controller;

import com.jabeklah.shipping.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class RoleController {
	
	@Autowired
	private RoleRepository roleRepository;
	
	@RequestMapping(value = "/roles/all", method = RequestMethod.GET)
	public ResponseEntity<?> getAllRoles() {
		return ResponseEntity.ok(roleRepository.findAll());
	}
	
	@RequestMapping(value = "/roles/{role}", method = RequestMethod.GET)
	public ResponseEntity<?> getRole(@PathVariable String role) {
		return ResponseEntity.ok(roleRepository.findByRole(role));
	}
}
