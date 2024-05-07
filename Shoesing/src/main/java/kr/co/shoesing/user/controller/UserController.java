package kr.co.shoesing.user.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
	public String login(User inputUser, Model model, RedirectAttributes ra,
			@RequestParam(value = "saveId", required = false) String saveId, HttpServletResponse resp) {

		User loginUser = service.login(inputUser);

		if (loginUser != null) {

			if (service.checkDel(inputUser.getUserId()) == 1) { // 탈퇴한 회원이 아닐 경우
				model.addAttribute("loginUser", loginUser);

				ra.addFlashAttribute("message", "성공!");
				// 쿠키 설정
				Cookie cookie = new Cookie("saveId", loginUser.getUserId());

				cookie.setPath("/");

				// 만료 기간
				if (saveId != null) { // 아이디 저장 체크 시
					cookie.setMaxAge(60 * 60 * 24 * 30); // 30일

				} else { // 아이디 저장 미체크 시
					cookie.setMaxAge(0);
				}
				// 응답 객체 resp에 쿠키 실어 보내기
				resp.addCookie(cookie);

				ra.addFlashAttribute("message", "성공!");

			} else if (service.checkDel(inputUser.getUserId()) == 0) { // 탈퇴한 회원일 경우
				ra.addFlashAttribute("message", "탈퇴한 회원입니다");

			}

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
	public String delete(HttpServletRequest request, RedirectAttributes ra, SessionStatus status) {
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

			// 세션 만료 (로그아웃)
			status.setComplete();

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
	public String restoration(HttpServletRequest request, RedirectAttributes ra,
			@RequestParam("inputId") String inputId) {

		int result = service.restoration(inputId);

		// 성공 시
		if (result > 0) {
			ra.addFlashAttribute("message", "성공적으로 회원 복구가 완료되었습니다");

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

		// 회원 리스트에 회원이 존재하는 지 체크
		int result = service.check(inputId, "userId");

		return result;

	}

	/**
	 * 아이디 DB에 존재하는지 체크
	 * 
	 * @param inputId
	 * @return
	 */
	@ResponseBody
	@PostMapping("checkNickname")
	public int checkNickname(@RequestBody String inputNickname) {

		// 회원 리스트에 회원이 존재하는 지 체크
		int result = service.check(inputNickname, "userNickname");

		return result;

	}

	/**

	 * 현재 비밀번호와 새로 입력한 비밀번호가 같은지 체크
	 * 
	 * @param inputPw
	 * @return
	 */
	@ResponseBody
	@PostMapping("checkPw")
	public int checkPw(@RequestBody String inputPw) {

		String method = "userpw";

		
		int result = service.checkPw(inputPw);
		
		String message = null;
		String path = null;
		
		
		if(result  > 0) {
			path = "/user/delete";
			message = "회원을 탈퇴하시겠습니까?";
		}else {
			path = "/user/updateProfile";
			message = "현재 비밀번호가 일치하지 않습니다";
		}

		return result;

	}
	@ResponseBody
	@PostMapping("changeIcon")
	public int changeIcon(HttpServletRequest request,
						@RequestBody Map<String, String> map,
						Model model) {
		log.info("map {}",map);
		HttpSession session = request.getSession();

		User loginUser = (User) session.getAttribute("loginUser");
		
		String userId = loginUser.getUserId();
		
		int result = service.changeIcon(userId, map.get("inputIcon"));
		
			
		
		return result;
		
	}

	 * 아이디 DB에 존재하는지 체크
	 * 
	 * @param inputId
	 * @return
	 */
	@ResponseBody
	@PostMapping("checkDel")
	public int checkDel(@RequestBody String inputId) {
		// 회원 리스트에 회원이 존재하는 지 체크
		if (service.check(inputId, "userId") > 0) {

			// 탈퇴한 회원인지 조회
			if (service.checkDel(inputId) > 0) {
				return 1; // 회원이 탈퇴 상태가 아니면 1 반환
			}
			return 0; // 회원이 존재하고 탈퇴 상태이면 0 반환

		}

		return 2; // 회원이 존재하지않으면 2 반환
	}


}
