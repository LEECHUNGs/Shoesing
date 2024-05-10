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


//==========================================================================
//비밀번호가 현재 입력한 값과 같은지 조회
const updatePwBtn = document.querySelector("#updatePwBtn");
const currentPw = document.querySelector("#currentPw");
const updatePwDiv = document.querySelector("#updatePwDiv");
updatePwBtn.addEventListener("click",()=>{
  if(currentPw.value.trim().length ==0){
  alert('현재 비밀번호를 입력해주시기 바랍니다');
  checkObj.currentPw=false;
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
      checkObj.currentPw=false;
      return;
    }
      updatePwDiv.setAttribute("style","visibility:visible");  
      console.log("비밀번호 일치");
      checkObj.currentPw=true;     
    
  }) 
});

//비밀번호 변경 
const updatePw = document.querySelector("#updatePw");
const updatePwConfirm = document.querySelector("#updatePwConfirm");
const updatePwMessage = document.querySelector("#updatePwMessage");

const checkUpdatePw = () => {
  if (updatePw.value == updatePwConfirm.value) {
    updatePwMessage.innerText = '';
    alert("비밀번호 일치")
    checkObj.updatePw = true;
    return;
  }
  updatePwMessage.innerText = '비밀번호가 일치하지 않습니다';
  checkObj.updatePw = false; 
};

updatePw.addEventListener('input', (e) => {
  const inputUpdatePw = e.target.value;

  if (inputUpdatePw.trim().length === 0) {
    updatePwMessage.innerText ='비밀번호는 최소 6자에서 16자까지, 영문자,숫자,특수문자를 포함해야합니다.';
    updatePw.value = '';
    checkObj.updatePw = false; 
    return;
  }

  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;

  if (!regExp.test(inputUpdatePw)) {
    updatePwMessage.innerText = '비밀번호가 유효하지 않습니다.';
    return;
  }

  if(currentPw.value == updatePw.value){
    updatePwMessage.innerText='현재 비밀번호와 일치합니다';
    constObj.currentPw = true; 
    return;
  }

  updatePwMessage.innerText = '유효한 비밀번호 형식입니다';
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

// 이메일 수정
const updateEmailBtn = document.querySelector("#updateEmailBtn");
const emailDiv = document.querySelector("#emailDiv");
updateEmailBtn.addEventListener("click",e =>{
  emailDiv.setAttribute("style","pointer-events:auto"); 
 
  sendAuthKeyBtn.setAttribute("style","visibility:visible");
})
 
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
  checkObj.updateEmail=true;
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
const authKeyDiv = document.querySelector("#authKeyDiv");


let authTimer;
const initMin = 4;
const initSec = 59;
const initTime = '05:00';

let min = initMin;
let sec = initSec;

sendAuthKeyBtn.addEventListener('click', () => {
  checkObj.updateEmail=false;
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
const inputEmail = document.querySelector('#inputEmail');

checkAuthKeyBtn.addEventListener('click', () => {
  if (min == 0 && sec == 0) {
    alert('인증번호 입력 제한시간을 초과하였습니다!');
    return;
  }
  // if (authKey.value.length != 6) {
  //   alert('인증번호를 정확히 입력해 주세요');
  // }
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
      
    });
});


//========================================================================
//최종 수정하기 전 검사?! 체크?

///필수 항목 
const checkObj ={
  updateNickname : false,
  currentPw : false,
  updateEmail : false,
  updatePw : false
};

//필수항목 닉네임, 현재 비번(만약 변경비번 입력했을 때 변경비번 필수), 이메일(이메일 변경했을 때 인증번호 필수)
document.querySelector('#updateProfileBtn').addEventListener("click", (e) => {
  
  if(updateNickname.value.trim().length == 0){
    alert('닉네임을 입력해주세요');
    updateNickname.focus();
    checkObj.updateNickname = false;
    return;
  }
  if(currentPw.value.trim().length == 0){
    alert('현재 비밀번호를 입력해주세요');
    checkObj.currentPw = false;
    currentPw.focus();
    return;
  }
    // 만약 변경할 비밀번호를 입력하는 칸이 작성되었을 때
    if(updatePw.value.trim().length != 0){

      // 변경 비밀번호의 값과 변경 비밀번호 확인 칸이 일치하지 않으면 return 하고 alert창 띄우기
      if(updatePw.value != updatePwConfirm.value){
        alert('변경할 비밀번호가 일치하지 않습니다 다시 입력해주세요')
        updatePw.value='';
        updatePwConfirm.value='';
        checkObj.currentPw = false;
        updatePw.focus();
        return;
      }
      // 만약 현재 비밀번호와 변경할 비밀번호가 동일한 경우에는 comfirm창을 통해서 같은 비번을 사용할것인지 새롭게 변경할것인지 물어보기
      if(updatePw.value == currentPw.value){
        confirm('현재 비밀번호와 변경할 비밀번호가 동일합니다. 기존 비밀번호를 계속해서 사용하시겠습니까?')
          // 해당 창에서 확인(true)를 입력하면 새로 입력한 변경할 비번을 빈문자열로 바꿔주기
          if(confirm.value == false){
              updatePw.value= '';
              updatePwConfirm = '';
              checkObj.currentPw = false;
              updatePw.focus();
              return;
          }
            updatePw.value = '';
            updatePwConfirm.value = '';
            checkObj.currentPw = true;      
            return;       
      }
      const inputPw = updatePw.value;
      // 비동기 (변경한 비밀번호 비밀번호 변경하고 암호화하기)
      fetch("/user/changePw",{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body :  inputPw
      })
      .then(resp => resp.text())
      .then(result => {
        if(result > 0){
          alert("비밀번호가 변경되었습니다");
          console.log("비밀번호 변경 성공");
          checkObj.currentPw = true;
        }else{
          console.log(result);
          alert("비밀번호 변경에 실패했습니다");
          console.log("비밀번호 변경 실패");
          checkObj.currentPw = false;
        }
      })
    } 
    // 위 조건을 모두 충족 시킨다면 입력한 비밀번호와 현재 사용중인 비밀번호가 같은지 확인하기
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
        checkObj.currentPw=false;
        return;
      }
        console.log("비밀번호 일치");
        checkObj.currentPw=true; 
        
    })  
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
  checkObj.currentPw =true;
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




