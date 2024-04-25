package kr.co.shoesing.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

	/**
	 * 홈페이지 전환
	 * 
	 * @return
	 */
	@RequestMapping("/")
	public String home() {
		return "pages/home";
	}

	// 테스트용 ------------------------------------
	@GetMapping("login")
	public String login() {
		return "pages/user/login";
	}
	
	@GetMapping("findId")
	public String findId() {
		return "pages/user/findId";
	}

	@GetMapping("findPw")
	public String findPw() {
		return "pages/user/findPw";
	}
	
	@GetMapping("signUp")
	public String signUp() {
		return "pages/user/signUp";
	}
	@GetMapping("agreement")
	public String agreeMent() {
		return "pages/user/agreement";
	}
}
