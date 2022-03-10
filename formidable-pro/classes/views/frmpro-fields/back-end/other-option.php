<div class="frm-add-other frm6 frm_form_field" id="frm_add_field_<?php echo esc_attr( $field['id'] ); ?>">
	<a href="javascript:void(0);" id="other_button_<?php echo esc_attr( $field['id'] ); ?>" data-opttype="other" data-ftype="<?php echo esc_attr( $field['type'] ); ?>" class="frm-small-add frm_cb_button frm_add_opt<?php echo ( $hide_other ? ' frm_hidden' : '' ); ?>" data-clicks="0">
		<span class="frm_add_tag frm_icon_font"></span>
		<?php esc_html_e( 'Add "Other"', 'formidable-pro' ); ?>
	</a>
</div>

<input type="hidden" value="<?php echo esc_attr( $field['other'] ); ?>" id="other_input_<?php echo esc_attr( $field['id'] ); ?>" name="field_options[other_<?php echo esc_attr( $field['id'] ); ?>]" />
