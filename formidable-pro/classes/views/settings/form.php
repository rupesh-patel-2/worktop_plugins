<?php
if ( ! is_callable( 'FrmSettingsController::message_settings' ) ) {
	// If these settings aren't included, don't lose them.
	?>
	<input type="hidden" name="frm_edit_msg" value="<?php echo esc_attr( $frmpro_settings->edit_msg ); ?>" />
	<input type="hidden" name="frm_update_value" value="<?php echo esc_attr( $frmpro_settings->update_value ); ?>" />
	<input type="hidden" name="frm_login_msg" value="<?php echo esc_attr( $frm_settings->login_msg ); ?>" />
	<input type="hidden" name="frm_already_submitted" value="<?php echo esc_attr( $frmpro_settings->already_submitted ); ?>" />
	<input type="hidden" name="frm_mu_menu" value="<?php echo esc_attr( $frm_settings->mu_menu ); ?>" />
	<input type="hidden" name="frm_menu_icon" value="<?php echo esc_attr( $frmpro_settings->menu_icon, $icon ); ?>" />
<?php } ?>

<p class="frm_grid_container">
	<label class="frm4 frm_form_field frm_help" title="<?php esc_attr_e( 'Change the format of the date used in the date field.', 'formidable-pro' ) ?>">
		<?php esc_html_e( 'Date Format', 'formidable-pro' ); ?>
	</label>
	<?php $formats = array_keys( FrmProAppHelper::display_to_datepicker_format() ); ?>
	<select name="frm_date_format" class="frm8 frm_form_field">
		<?php foreach ( $formats as $f ) { ?>
			<option value="<?php echo esc_attr($f) ?>" <?php selected($frmpro_settings->date_format, $f); ?>>
				<?php echo esc_html( $f . ' &nbsp; &nbsp; ' . date( $f ) ); ?>
			</option>
		<?php } ?>
	</select>
</p>
