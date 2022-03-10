<div class="frm_grid_container">
	<p class="frm6 frm_form_field">
		<label class="frm_help" title="<?php esc_attr_e( 'To setup a new custom post type, install and setup a plugin like \'Custom Post Type UI\', then return to this page to select your new custom post type.', 'formidable-pro' ) ?>">
			<?php esc_html_e( 'Post Type', 'formidable-pro' ); ?>
		</label>
		<select class="frm_post_type" name="<?php echo esc_attr( $this->get_field_name('post_type') ) ?>">
			<?php
			foreach ( $post_types as $post_key => $post_type ) {
				if ( in_array( $post_key, array( 'frm_display', 'frm_form_actions', 'frm_styles' ) ) ) {
					continue;
				}
				$expected_post_key = sanitize_title_with_dashes( $post_type->label );
				$hide_key = ( $post_type->_builtin || $expected_post_key == $post_key || $expected_post_key == $post_key . 's' );
				?>
				<option value="<?php echo esc_attr( $post_key ) ?>" <?php selected( $form_action->post_content['post_type'], $post_key ) ?>>
					<?php echo esc_html( $post_type->label . ( $hide_key ? '' : ' (' . $post_key . ')' ) ); ?>
				</option>
				<?php
				unset( $post_type );
			}

			unset( $post_types );
			?>
		</select>
	</p>
	<p class="frm6 frm_form_field">
		<label><?php esc_html_e( 'Post Title', 'formidable-pro' ); ?> <span class="frm_required">*</span></label>
		<select name="<?php echo esc_attr( $this->get_field_name('post_title') ) ?>" class="frm_single_post_field">
			<option value=""><?php esc_html_e( '&mdash; Select &mdash;' ); ?></option>
			<?php
			$post_key = 'post_title';
			$post_field = array( 'text', 'email', 'url', 'radio', 'checkbox', 'select', 'scale', 'star', 'number', 'phone', 'time', 'hidden' );
			include( dirname( __FILE__ ) . '/_post_field_options.php' );
			unset( $post_field );
			?>
		</select>
	</p>
	<p class="frm6 frm_first frm_form_field">
		<label><?php esc_html_e( 'Post Content', 'formidable-pro' ); ?></label>
		<select class="frm_toggle_post_content">
			<option value=""><?php esc_html_e( '&mdash; Select &mdash;' ); ?></option>
			<option value="post_content" <?php echo is_numeric( $form_action->post_content['post_content'] ) ? 'selected="selected"' : ''; ?>>
				<?php esc_html_e( 'Use a single field', 'formidable-pro' ); ?>
			</option>
			<option value="dyncontent" <?php echo ( $display ? 'selected="selected"' : '' ); ?>>
				<?php esc_html_e( 'Customize post content', 'formidable-pro' ); ?>
			</option>
		</select>
	</p>
	<p class="frm6 frm_form_field frm_post_content_opt <?php echo esc_attr( $display || empty( $form_action->post_content['post_content'] ) ) ? 'frm_hidden' : ''; ?>">
		<label><?php esc_html_e( 'Select a Field', 'formidable-pro' ); ?></label>
		<select name="<?php echo esc_attr( $this->get_field_name('post_content') ) ?>" class="frm_post_content_opt frm_single_post_field">
			<option value=""><?php esc_html_e( '&mdash; Select &mdash;' ); ?></option>
			<?php
			$post_key = 'post_content';
			include( dirname( __FILE__ ) . '/_post_field_options.php' );
			?>
		</select>
	</p>
	<p class="frm6 frm_form_field frm_dyncontent_opt <?php echo ( $display ? '' : 'frm_hidden' ); ?>">
		<label><?php esc_html_e( 'Select View', 'formidable-pro' ); ?></label>
		<select name="<?php echo esc_attr( $this->get_field_name('display_id') ) ?>" class="frm_dyncontent_opt">
			<option value=""><?php esc_html_e( '&mdash; Select &mdash;' ); ?></option>
			<option value="new"><?php esc_html_e( 'Create new view', 'formidable-pro' ); ?></option>
			<?php foreach ( $displays as $d ) { ?>
				<option value="<?php echo absint( $d->ID ) ?>" <?php
					if ( $display ) {
						selected( $d->ID, $display->ID );
					}
					?>>
					<?php echo esc_html( stripslashes( $d->post_title ) ) ?>
				</option>
			<?php } ?>
		</select>
	</p>
	<div class="frm_dyncontent_opt <?php echo esc_attr( $display ? '' : 'frm_hidden' ); ?>">
		<p class="frm_has_shortcodes">
			<label class="frm_help" title="<?php esc_attr_e( 'The content shown on your single post page. If nothing is entered here, the regular post content will be used.', 'formidable-pro' ) ?>">
				<?php esc_html_e( 'Customize Content', 'formidable-pro' ); ?>
			</label>
			<textarea id="frm_dyncontent" placeholder="<?php esc_attr_e( 'Add text, HTML, and fields from your form to build your post content.', 'formidable-pro' ) ?>" name="dyncontent" rows="10" class="frm_not_email_message"><?php
				if ( $display ) {
					echo FrmAppHelper::esc_textarea($display->frm_show_count == 'one' ? $display->post_content : $display->frm_dyncontent);
				}
			?></textarea>
		</p>
		<span class="howto">
			<?php esc_html_e( 'Editing this box will update your existing view or create a new one.', 'formidable-pro' ); ?>
		</span>
	</div>
	<p class="frm6 frm_form_field frm_first">
		<label><?php esc_html_e( 'Excerpt', 'formidable-pro' ); ?></label>
		<select name="<?php echo esc_attr( $this->get_field_name('post_excerpt') ) ?>" class="frm_single_post_field">
			<option value=""><?php esc_html_e( 'None', 'formidable-pro' ); ?></option>
			<?php
			$post_key = 'post_excerpt';
			include( dirname( __FILE__ ) . '/_post_field_options.php' );
			?>
		</select>
	</p>

	<p class="frm6 frm_form_field">
		<label><?php esc_html_e( 'Post Password', 'formidable-pro' ); ?></label>
		<select name="<?php echo esc_attr( $this->get_field_name('post_password') ) ?>" class="frm_single_post_field">
			<option value="">
				<?php esc_html_e( 'None', 'formidable-pro' ); ?>
			</option>
			<?php
			$post_key = 'post_password';
			include( dirname( __FILE__ ) . '/_post_field_options.php' );
			?>
		</select>
	</p>

	<p class="frm6 frm_form_field">
		<label><?php esc_html_e( 'Slug', 'formidable-pro' ); ?></label>
		<select name="<?php echo esc_attr( $this->get_field_name('post_name') ) ?>" class="frm_single_post_field">
			<option value="">
				<?php esc_html_e( 'Automatically Generate from Post Title', 'formidable-pro' ); ?>
			</option>
			<?php
			$post_key = 'post_name';
			include( dirname( __FILE__ ) . '/_post_field_options.php' );
			?>
		</select>
	</p>

	<p class="frm6 frm_form_field">
		<label><?php esc_html_e( 'Post Date', 'formidable-pro' ); ?></label>
		<select name="<?php echo esc_attr( $this->get_field_name('post_date') ) ?>" class="frm_single_post_field">
			<option value="">
				<?php esc_html_e( 'Date of entry submission', 'formidable-pro' ); ?>
			</option>
			<?php
			$post_key = 'post_date';
			$post_field = array( 'date' );
			include( dirname( __FILE__ ) . '/_post_field_options.php' );
			?>
		</select>
	</p>

	<p class="frm6 frm_form_field">
		<label><?php esc_html_e( 'Post Status', 'formidable-pro' ); ?></label>
		<select name="<?php echo esc_attr( $this->get_field_name('post_status') ) ?>" class="frm_single_post_field">
			<option value="">
				<?php esc_html_e( 'Create Draft', 'formidable-pro' ); ?>
			</option>
			<option value="pending" <?php selected( $form_action->post_content['post_status'], 'pending' ) ?>>
				<?php esc_html_e( 'Pending', 'formidable-pro' ); ?>
			</option>
			<option value="publish" <?php selected( $form_action->post_content['post_status'], 'publish' ); ?>>
				<?php esc_html_e( 'Automatically Publish', 'formidable-pro' ); ?>
			</option>
			<option value="dropdown">
				<?php esc_html_e( 'Create New Dropdown Field', 'formidable-pro' ); ?>
			</option>
			<?php
			$post_key = 'post_status';
			$post_field = array( 'select', 'radio', 'hidden' );
			include( dirname( __FILE__ ) . '/_post_field_options.php' );
			?>
		</select>
	</p>
	<?php unset( $post_field, $post_key ); ?>

	<h3><?php esc_html_e( 'Taxonomies/Categories', 'formidable-pro' ); ?></h3>

	<div id="frm_posttax_rows" class="frm_add_remove frm_posttax_labels <?php echo empty( $form_action->post_content['post_category'] ) ? 'frm_hidden' : ''; ?>" style="padding-bottom:8px;">
		<p class="frm_grid_container frm_no_margin">
			<label class="frm4 frm_form_field">
				<?php esc_html_e( 'Taxonomy Type', 'formidable-pro' ); ?>
			</label>
			<label class="frm6 frm_form_field">
				<?php esc_html_e( 'Populate Field', 'formidable-pro' ); ?>
			</label>
		</p>

		<?php
		$tax_key = 0;
		foreach ( $form_action->post_content['post_category'] as $field_vars ) {
			include( dirname( __FILE__ ) . '/_post_taxonomy_row.php' );
			$tax_key++;
			unset( $field_vars );
		}
		?>
	</div>

	<p>
		<a href="javascript:void(0)" class="frm_add_posttax_row button frm-button-secondary <?php echo esc_attr( empty( $form_action->post_content['post_category'] ) ? '' : 'frm_hidden' ) ?>">
			+ <?php esc_html_e( 'Add' ); ?>
		</a>
	</p>

	<h3>
		<?php esc_html_e( 'Custom Fields', 'formidable-pro' ); ?>
	</h3>

	<div class="frm_add_remove frm_name_value<?php echo empty( $form_action->post_content['post_custom_fields'] ) ? ' frm_hidden' : ''; ?>">

		<p class="frm_grid_container frm_no_margin">
			<label class="frm4 frm_form_field">
				<?php esc_html_e( 'Name', 'formidable-pro' ); ?>
			</label>
			<label class="frm6 frm_form_field">
				<?php esc_html_e( 'Value', 'formidable-pro' ); ?>
			</label>
		</p>

		<div id="frm_postmeta_rows">
                <?php
                foreach ( $form_action->post_content['post_custom_fields'] as $custom_data ) {
					if ( isset( $custom_data['meta_name'] ) && ! empty( $custom_data['meta_name'] ) ) {
						include( dirname( __FILE__ ) . '/_custom_field_row.php' );
					}
                    unset($custom_data);
                }
                ?>
		</div>
	</div>

	<p>
		<a href="javascript:void(0)" class="frm_add_postmeta_row button frm-button-secondary <?php echo esc_attr( empty( $form_action->post_content['post_custom_fields'] ) ? '' : 'frm_hidden' ) ?>">
			+ <?php esc_html_e( 'Add' ); ?>
		</a>
	</p>
</div>
