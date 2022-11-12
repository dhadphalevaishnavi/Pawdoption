package com.petAdoption.LoginAndRegistration.Entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="pet")
public class PetEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
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
	
//	@OneToOne(cascade = CascadeType.ALL )
//	@JoinColumn(name="ownerId" ,referencedColumnName="userId")
//	UserEntity owner;
//	
	@ManyToOne
	@JoinColumn(name="ownerId" ,referencedColumnName="userId")
	UserEntity owner;
	
	@ManyToMany(mappedBy = "userWishList" , cascade = CascadeType.ALL )
	List<UserEntity> wishListUsersList = new ArrayList<>();
	
	
	@ManyToMany(mappedBy = "interestedPetList" , cascade = CascadeType.ALL )
	List<UserEntity> interestedUsersList = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "complaintPet", cascade = CascadeType.ALL )
	List<ComplaintsEntity> complaintList = new ArrayList<>(); 
	
	
//	@OneToMany(mappedBy = "owner" ,fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	List<PetEntity> addedPetList = new ArrayList<>();
}
