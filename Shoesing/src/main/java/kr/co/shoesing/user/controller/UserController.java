package kr.co.shoesing.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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

	/**
	 * 내정보 수정 페이지 
	 * 
	 * @return
	 */
	@GetMapping("updateProfile")
	public String updateProfile() {
		return "pages/user/updateProfile";
	}
	
	
	/**
	 * 회원 탈퇴
	 * 
	 * @param request
	 * @param ra
	 * @return
	 */
	@PostMapping("delete")
	public String delete(HttpServletRequest request, RedirectAttributes ra) {
		// 현재 세션
		HttpSession session = request.getSession();

		User loginUser = (User) session.getAttribute("loginUser");

		if (loginUser == null) { // 세션은 존재하지만 로그인한 회원은 존재하지 않을 경우
			ra.addFlashAttribute("message", "로그인한 유저가 존재하지 않습니다");

			return "redirect:/";
		}

		int result = service.delete(loginUser.getUserId());

		// 성공 시
		if (result > 0) {
			ra.addFlashAttribute("message", "성공적으로 탈퇴가 완료되었습니다");

			return "redirect:/";
		}

		// 이외의 방법으로 실패 시
		ra.addFlashAttribute("message", "실패");

		return "redirect:/";
	}

	/**
	 * 회원 복구 페이지
	 * 
	 * @return
	 */
	@GetMapping("restoration")
	public String restoration() {
		return "pages/restoration";
	}

	/**
	 * 회원 복구
	 * 
	 * @param request
	 * @param ra
	 * @param inputId
	 * @return
	 */
	@PostMapping("restoration")
	public String restoration(HttpServletRequest request, RedirectAttributes ra, @RequestBody String inputId) {

		int result = service.restoration(inputId);

		// 성공 시
		if (result > 0) {
			ra.addFlashAttribute("message", "성공적으로 탈퇴가 완료되었습니다");

			return "redirect:/";
		}

		// 이외의 방법으로 실패 시
		ra.addFlashAttribute("message", "실패");

		return "redirect:/";
	}

	/**
	 * 아이디 DB에 존재하는지 체크
	 * 
	 * @param inputId
	 * @return
	 */
	@ResponseBody
	@PostMapping("checkId")
	public int checkId(@RequestBody String inputId) {

		String method = "userId";

		// 회원 리스트에 회원이 존재하는 지 체크
		int result = service.check(inputId, method);

		return result;

	}

}
