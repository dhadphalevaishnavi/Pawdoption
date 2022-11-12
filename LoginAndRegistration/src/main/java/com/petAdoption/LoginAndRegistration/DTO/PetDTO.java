package com.petAdoption.LoginAndRegistration.DTO;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.petAdoption.LoginAndRegistration.Entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PetDTO {

	int petId;
	
	String petType;
	
	String bread;
	
//	String sex;
	
	String gender;
	
	int ageYears;
	
	int ageMonths;
	
	String color;
	
	String petCity;
	
	String description;
	
	String petName;
	
	String status;
	
	UserEntity owner;
	
}
