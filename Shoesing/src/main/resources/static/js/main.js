// 화면의 넓이 계산
// document.documentElement.style.setProperty(
//   '--scrollbar-width',
//   window.innerWidth - document.documentElement.clientWidth + 'px'
// );

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
