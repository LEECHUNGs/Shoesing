package kr.co.shoesing.admin.model.service;

import java.util.List;

import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.user.model.dto.User;

public interface AdminService {

	/**
	 * 모든 회원 조회
	 * 
	 * @param sortNo
	 * 
	 * @return
	 */
	List<User> selectAllUser(int sortNo);

	/**
	 * 모든 상품 조회
	 * 
	 * @param sortNo
	 * @return
	 */
	List<Item> selectAllItem(int sortNo);

}
