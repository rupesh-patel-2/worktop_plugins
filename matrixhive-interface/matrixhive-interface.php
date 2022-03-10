<?php
/*
Plugin Name: Matrixhive Interface
Plugin URI: https://matrixhive.com 
Description: Matrixhive Interface by MatrixHive will create a bridge between wordpress and MatrixHive Products.
Version: 1.0.0
Author: Rupesh Patel
Author URI: https://matrixhive.com 
Text Domain: matrixhive-interface
Domain Path: /
License: GPL v3

Matrixhive Interface
Copyright (C) 2022-2029, Rupesh Patel, rupesh.patel@matrixhive.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Prevent direct file access
namespace MatrixHive;
defined('ABSPATH') or exit;


class Manager{

    static $inst = null;
    protected $plugins = [];
    protected $adminMenuItems = [];
    public static function inst(){
        if(self::$inst == null){
            self::$inst = new self();
            do_action('matrixhive_manager_call');
        }
        return self::$inst;
    }

    public static function configure(){
        $inst = self::inst();
        spl_autoload_register('MatrixHive\Manager::loadClass');
        $inst->addAdminMenues();
      //  var_dump($inst->plugins);
    }

    public static function loadClass($class){
        $parts = explode('\\',$class);
        if($parts[0] == "MatrixHive"){
            $inst  = self::inst();
            foreach($inst->plugins as $plugin){
                if(is_dir($plugin['base_class_path'])){
                    array_shift($parts);
                    $inst->checkForClassFile($plugin['base_class_path'],$parts);
                }
            }
        }
    }

    public function checkForClassFile($path,$parts){
        $file = array_shift($parts);
        $stakedPath = $path.'/'.$file;
        if(is_dir($stakedPath)){
            $this->checkForClassFile($stakedPath,$parts);
        }
        if(is_file($stakedPath.'.php')){
            include_once($stakedPath.'.php');
        }
    }

    public static function addPlugin($plugin = []){
        $inst = self::$inst;
        if(!empty($plugin)){
            $inst->plugins[] = $plugin;
        }
    }
    public static function registerMenues(){
        add_options_page( 
            "Worktop Warehouse", 
            "Worktop Warehouse", 
            "administrator", 
            "matrixhive_settings", 
            'MatrixHive\Manager::BasePage', 
            "",
            0
        );

        
        //$inst = self::inst();
        // For future : Rupesh
        /*foreach($inst->adminMenuItems as $index => $item){
            add_submenu_page( 
                'matrixhive_settings',
                isset($item['page_tile']) ? $item['page_tile'] : '',
                isset($item['menu_title']) ? $item['menu_title'] : '', 
                isset($item['capability']) ? $item['capability'] : 'administrator', 
                isset($item['menu_slug']) ? $item['menu_slug'] : '', 
                isset($item['function']) ? $item['function'] : '\MatrixHive\Manager::missingFunction', 
                isset($item['icon_url']) ? $item['icon_url'] : '', 
                isset($item['position']) ? $item['position'] : 1000, 
            );

            if(isset($item['settings'])){

            }
        }*/
    }

    public static function registerSettingSections(){
       

    }

    protected function addAdminMenues(){
        //add_action('admin_menu', 'MatrixHive\Manager::registerMenues');

        //add_action( 'admin_init', 'MatrixHive\Manager::registerSettingSections' );
    }
    public static function addAdminMenu(array $menuItem = []){
        self::inst()->adminMenuItems[] = $menuItem;
    }
    
    public function BasePage(){
    ?>
        <h1>
        <?php esc_html_e( 'Estimate managment system settings', 'matrixhive-settings' ); ?> </h1>
            <form method="POST" action="options.php">
            <?php
                settings_fields( 'matrixhive_settings' );
                do_settings_sections( 'matrixhive_settings' );
                submit_button();
            ?>
            </form>
    <?php
    }

    public function ConnectionSettings(){
        echo '<p>Insert settings to connect with the Estimate Management Admin</p>';
    }

    public static function missingFunction(){
        echo "<h1>Function to render the admin page was not supplied for this page<h1>";
    }
}


add_action('matrixhive_manager_call', function(){
    
    // Anounce the base path of your classes to Matrixhive\Manager
    // it will autoload them when required 
    \MatrixHive\Manager::addPlugin([
        'slug' => 'matrixhive-interface',
        'base_class_path' => realpath( __DIR__.'/classes')
    ]);

   /* \MatrixHive\Manager::addAdminMenu([
        'page_title' => 'WortTopWareHouse',
        'menu_title' => 'WortTopWareHouse',
        'capability' => 'administrator',
        'menu_slug' => 'worktop_settings',
        //'function' => 'MatrixHive\Test::fun',
        'icon_url' => '',
        'position' => 0,
    ]);*/
});

Manager::configure();





function my_admin_menu() {
    add_menu_page(
        __( 'Worktop Warehouse', 'my-textdomain' ),
        __( 'Estimate Management', 'my-textdomain' ),
        'manage_options',
        'sample-page',
        '\MatrixHive\my_admin_page_contents',
        'dashicons-schedule',
        0
    );
}
add_action( 'admin_menu', '\MatrixHive\my_admin_menu' );

function my_admin_page_contents() {
    ?>
    <h1> <?php esc_html_e( 'Estimate Managment Settings', 'my-plugin-textdomain' ); ?> </h1>
    <form method="POST" action="options.php">
    <?php
    settings_fields( 'sample-page' );
    do_settings_sections( 'sample-page' );
    submit_button();
    ?>
    </form>
    <?php
}


add_action( 'admin_init', '\MatrixHive\my_settings_init' );

function my_settings_init() {

    add_settings_section(
        'sample_page_setting_section',
        __( 'Custom settings', 'my-textdomain' ),
        '\MatrixHive\my_setting_section_callback_function',
        'sample-page'
    );

		add_settings_field(
		   'estimate_admin_url',
		   __( 'Admin Url', 'my-textdomain' ),
		   '\MatrixHive\my_setting_markup',
		   'sample-page',
		   'sample_page_setting_section'
		);

        register_setting( 'sample-page', 'estimate_admin_url' );


        add_settings_field(
            'getaddress_io_key',
            __( 'Getaddress Api Key', 'my-textdomain' ),
            '\MatrixHive\getaddress_io_key_markup',
            'sample-page',
            'sample_page_setting_section'
        );

        register_setting( 'sample-page', 'getaddress_io_key' );
		
}


function my_setting_section_callback_function() {
    echo '<p>Insert Connection details to Estimate Managment</p>';
}


function my_setting_markup() {
    ?>
    <input type="text" id="estimate_admin_url" name="estimate_admin_url" value="<?php echo get_option( 'estimate_admin_url' ); ?>">
    <?php
}

function getaddress_io_key_markup() {
    ?>
    <input type="text" id="getaddress_io_key" name="getaddress_io_key" value="<?php echo get_option( 'getaddress_io_key' ); ?>">
    <?php
}


//echo "here";
add_action('wp_ajax_estimate_login',        '\MatrixHive\Login::Login');
add_action('wp_ajax_nopriv_estimate_login', '\MatrixHive\Login::Login');

add_action('wp_ajax_find_addresses',        '\MatrixHive\Address::findAddress');
add_action('wp_ajax_nopriv_find_addresses', '\MatrixHive\Address::findAddress');

