// 내 정보 수정 form 제출시 나타날 이벤트
const updateInfo= document.querySelector("#updateInfo");
updateInfo.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e){
    e.preventDefault();

        const data = new data(e.target);
        const values = Object.entries(data);
      
        // 필수 입력 항목 확인
        const requiredFields = ['updateNickname', 'updateEmail', 'currentPw'];
        const emptyFields = Fields.some(field => values[field] === '');
      
        if (emptyFields) {
          // 필수 입력 항목이 비어 있는 경우 에러 처리
          alert('필수 입력 항목을 모두 입력해주세요.');
          return;
        }
      
        // 선택 입력 항목의 null 값 처리
        const optionalFields = ['updateName', 'updateTel', 'updateAddress', 'updatePw', 'updatePwConfirm'];
        const updatedValues = { ...values };
        optionalFields.forEach(field => {
          if (updatedValues[field] === '') {
            updatedValues[field] = null;
          }
        });
      
        // 수정된 회원 정보 서버로 전송
        sendUpdateRequest(updatedValues);          
}

function sendUpdateRequest(values) {
    // 서버로 AJAX 요청 보내기
    // (예: fetch, axios 등을 사용하여 서버 API 호출)
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(resp => {
      if (resp.ok) {
        // 회원 정보 수정 성공 처리
        alert('회원 정보가 수정되었습니다.');
      } else {
        // 회원 정보 수정 실패 처리
        alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
    })
    .catch(error => {
      // 네트워크 오류 등 예외 처리
      console.error('회원 정보 수정 요청 중 오류 발생:', error);
      alert('회원 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
  }
  
//===========================================================================

//프로필 사진 button에 누르는 값으로 변경될 수 있게 하기
const profileImg = document.querySelector("#profileImg");

  document.getElementById('userIcon1').addEventListener('click', () => {
    profileImg.src = '/img/userIcon/userIcon1.jpg';
    
  });

  document.getElementById('userIcon2').addEventListener('click', () => {
    profileImg.src = "/img/userIcon/userIcon2.jpg";
  });

  document.getElementById('userIcon3').addEventListener('click', () => {
    profileImg.src = '/img/userIcon/userIcon3.jpg';
  });


// 이름 수정
const updateName = document.querySelector("#updateName");
const updateNameMessage = document.querySelector("#updateNameMessage");

const regExp = /^[가-힣]{2,6}$/;
updateName.addEventListener("input",(e)=>{
    if(!regExp.test(updateName.value)){
        updateNameMessage.innerText="유효하지 않는 이름 입니다."
        return;
    } else{
        updateNameMessage.innerText="";
    }
})

// 닉네임 수정 (+중복확인)
const updateNickname = document.querySelector("#updateNickname");
const updateNicknameMessage = document.querySelector("#updateNicknameMessage");


updateNickname.addEventListener("input",(e)=>{
const regExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;
    if(!regExp.test(updateNickname.value)){
        updateNicknameMessage.innerText="유효하지 않는 닉네임 입니다."
        updateCheckObj.updateNickname = false;
        return;
    }
    updateNicknameMessage.innerText=""
    updateCheckObj.updateNickname = true;
    const inputNickname = e.target.value;
    console.log(inputNickname);

    fetch("/user/checkNickname?userNickname="+inputNickname) 
    .then(resp => resp.text())
    .then(result => {
        if (result == 1) {
            if(checkObj.updateNickname.value == "${session.loginUser.userNickname}"){
                updateNicknameMessage.innerText="현재 사용중인 닉네임명과 동일합니다"                  
                updateCheckObj.updateNickname = false;
                return;
            }
            updateNicknameMessage.innerText="이미 사용중인 닉네임 입니다";
            updateCheckObj.updateNickname=false;
            return;       
        }
        updateNicknameMessage.innerText= "사용가능한 닉네임 입니다"
        updateCheckObj.updateNickname = true;           
    });
});
//------------------------------------------------------------------수정전

// 현재 비밀번호 (같은 경우/ 다른경우), 정규식검사
const currentPw = document.querySelector("#currentPw");
const PwMessage = document.querySelector("#PwMessage");

// 변경할 비밀번호와 변경할 비밀번호 확인 (같은경우/ 다른 경우), 정규식검사,  null인경우
const updatePw = document.querySelector("#updatePw");
const updatePwConfirm = document.querySelector("#updatePwConfirm");
const updatePwMessage = document.querySelector("#updatePwMessage");

//-------------------------------------------------------------------

// 전화번호 수정(정규식검사)
const updateTel = document.querySelector("#updateTel");
const updateTelMessage = document.querySelector("#updateTelMessage");

updateTel.addEventListener("input",(e)=>{
    const regExp=/^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
    if(!regExp.test(updateTel.value)){
        updateTelMessage.innerText="유효하지 않는 전화번호 입니다.";
        return;
    }else{
        updateTelMessage.innerText="";}
    
});

// updateTel.addEventListener("input",(e))
// 주소 
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
        const agreeSignout = document.querySelector("#agreeSignout")
        if(currentPw.value.trim().length ==0){
            alert=("현재 비밀번호를 입력해주세요");
            e.preventDefault();
            return;
        }
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