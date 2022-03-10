<div class="frm_grid_container">
	<div class="frm6 frm_form_field frm_no_top_margin">
		<label class="frm_primary_label">&nbsp;</label>
		<label for="calc_type_<?php echo esc_attr( $field['id'] ); ?>" class="frm_toggle frm_toggle_long frm_help" title="<?php esc_attr_e( 'Text calculations are combined literally, as is. Math calculations only use numbers in the calculation, and any included math operations will be applied.', 'formidable-pro' ); ?>">
			<input type="checkbox" value="text" name="field_options[calc_type_<?php echo esc_attr( $field['id'] ); ?>]" id="calc_type_<?php echo esc_attr( $field['id'] ); ?>" <?php checked( $field['calc_type'], 'text' ); ?> onchange="frm_show_div('frm_num_calc_<?php echo absint( $field['id'] ); ?>',this.checked,false,'#')" />
			<span class="frm_toggle_slider"></span>
			<span class="frm_toggle_on">
				<?php esc_html_e( 'Text', 'formidable-pro' ); ?>
			</span>
			<span class="frm_toggle_off">
				<?php esc_html_e( 'Math', 'formidable-pro' ); ?>
			</span>
		</label>
	</div>
	<div class="frm6 frm_form_field <?php echo esc_attr( $field['calc_type'] == 'text' ? 'frm_invisible' : '' ); ?>" id="frm_num_calc_<?php echo esc_attr( $field['id'] ); ?>">
		<label for="frm_calc_dec_<?php echo esc_attr( $field['id'] ); ?>" class="frm_primary_label">
			<?php esc_html_e( 'Decimal Places', 'formidable-pro' ); ?>
		</label>
		<input type="text" id="frm_calc_dec_<?php echo esc_attr( $field['id'] ); ?>" class="frm_calc_dec" name="field_options[calc_dec_<?php echo esc_attr( $field['id'] ); ?>]" value="<?php echo esc_attr( $field['calc_dec'] ); ?>" />
	</div>
</div>

<h4 class="frm-with-line">
	<span><?php esc_html_e( 'Field List', 'formidable-pro' ); ?></span>
</h4>

<?php
FrmAppHelper::show_search_box(
	array(
		'input_id'    => 'frm_calc_' . $field['id'],
		'placeholder' => __( 'Search Fields', 'formidable-pro' ),
		'tosearch'    => 'frm-field-list-' . $field['id'],
	)
);
?>

<ul class="frm_code_list frm-full-hover frm-short-list" data-exclude="<?php echo esc_html( json_encode( FrmProField::exclude_from_calcs() ) ); ?>" id="frm-calc-list-<?php echo esc_attr( $field['id'] ); ?>"></ul>

<p class="howto frm_no_bottom_margin">
	<?php esc_html_e( 'Click fields from the field list above to include them in your calculation. Example: [12]+[13]', 'formidable-pro' ); ?>
</p>
