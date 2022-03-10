<?php

class FrmProAppController {

    public static function load_lang() {
        load_plugin_textdomain( 'formidable-pro', false, FrmProAppHelper::plugin_folder() . '/languages/' );
    }

	/**
	 * Use in-plugin translations instead of WP.org
	 *
	 * @since 2.2.8
	 * @codeCoverageIgnore
	 */
	public static function load_translation( $mo_file, $domain ) {
		_deprecated_function( __FUNCTION__, '3.0' );
		return $mo_file;
	}

    public static function create_taxonomies() {
        register_taxonomy( 'frm_tag', 'formidable', array(
            'hierarchical' => false,
            'labels' => array(
                'name' => __( 'Formidable Tags', 'formidable-pro' ),
                'singular_name' => __( 'Formidable Tag', 'formidable-pro' ),
            ),
            'public' => true,
            'show_ui' => true,
        ) );
    }

	/**
	 * Set the location for the combo js
	 *
	 * @since 3.01
	 */
	public static function pro_js_location( $location ) {
		$location['new_file_path'] = FrmProAppHelper::plugin_path() . '/js';
		return $location;
	}

	public static function combine_js_files( $files ) {
		$pro_js = self::get_pro_js_files('.min');
		foreach ( $pro_js as $js ) {
			$files[] = FrmProAppHelper::plugin_path() . $js['file'];
		}

		return $files;
	}

	/**
	 * @since 3.01
	 */
	public static function has_combo_js_file() {
		return is_readable( FrmProAppHelper::plugin_path() . '/js/frm.min.js' );
	}

	public static function register_scripts() {
		$suffix = FrmAppHelper::js_suffix();
		$pro_js = self::get_pro_js_files();

		if ( empty( $suffix ) || ! FrmFormsController::has_combo_js_file() ) {
			foreach ( $pro_js as $js_key => $js ) {
				wp_register_script( $js_key, FrmProAppHelper::plugin_url() . $js['file'], $js['requires'], $js['version'], true );
			}
		} else {
			wp_deregister_script( 'formidable' );
			wp_register_script( 'formidable', FrmProAppHelper::plugin_url() . '/js/frm.min.js', array( 'jquery' ), $pro_js['formidablepro']['version'], true );
		}
		FrmAppHelper::localize_script( 'front' );
	}

	public static function get_pro_js_files( $suffix = '' ) {
		$version = FrmProDb::$plug_version;
		if ( $suffix == '' ) {
			$suffix = FrmAppHelper::js_suffix();
		}

		return array(
			'formidablepro' => array(
				'file'     => '/js/formidablepro' . $suffix . '.js',
				'requires' => array( 'jquery', 'formidable' ),
				'version'  => $version,
			),
			'dropzone' => array(
				'file'     => '/js/dropzone.min.js',
				'requires' => array( 'jquery' ),
				'version'  => '5.5.0',
			),
			'jquery-chosen' => array(
				'file'     => '/js/chosen.jquery.min.js',
				'requires' => array( 'jquery' ),
				'version'  => '1.8.7',
			),
			'jquery-maskedinput' => array(
				'file'     => '/js/jquery.maskedinput.min.js',
				'requires' => array( 'jquery' ),
				'version'  => '1.4',
			),
		);
	}

	/**
	 * @since 2.05.07
	 */
	public static function admin_bar_configure() {
		if ( is_admin() || ! current_user_can( 'frm_edit_forms' ) ) {
			return;
		}

		self::maybe_change_post_link();

		$actions = array();

		self::add_views_to_admin_bar( $actions );
		self::add_entry_to_admin_bar( $actions );

		if ( empty( $actions ) ) {
			return;
		}

		self::maybe_add_parent_admin_bar();

		global $wp_admin_bar;

		foreach ( $actions as $id => $action ) {
			$wp_admin_bar->add_node( array(
				'parent' => 'frm-forms',
				'title'  => $action['name'],
				'href'   => $action['url'],
				'id'     => 'edit_' . $id,
			) );
		}
	}

	/**
	 * If the post is edited by the entry, use the entry edit link
	 * instead of the post link.
	 *
	 * @since 4.0
	 */
	private static function maybe_change_post_link() {
		global $wp_admin_bar, $post;

		if ( ! $post ) {
			return;
		}

		$display_id = get_post_meta( $post->ID, 'frm_display_id', true );
		if ( empty( $display_id ) ) {
			return;
		}

		$entry_id  = FrmDb::get_var( 'frm_items', array( 'post_id' => $post->ID ) );
		$edit_node = $wp_admin_bar->get_node( 'edit' );
		if ( ! empty( $edit_node ) && $entry_id ) {
			$edit_node->href = admin_url( 'admin.php?page=formidable-entries&frm_action=edit&id=' . $entry_id );
			$wp_admin_bar->add_node( $edit_node );
		}
	}

