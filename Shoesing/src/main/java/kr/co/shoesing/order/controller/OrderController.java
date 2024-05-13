package kr.co.shoesing.order.controller;

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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("order")
public class OrderController {

	private final OrderService service;
	// priavte final UserSer

	/**
	 * 주문 목록 메인 페이지
	 * 
	 * @return
	 */
	@GetMapping("info")
	public String info(@SessionAttribute(value = "loginUser", required = false) User loginUser,
					   @RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
					   Model model) {
				
		
		Map<String, Object> map = null;
		
		// 비회원일 경우
		if(loginUser == null) {
			
			
		}
		
		map = service.selectAll(loginUser.getUserNo(), cp);
		
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
	public int insert(@RequestBody Order order,
			@SessionAttribute(value = "loginUser", required = false) User loginUser) {

		// 회원일 때 Order 객체의 userNo 값을 회원 번호로 초기화
		if (loginUser != null) {

			order.setUserNo(loginUser.getUserNo());
		}

		int result = service.insert(order);

		return result;
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
	@GetMapping("orderSuccess")
	public String orderSuccess() {
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





















