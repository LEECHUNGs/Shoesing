package kr.co.shoesing.user.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
	public int signup(User inputUser, String[] userAddress) {
		// 비밀번호 암호화
		if(!inputUser.getUserAddress().equals(",,")) {
			
			String address = String.join("^^^" , userAddress);
			inputUser.setUserAddress(address);
	
		}else {
			inputUser.setUserAddress(null);
		}
			// 비밀번호 암호화
		String encPw = passwordEncoder.encode(inputUser.getUserPw()); 
		inputUser.setUserPw(encPw);
		
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

	/** 회원 탈퇴 시 입력한 값과 현재 비밀번호 일치하는지 체크 
	 * @param userId
	 * @param inputPw
	 * @return result
	 */
//	@ResponseBody
//	@PostMapping("checkPw")
//	public int checkPw(HttpServletRequest request,
//						@RequestBody String inputPw){
//		
//		HttpSession session = request.getSession();
//		User loginUser = (User)session.getAttribute("loginUser");
//		String  userId = loginUser.getUserId();
//		
//		int result = service.checkCurrentPw(userId,inputPw);
//		
//		return result;
//	}

	/**
	 * 회원 정보 수정 (관리자)
	 */
	@Override
	public int updateAdmin(User inputUser) {
		return mapper.updateAdmin(inputUser);
	}

	/**
	 * 회원 탈퇴/복구 (관리자)
	 */
	@Override
	public int userDelFl(String userNo, String userDelFl) {
		int result = 0;

		if (userDelFl.equals("Y")) {
			result = mapper.restoreAdmin(userNo);
			return result;

		} else if (userDelFl.equals("N")) {
			result = mapper.deleteAdmin(userNo);
			return result;
		}

		return 0;
	}

	/**
	 * 비밀번호 변경
	 */
	@Override
	public int changePw(User loginUser, String inputPw) {

		// 현재 비밀번호가 같은지 보기
				String currentPw = mapper.checkCurrentPw(loginUser.getUserId());

				if (passwordEncoder.matches(inputPw, currentPw)) {
					return 2;
				}

				// 변경한 비밀번호 암호화 처리해주기
				loginUser.setUserPw(passwordEncoder.encode(inputPw));

				User user = new User();

				user.setUserId(loginUser.getUserId());
				user.setUserPw(loginUser.getUserPw());

				return mapper.changePw(user);

	}

	/**
	 * 내 정보 수정
	 */
	@Override
	public int updateProfile(User inputUser, String[] userAddress) {

		if(!inputUser.getUserAddress().equals(",,")) {
			inputUser.setUserAddress(null);
		}else {
			String address = String.join("^^^" , userAddress);
			
			inputUser.setUserAddress(address);
		}
		
		return mapper.updateProfile(inputUser);
	}

	//비밀번호 맞는지 확인
	@Override
	public int checkCurrentPw(String userId, String inputPw) {
		
		String currentPw = mapper.checkCurrentPw(userId);

		if (!passwordEncoder.matches(inputPw, currentPw)) {
			return 0;
		}
		return 1;
	}

	

}
