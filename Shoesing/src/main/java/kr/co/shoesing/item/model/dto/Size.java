package kr.co.shoesing.item.model.dto;

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
public class Size {
	
	private int sizeNo;		// 사이즈 번호
	private int itemNo;		// 상품 번호
	private int sizeVal;	// 사이즈 수치 (220, 230, 240....)
	private int sizeStock;	// 사이즈별 재고
	
}
