<div class="frm-star-group">
<?php
$max = FrmField::get_option( $field, 'maxnum' );
if ( ! empty( $max ) ) {
	$field['options'] = range( 1, $max );
}

if ( is_array( $field['options'] ) ) {
	if ( ! isset( $field['value'] ) ) {
		$field['value'] = $field['default_value'];
		FrmProAppHelper::unserialize_or_decode( $field['value'] );
	}

	foreach ( $field['options'] as $opt_key => $opt ) {
		$class = 'star-rating';
		if ( $opt <= $field['value'] ) {
			$class .= ' star-rating-on';
		}

		$opt = apply_filters( 'frm_field_label_seen', $opt, $opt_key, $field );
		$last = end( $field['options'] ) == $opt ? ' frm_last' : '';
		?>
		<input type="radio" name="<?php echo esc_attr( $field_name ) ?>" id="<?php echo esc_attr( $html_id . '-' . $opt_key ) ?>" value="<?php echo esc_attr( $opt ) ?>" <?php
		checked( $field['value'], $opt ) . ' ';
		do_action( 'frm_field_input_html', $field );
		?> /><label for="<?php echo esc_attr( $html_id . '-' . $opt_key ) ?>" class="<?php echo esc_attr( $class ) ?>"></label>
<?php
	}
}
?>
<div style="clear:both;"></div>
</div>
