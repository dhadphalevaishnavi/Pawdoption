package com.petAdoption.LoginAndRegistration.Repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.petAdoption.LoginAndRegistration.Entity.QuestionEntity;


@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Integer> {

	QuestionEntity findByUserUserId(int userId);
	
	
}
