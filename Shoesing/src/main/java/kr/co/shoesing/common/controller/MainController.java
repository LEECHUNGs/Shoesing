package kr.co.shoesing.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RequestParam;


import kr.co.shoesing.user.model.service.UserService;
import lombok.extern.slf4j.Slf4j;
=======
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
>>>>>>> development

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

	/**
	 * 이미 로그인된 회원 에러
	 * 
	 * @param ra
	 * @return
	 */
	@GetMapping("loggedInError")
	public String loggedInError(RedirectAttributes ra) {

		ra.addFlashAttribute("message", "이미 로그인된 회원입니다");

		return "redirect:/";
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
