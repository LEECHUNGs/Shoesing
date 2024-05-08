package kr.co.shoesing.file.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.shoesing.file.model.service.FileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@ResponseBody
public class FileController {

	private final FileService service;

	/**
	 * 상품 이미지 추가
	 * 
	 * @param itemNo    : 상품 번호
	 * @param imageList : 업로드 된 이미지 파일
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@PostMapping("file/upload")
	public int uploadItemImg(@RequestParam("itemNo") int itemNo, @RequestParam("images") List<MultipartFile> imageList)
			throws IllegalStateException, IOException {

		service.uploadItemImg(itemNo, imageList);

		return 0;
	}

}
