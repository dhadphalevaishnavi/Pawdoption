package com.petAdoption.LoginAndRegistration.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="question_profile")
public class QuestionEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int qId;
	
	String petIsFor;
	
	String caregiver;
	
	String isAlargic;
	
	String noOfPetsOwnedBefore;
	
	String vetDistance;
	
	String dayStaying;
	
	String nightStaying;
	
	String city;
	
	@OneToOne
//	@JsonIgnore
	@JoinColumn(name="userId" ,referencedColumnName="userId")
	UserEntity user;
	
	
	
	
	
	
}
