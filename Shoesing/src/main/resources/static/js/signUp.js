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

userId.addEventListener("keyup", e => {
    const inputId = e.target.value;
    if(inputId.trim().length === 0){
        idMessage.innerText = "Id를 입력해주세요";
        idMessage.classList.remove('confirm','error');
         checkObj.userId=false;
         userId.value ="";
         return;
    }
    const regExp= /^[a-zA-Z0-9_]$/;
    if(!regExp.test(inputId)){
        idMessage.innerText = "알맞은 아이디 형식으로 작성해주세요";
        idMessage.classList.add('error');
        idMessage.classList.remove('confirm');
        checkObj.userId = false;
        return;
    }
    fetch("user/checkId?userId" + inputId)
    .then(resp => resp.text())
    .then(count => {
        if(count ==1){
            idMessage.innerText="이미 사용중인 아이디 입니다";
            idMessage.classList.add('error');
            idMessage.classList.remove('confirm');
            checkObj.userId = false;
            return;
        }
        idMessage.innerText ="사용 가능한 Id입니다"
        idMessage.classList.add('confirm');
        idMessage.classList.remove('error');
        checkObj.userId = true;
    })
    .catch(error =>{
        console.log(error);
    });
});

// 2)  닉네임 유효성 검사
const userNickname = document.querySelector("#userId");
const NicknameMessage = document.querySelector("#idMessage");

userId.addEventListener("keyup", e => {
    const inputId = e.target.value;
    if(inputId.trim().length === 0){
        idMessage.innerText = "Id를 입력해주세요";
        idMessage.classList.remove('confirm','error');
         checkObj.userId=false;
         userId.value ="";
         return;
    }
    const regExp= /^[a-zA-Z0-9_]$/;
    if(!regExp.test(inputId)){
        idMessage.innerText = "알맞은 아이디 형식으로 작성해주세요";
        idMessage.classList.add('error');
        idMessage.classList.remove('confirm');
        checkObj.userId = false;
        return;
    }
    fetch("user/checkId?userId" + inputId)
    .then(resp => resp.text())
    .then(count => {
        if(count ==1){
            idMessage.innerText="이미 사용중인 아이디 입니다";
            idMessage.classList.add('error');
            idMessage.classList.remove('confirm');
            checkObj.userId = false;
            return;
        }
        idMessage.innerText ="사용 가능한 Id입니다"
        idMessage.classList.add('confirm');
        idMessage.classList.remove('error');
        checkObj.userId = true;
    })
    .catch(error =>{
        console.log(error);
    });
});

