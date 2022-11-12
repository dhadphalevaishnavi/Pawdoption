package com.petAdoption.LoginAndRegistration.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petAdoption.LoginAndRegistration.Entity.PetEntity;


@Repository
public interface PetRepository extends JpaRepository<PetEntity, Integer> {

	List<PetEntity> findByOwnerUserId(int userId);
	
	PetEntity findByOwnerUserIdAndPetId(int userId , int petId);
	
	PetEntity findByPetId(int petId);
	
	List<PetEntity> findByPetType(String type);
	
	PetEntity findByInterestedUsersListUserIdAndPetId(int userId , int petId);

	@Transactional
	void deleteByPetId(int petId);
	
	@Transactional
	void deleteByOwnerUserId(int userId);
}
