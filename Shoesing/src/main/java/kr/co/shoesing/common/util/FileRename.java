package kr.co.shoesing.common.util;

import java.text.SimpleDateFormat;

public class FileRename {
	public static int seqNum = 1; // 1 ~ 99999 반복

	public static String fileRename(String originalFileName) {
		// 파일 이름값 202404171028_00004.jpg 생성 시간 + 순서로 생성 예정
		// SimpleDateFormat
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

		String date = sdf.format(new java.util.Date()); // 현재 시간 저장 자바 객체

		String number = String.format("%05d", seqNum); // 00000 + seqNum => ex) 00066

		seqNum++;

		if (seqNum == 100000) {
			seqNum = 1;
		}

		// 확장자
		// "문자열".substring(인덱스)
		// 문자열을 인덱스부터 끝까지 잘라낸 결과를 반환

		// "문자열".lastIndexOf(".")
		// 문자열에서 마지막 .의 인덱스를 반환
		String ext = originalFileName.substring(originalFileName.lastIndexOf("."));

		// originalFileName = 어쩌구.jpg
		return date + "_" + number + ext;

	}
}
