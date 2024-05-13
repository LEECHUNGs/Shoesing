///필수 항목 
const checkObj ={
  updateNickname : false,
  updateEmail : false,
};

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
        checkObj.updateNickname=false;
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
        checkObj.updateNickname=false;
        return;       
      }
      updateNicknameMessage.innerText= "사용가능한 닉네임 입니다"
      checkObj.updateNickname= true;           
    });
});

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




// 주소 수정
const postcode = document.getElementById('postcode').value;
const address = document.getElementById('address').value;
const detailAddress = document.getElementById('detailAddress').value;

function  execDaumPostCode() {
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          postcode.value = data.zonecode;
          address.value = addr;
          // 커서를 상세주소 필드로 이동한다.
          detailAddress.focus();
      }
  }).open();
}

// 주소 검색 버튼 클릭 시 나타나게 하기
document.querySelector("#searchAddress").addEventListener("click", execDaumPostCode);

// 이메일 수정 (완벽한데 마지막 부분만 인증하기 되었을 때 창닫힐 수 있도록 설정하기만 추가!)
const updateEmailBtn = document.querySelector("#updateEmailBtn");
const emailDiv = document.querySelector("#emailDiv");
const sendAuthKeyBtn = document.querySelector("#sendAuthKeyBtn");
updateEmailBtn.addEventListener("click",e =>{
  emailDiv.setAttribute("style","pointer-events:auto"); 
 
  sendAuthKeyBtn.setAttribute("style","display:block");
  updateEmailBtn.setAttribute("style","display : none");
  ;
})


const updateEmail = document.querySelector("#updateEmail");
const updateDomain = document.querySelector("#updateDomain");
const domainList = document.querySelector("#domainList");
const emailMessage = document.querySelector("#emailMessage");
updateEmail.addEventListener('input', (e) => {
  if (
    e.target.value.trim().length == 0 ||
    updateDomain.value.trim().length == 0
  ) {
    emailMessage.innerText = '이메일을 입력해주세요';
    return;
  }
  emailMessage.innerText = '이메일을 입력 성공';

  
});

updateDomain.addEventListener('input', (e) => {

  if (e.target.value.trim().length == 0 || updateEmail.value.trim().length == 0) {
    emailMessage.innerText = '이메일을 입력해주세요';
    
    return;
    
  }
  checkObj.updateEmail=true;
  emailMessage.innerText = '이메일을 입력 성공';
});

domainList.addEventListener('change', (e) => {
  const optionsValue = e.target.options[e.target.selectedIndex].value;
  updateDomain.value = optionsValue;

  if (!optionsValue == '') {
    updateDomain.readOnly = true;
  } else {
    updateDomain.readOnly = false;
  }
  if (e.target.value.trim().length == 0 || updateEmail.value.trim().length == 0) {
    emailMessage.innerText = '이메일을 입력해주세요';
    return;
  }
  emailMessage.innerText = '이메일 입력 성공';
  const updateEmail = updateEmail.value + '@' + updateDomain.value;
  console.log(updateEmail);
});

// 이메일 인증번호 입력
const authKey = document.querySelector("#authKey");
const checkAuthKeyBtn = document.querySelector("#checkAuthKeyBtn");
const authKeyMessage = document.querySelector("#authKeyMessage");
//const authKeyDiv = document.querySelector("#authKeyDiv");


let authTimer;
const initMin = 4;
const initSec = 59;
const initTime = '05:00';

let min = initMin;
let sec = initSec;

