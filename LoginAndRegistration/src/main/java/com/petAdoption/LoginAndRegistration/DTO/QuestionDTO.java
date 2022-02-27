package com.petAdoption.LoginAndRegistration.DTO;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.petAdoption.LoginAndRegistration.Entity.QuestionEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {

	String petIsFor;
	
	String caregiver;
	
	String isAlargic;
	
	String noOfPetsOwnedBefore;
	
	String vetDistance;
	
	String dayStaying;
	
	String nightStaying;
	
	String city;
	
	UserEntity user;
	
	
	
}
