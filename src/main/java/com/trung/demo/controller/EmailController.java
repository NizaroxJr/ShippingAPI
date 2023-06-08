package com.trung.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.trung.demo.model.MailRequest;
import com.trung.demo.model.MailResponse;
import com.trung.demo.services.EmailService;

@RestController
public class EmailController {
	
	@Autowired
	private EmailService service;
	
	@PostMapping("/sendingEmail")
	public MailResponse sendEmail(@RequestBody MailRequest request) {
		Map<String, Object> model = new HashMap<>();
		model.put("Name", request.getName());
		model.put("location", "Bethel Park, Pennsylvania");
		return service.sendEmail(request, model);

	}
}
