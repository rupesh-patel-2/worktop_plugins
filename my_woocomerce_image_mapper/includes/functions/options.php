<?php
if(!defined('ABSPATH'))die('');
/**
 * 
 */
global $wpdb;
global $my_woo_table_immaper_object;
global $my_woo_table_immaper_object_meta;


$my_woo_table_immaper_object= $wpdb->base_prefix . 'image_mapper_object';
$my_woo_table_immaper_object_meta=$wpdb->base_prefix . 'image_mapper_object_meta';		
/**
 * Debuging data
 */
global $my_woo_mapper_font_sizes_array;
$my_woo_mapper_font_sizes_array=array(
	'start'=>6,
	'end'=>50,
	'step'=>2
);
global $my_woo_open_positions;
$my_woo_open_positions=array(
	'right'=>__("Right","woo_image_mapper_domain"),
	'left'=>__("Left","woo_image_mapper_domain"),
	'top'=>__("Top","woo_image_mapper_domain"),
	'bottom'=>__("Bottom","woo_image_mapper_domain"),



	
);
global $my_woo_mapper_font_styles;
$my_woo_mapper_font_styles=array(
	'normal'=>__("Normal","woo_image_mapper_domain"),
	'italic'=>__("Italic","woo_image_mapper_domain"),
	'oblique'=>__("Oblique","woo_image_mapper_domain"),
);
global $my_woo_mapper_font_weight;
$my_woo_mapper_font_weight=array(
	'100'=>'100',
	'200'=>'200',
	'300'=>'300',
	'400'=>'400',
	'500'=>'500',
	'600'=>'600',
	'700'=>'700',
	'800'=>'800',
	'900'=>'900',
	
);



global $my_woo_mapper_woo_product;
global $my_woo_mapper_debug;
global $my_woo_mapper_debug_data;
$my_woo_mapper_debug=false;
$my_woo_mapper_woo_product='product';

