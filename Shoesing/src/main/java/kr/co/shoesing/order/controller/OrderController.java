package kr.co.shoesing.order.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.shoesing.order.model.service.OrderService;
import lombok.RequiredArgsConstructor;

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
	
	@PostMapping("checkout")
	public String checkout(@RequestParam("checkOne") List<Integer> checkItemList,
						   @RequestParam("itemNo") List<Integer> itemNoList,
						   @RequestParam("sizeNo") List<Integer> sizeNo) {
		
		System.out.println(itemNoList);
		
		return "pages/checkout";
	}
	
	
}
