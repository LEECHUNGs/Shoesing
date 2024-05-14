package kr.co.shoesing.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {
	private int userNo;
	private String userId;
	private String userPw;
	private String userNickname;
	private String userName;
	private String userAddress;
	private String userTel;
	private String userEmail;
	private String userEnrollDate;
	private String userDelFl;
	private String userIdentify;
	private String userIcon;
}