sendAuthKeyBtn.addEventListener('click', () => {
  checkObj.updateEmail=false;
  authKeyMessage.innerText = '';
  const emailVal = updateEmail.value + '@' + updateDomain.value;
 
  if (updateEmail.value.length == 0 || updateDomain.value.length == 0) {
    alert('이메일 작성 후 클릭해 주세요');
    return;  
  }
  //authKeyDiv.setAttribute("style","visibility:visible");  
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
        checkObj.updateEmail=false;
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
const updateInputEmail = document.querySelector('#updateInputEmail');

checkAuthKeyBtn.addEventListener('click', () => {
  if (min == 0 && sec == 0) {
    alert('인증번호 입력 제한시간을 초과하였습니다!');
    return;
  }
  // if (authKey.value.length != 6) {
  //   alert('인증번호를 정확히 입력해 주세요');
  // }

  const obj = {

    email: updateEmail.value + '@' + updateDomain.value,
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
      updateInputEmail.value = updateEmail.value + '@' + updateDomain.value;
      
    });
});


//========================================================================
//최종 수정하기 전 검사?! 체크?



//필수항목 닉네임, 현재 비번(만약 변경비번 입력했을 때 변경비번 필수), 이메일(이메일 변경했을 때 인증번호 필수)
document.querySelector('#updateProfileBtn').addEventListener("click", (e) => {
  
  if(updateNickname.value.trim().length == 0){
    alert('닉네임을 입력해주세요');
    updateNickname.focus();
    checkObj.updateNickname = false;
    return;
  }
 
  if(updateEmail.value.trim().length === 0){
    alert('이메일을 입력해주세요');
    checkObj.updateEmail = false;
    updateEmail.focus();
    return;
  }else{
    //만약 인증번호 요청 버튼이 클릭되는 경우에
    if(sendAuthKeyBtn.clicked){
      if(authKey.value.trim().length == 0){
        alert('인증번호가 입력되지 않았습니다. 입력해주세요')
        checkObj.updateEmail = false;
        sendAuthKeyBtn.focus();
        return;
      }
    }
  }


  checkObj.updateNickname =true;
  checkObj.updateEmail =true;
  const updateProfileForm= document.querySelector('#updateProfileForm');

  updateProfileForm.submit();
  alert("회원정보가 수정되었습니다!");
  
    
});

// 모든 검사를 통과한경우에 폼 제출하기
// const updateProfileForm= document.querySelector('#updateProfileForm'); 
  
// updateProfileForm.addEventListener("submit",(e)=>{

//   if(!checkObj.updateNickname){
//     e.preventDefault();
//     alert('회원정보 수정에 오류가 있습니다(닉네임)')
//     return;
//   }
//   if(!checkObj.currentPw){
//     e.preventDefault();
//     alert('회원정보 수정에 오류가 있습니다(비밀번호)')
//     return;
//   }
//   if(!checkObj.updateEmail){
//     e.preventDefault();
//     alert('회원정보 수정에 오류가 있습니다(이메일)')
//     return;
//   }
//     alert("회원정보가 수정되었습니다!");
//     return true;
//   })

//====================================================================
//비밀번호 변경 
const newPw = document.querySelector("#newPw");
const newPwConfirm = document.querySelector("#newPwConfirm");
const updatePwMessage = document.querySelector("#updatePwMessage");
const currentPw = document.querySelector("#currentPw");

const checkUpdatePw = () => {
  if (newPw.value == newPwConfirm.value) {
    updatePwMessage.innerText = '';
    updatePwMessage.innerText='비밀번호가 일치합니다';
    return;
  }
  updatePwMessage.innerText = '비밀번호가 일치하지 않습니다';
};

newPw.addEventListener('input', (e) => {
  const inputNewPw = e.target.value;

  if (inputNewPw.trim().length == 0) {
    updatePwMessage.innerText ='비밀번호는 최소 6자에서 16자까지, 영문자,숫자,특수문자를 포함해야합니다.';
    newPw.value = '';
    return;
  }

  if(newPwConfirm.trim().length == 0){
    updatePwMessage.innerText = '변경할 비밀번호를 한번 더 입력해주세요'
    return;
  }
  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;

  if (!regExp.test(inputNewPw)) {
    updatePwMessage.innerText = '비밀번호가 유효하지 않습니다.';

    return;
  }

  updatePwMessage.innerText = '유효한 비밀번호 형식입니다';
  if (newPwConfirm.value.length > 0) {
    checkUpdatePw();
  }
});

newPwConfirm.addEventListener('input', () => {
  if (newPw.value.length !== 0) {
    checkUpdatePw();
    return;
  }
});

// 비밀번호 변경 ajax
const updatePwForm = document.querySelector('#updatePwForm');

updatePwForm.addEventListener("submit", e=>{
  e.preventDefault();

  if(currentPw.value.trim() == 0){
    alert('현재 비밀번호를 입력해 주세요.');
    e.preventDefault();
    return;
  }
  fetch("/user/changePw", {
    method : 'POST',
    headers : { 'Content-Type': 'application/json; charset=utf-8'},
    body : JSON.stringify({
        'currentPw' : currentPw.value,
        'newPw' : newPw.value
    })
})
  .then(resp => resp.json())
  .then(result => {
      if(result == 0){
          alert('현재 비밀번호가 일치하지 않습니다.');
          e.preventDefault();
          return;
      } 
      if(result == 2){
        alert('현재 비밀번호와 변경된 비밀번호가 일치합니다.');
        e.preventDefault();
        return;
      }
      if(result == 1){
          alert('비밀번호가 변경되었습니다.');
          window.location.href="/user/myPage";
      }
  })
})


//=========================================================================
// 회원 탈퇴 (성공!)

const checkSignout ={
  "agreeSignout" : false,
  "currentPwConfirm" :false
};

const currentPwConfirm = document.querySelector("#currentPwConfirm");
const agreeSignout = document.querySelector("#agreeSignout");
const currentPwConfirmMessage = document.querySelector("#currentPwConfirmMessage");  
const signoutBtn = document.querySelector("#signoutBtn");

const signoutForm= document.querySelector("#signoutForm");


// 비밀번호 입력 시 이벤트
currentPwConfirm.addEventListener("input",()=>{
  if(currentPwConfirm.value.trim().length == 0){
     currentPwConfirmMessage.innerText="비밀번호를 입력해주세요"
      checkSignout.currentPwConfirm = false;
      return;
    }
    
  const inputPw = currentPwConfirm.value;
  fetch("/user/checkPw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: inputPw
  })
  .then(resp => resp.text())
  .then(result => {
    if(result == 0){
      
      currentPwConfirmMessage.innerText= '비밀번호 불일치';
      checkSignout.currentPwConfirm = false;
      return; 
    } 
    currentPwConfirmMessage.innerText="비밀번호 일치"
    checkSignout.currentPwConfirm = true;
    
  }) 
});

// 동의체크박스
agreeSignout.addEventListener("change", (e) => {
  console.log(e.target.checked);
  if(e.target.checked) checkSignout.agreeSignout = true;
  else      checkSignout.agreeSignout = false;
})

// 최종 서브밋 될 때 이벤트
signoutForm.addEventListener("submit", (e) => {

  if(!checkSignout.agreeSignout){
    e.preventDefault();
    alert('탈퇴 약관에 동의해주세요');
    return;

  }

  if(!checkSignout.currentPwConfirm) {
    e.preventDefault();
    alert('비밀번호가 일치하지 않습니다');
    return;
  }

  alert("탈퇴 되었습니다!");
  return true;
  
})




