//회원가입 유효성 검사

//필수 항목 유효성 검사를 체크하기 위한 객체
const checkObj = {
  userId: false,
  userNickname: false,
  userPw: false,
  userPwConfirm: false,
  userEmail: false,
  authKey: false,
};

// Id 유효성 검사
const userId = document.querySelector('#userId');
const idMessage = document.querySelector('#idMessage');

userId.addEventListener('input', (e) => {
  if (userId.value.length === 0) {
    idMessage.innerText = '아이디를 입력해주세요';
    idMessage.classList.add('error');
    idMessage.classList.remove('confirm');
    checkObj.userId = false;
    return;
  }

  const regExp = /^[a-z0-9]{4,12}$/;

  if (!regExp.test(userId.value)) {
    idMessage.innerText = '유효하지 않는 아이디입니다.';
    idMessage.classList.add('error');
    idMessage.classList.remove('confirm');
    checkObj.userId = false;
    return;
  }

  idMessage.innerText = '사용 가능한 아이디 입니다';
  idMessage.classList.add('confirm');
  idMessage.classList.remove('error');
  checkObj.userId = true;

  const inputId = e.target.value;

  fetch('/user/checkId')
    .then((resp) => resp.text())
    .then((result) => {
      if (result == 1) {
        idMessage.innerText = '이미 사용중인 아이디 입니다';
        idMessage.classList.add('error');
        idMessage.classList.remove('confirm');
        checkObj.userId = false;
        return;
      }
      idMessage.innerText = '사용 가능한 아이디 입니다';
      idMessage.classList.add('confirm');
      idMessage.classList.remove('error');
      checkObj.userId = true;
    });
});

//  이름 유효성 검사
// const userName =document.querySelector("#userName");

// userName.addEventListener("input", e => {
//     const inputName = e.target.value
//     if(inputName.trim().length === 0){
//         alert = ("이름을 입력해주세요");
//         checkObj.userName =false;
//         userName.value ="";
//         return;
//     }
//     const regExp = /^[가-힣]{2,6}$/;

//     if(!regExp.test(inputName)){
//         alert = ("이름을 입력해주세요");
//         checkObj.userName = false;
//         return;
//     }
//     checkObj.userName =true;
// });

//  닉네임 유효성 검사
const userNickname = document.querySelector('#userNickname');
const nicknameMessage = document.querySelector('#nicknameMessage');

userNickname.addEventListener('input', (e) => {
  if (userNickname.value.length === 0) {
    nicknameMessage.innerText = '닉네임을 입력해주세요';
    nicknameMessage.classList.add('error');
    nicknameMessage.classList.remove('confirm');
    checkObj.userNickname = false;
    return;
  }

  const regExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;

  if (!regExp.test(userNickname.value)) {
    nicknameMessage.innerText = '유효하지 않는 닉네임입니다.';
    nicknameMessage.classList.add('error');
    nicknameMessage.classList.remove('confirm');
    checkObj.userNickname = false;
    return;
  }

  nicknameMessage.innerText = '사용 가능한 닉네임 입니다';
  nicknameMessage.classList.add('confirm');
  nicknameMessage.classList.remove('error');
  checkObj.userNickname = true;

  const inputId = e.target.value;

  fetch('/user/checkNickname')
    .then((resp) => resp.text())
    .then((result) => {
      if (result == 1) {
        nicknameMessage.innerText = '이미 사용중인 닉네임 입니다';
        nicknameMessage.classList.add('error');
        nicknameMessage.classList.remove('confirm');
        checkObj.userNickname = false;
        return;
      }
      nicknameMessage.innerText = '사용 가능한 닉네임 입니다';
      nicknameMessage.classList.add('confirm');
      nicknameMessage.classList.remove('error');
      checkObj.userNickname = true;
    });
});

//  비밀번호 유효성 검사
const userPw = document.querySelector('#userPw');
const userPwConfirm = document.querySelector('#userPwConfirm');
const pwMessage = document.querySelector('#pwMessage');

