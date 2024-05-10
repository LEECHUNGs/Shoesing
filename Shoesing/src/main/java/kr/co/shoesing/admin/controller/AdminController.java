package kr.co.shoesing.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.shoesing.admin.model.service.AdminService;
import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.item.model.dto.Stock;
import kr.co.shoesing.item.model.service.ItemService;
import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {

	private final AdminService service;
	private final UserService userService;
	private final ItemService itemService;

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
	 * 주문 관리 페이지
	 * 
	 * @return
	 */
	@GetMapping("order")
	public String order() {
		return "pages/admin/order";
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

	/**
	 * 회원 정보 수정
	 * 
	 * @param inputUser
	 * @param model
	 * @param ra
	 * @param request
	 * @return
	 */
	@PostMapping("updateUser")
	public String updateUser(User inputUser, Model model, RedirectAttributes ra, HttpServletRequest request) {

		int result = userService.updateAdmin(inputUser);

		if (result > 0) {
			ra.addFlashAttribute("message", "성공!");
		} else {
			ra.addFlashAttribute("message", "실패!");
		}

		return "redirect:" + request.getHeader("REFERER");
	}

	/**
	 * 회원 탈퇴/복구
	 * 
	 * @param userNo
	 * @param userDelFl
	 * @return
	 */
	@PostMapping("userDelFl")
	public String userDelFl(HttpServletRequest request, @RequestParam("userNo") String userNo,
			@RequestParam("userDelFl") String userDelFl) {
		int result = userService.userDelFl(userNo, userDelFl);

		return "redirect:" + request.getHeader("REFERER");
	}

	/**
	 * 상품 정보 수정
	 * 
	 * @param inputUser
	 * @param model
	 * @param ra
	 * @param request
	 * @return
	 */
	@PostMapping("updateItem")
	public String updateItem(Item inputItem, Model model, RedirectAttributes ra, HttpServletRequest request) {

		int result = itemService.updateItem(inputItem);

		if (result > 0) {
			ra.addFlashAttribute("message", "성공!");
		} else {
			ra.addFlashAttribute("message", "실패!");
		}

		return "redirect:" + request.getHeader("REFERER");
	}

	/**
	 * 상품 수정 페이지
	 * 
	 * @param itemNo
	 * @param model
	 * @return
	 */
	@GetMapping("item/detail")
	public String detail(@RequestParam("itemNo") int itemNo, Model model) {

		Item item = itemService.selectOne(itemNo);
		model.addAttribute("item", item);
		return "pages/admin/itemUpdate";
	}

	/**
	 * 상품 추가
	 * 
	 * @param request
	 * @param ra
	 * @return
	 */
	@ResponseBody
	@PostMapping("insertItem")
	public int insertItem(HttpServletRequest request, RedirectAttributes ra) {

		Map<String, Integer> map = new HashMap<>();

		int result = itemService.insertItem(map);

		return map.get("itemNo");
	}

	/**
	 * 상품 삭제
	 * 
	 * @param request
	 * @param ra
	 * @return
	 */
	@PostMapping("deleteItem")
	public String deleteItem(HttpServletRequest request, RedirectAttributes ra, @RequestParam("itemNo") int itemNo) {

		int result = itemService.deleteItem(itemNo);

		if (result > 0) {
			ra.addFlashAttribute("message", "성공!");
			return "redirect:/admin/item";

		} else {
			ra.addFlashAttribute("message", "실패!");
			return "redirect:" + request.getHeader("REFERER");
		}
	}

	/**
	 * 재고 초기화
	 * 
	 * @param request
	 * @param ra
	 * @return
	 */
	@ResponseBody
	@PostMapping("deleteStock")
	public int deleteStock(RedirectAttributes ra, @RequestParam("itemNo") int itemNo) {

		int result = 0;

		for (int i = 1; i <= 9; i++) {
			Stock stock = new Stock(i, itemNo, 0, 0);
			itemService.updateStock(stock);
			result += itemService.updateStock(stock);
		}

		if (result > 0) {
			ra.addFlashAttribute("message", "성공!");
			return 1;

		} else {
			ra.addFlashAttribute("message", "실패!");
			return 0;
		}
	}

	/**
	 * 재고 수정
	 * 
	 * @param request
	 * @param ra
	 * @return
	 */
	@PostMapping("updateStock")
	public String updateStock(RedirectAttributes ra, @RequestParam("itemNo") int itemNo,
			@RequestParam("sizeList") List<Integer> sizeList, HttpServletRequest request) {

		for (int i = 1; i <= 9; i++) {
			Stock stock = new Stock(i, itemNo, 0, sizeList.get(i - 1));

			itemService.updateStock(stock);
		}

		return "redirect:" + request.getHeader("REFERER");

	}

}
