package com.petAdoption.LoginAndRegistration.Entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class UserEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int userId;
	
	@NotNull(message="Username field must not be null")
	String username;
	
	@Column(unique=true )
	@Email(message="Invalid Email Id")
	@NotNull(message="Email field must not be null")
	String email;
	
	@NotNull(message="Password field must not be null")
	@Size(min=5  , message="Password length must be greater than 5 characters")
	String password;
	
	String role;
	
	//wish list of pets
	@ManyToMany(cascade = CascadeType.ALL )
	@JsonIgnore
	@JoinTable(name="wish_list" , joinColumns=@JoinColumn(name="userId") , inverseJoinColumns=@JoinColumn(name="petId"))
	List<PetEntity> userWishList = new ArrayList<>();
	
	//Complaints
	//@OneToMany(mappedBy = "complaintId" ,fetch = FetchType.LAZY, cascade = CascadeType.ALL )
	@JsonIgnore
	@OneToMany(mappedBy = "complaintId" ,fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	List<ComplaintsEntity> complaints = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "owner" ,fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	List<PetEntity> addedPetList = new ArrayList<>();
	
	//interested pets list
	@ManyToMany(cascade = CascadeType.ALL )
	@JsonIgnore
	@JoinTable(name="interested_pet_user" , joinColumns=@JoinColumn(name="userId") , inverseJoinColumns=@JoinColumn(name="petId"))
	List<PetEntity> interestedPetList = new ArrayList<>();
	
	
	public void addWish(PetEntity pet)
	{
		userWishList.add(pet);
	}
}
