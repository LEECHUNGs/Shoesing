$.noConflict();
// JQuery 기본 설정

// 상품 리스트 불러오기
let searchItemList = [];

const callItemList = () => {
  searchItemList;
  fetch('/item/itemListNo') // GET 방식 요청
    .then((resp) => resp.json())
    .then((itemList) => {
      itemList.forEach((item) => {
        searchItemList.push(item);
      });
    });
};

callItemList();

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
  $('#searchbarInput').autocomplete({
    // autocomplete 구현 시작부
    source: function (request, response) {
      response(
        $.map(searchItemList, function (obj, key) {
          var itemName = obj.itemName.toUpperCase();

          if (itemName.indexOf(request.term.toUpperCase()) != -1) {
            return {
              label: obj.itemName, // Label for Display
              value: obj.itemNo, // Value
            };
          } else {
            return null;
          }
        })
      );
    }, //source 는 자동완성의 대상
    select: function (event, ui) {
      // item 선택 시 이벤트
      if (ui.item.value != '') {
        window.location.href = '/item/detail?itemNo=' + ui.item.value;
      } else {
        event.preventDefault();
      }
    },
    response: function (event, ui) {
      if (!ui.content.length) {
        var noResult = { value: '', label: '검색 결과가 없습니다' };
        ui.content.push(noResult);
      }
    },
    focus: function (event, ui) {
      // 포커스 시 이벤트
      return false;
    },
    minLength: 2, // 최소 글자 수
    autoFocus: true, // true로 설정 시 메뉴가 표시 될 때, 첫 번째 항목에 자동으로 초점이 맞춰짐
    classes: {
      // 위젯 요소에 추가 할 클래스를 지정
      'ui-autocomplete': 'ui-autocomplete-highlight',
    },
    delay: 500, // 입력창에 글자가 써지고 나서 autocomplete 이벤트 발생될 떄 까지 지연 시간(ms)
    disable: false, // 해당 값 true 시, 자동완성 기능 꺼짐
    position: { my: 'right top', at: 'right bottom' }, // 제안 메뉴의 위치를 식별
    close: function (event) {
      // 자동완성 창 닫아질 때의 이벤트
      console.log(event);
    },
  });

  // 돋보기
  var Magnify = function (element, options) {
    this.init('magnify', element, options);
  };
  Magnify.prototype = {
    constructor: Magnify,

    init: function (type, element, options) {
      var event = 'mousemove',
        eventOut = 'mouseleave';

      this.type = type;
      this.$element = $(element);
      this.options = this.getOptions(options);
      this.nativeWidth = 0;
      this.nativeHeight = 0;

      this.$element.wrap('<div class="magnify" >');
      this.$element.parent('.magnify').append('<div class="magnify-large" >');
      this.$element
        .siblings('.magnify-large')
        .css(
          'background',
          "url('" + this.$element.attr('src') + "') no-repeat"
        );

      this.$element
        .parent('.magnify')
        .on(event + '.' + this.type, $.proxy(this.check, this));
      this.$element
        .parent('.magnify')
        .on(eventOut + '.' + this.type, $.proxy(this.check, this));
    },
    getOptions: function (options) {
      options = $.extend(
        {},
        $.fn[this.type].defaults,
        options,
        this.$element.data()
      );

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay,
          hide: options.delay,
        };
      }

      return options;
    },
    check: function (e) {
      var container = $(e.currentTarget);
      var self = container.children('img');
      var mag = container.children('.magnify-large');

      // Get the native dimensions of the image
      if (!this.nativeWidth && !this.nativeHeight) {
        var image = new Image();
        image.src = self.attr('src');

        this.nativeWidth = image.width;
        this.nativeHeight = image.height;
      } else {
        var magnifyOffset = container.offset();
        var mx = e.pageX - magnifyOffset.left;
        var my = e.pageY - magnifyOffset.top;

        if (
          mx < container.width() &&
          my < container.height() &&
          mx > 0 &&
          my > 0
        ) {
          mag.fadeIn(100);
        } else {
          mag.fadeOut(100);
        }

        if (mag.is(':visible')) {
          var rx =
            Math.round(
              (mx / container.width()) * this.nativeWidth - mag.width() / 2
            ) * -1;
          var ry =
            Math.round(
              (my / container.height()) * this.nativeHeight - mag.height() / 2
            ) * -1;
          var bgp = rx + 'px ' + ry + 'px';

          var px = mx - mag.width() / 2;
          var py = my - mag.height() / 2;

          mag.css({ left: px, top: py, backgroundPosition: bgp });
        }
      }
    },
  };
  /* MAGNIFY PLUGIN DEFINITION
   * ========================= */
  $.fn.magnify = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('magnify'),
        options = typeof option == 'object' && option;
      if (!data) $this.data('tooltip', (data = new Magnify(this, options)));
      if (typeof option == 'string') data[option]();
    });
  };
  $.fn.magnify.Constructor = Magnify;

  $.fn.magnify.defaults = {
    delay: 0,
  };
  /* MAGNIFY DATA-API
   * ================ */
  $(window).on('load', function () {
    $('[data-toggle="magnify"]').each(function () {
      var $mag = $(this);
      $mag.magnify();
    });
  });
});
