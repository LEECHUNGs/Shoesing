//회원가입 유효성 검사

//필수 항목 유효성 검사를 체크하기 위한 객체
const checkObj = {
    "userId" : false,
    "userName" : false,
    "userNickname" : false,   
    "userPw"    : false,
    "userPwConfirm" : false,
    "userEmail" : false,
    "userTel" : false,
    "authKey" : false
};
//  Id 유효성 검사
const userId = document.querySelector("#userId");
const idMessage = document.querySelector("#idMessage");

userId.addEventListener("input", (e) => {
    if(userId.value.length === 0){
        idMessage.innerText = "아이디를 입력해주세요";
        idMessage.classList.add('error');
        idMessage.classList.remove('confirm');
        checkObj.userId=false;
        return;
    }

    const regExp= /^[a-z0-9]{4,12}$/;

    if(!regExp.test(userId.value)){
        idMessage.innerText = "유효하지 않는 아이디입니다.";
        idMessage.classList.add('error');
        idMessage.classList.remove('confirm');
        checkObj.userId = false;
        return ;
    }

    idMessage.innerText ="사용 가능한 아이디 입니다"
    idMessage.classList.add('confirm');
    idMessage.classList.remove('error');
    checkObj.userId = true;

    const inputId = e.target.value;

    fetch("/user/checkId")
    .then(resp => resp.text())
    .then(result => {
        if(result == 1){
            idMessage.innerText="이미 사용중인 아이디 입니다";
            idMessage.classList.add('error');
            idMessage.classList.remove('confirm');
            checkObj.userId = false;
            return;
        }
        idMessage.innerText ="사용 가능한 아이디 입니다"
        idMessage.classList.add('confirm');
        idMessage.classList.remove('error');
        checkObj.userId = true;
    })    
});

//  이름 유효성 검사 -- 수정이 필요함!!!!!***********************
// const userName = document.querySelector("#username");

// userName.addEventListener("input", (e) => {
//     if(userName.value.length === 0){
//         alert = "이름을 입력해주세요";
//         checkObj.userName=false;
//         return;
//     }
//     const regExp= /^[가-힣]{2,6}$/;
//     checkObj.userName = true;   
// });

//  닉네임 유효성 검사
const userNickname = document.querySelector("#userNickname");
const nicknameMessage = document.querySelector("#nicknameMessage");

userNickname.addEventListener("input", (e) => {
    if(userNickname.value.length === 0){
        nicknameMessage.innerText = "닉네임을 입력해주세요";
        nicknameMessage.classList.add('error');
        nicknameMessage.classList.remove('confirm');
        checkObj.userNickname=false;
        return;
    }

    const regExp= /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;

    if(!regExp.test(userNickname.value)){
        nicknameMessage.innerText = "유효하지 않는 닉네임입니다.";
        nicknameMessage.classList.add('error');
        nicknameMessage.classList.remove('confirm');
        checkObj.userNickname = false;
        return ;
    }

    nicknameMessage.innerText ="사용 가능한 닉네임 입니다"
    nicknameMessage.classList.add('confirm');
    nicknameMessage.classList.remove('error');
    checkObj.userNickname = true;

    const inputId = e.target.value;

    fetch("/user/checkNickname")
    .then(resp => resp.text())
    .then(result => {
        if(result == 1){
            nicknameMessage.innerText="이미 사용중인 닉네임 입니다";
            nicknameMessage.classList.add('error');
            nicknameMessage.classList.remove('confirm');
            checkObj.userNickname = false;
            return;
        }
        nicknameMessage.innerText ="사용 가능한 닉네임 입니다"
        nicknameMessage.classList.add('confirm');
        nicknameMessage.classList.remove('error');
        checkObj.userNickname = true;
    })    
});

//  비밀번호 유효성 검사
const userPw = document.querySelector("userPw");
const userPwConfirm = document.querySelector("userPwConfirm");
const pwMessage = document.querySelector("pwMessage");

const checkPw = () =>{
    if(userPw.value === userPwConfirm.value){
        pwMessage.innerText = "비밀번호가 일치합니다";
        pwMessage.classList.add("confirm");
        pwMessage.classList.remove("error");
        checkObj.userPwConfirm = true;
    }

    pwMessage.innerText ="비밀번호가 일치하지 않습니다";
    pwMessage.classList.add("error");
    pwMessage.classList.remove("confirm");
    checkObj.userPwConfirm = false;
}

userPw.addEventListener("input", (e) => {
    const inputPw = e.target.value;

    if(inputPw.trim().length === 0){
        pwMessage.innerText ="영어, 숫자, 특수문자 6~16글자 사이로 입력해주세요"
        pwMessage.classList.remove("confirm","error");
        checkObj.memberPw = false;
        memberPw.value="";
        return;
    }

    const regExp = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/

    if(!regExp.test(inputPw)){
        pwMessage.innerText ="비밀번호가 유효하지 않습니다."
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");
        checkObj.memberPw = false;
        return;
    }

    pwMessage.innerText ="유효한 비밀번호 형식입니다"
    pwMessage.classList.add("confirm");
    pwMessage.classList.remove("error");
    checkObj.memberPw =true;

    if(userPwConfirm.value.length >0){
        checkPw();
    }

});

userPwConfirm.addEventListener("input", () => {
    if(checkObj.userPw){
        checkPw();
        return;
    }
    checkObj.userPwConfirm =false
});


