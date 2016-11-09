  <!-- START HEADER -->
  <!-- SCROLL DIV #boxscroll by nicescroll -->



  <!-- CHANGEABLE UNIQUE SECTOIN ID -->
  <section id="home">

    <!-- START FIXED HEADER DIV -->
    <div class="header-bar">
      <!-- START CONTAINER -->
        <!-- START COLUMN 3 -->
        <div class="mobile-menu">
          <div class="menu-btn">
            <button class="hamburger"><i class="fa fa-bars"></i></button>
            <button class="cross">X</button>
          </div>
          <div class="menu">
            <ul>
            <a href="<?php echo base_url(); ?>"><li><img class="logo" src="/assets/benjamin/images/sys/logo.png" alt=""></li></a>
              <a id="mobile_link" href="#desprenoi"><li>ABOUT US</li></a>
              <a id="mobile_link" href="#galerie"><li>GALLERY</li></a>
              <a id="mobile_link" href="#meniu"><li>MENU</li></a>
              <a id="mobile_link" href="#rezervari"><li>CONTACT  &  RESERVATIONS</li></a>
            </ul>
          </div>
        </div>

      <div class="w-container container">


        <div class="w-col w-col-3 logo">
          <!-- START LOGO -->
          <a class="only_desktop" href="<?php echo site_url('/en'); ?>"><img class="logo" src="/assets/benjamin/images/sys/logo.png" alt=""></a>
          <!-- END LOGO -->
          <div class="w-lang-buttons">
            <a href="/" class="w-lang w-nav-ro"></a>
            <a href="/en"class="w-lang w-nav-en active"></a>
          </div>
        </div><!-- END COLUMN 3 -->

                <div class="w-col-12 only_mobile">
        <nav class="w-nav-menu nav-menu" role="navigation">
                <a class="w-nav-link menu-li" id="myLink" href="#desprenoi <?php //echo site_url('despre-noi.html'); ?>">ABOUT US</a>
                <a class="w-nav-link menu-li" id="myLink" href="#galerie <?php //echo site_url('galerie.html'); ?>">GALLERY</a>
                <a class="w-nav-link menu-li" id="myLink" href="#meniu <?php //echo site_url('meniu.html'); ?>">MENU</a>
                <a class="contact_rezervari w-nav-link menu-li" id="myLink" href="#rezervari <?php //echo site_url('rezervari.html'); ?>">CONTACT  &  RESERVATIONS</a>
              </nav>
        </div>

        <!-- START COLUMN 9 -->
        <div class="w-col w-col-9 top_menu_bar">

          <!-- START NAVIGATION -->
          <div class="w-nav navbar">
            <div class="w-container nav"><!-- START CONTAINER -->

              <!-- START NAVIGATION LINKS -->
              <nav class="w-nav-menu nav-menu" role="navigation">
                <a class="w-nav-link menu-li" id="myLink" href="#home">HOME</a>
                <a class="w-nav-link menu-li" id="myLink" href="#desprenoi">ABOUT US</a>
                <a class="w-nav-link menu-li" id="myLink" href="#galerie">GALLERY</a>
                <a class="w-nav-link menu-li" id="myLink" href="#meniu">MENU</a>
                <a class="w-nav-link menu-li" id="myLink" href="#rezervari">CONTACT  &  RESERVATIONS</a>
              </nav>
              <!-- END NAVIGATION LINKS -->
              <!-- START SOCIAL LINKS -->
              <nav class="social w-nav-menu nav-menu align_right" role="navigation">
                <?php if(get_option('facebook') == 1): ?>
                 <?php   //echo '<a class="w-nav-link menu-li" href="'.get_option('facebook_link').'" target="_blank"><img src="/assets/enzoristorante/images/sys/facebook.fw.png"></a>'; ?>
               <?php endif; ?>
                <?php if(get_option('tripadvisor') == 1): ?>
                 <?php   //echo '<a class="w-nav-link menu-li" href="'.get_option('tripadvisor_link').'" target="_blank"><img src="assets/enzoristorante/images/sys/trip.fw.png"></a>'; ?>
               <?php endif; ?>

               <?php if(get_option('foursquare') == 1): ?>
                 <?php   //echo '<a class="w-nav-link menu-li foursqare_link" href="'.get_option('foursquare_link').'" target="_blank"><i class="fa fa-foursquare foursquare-icon"></i></a>'; ?>
               <?php endif; ?>
              </nav>
              <!-- END SOCIAL LINKS -->
              <div class="w-lang-buttons">
                <a href="/" class="w-lang w-nav-ro"></a>
                <a href="/en" class="w-lang w-nav-en active"></a>
              </div>
            </div>
            <!-- END CONTAINER -->
          </div>
          <!-- END NAVIGATION -->
        </div>
        <!-- END COLUMN 9 -->

      </div>
      <!-- END CONTAINER -->
    </div>
    <!-- END FIXED HEADER DIV -->
  </section>
  <!-- END SECTION -->
  <!-- END HEADER -->
