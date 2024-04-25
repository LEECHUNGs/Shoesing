package kr.co.shoesing.user.model.service;

import kr.co.shoesing.user.model.dto.User;

public interface UserService {

	/**
	 * 회원 로그인
	 * 
	 * @return User
	 */
	User login();

}
