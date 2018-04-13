<!DOCTYPE html>
<html class="no-js">
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="author" content="">

  <title><?php echo $pageTitle; ?></title>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css">
  <link rel="stylesheet" href="css/fonts/pf.css">
  <link rel="stylesheet" href="css/main.css">

  <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0-rc2/js/bootstrap.min.js"></script>
  <script src="http://code.highcharts.com/stock/highstock.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js"></script>
  <script async src="js/main.js"></script>

</head>
<body>
<?php include('views/include/menu.php'); ?>
<!-- Header -->
<?php if ($header !== false) { inc('views/header', array('mmenu' => $mmenu)); } ?>
<!-- content -->
<?= $content ?>
<!-- Footer -->
<?php  if ($footer !== false) { inc('views/footer', array('mmenu' => $mmenu)); } ?>

</body>
</html>
