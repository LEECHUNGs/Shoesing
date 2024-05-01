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
	 * 회원 탈퇴
	 */
	int delete(String userId);

	/**
	 * 유저 정보 중복 체크
	 * 
	 * @param input  : 체크하고자 하는 유저 정보
	 * @param method : 체크하고자 하는 정보 (userId, userEmail, userName)
	 * @return result : COUNT(*)
	 */
	int check(String input, String method);

	/**
	 * 탈퇴한 회원 복구
	 * 
	 * @param userId
	 * @return
	 */
	int restoration(String userId);

}
