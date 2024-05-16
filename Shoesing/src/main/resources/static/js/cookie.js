// 쿠키 관리
const getCookie = (key) => {
  // 쿠키에서 key가 일치하는 value 얻어오기
  const cookies = document.cookie;

  const cookieList = cookies.split(';').map((el) => el.split('=')); // 배열.map(함수) : 배열의 요소를 이용해서 연산후 결과(새로운 배열)을 반환

  const obj = {};

  for (let i = 0; i < cookieList.length; i++) {
    const k = cookieList[i][0]; // key값 추출
    const v = cookieList[i][1]; // value값 추출
    obj[key] = v;
  }
  return obj[key]; // 매개변수로 전달받은 key와 obj 객체에 저장된 키가 일치하는 value값 반환
  // 존재하지 않으면 undefined
};

// 로그인 팝업
const loginId = document.querySelector('#loginForm #loginId');
// 로그인 페이지
const loginPageId = document.querySelector('#loginPageForm #loginPageId');

if (loginId != null) {
  // 로그인 창의 이메일 입력 부분이 화면에 있을 때
  // 쿠키 중에 key 값이 saveId 인 value 를 얻어온다
  const saveId2 = getCookie('saveId2'); // undefined 혹은 email

  if (saveId2 != undefined) {
    loginId.setAttribute('value', saveId2);

    document
      .querySelector("input[name='saveId2']")
      .setAttribute('checked', true);

    // 로그인 페이지인 경우
    if (loginPageId != null) {
      loginPageId.setAttribute('value', saveId2);

      document
        .querySelector("input[name='savePageId2']")
        .setAttribute('checked', true);
    }
  }
}
