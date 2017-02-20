<?php
class Config {
	# Set up variables
	private $app_name;
	private $html_main;
	private $html_maintenance;
	public  $component;

	function __construct() {
		$this->app_name = 'JS Quest';
		$this->html_main =	"<html lang='en'>" .
				            "<head>".
				                "<meta charset='UTF-8'>".
				                "<title>".$this->app_name."</title>".
				                "<link rel='stylesheet' href='css/main.css'>".
				            "</head>".
				            "<body>".
				                "<script src='js/lib/jquery-3.1.1.min.js'></script>".
				                "<script src='js/main/js_quest.js'></script>".
				            "</body>".
				        "</html>";
        $this->html_test =	"<html lang='en' data-testmode='true'>".
				            "<head>".
				                "<meta charset='UTF-8'>".
				                "<title>".$this->app_name."</title>".
				                "<link rel='stylesheet' href='css/main.css'>".
				            "</head>".
				            "<body>".
				                "<script src='js/lib/jquery-3.1.1.min.js'></script>".
				                "<script src='js/lib/qunit-2.1.1.js'></script>".
				                "<script src='js/main/js_quest.js'></script>".
				                "<script src='js/test/jsq_test.js'></script>".
				            "</body>".
				        "</html>";
		$this->html_maintenance = "<html lang='en'>" .
					            "<head>".
					                "<meta charset='UTF-8'>".
					                "<title>".$this->app_name."</title>".
					                "<link rel='stylesheet' href='css/mainentance.css'>".
					            "</head>".
					            "<body>".
					            	"<center>".
					            		"<h1>".$this->app_name." Maintenance</h1>".
					            		"<div class='maintenance body'>".
					            			"<p>".$this->app_name." is current.yPos under maintenance. Please check back later</p>".
					            			"<img src='img/maintenance.gif'>".
					            		"</div>".
					            "</body>".
					        "</html>";
		$this->component = array(
			'maintenance' 		=> false,
			'html_main'			=> $this->html_main,
			'html_test'			=> $this->html_test,
			'html_maintenance' 	=> $this->html_maintenance
		);
		
	}
}

$config = new Config();
?>