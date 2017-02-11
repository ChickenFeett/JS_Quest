<?php

include 'config.php';

if ($config->component['maintenance']){
	echo $config->component['html_maintenance'];
}
else{
	echo $config->component['html_main'];
}

?>