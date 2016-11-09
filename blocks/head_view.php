<!-- START HEAD -->
<head>

<?php
  if ($this->uri->segment(1) == 'en') {
    $description = get_option('description_en');
    $keywords = get_option('keywords_en');
    $title = get_option('default_title_en');
  } else {
    $description = get_option('description_ro');
    $keywords = get_option('keywords_ro');
    $title = get_option('default_title');
  }
  ?>


  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- no focus -->
  <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

  <META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">
  <!-- end -->
  <meta name="description" content="<?php echo $description; ?>">
  <meta name="keywords" content="<?php echo $keywords; ?>">
  <title> <?php echo $this->config->item('default_title');?></title>


  <link rel="shortcut icon" href="<?= base_url(); ?>favicon.ico" type="image/x-icon">
  <link rel="icon" href="/favicon.ico" type="image/x-icon">

  <!-- START THEME STYLE -->
  <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/font-awesome.css">
  <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="/assets/jacob/css/normal.css">
  <link rel="stylesheet" type="text/css" href="/assets/jacob/css/style.css?v=<?php echo $this->config->item('cache_id') ?>">
  <link rel="stylesheet" type="text/css" href="/assets/jacob/css/responsive.css?v=<?php echo $this->config->item('cache_id') ?>">
  <link rel="stylesheet" type="text/css" href="/assets/jacob/css/meniumodal.css?v=<?php echo $this->config->item('cache_id') ?>">
  <!-- <link rel="stylesheet" type="text/css" href="/assets/jacob/css/headhesive.css"> -->
  <!-- <link href="/assets/jacob/css/animate.css" rel="stylesheet"> -->
  <!-- <link type="text/css" rel="stylesheet" href="/assets/jacob/css/jquery-ui-1.8.16.custom.css" /> -->
  <link type="text/css" rel="stylesheet" href="/assets/css/lightbox.css" />
  <!-- <link type="text/css" rel="stylesheet" href="/assets/jacob/css/lightbox.css" /> -->
  <!-- END THEME STYLE -->


  <!-- flipbook -->
  <link rel="stylesheet" type="text/css" href="/assets/jacob/css/flipbook.style.css">
  <link rel="stylesheet" type="text/css" href="/assets/jacob/css/flipbook.skin.gray.css">
  <link href="/assets/jacob/css/jquery.bxslider.css" rel="stylesheet" />
  <!-- END FONTELLO ICONS STYLESHEET -->

  <!-- START MAGNIFIC POPUP STYLESHEET -->
  <!-- <link rel="stylesheet" type="text/css" href="/assets/jacob/css/magnific-popup.css"> -->

  <!-- END MAGNIFIC POPUP STYLESHEET -->
  <link rel="stylesheet" type="text/css" href="/assets/jacob/css/slick.css"/>


  <!-- START FAVICON -->
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
  <!-- EDN FAVICON -->



    <!-- google fonts -->
  <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,700,900' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Exo:700,300,500' rel='stylesheet' type='text/css'>
  <!-- Begin Inspectlet Embed Code -->
  <script type="text/javascript" id="inspectletjs">
  window.__insp = window.__insp || [];
  __insp.push(['wid', 1556956138]);
  (function() {
  function __ldinsp(){var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); }
  if (window.attachEvent) window.attachEvent('onload', __ldinsp);
  else window.addEventListener('load', __ldinsp, false);
  })();
  </script>
  <!-- End Inspectlet Embed Code -->



</head>
<!-- END HEAD -->



