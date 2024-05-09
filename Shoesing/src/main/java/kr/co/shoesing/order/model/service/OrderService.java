package kr.co.shoesing.order.model.service;

import java.util.List;

import kr.co.shoesing.order.model.dto.Order;
import kr.co.shoesing.order.model.dto.OrderDetail;

public interface OrderService {

	/** 회원 주문 번호 생성 및 주문 상세 생성
	 * @param userNo
	 * @param itemStockNo
	 * @param itemCount 
	 * @return
	 */
	Order selectDetailList(int userNo, List<Integer> itemStockNo, List<Integer> itemCountList);

}
