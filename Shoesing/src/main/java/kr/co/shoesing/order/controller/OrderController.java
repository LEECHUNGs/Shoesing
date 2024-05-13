package kr.co.shoesing.order.controller;

import java.util.HashMap;
import java.util.List;
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

import kr.co.shoesing.order.model.dto.Order;
import kr.co.shoesing.order.model.dto.OrderDetail;
import kr.co.shoesing.order.model.service.OrderService;
import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("order")
public class OrderController {

	private final OrderService service;
	private final UserService userService;

	/**
	 * 주문 목록 메인 페이지
	 * 
	 * @return
	 */
	@GetMapping("info")
	public String info(@SessionAttribute(value = "userNo", required = false) int anonUserNo,
					   @SessionAttribute(value = "loginUser", required = false) User loginUser,
					   @RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
					   Model model) {
				
		
		Map<String, Object> map = null;
		int userNo = 0;
		
		// 비회원일 경우
		if(loginUser == null) {
			
			userNo = anonUserNo;
			
		} else { // 회원일 경우
			
			userNo = loginUser.getUserNo();
		}
		
		
		map = service.selectAll(userNo, cp);
		
		model.addAttribute("orderList", map.get("orderList"));
		model.addAttribute("pagination", map.get("pagination"));
		
		return "pages/order/orderList";
	}

	/**
	 * 주문 페이지
	 * 
	 * @param itemStockNo
	 * @return
	 */
	@PostMapping("checkout")
	public String checkout(@SessionAttribute(value = "loginUser", required = false) User loginUser,
			@RequestParam("itemStockNoList") List<Integer> itemStockNoList,
			@RequestParam("itemCountList") List<Integer> itemCountList, Model model) {

		log.info(itemStockNoList.toString());

		Order order = service.selectDetailList(itemStockNoList, itemCountList);

		model.addAttribute("order", order);

		return "pages/order/checkout";
	}

	/**
	 * 새 주문 생성
	 * 
	 * @param order
	 * @param loginUser
	 * @return
	 */
	@ResponseBody
	@PostMapping("manage")
	public Map<String, Object> insert(@RequestBody Order order,
			@SessionAttribute(value = "loginUser", required = false) User loginUser,
			Model model) {
		
		log.info(order.toString());
		
		Map<String, Object> map = new HashMap<>();

		// 회원일 때 Order 객체의 userNo 값을 회원 번호로 초기화
		if (loginUser != null) {

			order.setUserNo(loginUser.getUserNo());
			
		} else { // 비회원일 시 새 계정을 생성
			
			// 임시 id를 "비회원"으로 생성
			order.getOrderUser().setUserId("비회원");
			
			// 비회원용 계정 생성 후 키값 리턴 후 세팅
			int result1 = userService.signupTemp(order.getOrderUser());
			
			map.put("result", result1);
			
			// 유저 생성 실패시 리턴
			if(result1 <= 0) return map;
			
			// 유저 생성 성공 시 order 객체의 userNo를 새로 생성된 userNo를 세팅
			order.setUserNo(order.getOrderUser().getUserNo());
		}
		
		int result2 = service.insert(order);
		int orderNo = order.getOrderNo();
		
		// 비회원은 주문 번호를 회원 아이디로써 초기화
		if(loginUser == null) {
			int result3 = userService.updateId(orderNo, order.getUserNo());

			// 회원 아이디 초기화 실패 시
			if(result3 <= 0) {
				
				map.put("result", result3);
				
				return map;
			}
		}
		
		map.put("result", result2);
		map.put("orderNo", orderNo);
		
		return map;
	}
	
	/** 세부 주문목록 불러오기
	 * @param orderNo
	 * @return
	 */
	@ResponseBody
	@PostMapping("detailInfo")
	public List<OrderDetail> detailInfo(@RequestBody int orderNo) {
		
		return service.detailInfo(orderNo);
	}
	
	/** 주문 성공 창
	 * @param param
	 * @return
	 */
	@PostMapping("orderSuccess")
	public String orderSuccess(@RequestParam("orderNo") int orderNo,
								Model model) {
		
		Order order = service.selectOne(orderNo);
		List<OrderDetail> orderDetailList = service.detailInfo(orderNo);
		
		order.setItemStockNoList(orderDetailList);
		
		model.addAttribute("orderNo", orderNo);
		model.addAttribute("order", order);
		
		log.info("order " + order);
		
		return "pages/order/orderSuccess";
	}
	
	/** 처리 상태 변경
	 * @param orderNo
	 * @return
	 */
	@ResponseBody
	@GetMapping("manage")
	public int update(@RequestParam("orderNo") int orderNo) {
		return service.update(orderNo);
	}
	
}





















