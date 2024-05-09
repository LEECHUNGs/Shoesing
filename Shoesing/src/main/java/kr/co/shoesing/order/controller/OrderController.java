package kr.co.shoesing.order.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.co.shoesing.item.model.dto.Stock;
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
	
	/** 주문 목록 메인 페이지
	 * @return
	 */
	@GetMapping("info")
	public String info() {
		return "pages/orderList";
	}
	
	/** 주문 페이지
	 * @param itemStockNo
	 * @return
	 */
	@PostMapping("checkout")
	public String checkout(@SessionAttribute(value = "loginUser", required = false) User loginUser,
						   @RequestParam("itemStockNoList") List<Integer> itemStockNoList,
						   @RequestParam("itemCountList") List<Integer> itemCountList,
						   Model model) {
		
		log.info(itemStockNoList.toString());
		
		// 비회원 주문 시
		if(loginUser == null) {
			return "pages/checkout";
		}
		
		// 회원 주문 시

		Order order  = service.selectDetailList(loginUser.getUserNo(), itemStockNoList, itemCountList);
		
		model.addAttribute("order", order);
		
		return "pages/checkout";
	}
	
	@ResponseBody
	@PostMapping("manage")
	public int insert(@RequestBody Order order) {
		
		log.info(order.toString());
		
		return 0;
	}
	
	
}
