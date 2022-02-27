package com.petAdoption.LoginAndRegistration.Entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="complaints")
public class ComplaintsEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int complaintId;
	
	String description;
	
	String catagory;
	
	String status;
	
	@ManyToOne
//	@JsonIgnore
	@JoinColumn(name="userId" ,referencedColumnName="userId")
	UserEntity user;
	
	@ManyToOne
	@JoinColumn(name="petId" , referencedColumnName="petId")
	PetEntity complaintPet;
	
	
//	@JsonIgnore
//	@ManyToOne(fetch = FetchType.LAZY )
//	@JoinColumn(name="userId" ,referencedColumnName="userId")
//	UserEntity user;
}
