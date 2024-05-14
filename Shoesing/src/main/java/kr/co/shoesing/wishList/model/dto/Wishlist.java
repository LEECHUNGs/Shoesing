package kr.co.shoesing.wishList.model.dto;

import java.util.List;

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
@ToString
@Builder
public class Wishlist {

	private int wishlist_no;
	private int userNo;
	private int itemNo;
	private String itemName;
	private int itemPrice;
	private String itemBrand;
	
	private String thumbnail;
}
