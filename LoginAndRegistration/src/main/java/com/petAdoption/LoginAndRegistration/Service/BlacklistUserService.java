package com.petAdoption.LoginAndRegistration.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petAdoption.LoginAndRegistration.Entity.BlackListUserEntity;
import com.petAdoption.LoginAndRegistration.Entity.ComplaintsEntity;
import com.petAdoption.LoginAndRegistration.Repository.BlacklistUserRepository;
import com.petAdoption.LoginAndRegistration.Repository.ComplaintRepository;

@Service
public class BlacklistUserService {

	@Autowired
	BlacklistUserRepository blacklistRepo;
	
	@Autowired
	ComplaintRepository compRepo;
	
	public String addUserToBlacklist(String email ,int complaintId)
	{
		//set complaint status to solved
		ComplaintsEntity complaint = compRepo.getById(complaintId);
		complaint.setStatus("Solved");
		compRepo.save(complaint);
		
		BlackListUserEntity blacklistUser = new BlackListUserEntity();
		blacklistUser.setEmail(email);
		
		blacklistRepo.save(blacklistUser);
		
		return "user email added to blacklist";
	}
	
	public boolean checkIfUserIsBlacklisted(String email)
	{
		return blacklistRepo.existsByEmail(email);
		
	}
	
	public String deleteFromBlacklist(String email)
	{
		blacklistRepo.deleteByEmail(email);
		return "user Removed from blacklist";
	}

	public List<BlackListUserEntity> getAllBlacklistedUsers() {
		
		return blacklistRepo.findAll();
	}
}
