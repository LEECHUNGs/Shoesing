package kr.co.shoesing.wishList.model.service;

import java.util.Map;

import kr.co.shoesing.wishList.model.dto.WishlistVO;

public interface WishlistService {

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
	 * @param wishlistVO
	 * @param userNo 
	 * @return
	 */
	int delete(WishlistVO wishlistVO, int userNo);

}
