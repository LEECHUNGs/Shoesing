package kr.co.shoesing.order.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.shoesing.order.model.dto.Order;
import kr.co.shoesing.order.model.dto.OrderDetail;

@Mapper
public interface OrderMapper {

	/** 입력받은 상품들 정보를 가져옴
	 * @param itemStockNoList
	 * @return
	 */
	List<OrderDetail> selectDetailList(List<Integer> itemStockNoList);

	/** 주문목록 생성
	 * @param order
	 * @return
	 */
	void insertOrder(Order order);

	/** 세부 주문목록 생성
	 * @param itemStockNoList
	 * @param orderNo
	 * @return
	 */
	int insertOrderDetail(@Param("itemStockNoList") List<OrderDetail> itemStockNoList,
						  @Param("orderNo") int orderNo);

}
