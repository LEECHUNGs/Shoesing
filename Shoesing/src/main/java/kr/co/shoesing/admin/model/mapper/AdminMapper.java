package kr.co.shoesing.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.user.model.dto.User;

@Mapper
public interface AdminMapper {

	/**
	 * 모든 회원 조회
	 * 
	 * @param sortNo
	 */
	List<User> selectAllUser(int sortNo);

	/**
	 * 모든 상품 조회
	 */

	List<Item> selectAllItem(int sortNo);

}