const checkPw = () => {
  if (userPw.value === userPwConfirm.value) {
    pwMessage.innerText = '비밀번호가 일치합니다';
    pwMessage.classList.add('confirm');
    pwMessage.classList.remove('error');
    checkObj.userPwConfirm = true;
    return;
  }

  pwMessage.innerText = '비밀번호가 일치하지 않습니다';
  pwMessage.classList.add('error');
  pwMessage.classList.remove('confirm');
  checkObj.userPwConfirm = false;
};

userPw.addEventListener('input', (e) => {
  const inputPw = e.target.value;

  if (inputPw.trim().length === 0) {
    pwMessage.innerText = '영어, 숫자, 특수문자 6~16글자 사이로 입력해주세요';
    pwMessage.classList.remove('confirm', 'error');
    checkObj.userPw = false;
    userPw.value = '';
    return;
  }

  const regExp = /^[a-zA-Z0-9!?@#$%^&*()._-]{6,16}$/;

  if (!regExp.test(inputPw)) {
    pwMessage.innerText = '비밀번호가 유효하지 않습니다.';
    pwMessage.classList.add('error');
    pwMessage.classList.remove('confirm');
    checkObj.userPw = false;
    return;
  }

  pwMessage.innerText = '유효한 비밀번호 형식입니다';
  pwMessage.classList.add('confirm');
  pwMessage.classList.remove('error');
  checkObj.userPw = true;

  if (userPwConfirm.value.length > 0) {
    checkPw();
  }
});

userPwConfirm.addEventListener('input', () => {
  if (checkObj.userPw) {
    checkPw();
    return;
  }
  checkObj.userPwConfirm = false;
});

// 이메일 유효성 검사

const userEmail = document.querySelector('#userEmail');
const emailMessage = document.querySelector('#emailMessage');
const domainList = document.querySelector('#domainList');

userEmail.addEventListener('input', (e) => {
  checkObj.authKey = false;
  document.querySelector('#authKeyMessage').innerText = '';
  const inputEmail = e.target.value;

  if (inputEmail.trim().length === 0) {
    emailMessage.innerText = '이메일을 다시 입력해주세요';
    emailMessage.classList.remove('confirm', 'error');
    checkObj.memberEmail = false;
    userEmail.value = '';
    return;
  }

  const regExp = /^[a-zA-Z0-9._%+-]{1,20}$/;

  if (!regExp.test(inputEmail)) {
    emailMessage.innerText = '알맞은 이메일 형식으로 작성해주세요';
    emailMessage.classList.add('error');
    emailMessage.classList.remove('confirm');
    checkObj.userEmail = false;
    return;
  }
});

domainList.addEventListener('change', (e) => {
  if (e.target.value == null) {
    alert = '알맞은 도메인을 입력해주세요';
  }
  emailMessage.innerText = '유효한 이메일 입니다.';
  emailMessage.classList.add('confirm');
  emailMessage.classList.remove('error');
  checkObj.userEmail = true;
});

// 이메일 인증번호
const sendAuthKeyBtn = document.querySelector('#sendAuthKeyBtn');
const authKey = document.querySelector('#authKey');
const checkAuthKeyBtn = document.querySelector('#checkAuthKeyBtn');
const authKeyMessage = document.querySelector('#authKeyMessage');

let authTimer;
const initMin = 4;
const initSec = 59;
const initTime = '05:00';

let min = initMin;
let sec = initSec;

sendAuthKeyBtn.addEventListener('click', () => {
  checkObj.authKey = false;
  authKeyMessage.innerText = '';

  if (!checkObj.userEmail) {
    alert('유효한 이메일 작성 후 클릭해 주세요');
    return;
  }

  min = initMin;
  sec = initSec;

  clearInterval(authTimer);
  // **------ fetch 부분 수정 필요--------------------------------------
  fetch('/email/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: userEmail.value,
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result == 1) {
        console.log('인증 번호 발송 성공');
      } else {
        console.log('인증 번호 발송 실패');
      }
    });

  authKeyMessage.innerText = initTime;
  authKeyMessage.classList.remove('confirm', 'error');

  alert('인증번호가 발송되었습니다');

  authTimer = setInterval(() => {
    authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`;
    if (min == 0 && sec == 0) {
      checkObj.authKey = false;
      clearInterval(authTimer);
      authKeyMessage.classList.add('error');
      authKeyMessage.classList.remove('confirm');
      return;
    }
    if (sec == 0) {
      sec = 60;
      min--;
    }
    sec--;
  }, 1000);
});
function addZero(number) {
  if (number < 10) return '0' + number;
  else return number;
}

checkAuthKeyBtn.addEventListener('click', () => {
  if (min === 0 && sec === 0) {
    alert('인증번호 입력 제한시간을 초과하였습니다!');
    return;
  }
  if (authKey.value.length < 6) {
    alert('인증번호를 정확히 입력해 주세요');
    return;
  }
  const obj = {
    email: userEmail.value + inputDomain.value,
    authKey: authKey.value,
  };
  // **------ fetch 부분 수정 필요--------------------------------------
  fetch('/email/checkAuthKey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result == 0) {
        alert('인증번호가 일치하지 않습니다!');
        checkObj.authKey = false;
        return;
      }
      clearInterval(authTimer);
      authKeyMessage.innerText = '인증 되었습니다.';
      authKeyMessage.classList.remove('error');
      authKeyMessage.classList.add('confirm');
      checkObj.authKey = true;
    });
});

//전화번호 유효성 검사
// 하나라도 입력하면 입력한 값으로 넘어가게 설정
// 10~11 자리인경우 true로 변경
// null일경우 null값으로 제출
const userTel = document.querySelector('#userTel');
const telMessage = document.querySelector('#telMessage');

userTel.addEventListener('input', (e) => {
  const inputTel = e.target.value;
  if (inputTel.trim().length < 1) {
    telMessage.innerText = '유효한 전화번호로 수정해주세요';
    userTel.value = null;
    return;
  }
  //const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;

  if (inputTel.length < 9) {
    telMessage.innerText = '유효한 전화번호 형식으로 수정해주세요';
    telMessage.classList.add('error');
    telMessage.classList.remove('confirm');
    return;
  }
  telMessage.innerText = '유효한 전화번호 형식입니다.';
  telMessage.classList.add('confirm');
  telMessage.classList.remove('error');
});

//---------------------주소 다음 api ==> 수정 필요---------------------

function sample4_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var roadAddr = data.roadAddress;
      var extraRoadAddr = '';

      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr +=
          extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      if (extraRoadAddr !== '') {
        extraRoadAddr = ' (' + extraRoadAddr + ')';
      }
      document.getElementById('sample4_postcode').value = data.zonecode;
      document.getElementById('sample4_roadAddress').value = roadAddr;
      document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

      if (roadAddr !== '') {
        document.getElementById('sample4_extraAddress').value = extraRoadAddr;
      } else {
        document.getElementById('sample4_extraAddress').value = '';
      }
      var guideTextBox = document.getElementById('guide');

      if (data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
        guideTextBox.style.display = 'block';
      } else if (data.autoJibunAddress) {
        var expJibunAddr = data.autoJibunAddress;
        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
        guideTextBox.style.display = 'block';
      } else {
        guideTextBox.innerHTML = '';
        guideTextBox.style.display = 'none';
      }
    },
  }).open();
}

// 회원가입 버튼 클릭시 전체 유효성 검사 여부 확인
const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', (e) => {
  for (let key in checkObj) {
    if (!checkObj[key]) {
      let str;
      switch (key) {
        case 'userId':
          str = '필수항목을 작성해주세요';
          break;
        case 'userNickname':
          str = '필수항목을 작성해주세요';
          break;
        case 'userPw':
          str = '필수항목을 작성해주세요';
          break;
        case 'userPwConfirm':
          str = '비밀번호가 일치하지 않습니다';
          break;
        case 'userEmail':
          str = '필수항목을 작성해주세요';
          break;
        case 'authKey':
          str = '인증번호를 입력하지 않았습니다';
          break;
      }
      alert(str);
      document.getElementById(key).focus(); //초점이동
      e.preventDefault(); // form 태그 기본 이벤트(제출) 막기
      return;
    }
  }
});
