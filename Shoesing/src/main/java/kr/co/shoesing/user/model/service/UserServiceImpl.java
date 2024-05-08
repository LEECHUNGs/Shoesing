package kr.co.shoesing.user.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {
	// 암호화
	private final BCryptPasswordEncoder passwordEncoder;
	// Mapper
	private final UserMapper mapper;

	/**
	 * 회원 로그인
	 * 
	 * @return User
	 */
	public User login(User inputUser) {
		System.out.println(inputUser);

		String userId = inputUser.getUserId();

		User loginUser = mapper.login(userId);

		if (loginUser == null) { // Mapper 확인 안되는 경우
			return null; // 실패

		}

		// 비밀번호 검사
		if (passwordEncoder.matches(inputUser.getUserPw(), loginUser.getUserPw())) {
			return loginUser; // 성공

		}

		return null; // 실패
	}

	/**
	 * 회원 회원가입
	 * 
	 * @param inputUser
	 */
	public int signup(User inputUser) {
		// 비밀번호 암호화
		inputUser.setUserPw(passwordEncoder.encode(inputUser.getUserPw()));

		return mapper.signup(inputUser);
	}

	/**
	 * 회원 탈퇴
	 */
	@Override
	public int delete(String userId) {
		return mapper.delete(userId);
	}

	/**
	 * 유저 정보 중복 확인
	 */
	@Override
	public int check(String input, String method) {

		Map<String, String> map = new HashMap<>();

		map.put("input", input);
		map.put("method", method);

		return mapper.check(map);
	}

	/**
	 * 탈퇴한 회원 복구
	 */
	@Override
	public int restoration(String userId) {
		return mapper.restoration(userId);
	}
	

	/**
	 * 회원 아이콘 변경
	 */
	@Override
	public int changeIcon(String userId, String inputIcon) {
		
		Map<String, String> map = new HashMap<>();
		map.put("userId", userId);
		map.put("inputIcon", inputIcon);
	
		return mapper.changeIcon(map);
	}

	/**
	 * 탈퇴한 회원인지 체크
	 */
	@Override
	public int checkDel(String inputId) {
		return mapper.checkDel(inputId);
	}

	
	/**
	 * 비밀번호 변경
	 */
	@Override
	public int changePw(String userId, String inputPw) {
		
		String currentPw = mapper.checkPw(userId);
		
		if(!passwordEncoder.matches( inputPw,currentPw) ) {
		return 0;
		}
		return mapper.changePw(userId,inputPw);
	}

}
