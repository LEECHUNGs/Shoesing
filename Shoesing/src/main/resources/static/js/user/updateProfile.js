// 내 정보 수정 form 제출시 나타날 이벤트
// const updateInfo= document.querySelector("#updateInfo");
// updateInfo.addEventListener('submit', handleFormSubmit);

// function handleFormSubmit(e){
//   e.preventDefault();

//     const data = new data(e.target);
//     const values = Object.entries(data);
  
//     // 필수 입력 항목 확인
//     const requiredFields = ['updateNickname', 'updateEmail', 'currentPw'];
//     const emptyFields = Fields.some(field => values[field] === '');
  
//     if (emptyFields) {
//       // 필수 입력 항목이 비어 있는 경우 에러 처리
//       alert('필수 입력 항목을 모두 입력해주세요.');
//       return;
//     }
  
//     // 선택 입력 항목의 null 값 처리
//     const optionalFields = ['updateName', 'updateTel', 'updateAddress', 'updatePw', 'updatePwConfirm'];
//     const updatedValues = { ...values };
//     optionalFields.forEach(field => {
//       if (updatedValues[field] === '') {
//         updatedValues[field] = null;
//       }
//     });
  
//     // 수정된 회원 정보 서버로 전송
//     sendUpdateRequest(updatedValues);          
// }

// function sendUpdateRequest(values) {
//     // 서버로 AJAX 요청 보내기
//     // (예: fetch, axios 등을 사용하여 서버 API 호출)
//     fetch('/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(values)
//     })
//     .then(resp => {
//       if (resp.ok) {
//         // 회원 정보 수정 성공 처리
//         alert('회원 정보가 수정되었습니다.');
//       } else {
//         // 회원 정보 수정 실패 처리
//         alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
//       }
//     })
//     .catch(error => {
//       // 네트워크 오류 등 예외 처리
//       console.error('내 정보 수정 실패:', error);
//       alert('회원 정보 수정이 실패했습니다. 다시 시도해주세요.');
//     });
//   }
  
//===========================================================================

//프로필 사진 변경
const userIcon = document.querySelectorAll(".userIcon");
const profileIcon = document.querySelectorAll(".profileIcon");

profileIcon.forEach( (i) => {
  i.addEventListener("click", e =>{
    const inputIcon = i.value;
    fetch('/user/changeIcon', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ "inputIcon" : inputIcon })
    })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log('성공');
        alert("프로필 사진이 변경되었습니다");
        userIcon.forEach((u)=>{
          u.src = "/img/userIcon/" + inputIcon + ".png";
          console.log(u.src);
        });
      } else {
        console.log('실패');
      }
    });
  });
});


// 이름 수정
const updateName = document.querySelector("#updateName");
const updateNameMessage = document.querySelector("#updateNameMessage");

const regExp = /^[가-힣]{2,6}$/;
updateName.addEventListener("input",(e)=>{
    if(!regExp.test(e.target.value)){
      updateNameMessage.innerText="유효한 이름 형식이 아닙니다."
      return;
    } 
      updateNameMessage.innerText="";
      return e.target.value; 
});

// 닉네임 수정 (+중복확인)
const updateNickname = document.querySelector("#updateNickname");
const updateNicknameMessage = document.querySelector("#updateNicknameMessage");

updateNickname.addEventListener("input",(e)=>{
const regExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;
    if(!regExp.test(updateNickname.value)){
        updateNicknameMessage.innerText="유효하지 않는 닉네임입니다.";
        return;
    }
    updateNicknameMessage.innerText=""
    const inputNickname = e.target.value;
    fetch("/user/checkNickname",{
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : inputNickname,
    })
    .then(resp => resp.text())
    .then(result => {
      if (result == 1) {
        updateNicknameMessage.innerText="이미 사용중인 닉네임 입니다";
        return;       
      }
      updateNicknameMessage.innerText= "사용가능한 닉네임 입니다"
      updateCheckObj.updateNickname = true;           
    });
});
//------------------------------------------------------------------수정전


