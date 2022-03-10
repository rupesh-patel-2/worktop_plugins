<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://www.wpmaniax.com
 * @since             1.0.0
 * @package           Wp_Snow_Effect
 *
 * @wordpress-plugin
 * Plugin Name:       WP Snow Effect
 * Plugin URI:        http://www.wpmaniax.com/seasonal-plugins
 * Description:       Add nice looking animation effect of falling snow to your Wordpress site and enjoy winter.
 * Version:           1.1.15
 * Author:            WPManiax
 * Author URI:        http://www.wpmaniax.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-snow-effect
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wp-snow-effect-activator.php
 */
function activate_wp_snow_effect()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-wp-snow-effect-activator.php';
	Wp_Snow_Effect_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wp-snow-effect-deactivator.php
 */
function deactivate_wp_snow_effect()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-wp-snow-effect-deactivator.php';
	Wp_Snow_Effect_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_wp_snow_effect');
register_deactivation_hook(__FILE__, 'deactivate_wp_snow_effect');


/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-wp-snow-effect.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_wp_snow_effect()
{

	$plugin = new Wp_Snow_Effect();
	$plugin->run();
}
run_wp_snow_effect();
