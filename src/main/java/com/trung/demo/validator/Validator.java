package com.trung.demo.validator;

import java.util.regex.Pattern;

public class Validator {
	public static boolean isValidEmail(String email) { 
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+ 
                            "[a-zA-Z0-9_+&*-]+)*@" + 
                            "(?:[a-zA-Z0-9-]+\\.)+[a-z" + 
                            "A-Z]{2,7}$"; 
                              
        Pattern pat = Pattern.compile(emailRegex); 
        if (email == null) 
            return false; 
        return pat.matcher(email).matches(); 
    }
	
	public static boolean isValidName(String name) {
		if (name == null || name.length() == 0)
			return false;
		
		for (char c:name.toCharArray()) {
			if (!Character.isLetter(c))
				return false;
		}
		return true;
	}
	
	public static void main(String[] args) {
		//System.out.println(isValid("vtt@yahoo.com.vn"));
		//System.out.println(isValidName(""));
	}
}
