$(function () {
  ////
  function headerHeight() {
    $('.header-center').css({
      'position': 'absolute',
      'left': '50%',
      'top': '40%',
      'margin-left': -$('.header-center').outerWidth() / 2,
      'margin-top': -$('.header-center').outerHeight() / 2
    });
  };
  ////
  $(window).on('load', headerHeight);
  $(window).on('resize', function () {
    clearTimeout(window.resizedFinished);
    headerHeight();
    window.resizedFinished = setTimeout(function () {
      console.log('Resized finished.');
      headerHeight();
    }, 500);
  });
  ////
  function setHeiHeight() {
    $('.main').css({
      height: $(window).height() + 'px',
    });
  };

  setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
  $(window).resize(setHeiHeight);
  ////
  // $("#phone").mask("+7 999 999 99 99");
  ////
  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  ////
  $('#callback').validate({
    errorClass: 'error help-inline',
    validClass: 'success',
    errorElement: 'em',
    highlight: function (element, errorClass, validClass) {
      $(element).parents('div.span').addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents('.error').removeClass(errorClass).addClass(validClass);
    },
    groups: {
      form: 'Телефон',
      form: 'Email'
    },
    errorPlacement: function (error, element) {

      if (element.attr('name') == 'Телефон') {
        error.appendTo('#phone-header');
      } else if (element.attr('name') == 'Email') {
        error.appendTo('#email-header');
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      Телефон: {
        required: true,
        digits: true,
      },
      Email: {
        required: true,
        email: true
      },
    },
    messages: {
      Телефон: {
        required: 'Введите ваш телефон',
        digits: 'Телефон должен состоять из цифр',
      },
      Email: {
        required: '(поле не заполнено)',
        email: 'Формат e-mail должен быть name@mail.ru',
      },
    },
    submitHandler: function (form) {

      var th = $('.callback');
      $.ajax({
        type: 'POST',
        url: 'mail.php', //Change
        data: th.serialize()
      }).done(function () {
        // alert("Thank you!");
        $('.success').addClass('visible');

        setTimeout(function () {
          // Done Functions
          th.trigger('reset');
          $.magnificPopup.close();
          $('.success').removeClass('visible');
        }, 3000);
      });
      return false;

    }
  });

  ////

  // Слайдер
  /* $('.slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  }); */

  $('.js-city-phone').each(function () {
    var $block = $(this);
    var $jsCity = $block.find('.js-city');
    var $jsCitySelection = $block.find('.js-city-selection');

    $jsCity.on('click', function (e) {
      e.preventDefault();
      $jsCity.toggleClass('active');
      $jsCitySelection.toggleClass('active-selection');
    });
    $block.find('[data-phone]').on('click', function (e) {
      e.preventDefault();
      var $link = $(this);
      var city = $link.text();

      $jsCity.toggleClass('active');
      $jsCitySelection.removeClass('active-selection');
      $jsCity.text(city);
      $block.find('.js-phone-number').text($link.data('phone'));
      $link.addClass('active-city').siblings('.active-city').removeClass('active-city');
    })
  });
  $('#hamburger_id').click(function () {
    $(this).toggleClass('is-active');
    $('.mobile-menu').toggleClass('active')
    $('.desc-menu').toggleClass('logo-none-bg')
  })
});
