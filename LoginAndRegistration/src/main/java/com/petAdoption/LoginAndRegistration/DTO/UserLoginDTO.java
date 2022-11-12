package com.petAdoption.LoginAndRegistration.DTO;

import com.petAdoption.LoginAndRegistration.Entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {

	public
	String email;
	
	public
	String password;
	
	public
	String password2;
	
	public
	String username;
	
	public
	int userId;
	
	public
	String role;
}
