<?php
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	define('ROOT', dirname(dirname(__FILE__)));
	define('DS', DIRECTORY_SEPARATOR);
	define('IMAGES', ROOT.DS.'images'.DS);

	$images = opendir(IMAGES);
	$json = array();
	$i = 0;
	while(($file = readdir($images)) !== false) {
		$i++;
		if(preg_match('/^\.{1,2}$/', $file) || !is_file(IMAGES.$file)) continue;
		$arr = array('path'=>'images/'.$file);
		list($arr['width'], $arr['height']) = getimagesize(IMAGES.$file);
		$arr['title'] = 'My Image ' . $i;
		$json[] = $arr;
	}

	echo json_encode($json);