package kr.co.shoesing.wishList.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.shoesing.wishList.model.dto.Wishlist;

@Mapper
public interface WishlistMapper {

	/**
	 * DB에 해당 위시리스트가 존재하는지 확인
	 * 
	 * @param map
	 * @return check
	 */
	int check(Map<String, Object> map);

	/**
	 * 위시리스트 추가
	 * 
	 * @param map
	 * @return result
	 */
	int insert(Map<String, Object> map);

	/**
	 * 유저의 위시리스트 개수 불러오기
	 * 
	 * @param userNo
	 * @return
	 */
	int getListCount(int userNo);

	/**
	 * 유저의 위시리스트 불러오기
	 * 
	 * @param userNo
	 * @param rowBounds
	 * @return
	 */
	List<Wishlist> selectAll(int userNo, RowBounds rowBounds);

	/**
	 * 선택된 위시리스트 삭제
	 * 
	 * @param map
	 * @return
	 */
	int delete(Map<String, Object> map);

}