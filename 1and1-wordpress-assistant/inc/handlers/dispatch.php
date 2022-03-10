<?php
/** Do not allow direct access! */
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Forbidden' );
}

/**
 * Class One_And_One_Assistant_Handler_Dispatch
 * Computes and shows to the corresponding view of the Assistant in the WP Admin
 */
class One_And_One_Assistant_Handler_Dispatch {

	/** WP Admin page ID for the Assistant */
	const ASSISTANT_PAGE_ID = '1and1-wordpress-wizard';

	/**
	 * Start and configure the Wizard
	 */
	public static function admin_init() {

		// Load Assistant single page
		add_action( 'admin_head', array( 'One_And_One_Assistant_Handler_Dispatch', 'load_assistant_page' ) );

		// Configure AJAX hook for the themes loading
		add_action( 'wp_ajax_ajaxload', array( 'One_And_One_Assistant_Handler_Dispatch', 'load_recommended_themes' ) );

		// Configure AJAX hook for the plugins & themes installation
		add_action( 'wp_ajax_ajaxinstall', array( 'One_And_One_Assistant_Handler_Dispatch', 'install_plugins_and_themes' ) );

		// Add Assistant scripts
		add_action( 'admin_enqueue_scripts', array( 'One_And_One_Assistant_Handler_Dispatch', 'enqueue_assistant_scripts' ) );

		// Add styles and fonts for the new Assistant design
		if ( self::is_assistant_admin_page() ) {
			add_action( 'admin_enqueue_scripts', array( 'One_And_One_Assistant_Handler_Dispatch', 'enqueue_assistant_styles' ) );
		}

		// Create and configure the wizard page in the admin area
		add_action( 'admin_menu', array( 'One_And_One_Assistant_Handler_Dispatch', 'add_admin_menu_wizard_page' ), 5 );
		add_action( 'admin_bar_menu', array( 'One_And_One_Assistant_Handler_Dispatch', 'add_admin_top_bar_wizard_menu' ), 70 );
	}

	/**
	 * Check if we are in the Assistant context
	 *
	 * @return boolean
	 */
	public static function is_assistant_admin_page() {
		return ( isset( $_GET[ 'page' ] ) && ( $_GET[ 'page' ] === self::ASSISTANT_PAGE_ID ) );
	}

	/**
	 * Create and configure the wizard page in the admin area
	 * WP Hook https://codex.wordpress.org/Plugin_API/Action_Reference/admin_menu
	 */
	public static function add_admin_menu_wizard_page() {
		global $menu;

		$pos   = 50;
		$posp1 = $pos + 1;

		while ( isset( $menu[ $pos ] ) || isset( $menu[ $posp1 ] ) ) {
			$pos ++;
			$posp1 = $pos + 1;

			/** check that there is no menu at our level neither at ourlevel+1 because that will make us disappear in some case */
			if ( ! isset( $menu[ $pos ] ) && isset( $menu[ $posp1 ] ) ) {
				$pos = $pos + 2;
			}
		}

		add_menu_page(
			__( '1&1 WP Assistant', '1and1-wordpress-wizard' ),
			__( '1&1 WP Assistant', '1and1-wordpress-wizard' ),
			'manage_options',
			self::ASSISTANT_PAGE_ID,
			function() {},
			'none',
			$pos
		);

	}

	/**
	 * Add an extra menu item in the top admin bar
	 * https://codex.wordpress.org/Class_Reference/WP_Admin_Bar/add_menu
	 */
	public static function add_admin_top_bar_wizard_menu() {
		global $wp_admin_bar;

		if ( get_current_screen()->id == get_plugin_page_hookname( self::ASSISTANT_PAGE_ID, '' ) ) {
			$class = 'current';
		} else {
			$class = '';
		}

		$title_element = sprintf(
			"<span class='ab-icon'></span>" .
			"<span class='ab-label'>%s</span>",
			__( '1&1 WP Assistant', '1and1-wordpress-wizard' )
		);

		$wp_admin_bar->add_menu(
			array(
				'parent' => null,
				'id'     => self::ASSISTANT_PAGE_ID,
				'title'  => $title_element,
				'href'   => admin_url(
					add_query_arg( 'page', self::ASSISTANT_PAGE_ID, 'admin.php' )
				),
				'meta'   => array(
					'class' => $class
				)
			)
		);
	}

