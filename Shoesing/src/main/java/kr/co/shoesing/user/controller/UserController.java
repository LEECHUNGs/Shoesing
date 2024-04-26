package kr.co.shoesing.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("user")
@SessionAttributes({ "loginUser" })
public class UserController {

	private final UserServiceImpl service;

	@PostMapping("login")
	public String login(User inputUser, Model model) {

		User loginUser = service.login();

		model.addAttribute("loginUser", loginUser);

		return "redirect:/";
	}

	/**
	 * 로그아웃
	 * 
	 * @param status
	 * @return
	 */
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete();
		return "redirect:/";
	}

	@PostMapping("signup")
	public String signup(User inputUser) {

		service.signup(inputUser);

		return "";

	}
}
