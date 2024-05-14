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

import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.wishList.model.dto.Wishlist;
import kr.co.shoesing.wishList.model.dto.WishlistVO;
import kr.co.shoesing.wishList.model.service.WishlistService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("wishlist")
@Controller
public class WishlisController {

	private final WishlistService service;

	/**
	 * 위시리스트 페이지 뷰
	 * 
	 * @return
	 */
	@GetMapping("info")
	public String wishListInfo() {
		return "pages/wishlist/wishlist";
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
	public int insert(@SessionAttribute("loginUser") User loginUser, @RequestBody Wishlist wishlist) {

		return service.insert(loginUser.getUserNo(), wishlist.getItemNo());
	}

	/**
	 * 위시리스트 삭제
	 * 
	 * @return
	 */
	@ResponseBody
	@DeleteMapping("manage")
	public int delete(@RequestBody WishlistVO wishlistVO, @SessionAttribute("loginUser") User loginUser) {
				
		return service.delete(wishlistVO, loginUser.getUserNo());
	}
}
















