package com.petAdoption.LoginAndRegistration.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.petAdoption.LoginAndRegistration.DTO.PetDTO;
import com.petAdoption.LoginAndRegistration.DTO.UserLoginDTO;
import com.petAdoption.LoginAndRegistration.Entity.PetEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;
import com.petAdoption.LoginAndRegistration.Repository.PetRepository;
import com.petAdoption.LoginAndRegistration.Repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	PetRepository petRepo;

	
	public List<UserEntity> showAllUsers()
	{
		return userRepo.findAll();
	}
	
	public void deleteUser(int userId)
	{
		userRepo.deleteByUserId(userId);
	}
	
	public void saveUser(UserLoginDTO newUser)
	{
		//first Encrypt Password
		
		PasswordEncoder passEncoder = new BCryptPasswordEncoder();
		
		String encodedPassword = passEncoder.encode(newUser.getPassword());
		newUser.setPassword(encodedPassword);		
		
		//set role of registered user - USER
		newUser.setRole("user");
	
						
		//save new User
		userRepo.save(userLoginDtoToEntity(newUser));
	}
	
	public UserLoginDTO searchUserWithEmailAndPassword(UserLoginDTO userDto)
	{
		
		PasswordEncoder passEncoder = new BCryptPasswordEncoder();
		
		
		UserEntity user= userRepo.findByEmail(userDto.getEmail());
		if(passEncoder.matches( userDto.getPassword() , user.getPassword()))	//match password with DB
		{
			UserLoginDTO dto= EntityToUserLoginDto(user);		
			return dto;
		}
		
		return null;
	}
	
	public void resetPassword(UserLoginDTO userToFind) {
		
		UserEntity user= userRepo.findByEmail(userToFind.getEmail());
		//first Encrypt Password
		
		PasswordEncoder passEncoder = new BCryptPasswordEncoder();
		
		String encodedPassword = passEncoder.encode(userToFind.getPassword());
		user.setPassword(encodedPassword);		
						
		//save new User
		userRepo.save(user);
		
	}
	
	public UserEntity userLoginDtoToEntity(UserLoginDTO dto)
	{
		UserEntity user=new UserEntity();
		
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		user.setUsername(dto.getUsername());
		user.setRole(dto.getRole());
		
		return user;
	}
	
	public UserLoginDTO EntityToUserLoginDto(UserEntity user)
	{
		UserLoginDTO dto=new UserLoginDTO();
		
		dto.setEmail(user.getEmail());
		dto.setPassword(user.getPassword());
		dto.setUsername(user.getUsername());
		dto.setUserId(user.getUserId());
		dto.setRole(user.getRole());
				
		return dto;
	}








}