	/**
	 * @since 2.05.07
	 */
	private static function maybe_add_parent_admin_bar() {
		global $wp_admin_bar;
		$has_node = $wp_admin_bar->get_node( 'frm-forms' );
		if ( ! $has_node ) {
			FrmFormsController::add_menu_to_admin_bar();
		}
	}

	/**
	 * @since 2.05.07
	 */
	private static function add_views_to_admin_bar( &$actions ) {
		global $frm_vars;

		if ( isset( $frm_vars['views_loaded'] ) && ! empty( $frm_vars['views_loaded'] ) ) {
			foreach ( $frm_vars['views_loaded'] as $id => $name ) {
				$actions[ 'view_' . $id ] = array(
					'name' => sprintf( __( '%s View', 'formidable' ), $name ),
					'url'  => admin_url( 'post.php?post=' . intval( $id ) . '&action=edit' ),
				);
			}

			asort( $actions );
		}
	}

	/**
	 * @since 2.05.07
	 */
	private static function add_entry_to_admin_bar( &$actions ) {
		global $post;

		if ( is_singular() && ! empty( $post ) ) {
			$entry_id = FrmDb::get_var( 'frm_items', array( 'post_id' => $post->ID ), 'id' );
			if ( ! empty( $entry_id ) ) {
				$actions[ 'entry_' . $entry_id ] = array(
					'name' => __( 'Edit Entry', 'formidable' ),
					'url'  => FrmProEntry::admin_edit_link( $entry_id ),
				);
			}
		}
	}

	public static function form_nav( $nav, $atts ) {
		$form_id = absint( $atts['form_id'] );

		$nav[] = array(
			'link'    => admin_url( 'edit.php?post_type=frm_display&frm-full=1&form=' . $form_id . '&show_nav=1' ),
			'label'   => __( 'Views', 'formidable-pro' ),
			'current' => array(),
			'page'    => 'frm_display',
			'permission' => 'frm_edit_displays',
		);

		$reports = array(
			'link'    => admin_url( 'admin.php?page=formidable&frm_action=reports&frm-full=1&form=' . $form_id . '&show_nav=1' ),
			'label'   => __( 'Reports', 'formidable-pro' ),
			'current' => array( 'reports' ),
			'page'    => 'formidable',
			'permission' => 'frm_view_reports',
		);

		$has_entries = FrmDb::get_var( 'frm_items', array( 'form_id' => $form_id ) );
		if ( $has_entries ) {
			$nav[] = $reports;
		}

		return $nav;
	}

	/**
	 * Change the icon on the menu if set
	 *
	 * @since 3.05
	 */
	public static function whitelabel_icon( $icon ) {
		$class = self::get_icon_class();
		if ( empty( $class ) ) {
			return $icon;
		}

		$icon = str_replace( 'dashicons ', '', $class );
		$icon = str_replace( 'frmfont ', '', $icon );
		if ( $icon === 'frm_white_label_icon' ) {
			$svg  = self::whitelabel_svg();
			$icon = 'data:image/svg+xml;base64,' . base64_encode( $svg );
		}

		return $icon;
	}

	private static function whitelabel_svg() {
		return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
<path fill="currentColor" d="M18.1 1.3H2C.9 1.3 0 2 0 3V17c0 1 .8 1.9 1.9 1.9H18c1 0 1.9-.9 1.9-2V3.2c0-1-.8-1.9-1.9-1.9zM18 16.9H2a.2.2 0 0 1-.2-.3V3.4c0-.2 0-.3.2-.3H18c.1 0 .2.1.2.3v13.2c0 .2 0 .3-.2.3zm-1.6-3.6v1c0 .2-.3.4-.5.4H8a.5.5 0 0 1-.5-.5v-1c0-.2.2-.4.5-.4h7.8c.2 0 .4.2.4.5zm0-3.8v1c0 .2-.3.4-.5.4H8a.5.5 0 0 1-.5-.4v-1c0-.2.2-.4.5-.4h7.8c.2 0 .4.2.4.4zm0-3.7v1c0 .2-.3.4-.5.4H8a.5.5 0 0 1-.5-.5v-1c0-.2.2-.4.5-.4h7.8c.2 0 .4.2.4.5zm-9.9.5a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0zm0 3.7a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0zm0 3.8a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0z"/>
</svg>';
	}
	/**
	 * Change the icon on the editor button if set
	 *
	 * @since 3.05
	 */
	public static function whitelabel_media_icon( $icon ) {
		$class = self::get_icon_class();
		if ( ! empty( $class ) ) {
			$icon = '<span class="' . esc_attr( $class ) . ' wp-media-buttons-icon"></span>';
		}
		return $icon;
	}

