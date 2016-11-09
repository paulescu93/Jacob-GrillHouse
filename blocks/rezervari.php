<div class="row-gree rezervation-wrapper" id="rezervari" data-stellar-background-ratio="0.3" >
  <div class="over">
    <div class="w-container wrap">
      <div class="center about_content rezervari_content">
        <p class="welcome"><?php echo $this->uri->segment(1) == 'en' ? 'Contact & Reservations' : 'Contact & Rezervari' ?></p>
        <div class="center-fix">

          <div class="program_item w-col w_p2 delay-05s">
           <?php if($this->uri->segment(1) == 'en') :?>
              <p><?php echo get_option('program_en'); ?></p>
            <?php else: ?>
              <p><?php echo get_option('program_ro'); ?></p>
            <?php endif; ?>
          </div>
          <div class="point_item contact_item w-col w-col-4 w_p2 delay-05s">
            <div class="contact-title"><?php echo $this->uri->segment(1) == 'en' ? 'Address:' : 'Adresa:' ?></div>
            <?php if($this->uri->segment(1) == 'en') :?>
              <p class="no-padding-bottom"><?php echo $this->config->item('adresa_en'); ?></p>
              <p><?php echo get_option('address_contact_en'); ?></p>
            <?php else: ?>
              <p class="no-padding-bottom"><?php echo $this->config->item('adresa'); ?></p>
              <p><?php echo get_option('address_contact_ro'); ?></p>
            <?php endif; ?>
          </div>
          <div class="point_item contact_item w-col w-col-4 w_p2 delay-1s">
            <div class="contact-title"><?php echo $this->uri->segment(1) == 'en' ? 'Email:' : 'Mail:' ?></div>
            <p class="no-padding-bottom"><a href="mailto:<?php echo get_option('email_contact'); ?>"><?php echo get_option('email_contact'); ?></a> </p>
            <p><a href="mailto:<?php echo get_option('email_sugetions'); ?>"><?php echo get_option('email_sugetions'); ?></a> </p>
          </div>
          <div class="point_item contact_item w-col w-col-4 w_p2 delay-1-5s">
            <div class="contact-title"><?php echo $this->uri->segment(1) == 'en' ? 'Phone' : 'Telefon' ?>:</div>
            <p class="contact_tel"><?php echo $this->config->item('contact_phone'); ?></p>
            <a class="only_mobile" href="tel:<?php echo get_option('phone_contact'); ?>" onclick="call();">
              <div class="contact-phone">
                <button>
                  <?php echo $this->uri->segment(1) == 'en' ? 'Call now!' : 'Suna acum!' ?>
                </button>
              </div>
            </a>
          </div>

          <div class="program_item w-col w_p2 delay-05s">
            <!-- <p class="rezervare"> <?php// echo $this->uri->segment(1) == 'en' ? "You're welcome!" : 'Va asteptam cu drag si multa pasiune.'; ?>
            </p> -->
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

