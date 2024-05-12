$.noConflict();
// JQuery 기본 설정

fetch('itemList?sortNo=0&cp=0') // GET 방식 요청
  .then((resp) => resp.json())
  .then((obj) => {
    const itemList = obj.itemList;
    const pagination = obj.pagination;
  });

jQuery(document).ready(function ($) {
  // onClick Exculde Popover
  $(document).on('shown.bs.popover', '[data-toggle="popover"]', function () {
    $(this).attr('someattr', '1');
  });

  $(document).on('hidden.bs.popover', '[data-toggle="popover"]', function () {
    $(this).attr('someattr', '0');
  });

  $(document).on('click', function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
      if (
        !$(this).is(e.target) &&
        $(this).has(e.target).length === 0 &&
        $('.popover').has(e.target).length === 0
      ) {
        if ($(this).attr('someattr') == '1') {
          $(this).popover('toggle');
        }
      }
    });
  });

  $(document).on('scroll', function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
      if ($(this).attr('someattr') == '1') {
        $(this).popover('toggle');
      }
    });
  });

  // 유저 프로필 팝업
  $('#userProfile').popover({
    html: true,
    sanitize: false,
    content: function () {
      return $('#userProfileContent').html();
    },
  });

  // 카로우셀
  $('.carousel').carousel({
    interval: 8000,
  });

  // 검색창 자동 포커스
  $('#searchbar').on('shown.bs.modal', function () {
    $(this).find('[autofocus]').focus();
  });

  // 검색 자동완성
  var searchSource = ['엽기떡볶이', '신전떡볶이', '걸작떡볶이', '신당동떡볶이']; // 배열 생성

  $('#searchbarInput').autocomplete({
    // autocomplete 구현 시작부
    source: searchSource, //source 는 자동완성의 대상
    select: function (event, ui) {
      // item 선택 시 이벤트
      console.log(ui.item);
    },
    focus: function (event, ui) {
      // 포커스 시 이벤트
      return false;
    },
    minLength: 1, // 최소 글자 수
    autoFocus: true, // true로 설정 시 메뉴가 표시 될 때, 첫 번째 항목에 자동으로 초점이 맞춰짐
    classes: {
      // 위젯 요소에 추가 할 클래스를 지정
      'ui-autocomplete': 'highlight',
    },
    delay: 500, // 입력창에 글자가 써지고 나서 autocomplete 이벤트 발생될 떄 까지 지연 시간(ms)
    disable: false, // 해당 값 true 시, 자동완성 기능 꺼짐
    position: { my: 'right top', at: 'right bottom' }, // 제안 메뉴의 위치를 식별
    close: function (event) {
      // 자동완성 창 닫아질 때의 이벤트
      console.log(event);
    },
  });
});
