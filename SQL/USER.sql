CREATE TABLE "USER" (
USER_NO				NUMBER							NOT NULL,
USER_ID				NVARCHAR2(30)					NOT NULL,
USER_PW				NVARCHAR2(250)					NOT NULL,
USER_NICKNAME		NVARCHAR2(30)					NOT NULL,
USER_NAME			NVARCHAR2(10)					NULL,
USER_ADDRESS		NVARCHAR2(300)					NULL,
USER_TEL			NVARCHAR2(12)					NULL,
USER_EMAIL			NVARCHAR2(300)					NOT NULL,
USER_ENROLL_DATE	DATE			DEFAULT SYSDATE	NOT NULL,
USER_DEL_FL			CHAR(1)			DEFAULT 'N'		NOT NULL,
USER_IDENTIFY		CHAR(1)			DEFAULT 'N'		NOT NULL
);

COMMENT ON COLUMN "USER".USER_NO IS '회원번호(PK)';

COMMENT ON COLUMN "USER".USER_ID IS '회원 아이디';

COMMENT ON COLUMN "USER".USER_PW IS '회원 비밀번호';

COMMENT ON COLUMN "USER".USER_NICKNAME IS '회원 닉네임';

COMMENT ON COLUMN "USER".USER_NAME IS '회원 실명';

COMMENT ON COLUMN "USER".USER_ADDRESS IS '회원 주소';

COMMENT ON COLUMN "USER".USER_TEL IS '회원 전화번호';

COMMENT ON COLUMN "USER".USER_EMAIL IS '회원 이메일';

COMMENT ON COLUMN "USER".USER_ENROLL_DATE IS '회원 가입일';

COMMENT ON COLUMN "USER".USER_DEL_FL IS '회원 탈퇴 여부';

COMMENT ON COLUMN "USER".USER_IDENTIFY IS '비회원 식별 여부(Y/N)';

SELECT * FROM "USER";

