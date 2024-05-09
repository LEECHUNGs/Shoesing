package kr.co.shoesing.file.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.shoesing.common.util.FileRename;
import kr.co.shoesing.file.model.mapper.FileMapper;
import kr.co.shoesing.item.model.dto.ItemImg;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
@Transactional(rollbackFor = Exception.class)
public class FileServiceImpl implements FileService {

	private final FileMapper mapper;

	@Value("${item.web-path}")
	private String webPath;

	@Value("${item.folder-path}")
	private String folderPath;

	/**
	 * 상품 이미지 추가
	 */
	@Override
	public int uploadItemImgMulti(int itemNo, List<MultipartFile> imageList) throws IllegalStateException, IOException {
		int result = 0;

		List<ItemImg> uploadList = new ArrayList<>();

		for (int i = 0; i < imageList.size(); i++) {
			// 실제 파일이 존재하는 경우
			if (!imageList.get(i).isEmpty()) {
				// 원본명
				String originalName = imageList.get(i).getOriginalFilename();

				// 변경명
				String rename = FileRename.fileRename(originalName);

				// 모든 값을 저장할 DTO 생성
				ItemImg img = new ItemImg();
				img.setImgOriginalName(originalName);
				img.setImgRename(rename);
				img.setImgPath(webPath);
				img.setItemNo(itemNo);
				img.setImgOrder(i);
				img.setUploadFile(imageList.get(i));

				uploadList.add(img);
			}
		}

		// 선택한 파일이 존재하지 않으면
		if (uploadList.isEmpty()) {
			return 0;
		}

		result = mapper.deleteItemImgMulti(itemNo);
		result = mapper.uploadItemImgMulti(uploadList);

		if (result == uploadList.size()) {
			// 서버에 파일 저장
			for (ItemImg img : uploadList) {
				img.getUploadFile().transferTo(new File(folderPath + img.getImgRename()));
			}

		} else {
			// 부분적으로 삽입 실패 -> 전체 서비스 실패로 판단
			// 이전에 삽입된 내용을 모두 rollback
//				throw new BoardInsertException("이미지 정상 삽입되지 않음");
		}

		return result;
	}

}
