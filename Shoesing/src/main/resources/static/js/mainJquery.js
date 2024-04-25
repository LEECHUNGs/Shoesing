$.noConflict();
// JQuery Implementation
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

  // User Profile
  $('#userProfile').popover({
    html: true,
    sanitize: false,
    content: function () {
      return $('#userProfileContent').html();
    },
  });

  // Carousel
  $('.carousel').carousel({
    interval: 8000,
  });
});
