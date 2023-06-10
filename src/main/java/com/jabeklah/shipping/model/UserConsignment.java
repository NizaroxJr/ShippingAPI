package com.jabeklah.shipping.model;

public class UserConsignment {
	private User user;
	private Consignment consignment;
	
	public UserConsignment() {}

	public UserConsignment(User user, Consignment consignment) {
		super();
		this.user = user;
		this.consignment = consignment;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Consignment getConsignment() {
		return consignment;
	}

	public void setConsignment(Consignment consignment) {
		this.consignment = consignment;
	}
	
}
