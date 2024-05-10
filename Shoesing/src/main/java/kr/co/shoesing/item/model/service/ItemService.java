package kr.co.shoesing.item.model.service;

import java.util.Map;

import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.item.model.dto.Stock;

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
	 * @param map
	 * 
	 * @return
	 */
	int insertItem(Map<String, Integer> map);

	/**
	 * 상품 삭제 (관리자)
	 * 
	 * @param itemNo
	 * @return
	 */
	int deleteItem(int itemNo);

	/**
	 * 재고 수정 (관리자)
	 * 
	 * @param stock
	 */
	int updateStock(Stock stock);

}