global $my_woo_mapper_pre_options;
$my_woo_mapper_pre_options=array(
	'pin_background_color'=>'#000000',
	'pin_background_transparency'=>'0.8',
	'pin_enable_dot'=>1,
	'pin_enable_line'=>1,
	'pin_line_color'=>'#FFFFFFF',
	'pin_dot_color'=>'#FFFFFFF',
	'pin_hover_background_color'=>'#000000',
	'pin_hover_background_transparency'=>'0.6',
	'pin_hover_line_color'=>'#fefff1',
	'pin_hover_dot_color'=>'#fefff1',
	'pin_category_id'=>0,
	'pin_category_text'=>__("VIEW CATEGORY","woo_image_mapper_domain"),
	'pin_category_descr'=>'',
	'pin_category_title'=>'',
	'image_overlay'=>0,
	'image_overlay_color'=>'#000000',
	'image_overlay_transparency'=>'1',
	'hover_animation_in'=>'scaleIn',
	'hover_animation_out'=>'scaleOut',
	'hover_title_font'=>array(
		'font'=>'Open+Sans',
		'font_size'=>'16px',
		'font_style'=>'normal',
		'font_weight'=>'400'
	),
	'hover_background_color'=>'#ffffff',
	'hover_title_color'=>'#222222',
	'hover_enable_shadow'=>1,
	'hover_shadow_color'=>'#000000',
	'hover_shadow_transparency'=>'0.1',
	'quick_animation_in'=>'scaleIn',
	'quick_animation_out'=>'scaleOut',
	'quick_background_color'=>'#ffffff',
	'quick_line_color'=>"#d7d9d8",
	'quick_enable_shadow'=>1,
	'quick_shadow_color'=>"#020202",
	'quick_shadow_transparency'=>'0.1',
	'quick_close_color'=>'#d7d9d8',
	'quick_close_hover_color'=>'#d45729',
	'quick_enable_image'=>1,
	'quick_width'=>'368',
	'quick_height'=>'312',
	'quick_open_position'=>'right',
	'quick_other_price_curr_pos'=>'left',
	'quick_other_price_font'=>array(
		'font'=>'Open+Sans',
		'font_size'=>'26px',
		'font_style'=>'normal',
		'font_weight'=>'300'
	),
	'quick_other_price_font_color'=>'#d45729',
	'quick_other_overide_title_text'=>'',
	'quick_other_title_font'=>array(
		'font'=>'Open+Sans',
		'font_size'=>'16px',
		'font_style'=>'normal',
		'font_weight'=>'400'
	),
	'quick_other_title_color'=>'#565656',
	'quick_other_overide_description_text'=>'',
	'quick_other_description_font'=>array(
		'font'=>'Open+Sans',
		'font_size'=>'16px',
		'font_style'=>'normal',
		'font_weight'=>'200'
	),
	'quick_other_description_color'=>'#7f7f7f',
	'quick_other_button_1_text'=>__("VIEW ITEM","woo_image_mapper_domain"),
	'quick_other_button_1_open_window'=>'new',
	'quick_other_button_1_font'=>array(
		'font'=>'Open+Sans',
		'font_size'=>'14px',
		'font_style'=>'normal',
		'font_weight'=>'700'
	),
	'quick_other_button_1_color'=>'#FFFFFF',
	'quick_other_button_1_hover_color'=>"#ffffff",
	'quick_other_button_1_background_color'=>'#222222',
	'quick_other_button_1_hover_background_color'=>'#d45729',
	'quick_other_button_2_text'=>__("ADD TO CART","woo_image_mapper_domain"),
	'quick_other_button_2_font'=>array(
		'font'=>'Open+Sans',
		'font_size'=>'14px',
		'font_style'=>'normal',
		'font_weight'=>'700'
	),
	'quick_other_button_2_color'=>'#FFFFFF',
	'quick_other_button_2_hover_color'=>"#ffffff",
	'quick_other_button_2_background_color'=>'#222222',
	'quick_other_button_2_hover_background_color'=>'#d45729'
	
	
	
	
	
);
global $my_woo_mapper_my_animations_in;
$my_woo_mapper_my_animations_in=array(
	'scaleIn'=>__("Scale Image In","woo_image_mapper_domain"),
	'fadeIn'=>__("Fade In","woo_image_mapper_domain"),
		
	'slideIn'=>__("Slide In","woo_image_mapper_domain"),
	
	
);
global $my_woo_mapper_my_animations_out;
$my_woo_mapper_my_animations_out=array(
	'scaleOut'=>__("Scale Image Out","woo_image_mapper_domain"),
	'fadeOut'=>__("Fade Out","woo_image_mapper_domain"),
		
	'slideOut'=>__("Slide Out","woo_image_mapper_domain"),
	
	
);

