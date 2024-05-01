package kr.co.shoesing.item.model.dto;

import java.util.List;
import java.util.Map;

import groovy.transform.ToString;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Item {
	
	private int itemNo;				// 상품 번호
	private String itemName;		// 상품 이름
	private int itemPrice;			// 상품 가격
	private String itemUploadDate;	// 상품 등록일
	private String itemBrand;		// 상품 브랜드
	private String itemInfo;		// 상품 설명
	private String itemUpdateDate;	// 상품 수정일
	private String itemImgPath;		// 상품 이미지 경로
	
	private String categoryNo;		// 상품 카테고리 번호
	
	private List<Size> sizeList; // 상품 사이즈별 재고, (Size, Stock)
}
