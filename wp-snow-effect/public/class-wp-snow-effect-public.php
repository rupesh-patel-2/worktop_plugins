<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://www.wpmaniax.com
 * @since      1.0.0
 *
 * @package    Wp_Snow_Effect
 * @subpackage Wp_Snow_Effect/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Wp_Snow_Effect
 * @subpackage Wp_Snow_Effect/public
 * @author     WPManiax <plugins@wpmaniax.com>
 */
class Wp_Snow_Effect_Public
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;

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
     * @param      string $plugin_name The name of the plugin.
     * @param      string $version The version of this plugin.
     */
    public function __construct($plugin_name, $version)
    {
        $default_settings = 'a:16:{s:19:"settings_flakes_num";s:2:"30";s:26:"settings_falling_speed_min";s:1:"1";s:26:"settings_falling_speed_max";s:1:"3";s:23:"settings_flake_min_size";s:2:"10";s:23:"settings_flake_max_size";s:2:"20";s:22:"settings_vertical_size";s:3:"800";s:18:"settings_fade_away";s:1:"1";s:21:"settings_show_on_home";s:4:"home";s:22:"settings_show_on_pages";s:5:"pages";s:22:"settings_show_on_posts";s:5:"posts";s:25:"settings_show_on_archives";s:8:"archives";s:23:"settings_show_on_mobile";s:6:"mobile";s:21:"settings_on_spec_page";s:0:"";s:19:"settings_flake_type";s:6:"#10053";s:21:"settings_flake_zindex";s:6:"100000";s:20:"settings_flake_color";s:7:"#efefef";}';
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->settings = wpsf_get_settings('snoweffect');
        if ($this->settings == '') $this->settings = unserialize($default_settings);
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
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

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/wp-snow-effect-public.css', array(), $this->version, 'all');

    }

    /**
     * Register the JavaScript for the public-facing side of the site.
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
        wp_enqueue_script('jsnow', plugin_dir_url(__FILE__) . 'js/jsnow.js', array('jquery'), '1.5');
        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/wp-snow-effect-public.js', array('jquery'), $this->version, false);

        $show = true;
        if (wp_is_mobile() && $this->settings['settings_show_on_mobile'] != 'mobile') $show = false;
        if (is_home() && $this->settings['settings_show_on_home'] != 'home') $show = false;
        if (is_page() && $this->settings['settings_show_on_pages'] != 'pages') $show = false;
        if (is_single() && $this->settings['settings_show_on_posts'] != 'posts') $show = false;
        if (is_archive() && $this->settings['settings_show_on_archives'] != 'archives') $show = false;

        wp_localize_script($this->plugin_name, 'snoweffect', array(
            'show' => $show,
            'flakes_num' => $this->settings['settings_flakes_num'],
            'falling_speed_min' => $this->settings['settings_falling_speed_min'],
            'falling_speed_max' => $this->settings['settings_falling_speed_max'],
            'flake_max_size' => $this->settings['settings_flake_max_size'],
            'flake_min_size' => $this->settings['settings_flake_min_size'],
            'vertical_size' => $this->settings['settings_vertical_size'],
            'flake_color' => $this->settings['settings_flake_color'],
            'flake_zindex' => $this->settings['settings_flake_zindex'],
            'flake_type' => $this->settings['settings_flake_type'],
            'fade_away' => ($this->settings['settings_fade_away'] == '1')
        ));

    }

}
