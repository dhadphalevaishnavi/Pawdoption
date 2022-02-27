package com.petAdoption.LoginAndRegistration.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petAdoption.LoginAndRegistration.Entity.ComplaintsEntity;

public interface ComplaintRepository extends JpaRepository<ComplaintsEntity, Integer> {
	
	List<ComplaintsEntity> findByUserUserId(int userId);
	
	List<ComplaintsEntity> findByUserAddedPetListPetId( int petId);
	
	@Transactional
	void deleteByUserAddedPetListPetId( int petId);
	
	@Transactional
	void deleteByUserUserId( int petId);

	List<ComplaintsEntity> findByStatus(String status);
	
	List<ComplaintsEntity> findByUserEmail(String email);
	
}
