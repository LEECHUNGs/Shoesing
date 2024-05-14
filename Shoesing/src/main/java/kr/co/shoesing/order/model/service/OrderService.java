package kr.co.shoesing.order.model.service;

import java.util.List;
import java.util.Map;

import kr.co.shoesing.order.model.dto.Order;
import kr.co.shoesing.order.model.dto.OrderDetail;

public interface OrderService {

	/** 회원 주문 번호 생성 및 주문 상세 생성
	 * @param userNo
	 * @param itemStockNo
	 * @param itemCount 
	 * @return
	 */
	Order selectDetailList(List<Integer> itemStockNo, List<Integer> itemCountList);

	/** 주문 정보 서버에 입력
	 * @param order
	 * @return
	 */
	int insert(Order order);

	/** 주문 리스트를 모두 불러옴
	 * @param userNo 
	 * @param cp 
	 * @return
	 */
	Map<String, Object> selectAll(int userNo, int cp);

	/** 주문 세부 리스트를 불러옴
	 * @param orderNo
	 * @return
	 */
	List<OrderDetail> detailInfo(int orderNo);

	/** 처리 상태 변경
	 * @param orderNo
	 * @return
	 */
	int update(int orderNo);

	/** 주문 성공한 주문 불러오기
	 * @param orderNo
	 * @return
	 */
	Order selectOne(int orderNo);


}
