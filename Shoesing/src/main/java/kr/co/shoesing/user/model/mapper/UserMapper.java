package kr.co.shoesing.user.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import kr.co.shoesing.user.model.dto.User;

@Mapper
public interface UserMapper {

	/**
	 * 회원 로그인
	 * 
	 * @return User
	 */
	User login();

}
