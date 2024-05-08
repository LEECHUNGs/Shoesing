package kr.co.shoesing.admin.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.shoesing.admin.model.mapper.AdminMapper;
import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.user.model.dto.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminMapper mapper;

	/**
	 * 모든 회원 조회
	 */
	@Override
	public List<User> selectAllUser(int sortNo) {
		return mapper.selectAllUser(sortNo);
	}

	/**
	 * 모든 상품 조회
	 */
	@Override
	public List<Item> selectAllItem(int sortNo) {
		return mapper.selectAllItem(sortNo);
	}

}
