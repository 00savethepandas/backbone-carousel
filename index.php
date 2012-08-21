<?php
	define('PATH', preg_replace('/\/index\.php$/', '', $_SERVER['SCRIPT_NAME']));
	function report () {
		$args = func_get_args();
		foreach($args as $a) {
			echo '<pre>'.print_r($a,true).'</pre>';
		}
	}
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Backbone.js Carousel</title>
	<link rel="stylesheet" href="<?php echo PATH; ?>/css/styles.css" />
	<script type="text/javascript">
		var app = {};
		app.js = '<?php echo PATH; ?>/js';
		app.pathRoot = '<?php echo PATH; ?>';
		app.images = '<?php echo PATH; ?>/images';
		app._resources = '<?php echo PATH; ?>/_resources';
	</script>
	<!--<script type="text/javascript" data-main="<?php echo PATH; ?>/js/main" src="<?php echo PATH; ?>/js/vendors/requirejs/require.js"></script>-->
	<script src="<?php echo PATH; ?>/js/min.js"></script>
</head>
<body>
	<div id="container">
		<section id="carousel-viewport">
			<ul id="carousel-wrapper">

			</ul>
			<div id="carousel-bar">
				<article id="carousel-caption"></article>
				<nav id="carousel-navigation">
					<a class="arrow" id="carousel-left" href="#">previous</a>
					<a class="arrow" id="carousel-right" href="#">next</a>
				</nav>
			</article>
		</div>
	</div>
</body>
</html>