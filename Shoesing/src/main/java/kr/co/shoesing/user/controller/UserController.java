package kr.co.shoesing.user.controller;

import java.util.Arrays;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
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
		return "pages/user/login";
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
			@RequestParam(value = "saveId", required = false) String saveId, HttpServletResponse resp,
			HttpServletRequest request) {

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

		if (request.getRequestURI().equals("/user/login")) {
			return "redirect:/";
		}

		return "redirect:" + request.getHeader("REFERER");
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
		return "pages/user/signup";
	}

	/**
	 * @param inputUser
	 * @param ra
	 */
	@PostMapping("signup")
	public String signup(User inputUser, @RequestParam("userAddress") String[] userAddress, RedirectAttributes ra) {
		
		int result = service.signup(inputUser, userAddress);
		
		String path = null;
		String message = null;
		
		if (result > 0) {
			message = inputUser.getUserNickname() + " 님 환영합니다";
			path ="/";
			
		} else {
			message = " 회원가입에 실패했습니다";
			path = "signup";
		}
	
		ra.addFlashAttribute("message",message);
		return "redirect:"+path;

	}


	/**
	 * 마이페이지 페이지
	 * 
	 * @return
	 */
	@GetMapping("myPage")
	public String myPage() {
		return "pages/user/myPage";
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
		return "pages/user/restoration";
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

	// 프로필 아이콘 변경하기
	@ResponseBody
	@PostMapping("changeIcon")
	public int changeIcon(HttpServletRequest request, @RequestBody Map<String, String> map) {
		log.info("map {}", map);
		HttpSession session = request.getSession();

		User loginUser = (User) session.getAttribute("loginUser");
		loginUser.setUserIcon(map.get("inputIcon"));
		session.setAttribute("loginUser", loginUser);
		String userId = loginUser.getUserId();

		int result = service.changeIcon(userId, map.get("inputIcon"));

		return result;
	}

	/*
	 * 아이디 DB에 존재하는지 체크
	 * 
	 * @param inputId
	 * 
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

	/**
	 * 입력한 비밀번호가 현재 비밀번호와 같은지 체크 (마이페이지에서 내 정보 수정 들어갈때)
	 * 
	 * @param userId
	 * @param inputPw
	 * @return result
	 */
	@ResponseBody
	@PostMapping(value = "checkCurrentPw", produces = "application/json; charset=UTF-8")
	public int checkCurrentPw(HttpServletRequest request, @RequestBody Map<String, Object> reqMap) {

		HttpSession session = request.getSession();
		User loginUser = (User) session.getAttribute("loginUser");
		String userId = loginUser.getUserId();
		String inputPw = (String) reqMap.get("inputPw");

		int result = service.checkCurrentPw(userId, inputPw);

		return result;
	}

	/**
	 * 비밀번호 변경
	 * 
	 * @param request
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@PostMapping(value = "changePw", produces = "application/json; charset=UTF-8")
	public int changePw(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) {

		HttpSession session = request.getSession();

		User loginUser = (User) session.getAttribute("loginUser");

		String userId = loginUser.getUserId();
		String currentPw = (String) paramMap.get("currentPw");
		String newPw = (String) paramMap.get("newPw");

		// 현재 비밀번호가 일치하는지 확인
		int result = service.checkCurrentPw(userId, currentPw);
		int result2 = 0;

		// 현재 비밀번호가 입력한 비밀번호와 일치하는 경우
		if (result != 0) {
			result2 = service.changePw(loginUser, newPw);
		}

		return result2;

	}
	
	
	
//	@ResponseBody
//	@PostMapping("changePw")
//	public int changePw(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) {
//
//		HttpSession session = request.getSession();
//
//		User loginUser = (User) session.getAttribute("loginUser");
//
//		String userId = loginUser.getUserId();
//		String currentPw = (String) paramMap.get("currentPw");
//		String newPw = (String) paramMap.get("newPw");
//
//		// 현재 비밀번호가 일치하는지 확인
//		int result = service.checkCurrentPw(userId, currentPw);
//		int result2 = 0;
//
//		// 현재 비밀번호가 입력한 비밀번호와 일치하는 경우
//		if (result != 0) {
//			result2 = service.changePw(loginUser, newPw);
//		}
//
//		return result2;
//
//	}

	/**
	 * 내정보 수정
	 * 
	 * @return
	 */
//	@PostMapping("updateProfile")
//	public String updateProfile(@SessionAttribute("loginUser") User loginUser, RedirectAttributes ra,
//			@RequestParam("userAddress") String[] userAddress, User inputUser) {
//
//		String userId = loginUser.getUserId();
//		inputUser.setUserId(userId);
//
//		int result = service.updateProfile(inputUser, userAddress);
//
//		String message = null;
//
//		if (result > 0) {
//			message = loginUser.getUserNickname() + "님의 정보가 수정되었습니다";
//
//			loginUser.setUserName(inputUser.getUserName());
//			loginUser.setUserNickname(inputUser.getUserNickname());
//			loginUser.setUserTel(inputUser.getUserTel());
//			loginUser.setUserAddress(inputUser.getUserAddress());
//			loginUser.setUserEmail(inputUser.getUserEmail());
//
//			
//		} else {
//			message = loginUser.getUserNickname() + "님의 정보 수정에 실패했습니다";
//
//		}
//		ra.addFlashAttribute("message", message);
//
//		return "redirect:/";
//
//	}
//	
	
	
	@PostMapping("updateProfile")
	public String updateProfile(User inputUser, 
			@SessionAttribute("loginUser") User loginUser,
			@RequestParam("userAddress") String[] userAddress,
			RedirectAttributes ra) {

		String userId = loginUser.getUserId();
		inputUser.setUserId(userId);
		
		inputUser.setUserId(userId);

		int result = service.updateProfile(inputUser, userAddress);

		String message = null;

		if (result > 0) {
			message = loginUser.getUserNickname() + "님의 정보가 수정되었습니다";

			loginUser.setUserName(inputUser.getUserName());
			loginUser.setUserNickname(inputUser.getUserNickname());
			loginUser.setUserTel(inputUser.getUserTel());
			loginUser.setUserAddress(inputUser.getUserAddress());
			loginUser.setUserEmail(inputUser.getUserEmail());

			
		} else {
			message = loginUser.getUserNickname() + "님의 정보 수정에 실패했습니다";

		}
		ra.addFlashAttribute("message", message);

		return "redirect:updateProfile";
	

	}

	
	

	/**
	 * 회원 탈퇴 시 입력한 값과 현재 비밀번호 일치하는지 체크
	 * 
	 * @param userId
	 * @param inputPw
	 * @return result
	 */
	@ResponseBody
	@PostMapping("checkPw")
	public int checkPw(HttpServletRequest request, @RequestBody String inputPw) {

		HttpSession session = request.getSession();
		User loginUser = (User) session.getAttribute("loginUser");
		String userId = loginUser.getUserId();

		int result = service.checkCurrentPw(userId, inputPw);

		return result;
	}

}
