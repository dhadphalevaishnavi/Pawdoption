package com.petAdoption.LoginAndRegistration.Service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

	public boolean sendEmail(String to , String subject ,String message)
	{
		boolean sentSuccessfull=false;
		
		String emailFrom="bhubharogers@gmail.com";
		
		String password="jtmokvjkuvstxvbq"; //2 step verification App Password
		
		//Variable for gmail
		String host="smtp.gmail.com";
		
		//get System Properties
		Properties properties=System.getProperties();
		System.out.println(properties);
		
		//setting IMP info to properties object
		
		//host set
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port","465");
		properties.put("mail.smtp.ssl.enable","true");
		properties.put("mail.smtp.auth","true");
		
		//step 1 : Get The Session Object
		Session session=Session.getInstance(properties, new Authenticator() {
			
			protected PasswordAuthentication getPasswordAuthentication()
			{
				return new PasswordAuthentication(emailFrom,password);
			}
			
		});
				
		session.setDebug(true);
		
		MimeMessage m=new MimeMessage(session);
		
		try {
			// from email
			m.setFrom(emailFrom);
			
			//adding recipient to message
			m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			
			//add subject to message
			m.setSubject(subject);
			
			//add text to message
			m.setText(message);
			
			//SEND send message using Transport Class
			
			Transport.send(m);
			
			System.out.println("Sent Successfully.................");
			
			sentSuccessfull=true;
			
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		
		return sentSuccessfull;
		
	}
	
	
}
















