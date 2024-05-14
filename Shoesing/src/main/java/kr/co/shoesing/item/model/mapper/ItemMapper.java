package kr.co.shoesing.item.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.item.model.dto.Stock;

@Mapper
public interface ItemMapper {

	/**
	 * 상품 전체 목록 조회
	 * 
	 * @param sortNo
	 * @param rowBounds
	 * @return
	 */
	List<Item> selectAll(int sortNo, RowBounds rowBounds);

	/**
	 * 상품 전체 개수 조회
	 * 
	 * @return listCount
	 */
	int getListCount();

	/**
	 * 상품 상세내용 조회
	 * 
	 * @param itemNo
	 * @return item
	 */
	Item selectOne(int itemNo);

	/**
	 * 상품 상세정보 수정
	 * 
	 * @param inputItem
	 * @return
	 */
	int updateItem(Item inputItem);

	/**
	 * 상품 추가 (관리자)
	 * 
	 * @return
	 */
	int insertItem(Map map);

	/**
	 * 상품 삭제 (관리자)
	 * 
	 * @return
	 */
	int deleteItem(int itemNo);

	/**
	 * 재고 수정 (관리자)
	 * 
	 * @param stock
	 * @return
	 */
	int updateStock(Stock stock);

	/**
	 * 신상 상품 리스트 조회
	 * 
	 * @return
	 */
	List<Item> selectNew();

	/**
	 * 모든 상품 조회 (검색용)
	 * 
	 * @return
	 */
	List<Item> selectAllNo();

	/**
	 * 상품 수량 추가
	 * 
	 * @param list
	 * 
	 * @return
	 */
	int insertStock(List<Integer> list);

}
