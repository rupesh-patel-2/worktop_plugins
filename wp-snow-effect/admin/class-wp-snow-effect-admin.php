<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.wpmaniax.com
 * @since      1.0.0
 *
 * @package    Wp_Snow_Effect
 * @subpackage Wp_Snow_Effect/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Wp_Snow_Effect
 * @subpackage Wp_Snow_Effect/admin
 * @author     WPManiax <plugins@wpmaniax.com>
 */
class Wp_Snow_Effect_Admin
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;
    public $loader;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string $plugin_name The name of this plugin.
     * @param      string $version The version of this plugin.
     */
    public function __construct($plugin_name, $version)
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

        $this->settings = wpsf_get_settings('snoweffect');

    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Wp_Snow_Effect_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Wp_Snow_Effect_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/wp-snow-effect-admin.css', array(), $this->version, 'all');
        //wp_enqueue_script( array("jquery", "jquery-ui-core", "interface", "jquery-ui-sortable", "wp-lists", "jquery-ui-sortable") );
    }

    public function init_settings()
    {

        $this->wpsf->add_settings_page(array(
            'parent_slug' => 'options-general.php',
            'page_title' => __('WP Snow Effect'),
            'menu_title' => __('WP Snow Effect')
        ));
    }


    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Wp_Snow_Effect_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Wp_Snow_Effect_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/wp-snow-effect-admin.js', array('jquery'), $this->version, false);

    }

    public function admin_notices()
    {
        if ($notices = get_option('wp_snow_effect_admin_notices')) {
            foreach ($notices as $notice) {
                echo "<div class='updated'><p>$notice</p></div>";
            }
            delete_option('wp_snow_effect_admin_notices');
        }
    }

    public function wp_snow_effect_check_installation_date()
    {
        $nobug = "";
        $nobug = get_option('wpse_no_bug');

        if (!$nobug) {

            $install_date = get_option('wp_snow_effect_activation_date');
            $past_date = strtotime('-7 days');

            if ($past_date >= $install_date) {

                //add_action( 'admin_notices', 'wp_snow_effect_display_admin_notice' );
                //$this->loader->add_action('admin_notices', $this, 'wp_snow_effect_display_admin_notice');
                $reviewurl = 'https://wordpress.org/support/plugin/wp-snow-effect/reviews/#new-post';
                $nobugurl = get_admin_url() . '?wpsenobug=1';

                $notices = get_option('wp_snow_effect_admin_notices', array());
                $str = "You have been using <b>WP Snow Effect</b> plugin for a week now, do you like it? If so, please leave us a review with your feedback! <a href=\"" . $reviewurl . "\" target=\"_blank\">Leave A Review</a> | <a href=\"" . $nobugurl . "\">Leave Me Alone</a>";
                if(!in_array($str,$notices)) $notices[] = $str;
                update_option('wp_snow_effect_admin_notices', $notices);

            }
        }
    }

    public function wp_snow_effect_set_no_bug() {
        $nobug = "";

        if ( isset( $_GET['wpsenobug'] ) ) {
            $nobug = esc_attr( $_GET['wpsenobug'] );
        }

        if ( 1 == $nobug ) {

            update_option( 'wpse_no_bug', TRUE );
            $notices = get_option('wp_snow_effect_admin_notices');

            $reviewurl = 'https://wordpress.org/support/plugin/wp-snow-effect/reviews/#new-post';
            $nobugurl = get_admin_url() . '?wpsenobug=1';
            $str = "You have been using <b>WP Snow Effect</b> plugin for a week now, do you like it? If so, please leave us a review with your feedback! <a href=\"" . $reviewurl . "\" target=\"_blank\">Leave A Review</a> | <a href=\"" . $nobugurl . "\">Leave Me Alone</a>";
            if(in_array($str,$notices)) {
                $notices = array_diff($notices,array($str));
                update_option('wp_snow_effect_admin_notices', $notices);
            }

        }
    }

}
