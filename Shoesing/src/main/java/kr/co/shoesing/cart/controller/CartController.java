package kr.co.shoesing.cart.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpSession;
import kr.co.shoesing.cart.model.dto.Cart;
import kr.co.shoesing.cart.model.dto.CartVo;
import kr.co.shoesing.cart.model.service.CartService;
import kr.co.shoesing.user.model.dto.User;
import lombok.RequiredArgsConstructor;

@SessionAttributes({"cartList"})
@RequiredArgsConstructor
@RequestMapping("cart")
@Controller
@lombok.extern.slf4j.Slf4j
public class CartController {
	
private final CartService service;
	
	/** 장바구니 페이지 뷰
	 * @return
	 */
	@GetMapping("info")
	public String wishListInfo() {
		return "pages/cart";
	}

	/** 장바구니 목록 뷰
	 * @param loginUser : 현재 로그인한 유저 번호를 얻기위한 User 객체, 로그인 안했을 시 -1
	 * @param cartList : 세션에 저장된 장바구니 목록 
	 * @param cp : 현재 페이지 번호
	 * @return
	 */
	@ResponseBody
	@GetMapping("manage")
	public Map<String, Object> selectAll(
			@SessionAttribute(value = "loginUser", required = false) User loginUser,
			@SessionAttribute(value = "cartList", required = false) List<Cart> cartList,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
						
		// 회원 일 경우
		if(loginUser != null) {
			
			if(cartList == null) cartList = new ArrayList<>();
			
			return service.selectAll(loginUser.getUserNo(), cp);
		}

		// 비회원일 경우
		return service. selectAll(cp, cartList);
		
	}
	
	/** 장바구니 삭제
	 * @return
	 */
	@ResponseBody
	@DeleteMapping("manage")
	public int delete(@RequestBody CartVo cartVo, 
					  @SessionAttribute(value = "cartList", required = false) List<Cart> cartList,
					  @SessionAttribute(value = "loginUser", required = false) User loginUser,
					  Model model) {
		
		//log.info("cartList {}", cartList);
		
		// 비회원일 경우
		if(loginUser == null) {
			
			// 선택된 상품 삭제
			service.delete(cartList, cartVo);
			
			//log.info("cartList {}", cartList);
			
			// 갱신 목록 세션에 올림
			model.addAttribute("cartList", cartList);

			return 1;
		}
		
		return service.delete(cartVo, loginUser.getUserNo());
	}
	

	/** 장바구니 추가
	 * @param cart : 추가할 상품 번호, 수량, 사이즈
	 * @param cartList : 세션에 저장된 비회원용 장바구니 목록
	 * @param loginUser : 로그인한 유저를 저장한 객체
	 * @param model
	 * @return
	 */
	@ResponseBody
	@PostMapping("manage")
	public int insert(@RequestBody Cart cart,
					  @SessionAttribute(value = "cartList", required = false) List<Cart> cartList,
					  @SessionAttribute(value = "loginUser", required = false) User loginUser,
					  HttpSession session) {
				
		// 비회원일 경우
		if(loginUser == null) {

			// 장바구니에 아무 상품도 없어 List 객체가 없으면 생성해줌
			if(cartList == null) cartList = new ArrayList<>();
			
			// 상품 추가
			service.insert(cartList, cart);
						
			// 수정 내용을 세션에 저장
			session.setAttribute("cartList", cartList);
						
			return 1;
		}
		
		cart.setUserNo(loginUser.getUserNo());
		
		return service.insert(cart);
	}
	
	/**
	 * @param val : 변경할 수량
	 * @param cartList 
	 * @param loginUser
	 * @param model
	 * @return
	 */
	@ResponseBody
	@PutMapping("manage")
	public int update(@RequestBody Cart cart,
		  			  @SessionAttribute(value = "cartList", required = false) List<Cart> cartList,
  					  @SessionAttribute(value = "loginUser", required = false) User loginUser,
  					  Model model) {
		
		// 비회원일 경우
		if(loginUser == null) {

			service.update(cartList, cart);
						
			model.addAttribute("cartList", cartList);

			return 1;
		}
		
		cart.setUserNo(loginUser.getUserNo());
		return service.update(cart);
	}
}













