package kr.co.shoesing.cart.model.dto;

import java.util.List;

import groovy.transform.ToString;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartVo {
	private List<Cart> cartList;
}
