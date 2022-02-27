package com.petAdoption.LoginAndRegistration.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petAdoption.LoginAndRegistration.DTO.QuestionDTO;
import com.petAdoption.LoginAndRegistration.Entity.QuestionEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;
import com.petAdoption.LoginAndRegistration.Repository.QuestionRepository;
import com.petAdoption.LoginAndRegistration.Repository.UserRepository;

@Service
public class QuestionService {

	@Autowired
	QuestionRepository questionRepo;
	
	@Autowired
	UserRepository userRepo;
	
	public List<QuestionEntity> showAllQuestions()
	{
		List<QuestionEntity> qEntity = questionRepo.findAll();
				
		return qEntity;
	}
	
	public boolean searchByUserId(int userId)
	{
		QuestionEntity qEntity = questionRepo.findByUserUserId(userId);
		
		if(qEntity != null)
			return true;
		return false;
	}
	
	public QuestionEntity searchQuestionByUserId(int userId)
	{
		QuestionEntity qEntity = questionRepo.findByUserUserId(userId);
		
		return qEntity;
	}
	
	public void editQuestion(QuestionDTO dto,int userId)
	{
	
		QuestionEntity questionEntity = questionRepo.findByUserUserId(userId);
		
		questionEntity.setCaregiver(dto.getCaregiver());
		questionEntity.setCity(dto.getCity());
		questionEntity.setDayStaying(dto.getDayStaying());
		questionEntity.setIsAlargic(dto.getIsAlargic());
		questionEntity.setNightStaying(dto.getNightStaying());
		questionEntity.setNoOfPetsOwnedBefore(dto.getNoOfPetsOwnedBefore());
		questionEntity.setPetIsFor(dto.getPetIsFor());
		questionEntity.setVetDistance(dto.getVetDistance());
		
		questionRepo.save(questionEntity);		
		
	}
	
	
	public void addQuestion(QuestionDTO answerDto ,int userId)
	{
		
		QuestionEntity newAnswers = dtoToEntity(answerDto , userId);
	
		questionRepo.save(newAnswers);
	}
	
	QuestionEntity dtoToEntity(QuestionDTO dto, int userId)
	{
		QuestionEntity questionEntity = new QuestionEntity();
		
		questionEntity.setCaregiver(dto.getCaregiver());
		questionEntity.setCity(dto.getCity());
		questionEntity.setDayStaying(dto.getDayStaying());
		questionEntity.setIsAlargic(dto.getIsAlargic());
		questionEntity.setNightStaying(dto.getNightStaying());
		questionEntity.setNoOfPetsOwnedBefore(dto.getNoOfPetsOwnedBefore());
		questionEntity.setPetIsFor(dto.getPetIsFor());
		questionEntity.setVetDistance(dto.getVetDistance());
		
		//find user having userId=this.userId
		UserEntity user= userRepo.findById(userId);
		
		questionEntity.setUser(user);
		
		return questionEntity;
		
	}
	
	QuestionDTO entityToDto(QuestionEntity qEntity)
	{
		QuestionDTO dto = new QuestionDTO();
		
		dto.setCaregiver(qEntity.getCaregiver());
		dto.setCity(qEntity.getCity());
		dto.setDayStaying(qEntity.getDayStaying());
		dto.setIsAlargic(qEntity.getIsAlargic());
		dto.setNightStaying(qEntity.getNightStaying());
		dto.setNoOfPetsOwnedBefore(qEntity.getNoOfPetsOwnedBefore());
		dto.setPetIsFor(qEntity.getPetIsFor());
		dto.setVetDistance(qEntity.getVetDistance());
		
		return dto;
		
	}
	
	
}
