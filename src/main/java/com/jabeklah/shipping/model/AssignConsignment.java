package com.jabeklah.shipping.model;

public class AssignConsignment {
	// assigned employee email
	private String userEmail;
	// assigned consignment
	private Consignment consignment;
	// owner name
	private String ownerName;
	//owner email
	private String ownerEmail;
	
	public AssignConsignment() {}
	
	public AssignConsignment(String userEmail, Consignment consignment, String ownerName, String ownerEmail) {
		super();
		this.userEmail = userEmail;
		this.consignment = consignment;
		this.ownerName = ownerName;
		this.ownerEmail = ownerEmail;
	}
	
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public Consignment getConsignment() {
		return consignment;
	}
	public void setConsignment(Consignment consignment) {
		this.consignment = consignment;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getOwnerEmail() {
		return ownerEmail;
	}

	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}
	
}
