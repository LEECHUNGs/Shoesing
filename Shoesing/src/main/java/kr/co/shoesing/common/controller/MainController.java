package kr.co.shoesing.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MainController {

	/**
	 * 파일 테스트용!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	 * 
	 * @return
	 */
	@RequestMapping("/fileTest")
	public String Test() {
		return "pages/fileTest";
	}

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

	/**
	 * 로그인 안함 에러
	 * 
	 * @param ra
	 * @return
	 */
	@GetMapping("loggedOutError")
	public String loggedOutError(RedirectAttributes ra) {

		ra.addFlashAttribute("message", "로그인을 먼저 해주시기 바랍니다");

		return "redirect:/";
	}

}
