<?php

/**
 * @since 3.0
 */
class FrmProFieldSelect extends FrmFieldSelect {

	protected function field_settings_for_type() {
		$settings = parent::field_settings_for_type();

		$settings['autopopulate'] = true;
		$settings['default_value'] = true;
		$settings['read_only'] = true;
		$settings['unique'] = true;

		FrmProFieldsHelper::fill_default_field_display( $settings );
		return $settings;
	}

	/**
	 * @since 4.0
	 * @param array $args - Includes 'field', 'display', and 'values'
	 */
	public function show_extra_field_choices( $args ) {
		$field      = $args['field'];
		$hide_other = $field['other'] == true;

		if ( ! isset( $field['post_field'] ) || $field['post_field'] !== 'post_category' ) {
			include( FrmProAppHelper::plugin_path() . '/classes/views/frmpro-fields/back-end/other-option.php' );
			include( FrmProAppHelper::plugin_path() . '/classes/views/frmpro-fields/back-end/separate-values.php' );
			include( FrmProAppHelper::plugin_path() . '/classes/views/frmpro-fields/back-end/multi-select.php' );
		}

		parent::show_extra_field_choices( $args );
	}
}
