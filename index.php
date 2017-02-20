<?php
include 'config.php';

if (isset($_GET["run_tests"])) {
	echo $config->component['html_test'];
}
else if ($config->component['maintenance']){
	echo $config->component['html_maintenance'];
}
else{
	echo $config->component['html_main'];
}

?>