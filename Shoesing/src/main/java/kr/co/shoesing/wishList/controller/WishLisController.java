package kr.co.shoesing.wishList.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.wishList.model.service.WishListService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("wishList")
@Controller
public class WishLisController {

	private final WishListService service;

	/**
	 * 위시리스트 페이지 뷰
	 * 
	 * @return
	 */
	@GetMapping("info")
	public String wishListInfo() {
		return "pages/wishList/wishList";
	}

	/**
	 * 위시리스트 목록 불러오기
	 * 
	 * @return
	 */
	@ResponseBody
	@GetMapping("manage")
	public Map<String, Object> selectAll(@SessionAttribute("loginUser") User loginUser,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {

		return service.selectAll(loginUser.getUserNo(), cp);
	}

	/**
	 * 위시리스트 추가
	 * 
	 * @param loginUser
	 * @param item
	 * @return
	 */
	@ResponseBody
	@PostMapping("manage")
	public int insert(@SessionAttribute("loginUser") User loginUser, @RequestBody Item item) {

		return service.insert(loginUser.getUserNo(), item.getItemNo());
	}

	/**
	 * 위시리스트 삭제
	 * 
	 * @return
	 */
	@ResponseBody
	@DeleteMapping("manage")
	public int delete(@RequestBody String itemNoString, @SessionAttribute("loginUser") User loginUser) {

		String itemNoList = itemNoString.substring(itemNoString.indexOf("[") + 1, itemNoString.indexOf("]"));

		return service.delete(itemNoList, loginUser.getUserNo());
	}
}
