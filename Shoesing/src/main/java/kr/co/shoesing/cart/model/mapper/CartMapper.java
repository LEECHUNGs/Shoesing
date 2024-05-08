package kr.co.shoesing.cart.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.shoesing.cart.model.dto.Cart;

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
	 * @param cart
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
	
	/** 장바구니 상세내용 입력용 조회
	 * @param map
	 * @return
	 */
	Cart selectCart(Map<String, Integer> map);

	/** 장바구니 상품 수량 조절
	 * @param cart
	 * @return
	 */
	int update(Cart cart);

}
