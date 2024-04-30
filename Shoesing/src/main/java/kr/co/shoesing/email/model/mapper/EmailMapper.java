package kr.co.shoesing.email.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmailMapper {

	/**
	 * 이메일 인증번호 확인
	 * 
	 * @param map
	 * @return
	 */
	int checkAuthKey(Map<String, Object> map);

	/**
	 * 테이블에 이메일 존재하지 않는 경우 insert
	 * 
	 * @param map
	 */
	void insertAuthKey(Map<String, String> map);

	/**
	 * 테이블에 이메일 존재하지 않는 경우 update
	 * 
	 * @param map
	 * @return
	 */
	int updateAuthKey(Map<String, String> map);

}
