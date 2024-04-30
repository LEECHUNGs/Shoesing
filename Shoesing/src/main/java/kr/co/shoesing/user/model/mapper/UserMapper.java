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

	/**
	 * 회원 회원가입
	 * 
	 * @param inputUser
	 */
	void signup(User inputUser);

	//테스트용 ID중복검사
	int checkId(String userId);

	//테스트용 닉네임 중복검사
	int checkNickname(String userNickname);

	//테스트용 비밀번호 중복검사
	int checkPw(String userPw);

}
