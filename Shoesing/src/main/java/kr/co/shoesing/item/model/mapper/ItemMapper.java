package kr.co.shoesing.item.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.shoesing.item.model.dto.Item;

@Mapper
public interface ItemMapper {

	/**
	 * 상품 전체 목록 조회
	 * 
	 * @param sortNo
	 * @param rowBounds
	 * @return
	 */
	List<Item> selectAll(int sortNo, RowBounds rowBounds);

	/**
	 * 상품 전체 개수 조회
	 * 
	 * @return listCount
	 */
	int getListCount();

	/**
	 * 상품 상세내용 조회
	 * 
	 * @param itemNo
	 * @return item
	 */
	Item selectOne(int itemNo);

	/**
	 * 상품 상세정보 수정
	 * 
	 * @param inputItem
	 * @return
	 */
	int updateItem(Item inputItem);

	/**
	 * 상품 추가 (관리자)
	 * 
	 * @return
	 */
	int insertItem();

}
