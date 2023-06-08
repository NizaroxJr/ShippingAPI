package com.trung.demo.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trung.demo.model.AuthRequest;
import com.trung.demo.model.AuthResponse;
import com.trung.demo.model.MailRequest;
import com.trung.demo.model.Role;
import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;
import com.trung.demo.security.JwtUtil;
import com.trung.demo.validator.Validator;

@Service
public class AuthService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private EmailService emailService;
	
	
	public boolean isFilled(String field) {
		return field != null && !field.equals("");
	}
	
	public AuthResponse validateLogin(AuthRequest authReq) {
		AuthResponse authRes = new AuthResponse();
		
		// check if username & password are filled
		boolean userNameFilled = isFilled(authReq.getEmail());
		boolean passwordFilled = isFilled(authReq.getPassword());
		
		// check if username is filled
		if (!userNameFilled) {
			authRes.setEmailErrMsg("Please enter email");
		}
		
		// check if password is filled
		if (!passwordFilled) {
			authRes.setPasswordErrMsg("Please enter password");
		}
		
		// if one of them isn't filled --> return
		if (!userNameFilled || !passwordFilled) {
			authRes.setValid(false);
			return authRes;
		}
		
		// all fields are filled, start authenticate
		try {
			Authentication authObj = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.getEmail(), authReq.getPassword()));
						
			// good authentication, create JWT token
			String jwtToken = jwtUtil.generateToken(authReq.getEmail());
			
			authRes.setJwtToken("Bearer " + jwtToken);
			authRes.setValid(authObj.isAuthenticated());
			authRes.setEmailErrMsg(null);
			authRes.setPasswordErrMsg(null);
			authRes.setCurrent_user(userRepo.findByEmail(authReq.getEmail()));
			authRes.setSuccessMsg("You have logged in successfully!");
			
			return authRes;
			
		} catch (AuthenticationException e) {
			authRes.setValid(false);
			// wrong username
			if (!userRepo.existsByEmail(authReq.getEmail())) {
				authRes.setEmailErrMsg("Invalid username");
			} else {
				// correct username, wrong password
				authRes.setPasswordErrMsg("Invalid password");
			}
			return authRes;
		}
	}
	
	public AuthResponse register(User newUser) {
		AuthResponse authRes = new AuthResponse();
		
		boolean isFirstNameFilled = isFilled(newUser.getFirstName());
		boolean isLastNameFilled = isFilled(newUser.getLastName());
		boolean isEmailFilled = isFilled(newUser.getEmail());
		boolean isPasswordFilled = isFilled(newUser.getPassword());
		
		boolean isFirstNameValidFormat = Validator.isValidName(newUser.getFirstName());
		boolean isLastNameValidFormat = Validator.isValidName(newUser.getLastName());
		boolean isEmailValidFormat = Validator.isValidEmail(newUser.getEmail());
		
		if (!isFirstNameFilled) {
			authRes.setFirstNameErrMsg("Please enter first name");
		} else if (!isFirstNameValidFormat) {
			authRes.setFirstNameErrMsg("Name should NOT contain numbers and special characters");
		}
		
		if (!isLastNameFilled) {
			authRes.setLastNameErrMsg("Please enter last name");
		} else if (!isLastNameValidFormat) {
			authRes.setLastNameErrMsg("Name should NOT contain numbers and special characters");
		}
		
		if (!isEmailFilled) {
			authRes.setEmailErrMsg("Please enter email");
		} else if (!isEmailValidFormat) {
			authRes.setEmailErrMsg("Invalid email format");
		}
		
		if (!isPasswordFilled) {
			authRes.setPasswordErrMsg("Please password");
		}
		
		if (!isFirstNameFilled || !isLastNameFilled || !isEmailFilled || !isPasswordFilled || !isFirstNameValidFormat || !isLastNameValidFormat || !isEmailValidFormat ) {
			authRes.setValid(false);
			return authRes;
		}
		
		if (!newUser.getPassword().equals(newUser.getConfirmPassword())) {
			authRes.setConfirmPasswordErrMsg("Passwords not matched");
			authRes.setValid(false);
			return authRes;
		}
		
		if (userRepo.existsByEmail(newUser.getEmail())) {
			authRes.setValid(false);
			authRes.setGeneralErr("This user already exists");
			return authRes;
		}
		
		String encodedPassword = new BCryptPasswordEncoder().encode(newUser.getPassword()); 
		newUser.setPassword(encodedPassword);
		newUser.setConfirmPassword(encodedPassword);
		// new user always has a default role as CUSTOMER
		newUser.addRole(new Role("CUSTOMER", newUser));
		userRepo.save(newUser);
		authRes.setValid(true);
		authRes.setSuccessMsg("Your account has been created! You can login now");
		
		// send email to new user
		MailRequest mailReq = new MailRequest("", newUser.getEmail(), "vtt311096@gmail.com", "Welcome to Cogent Fedex");
		Map<String, Object> model = new HashMap<>();
		model.put("name", newUser.getFirstName());
		emailService.sendEmail(mailReq, model);
		
		return authRes;
	}
	
}
