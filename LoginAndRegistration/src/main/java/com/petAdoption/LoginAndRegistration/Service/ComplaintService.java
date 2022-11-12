package com.petAdoption.LoginAndRegistration.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petAdoption.LoginAndRegistration.Entity.ComplaintsEntity;
import com.petAdoption.LoginAndRegistration.Entity.PetEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;
import com.petAdoption.LoginAndRegistration.Repository.ComplaintRepository;
import com.petAdoption.LoginAndRegistration.Repository.PetRepository;
import com.petAdoption.LoginAndRegistration.Repository.UserRepository;

@Service
public class ComplaintService {
	
	@Autowired
	ComplaintRepository compRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	PetRepository petRepo;
	
	public void addComplaint(ComplaintsEntity complaint , int userId ,int petId)
	{
		UserEntity user=userRepo.findById(userId);
		PetEntity pet = petRepo.getById(petId);
		
		ComplaintsEntity newcomplaint= new ComplaintsEntity();
		newcomplaint.setDescription(complaint.getDescription());
		newcomplaint.setCatagory(complaint.getCatagory());
		newcomplaint.setStatus("Unsolved");
		newcomplaint.setUser(user);
		newcomplaint.setComplaintPet(pet);
		
		compRepo.save(newcomplaint);

	}
	
	public void editComplaint(ComplaintsEntity complaint , int compId)
	{
				
		ComplaintsEntity newcomplaint= compRepo.getById(compId);
				
		newcomplaint.setDescription(complaint.getDescription());
		newcomplaint.setCatagory(complaint.getCatagory());
//		newcomplaint.setStatus("Unsolved");
//		newcomplaint.setUser(user);
//		
		compRepo.save(newcomplaint);

	}
	
	public List<ComplaintsEntity> getComplaints(int userId)
	{
		return compRepo.findByUserUserId(userId);
	}

	public void deleteComplaint(int compId) {
		
		compRepo.deleteById(compId);
	}

	public List<ComplaintsEntity> getComplaintsFromPetId(int petId) {
		
		return compRepo.findByUserAddedPetListPetId(petId);
	}

	public String deleteComplaintsFromPetId(int petId) {
		
		 compRepo.deleteByUserAddedPetListPetId(petId);
		 return "Complaints Deleted for petId "+petId;
	}

	public void deleteComplaintsFromUserId(int userId) {
		
		compRepo.deleteByUserUserId(userId);		
	}







}
