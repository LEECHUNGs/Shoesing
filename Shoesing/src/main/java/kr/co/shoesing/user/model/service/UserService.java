package kr.co.shoesing.user.model.service;

import kr.co.shoesing.user.model.dto.User;

public interface UserService {

	/**
	 * 회원 로그인
	 * 
	 * @param inputUser
	 * 
	 * @return User
	 */
	User login(User inputUser);

	/**
	 * 회원 회원가입
	 * 
	 * @param inputUser
	 * @return result
	 */
	int signup(User inputUser);

	/**
	 * 회원 아이디 중복체크
	 * 
	 * @param userId
	 * @return result
	 */
	int checkId(String userId);

	/**
	 * 회원 이메일 중복체크
	 * 
	 * @param userId
	 * @return result
	 */
	int checkEmail(String userId);

	/**
	 * 회원 닉네임 중복체크
	 * 
	 * @param userId
	 * @return result
	 */
	int checkNickname(String userId);

}
