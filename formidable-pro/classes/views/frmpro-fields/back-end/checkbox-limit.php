<p class="frm6 frm_form_field frm_first">
	<label class="frm_help" title="<?php esc_attr_e( 'The maximum number of this checkbox\'s options that the end user is allowed to select in one entry', 'formidable-pro' ); ?>">
		<?php esc_html_e( 'Limit Selections', 'formidable-pro' ); ?>
	</label>
	<input type="number" class="frm_js_checkbox_limit" name="field_options[limit_selections_<?php echo absint( $field['id'] ); ?>]" value="<?php
		if ( isset( $field['limit_selections'] ) ) {
			echo esc_attr( $field['limit_selections'] );
		}
		?>" size="3" min="2" step="1" max="999" />
</p>
