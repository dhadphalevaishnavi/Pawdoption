package com.petAdoption.LoginAndRegistration.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petAdoption.LoginAndRegistration.DTO.ComplaintsAllDetailsDTO;
import com.petAdoption.LoginAndRegistration.Entity.ComplaintsEntity;
import com.petAdoption.LoginAndRegistration.Repository.ComplaintRepository;
import com.petAdoption.LoginAndRegistration.Repository.UserRepository;

@Service
public class ComplaintsAllDetailsService {

	@Autowired
	ComplaintRepository compRepo;
	
	
	
	public List<ComplaintsAllDetailsDTO> getAllComplaints() {
		
		List<ComplaintsAllDetailsDTO> compDetails = new ArrayList<>();
		List<ComplaintsEntity> complaint = compRepo.findAll();
		
		for(ComplaintsEntity c : complaint)
		{
			ComplaintsAllDetailsDTO singleCompDetails = new ComplaintsAllDetailsDTO();
			singleCompDetails.setCatagory(c.getCatagory());
			singleCompDetails.setComplaintId(c.getComplaintId());
			singleCompDetails.setDescription(c.getDescription());
			singleCompDetails.setStatus(c.getStatus());
			
			String raisedByUserEmail = c.getUser().getEmail();
			singleCompDetails.setRaisedByUserEmail(raisedByUserEmail);

			String raisedForUserEmail = c.getComplaintPet().getOwner().getEmail();
			singleCompDetails.setRaisedForUserEmail(raisedForUserEmail);
			
			compDetails.add(singleCompDetails);
		}
		
		
		return compDetails;
	}
	
	
	public List<ComplaintsAllDetailsDTO> getSolvedComplaints() 
	{
		
		List<ComplaintsAllDetailsDTO> compDetails = new ArrayList<>();
		List<ComplaintsEntity> complaint = compRepo.findByStatus("Solved");
		
		for(ComplaintsEntity c : complaint)
		{
			ComplaintsAllDetailsDTO singleCompDetails = new ComplaintsAllDetailsDTO();
			singleCompDetails.setCatagory(c.getCatagory());
			singleCompDetails.setComplaintId(c.getComplaintId());
			singleCompDetails.setDescription(c.getDescription());
			singleCompDetails.setStatus(c.getStatus());
			
			String raisedByUserEmail = c.getUser().getEmail();
			singleCompDetails.setRaisedByUserEmail(raisedByUserEmail);

			String raisedForUserEmail = c.getComplaintPet().getOwner().getEmail();
			singleCompDetails.setRaisedForUserEmail(raisedForUserEmail);
			
			compDetails.add(singleCompDetails);
		}
		
		
		return compDetails;

	}
	
	
	

	public List<ComplaintsAllDetailsDTO> getUnsolvedComplaints() 
	{
		List<ComplaintsAllDetailsDTO> compDetails = new ArrayList<>();
		List<ComplaintsEntity> complaint = compRepo.findByStatus("Unsolved");
		
		for(ComplaintsEntity c : complaint)
		{
			ComplaintsAllDetailsDTO singleCompDetails = new ComplaintsAllDetailsDTO();
			singleCompDetails.setCatagory(c.getCatagory());
			singleCompDetails.setComplaintId(c.getComplaintId());
			singleCompDetails.setDescription(c.getDescription());
			singleCompDetails.setStatus(c.getStatus());
			
			String raisedByUserEmail = c.getUser().getEmail();
			singleCompDetails.setRaisedByUserEmail(raisedByUserEmail);

			String raisedForUserEmail = c.getComplaintPet().getOwner().getEmail();
			singleCompDetails.setRaisedForUserEmail(raisedForUserEmail);
			
			compDetails.add(singleCompDetails);
		}
		
		
		return compDetails;
		
	}
	
	public List<ComplaintsAllDetailsDTO> getComplaintsFromEmail(String emailId) 
	{
		
		List<ComplaintsAllDetailsDTO> compDetails = new ArrayList<>();
		List<ComplaintsEntity> complaint = compRepo.findByUserEmail(emailId);
		
		for(ComplaintsEntity c : complaint)
		{
			ComplaintsAllDetailsDTO singleCompDetails = new ComplaintsAllDetailsDTO();
			singleCompDetails.setCatagory(c.getCatagory());
			singleCompDetails.setComplaintId(c.getComplaintId());
			singleCompDetails.setDescription(c.getDescription());
			singleCompDetails.setStatus(c.getStatus());
			
			String raisedByUserEmail = c.getUser().getEmail();
			singleCompDetails.setRaisedByUserEmail(raisedByUserEmail);

			String raisedForUserEmail = c.getComplaintPet().getOwner().getEmail();
			singleCompDetails.setRaisedForUserEmail(raisedForUserEmail);
			
			compDetails.add(singleCompDetails);
		}
		
		
		return compDetails;

	}
	
}
