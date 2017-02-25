<?php
class Config {
	# Set up variables
	private $app_name;
	private $html_main;
	private $html_maintenance;
	public  $component;

	function __construct() {
		$this->app_name = 'JS Quest';

		$this->html_main =	"<html lang='en' data-testmode='false'>".
				            "<head>".
				                "<meta charset='UTF-8'>".
				                "<title>".$this->app_name."</title>".
				                "<link rel='stylesheet' href='css/main.css'>".
				                "<link rel='icon'       href='img/icon.png'>".
				            "</head>".
				            "<body>".
				                "<script src='js/lib/jquery-3.1.1.min.js'></script>". # JQuery load before all other
				                "<script src='js/lib/jquery.color.js'></script>". # JQuery Color load before all other
				                "<script src='js/main/jsq_shared_memory.js'></script>". # Make sure this loads first
				                "<script src='js/main/jsq_html_manager.js'></script>". # Make sure to load html mgr second
				                "<script src='js/main/jsq_object_management.js'></script>". # Make sure to load obj mgmt third
				                "<script src='js/main/jsq_collision.js'></script>".
				                "<script src='js/main/jsq_generate_map.js'></script>".
				                "<script src='js/main/jsq_movement.js'></script>".
				                "<script src='js/main/jsq_npc_logic.js'></script>".
				                "<script src='js/main/jsq_player_movement.js'></script>".
				                "<script src='js/main/jsq_main.js'></script>". # Make sure to load the main last.
				            "</body>".
				        "</html>";

        $this->html_test =	"<html lang='en' data-testmode='true'>".
				            "<head>".
				                "<meta charset='UTF-8'>".
				                "<title>".$this->app_name."</title>".
				                "<link rel='stylesheet' href='css/main.css'>".
				            "</head>".
				            "<body>".
				                "<script src='js/lib/jquery-3.1.1.min.js'></script>". # JQuery, JQuery Color & QUNit load before all other
				                "<script src='js/lib/jquery.color.js'></script>".     # JQuery, JQuery Color & QUNit load before all other
				                "<script src='js/lib/qunit-2.1.1.js'></script>".	  # JQuery, JQuery Color & QUNit load before all other
				                "<script src='js/main/jsq_shared_memory.js'></script>". # Make sure to load the SM first
				                "<script src='js/main/jsq_html_manager.js'></script>". # Make sure to load html mgr second
				                "<script src='js/main/jsq_object_management.js'></script>". # Make sure to load obj mgmt third
				                "<script src='js/main/jsq_collision.js'></script>".
				                "<script src='js/main/jsq_generate_map.js'></script>".
				                "<script src='js/main/jsq_movement.js'></script>".
				                "<script src='js/main/jsq_npc_logic.js'></script>".
				                "<script src='js/main/jsq_player_movement.js'></script>".
				                "<script src='js/main/jsq_main.js'></script>". # Make sure to load the main last.
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