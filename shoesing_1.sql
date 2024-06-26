-- 11G 버전 이전의 문법을 사용 가능하도록 함
ALTER SESSION SET "_ORACLE_SCRIPT" = TRUE;
-- CTRL + ENTER : 선택한 SQL 수행

-- 사용자 계정 생성
CREATE USER shoesing IDENTIFIED BY shoesing1234;


-- 사용자 계정에 권한 부여
GRANT RESOURCE, CONNECT TO shoesing;

-- 객체가 생성될 수 있는 공간 할당량 지정
ALTER USER shoesing DEFAULT TABLESPACE SYSTEM QUOTA UNLIMITED ON SYSTEM;

-------------------------------------------------------------------------------

CREATE TABLE "USER" (
	USER_NO	NUMBER		NOT NULL,
	USER_ID	NVARCHAR2(30)		NOT NULL,
	USER_PW	NVARCHAR2(50)		NOT NULL,
	USER_NICKNAME	NVARCHAR2(30)		NOT NULL,
	USER_NAME	NVARCHAR2(10)		NULL,
	USER_ADDRESS	NVARCHAR2(300)		NULL,
	USER_TEL	NVARCHAR2(12)		NULL,
	USER_EMAIL	NVARCHAR2(300)		NOT NULL,
	USER_ENROLL_DATE	DATE	DEFAULT SYSDATE	NOT NULL,
	USER_DEL_FL	CHAR(1)	DEFAULT 'N'	NOT NULL,
	USER_IDENTIFY	CHAR(1)	DEFAULT 'N'	NOT NULL
);

COMMENT ON COLUMN "USER"."USER_NO" IS '회원번호(PK)';

COMMENT ON COLUMN "USER"."USER_ID" IS '회원 아이디';

COMMENT ON COLUMN "USER"."USER_PW" IS '회원 비밀번호';

COMMENT ON COLUMN "USER"."USER_NICKNAME" IS '회원 닉네임';

COMMENT ON COLUMN "USER"."USER_NAME" IS '회원 실명';

COMMENT ON COLUMN "USER"."USER_ADDRESS" IS '회원 주소';

COMMENT ON COLUMN "USER"."USER_TEL" IS '회원 전화번호';

COMMENT ON COLUMN "USER"."USER_EMAIL" IS '회원 이메일';

COMMENT ON COLUMN "USER"."USER_ENROLL_DATE" IS '회원 가입일';

COMMENT ON COLUMN "USER"."USER_DEL_FL" IS '회원 탈퇴 여부';

COMMENT ON COLUMN "USER"."USER_IDENTIFY" IS '비회원 식별 여부(Y/N)';

ALTER TABLE "USER" ADD CONSTRAINT PK_USER PRIMARY KEY (
	USER_NO
);

CREATE SEQUENCE SEQ_USER_NO NOCACHE;

SELECT * FROM "USER";
COMMIT;

DROP TABLE "USER";
ROLLBACK;

GRANT CREATE PROCEDURE TO shoesing;

CREATE OR REPLACE FUNCTION shoesing.NEXT_CART_NO

-- 반환형
RETURN NUMBER
-- 사용할 변수
IS CART_NO NUMBER;
BEGIN
   SELECT SEQ_CART_NO.NEXTVAL
   INTO CART_NO
   FROM DUAL;
   RETURN CART_NO;
END;

COMMIT;


UPDATE "USER" SET
		USER_NAME='user00',
		USER_NICKNAME= '유저',
		USER_TEL= 'ㅣ',
		USER_ADDRESS= #{userAddress},
		USER_EMAIL=#{userEmail},
		USER_PW= #{userPw},
		
		
		
		SELECT USER_ID
		FROM "USER"
		WHERE USER_ID ='user01'
		AND USER_DEL_FL ='N';
		WHERE USER_ID = #{userId}



SELECT count(*)
FROM "USER"
WHERE USER_ID = 'java88'
AND USER_DEL_FL ='N';


SELECT USER_PW 
		FROM "USER"
		WHERE USER_ID = 'java88'
		AND USER_DEL_FL ='N';
		

ALTER TABLE "USER" MODIFY USER_NICKNAME NVARCHAR2(30) DEFAULT 'ANON';



CREATE OR REPLACE FUNCTION shoesing.CURR_ITEM_NO
-- 반환형
RETURN NUMBER
-- 사용할 변수
IS ITEM_NO NUMBER;
BEGIN
   SELECT SEQ_ITEM_NO.CURRVAL
   INTO ITEM_NO
   FROM DUAL;
   RETURN ITEM_NO;
END;

CREATE OR REPLACE FUNCTION shoesing.NEXTVAL_STOCK_NO
-- 반환형
RETURN NUMBER
-- 사용할 변수
IS STOCK_NO NUMBER;
BEGIN
   SELECT SEQ_STOCK_NO.NEXTVAL
   INTO STOCK_NO
   FROM DUAL;
   RETURN STOCK_NO;
END;

COMMIT;


CREATE OR REPLACE FUNCTION shoesing.NEXTVAL_STOCK_NO
-- 반환형
RETURN NUMBER
-- 사용할 변수
IS STOCK_NO NUMBER;
BEGIN
   SELECT SEQ_ITEM_STOCK_NO.NEXTVAL
   INTO STOCK_NO
   FROM DUAL;
   RETURN STOCK_NO;
END;

SELECT * FROM "USER";



SELECT * FROM "STOCK";
