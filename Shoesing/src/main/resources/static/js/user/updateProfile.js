//프로필 사진 button에 누르는 값으로 변경될 수 있게 하기

const profileImg = document.querySelector("#profileImg");
const userIcon = document.querySelector(".userIcon");


// 이름 수정
const updateName = document.querySelector("#updateName");


// 닉네임 수정 (중복확인)
const updateNickname = document.querySelector("#updateNickname");
const checkNickname = document.querySelector("#checkNickname");
const nicknameMessage = document.querySelector("#nicknameMessage");

// 현재 비밀번호 (같은 경우/ 다른경우), 정규식검사
const userPw = document.querySelector("#userPw");
const PwMessage = document.querySelector("#PwMessage");

// 변경할 비밀번호와 변경할 비밀번호 확인 (같은경우/ 다른 경우), 정규식검사,  null인경우
const updatePw = document.querySelector("#updatePw");
const updatePwConfirm = document.querySelector("#updatePwConfirm");
const updatePwMessage = document.querySelector("#updatePwMessage");

// 전화번호 수정(정규식검사)
const updateTel = document.querySelector("#updateTel");
const updateTelMessage = document.querySelector("#updateTelMessage");

// 주소 
const updateAddress = document.querySelector("#updateAddress");

// 현재 비밀번호가 아닌경우 수정 x
// 위에서 설정한 값들이 모두 true인경우 내 정보 수정 완료/ 하나라도 false인 경우 수정 실패 /


// 변경할 비밀번호와 확인이 일치하는 경우/ 일치하지 않는경우 가입 x

// 현재 비밀번호가 일치할 경우 그리거 회원 탈퇴 이용규약 체크했을 경우  회원탈퇴 가능 (알림창으로 정말 회원 탈퇴 할것인지?)