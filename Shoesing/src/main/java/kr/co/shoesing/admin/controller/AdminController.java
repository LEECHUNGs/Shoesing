package kr.co.shoesing.admin.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.shoesing.admin.model.service.AdminService;
import kr.co.shoesing.user.model.dto.User;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {

	private final AdminService service;

	/**
	 * 홈 페이지
	 * 
	 * @return
	 */
	@GetMapping("")
	public String main() {
		return "pages/admin/home";
	}

	/**
	 * 회원 관리 페이지
	 * 
	 * @return
	 */
	@GetMapping("user")
	public String user() {
		return "pages/admin/user";
	}

	/**
	 * 상품 관리 페이지
	 * 
	 * @return
	 */
	@GetMapping("item")
	public String item() {
		return "pages/admin/item";
	}

	/**
	 * 모든 회원 리스트 조회
	 * 
	 * @return
	 */
	@ResponseBody
	@GetMapping("userList")
	public List<User> userList() {

		List<User> userList = service.selectAllUser();

		return userList;
	}

}
