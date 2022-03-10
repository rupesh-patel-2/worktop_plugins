<?php

class FrmProPostAction extends FrmFormAction {

	public function __construct() {
		$action_ops = array(
			'classes'   => 'frm_wordpress_icon frm_icon_font frm-inverse',
			'color'     => 'rgb(0,160,210)',
			'limit'     => 1,
			'priority'  => 40,
			'event'     => array( 'create', 'update', 'import' ),
			'force_event' => true,
		);

		parent::__construct( 'wppost', __( 'Create Post', 'formidable-pro' ), $action_ops );
	}

	public function form( $form_action, $args = array() ) {
	    global $wpdb;

	    extract($args);

	    $post_types = FrmProAppHelper::get_custom_post_types();
        if ( ! $post_types ) {
            return;
        }

        $post_type = FrmProFormsHelper::post_type( $args['values']['id'] );
        $taxonomies = get_object_taxonomies($post_type);
        $action_control = $this;

        $echo = true;
        $form_id = $form->id;
        $display = false;
        $displays = array();

        $display_ids = FrmDb::get_col( $wpdb->postmeta, array( 'meta_key' => 'frm_form_id', 'meta_value' => $form_id), 'post_ID' );

        if ( $display_ids ) {
            $query_args = array(
                'pm.meta_key' => 'frm_show_count', 'post_type' => 'frm_display',
				'pm.meta_value' => array( 'dynamic', 'calendar', 'one' ),
				'p.post_status' => array( 'publish', 'private' ),
                'p.ID' => $display_ids,
            );
            $displays = FrmDb::get_results(
				$wpdb->posts . ' p LEFT JOIN ' . $wpdb->postmeta . ' pm ON (p.ID = pm.post_ID)', $query_args, 'p.ID, p.post_title', array( 'order_by' => 'p.post_title ASC' )
            );

            if ( isset($form_action->post_content['display_id']) ) {
                // get view from settings
                if ( is_numeric($form_action->post_content['display_id']) ) {
                    $display = FrmProDisplay::getOne( $form_action->post_content['display_id'], false, true );
                }
            } else if ( ! is_numeric($form_action->post_content['post_content']) && ! empty($display_ids) ) {
                // get auto view
                $display = FrmProDisplay::get_form_custom_display($form_id);
                if ( $display ) {
                    $display = FrmProDisplaysHelper::setup_edit_vars($display, true);
                }
            }
        }

        // Get array of all custom fields
        $custom_fields = array();
        if ( isset( $form_action->post_content['post_custom_fields'] ) ) {
            foreach ( $form_action->post_content['post_custom_fields'] as $custom_field_opts ) {
				if ( isset( $custom_field_opts['meta_name'] ) ) {
					$custom_fields[] = $custom_field_opts['meta_name'];
				}
                unset( $custom_field_opts );
            }
        }

        unset($display_ids);

		if ( empty( $form_action->post_content['post_category'] ) && ! empty( $values['fields'] ) ) {
			foreach ( $values['fields'] as $fo_key => $fo ) {
				if ( $fo['post_field'] == 'post_category' ) {
					if ( ! isset( $fo['taxonomy'] ) || $fo['taxonomy'] == '' ) {
						$fo['taxonomy'] = 'post_category';
					}

					$tax_count = FrmProFormsHelper::get_taxonomy_count( $fo['taxonomy'], $form_action->post_content['post_category'] );

					$form_action->post_content['post_category'][ $fo['taxonomy'] . $tax_count ] = array(
						'field_id'    => $fo['id'],
						'exclude_cat' => isset( $fo['exclude_cat'] ) ? $fo['exclude_cat'] : 0,
						'meta_name'   => $fo['taxonomy'],
					);
					unset( $tax_count );
				} else if ( $fo['post_field'] == 'post_custom' && ! in_array( $fo['custom_field'], $custom_fields ) ) {
					$form_action->post_content['post_custom_fields'][ $fo['custom_field'] ] = array(
						'field_id'  => $fo['id'],
						'meta_name' => $fo['custom_field'],
					);
				}
				unset( $fo_key, $fo );
			}
		}

		include( dirname(__FILE__) . '/post_options.php' );
	}

	public function get_defaults() {
	    return array(
            'post_type'     => 'post',
            'post_category' => array(),
            'post_content'  => '',
            'post_excerpt'  => '',
            'post_title'    => '',
            'post_name'     => '',
            'post_date'     => '',
            'post_status'   => '',
            'post_custom_fields' => array(),
            'post_password' => '',
			'event'         => array( 'create', 'update' ),
        );
	}

	public function get_switch_fields() {
		return array(
			'post_category' => array( 'field_id' ),
			'post_custom_fields' => array( 'field_id' ),
		);
	}
}
