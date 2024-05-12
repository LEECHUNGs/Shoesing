package kr.co.shoesing.item.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.shoesing.common.util.Pagination;
import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.item.model.dto.Stock;
import kr.co.shoesing.item.model.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {

	private final ItemMapper mapper;

	// 페이지네이션용 필드
	private int limit = 20;
	private int pageSize = 10;

	/**
	 * 상품 목록 불러오기
	 */
	@Override
	public Map<String, Object> selectAll(int sortNo, int cp) {

		// 상품 전체 개수 불러오기
		int listCount = mapper.getListCount();

		// 페이지네이션 객체 생성
		Pagination pagination = new Pagination(cp, listCount, limit, pageSize);

		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);

		// 목록 조회
		List<Item> itemList = mapper.selectAll(sortNo, rowBounds);

		// 목록과 pagination을 리턴하기 위해 매핑
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("itemList", itemList);

		return map;
	}

	// 상품 상세내용 조회
	@Override
	public Item selectOne(int itemNo) {
		return mapper.selectOne(itemNo);
	}

	/**
	 * 상품 상세내용 수정 (관리자)
	 */
	@Override
	public int updateItem(Item inputItem) {
		return mapper.updateItem(inputItem);
	}

	/**
	 * 상품 추가
	 */
	@Override
	public int insertItem(Map<String, Integer> map) {
		return mapper.insertItem(map);
	}

	/**
	 * 상품 삭제
	 */
	@Override
	public int deleteItem(int itemNo) {
		return mapper.deleteItem(itemNo);
	}

	/**
	 * 재고 수정 (관리자)
	 */
	@Override
	public int updateStock(Stock stock) {
		return mapper.updateStock(stock);
	}

	/**
	 * 신상 상품 리스트 조회
	 */
	@Override
	public List<Item> selectNew() {
		return mapper.selectNew();
	}

	/**
	 * 모든 상품 조회 (검색용)
	 */
	@Override
	public List<Item> selectAllNo() {
		return mapper.selectAllNo();
	}

}
