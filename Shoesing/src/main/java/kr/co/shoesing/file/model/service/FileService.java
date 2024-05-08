package kr.co.shoesing.file.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	/**
	 * 상품 이미지 추가
	 * 
	 * @param itemNo
	 * @param imageList
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	int uploadItemImg(int itemNo, List<MultipartFile> imageList) throws IllegalStateException, IOException;

}
