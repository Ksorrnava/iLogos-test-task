<?php
require_once('_func.php');

$page = 'index';
$pageTitle = 'Test task by @Ksorrnava';

$content = render('views/pages/'.$page.'');

include('views/layout.php');
