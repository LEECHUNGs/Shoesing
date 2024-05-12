package kr.co.shoesing.order.model.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.order.model.dto.Order;
import kr.co.shoesing.order.model.dto.OrderDetail;
import kr.co.shoesing.order.model.mapper.OrderMapper;
import kr.co.shoesing.user.model.dto.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
	
	private final OrderMapper mapper;

	// 회원 주문 번호 생성 및 주문 상세 생성
	@Override
	public Order selectDetailList(List<Integer> itemStockNoList, List<Integer> itemCountList) {
		
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

	// 주문 정보 서버에 입력
	@Override
	public int insert(Order order) {
		
		// 비회원일 경우
		if(order.getOrderUser() != null) {
			
			
			
			// 비회원용 주문 목록 생성
			mapper.insertOrder(order);
			
		} else {
						
			// 회원용 주문 목록 생성
			mapper.insertOrder(order);
		}
		
		
		log.info(order.toString());
				
		// 세부 주문 목록 생성
		int result = mapper.insertOrderDetail(order.getItemStockNoList(), order.getOrderNo());
		
		return result;
	}

	@Override
	public List<Order> selectAll(int userNo) {
		
		// 관리자 번호일 경우
		if(userNo == 1) {
			
			return mapper.selectOrder();
		}
		
		return mapper.selectUserOrder(userNo);
	}

	@Override
	public List<OrderDetail> detailInfo(int orderNo) {
		
		return mapper.detailInfo(orderNo);
	}
}
