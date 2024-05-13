package kr.co.shoesing.user.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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
	 * 회원 아이콘 변경
	 * 
	 * @param Map<String, String> map
	 * @return
	 */
	int changeIcon(Map<String, String> map);

	/**
	 * 탈퇴한 회원인지 체크
	 * 
	 * @param inputId
	 * @return
	 */
	int checkDel(String inputId);
	
	/** 비밀번호가 입력한 값과 같은지 체크
	 * @param userId
	 * @return
	 */
	String checkCurrentPw(String userId);

	/**
	 * 비밀번호 변경
	 * 
	 * @param userId
	 * @param inputPw
	 * @return
	 */
	int changePw(User user);

	/** 회원 정보 수정
	 * @param inputUser
	 * @return
	 */
	int updateProfile(User inputUser);
	

	/**
	 * 회원 정보 수정 (관리자)
	 * 
	 * @param inputUser
	 * @return
	 */
	int updateAdmin(User inputUser);

	/**
	 * 회원 복구 (관리자)
	 * 
	 * @param userNo
	 * @return
	 */
	int restoreAdmin(String userNo);

	/**
	 * 회원 삭제 (관리자)
	 * 
	 * @param userNo
	 * @return
	 */
	int deleteAdmin(String userNo);






}
