package kr.co.shoesing.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


import kr.co.shoesing.user.model.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class MainController {

	
	@Autowired
	private UserService service;
	
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
		return "pages/login";
	}
	
	@GetMapping("findId")
	public String findId() {
		return "pages/findId";
	}
	
	@GetMapping("findPw")
	public String findPw() {
		return "pages/findPw";
	}
	
	@GetMapping("agreement")
	public String agreement() {
		return "pages/agreement";
	}
	
	@GetMapping("signup")
	public String signup() {
		return "pages/signup";
	}
	


}