	/**
	 * @since 3.05
	 */
	private static function get_icon_class() {
		$settings = FrmProAppHelper::get_settings();
		return $settings->menu_icon;
	}

	public static function drop_tables( $tables ) {
		global $wpdb;
		$tables[] = $wpdb->prefix . 'frm_display';
		return $tables;
	}

	public static function set_get( $atts, $content = '' ) {
		if ( empty( $atts ) ) {
			return;
		}

		if ( isset( $atts['param'] ) && $content !== '' ) {
			$atts[ $atts['param'] ] = do_shortcode( $content );
			unset( $atts['param'] );
		}

		foreach ( $atts as $att => $val ) {
			$_GET[ $att ] = $val;
			unset( $att, $val );
		}
	}

	public static function load_genesis() {
        //trigger Genesis hooks for integration
        FrmProAppHelper::load_genesis();
    }

	/**
	 * Returns an array of attribute names and associated methods for processing conditions
	 *
	 * @return array
	 */
	private static function get_methods_for_frm_condition_shortcode() {
		$methods = array(
			'stats'       => array( 'FrmProStatisticsController', 'stats_shortcode' ),
			'field-value' => array( 'FrmProEntriesController', 'get_field_value_shortcode' ),
			'param'       => array( 'FrmFieldsHelper', 'process_get_shortcode' ),
		);

		return apply_filters( 'frm_condition_methods', $methods );
	}

	/**
	 * Returns an array of atts with any conditions removed
	 *
	 * @return array
	 */
	private static function remove_conditions_from_atts( $atts ) {
		$conditions = FrmProContent::get_conditions();

		foreach ( $conditions as $condition ) {
			if ( isset( $atts[ $condition ] ) ) {
				unset( $atts[ $condition ] );
			}
		}
		unset( $condition );

		return $atts;
	}

	/**
	 * Retrieves the value of the left side of the conditional in the frm-condition shortcode
	 *
	 * @param $atts
	 *
	 * @return array|bool|mixed|null|object|string
	 */
	private static function get_value_for_frm_condition_shortcode( $atts ) {
		$value  = '';
		$source = 'stats';
		if ( isset( $atts['source'] ) ) {
			$source = $atts['source'] ? $atts['source'] : $source;
			unset( $atts['source'] );
		}

		$methods         = self::get_methods_for_frm_condition_shortcode();
		$processing_atts = self::remove_conditions_from_atts( $atts );

		if ( isset( $methods[ $source ] ) ) {
			$value = call_user_func( $methods[ $source ], $processing_atts );
		} else {
			global $shortcode_tags;
			if ( isset( $shortcode_tags[ $source ] ) && is_callable( $shortcode_tags[ $source ] ) ) {
				$content = isset( $atts['content'] ) ? $atts['content'] : '';
				$value   = call_user_func( $shortcode_tags[ $source ], $processing_atts, $content, $source );
			}
		}

		return $value;
	}

	/**
	 * Conditional shortcode, used with stats, field values, and params or any other shortcode.
	 *
	 * @since 3.01
	 *
	 * @param $atts
	 * @param string $content
	 *
	 * @return string
	 */
	public static function frm_condition_shortcode( $atts, $content = '' ) {
		$value       = self::get_value_for_frm_condition_shortcode( $atts );
		$new_content = FrmProContent::conditional_replace_with_value( $value, $atts, '', 'custom' );

		if ( $new_content === '' ) {
			return '';
		} else {
			$content = do_shortcode( $content );

			return $content;
		}
	}

	/**
	 * @since 3.04.02
	 */
	public static function remove_upsells() {
		if ( is_callable( 'FrmAppController::remove_upsells' ) ) {
			FrmAppController::remove_upsells();
		} else {
			remove_action( 'frm_before_settings', 'FrmSettingsController::license_box' );
		}
	}

	/**
	 * Show a message if Pro is installed but not activated.
	 *
	 * @since 3.06.02
	 */
	public static function admin_notices() {
		$is_settings_page = FrmAppHelper::simple_get( 'page', 'sanitize_text_field' ) === 'formidable-settings';
		if ( $is_settings_page ) {
			return;
		}
		?>
		<div class="error">
			<p>
			<?php
			printf(
				/* translators: %1$s: Start link HTML, %2$s: End link HTML */
				__( 'Formidable Forms Pro is installed, but not yet activated. %1$sAdd your license key now%2$s to start enjoying all the Pro features.', 'formidable' ),
				'<a href="' . esc_url( admin_url( 'admin.php?page=formidable-settings' ) ) . '">',
				'</a>'
			);
			?>
			</p>
		</div>
		<?php
	}
}
