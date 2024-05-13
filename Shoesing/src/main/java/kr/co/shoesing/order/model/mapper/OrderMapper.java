package kr.co.shoesing.order.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

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

	/** 관리자용 모든 주문목록 생성
	 * @param rowBounds 
	 * @return
	 */
	List<Order> selectOrder(RowBounds rowBounds);

	/** 회원용 주문목록 생성
	 * @param userNo
	 * @param rowBounds 
	 * @return
	 */
	List<Order> selectUserOrder(int userNo, RowBounds rowBounds);

	/** 세부 주문목록 생성
	 * @param orderNo
	 * @return
	 */
	List<OrderDetail> detailInfo(int orderNo);

	/** 사용자의 모든 주문목록 개수
	 * @param userNo
	 * @return
	 */
	int getUserListCount(int userNo);

	/** 관리자용 전체 주문목록 개수
	 * @return
	 */
	int getAllListCount();

	/** 처리 상태 변경
	 * @param orderNo
	 * @return
	 */
	int update(int orderNo);

}
