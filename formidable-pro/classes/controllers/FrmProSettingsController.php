<?php

class FrmProSettingsController {

	public static function license_box() {
		$edd_update = FrmProAppHelper::get_updater();
		$a = FrmAppHelper::simple_get( 't', 'sanitize_title', 'general_settings' );
		$show_creds_form = self::show_license_form();
		$errors = array();

		if ( ! empty( $edd_update->license ) ) {
			if ( class_exists( 'FrmFormApi' ) ) {
				$api = new FrmFormApi( $edd_update->license );
				$errors = $api->error_for_license();
			} elseif ( is_callable( 'FrmAddonsController::error_for_license' ) ) {
				$errors = FrmAddonsController::error_for_license( $edd_update->license );
			}
		}

		include( FrmAppHelper::plugin_path() . '/classes/views/shared/errors.php' );
		if ( $show_creds_form ) {
			$edd_update->pro_cred_form();
		}
	}

	public static function standalone_license_box() {
		$edd_update = FrmProAppHelper::get_updater();
		if ( self::show_license_form() ) {
			include( FrmProAppHelper::plugin_path() . '/classes/views/settings/standalone_license_box.php' );
		}
	}

	private static function show_license_form() {
		return ( ! is_multisite() || current_user_can( 'setup_network' ) || ! get_site_option( $edd_update->pro_wpmu_store ) );
	}

	/**
	 * @since 4.0
	 */
	public static function add_settings_section( $sections ) {
		add_action( 'frm_style_general_settings', 'FrmProSettingsController::general_style_settings' );
		add_action( 'frm_messages_settings_form', 'FrmProSettingsController::message_settings' );
		add_action( 'frm_settings_form', 'FrmProSettingsController::more_settings', 1 );

		$sections['white_label'] = array(
			'class'    => __CLASS__,
			'function' => 'white_label_settings',
			'name'     => isset( $sections['white_label'] ) ? $sections['white_label']['name'] : __( 'White Labeling', 'formidable' ),
			'icon'     => isset( $sections['white_label'] ) ? $sections['white_label']['icon'] : 'frm_icon_font frm_ghost_icon',
		);

		return $sections;
	}

	public static function general_style_settings( $frm_settings ) {
		include( FrmProAppHelper::plugin_path() . '/classes/views/settings/general_style.php' );
	}

	/**
	 * @since 4.0
	 */
	public static function message_settings( $frm_settings ) {
		$frmpro_settings = FrmProAppHelper::get_settings();
		require( FrmProAppHelper::plugin_path() . '/classes/views/settings/messages.php' );
	}

	public static function more_settings( $frm_settings ) {
		$frmpro_settings = FrmProAppHelper::get_settings();
		require( FrmProAppHelper::plugin_path() . '/classes/views/settings/form.php' );
	}

	/**
	 * @since 4.0
	 */
	public static function white_label_settings() {
		$frm_settings    = FrmAppHelper::get_settings();
		$frmpro_settings = FrmProAppHelper::get_settings();
		include( FrmProAppHelper::plugin_path() . '/classes/views/settings/white-label.php' );
	}

	public static function update( $params ) {
		global $frmpro_settings;
		$frmpro_settings = new FrmProSettings();
		$frmpro_settings->update( $params );
	}

	public static function store() {
		global $frmpro_settings;
		$frmpro_settings->store();
	}

	/**
	 * Add values to the advanced helpers on the settings/views pages
	 *
	 * @since 3.04.01
	 */
	public static function advanced_helpers( $helpers, $atts ) {
		$repeat_field  = 0;
		$dynamic_field = 0;
		$linked_field  = 0;
		$file_field    = 0;

		foreach ( $atts['fields'] as $field ) {
			if ( empty( $repeat_field ) && FrmField::is_repeating_field( $field ) ) {
				$repeat_field = $field->id;
			} elseif ( empty( $dynamic_field ) && $field->type === 'data' && isset( $field->field_options['form_select'] ) && is_numeric( $field->field_options['form_select'] ) ) {
				add_action( 'frm_field_code_tab', 'FrmProSettingsController::field_sidebar' );
				$dynamic_field = $field->id;
				$linked_field  = $field->field_options['form_select'];
			} elseif ( empty( $file_field ) && $field->type === 'file' ) {
				$file_field = $field;
			}
			unset( $field );
		}

		if ( ! empty( $repeat_field ) ) {
			$helpers['repeat'] = array(
				'heading' => '',
				'codes'   => array(
					'foreach ' . $repeat_field . '][/foreach' => __( 'For Each', 'formidable-pro' ),
				),
			);
        }

		if ( ! empty( $dynamic_field ) ) {
			$helpers['dynamic'] = array(
				'heading' => '',
				'codes'   => array(
					$dynamic_field . ' show="created-at"' => __( 'Creation Date', 'formidable-pro' ),
					$dynamic_field . ' show="' . $linked_field . '"' => __( 'Field From Entry', 'formidable-pro' ),
				),
			);
		}

		if ( ! empty( $file_field ) ) {
			$helpers['default']['codes'][ $file_field->id ] = __( 'Show image', 'formidable-pro' );
			$helpers['default']['codes'][ $file_field->id . ' show=id' ] = __( 'Image ID', 'formidable-pro' );
			$helpers['default']['codes'][ $file_field->id . ' show_filename=1' ] = __( 'Image Name', 'formidable-pro' );
		}

		return $helpers;
	}

	/**
	 * Add extra field shortcodes in the shortcode lists
	 *
	 * @since 3.04.01
	 */
	public static function field_sidebar( $atts ) {
		$field = $atts['field'];
		if ( $field->type !== 'data' || ! isset( $field->field_options['form_select'] ) || ! is_numeric( $field->field_options['form_select'] ) ) {
			return;
		}

		//get all fields from linked form
		$linked_form = FrmDb::get_var( 'frm_fields', array( 'id' => $field->field_options['form_select'] ), 'form_id' );

		$linked_fields = FrmField::getAll(
			array(
				'fi.type not' => FrmField::no_save_fields(),
				'fi.form_id'  => $linked_form,
			)
		);

		if ( $linked_fields ) {
			foreach ( $linked_fields as $linked_field ) {
				$class = is_callable( 'FrmFormsHelper::insert_opt_html' ) ? 'FrmFormsHelper' : 'FrmAppHelper';

				$class::insert_opt_html(
					array(
						'id'   => $field->id . ' show=' . $linked_field->id,
						'key'  => $field->field_key . ' show=' . $linked_field->field_key,
						'name' => $linked_field->name,
						'type' => $linked_field->type,
						'class' => 'frm-customize-list',
					)
				);
			}
		}
	}
}
