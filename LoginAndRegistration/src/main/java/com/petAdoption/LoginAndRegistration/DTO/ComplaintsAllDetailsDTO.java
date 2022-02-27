package com.petAdoption.LoginAndRegistration.DTO;

import com.petAdoption.LoginAndRegistration.Entity.ComplaintsEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintsAllDetailsDTO {

	int complaintId;
	
	String description;
	
	String catagory;
	
	String status;
	
	String raisedByUserEmail;
	
	String raisedForUserEmail;
	
}
