<?php

/**
 * @since 3.0
 */
class FrmProFieldCaptcha extends FrmFieldCaptcha {

	protected function field_settings_for_type() {
		$settings = parent::field_settings_for_type();

		FrmProFieldsHelper::fill_default_field_display( $settings );
		return $settings;
	}
}
