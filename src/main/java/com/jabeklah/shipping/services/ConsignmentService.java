package com.jabeklah.shipping.services;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.jabeklah.shipping.repository.ConsignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jabeklah.shipping.model.Consignment;
import com.jabeklah.shipping.model.User;
import com.jabeklah.shipping.model.UserConsignment;

@Service
public class ConsignmentService {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ConsignmentRepository consignmentRepository;
	
	public Set<Consignment> getAllConsignments(String userEmail) {
		User user = userService.getUser(userEmail);
		return user.getConsignments();
	}
	
	public Map<String, Set<Consignment>> getConsignments(String userEmail) {
		User user = userService.getUser(userEmail);
		Map<String, Set<Consignment>> map = new HashMap<>();
		
		map.put("notReceived", new HashSet<Consignment>());
		map.put("received", new HashSet<Consignment>());
		
		for (Consignment cons : user.getConsignments()) {
			if (cons.isReceived())
				map.get("received").add(cons);
			else
				map.get("notReceived").add(cons);
		}
		map.put("assigned", user.getAssignedConsignments());
		return map;
	}
	
	public Set<Consignment> getAllConsignmentsNotReceived(String userEmail) {
		Set<Consignment> consignments = getAllConsignments(userEmail);
		Set<Consignment> notReceived = new HashSet<>();
		
		for (Consignment cons:consignments) {
			if (!cons.isReceived()) {
				notReceived.add(cons);
			}
		}
		return notReceived;
	}
	
	public Set<Consignment> getAllConsignmentsReceived(String userEmail) {
		Set<Consignment> consignments = getAllConsignments(userEmail);
		Set<Consignment> received = new HashSet<>();
		
		for (Consignment cons:consignments) {
			if (cons.isReceived()) {
				received.add(cons);
			}
		}
		return received;
	}
	
	// CRUDs
	public boolean addConsignment(User user, Consignment consignment) {
		boolean isDescriptionFilled = !consignment.getDescription().equals("");
		boolean isStreetFilled = !consignment.getStreet().equals("");
		boolean isCityFilled = !consignment.getCity().equals("");
		boolean isStateFilled = !consignment.getState().equals("");
		boolean isZipcodeFilled = consignment.getZipcode() != 0;
		boolean isCountryFilled = !consignment.getCountry().equals("");
		boolean isPriceFilled = consignment.getPrice() != 0;
		boolean isCurrencyFilled = !consignment.getCurrency().equals("");
		
		if (isDescriptionFilled && isStreetFilled && isCityFilled && isStateFilled 
				&& isZipcodeFilled && isCountryFilled && isPriceFilled && isCurrencyFilled) {
			
			consignment.setUser(user);
			consignment.setReceived(false);
			consignment.setOwnerName(user.getFirstName() + " " + user.getLastName());
			
			user.addConsignment(consignment);
			consignmentRepository.save(consignment);
			return true;
		}
		return false;
	}
	
	public UserConsignment deliverConsignment(User employee, Consignment assignedConsignment) {
		User foundEmployee = userService.getUser(employee.getEmail());
		Consignment foundConsignment = consignmentRepository.findById(assignedConsignment.getId());
		
		if (foundEmployee == null || foundConsignment == null)
			return null;
		
		foundConsignment.setReceived(true);
		consignmentRepository.save(foundConsignment);
		return new UserConsignment(foundEmployee, foundConsignment);
		
	}
}
