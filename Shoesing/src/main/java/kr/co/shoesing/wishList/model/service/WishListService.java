package kr.co.shoesing.wishList.model.service;

import java.util.List;
import java.util.Map;

public interface WishListService {

	/** 위시리스트 추가
	 * @param userNo
	 * @param itemNo
	 * @return
	 */
	int insert(int userNo, int itemNo);

	/** 위시리스트 목록 불러오기
	 * @param userNo
	 * @param cp
	 * @return wishList
	 */
	Map<String, Object> selectAll(int userNo, int cp);

	/** 선택한 위시리스트 목록 삭제하기
	 * @param itemNoList
	 * @return
	 */
	int delete(List<String> itemNoList);

}
