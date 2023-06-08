package com.trung.demo.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MailResponse {
	private String message;
	private boolean status;
	
	public MailResponse(String message, boolean status) {
		super();
		this.message = message;
		this.status = status;
	} 
	
	public MailResponse() {}
}
