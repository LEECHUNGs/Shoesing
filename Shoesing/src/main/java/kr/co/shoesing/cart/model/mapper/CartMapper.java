package kr.co.shoesing.cart.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.shoesing.cart.model.dto.Cart;
import kr.co.shoesing.item.model.dto.Item;

@Mapper
public interface CartMapper {

	/** 회원의 장바구니 상품 개수 불러오기
	 * @param userNo
	 * @return
	 */
	int getListCount(int userNo);

	/** 회원의 장바구니 상품 목록 불러오기
	 * @param userNo
	 * @param rowBounds
	 * @return
	 */
	List<Cart> selectAll(int userNo, RowBounds rowBounds);

	/** 회원 장바구니 상품 목록 삭제
	 * @param map
	 * @return
	 */
	int delete(Map<String, Object> map);

	/** DB에 해당 장바구니 상품이 존재하는지 확인
	 * @param map
	 * @return
	 */
	int check(Cart inputCart);

	/** 장바구니에 상품 추가
	 * @param map
	 * @return
	 */
	int insert(Cart inputCart);

	/** 장바구니 상품 수량 변경
	 * @param map
	 * @return
	 */
	int add(Cart inputCart);

	/** 상품 1개 검색
	 * @param i
	 * @return
	 */
	Cart selectOne(int i);

}
