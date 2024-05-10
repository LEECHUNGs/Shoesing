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

	/**
	 * 유저 아이콘 변경하기
	 * 
	 * @param inputIcon
	 * @param inputIcon2
	 * @return
	 */
	int changeIcon(String userId, String inputIcon);

	/**
	 * 탈퇴한 회원인지 체크
	 * 
	 * @param inputId
	 * @return
	 */
	int checkDel(String inputId);

	/**
	 * 회원 정보 수정 (관리자)
	 * 
	 * @param inputUser
	 * @return
	 */
	int updateAdmin(User inputUser);

	/**
	 * 회원 탈퇴/복구
	 * 
	 * @param userNo
	 * @param userDelFl
	 * @return
	 */
	int userDelFl(String userNo, String userDelFl);

	/**
	 * 입력한 비밀번호가 현재 비밀번호와 같은지 체크
	 * 
	 * @param userId
	 * @param inputPw
	 * @return
	 */
	int checkPw(String userId, String inputPw);

	/**
	 * 비밀번호 변경
	 * 
	 * @param loginUser
	 * @param inputPw
	 * @return
	 */
	int changePw(User loginUser, String inputPw);

	/**
	 * 내정보 수정
	 * 
	 * @param inputUser
	 * @return
	 */
	int updateProfile(User loginUser, String inputPw);

}
