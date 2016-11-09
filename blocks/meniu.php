<?php $wine_array = array('43','44','45','46','47'); ?>
<?php $burger_array = array('44','45','46'); ?>

<div id="meniu">
  <div class="menu-wrapper">
    <div class="w-container wrap-normal">
      <div class="center about_content">
        <div class="center-fix">
          <div class="meniu-img book1 swing ">
          <h3><?php echo $this->uri->segment(1) == 'en' ? 'MENU' : 'MENIU' ?><!--<br/> Enzo Ristorante a caffé!--></h3>
          <!-- <img src="/assets/jacob/images/sys/menu_bg.png" alt="Meniu Enzo Ristorante"> -->
              <input type="hidden" name="lang" value="<?php echo $this->uri->segment(1) == 'en' ? 'en' : 'ro'; ?>" id="lang">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
<div class="modal-content">
  <div class="modal-header meniu-header">

    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">MENIU</h4>

  </div>
  <div class="modal-dialog" role="document">
      <div class="modal-body">

        <div id="page">

        <?php foreach($menu as $key => $value): ?>

          <?php if($value['parent_first_page']): ?>
            <?php if($value['parent_categ']->id == 1): ?>
               <!-- TITLE -->
              <div class="row first-description">
                <?php echo $value['parent_categ']->description; ?>
              </div>
              <!-- END TITLE -->
            <?php else: ?>
              <!-- TITLE -->
              <div class="row">
                 <div class="col-md-12 menu-titles text-center"><?php //echo $value['parent_categ']->name; ?></div>
               </div>
              <!-- END TITLE -->
            <?php endif; ?>
          <?php endif ?>



          <?php if(isset($value['subcategs']) && $value['subcategs'] != null): ?>
            <?php foreach ($value['subcategs'] as $key => $subcateg): ?>
              <?php if($subcateg->id == 51) :?>
                <div class="col-md-12 col-xs-12 border-desc">
                  <div style="max-width: 80%;margin: auto;font-size: 16px;font-weight: bold;">
                      <?php echo $subcateg->description; ?>
                  </div>
                </div>
              <?php endif; ?>
              <!-- BORDER ON FIRST PAGE -->
              <div class="col-md-12 col-xs-12 categ<?php echo $subcateg->id; ?> <?php echo ($subcateg->border == 1) ? 'border' : ''; ?>">
              <!-- BORDER ON FIRST PAGE -->

                    <!-- SUBTITLE CATEGS -->
