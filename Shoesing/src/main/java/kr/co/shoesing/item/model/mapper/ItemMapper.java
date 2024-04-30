package kr.co.shoesing.item.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.shoesing.item.model.dto.Item;

@Mapper
public interface ItemMapper {

	/** 상품 전체 목록 조회
	 * @param sortNo 
	 * @param rowBounds 
	 * @return
	 */
	List<Item> selectAll(int sortNo, RowBounds rowBounds);

	/** 상품 전체 개수 조회
	 * @return listCount
	 */
	int getListCount();

}
