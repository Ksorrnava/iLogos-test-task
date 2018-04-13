<div class="footer">
  <div class="container">
    <div class="row">
      <div class="copy">
        Copyright
      </div>
      <ul class="footer-menu main-menu">
      <?php foreach($mmenu as $url=>$title):?>
        <li>
          <a <?php if($url === $activePage):?>class="active"<?php endif;?> href="<?php echo $url;?>">
            <?php echo $title;?>
          </a>
        </li>
      <?php endforeach;?>
      </ul>
    </div>
  </div>
</div>