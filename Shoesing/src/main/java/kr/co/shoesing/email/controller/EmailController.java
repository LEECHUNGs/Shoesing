package kr.co.shoesing.email.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.shoesing.email.model.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {

	private final EmailService service;

	@PostMapping("signup")
	public int signup(@RequestBody String email) {

		log.debug(email);
		String authKey = service.sendEmail("emailAuth", email);

		if (authKey != null) {
			return 1; // 발송 성공시 1 반환
		}

		return 0; // 발송 실패시 0 반환
	}

	@PostMapping("checkAuthKey")
	public int checkAuthKey(@RequestBody Map<String, Object> map) {
		// K : V 두가지 = {email : 이메일 값} {authKey : 인증번호 값}

		return service.checkAuthKey(map);
	}
}