<!--                    <div class="row" class="subtitle">
                     <br/><div class="col-md-12 text-center recomandation-subcateg"><?php //echo  $subcateg->name; ?></div>
                    </div> -->

                  <?php //else: ?>
                    <div class="row subtitle <?php echo $subcateg->class;?>">
                     <div class="col-md-12 col-sm-12 col-xs-12 text-center menu-subtitle"><?php echo  $subcateg->name; echo (in_array($subcateg->id, $wine_array)) ? '*' : ''; ?></div>
                    </div>
                  <!-- END SUBTITLE CATEGS -->

                  <?php if($subcateg->id == 8): ?>
                    <?php echo "<div class=\"asterix_burger\">Cartofi prajiti steakhouse si sosul incluse / Steakhouse french fries and sauces included</div>"; ?>
                  <?php endif; ?>
                  <?php foreach ($subcateg->products as $p_key => $product):?>

                      <?php if($product->have_product == 1 && $subcateg->id != 13 && $subcateg->parent_id != 3): ?>
                        <!-- formatul de la vinuri -->
                        <!-- SUBCATEG -->
                        <div class="col-md-12 col-xs-12 product">
                            <div class="col-md-11 product-about">
                              <div class="row product-subcateg-name"><span><?php echo $product->name . ' ' . $product->quantity; ?></span></div>
                                <div class="row product-description"><?php echo $product->ingredients; ?></div>
                            </div>
                        </div>
                        <!-- END SUBCATEG -->
                        <?php foreach($product->subproducts as $s_key => $s_value): ?>
                          <!-- PRODUCT 1-->
                          <div class="col-md-12 col-xs-12 product">
                              <div class="col-md-11 product-about">
                                <div class="name-and-price">
                                  <div class="product-name"><span class="nume-produs"><?php echo  $s_value->name . ' ' . $s_value->quantity; ?></span></div>
                                    <div class="row product-description"><?php echo $s_value->ingredients; ?></div>
                                  <div class="col-md-1 product-price">
                                    <div class="row"><span><?php echo  $s_value->price . '.00 lei'; ?></span></div>
                                  </div>
                                </div>
                              </div>
                          </div>
                          <!-- END PRODUCT -->
                        <!-- sfarsit format de la vinuri -->
                        <?php endforeach; ?>


                      <?php elseif($subcateg->parent_id == 13): ?>
                      <!-- formatul de la drinks -->
                        <div class="col-md-12 col-xs-12 product">
                            <div class="col-md-12 product-about">
                              <div class="name-and-price">
                                <div class=" product-name">
                                  <span class="nume-produs"><?php echo  $product->name . ' <span class="font-weight-low">' . $product->ingredients . '</span>'; ?></span>
                                </div>
                                <?php if($product->price > 0): ?>
                                  <div class="col-md-1 product-price">
                                    <span class="product-qty"><?php  echo $product->quantity; ?></span>
                                    <span><?php echo $product->price . '.00 lei'; ?></span>
                                  </div>
                                <?php endif; ?>
                              </div>
                            </div>
                        </div>
                      <!-- sfarsit formatul de la drinks -->

                      <?php else: ?>
                      <!-- formatu de la mancare -->
                          <div class="col-md-12 product col-xs-12 <?php echo $subcateg->class; ?>">
                            <div class="col-md-11 product-about">
                              <div class="name-and-price">
                                <div class=" product-name"><span class="nume-produs"><?php echo  $product->name;?></span></div>
                                <?php if($product->price > 0): ?>
                                  <div class="col-md-1 product-price">
                                      <div class="row">
                                        <span class="product-qty"><?php  echo $product->quantity . ' - '; ?></span>
                                        <span><?php echo $product->price . '.00 lei'; ?><?php echo (in_array($product->id, $burger_array)) ? '*' : ''; ?></span>
                                      </div>
                                   </div>
                                <?php endif; ?>
                              </div>

                              <div class="row product-description"><?php echo $product->ingredients; ?></div>
                            </div>
                        </div>
                        <!-- sfarsit formatul de la mancare -->
                      <?php endif; ?>
                  <?php endforeach; ?>

                  <?php if($subcateg->id == 54): ?>
                    <div class="preturi-tigari">
                      <?php //echo $subcateg->description; ?>
                    </div>
                  <?php else: ?>

                  <?php endif; ?>
                  <!-- SUBTITLE -->

                                  <?php
                  if($subcateg->id == 44 ||$subcateg->id == 45 ||$subcateg->id == 46 ||$subcateg->id == 47 ) {
                       echo "<div class=\"asterix_wine\">* Vin la sticla - sec / Wine by bottle - dry - 750ml</div>";
                  }
                  elseif ($subcateg->id == 43) {
                      echo "<div class=\"asterix_wine\">* Vin la pahar - sec / Wine by glass - dry - 150ml</div>";
                  }
                  elseif($subcateg->id == 52){
                       echo "<div class=\"asterix_wine\">* Vin la sticla - dulce / Wine by bottle - sweet - 375ml</div>";
                  }
                  elseif  ($subcateg->id == 8) {
                    echo "<div class=\"asterix_wine\" style=\" font-size: 14px;\">* În limita stocului disponibil / Limited to available stock.<br/>* Toate gramajele sunt la crud / Raw meat weight.</div>";
                       // echo "<div class=\"asterix_wine\">* Toate gramajele sunt la crud / Raw meat weight.";
                  }
                 ?>

              </div>
              <?php if($subcateg->id == 51): ?>
                <?php echo "<div class=\"col-md-12 col-xs-12 \"><div class=\"small asterix_burger bottom_asterix\">'In sange' / Rare grilled steaks - patruns la 52˚ C, aspect exterior de culoare gri-brun, 75% din interior de culoare rosie / at 52˚ C, seared and still red 75% through the center, slightly  warm. The outside remains gray-brown. <br/>Mediu / Medium grilled steaks - pătruns la 60˚ C, aspect exterior de culoare gri-brun, in timp ce interiorul devine rose in proportie de 25% / at 60˚ C seared outside, 25% pink showing surrounding the center, hot. The outside is gray-brown. <br/>Bine facut / Well done steaks - patruns la 71˚ C, aspectul interior-exterior este uniform, gri-maroniu (mai putin recomandat deoarece carnea isi pierde din savoare) / at 71˚ C, 100% gray-brown throughout and slightly charred (not recommended because you can not taste the real flavour of the meat).</div></div>"; ?>
              <?php endif; ?>

            <?php endforeach; ?>
          <?php endif; ?>



        <?php endforeach; ?>

          <div class="row lege-alcool">
            <div class="col-md-12">
              <span>Este interzisa servirea de alcool si tutun tinerilor sub 18 ani in conformitate cu legea 65/2002</span>
            </div>
          </div>

       </div>
       <!-- END PAGE -->
      </div>
    </div><!--.modal-content-->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->






