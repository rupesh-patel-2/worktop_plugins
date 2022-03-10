<p>
	<label for="lookup_filter_current_user_<?php echo absint( $field['id'] ); ?>" class="frm_help" title="<?php esc_attr_e( 'Does not apply to administrators.', 'formidable-pro' ); ?>">
		<input type="checkbox" name="field_options[lookup_filter_current_user_<?php echo absint( $field['id'] ); ?>]" id="lookup_filter_current_user_<?php echo absint( $field['id'] ); ?>" value="1" <?php checked( $field['lookup_filter_current_user'], 1 ); ?> />
		<?php esc_html_e( 'Limit options to those created by the current user', 'formidable-pro' ); ?>
	</label>
</p>
