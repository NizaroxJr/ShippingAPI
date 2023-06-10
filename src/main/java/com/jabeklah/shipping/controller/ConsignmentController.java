package com.jabeklah.shipping.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jabeklah.shipping.model.UserConsignment;
import com.jabeklah.shipping.services.ConsignmentService;

@CrossOrigin(origins = "*")
@RestController
public class ConsignmentController {
	@Autowired
	private ConsignmentService consignmentService;
	
	@RequestMapping(value="/consignments/all", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignments(@RequestBody String email) {
		return ResponseEntity.ok(consignmentService.getConsignments(email));
	}
	
	@RequestMapping(value="/consignments/notReceived", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignmentsNotReceived(@RequestBody String email) {
		return ResponseEntity.ok(consignmentService.getAllConsignmentsNotReceived(email));
	}
	
	@RequestMapping(value="/consignments/received", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignmentsReceived(@RequestBody String email) {
		return ResponseEntity.ok(consignmentService.getAllConsignmentsReceived(email));
	}
	
	@RequestMapping(value="/consignments/add", method=RequestMethod.POST)
	public ResponseEntity<?> addConsignment(@RequestBody UserConsignment payload) {
		boolean valid = consignmentService.addConsignment(payload.getUser(), payload.getConsignment());
		if (valid) {
			return ResponseEntity.ok(valid);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(valid);
	}
	
	@RequestMapping(value="/consignments/deliver", method=RequestMethod.POST)
	public ResponseEntity<?> deliverConsignment(@RequestBody UserConsignment payload) {
		UserConsignment res = consignmentService.deliverConsignment(payload.getUser(), payload.getConsignment());
		if (res != null) {
			return ResponseEntity.ok(res);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
	}
}
