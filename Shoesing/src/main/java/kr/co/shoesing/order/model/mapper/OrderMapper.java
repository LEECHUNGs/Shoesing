package kr.co.shoesing.order.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.shoesing.order.model.dto.OrderDetail;

@Mapper
public interface OrderMapper {

	/** 입력받은 상품들 정보를 가져옴
	 * @param itemStockNoList
	 * @return
	 */
	List<OrderDetail> selectDetailList(List<Integer> itemStockNoList);

}
