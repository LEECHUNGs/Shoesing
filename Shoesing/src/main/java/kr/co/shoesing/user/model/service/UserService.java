package kr.co.shoesing.user.model.service;

import kr.co.shoesing.user.model.dto.User;

public interface UserService {

	/**
	 * 회원 로그인
	 * 
	 * @return User
	 */
	User login();

	// 테스트용 아이디 중복검사
	int checkId(String userId);

	// 테스트용 닉네임 중복검사
	int checkNickname(String userNickname);

	int checkPw(String userPw);

}
