<?php
// Do not allow direct access!
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Forbidden' );
}

include_once( ABSPATH . '/wp-admin/includes/plugin.php' );
include_once( ABSPATH . '/wp-admin/includes/class-wp-upgrader.php' );
include_once 'automatic-installer-skin.php';

class One_And_One_Assistant_Installer {

	/**
	 * Install a plugin package
	 *
	 * @param  stdClass $plugin_meta
	 * @return boolean
	 */
	static public function install_plugin( $plugin_meta ) {
		$upgrader = new Plugin_Upgrader( new One_And_One_Automatic_Installer_Skin() );

		return (bool) $upgrader->install( $plugin_meta->download_link );
	}

	/**
	 * Update an existing (= installed) plugin
	 *
	 * @param  string $plugin_path
	 * @return boolean
	 */
	static public function update_plugin( $plugin_path ) {
		$upgrader = new Plugin_Upgrader( new One_And_One_Automatic_Installer_Skin() );

		return (bool) $upgrader->upgrade( $plugin_path );
	}

	/**
	 * Get the list of installation paths from given plugins (in the plugins directory)
	 *
	 * @param  array $plugin_slugs
	 * @return array
	 */
	static public function get_plugin_installation_paths( $plugin_slugs = array() ) {

		/** @todo check if this is really needed to get the last state of the plugins? */
		wp_clean_plugins_cache( true );

		$plugins = get_plugins();
		$plugins_installed = array();

		foreach ( $plugins as $plugin_path => $plugin ) {
			$parts = explode( '/', $plugin_path );

			if ( empty( $plugin_slugs ) || in_array( $parts[0], $plugin_slugs ) ) {
				$plugins_installed[ $plugin_path ] = $parts[0];
			}
		}

		return $plugins_installed;
	}

	/**
	 * Install a theme package
	 *
	 * @param  string $theme_meta
	 * @return boolean
	 */
	static public function install_theme( $theme_meta ) {
		$upgrader = new Theme_Upgrader( new One_And_One_Automatic_Installer_Skin() );

		return (bool) $upgrader->install( $theme_meta['download_link'] );
	}
}