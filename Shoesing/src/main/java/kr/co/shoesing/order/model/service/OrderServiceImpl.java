package kr.co.shoesing.order.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.common.util.Pagination;
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
	
	// 페이지네이션 용 변수
	private int limit = 10; // 한 페이지 목록에 보여질 상품 수
	private int pageSize = 10; // 보여질 페이지 번호 개수

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
		
				
		// 세부 주문 목록 생성
		int result = mapper.insertOrderDetail(order.getItemStockNoList(), order.getOrderNo());
		
		return result;
	}

	@Override
	public Map<String, Object> selectAll(int userNo, int cp) {
		
		int  listCount = 0;
		List<Order> orderList = null;
		
		// 관리자 번호일 경우
		if(userNo == 1) {
			listCount = mapper.getAllListCount();
		} else {
			listCount = mapper.getUserListCount(userNo);
		}
		
		// 페이지 관리용 페이지네이션 객체 생성
		Pagination pagination = new Pagination(cp, listCount, limit, pageSize);
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 관리자 번호일 경우
		if(userNo == 1) {
			orderList = mapper.selectOrder(rowBounds);
		} else {
			orderList = mapper.selectUserOrder(userNo, rowBounds);
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("orderList", orderList);
		map.put("pagination", pagination);
		
		return map;
	}

	@Override
	public List<OrderDetail> detailInfo(int orderNo) {
		
		return mapper.detailInfo(orderNo);
	}

	@Override
	public int update(int orderNo) {
		return mapper.update(orderNo);
	}

	@Override
	public Order selectOne(int orderNo) {
		
		return mapper.selectOne(orderNo);
	}
}
