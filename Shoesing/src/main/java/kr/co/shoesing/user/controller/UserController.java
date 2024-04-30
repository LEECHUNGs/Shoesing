package kr.co.shoesing.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("user")
@SessionAttributes({ "loginUser" })
public class UserController {

	private final UserService service;

	/**
	 * 로그인 페이지
	 * 
	 * @return
	 */
	@GetMapping("login")
	public String login() {
		return "pages/login";
	}

	/**
	 * 로그인
	 * 
	 * @param inputUser
	 * @param model
	 * @param ra
	 */
	@PostMapping("login")
	public String login(User inputUser, Model model, RedirectAttributes ra) {

		User loginUser = service.login(inputUser);

		model.addAttribute("loginUser", loginUser);

		if (loginUser != null) {
			ra.addFlashAttribute("message", "성공!");

		} else {
			ra.addFlashAttribute("message", "실패!");

		}

		return "redirect:/";
	}

	/**
	 * 로그아웃 페이지
	 * 
	 * @param status
	 */
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete();
		return "redirect:/";
	}

	// 유저 주소 정보 처리 기능 필요!
	/**
	 * 회원가입 페이지
	 * 
	 * @param status
	 */
	@GetMapping("signup")
	public String signup() {
		return "pages/signup";
	}

	/**
	 * @param inputUser
	 * @param ra
	 */
	@PostMapping("signup")
	public String signup(User inputUser, RedirectAttributes ra) {

		int result = service.signup(inputUser);

		if (result > 0) {
			ra.addFlashAttribute("message", "성공!");

		} else {
			ra.addFlashAttribute("message", "실패!");

		}

		return "redirect:/";

	}

	/**
	 * 마이페이지 페이지
	 * 
	 * @return
	 */
	@GetMapping("myPage")
	public String myPage() {
		return "pages/myPage";
	}

}
