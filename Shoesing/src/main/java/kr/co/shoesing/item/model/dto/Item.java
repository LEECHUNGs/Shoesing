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
public class Item {
	
	private int itemNo;
	private String itemName;
	private String itemCount;
	private int itemPrice;
	private String itemUploadDate;
	private String itemBrand;
	private String itemInfo;
	private String itemUpdateDate;
	private String itemImgPath;
	
	private String categoryNo;
}
