package kr.co.shoesing.wishList.model.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import kr.co.shoesing.common.util.Pagination;
import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.wishList.model.mapper.WishListMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService{
	
	private final WishListMapper mapper;

	// 페이지네이션 용 변수
	private int limit = 10; // 한 페이지 목록에 보여질 상품 수
	private int pageSize = 10; // 보여질 페이지 번호 개수
	
	// 위시리스트 추가
	@Override
	public int insert(int userNo, int itemNo) {
		
		
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("itemNo", itemNo);
		
		// 상품 등록 전 중복 검사
		int check = mapper.check(map);
		if(check > 0) {
			return -1;
		}
		
		return mapper.insert(map);
	}
	// 위시리스트 불러오기
	@Override
	public Map<String, Object> selectAll(int userNo, int cp) {
		
		// 해당 유저의 위시리스트 총 개수 불러오기
		int listCount = mapper.getListCount(userNo);
		
		// 페이지 관리용 페이지네이션 객체 생성
		Pagination pagination = new Pagination(cp, listCount, limit, pageSize);
		
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		List<Item> wishList = mapper.selectAll(userNo, rowBounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("wishList", wishList);
		map.put("pagination", pagination);
		
		return map;
	}
	@Override
	public int delete(List<String> itemNoList) {
		
		return mapper.delete(itemNoList);
	}
	
	
	
}
