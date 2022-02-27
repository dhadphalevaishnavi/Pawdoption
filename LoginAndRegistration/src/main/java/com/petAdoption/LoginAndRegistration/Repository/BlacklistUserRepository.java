package com.petAdoption.LoginAndRegistration.Repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petAdoption.LoginAndRegistration.Entity.BlackListUserEntity;

@Repository
public interface BlacklistUserRepository extends JpaRepository<BlackListUserEntity , Integer> {

	boolean existsByEmail(String email);
	
	@Transactional
	void deleteByEmail(String email);
}
