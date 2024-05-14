package kr.co.shoesing.cart.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.cart.model.dto.Cart;
import kr.co.shoesing.cart.model.dto.CartVo;
import kr.co.shoesing.cart.model.mapper.CartMapper;
import kr.co.shoesing.common.util.Pagination;
import kr.co.shoesing.item.model.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CartServiceImpl implements CartService{

	private final CartMapper mapper;
	private final ItemMapper itemMapper;
	
	// 페이지네이션 용 변수
	private int limit = 10; // 한 페이지 목록에 보여질 상품 수
	private int pageSize = 10; // 보여질 페이지 번호 개수
	
	
	// 회원 장바구니 목록 불러오기
	@Override
	public Map<String, Object> selectAll(int userNo, int cp) {
		
		// 해당 유저의 위시리스트 총 개수
		int listCount = mapper.getListCount(userNo);
		
		// 페이지 관리용 페이지네이션 객체 생성
		Pagination pagination = new Pagination(cp, listCount, limit, pageSize);
		
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Cart> cartList = mapper.selectAll(userNo, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("cartList", cartList);
		map.put("pagination", pagination);
		
		return map;
	}

	// 비회원 장바구니 목록 불러오기
	@Override
	public Map<String, Object> selectAll(int cp, List<Cart> cartList) {
		
		// 해당 유저의 위시리스트 총 개수
		int listCount = cartList == null ? 0 : cartList.size();
			
		// 페이지 관리용 페이지네이션 객체 생성
		Pagination pagination = new Pagination(cp, listCount, limit, pageSize);
		
		List<Cart> cartList2 = new ArrayList<>();
		
		if(listCount > 0) {
			
			int offset = (cp - 1) * limit;
			
			for(int i = offset; i<offset + limit && i<cartList.size(); i++) {
				cartList2.add(cartList.get(i));
			}
			
		}

		Map<String, Object> map = new HashMap<>();
		map.put("cartList", cartList2);
		map.put("pagination", pagination);
		
		return map;
	}

	
	// 회원 장비구니 상품 삭제
	@Override
	public int delete(CartVo cartVo, int userNo) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("cartList", cartVo.getCartList());
		map.put("userNo", userNo);
		
		return mapper.delete(map);
	}

	// 비회원 장바구니 상품 삭제
	@Override
	public void delete(List<Cart> cartList, CartVo cartVo) {
		
		for(Cart cart : cartVo.getCartList()) {
			
			cartList.remove(cart);
		}
	}

	// 회원 장바구니 상품 추가
	@Override
	public int insert(Cart inputCart) {		
		
		// 상품 등록 전 중복 검사
		int check = mapper.check(inputCart);
		if(check > 0) {
			
			// 상품이 이미 장바구니에 있으면 상품의 수량 조정
			return mapper.add(inputCart);
		}
				
		return mapper.insert(inputCart);
	}

	// 비회원 장바구니 상품 추가
	@Override
	public void insert(List<Cart> cartList, Cart cart) {
				
		Map<String, Integer> map = new HashMap<>();
		map.put("itemNo", cart.getItemNo());
		map.put("sizeNo", cart.getSizeNo());
		
		Cart newCart = mapper.selectCart(cart);
		newCart.setCartItemCount(cart.getCartItemCount());
				
		// 이미 장바구니에 있을 때
		int index = cartList.indexOf(newCart);
		
		if(index >= 0) {
			// 기존 수량에 입력받은 수량을 더함
			cartList.get(index).setCartItemCount(
					cartList.get(index).getCartItemCount() + cart.getCartItemCount());

		} else {
			// 새 리스트 추가
			cartList.add(newCart);
		}
	}

	// 비회원 장바구니 수량 수정
	@Override
	public void update(List<Cart> cartList, Cart cart) {
		
		int index = cartList.indexOf(cart);
		
		cartList.get(index).setCartItemCount(
				cart.getCartItemCount() + cartList.get(index).getCartItemCount());
	}

	// 회원 장바구니 수량 수정
	@Override
	public int update(Cart cart) {

		return mapper.update(cart);
	}

}














