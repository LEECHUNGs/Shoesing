package kr.co.shoesing.email.model.service;

import java.util.Map;

public interface EmailService {

	/**
	 * 이메일로 인증번호 전송
	 * 
	 * @param string
	 * @param email
	 * @return
	 */
	String sendEmail(String string, String email);

	/**
	 * 이메일 인증번호 인증
	 * 
	 * @param map
	 * @return
	 */
	int checkAuthKey(Map<String, Object> map);

}
