package kr.co.shoesing.admin.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.shoesing.user.model.dto.User;

@Mapper
public interface AdminMapper {

	/**
	 * 모든 회원 조회
	 */
	List<User> selectAllUser = null;

}
