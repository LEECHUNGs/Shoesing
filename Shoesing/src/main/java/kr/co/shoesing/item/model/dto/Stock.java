package kr.co.shoesing.item.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Stock {
	
	private int itemStockNo;// 재고 번호
	private int sizeNo;		// 사이즈 번호
	private int itemNo;		// 상품 번호
	private int sizeVal;	// 사이즈 수치 (220, 230, 240....)
	private int sizeStock;	// 사이즈별 재고
	
}
