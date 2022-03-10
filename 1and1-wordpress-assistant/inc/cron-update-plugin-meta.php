<?php
// Do not allow direct access!
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

class One_And_One_Cron_Update_Plugin_Meta {

	public function __construct() {
		// Setup cronjob but only in Managed mode
		if ( oneandone_is_managed() ) {
			add_action( 'login_form', array( $this, 'setup_schedule_themes' ) );
			add_action( 'oneandone_cron_update_plugin_meta', array( $this, 'update_plugin_meta' ) );
			add_action( 'oneandone_cron_update_theme_meta', array( $this, 'update_theme_meta' ) );
		}
	}

	public function setup_schedule_plugins() {
		if ( ! wp_next_scheduled( 'oneandone_cron_update_plugin_meta' ) ) {
			wp_schedule_event( time(), 'daily', 'oneandone_cron_update_plugin_meta' );
		}
	}

	public function setup_schedule_themes() {
		if ( ! wp_next_scheduled( 'oneandone_cron_update_theme_meta' ) ) {
			wp_schedule_event( time(), 'daily', 'oneandone_cron_update_theme_meta' );
		}
	}

	public function update_plugin_meta( $plugin_slugs = false, $site_type = array() ) {
		include_once( One_And_One_Assistant::get_inc_dir_path().'installer.php' );

		if ( ! file_exists( One_And_One_Assistant::get_plugin_dir_path().'/cache' ) ) {
			mkdir( One_And_One_Assistant::get_plugin_dir_path().'/cache' );
		}

		if ( empty( $plugin_slugs ) ) {
			$plugin_slugs = One_And_One_Assistant_Installer::get_plugin_installation_paths();
		}

		$plugins_cache = array();

		foreach ( $plugin_slugs as $plugin_slug ) {
			$plugin = $this->get_plugin_meta_via_api( $plugin_slug );
			if ( ! empty( $plugin ) ) {
				$plugins_cache[$plugin_slug] = $plugin;
			}
		}

		if ( empty ( $site_type ) ) {
			$site_type = $this->getSiteTypes();
		}

		foreach ( $site_type as $type ) {
			file_put_contents( One_And_One_Assistant::get_plugin_dir_path().'/cache/plugin-'.$type.'-meta.txt', serialize( $plugins_cache ) );
		}
	}

	public function update_theme_meta( $themes = array(), $site_type = array() ) {
		if ( ! file_exists( One_And_One_Assistant::get_plugin_dir_path().'/cache' ) ) {
			mkdir( One_And_One_Assistant::get_plugin_dir_path().'/cache' );
		}

		if ( empty ( $themes ) ) {
			$themes = wp_prepare_themes_for_js();
		}

		if ( empty ( $site_type ) ) {
			$site_type = $this->getSiteTypes();
		}

		foreach ( $site_type as $type ) {
			file_put_contents( One_And_One_Assistant::get_plugin_dir_path().'/cache/theme-'.$type.'-meta.txt', serialize( $themes ) );
		}
	}

	private function getSiteTypes() {
		include_once( One_And_One_Assistant::get_inc_dir_path().'sitetype-filter.php' );
		$config = One_And_One_Assistant_Sitetype_Filter::get_config();

		$site_type = array();

		foreach ( $config as $key => $value ) {
			$site_type[] = $key;
		}

		return $site_type;
	}

	protected function get_plugin_meta_via_api( $plugin_slug ) {
		$url = $http_url = 'http://api.wordpress.org/plugins/info/1.0/';
		if ( $ssl = wp_http_supports( array( 'ssl' ) ) ) {
			$url = set_url_scheme( $url, 'https' );
		}

		$args = array(
			'action'  => 'plugin_information',
			'request' => serialize(
				(object) array(
					'slug'   => $plugin_slug,
					'fields' => array( 'short_description' => true, 'icons' => true )
				)
			)
		);

		$request = wp_remote_post( $url, array( 'body' => $args ) );

		if ( isset( $request['body'] ) && $request['body'] ) {
			$plugin = unserialize( $request['body'] );

			return $plugin;
		}

		return null;
	}
}

new One_And_One_Cron_Update_Plugin_Meta();
