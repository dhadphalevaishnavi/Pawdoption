package com.petAdoption.LoginAndRegistration.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petAdoption.LoginAndRegistration.DTO.PetDTO;
import com.petAdoption.LoginAndRegistration.Entity.ComplaintsEntity;
import com.petAdoption.LoginAndRegistration.Entity.PetEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;
import com.petAdoption.LoginAndRegistration.Repository.PetRepository;
import com.petAdoption.LoginAndRegistration.Repository.UserRepository;

@Service
public class PetService {

	@Autowired
	PetRepository petRepo;
	
	@Autowired
	UserRepository userRepo;
	
	public void addPet(PetDTO dto , int ownerId)
	{
		PetEntity pet=dtoToEntity(dto , ownerId);
		pet.setStatus("Unadopted");
		
		petRepo.save(pet);		
		
	}
	
	public PetEntity getPetById(int petId)
	{
		return petRepo.findById(petId).get();
	}
	
	public void editPet(PetDTO dto , int ownerId)
	{
	//	PetEntity pet = petRepo.findByOwnerUserId(ownerId);
		PetEntity pet=petRepo.findByOwnerUserIdAndPetId( ownerId ,  dto.getPetId());
		
		pet.setAgeMonths(dto.getAgeMonths());
		pet.setAgeYears(dto.getAgeYears());
		pet.setBread(dto.getBread());
		pet.setColor(dto.getColor());
		pet.setGender(dto.getGender());
		pet.setPetCity(dto.getPetCity());
		pet.setPetType(dto.getPetType());
		pet.setPetName(dto.getPetName());
		pet.setDescription(dto.getDescription());
		pet.setStatus(dto.getStatus());
//		pet.setSex(dto.getSex());
		
		petRepo.save(pet);
		
	}
	
	public List<PetEntity> showAllPets()
	{
		List<PetEntity> pet = petRepo.findAll();
		
		return pet;
	}
	
	public List<PetEntity>searchPetByType(String type)
	{
		List<PetEntity> pet =petRepo.findByPetType(type);
		
		return pet;
	}
	
	public List<PetEntity> searchPetByOwnerId(int ownerId) {
		
		List<PetEntity> pet =petRepo.findByOwnerUserId(ownerId);
		
		return pet;
		
	}
	
	public String deletePet(int petId) {
	
		PetEntity pet = petRepo.findById(petId).get();
		petRepo.delete(pet);
//		petRepo.deleteByPetId(petId);
		return "Pet Deleted";
	}
	
	public void deletePetByUserId(int userId)
	{
		petRepo.deleteByOwnerUserId(userId);
	}
	
	public PetEntity dtoToEntity(PetDTO dto , int ownerId)
	{
		PetEntity pet=new PetEntity();
		
		pet.setAgeMonths(dto.getAgeMonths());
		pet.setAgeYears(dto.getAgeYears());
		pet.setBread(dto.getBread());
		pet.setColor(dto.getColor());
		pet.setGender(dto.getGender());
		pet.setPetCity(dto.getPetCity());
		pet.setPetType(dto.getPetType());
		pet.setPetName(dto.getPetName());
		pet.setDescription(dto.getDescription());
//		pet.setSex(dto.getSex());
		
		//find user/owner having userId=this.userId
		UserEntity owner= userRepo.findById(ownerId);
		pet.setOwner(owner);
		
		return pet;
	}

	public void addInterestPeople( int petId , int userId) {
		
		UserEntity user=userRepo.findById(userId);
		PetEntity newPet= petRepo.getById(petId);
		
		PetEntity checkPet =petRepo.findByInterestedUsersListUserIdAndPetId(userId, petId);
		
		if(checkPet == null)
		{
			List<PetEntity> petList = user.getInterestedPetList();
			petList.add(newPet);
			
			user.setInterestedPetList( petList );
			
			userRepo.save(user);
		}

	}

	public List<UserEntity> getUsersWhoSentEnquary(int petId)
	{
		List<UserEntity> user = userRepo.findByInterestedPetListPetId(petId);
		return user;
	}

	public String removePetFromInterestedListOfUser(int petId, int userId) {
		
		UserEntity user=userRepo.findById(userId);
		PetEntity newPet= petRepo.getById(petId);
		
		List<PetEntity> petList = user.getInterestedPetList();
		petList.remove(newPet);
		
		user.setInterestedPetList( petList );
		
		userRepo.save(user);
		
		return "Removed from intereste list of"+userId;
	}



	
}
