const inputId = document.querySelector('#inputId');
const checkBtn = document.querySelector('#checkBtn');
const checkIdTxt = document.querySelector('#checkIdTxt');
const restoBtn = document.querySelector('#restoBtn');

// 회원 탈퇴 확인
checkBtn.addEventListener('click', () => {
  fetch('/user/checkDel', {
    // 회원 탈퇴 상태 확인
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: inputId.value,
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (inputId.value.length == 0) {
        checkIdTxt.innerText = '회원 아이디가 공백 상태 입니다';
      } else {
        if (result == 0) {
          checkIdTxt.innerText = '회원이 확인되었습니다';
          inputId.readOnly = true; // input 막기
          restoBtn.disabled = false; // 복구 버튼 활성화
        } else if (result == 1) {
          checkIdTxt.innerText = '탈퇴하지 않은 회원입니다';
        } else {
          checkIdTxt.innerText = '회원을 확인할 수 없습니다';
        }
      }
    });
});


const check = document.querySelector('#check');
const answ = document.querySelector('#answ');

check.addEventListener('change', () => {
  if (check.value == '2') {
    answ.readOnly = true;
  } else {
    answ.readOnly = false;
  }
});

