window.GicoScript = (() => {
  const utils = {
    isMobile: agent => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent || window.navigator.userAgent),
    fixIE: () => {
      if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        const msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
        document.querySelector('head').appendChild(msViewportStyle);
      }
    }
  };

  const initLazy = () => {
    $('.js-lazy').Lazy({
      effect: 'fadeIn',
      effectTime: 200,
      afterLoad: (element) => {
        $(element).parents('.thumb').addClass('loaded');
      }
    });
  };

  const initCarousel = () =>{

    if($('.js-carousel .product-item').length > 5){
      $('.js-carousel').owlCarousel({
        loop:true,
        margin:16,
        nav:true,
        dots:false,
        navText:['<i class="gico-icon icon-prev"></i>','<i class="gico-icon icon-next"></i>'],
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:4
            },
            1200:{
                items:5
            }
        }
      });
    }

     $('.js-banner-slider').owlCarousel({
      loop:true,
      nav:false,
      dots:false,
      autoplay: true,
      autoplaySpeed: 800,
      autoplayHoverPause: true,
      items: 1
    });

    $('.js-thumb-slider').owlCarousel({
      loop:false,
      nav:true,
      dots:false,
      autoplay: false,
      animateOut: 'slideOutUp',
      animateIn: 'slideInUp',
      items: 1,
      navText:['<i class="gico-icon icon-up"></i>','<i class="gico-icon icon-down"></i>']
    });
  }

  const initCounter = () => {
    $('.js-counter .btn-incre').on('click',function(){
      var textVal = parseInt($(this).parent().next().val());
      $(this).parent().next().val(++textVal);
    });
    $('.js-counter .btn-decre').on('click',function(){
      var textVal = parseInt($(this).parent().prev().val());
      if(textVal > 1){
        $(this).parent().prev().val(--textVal);
      }
    });
  }

  const initEventListeners = () => {
    $(document).on('click', '.js-close-filter', () => {
      $('body').removeClass('open-filter');
    });

    $(document).on('click', '.js-open-filter', () => {
      $('body').addClass('open-filter');
    });
  };

  const initFilter = () => {
    if (utils.isMobile()) {
      $('.filter-body').collapse('hide');

      $('#js-gico-pdp-sorter').parent().on('shown.bs.dropdown', () => {
        $('body').addClass('open-sorter');
      }).on('hidden.bs.dropdown', () => {
        $('body').removeClass('open-sorter');
      });
    }
  };

  const initCategoryList = () => {
    const $container = $('#js-category-list');

    if ($container.length) {
      const swiper = new Swiper($container.find('.swiper-container'), {
        slidesPerView: 'auto',
        navigation: {
          nextEl: $container.find('.swiper-button-next'),
          prevEl: $container.find('.swiper-button-prev'),
        }
      });
    }
  };

  const initXZoom = () => {
    $(".xzoom, .xzoom-gallery").xzoom({Xoffset: 15, scroll: false});
    //Integration with hammer.js
    var isTouchSupported = 'ontouchstart' in window;
    if (isTouchSupported) {
      //If touch device
      $('.xzoom').each(function(){
          var xzoom = $(this).data('xzoom');
          xzoom.eventunbind();
      });
        
      $('.xzoom').each(function() {
        var xzoom = $(this).data('xzoom');
        $(this).hammer().on("tap", function(event) {
            event.pageX = event.gesture.center.pageX;
            event.pageY = event.gesture.center.pageY;
            var s = 1, ls;

            xzoom.eventmove = function(element) {
                element.hammer().on('drag', function(event) {
                    event.pageX = event.gesture.center.pageX;
                    event.pageY = event.gesture.center.pageY;
                    xzoom.movezoom(event);
                    event.gesture.preventDefault();
                });
            }

            var counter = 0;
            xzoom.eventclick = function(element) {
                element.hammer().on('tap', function() {
                    counter++;
                    if (counter == 1) setTimeout(openfancy,300);
                    event.gesture.preventDefault();
                });
            }

            function openfancy() {
                if (counter == 2) {
                    xzoom.closezoom();
                    $.fancybox.open(xzoom.gallery().cgallery);
                } else {
                    xzoom.closezoom();
                }
                counter = 0;
            }
        xzoom.openzoom(event);
        });
      });
    } else {
      $('#xzoom-fancy').bind('click', function(event) {
          var xzoom = $(this).data('xzoom');
          xzoom.closezoom();
          $.fancybox.open(xzoom.gallery().cgallery, {padding: 0, helpers: {overlay: {locked: false}}});
          event.preventDefault();
      });
        
    }
  }

  const initMoreContent = () => {
    if($('.pd-info .desc').outerHeight() > 500){
      $('.pd-info .desc').addClass('in');
      $('.pd-info .more-btn').show();

      $('.pd-info .more-btn').on('click', function(e) {
        e.preventDefault();
        if($('.pd-info .desc').hasClass('in')){
          $('.pd-info .desc').removeClass('in');
          $('.pd-info .desc').addClass('out');
          $('.pd-info .more-btn').hide();
        }
      });

    }else{
      $('.pd-info .more-btn').hide();
    }
  }


  const init = () => {
    /* Fix IE */
    utils.fixIE();
    initLazy();
    initEventListeners();
    initFilter();
    initCategoryList();
    initCounter();
    initCarousel();
    initXZoom();
    initMoreContent();
  };

  return {init};
})();

$('document').ready(() => {
  window.GicoScript.init();
});
