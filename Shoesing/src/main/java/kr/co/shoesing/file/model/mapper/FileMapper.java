package kr.co.shoesing.file.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.shoesing.item.model.dto.ItemImg;

@Mapper
public interface FileMapper {

	int uploadItemImg(List<ItemImg> uploadList);

}
