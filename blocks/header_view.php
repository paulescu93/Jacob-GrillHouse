  <!-- START HEADER -->
  <!-- SCROLL DIV #boxscroll by nicescroll -->



  <!-- CHANGEABLE UNIQUE SECTOIN ID -->
  <section id="home">

    <!-- START FIXED HEADER DIV -->
    <div class="header-bar">
      <!-- START CONTAINER -->


      <div class="w-container container">


        <div class="w-col w-col-3 logo">
          <!-- START LOGO -->

          <a class="only_desktop" href="<?php echo base_url(); ?>"><img class="logo" src="" alt=""></a>
          <!-- END LOGO -->
          <div class="w-lang-buttons">
            <a href="/" class="w-lang w-nav-ro <?php echo $this->uri->segment(1) == 'en' ? '' : 'active' ?>"></a>
            <a href="/en" class="w-lang w-nav-en <?php echo $this->uri->segment(1) == 'en' ? 'active' : '' ?>"></a>
          </div>
        </div><!-- END COLUMN 3 -->
        <div class="w-col-12 only_mobile">
          <nav class="w-nav-menu nav-menu" role="navigation">
            <a class="w-nav-link menu-li" id="myLink" href="#desprenoi <?php //echo site_url('despre-noi.html'); ?>">DESPRE NOI</a>
            <a class="w-nav-link menu-li" id="myLink" href="#galerie <?php //echo site_url('galerie.html'); ?>">GALERIE</a>
            <a class="w-nav-link menu-li" id="myLink" href="#meniu <?php //echo site_url('meniu.html'); ?>">MENIU</a>
            <a class="contact_rezervari w-nav-link menu-li" id="myLink" href="#rezervari <?php //echo site_url('rezervari.html'); ?>">CONTACT  &  REZERVARI</a>
          </nav>
        </div>

        <!-- START COLUMN 9 -->
        <div class="w-col w-col-9 top_menu_bar">

          <!-- START NAVIGATION -->
          <div class="w-nav navbar">
            <div class="w-container nav"><!-- START CONTAINER -->

              <!-- START NAVIGATION LINKS -->
              <?php if($this->uri->segment(1) == 'en'): ?>
                <nav class="w-nav-menu nav-menu" role="navigation">
                  <a class="w-nav-link menu-li" id="myLink" href="#home">HOME</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#desprenoi">ABOUT US</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#galerie">GALLERY</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#meniu">MENU</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#rezervari">CONTACT  &  RESERVATIONS</a>
                </nav>
              <?php else: ?>
                <nav class="w-nav-menu nav-menu" role="navigation">
                  <a class="w-nav-link menu-li" id="myLink" href="#home <?php //echo base_url(); ?>">ACASA</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#desprenoi ">DESPRE NOI</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#galerie ">GALERIE</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#meniu">MENIU</a>
                  <a class="w-nav-link menu-li" id="myLink" href="#rezervari">CONTACT  &  REZERVARI</a>
                </nav>
              <?php endif; ?>

              <!-- END NAVIGATION LINKS -->
              <!-- START SOCIAL LINKS -->
              <nav class="social w-nav-menu nav-menu align_right" role="navigation">
                <?php if(get_option('facebook') == 1): ?>
                  <?php   echo '<a class="w-nav-link menu-li" href="'.get_option('facebook_link').'" target="_blank"><i class="fa fa-facebook-square"></i></a>'; ?>
                <?php endif; ?>
                <?php if(get_option('tripadvisor') == 1): ?>
                 <?php   echo '<a class="w-nav-link menu-li" href="'.get_option('tripadvisor_link').'" target="_blank"><i class="fa fa-tripadvisor"></i></a>'; ?>
               <?php endif; ?>

               <?php if(get_option('foursquare') == 1): ?>
                 <?php   echo '<a class="w-nav-link menu-li foursqare_link" href="'.get_option('foursquare_link').'" target="_blank"><i class="fa fa-foursquare foursquare-icon"></i></a>'; ?>
               <?php endif; ?>
             </nav>
             <!-- END SOCIAL LINKS -->
             <div class="w-lang-buttons">
              <a href="/" class="w-lang w-nav-ro <?php echo $this->uri->segment(1) == 'en' ? '' : 'active' ?>"></a>
              <a href="/en" class="w-lang w-nav-en <?php echo $this->uri->segment(1) == 'en' ? 'active' : '' ?>"></a>
            </div>
            <!-- END CONTAINER -->
          </div>
          <!-- END NAVIGATION -->
        </div>
        <!-- END COLUMN 9 -->

      </div>
      <!-- END CONTAINER -->
      <!-- START COLUMN 3 -->
      <div class="mobile-menu">
        <div class="menu-btn">
          <button class="hamburger"><i class="fa fa-bars"></i></button>
          <button class="cross">X</button>
        </div>
        <div class="menu">
          <ul>
            <!-- <a href="<?php echo base_url(); ?>"><li><img class="logo" src="/assets/jacob/images/sys/logo.png" alt=""></li></a> -->
            <?php if($this->uri->segment(1) == 'en'): ?>
              <li><a id="mobile_link" href="#desprenoi">ABOUT US</a></li>
              <li><a id="mobile_link" href="#galerie">GALLERY</a></li>
              <li><a id="mobile_link" href="#meniu">MENU</a></li>
              <li><a id="mobile_link" href="#rezervari">CONTACT  &  REZERVATIONS</a></li>
            <?php else: ?>
              <li><a id="mobile_link" href="#desprenoi">DESPRE NOI</a></li>
              <li><a id="mobile_link" href="#galerie">GALERIE</a></li>
              <li><a id="mobile_link" href="#meniu">MENIU</a></li>
              <li><a id="mobile_link" href="#rezervari">CONTACT  &  REZERVARI</a></li>
            <?php endif; ?>
            <li class="social mob w-nav-menu nav-menu align_right" role="navigation">
              <div class="socialmobwrp"><a class="w-nav-link menu-li" href="https://www.facebook.com/BenjaminSteakhouseSibiu" target="_blank"><i class="fa fa-facebook-square"></i></a>
                <!-- <a class="w-nav-link menu-li" href="#"><img src="/assets/benjamin/images/sys/twitter.fw.png"></a> -->
                <a class="w-nav-link menu-li" href="http://www.tripadvisor.com/Restaurant_Review-g295393-d8122543-Reviews-Benjamin_Steakhouse_Bar-Sibiu_Sibiu_County_Central_Romania_Transylvania.html" target="_blank"><i class="fa fa-tripadvisor"></i></a>
                <a class="w-nav-link menu-li foursqare_link" href="https://foursquare.com/v/benjamin-steakhouse--bar/55648afa498e4236c86444bc" target="_blank"><i class="fa fa-foursquare"></i></a></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- END FIXED HEADER DIV -->
    </section>
    <!-- END SECTION -->
    <!-- END HEADER -->
