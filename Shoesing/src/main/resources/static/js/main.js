document.documentElement.style.setProperty(
  '--scrollbar-width',
  window.innerWidth - document.documentElement.clientWidth + 'px'
);

// 스크롤 시 헤더 숨김
document.addEventListener('DOMContentLoaded', () => {
  el_autohide = document.querySelector('.header-main');

  if (el_autohide) {
    var last_scroll_top = 0;
    window.addEventListener('scroll', function () {
      let scroll_top = window.scrollY;
      if (scroll_top < last_scroll_top) {
        el_autohide.classList.remove('scrolled-down');
        el_autohide.classList.add('scrolled-up');
      } else {
        el_autohide.classList.remove('scrolled-up');
        el_autohide.classList.add('scrolled-down');
      }
      last_scroll_top = scroll_top;
    });
  }
});


// 로그인폼, 로그인 id, 로그인 pw  얻어오기
const loginForm = document.querySelector("#loginForm");

const loginId= document.querySelector("#loginForm input[name='userId']");
const loginPw = document.querySelector("#loginForm input[name='userPw']");


// 쿠키

//Id 저장
if(loginId != null){
  const saveId = getCookie("saveId");

  if(saveId != undefined){
    loginId.value =saveId;
    document.querySelector("input[name='saveId']").checked =true;
  }
};

//자동 로그인
if(loginId != null && loginPw !=null){
  const saveId = getCookie("saveId");
  const autoLogin = getCookie("autoLogin") 

  if(saveId != undefined &&  ){
    loginId.value =saveId;
    document.querySelector("input[name='saveId']").checked =true;
  }
};



// 로그인 유효성 검사

// 로그인이 되어 있지 않을 때
if(loginForm != null){
  loginForm.addEventListener("submit", e =>{

    if(loginId.value.trim().length ===  0){
        alert("아이디를 입력해주세요");
        e.preventDefault();
        loginId.focus();
        return;
    }

    if(loginPw.value.trim().length ===  0){
      alert("비밀번호를 입력해주세요");
      e.preventDefault();
      loginPw.focus();
      return;
    }
  });

}




