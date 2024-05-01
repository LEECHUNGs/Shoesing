const inputId = document.querySelector('#inputId');
const checkBtn = document.querySelector('#checkBtn');

// 아이디
checkBtn.addEventListener('click', () => {
  fetch('/user/checkId', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: inputId.value,
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log('성공');
      } else {
        console.log('실패');
      }
    });
});
