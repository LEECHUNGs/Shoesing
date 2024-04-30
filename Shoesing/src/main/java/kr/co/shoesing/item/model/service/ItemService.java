package kr.co.shoesing.item.model.service;

import java.util.List;
import java.util.Map;

import kr.co.shoesing.item.model.dto.Item;

public interface ItemService {
	
	/** 상품 전체 목록 조회
	 * @param sortNo
	 * @return
	 */
	Map<String, Object> selectAll(int sortNo, int cp);

}
