<?php

/**
 * @since 3.0
 */
class FrmProFieldCheckbox extends FrmFieldCheckbox {

	protected function field_settings_for_type() {
		$settings = parent::field_settings_for_type();

		$settings['read_only'] = true;
		$settings['default_value'] = true;

		FrmProFieldsHelper::fill_default_field_display( $settings );
		return $settings;
	}

	/**
	 * @since 4.0
	 * @param array $args - Includes 'field', 'display', and 'values'
	 */
	public function show_extra_field_choices( $args ) {
		$field = $args['field'];
		if ( isset( $field['post_field'] ) && $field['post_field'] == 'post_category' ) {
			return;
		}

		$hide_other = false;
		include( FrmProAppHelper::plugin_path() . '/classes/views/frmpro-fields/back-end/other-option.php' );
		include( FrmProAppHelper::plugin_path() . '/classes/views/frmpro-fields/back-end/separate-values.php' );
		include( FrmProAppHelper::plugin_path() . '/classes/views/frmpro-fields/back-end/checkbox-limit.php' );
	}

	/**
	 * @since 4.02
	 */
	protected function extra_field_opts() {
		return array_merge(
			parent::extra_field_opts(),
			array(
				'limit_selections' => '',
			)
		);
	}

	/**
	 * @since 4.02
	 */
	public function validate( $args ) {
		if ( is_array( $args['value'] ) ) {
			$this->trim_excess_values( $args );
		}

		return array();
	}

	/**
	 * @since 4.02
	 */
	private function trim_excess_values( $args ) {

		$original_value = $args['value'];

		$this->maybe_trim_excess_values( $args['value'] );

		if ( $original_value != $args['value'] ) {
			// trimming has happened
			$this->maybe_unset_other_values( $args, $args['value'] );
			FrmEntriesHelper::set_posted_value( $this->field, $args['value'], $args );
		}
	}

	/**
	 * @since 4.02
	 */
	public function maybe_trim_excess_values( &$value ) {
		if ( ! is_array( $value ) ) {
			return;
		}

		$selections_limit = 0;
		if ( is_object( $this->field ) || is_array( $this->field ) ) {
			$selections_limit = FrmField::get_option( $this->field, 'limit_selections' );
		} else if ( $this->field ) {
			$this->field = FrmField::getOne( $this->field );
			if ( $this->field ) {
				$selections_limit = FrmField::get_option_in_object( $this->field, 'limit_selections' );
			}
		}

		$selections_limit = absint( $selections_limit );
		if ( ! $selections_limit || count( $value ) <= $selections_limit ) {
			return;
		}

		$value = array_slice( $value, 0, $selections_limit, true );
	}

	/**
	 * @since 4.02
	 */
	private function maybe_unset_other_values( $args, $retained_values ) {
		$meta = &$_POST['item_meta'];
		if ( isset( $args['parent_field_id'] ) && $args['parent_field_id'] ) {
			$meta = &$meta[ $args['parent_field_id'] ][ $args['key_pointer'] ];
		}

		if ( ! isset( $meta['other'] ) || empty( $meta['other'] ) ) {
			return;
		}

		$all_other_values = $meta['other'];
		if ( ! isset( $all_other_values[ $this->field_id ] ) ) {
			return;
		}

		if ( $this->unset_other_values( $all_other_values, $retained_values ) ) {
			if ( isset( $args['parent_field_id'] ) && $args['parent_field_id'] ) {
				unset( $_POST['item_meta'][ $args['parent_field_id'] ][ $args['key_pointer'] ]['other'] );
			} else {
				unset( $_POST['item_meta']['other'] );
			}
		}
	}

	/**
	 * @since 4.02
	 *
	 * Remove 'Other' text inputs from $_POST.
	 *
	 * @return bool Whether to unset all 'other' values. True if all 'other' values are empty, false otherwise.
	 */
	private function unset_other_values( &$all_other_values, $retained_values ) {
		$field_other_values = $all_other_values[ $this->field_id ];

		foreach ( $field_other_values as $key => $other_value ) {
			// Check if key exists; it suffices to use isset rather than array-key-exists since if the
			// key exists but the value is null for some reason, then it's not useful & can be removed.
			if ( isset( $retained_values[ $key ] ) ) {
				continue;
			}

			if ( isset( $all_other_values[ $this->field_id ][ $key ] ) ) {
				unset( $all_other_values[ $this->field_id ][ $key ] );
			}
		}

		// if it's now empty, obliterate it so that no traces of it.
		if ( empty( $all_other_values[ $this->field_id ] ) ) {
			unset( $all_other_values[ $this->field_id ] );
		}

		return empty( $all_other_values );
	}
}
