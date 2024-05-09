package kr.co.shoesing.item.model.service;

import java.util.Map;

import kr.co.shoesing.item.model.dto.Item;

public interface ItemService {

	/**
	 * 상품 전체 목록 조회
	 * 
	 * @param sortNo
	 * @return
	 */
	Map<String, Object> selectAll(int sortNo, int cp);

	/**
	 * 상품 상세내용 조회
	 * 
	 * @param itemNo
	 * @return item
	 */
	Item selectOne(int itemNo);

	/**
	 * 상품 상세내용 수정 (관리자)
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
