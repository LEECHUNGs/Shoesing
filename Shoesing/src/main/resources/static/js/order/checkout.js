let submitFnc;
// 비회원 주문 시 유효성 검사
if(loginUser == null) {

    //필수 항목 유효성 검사를 체크하기 위한 객체
    const checkObj = {
        userPw: false,
        userPwConfirm: false,
        emailVal: false,
        authKey: false,
    };


    // 이름 유효성 검사
    const userName = document.querySelector('#userName');
    const nameMessage = document.querySelector('#nameMessage');

    userName.addEventListener('input', (e) => {
        const inputName = e.target.value;
        if (inputName.trim().length === 0) {
            nameMessage.innerText = '';
            inputName.value = null;
            return;
        }
        const regExp = /^[가-힣]{2,6}$/;
        if (!regExp.test(inputName)) {
            nameMessage.innerText = '유효한 이름 형식이 아닙니다';
            inputName.value = null;
            return;
        }

        nameMessage.innerText='유효한 이름형식입니다';

        return inputName.value;
    });


    // 이메일 유효성 검사
    const userEmail = document.querySelector('#userEmail');
    const inputDomain = document.querySelector('#inputDomain');
    const emailMessage = document.querySelector('#emailMessage');
    const domainList = document.querySelector('#domainList');

    // 이메일 입력
    userEmail.addEventListener('input', (e) => {

        if (
            e.target.value.trim().length == 0 ||
            inputDomain.value.trim().length == 0
        ) {
            emailMessage.innerText = '이메일을 입력해주세요';
            return;
        }

        checkObj.emailVal= true;

        emailMessage.innerText = '이메일을 입력 성공';
    });

    // 이메일 도메인 입력
        inputDomain.addEventListener('input', (e) => {

        if (e.target.value.trim().length == 0 || userEmail.value.trim().length == 0) {
            emailMessage.innerText = '이메일을 입력해주세요';
            return;
        }
        checkObj.emailVal = true;

        emailMessage.innerText = '이메일을 입력 성공';
    });

    // 도메인 리스트
    domainList.addEventListener('change', (e) => {

        const optionsValue = e.target.options[e.target.selectedIndex].value;
        inputDomain.value = optionsValue;

        if (!optionsValue == '') {
            inputDomain.readOnly = true;
        } else {
            inputDomain.readOnly = false;
        }

        if (e.target.value.trim().length == 0 || userEmail.value.trim().length == 0) {

            emailMessage.innerText = '이메일을 입력해주세요';
            return;
        }


        checkObj.emailVal = true;

        emailMessage.innerText = '이메일 입력 성공';
        const emailVal = userEmail.value + '@' + inputDomain.value;
        console.log(emailVal);
    });

    // 이메일 인증번호
    const sendAuthKeyBtn = document.querySelector('#sendAuthKeyBtn');
    const authKey = document.querySelector('#authKey');
    const checkAuthKeyBtn = document.querySelector('#checkAuthKeyBtn');
    const authKeyMessage = document.querySelector('#authKeyMessage');
    const emailVal= userEmail.value + '@' + inputDomain.value;
    let authTimer;
    const initMin = 4;
    const initSec = 59;
    const initTime = '05:00';

    let min = initMin;
    let sec = initSec;


    sendAuthKeyBtn.addEventListener('click', () => {
        checkObj.authKey = false;


        authKeyMessage.innerText = '';
        const emailVal = userEmail.value + '@' + inputDomain.value;

        if (!checkObj.emailVal) {


            alert('유효한 이메일 작성 후 클릭해 주세요');
            return;
            
        }

        min = initMin;
        sec = initSec;

        clearInterval(authTimer);


        console.log(emailVal);

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

            email: userEmail.value + '@' + inputDomain.value,
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
            alert('인증이 완료되었습니다') // 5.8 자습때 이 내용 추가했음!
            authKeyMessage.classList.remove('error');
            authKeyMessage.classList.add('confirm');
            inputEmail.value = userEmail.value + '@' + inputDomain.value;
            checkObj.authKey = true;
        });
    });


    //전화번호 유효성 검사
    const userTel = document.querySelector('#userTel');
    const telMessage = document.querySelector('#telMessage');

    userTel.addEventListener('input', (e) => {

        const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
        const inputTel = e.target.value;

        if (!regExp.test(inputTel)) {
            telMessage.innerText = '유효한 전화번호 형식으로 수정해주세요';
            telMessage.classList.add('error');
            telMessage.classList.remove('confirm');
            //e.preventDefault();
            return;
        }


        if (inputTel.trim().length < 9) {

            telMessage.innerText = '유효한 전화번호 형식이 아닙니다';
            telMessage.classList.add('error');
            telMessage.classList.remove('confirm');
            inputTel.value = null; //e.preventDefault();
            return;
        }


        telMessage.innerText = '유효한 전화번호 형식입니다.';
        telMessage.classList.add('confirm');
        telMessage.classList.remove('error');

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
            pwMessage.innerText =
            '비밀번호는 최소 6자에서 16자까지, 영문자,숫자,특수문자를 포함해야합니다.';

            pwMessage.classList.remove('confirm', 'error');
            checkObj.userPw = false;
            userPw.value = '';
            return;
        }

        const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;

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

    // 주문 버튼 클릭 시 전체 유효성 검사
    submitFnc = () => {

        for (let key in checkObj) {
            if (!checkObj[key]) {
              let str;
              switch (key) {
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
              return -1;
            }
        }

        return 1;
    }
}

// 버튼 클릭 시 주문 데이터를 서버에 전송
document.getElementById("orderBtn").addEventListener("click", e => {

    const userAddress = document.getElementById("userAddress");

    // 주문 정보에 주소 설정
    order.orderAddress = userAddress.value;

    // 비회원일 경우 입력받은 비회원용 정보 입력
    if(loginUser == null) {

        if(submitFnc() < 0) {
            return;
        }

        const userAddress = document.getElementById("userAddress");
        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("userEmail");
        const userTel = document.getElementById("userTel");
        const userPw = document.getElementById("userPw");

        const user = {
            "userName" : "이충섭",
            "userEmail" : "khnet@naver.com",
            "userTel" : "01012341234",
            "userAddress" : "서울 서대문",
            "userPw" : "asdf1234!"

        };

        order.orderUser = user;
    } 

    // 주문 요청
    fetch("/order/manage", {
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(order)
    })
    .then(resp => resp.json())
    .then(obj => {

        if(obj.result > 0) {
            // 주문이 성공하면 주문 성공창을 띄움
            const orderSubmit = document.getElementById("orderSubmit");
            const input = orderSubmit.querySelector("input");

            console.log(orderSubmit);
            
            input.value = obj.orderNo;

            
            
            orderSubmit.submit();
            
        } else {
            alert("주문 실패!");
        }
    });
});
