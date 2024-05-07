package kr.co.shoesing.admin.model.service;

import java.util.List;

import kr.co.shoesing.user.model.dto.User;

public interface AdminService {

	/**
	 * 모든 회원 조회
	 * 
	 * @return
	 */
	List<User> selectAllUser();

}
