package com.petAdoption.LoginAndRegistration.Controller;

import java.util.List;
import java.util.Random;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petAdoption.LoginAndRegistration.DTO.ComplaintsAllDetailsDTO;
import com.petAdoption.LoginAndRegistration.DTO.PetDTO;
import com.petAdoption.LoginAndRegistration.DTO.QuestionDTO;
import com.petAdoption.LoginAndRegistration.DTO.UserLoginDTO;
import com.petAdoption.LoginAndRegistration.Entity.BlackListUserEntity;
import com.petAdoption.LoginAndRegistration.Entity.ComplaintsEntity;
import com.petAdoption.LoginAndRegistration.Entity.PetEntity;
import com.petAdoption.LoginAndRegistration.Entity.QuestionEntity;
import com.petAdoption.LoginAndRegistration.Entity.UserEntity;
import com.petAdoption.LoginAndRegistration.Service.BlacklistUserService;
import com.petAdoption.LoginAndRegistration.Service.ComplaintService;
import com.petAdoption.LoginAndRegistration.Service.ComplaintsAllDetailsService;
import com.petAdoption.LoginAndRegistration.Service.EmailService;
import com.petAdoption.LoginAndRegistration.Service.PetService;
import com.petAdoption.LoginAndRegistration.Service.QuestionService;
import com.petAdoption.LoginAndRegistration.Service.UserService;
import com.petAdoption.LoginAndRegistration.Service.WishListService;


@RestController
@RequestMapping("PetAdoption/")
@CrossOrigin(origins="http://localhost:4200")
public class UserController {

	Random random=new Random();
	
	@Autowired
	UserService userServ;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	QuestionService questionService;
	
	@Autowired
	PetService petService;
	
	@Autowired
	ComplaintService compService;
	
	@Autowired
	ComplaintsAllDetailsService compDetailsService;
	
	@Autowired
	WishListService wishService;
	
	@Autowired
	BlacklistUserService blacklistService;
	
	@GetMapping("/showAllUsers")
	List<UserEntity> showAllUsers()
	{
		
		return userServ.showAllUsers();
	}
	
	@PostMapping("/RegisterUser")
	String addNewUser(@Valid @RequestBody UserLoginDTO newUser)
	{
//		if(!blacklistService.checkIfUserIsBlacklisted(newUser.email))
//		{
//			userServ.saveUser(newUser);
//			return"New User Added";
//		}
//		return "This user is banned/Blacklisted";
		
		userServ.saveUser(newUser);
		return"New User Added";
	}
	
	@DeleteMapping("/deleteUser/{userId}")
	String deleteUser(@PathVariable int userId)
	{
		// First delete complaint of pet
		compService.deleteComplaintsFromUserId(userId);
		
		//now delete pet
		petService.deletePetByUserId(userId);
		
		//now delete user
		userServ.deleteUser(userId);
		
		return "User Deleted "+userId;
	}
	
	@PostMapping("/Login")
	UserLoginDTO checkExistingUser(@RequestBody UserLoginDTO user) throws Exception
	{
	

			UserLoginDTO dto=userServ.searchUserWithEmailAndPassword(user);
			if(dto!=null)
				return dto;
			
			else
			{
				
				throw new Exception("Bad Credentials");
			}


	}
	
	
	//Send email
	@PostMapping("/sendEmail")
	ResponseEntity<?> sendEmail(@RequestBody String sendEmailTo)
	{
		emailService.sendEmail(sendEmailTo, "Test Email Sending" , "This is Body of test Email");
		return ResponseEntity.ok("Done...");
	}
	

	//Send OTP on email
	@PostMapping("/sendOTP")
	String sendOTP(@RequestBody UserLoginDTO newUser) throws Exception
	{

			String otp="";
			for(int i=0 ;i<6;i++)
			{
				int digit=random.nextInt(10);
				otp+= String.valueOf(digit);
			}
			
			String otpMessage="Your One Time Password(OTP) for Pawdoption is "+otp;
			
			emailService.sendEmail(newUser.getEmail(), "OTP for Pawdoption" , otpMessage);
			return otp;

	}
	
	@PutMapping("/resetPassword")
	String resetPassword(@RequestBody UserLoginDTO user )
	{
		System.out.println(user.email);
		System.out.println(user.password);
		userServ.resetPassword(user);
		return " Password reset ";
	}
	
