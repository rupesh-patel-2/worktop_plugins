<?php
/*
Plugin Name: Weather Effect
Plugin URI: https://awplife.com/
Description: This is Weather Effect Widget.
Version: 1.3.9
Author: A WP Life
Author URI: https://awplife.com/
License: GPLv2 or later
Text Domain: weather-effect
Domain Path: /languages

Weather Effect is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

Weather Effect is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with User Registration. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
*/

define( 'WE_PLUGIN_PATH', plugin_dir_url( __FILE__ ) );

// Plugin Text Domain
define( 'WE_TXTD', 'weather-effect' );

// Load text domain
add_action( 'plugins_loaded', 'WE_load_textdomain' );

function WE_load_textdomain() {
	load_plugin_textdomain( 'weather-effect', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}

require_once 'settings.php';

// Default settings
function weather_effect_default_settings() {
	$weather_effect_settings = get_option( 'weather_effect_settings' );
	add_option( 'weather_effect_settings', $_POST );
}
register_activation_hook( __FILE__, 'weather_effect_default_settings' );

// load jQuery
function awplife_we_script() {
	wp_enqueue_script( 'jquery' );
}
add_action( 'wp_enqueue_scripts', 'awplife_we_script' );

function awplife_we_scripts_load_in_head() {
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'awplife-we-snow-christmas-snow-js', WE_PLUGIN_PATH . 'assets/js/christmas-snow/christmas-snow.js' );
	wp_enqueue_script( 'awplife-we-snow-snow-falling-js', WE_PLUGIN_PATH . 'assets/js/snow-falling/snow-falling.js' );
	wp_enqueue_script( 'awplife-we-snow-snowfall-master-js', WE_PLUGIN_PATH . 'assets/js/snowfall-master/snowfall-master.min.js', array( 'jquery' ), '', true );

	$weather_effect_settings = get_option( 'weather_effect_settings' );
	if ( isset( $weather_effect_settings['enable_weather_effect'] ) ) {
		$enable_weather_effect = $weather_effect_settings['enable_weather_effect'];
	} else {
		$enable_weather_effect = 1;
	}

	// check weather effect ON / OFF
	if ( $enable_weather_effect == 1 ) {
		require_once 'output.php';
	}
}
add_action( 'wp_head', 'awplife_we_scripts_load_in_head' );

