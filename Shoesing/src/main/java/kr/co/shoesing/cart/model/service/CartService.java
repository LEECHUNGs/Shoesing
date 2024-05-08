package kr.co.shoesing.cart.model.service;

import java.util.List;
import java.util.Map;

import kr.co.shoesing.cart.model.dto.Cart;
import kr.co.shoesing.cart.model.dto.CartVo;

public interface CartService {

	/** 회원 장바구니 목록 불러오기
	 * @param userNo
	 * @param cp
	 * @param cartList 
	 * @return
	 */
	Map<String, Object> selectAll(int userNo, int cp);

	/** 비회원 장바구니 목록 불러오기
	 * @param cp
	 * @param cartList
	 * @return
	 */
	Map<String, Object> selectAll(int cp, List<Cart> cartList);

	/** 회원 장바구니 상품 삭제
	 * @param cartList 
	 * @param cart
	 * @return
	 */
	int delete(CartVo cartVo, int userNo);

	/** 비회원 장바구니 상품 삭제
	 * @param cartNoString
	 * @param cartList
	 * @return
	 */
	void delete(List<Cart> cartList, CartVo cartVo);

	/** 회원 장바구니 상품 추가
	 * @param i
	 * @param cart
	 * @return
	 */
	int insert(Cart cart);

	/** 비회원 장바구니 상품 추가
	 * @param cartList
	 * @param itemNo
	 * @return
	 */
	void insert(List<Cart> cartList, Cart cart);

	/** 비회원 장바구니 수량 수정
	 * @param cartList
	 * @param val
	 */
	void update(List<Cart> cartList, Cart cart);

	/** 회원 장바구니 수량 수정
	 * @param userNo
	 * @param val
	 * @return
	 */
	int update(Cart cart);
	
}
