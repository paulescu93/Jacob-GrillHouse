// function myFunction() {
//     var w = window.outerWidth;
//     var h = window.outerHeight;
//     var txt = "Window size: width=" + w + ", height=" + h;
//     console.log(txt);
//     $('.header-parallax').css("height", h);
//     $('.row-gree.points').css("min-height", h);
//     $('.row-gree.points .overlay').css("min-height", h);
//     $('.row-gree.gallery').css("height", h);
//     $('#loader').css("height", h);
// }


function myFunction() {
    var w = window.outerWidth;
    var h = window.outerHeight;
    var txt = "Window size: width=" + w + ", height=" + h;
    // console.log(txt);
    if(w < 768){
        // $('.header-parallax').css("min-height", h);
        // $('.row-gree.gallery').css("min-height", h);
    }else{
        $('.header-parallax').css("height", h);
        $('.row-gree.gallery').css("height", h);
    }
    // $('.row-gree.points').css("min-height", h);
    $('#loader').css("height", h);

}






var window_height = $(window).height();
var window_width = $(window).width();
// if (window_width > 320 && window_width < 768 ){
//     $('.only_mobile').css('display','none');
// }
if (window_height < 320) {
    $('.row-gree.points').css("height", 1050);
}
var contact_height = $('#contact').css("height");
if(window_width > 767){
$('.header-parallax').css("height", window_height);
}
// if (window_height > 900 && window_width > 800) {
//     $('.row-gree.points').css("min-height", window_height);
// }

if (window_height < 1080) {
    // $('.row-gree.gallery').css("height", window_height);
};
$('#loader').css("height", window_height);
if (window_width > 1024) {
    $('#contact_area').css("height", contact_height);
}
if (window_width < 1024) {
    $('header').addClass('mobile');
    $(".contact-wrapper").addClass("mobile_");
}
$(window).load(function() {
    "use strict";
    $('#loader').fadeOut();
});
$(".cross").hide();
$(".menu").hide();
$(".hamburger").click(function() {
    // console.log('test');
    $(".w-col-3.logo").show();
    $(".menu").slideToggle("slow", function() {
        // $(".menu .social").show();
        $(".hamburger").hide();
        $(".cross").show();
    });
});
$(".cross").click(function() {
    $(".menu").slideToggle("slow", function() {
        $(".cross").hide();
        $(".hamburger").show();
        // $(".menu .social").hide();
        // $(".w-col-3.logo").show();
    });
});
$("a#mobile_link").click(function() {
    $(".menu").slideToggle("slow", function() {
        $(".cross").hide();
        $(".hamburger").show();
        // $(".w-col-3.logo").show();
    });
});
$("span.mobile_read").click(function() {
    $("span.none").slideToggle("slow", function() {
        $("span.mobile_read").hide();
        $("span.none").show();
        $("div.none").show();
    });
});

// $(document).ready(function() {


//     var element_array = ["#galerie", ".pct_tari", "#contact_area", "#desprenoi", "#meniu", "#rezervari" ];
//     var scroll_min = 20;

//     if($(document).width() > 768){
//       $(document).scroll(function(){
//         $.each(element_array, function(key, value){
//           var scrop_arr = $(value).position().top;
//             // console.log(scrop_arr);
//             // get scroll
//             var scroll_pos = $(document).scrollTop();

//             if(scroll_pos < (scrop_arr + scroll_min) && scroll_pos > (scrop_arr - scroll_min)){
//               $(document).scrollTop(scrop_arr);
//               $('.header-bar').css('background-color', 'transparent');

//                // console.log(value);
//               return false;
//             }else{
//               $('.header-bar').css('background-color', 'rgba(0, 0, 0, 0.6)');
//             }
//         });
//     });
// }

// });

    // if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
    //     window.onmousewheel = document.onmousewheel = wheel;

    //     function wheel(event) {
    //         var delta = 0;
    //         if (event.wheelDelta) delta = event.wheelDelta / 120;
    //         else if (event.detail) delta = -event.detail / 3;

    //         handle(delta);
    //         if (event.preventDefault) event.preventDefault();
    //         event.returnValue = false;
    //     }

    //     function handle(delta) {
    //         var time = 300;
    //         var distance = 100;

    //         $('html, body').stop().animate({
    //             scrollTop: $(window).scrollTop() - (distance * delta)
    //         }, time );
    // }


if($(document).width() < 768){
    $(window).scroll(function () {
      var home_section = $('.header-parallax').height();
      // console.log(home_section);
        if ($(window).scrollTop() > home_section) {
            $('.navbar').css("display", 'none');
            $('.only_mobile .nav-menu').css("display", 'none');
            $('.header-bar .top_menu_bar .w-nav-menu').css("display", 'none');
            $('.menu-btn').css("display", 'block');
            $('.header-bar .w-col-3 .only_desktop img.logo').css("display", 'block');
            $('.only_desktop').css("display", 'block');
            $('.center.only_desktop').css("display", 'none');
            $('.logo .w-lang-buttons').css("display", 'block');
            $('.w-col-3.logo').css("display", 'block');
            // $('.header-bar .w-col-3').css("display", 'block');
        }else{
            // $('.only_mobile .nav-menu').css("display", 'block');
            $('.navbar').css("display", 'block');
            $('.header-bar .top_menu_bar .w-nav-menu').css("display", 'block');
            $('.menu-btn').css("display", 'none');
            $('.social').css("display", 'none');
            $('.social.mob').css("display", 'block');
            // $('.only_desktop').css("display", 'none');
            $('.w-col-3.logo').css("display", 'none');
            $('.logo img').css("display", 'none');
        }
    });
}

 if($(document).width() < 1920){
     $(window).scroll(function () {
       var home_section = $('.header-parallax').height();
      // console.log(home_section);
         if ($(window).scrollTop() > (home_section-25)) {
             $('img.logo ').css('display', 'block');
             $('img.logo ').attr('src', '/assets/jacob/images/sys/logo.png');
            // $('.header-bar .only_desktop').css("display", 'block');
            // $('.menu-btn').css("display", 'block');
         }else{
             $('img.logo ').css('display', 'none');
             // $('.header-bar .only_desktop').css("display", 'none');
             // $('.menu-btn').css("display", 'none');
         }
     });
 }



$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $('.flipbook-overlay').hide();
        $('body').css('overflow', 'visible');
    }
});


if($(document).width() > 768){
    $('.header-parallax').stellar();
    $(function() {
        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 40,
            responnsive: true
        });
    });

}



$(".meniu-img").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
  $(this).removeClass("animated")
})

$(".meniu-img").hover(function(){
  $(this).addClass("animated");
})