	/**
	 * Handle status change of the wizard anywhere in the admin area (via GET parameters)
	 * WP Hook https://codex.wordpress.org/Plugin_API/Action_Reference/admin_init
	 */
	public static function handle_assistant_params() {

		/** reset the wizard (restart from the beginning) */
		if ( isset( $_GET['1and1-wordpress-wizard-reset'] ) ) {
			delete_option( 'oneandone_assistant_completed' );
			delete_option( 'oneandone_assistant_sitetype' );
		}

		/** skip the wizard completely (the user won't be bother by it anymore) */
		if ( isset( $_GET['1and1-wordpress-wizard-cancel'] ) ) {
			update_option( 'oneandone_assistant_completed', true );
		}
	}

	/**
	 * Load the themes list for a given site type (AJAX)
	 */
	public static function load_recommended_themes() {

		if ( isset( $_POST[ 'site_type' ] ) ) {
			$site_type = sanitize_text_field( $_POST['site_type'] );

			One_And_One_Assistant_View::load_template( 'parts/site-type-theme-list', array(
				'site_type' => $site_type
			) );
		}
		die;
	}

	/**
	 * Install selected plugins and themes (AJAX)
	 */
	public static function install_plugins_and_themes() {

		$sitetype_transient = 'oneandone_assistant_process_sitetype_user_' . get_current_user_id();
		$theme_transient = 'oneandone_assistant_process_theme_user_' . get_current_user_id();

		if ( isset( $_POST['site_type'] ) && isset( $_POST['theme'] ) ) {

			/** Increase PHP limits to avoid timeouts and memory limits */
			@ini_set( 'error_reporting', 0 );
			@ini_set( 'memory_limit', '256M' );
			@set_time_limit( 300 );

			include_once( One_And_One_Assistant::get_inc_dir_path().'plugin-manager.php' );
			include_once( One_And_One_Assistant::get_inc_dir_path().'plugin-adapter.php' );

			$site_type = sanitize_text_field( $_POST['site_type'] );
			$theme  = sanitize_text_field( $_POST['theme'] );

			$plugin_manager = new One_And_One_Assistant_Plugin_Manager( $site_type );

			/** Check nonce */
			check_admin_referer( 'activate' );

			// Activate / install chosen theme
			$plugin_manager->setup_theme( $theme );

			// Activate / install recommended plugins with the chosen site type
			$plugin_slugs = One_And_One_Assistant_Sitetype_Filter::get_plugins_slugs( $site_type, 'recommended' );
			$plugin_manager->setup_plugins( $plugin_slugs );

			/** store assistant is completed */
			update_option( 'oneandone_assistant_completed', true );

			/** store website type in db */
			update_option( 'oneandone_assistant_sitetype', $site_type );

			// Store plugins and theme
			$plugins_imploded = implode( ',', $plugin_slugs );
			update_option( 'oneandone_assistant_plugins', $plugins_imploded );
			update_option( 'oneandone_assistant_theme', $theme );

			delete_transient( $sitetype_transient );
			delete_transient( $theme_transient );

			wp_send_json_success(
				array(
					'referer' => 'customize.php?return=' . home_url()
				)
			);
		}
	}

	/**
	 * Register the CSS and fonts for the new Assistant design
	 * (used in the Assistant & Login)
	 *
	 * @param boolean $dequeue_default
	 */
	public static function enqueue_assistant_styles( $dequeue_default = true ) {

		// Remove WP standard CSS
		if ( $dequeue_default ) {
			wp_deregister_style( 'wp-admin' );
		}

		// Assistant CSS
		wp_enqueue_style( '1and1-wp-assistant', One_And_One_Assistant::get_css_url( 'assistant.css' ) );
	}

	/**
	 * Register JS scripts for the Assistant
	 */
	public static function enqueue_assistant_scripts() {

		// Add the assistant JS scripts for use case filter + installation
		wp_enqueue_script( '1and1-wp-assistant', One_And_One_Assistant::get_js_url( 'assistant.js' ), array( 'jquery', 'wp-util' ), false, true );

		// Configure the AJAX object for the assistant scripts
		wp_localize_script( '1and1-wp-assistant', 'ajax_assistant_object', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' )
		) );
	}

	/**
	 * Show the single-page Assistant
	 * (Load specific view if a current action is given)
	 */
	public static function load_assistant_page() {

		// Handle status change of the wizard
		self::handle_assistant_params();

		// Only call our process in the Assistant Admin page!
		if ( self::is_assistant_admin_page() ) {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die( __( 'Sorry, you do not have permission to access the 1&1 WP Assistant.', '1and1-wordpress-wizard' ) );
			}

			One_And_One_Assistant_View::load_template( 'assistant' );
			exit;
		}
	}
}