	//send user profile to pet Owner
	@PostMapping("/sendProfileMail/{userEmail}")
	String sendProfileMail(@RequestBody PetDTO pet , @PathVariable String userEmail)
	{
		//fetch owner profile 
		System.out.println(pet.getOwner());
		
		String subject = "Pawdoption : Someone sent enquary for your pet "+pet.getPetName();
		String profileMessage = "Visit your Pawdoption account for more information";
		
		emailService.sendEmail(userEmail, subject , profileMessage);
		

		return "Profile shared via email to Pet Owner";
	}
	
	//////////////////BLACKLIST USERS
	
	@PostMapping("/addUserToBlacklist/{email}/{complaintId}")
	String addUserToBlacklist( @PathVariable String email , @PathVariable int complaintId)
	{
		if(!blacklistService.checkIfUserIsBlacklisted(email))
			return blacklistService.addUserToBlacklist(email , complaintId);
		
		return "user is Already Blacklisted ";
	}
	
	@DeleteMapping("/deleteUserFromBlacklist/{email}")
	String deleteUserFromBlacklist(@PathVariable String email)
	{
		return blacklistService.deleteFromBlacklist(email);
	}
	
	@GetMapping("/checkIfUserIsBlocked/{email}")
	boolean checkIfUserIsBlocked(@PathVariable String email)
	{
		return blacklistService.checkIfUserIsBlacklisted(" "+email);
	}
	
	@GetMapping("/getAllBlacklistedUsers")
	List<BlackListUserEntity> getAllBlacklistedUsers()
	{
		return blacklistService.getAllBlacklistedUsers();
	}
	
	///////////////////// INTERESTED USER LIST FOR PET
	
	@PutMapping("/addInInterestedList/{petId}/{userId}")
	String addInInterestedList(@PathVariable int petId , @PathVariable int userId)
	{
		petService.addInterestPeople(petId , userId);
		
		return "Added in interested list";
	}
	
	@GetMapping("/getInterestedUsers/{petId}")
	List<UserEntity> showInterestedPeople(@PathVariable int petId )
	{
		return petService.getUsersWhoSentEnquary(petId);
	}
	
	@PostMapping("/deleteFromInterestedUser/{petId}")
	String deleteFromInterestedUserList(@PathVariable int petId ,  @RequestBody UserEntity user)
	{
		//Remove item
		petService.removePetFromInterestedListOfUser(petId , user.getUserId());
		
		//send email
		String petName = petService.getPetById(petId).getPetName(); 
		String subject = "Pawdoption : About your enquary for pet "+petName;
		String profileMessage = "Your Request has been viewd and rejected by current pet owner of "+petName;
		
		emailService.sendEmail(user.getEmail() , subject , profileMessage);
		
		return "Removed from interested list and sent emali to user informing rejection";
	}
	
	//////// QUESTION 
	
	@GetMapping("/showAllQuestions")
	List<QuestionEntity> showQuestions()
	{
			return questionService.showAllQuestions();
	}
	
	@GetMapping("/searchQuestionExists/{userId}")
	boolean addOrUpdate(@PathVariable int userId)
	{
		return questionService.searchByUserId(userId);
		
		
	}
	
	@GetMapping("/findUserProfile/{userId}")
	QuestionEntity findUserProfile(@PathVariable int userId)
	{
		return questionService.searchQuestionByUserId(userId);
	}
	
	@PostMapping("/addAnswersToQuestions/{userId}")
	String addAnswers(@RequestBody QuestionDTO dto,  @PathVariable int userId)
	{
		questionService.addQuestion(dto, userId);
		
		return "Added Successfully";
	}
	
	@PutMapping("/editAnswersToQuestions/{userId}")
	String editAnswers(@RequestBody QuestionDTO dto,  @PathVariable int userId)
	{
		questionService.editQuestion(dto, userId);
		
		return "edited Successfully";
	}
	
	
	//////////// PET
	
	@GetMapping("/showAllPets")
	List<PetEntity>showAllPets()
	{
		return petService.showAllPets();
	}
	
	@GetMapping("/searchPetByType/{type}")
	List<PetEntity>searchPetByType(@PathVariable String type)
	{
		return petService.searchPetByType(type);
	}
	
