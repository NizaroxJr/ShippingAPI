package com.trung.demo.model;

public class UpdateUserInfo {
	private String oldEmail;
	private User updatedUser;
	
	public UpdateUserInfo(String oldEmail, User updatedUser) {
		super();
		this.oldEmail = oldEmail;
		this.updatedUser = updatedUser;
	}

	public String getOldEmail() {
		return oldEmail;
	}

	public User getUpdatedUser() {
		return updatedUser;
	}
	
}
