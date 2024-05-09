package kr.co.shoesing.file.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.shoesing.file.model.service.FileService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
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
	@PostMapping("file/uploadMulti")
	public String uploadItemImg(@RequestParam("itemNo") int itemNo,
			@RequestParam("images") List<MultipartFile> imageList, RedirectAttributes ra, HttpServletRequest request)
			throws IllegalStateException, IOException {

		int result = service.uploadItemImgMulti(itemNo, imageList);

		if (result > 0) {
			ra.addFlashAttribute("message", "성공!");
		} else {
			ra.addFlashAttribute("message", "실패!");
		}
		return "redirect:" + request.getHeader("REFERER");
	}

}