	@GetMapping("/searchPetByOwnerId/{ownerId}")
	List<PetEntity>searchPetByOwnerId(@PathVariable int ownerId)
	{
		return petService.searchPetByOwnerId(ownerId);
	}
	
	
	@PostMapping("/addPet/{ownerId}")
	String addPet(@RequestBody PetDTO pet , @PathVariable int ownerId)
	{
	
		petService.addPet(pet, ownerId);		
		return "PET added";
		
	}
	
	
	@PutMapping("/editPet/{ownerId}")
	String editPet(@RequestBody PetDTO pet , @PathVariable int ownerId)
	{
	
		petService.editPet(pet, ownerId);		
		return "PET edited";
		
	}
	
	@DeleteMapping("/deletePet/{petId}")
	String deletePet(@PathVariable int petId)
	{
		// First delete complaint of pet
		compService.deleteComplaintsFromPetId(petId);
		
		//now delete pet
		return petService.deletePet(petId);
	}
	
	///////////////////Wish List of user
	
	@GetMapping("/getWishList/{userId}")
	List<PetEntity> getWishList(@PathVariable int userId)
	{
		return wishService.returnWishList(userId);
	}
	
	@PostMapping("/addToWishList/{userId}")
	String addToWishList(@PathVariable int userId , @RequestBody PetDTO pet)
	{
		wishService.addNewWish(userId , pet);
		return "Added to wishList";
	}
	
	@DeleteMapping("/removeFromWishList/{userId}/{petId}")
	String deleteFromWishList(@PathVariable int petId , @PathVariable int userId)
	{
		return wishService.removePetFromWishList(userId, petId);
	}
	
	@GetMapping("/getInterestUsers/{petId}")
	List<UserEntity> findInterestedUsers(@PathVariable int petId)
	{
	//	return wishService.getInterestedUsersFromPetId(petId);
		return petService.getUsersWhoSentEnquary(petId);
	}
	
	
	///////////////////Complaints
	
	@GetMapping("/getAllComplaints")
	List<ComplaintsAllDetailsDTO> getAllComplaints()
	{
		return compDetailsService.getAllComplaints();
	}
	
	@PostMapping("/raiseComplaint/{userId}/{petId}")
	String raiseComplaint(@PathVariable int userId , @RequestBody ComplaintsEntity complaint , @PathVariable int petId )
	{
		compService.addComplaint(complaint, userId ,petId);
		return "Complaint Raised Successfully";
	}
	
	@GetMapping("/getComplaints/{userId}")
	List<ComplaintsEntity> getComplaints(@PathVariable int userId)
	{
		return compService.getComplaints(userId);
	}
	
	@GetMapping("/getComplaintsFromEmail/{emailId}")
	List<ComplaintsAllDetailsDTO> getComplaintsFromEmail(@PathVariable String emailId)
	{
		return compDetailsService.getComplaintsFromEmail(emailId);
	}
	
	@GetMapping("/getSolvedComplaints")
	List<ComplaintsAllDetailsDTO>getSolvedComplaints()
	{
		return compDetailsService.getSolvedComplaints();
	}
	
	@GetMapping("/getUnsolvedComplaints")
	List<ComplaintsAllDetailsDTO>getUnsolvedComplaints()
	{
		return compDetailsService.getUnsolvedComplaints();
	}
	
	@GetMapping("/getComplaintsOfPet/{petId}")
	List<ComplaintsEntity> getComplaintsFromPetId(@PathVariable int petId)
	{
		return compService.getComplaintsFromPetId(petId);
	}
	
	@DeleteMapping("/deleteComplaintsOfPet/{petId}")
	String deleteComplaintsFromPetId(@PathVariable int petId)
	{
		return compService.deleteComplaintsFromPetId(petId);
	}
	
	@DeleteMapping("/deleteComplaint/{compId}")
	String deleteComplaint(@PathVariable int compId)
	{
		compService.deleteComplaint(compId);
		return"deleted Complaint";
	}
	
	@PutMapping("/editComplaint/{compId}")
	String editComplaint(@RequestBody ComplaintsEntity complaint , @PathVariable int compId)
	{
		
		compService.editComplaint(complaint , compId);
		return"Complaint edited";
	}
	
}