global $my_woo_mapper_options;
$my_woo_mapper_options['quick_other']=array(
	'quick_other_price_font'=>array(
		'type'=>'font',
		'title'=>__("Price Font","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_price_font'],
	),
	'quick_other_price_font_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Price Font Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_price_font_color']
	
	),
	'quick_other_price_curr_pos'=>array(
	
		'type'=>'select',
		'title'=>__("Price Currency Position","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_price_curr_pos'],
		'values'=>array(
			'left'=>__("LEFT","woo_image_mapper_domain"),
			'right'=>__("RIGHT","woo_image_mapper_domain"),
		
		)
	
		
	),
	'quick_other_overide_title_text'=>array(
		'styles'=>array(
			'width'=>'183px'
		),
		'type'=>'text',
		'title'=>__("Override Title Text","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_overide_title_text']
	),
	'quick_other_title_font'=>array(
		'type'=>'font',
		'title'=>__("Title Font","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_title_font'],
	),
	'quick_other_title_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Title Font Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_title_color']
	
	),
	'quick_other_overide_description_text'=>array(
		'styles'=>array(
			'width'=>'183px'
		),
		'type'=>'text',
		'title'=>__("Override Descirption Text","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_overide_description_text']
	),
	'quick_other_description_font'=>array(
		'type'=>'font',
		'title'=>__("Text Font","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_description_font'],
	),
	'quick_other_description_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Text Font Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_description_color']
	
	),
	'quick_other_button_1_text'=>array(
		'styles'=>array(
			'width'=>'183px'
		),
		'type'=>'text',
		'title'=>__("Button 1 Text","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_1_text']
	),
	'quick_other_button_1_open_window'=>array(
		'type'=>'select',
		'title'=>__("View Item Open","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_1_open_window'],
		'values'=>array(
			'new'=>__("New Window","woo_image_mapper_domain"),
			'same'=>__("Same Window","woo_image_mapper_domain"),
		
		)
	),
	'quick_other_button_1_font'=>array(
		'type'=>'font',
		'title'=>__("Button 1 Font","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_1_font'],
	),
	'quick_other_button_1_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 1 Font Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_1_color']
	
	),
	'quick_other_button_1_hover_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 1 Font Hover Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_1_hover_color']
	
	),
	'quick_other_button_1_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 1 Bakcground Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_1_background_color']
	
	),
	'quick_other_button_1_hover_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 1 Bakcground Hover Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_1_hover_background_color']
	
	),
	'quick_other_button_2_text'=>array(
		'styles'=>array(
			'width'=>'183px'
		),
		'type'=>'text',
		'title'=>__("Button 2 Text","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_2_text']
	),
	'quick_other_button_2_font'=>array(
		'type'=>'font',
		'title'=>__("Button 2 Font","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_2_font'],
	),
	'quick_other_button_2_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 1 Font Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_2_color']
	
	),
	'quick_other_button_2_hover_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 2 Font Hover Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_2_hover_color']
	
	),
	'quick_other_button_2_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 2 Background Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_2_background_color']
	
	),
	'quick_other_button_2_hover_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Button 2 Bakcground Hover Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_other_button_2_hover_background_color']
	
	),
	
	
);
$my_woo_mapper_options['quick']=array(
	'quick_animation_in'=>array(
		'type'=>'select',
		'title'=>__("Select \"in\" animation","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_animation_in'],
		'values'=>$my_woo_mapper_my_animations_in
	),
	'quick_animation_out'=>array(
		'type'=>'select',
		'title'=>__("Select \"out\" animation","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_animation_out'],
		'values'=>$my_woo_mapper_my_animations_out
	),
	'quick_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Background Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_background_color']
	
	),
	'quick_line_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Line Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_line_color']
	
	),
	'quick_enable_shadow'=>array(
		'type'=>'on_off',
		'title'=>__("Enable Shadow","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_enable_shadow']
	
	),
	'quick_shadow_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Shadow Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_shadow_color']
	
	),
	'quick_shadow_transparency'=>array(
		'type'=>'slider',
		'min'=>0,
		'max'=>1,
		'step'=>0.05,
		'show_input'=>true,
		'width'=>150,
		'title'=>__("Shadow Transparency","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_shadow_transparency']
	
	),
	'quick_close_color'=>array(
		'type'=>'color_picker',
		'title'=>__("\"Close\" Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_close_color']	
	),
	'quick_close_hover_color'=>array(
		'type'=>'color_picker',
		'title'=>__("\"Close\" Hover Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_close_hover_color']	
	),
	'quick_enable_image'=>array(
		'type'=>'on_off',
		'title'=>__("Enable Image","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_enable_image']
	
	),
	'quick_width'=>array(
		'styles'=>array(
			'width'=>'183px'
		),
		'type'=>'text',
		'title'=>__("Box Width","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_width']
	),
	'quick_height'=>array(
		'styles'=>array(
			'width'=>'183px'
		),
		'type'=>'text',
		'title'=>__("Box Height","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_height']
	),
	'quick_open_position'=>array(
		'type'=>'select',
		'title'=>__("Select quick position ","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['quick_open_position'],
		'values'=>$my_woo_open_positions
	)
);
$my_woo_mapper_options['hover']=array(
	'hover_animation_in'=>array(
		'type'=>'select',
		'title'=>__("Select \"in\" animation","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_animation_in'],
		'values'=>$my_woo_mapper_my_animations_in
	),
	'hover_animation_out'=>array(
		'type'=>'select',
		'title'=>__("Select \"out\" animation","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_animation_out'],
		'values'=>$my_woo_mapper_my_animations_out
	),
	'hover_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Background Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_background_color']
	),
	
	'hover_enable_shadow'=>array(
		'type'=>'on_off',
		'title'=>__("Enable Shadow","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_enable_shadow']
	),
	'hover_shadow_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Shadow Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_shadow_color']
	),
	'hover_shadow_transparency'=>array(
		'type'=>'slider',
		'min'=>0,
		'max'=>1,
		'step'=>0.05,
		'show_input'=>true,
		'width'=>150,
		'title'=>__("Shadow Transparency","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_shadow_transparency']
	
	),
	
	'hover_title_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Title Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_title_color']
	),
	'hover_title_font'=>array(
		'type'=>'font',
		'title'=>__("Title Font","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['hover_title_font'],
	),
	
	
);

$my_woo_mapper_options['general']=array(
	'image_overlay'=>array(
		'type'=>'on_off',
		'title'=>__("Image Overlay","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['image_overlay']
	),
	'image_overlay_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Image Overlay Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['image_overlay_color']
	),
	'image_overlay_transparency'=>array(
		'type'=>'slider',
		'min'=>0,
		'max'=>1,
		'step'=>0.05,
		'show_input'=>true,
		'width'=>150,
		'title'=>__("Image overlay Transparency","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['image_overlay_transparency']
	
	)
);
$my_woo_mapper_options['category']=array(
	'pin_category_id'=>array(
		'type'=>'select',
		'title'=>__("Display Category of Products in the pin","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_category_id'],
		'class'=>'my_select_category'
		/*'width'=>'100%'*/
	),
	'pin_category_text'=>array(
		'type'=>'text',
		'title'=>__("Category Link text","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_category_text'],
		
	),
	'pin_category_title'=>array(
		'type'=>'text',
		'title'=>__("Override Category Title","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_category_title'],
		
	),
	'pin_category_descr'=>array(
		'type'=>'text',
		'title'=>__("Override Category Description","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_category_descr'],
		
	),
	
);	
$my_woo_mapper_options['pin']=array(
	'pin_product'=>array(
		'class'=>'my_autocomplete',
		'id'=>'pin_product_id',
		'type'=>'autocomplete',
		'title'=>__("Woocomerce Product","woo_image_mapper_domain"),
		'default'=>'',
		'width'=>'100%'
	),
	
	
	'pin_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Backround Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_background_color']
	),
	'pin_background_transparency'=>array(
		'title'=>__("Background Transparency","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_background_transparency'],
		'type'=>'slider',
		'min'=>0,
		'max'=>1,
		'show_input'=>true,
		'width'=>150,
		'step'=>0.05
	),
	'pin_enable_line'=>array(
		'type'=>'on_off',
		'title'=>__("Enable Border","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_enable_line']
	),
	
	'pin_line_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Pin Line Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_line_color']
	),
	'pin_enable_dot'=>array(
		'type'=>'on_off',
		'title'=>__("Enable Dot","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_enable_dot']
	),
	'pin_dot_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Pin Dot Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_dot_color']
	),
	'pin_hover_background_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Pin Hover Background Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_hover_background_color']
	),
	'pin_hover_background_transparency'=>array(
		'title'=>__("Hover Background Transparency","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_hover_background_transparency'],
		'type'=>'slider',
		'min'=>0,
		'max'=>1,
		'show_input'=>true,
		'width'=>150,
		'step'=>0.05
	),
	'pin_hover_line_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Pin Hover Line Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_hover_line_color']
	),
	'pin_hover_dot_color'=>array(
		'type'=>'color_picker',
		'title'=>__("Pin Hover Dot Color","woo_image_mapper_domain"),
		'default'=>$my_woo_mapper_pre_options['pin_hover_dot_color']
	),
	
	
);
