package com.trung.demo.model;

public class AuthResponse {
	private String jwtToken;
	private String firstNameErrMsg;
	private String lastNameErrMsg;
	private String emailErrMsg;
	private String passwordErrMsg;
	private String confirmPasswordErrMsg;
	private String generalErr;
	private String successMsg;
	private boolean valid;
	private User current_user;
	
	public AuthResponse() { }

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
	
	public String getEmailErrMsg() {
		return emailErrMsg;
	}

	public void setEmailErrMsg(String emailErrMsg) {
		this.emailErrMsg = emailErrMsg;
	}

	public String getPasswordErrMsg() {
		return passwordErrMsg;
	}

	public void setPasswordErrMsg(String passwordErrMsg) {
		this.passwordErrMsg = passwordErrMsg;
	}

	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	public User getCurrent_user() {
		return current_user;
	}

	public void setCurrent_user(User current_user) {
		this.current_user = current_user;
	}

	public String getFirstNameErrMsg() {
		return firstNameErrMsg;
	}

	public void setFirstNameErrMsg(String firstNameErrMsg) {
		this.firstNameErrMsg = firstNameErrMsg;
	}

	public String getLastNameErrMsg() {
		return lastNameErrMsg;
	}

	public void setLastNameErrMsg(String lastNameErrMsg) {
		this.lastNameErrMsg = lastNameErrMsg;
	}

	public String getConfirmPasswordErrMsg() {
		return confirmPasswordErrMsg;
	}

	public void setConfirmPasswordErrMsg(String confirmPasswordErrMsg) {
		this.confirmPasswordErrMsg = confirmPasswordErrMsg;
	}

	public String getGeneralErr() {
		return generalErr;
	}

	public void setGeneralErr(String generalErr) {
		this.generalErr = generalErr;
	}

	public String getSuccessMsg() {
		return successMsg;
	}

	public void setSuccessMsg(String successMsg) {
		this.successMsg = successMsg;
	}
	
	
}
