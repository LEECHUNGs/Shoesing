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
		return "pages/login-layout";
	}

}
