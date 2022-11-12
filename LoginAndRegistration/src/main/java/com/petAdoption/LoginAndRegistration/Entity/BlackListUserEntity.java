package com.petAdoption.LoginAndRegistration.Entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="blacklist_users")
public class BlackListUserEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int userId;
		
	String email;
	
}