//비밀번호가 현재 입력한 값과 같은지 조회 (작동o)
const updatePwBtn = document.querySelector("#updatePwBtn");
const currentPw = document.querySelector("#currentPw");
updatePwBtn.addEventListener("click",()=>{
  if(currentPw.value.trim().length ==0){
  alert('현재 비밀번호를 입력해주시기 바랍니다');
  return;
  }
  const inputPw = currentPw.value ;
  console.log(inputPw);
  fetch("/user/checkPw",{
      method : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body : inputPw,
    })
  .then(resp => resp.text())
  .then(result => {
    if(result == 0){
      console.log(result);
      console.log("비밀번호 불일치");
      alert("비밀번호가 일치하지 않습니다")
      currentPw.value = '';
      return;
    }
      updatePwDiv.setAttribute("style","visibility:visible");  
      console.log("비밀번호 일치");
      
    
  }) 
});

//비밀번호 변경 
const updatePw = document.querySelector("#updatePw");
const updatePwConfirm = document.querySelector("#updatePwConfirm");
const updatePwMessage = document.querySelector("#updatePwMessage");

const checkUpdatePw = () => {
  if (updatePw.value === updatePwConfirm.value) {
    updatePwMessage.innerText = '';
    alert("비밀번호 일치")
    updatePwMessage.classList.add('confirm');
    updatePwMessage.classList.remove('error');
    return;
  }
  updatePwMessage.innerText = '비밀번호가 일치하지 않습니다';
  updatePwMessage.classList.add('error');
  updatePwMessage.classList.remove('confirm');
};

updatePw.addEventListener('input', (e) => {
  const inputUpdatePw = e.target.value;

  if (inputUpdatePw.trim().length === 0) {
    updatePwMessage.innerText ='비밀번호는 최소 6자에서 16자까지, 영문자,숫자,특수문자를 포함해야합니다.';
    updatePwMessage.classList.remove('confirm', 'error'); 
    updatePw.value = '';
    return;
  }

  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;

  if (!regExp.test(inputUpdatePw)) {
    updatePwMessage.innerText = '비밀번호가 유효하지 않습니다.';
    updatePwMessage.classList.add('error');
    updatePwMessage.classList.remove('confirm');
    return;
  }

  updatePwMessage.innerText = '유효한 비밀번호 형식입니다';
  updatePwMessage.classList.add('confirm');
  updatePwMessage.classList.remove('error');

  if (updatePwConfirm.value.length > 0) {
    checkUpdatePw();
  }
});

updatePwConfirm.addEventListener('input', () => {
  if (updatePw.value.length !== 0) {
    checkUpdatePw();
    return;
  }
});

//
// const updateInputPw = document.querySelectorAll(".updateInputPw")

// updateInputPw.forEach( (u) => {
//   u.addEventListener("input", e=>{
//     const inputPw = e.target.value;
//     fetch("/user/changePw",{
//       method : 'POST',
//       headers : {'Content-Type' : 'application/json'},
//       body : inputPw
//     })
//     console.log(inputPw)
//     .then(resp => resp.text())
//     .then(result => {
//       if(result > 0){
//         alert("비밀번호가 변경되었습니다");
//         console.log("비밀번호 변경 성공");
//       }else{
//         console.log(result);
//         alert("비밀번호 변경에 실패했습니다");
//         console.log("비밀번호 변경 실패");
//       }
//     })
//   })
// })



//-------------------------------------------------------------------

// 전화번호 수정(정규식검사)
const updateTel = document.querySelector("#updateTel");
const updateTelMessage = document.querySelector("#updateTelMessage");

updateTel.addEventListener("input",(e)=>{
    const regExp=/^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
    if(!regExp.test(e.target.value)){
        updateTelMessage.innerText="유효한 전화번호 형식으로 수정해주세요";
        return;
    }
      updateTelMessage.innerText="";  
});

// 이메일 수정
const updateEmail = document.querySelector("#updateEmail");
const inputDomain = document.querySelector("#inputDomain");
const domainList = document.querySelector("#domainList");
const emailMessage = document.querySelector("#emailMessage");

updateEmail.addEventListener('input', (e) => {
  if (
    e.target.value.trim().length == 0 ||
    inputDomain.value.trim().length == 0
  ) {
    emailMessage.innerText = '이메일을 입력해주세요';
    return;
  }
  emailMessage.innerText = '이메일을 입력 성공';
});

