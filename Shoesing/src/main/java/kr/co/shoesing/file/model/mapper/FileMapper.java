package kr.co.shoesing.file.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.shoesing.item.model.dto.ItemImg;

@Mapper
public interface FileMapper {

	/**
	 * 상품 이미지 한번에 수정
	 * 
	 * @param uploadList
	 * @return
	 */
	int uploadItemImgMulti(List<ItemImg> uploadList);

	/**
	 * 상품 이미지 한번에 제거
	 * 
	 * @param itemNo
	 * @return
	 */
	int deleteItemImgMulti(int itemNo);

}
