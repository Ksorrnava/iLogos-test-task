<div class="header">
  <div class="container">
    <div class="row">
      <img class="logo" src="../img/dummy-logo.png" title="logo" alt="logo"/>
      <div class="btn burger visible-xs"></div>
      <ul class="header-menu main-menu">
      <?php
      $activePage = "index.php";
      foreach($mmenu as $url=>$title):?>
      <li <?php if($url === $activePage):?>class="active"<?php endif;?> >
        <a  href="<?php echo $url;?>">
          <?php echo $title;?>
        </a>
      </li>
      <?php endforeach;?>
      </ul>
    </div>
  </div>
</div>
