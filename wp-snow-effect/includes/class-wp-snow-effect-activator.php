<?php

/**
 * Fired during plugin activation
 *
 * @link       http://www.wpmaniax.com
 * @since      1.0.0
 *
 * @package    Wp_Snow_Effect
 * @subpackage Wp_Snow_Effect/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Wp_Snow_Effect
 * @subpackage Wp_Snow_Effect/includes
 * @author     WPManiax <plugins@wpmaniax.com>
 */
class Wp_Snow_Effect_Activator
{

    /**
     * Short Description. (use period)
     *
     * Long Description.
     *
     * @since    1.0.0
     */
    public static function activate()
    {
        $notices= get_option('wp_snow_effect_admin_notices', array());
        $notices[]= "Please click <a href=\"".admin_url()."options-general.php?page=snoweffect-settings\"><b>here</b></a> to configure <b>WP Snow Effect</b>.";
        update_option('wp_snow_effect_admin_notices', $notices);

        $now = strtotime( "now" );
        update_option( 'wp_snow_effect_activation_date', $now );
    }

}
