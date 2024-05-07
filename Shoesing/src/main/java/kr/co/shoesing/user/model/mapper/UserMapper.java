package kr.co.shoesing.user.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.shoesing.user.model.dto.User;

@Mapper
public interface UserMapper {

	/**
	 * 회원 로그인
	 * 
	 * @param string
	 * @return User
	 */
	User login(String userId);

	/**
	 * 회원 회원가입
	 * 
	 * @param inputUser
	 * @return result
	 */
	int signup(User inputUser);

	/**
	 * 회원 탈퇴
	 * 
	 * @param userId
	 * @return
	 */
	int delete(String userId);

	/**
	 * 회원 정보 중복 체크
	 * 
	 * @param map
	 * @return
	 */
	int check(Map<String, String> map);

	/**
	 * 탈퇴한 회원 복구
	 * 
	 * @param userId
	 * @return
	 */
	int restoration(String userId);

	/**
	 * 탈퇴한 회원인지 체크
	 * 
	 * @param inputId
	 * @return
	 */
	int checkDel(String inputId);

}