//--------------------------------------------------------------------[수정이 필요함]
// 이메일 유효성 검사

const userEmail = document.querySelector("#userEmail");
const emailMessage = document.querySelector("#emailMessage");

userEmail.addEventListener("input", e => {

    checkObj.authKey = false;
    document.querySelector("#authKeyMessage").innerText ="";
    const inputEmail = e.target.value;

    if(inputEmail.trim().length === 0){
        emailMessage.innerText = "메일을 받을 수 있는 이메일을 입력해주세요";
        emailMessage.classList.remove('confirm', 'error');
        checkObj.memberEmail = false;
        memberEmail.value = "";
        return;
    }

    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if( !regExp.test(inputEmail)){
        emailMessage.innerText = "알맞은 이메일 형식으로 작성해주세요";
        emailMessage.classList.add('error'); 
        emailMessage.classList.remove('confirm'); 
        checkObj.userEmail = false;
        return;
    }
});

// 인증번호 
const sendAuthKeyBtn = document.querySelector("#sendAuthKeyBtn");
const authKey = document.querySelector("#authKey");
const checkAuthKeyBtn = document.querySelector("#checkAuthKeyBtn");
const authKeyMessage = document.querySelector("#authKeyMessage");

let authTimer; 
const initMin = 3; 
const initSec = 59; 
const initTime = "04:00"; 

let min = initMin;
let sec = initSec;
 
sendAuthKeyBtn.addEventListener("click", () => {
    checkObj.authKey = false;
    authKeyMessage.innerText = "";

    if( !checkObj.memberEmail){
        alert("유효한 이메일 작성 후 클릭해 주세요");
        return;
    }

    min = initMin;
    sec = initSec;

    clearInterval(authTimer);
//*********************************************수정필요 */
    fetch("/email/signup", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : userEmail.value
    })
    .then(resp => resp.text())
    .then(result =>{
		 if(result == 1){
			console.log("인증 번호 발송 성공");
		 }else{
			console.log("인증 번호 발송 실패");
		 }
	});

    authKeyMessage.innerText = initTime;
    authKeyMessage.classList.remove("confirm","error");

    alert("인증번호가 발송되었습니다");

    authTimer = setInterval( () => {
        authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`;
        if(min == 0 && sec == 0){
            checkObj.authKey = false; 
            clearInterval(authTimer); 
            authKeyMessage.classList.add('error');
            authKeyMessage.classList.remove('confirm');
            return;
        }
        if(sec == 0 ){
            sec = 60; 
            min--;
        }
        sec--; 
    }, 1000); 
});
function addZero(number){
    if(number < 10) return "0" + number;
    else            return number;
}

checkAuthKeyBtn.addEventListener("click", () => {
    if( min === 0 && sec === 0) { 
        alert("인증번호 입력 제한시간을 초과하였습니다!");
        return;
    }
    if(authKey.value.length < 6 ) { 
        alert("인증번호를 정확히 입력해 주세요");
        return;
    }
    const obj = {
        "email" : userEmail.value,
        "authKey" : authKey.value
    };
//*******************************************수정 */
    fetch("/email/checkAuthKey",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(obj) // obj를 JSON으로 변경
    })
    .then(resp => resp.text())
    .then(result => {
        if(result ==0){
            alert("인증번호가 일치하지 않습니다!");
            checkObj.authKey = false;
            return;
        }
        clearInterval(authTimer); //타이머 멈춤
        authKeyMessage.innerText = "인증 되었습니다.";
        authKeyMessage.classList.remove("error");
        authKeyMessage.classList.add("confirm");
        checkObj.authKey = true; //인증 번호 검사여부 true
     })
});

//전화번호 유효성 검사
const userTel =document.querySelector("#userTel");
const telMessage = document.querySelector("#telMessage");

userTel.addEventListener("input", e => {
    const inputTel = e.target.value
    if(inputTel.trim().length ===0){
        telMessage.innerText = "전화번호를 입력해주세요(-제외)";
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.userTel =false;
        userTel.value ="";
        return;
    }
    const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;

    if(!regExp.test(inputTel)){
        telMessage.innerText = "유효한 전화번호 형식이 아닙니다";
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.userTel =false;
        
        return;
    }
    telMessage.innerText = "유효한 전화번호 형식입니다.";
    telMessage.classList.add("confirm");
    telMessage.classList.remove("error");
    checkObj.userTel =true;  
});

// 회원가입 버튼 클릭시 전체 유효성 검사 여부 확인
const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit",e => {
    for(let key in checkObj) {
        if(!checkObj[key]) {
            let str; 
            switch(key) {
                case "userId" : 
                str = "아이디가 유효하지 않습니다"; break;
                case "userName" : 
                    str = "이름이 유효하지 않습니다"; break;
                case "userNickname" :
                    str = "닉네임이 유효하지 않습니다"; break; 
                case "userPw" :
                    str = "비밀번호가 유효하지 않습니다"; break;   
                case "userPwConfirm" :
                        str = "비밀번호가 일치하지 않습니다"; break;              
                case "userEmail" :
                        str = "이메일이 유효하지 않습니다"; break;      
                case "authKey" :
                    str = "이메일이 인증되지 않았습니다"; break;                         
                case "memberTel" :
                        str = "전화번호가 유효하지 않습니다"; break;      
            }
            alert(str);
            document.getElementById(key).focus();//초점이동
            e.preventDefault(); // form 태그 기본 이벤트(제출) 막기
            return;
        }
    }
});