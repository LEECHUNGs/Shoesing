package kr.co.shoesing.user.model.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {
	// 암호화
	private BCryptPasswordEncoder passwordEncoder;
	// Mapper
	private final UserMapper mapper;

	/**
	 * 회원 로그인
	 * 
	 * @return User
	 */
	public User login() {
		User loginUser = mapper.login();

		return loginUser;
	}

	/**
	 * 회원 회원가입
	 * 
	 * @param inputUser
	 */
	public void signup(User inputUser) {
		mapper.signup(inputUser);
	}

	//테스트용 Id 중복검사
	@Override
	public int checkId(String userId) {
		
		return mapper.checkId(userId);
	}

	//테스트용 닉네임 중복검사
	@Override
	public int checkNickname(String userNickname) {
		
		return mapper.checkNickname(userNickname);
	}

}
