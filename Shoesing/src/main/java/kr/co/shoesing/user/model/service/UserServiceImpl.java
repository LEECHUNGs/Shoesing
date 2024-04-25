package kr.co.shoesing.user.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

	private final UserMapper mapper;

	/**
	 * 회원 로그인
	 * 
	 * @return User
	 */
	public User login() {
		User loginUser = mapper.login();

		return null;
	}

}
