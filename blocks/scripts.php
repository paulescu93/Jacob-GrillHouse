<!-- START JQUERY PLUGINS LOAD -->
<script src="http://www.jscache.com/wejs?wtype=excellent&amp;uniq=685&amp;locationId=9755588&amp;lang=en_US&amp;display_version=2"></script>
<script src="/assets/jacob/js/jquery.js"></script>
<script src="/assets/jacob/js/modernizr.js"></script>
<script src="/assets/jacob/js/normal.js"></script>

<script src="/assets/jacob/js/jquery.stellar.js"></script>
<script src="/assets/jacob/js/scripts.js?id=<?php echo $this->config->item('cache_id'); ?>"></script>

<script src="/assets/jacob/js/lightbox.js"></script>


<script src="/assets/js/bootstrap.js"></script>



 <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>

<script>
// function initialize() {
//   var myLatlng = new google.maps.LatLng(45.760815, 24.07352);
//   var mapOptions = {
//     zoom: 18,
//     center: myLatlng
//   }
//   var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   var image = '/assets/jacob/images/sys/pin_map_enzo.fw.png';
//   var marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       icon: image,
//       title: 'Jacob GrillHouse'
//   });



  // Render card

  // Append card when map renders
 // google.maps.event.addListener(map, 'idle', function(e) {

    // Prevents card from being added more than once (i.e. when page is resized and google maps re-renders)
  //   if ( $( ".place-card" ).length === 0 ) {
  //   $(".gm-style").append('<div style="position: absolute; left: 0px; top: 0px;"> <div style="margin: 10px; padding: 1px; -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; border-radius: 2px; background-color: white;"> <div> <div class="place-card place-card-large"> <div class="place-desc-large"> <div class="place-name"> Jacob GrillHouse </div><div class="address"> Sibiu, Padurea Dumbrava, FN </div></div><div class="navigate"> <div class="navigate"> <a class="navigate-link" href="https://www.google.ro/maps/place/Jacob+GrillHouse/@45.7607039,24.1263927,19.59z/data=!4m2!3m1!1s0x0000000000000000:0x0415f81d891b5bdd" target="_blank"> <div class="icon navigate-icon"></div><div class="navigate-text"> Directii </div></a> </div></div><div class="review-box"> <div class="" style="display:none"></div><div class="" style="display:none"></div><div class="" style="display:none"></div><div class="" style="display:none"></div><div class="" style="display:none"></div><div class="" style="display:none"></div><a href="https://www.facebook.com/BenjaminSteakhouseSibiu" target="_blank">34 reviews</a> </div><div class="saved-from-source-link" style="display:none"> </div><div class="maps-links-box-exp"> <div class="time-to-location-info-exp" style="display:none"> <span class="drive-icon-exp experiment-icon"></span><a class="time-to-location-text-exp" style="display:none" target="_blank"></a><a class="time-to-location-text-exp" style="display:none" target="_blank"></a> </div><div class="google-maps-link"> <a href="https://www.google.ro/maps/place/Jacob+GrillHouse/@45.7609261,24.1266865,16.23z/data=!4m2!3m1!1s0x0000000000000000:0x0415f81d891b5bdd" target="_blank">Vezi harta marita</a> </div></div></div></div></div></div>');
  //   }
  // });

  // google.maps.event.addListener(map, 'center_changed', function() {
      // 0.1 seconds after the center of the map has changed,
      // set back the marker position.
//       window.setTimeout(function() {
//         var center = map.setCenter(myLatlng);
//       }, 100);
//   });
// }

// google.maps.event.addDomListener(window, 'load', initialize);

    </script>



<script src="/assets/jacob/js/jquery.bxslider.min.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
  $('.slider_local_desk').bxSlider({
    mode: 'vertical',
    slideMargin: 20,
    minSlides: 2,
    moveSlides: 1,
    speed: 500,
    pager: false
  });
});
</script>
<script type="text/javascript">
    $(document).ready(function(){
  $('.slider_prod_desk').bxSlider({
    mode: 'vertical',
    slideMargin: 20,
    minSlides: 2,
    moveSlides: 1,
    speed: 500,
    pager: false
  });
});
</script>

<script type="text/javascript" src="/assets/jacob/js/slick.js"></script>

<script type="text/javascript">


$('.slider_prod').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});


</script>



<!-- END JQUERY PLUGINS LOAD -->



<?php if(strpos($_SERVER['SERVER_NAME'], 'local') == FALSE || strpos($_SERVER['SERVER_NAME'], '192.168.1') == FALSE): ?>
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63133775-1', 'auto');
  ga('send', 'pageview');

</script>
<?php endif; ?>



<script src="/assets/jacob/js/jquery-ui.js"></script>

<script src="/assets/jacob/js/flipbook.js"></script>

<script type="text/javascript">
  if (screen.width < 320) {
  $("#viewport").attr("content", "width=320");
}
</script>

<script type="text/javascript">
        $(document).ready(function (){

          if($(window).width() >= 768){
            var url = '/products/get_menu';
            var zoom = 0.8;
            var max_zoom = 4;
            var zoomLevels = [0.8, 1];
            var lang = $('#lang').val();

            // get pages with ajax
            $.ajax({
                dataType: "json",
                type: "POST",
                url: url,
                data: {
                    lang: lang
                }
              }).done(function(data) {
                console.log(data);
                $(".book1").flipBook({
                    lightBox:true,
                    btnNext:true,
                    btnPrev:true,
                    btnZoomIn:true,
                    btnZoomOut:true,
                    btnToc:true,
                    btnThumbs:false,
                    btnShare:false,
                    btnExpand:true,
                    zoom: zoom,
                    zoomLevels: zoomLevels,
                    zoomMax: max_zoom,

                    thumbnailWidth:100,
                    thumbnailHeight:141,

                    flipType:'3d',

                    pages:data,
                });
              });

          }

          $('.book1').click(function(){
            if($(window).width() < 768){
              $('#myModal').modal();
            }
          });


        });

</script>

<script type="text/javascript">
//this is where we apply opacity to the arrow
$(window).scroll( function(){

  //get scroll position
  var topWindow = $(window).scrollTop();
  //multipl by 1.5 so the arrow will become transparent half-way up the page
  var topWindow = topWindow * 1.5;

  //get height of window
  var windowHeight = $(window).height();

  //set position as percentage of how far the user has scrolled
  var position = topWindow / windowHeight;
  //invert the percentage
  position = 1 - position;

  //define arrow opacity as based on how far up the page the user has scrolled
  //no scrolling = 1, half-way up the page = 0
  $('.down_arrow').css('opacity', position);

});






//Code stolen from css-tricks for smooth scrolling:
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
</script>
