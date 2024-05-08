package kr.co.shoesing.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.shoesing.admin.model.service.AdminService;
import kr.co.shoesing.item.model.dto.Item;
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
	public Map<String, Object> userList(@RequestParam("sortNo") int sortNo) {

		List<User> userList = service.selectAllUser(sortNo);

		Map<String, Object> map = new HashMap<>();

		map.put("userList", userList);

		return map;
	}

	@ResponseBody
	@GetMapping("itemList")
	public Map<String, Object> itemList(@RequestParam("sortNo") int sortNo) {

		List<Item> itemList = service.selectAllItem(sortNo);

		Map<String, Object> map = new HashMap<>();

		map.put("itemList", itemList);

		return map;

	}

}
