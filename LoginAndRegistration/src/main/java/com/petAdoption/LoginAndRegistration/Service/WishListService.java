package com.petAdoption.LoginAndRegistration.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petAdoption.LoginAndRegistration.DTO.PetDTO;
import com.petAdoption.LoginAndRegistration.Entity.PetEntity;
import com.petAdoption.LoginAndRegistration.Entity.QuestionEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;
import com.petAdoption.LoginAndRegistration.Repository.PetRepository;
import com.petAdoption.LoginAndRegistration.Repository.QuestionRepository;
import com.petAdoption.LoginAndRegistration.Repository.UserRepository;

@Service
public class WishListService {

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	PetRepository petRepo;
	
	@Autowired
	QuestionRepository questionRepo;
	
	
	public List<PetEntity> returnWishList(int userId) {
		
		UserEntity user =userRepo.findById(userId);
		return user.getUserWishList();
	}


	public void addNewWish(int userId, PetDTO pet) {
		
		UserEntity user=userRepo.findById(userId);
		PetEntity newPet= petRepo.getById(pet.getPetId());
		
		user.addWish(newPet);
		
		userRepo.save(user);
		
		
	}
	
	public String removePetFromWishList(int userId , int petId)
	{
		UserEntity user=userRepo.findById(userId);
		PetEntity newPet= petRepo.getById(petId);
		
		List<PetEntity> petWishList = user.getUserWishList();
		petWishList.remove(newPet);
				
		userRepo.save(user);
		
		return"Removed from wishlist of "+userId;
	}
	
	//Get user question_profile->user info from petID 
	public List<UserEntity> getInterestedUsersFromPetId(int petId)
	{
		//first get users from wishList (user_pet many to many)
		List<UserEntity> user = userRepo.findByUserWishListPetId(petId);

		
		return user;
	}
}
