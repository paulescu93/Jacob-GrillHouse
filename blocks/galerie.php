<div id="galerie">
  <div class="overlay">
    <div class="row-gree gallery">
      <div class="w-container wrap">
        <div class="center">
          <h3 class="gallery"><?php echo $this->uri->segment(1) == 'en' ? 'GALLERY' : 'GALERIE' ?></h3>
          <div class="all-galleries">
            <div class="center local only_desktop w-col w-col-6">
              <div class="team-album">
                <?php echo $this->uri->segment(1) == 'en' ? 'OUR LOCATION' : 'LOCATIA NOASTRA' ?>
              </div>
              <div class="slider_gallery slider_local_desk ">
                <?php if(isset($gallery_image['1'])): ?>
                  <?php foreach ($gallery_image['1'] as $key => $value): ?>
                    <?php //dev_print_d($gallery_image['1']); ?>
                  <div class="slide">
                    <a class="image"  data-lightbox="prod_image1" href="/public/gallery/original/<?php echo $value->image; ?>">
                      <img class="image" src="/public/gallery/thumb/<?php echo $value->image; ?>">
                    </a>
                  </div>
                  <?php endforeach; ?>
                <?php endif; ?>

            </div>
          </div>
          <div class="center prod only_desktop w-col w-col-6 delay-05s">
            <div class="team-album">
              <?php echo $this->uri->segment(1) == 'en' ? 'OUR CUISINE' : 'PREPARATELE NOASTRE' ?>
            </div>
            <div class="slider_gallery slider_prod_desk">

              <?php if(isset($gallery_image['2'])): ?>
                <?php foreach ($gallery_image['2'] as $key => $value): ?>
                  <div class="slide">
                    <a class="image"  data-lightbox="prod_image2" href="/public/gallery/original/<?php echo $value->image; ?>">
                      <img class="image" src="/public/gallery/thumb/<?php echo $value->image; ?>">
                    </a>
                  </div>
                <?php endforeach; ?>
              <?php endif; ?>
            </div>
          </div>

          <div class="center prod only_mobile w-col w-col-6 delay-05s">
            <div class="team-album">
              <?php echo $this->uri->segment(1) == 'en' ? 'OUR LOCATION' : 'LOCATIA NOASTRA' ?>
            </div>
            <div class=" slider_prod">

                <?php if(isset($gallery_image['1'])): ?>
                  <?php foreach ($gallery_image['1'] as $key => $value): ?>
                    <div class="slide">
                      <a class="image"  data-lightbox="prod_image3" href="/public/gallery/original/<?php echo $value->image; ?>">
                        <img class="image" src="/public/gallery/thumb/<?php echo $value->image; ?>">
                      </a>
                    </div>
                <?php endforeach; ?>
              <?php endif; ?>
            </div>
          </div>
          <div class="center prod only_mobile w-col w-col-6 delay-05s">
            <div class="team-album">
              <?php echo $this->uri->segment(1) == 'en' ? 'OUR CUISINE' : 'PREPARATELE NOASTRE' ?>
            </div>
            <div class=" slider_prod">
              <?php if(isset($gallery_image['2'])): ?>
                <?php foreach ($gallery_image['2'] as $key => $value): ?>
              <div class="slide">
                <a class="image"  data-lightbox="prod_image4" href="/public/gallery/original/<?php echo $value->image; ?>">
                  <img class="image" src="/public/gallery/thumb/<?php echo $value->image; ?>">
                </a>
              </div>
                <?php endforeach; ?>
              <?php endif; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>

