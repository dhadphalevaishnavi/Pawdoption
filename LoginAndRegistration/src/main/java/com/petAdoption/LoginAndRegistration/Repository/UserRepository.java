package com.petAdoption.LoginAndRegistration.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petAdoption.LoginAndRegistration.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

	public UserEntity findByEmail(String email);
	
	public UserEntity findById(int userId);
	
	List<UserEntity> findByUserWishListPetId(int petId );
	
	List<UserEntity> findByInterestedPetListPetId(int petId );

	@Transactional
	void deleteByUserId(int userId);
}
