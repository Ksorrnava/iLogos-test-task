<?php


error_reporting(0);
ini_set('display_errors', 1);

function inc($filename, array $params = array())
{
  extract($params, EXTR_REFS);
  $filename = str_replace('.php', '', $filename);
  require($filename . '.php');
}

// render template
function render($tmp, $vars = array())
{
  if (file_exists('' . $tmp . '.php')) {
    ob_start();
    extract($vars);
    require '' . $tmp . '.php';
    return ob_get_clean();
  } else {
    echo "<div style='background: #ff0000; color: #fff; padding: 15px; text-align: center;'>no such template <strong>$tmp</strong></div>";
  }
}

?>
