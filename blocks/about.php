<?php $block = get_block_data('despre_noi_block'); ?>
<div  class="parallax-back scroll" id="desprenoi">
  <div class="container">
    <div class="opcaity">
      <div class="w-container wrap-normal despre_noi_wrapper">
        <div class="center about_content">

          <!-- <p class="welcome"><?php //echo $this->uri->segment(1) == 'en' ? 'Find out more' : 'Afla mai multe' ?></p> -->

          <div class="container">
            <div id="home-container">
              <!-- <div class="top_absolute"></div> -->
              <div class="center-fix despre_noi_content">
                <h3><?php echo $this->uri->segment(1) == 'en' ? $page['en']->title : $page['ro']->title ?></h3>
                <?php
                if($this->uri->segment(1) == 'en'){
                  echo $page['en']->content;
                  // $this->load->view('blocks/enzoristorante/about_en_content');
                }else{
                  echo $page['ro']->content;
                  // $this->load->view('blocks/enzoristorante/about_ro_content');
                }
                ?>
                <!-- <div class="frunza_abs"></div>
                <div class="top_absolute"></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


