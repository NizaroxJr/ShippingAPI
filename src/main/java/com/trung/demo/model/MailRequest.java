package com.trung.demo.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MailRequest {
	
	private String name;
	private String to;
	private String from;
	private String subject;
	
	public MailRequest(String name, String to, String from, String subject) {
		super();
		this.name = name;
		this.to = to;
		this.from = from;
		this.subject = subject;
	}

	public MailRequest() {
		super();
	}
	
	
}
