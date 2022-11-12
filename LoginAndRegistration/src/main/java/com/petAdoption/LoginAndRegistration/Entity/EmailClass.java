package com.petAdoption.LoginAndRegistration.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailClass {

	String username;
	String email;
	String password;
	String confirmPassword;
	
	
	
}
