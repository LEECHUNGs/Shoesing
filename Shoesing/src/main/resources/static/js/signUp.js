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
// 1) Id 유효성 검사
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

    const regExp= /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/;

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

// 2) 닉네임 유효성 검사
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

// 3) 비밀번호 유효성 검사
const userPw = document.querySelector("userPw");
const userPwconfirm = document.querySelector("userPwconfirm");
const pwMessage = document.querySelector("pwMessage");

const checkPw = () =>{
    if(userPw.value === userPwconfirm.value){
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

userPw.addEventListener("input", e => {
    const inputPw = e.target.value;

    if(inputPw.trim().length === 0){
        pwMessage.innerText ="비밀번호가 유효하지 않습니다."
        checkObj.memberPw = false;
        memberPw.value="";
        return;
    }
})