inputDomain.addEventListener('input', (e) => {

  if (e.target.value.trim().length == 0 || updateEmail.value.trim().length == 0) {
    emailMessage.innerText = '이메일을 입력해주세요';
    return;
  }
  emailMessage.innerText = '이메일을 입력 성공';
});

domainList.addEventListener('change', (e) => {
  const optionsValue = e.target.options[e.target.selectedIndex].value;
  inputDomain.value = optionsValue;

  if (!optionsValue == '') {
    inputDomain.readOnly = true;
  } else {
    inputDomain.readOnly = false;
  }
  if (e.target.value.trim().length == 0 || updateEmail.value.trim().length == 0) {
    emailMessage.innerText = '이메일을 입력해주세요';
    return;
  }
  emailMessage.innerText = '이메일 입력 성공';
  const emailVal = userEmail.value + '@' + inputDomain.value;
  console.log(emailVal);
});

// 이메일 인증번호 입력
const sendAuthKeyBtn = document.querySelector("#sendAuthKeyBtn");
const authKey = document.querySelector("#authKey");
const checkAuthKeyBtn = document.querySelector("#checkAuthKeyBtn");
const authKeyMessage = document.querySelector("#authKeyMessage");


let authTimer;
const initMin = 4;
const initSec = 59;
const initTime = '05:00';

let min = initMin;
let sec = initSec;

sendAuthKeyBtn.addEventListener('click', () => {
  authKeyMessage.innerText = '';
  const emailVal = updateEmail.value + '@' + inputDomain.value;
 
  if (updateEmail.value.length == 0 || inputDomain.value.length == 0) {
    alert('이메일 작성 후 클릭해 주세요');
    return;  
  }

  authKeyDiv.setAttribute("style","visibility:visible");
  min = initMin;
  sec = initSec;

  clearInterval(authTimer);

  fetch('/email/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: emailVal,
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result == 1) {
        console.log('인증 번호 발송 성공');
        emailMessage.innerText =
          '인증번호 발송에 성공했습니다 인증번호를 입력해주세요';
      } else {
        console.log('인증 번호 발송 실패');
        emailMessage.innerText = '인증번호 발송에 실패했습니다';
      }
      
  });

  authKeyMessage.innerText = initTime;
  authKeyMessage.classList.remove('confirm', 'error');

  alert('인증번호를 발송하였습니다. 입력하신 이메일을 확인해주세요');

  authTimer = setInterval(() => {
    authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`;
    if (min == 0 && sec == 0) {
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
  if (number < 10) return "0" + number;
  else            return number;
}

// form 전달용 input
const inputEmail = document.querySelector('#inputEmail');

checkAuthKeyBtn.addEventListener('click', () => {
  if (min == 0 && sec == 0) {
    alert('인증번호 입력 제한시간을 초과하였습니다!');
    return;
  }
  if (authKey.value.length != 6) {
    alert('인증번호를 정확히 입력해 주세요');
    return;
  }
  const obj = {

    email: updateEmail.value + '@' + inputDomain.value,
    authKey: authKey.value,
  };


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
      inputEmail.value = userEmail.value + '@' + inputDomain.value;
      checkObj.authKey = true;
    });
});


// 주소 수정
function execDaumPostcode() {
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
        document.getElementById('postcode').value = data.zonecode;
        document.getElementById('roadAddress').value = roadAddr;
        document.getElementById('jibunAddress').value = data.jibunAddress;
  
        if (roadAddr !== '') {
          document.getElementById('extraAddress').value = extraRoadAddr;
        } else {
          document.getElementById('extraAddress').value = '';
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


// 회원 탈퇴
const signout=document.querySelector("#signout");
if(signout != null){
  signout.addEventListener("submit",e=>{
      const currentPw = document.querySelector("#currentPw");
      const agreeSignout = document.querySelector("#agreeSignout");
      if(currentPw.value.trim().length == 0){
          alert=("현재 비밀번호를 입력해주세요");
          e.preventDefault();
          return;
      }
      const inputPw = currentPw.value ;
      console.log(inputPw);

    //현재 비번의 값이 일치하지 않는경우 막기

      if(!agreeSignout.checked){
          alert("약관에 동의해주세요");
          e.preventDefault();
          return;
      }
      if(!confirm("정말 탈퇴 하시겠습니까?")){
          alert("취소되었습니다.");
          e.preventDefault();
          return;
      }
  });
}
