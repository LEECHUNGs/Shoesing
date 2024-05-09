package kr.co.shoesing.order.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.order.model.dto.Order;
import kr.co.shoesing.order.model.dto.OrderDetail;
import kr.co.shoesing.order.model.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
	
	private final OrderMapper mapper;

	@Override
	public Order selectDetailList(int userNo, List<Integer> itemStockNoList, List<Integer> itemCountList) {
		
		// 상품 정보 불러오기
		List<OrderDetail> orderDetailList = mapper.selectDetailList(itemStockNoList);
		
		// 주문 수량 세팅
		for(int i = 0; i<orderDetailList.size(); i++) {
			orderDetailList.get(i).setOrderItemCount(itemCountList.get(i));
		}
		
		Order order = new Order();
		order.setItemStockNoList(orderDetailList);
		order.setOrderConfirm('N');
		
		return order;
	}
}
