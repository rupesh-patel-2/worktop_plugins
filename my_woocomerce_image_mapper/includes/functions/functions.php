<?php
if(!defined('ABSPATH'))die('');
/*chnages #sliders
 * slider options
 */
global $my_woo_immaper_sliders_options_name;
global $my_woo_immaper_sliders_options;
/*
 *end 
 */ 
global $my_woo_immaper_fonts_new;
global $my_woo_image_mapper_fonts_include;
$my_woo_image_mapper_fonts_include=array();
global $my_woo_immaper_fonts;
global $my_woo_checked_fonts;
global $my_woo_page_included_fonts_1234;
$my_woo_page_included_fonts_1234=array();
$my_woo_checked_fonts=0;
/*chnages #sliders
 * slider options
 */
function my_woo_mapper_get_categories($tax='product_cat'){
	$my_terms_12345=get_terms('product_cat',array('hide_empty'=>false
	));
	$arr[0]=__("Change pin display to category","woo_image_mapper_domain");
	if(!empty($my_terms_12345)){	
		foreach($my_terms_12345 as $k=>$v){
			$arr[$v->term_id]=$v->name;
		}
	}
	return $arr;
}
/**
 * Get all sliders
 * @return mixed
 */
function my_woo_mapper_get_all_mappers(){
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	$query="SELECT ID,title FROM ".$my_woo_table_immaper_object;
	$ret=$wpdb->get_results($query);
	$ret_arr=array();
	$ret_arr[0]=__("Select Mapper","woo_image_mapper_domain");
	if(!empty($ret)){
		foreach($ret as $k=>$v){
			$ret_arr[$v->ID]=$v->title;
		}
	}
	return $ret_arr;
	
}
function my_woo_image_mapper_get_sliders($per_page=-1){
	global $my_woo_immaper_sliders_options_name;
	global $my_woo_immaper_sliders_options;
	if(!isset($my_woo_immaper_sliders_options)){
		$my_woo_immaper_sliders_options=get_option($my_woo_immaper_sliders_options_name);
	}
	return $my_woo_immaper_sliders_options;
	
}
/*
 * 
 */
function my_woo_image_mapper_clone_object($id){
	$my_image_mapper_id=$id;
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	$title=__("Woomapper clone ","woo_image_mapper_domain").$id;
	$wpdb->insert($my_woo_table_immaper_object,array(
			'title'=>$title
		));
	$image_mapper_id=$wpdb->insert_id;
	
	
	$pins=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'pins');
	$quick=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'quick');
	$hover=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'hover');
	$general=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'general');
	$quick_other=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'quick_other');
	my_woo_image_mapper_add_meta($image_mapper_id,'created_time',time());
	$my_mapper_image_id=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'image_id');
	my_woo_image_mapper_add_meta($image_mapper_id,'image_id',$my_mapper_image_id);
	my_woo_image_mapper_add_meta($image_mapper_id,'general',$general);
	
my_woo_image_mapper_add_meta($image_mapper_id,'pins',$pins);
			my_woo_image_mapper_add_meta($image_mapper_id,'quick',$quick);
			my_woo_image_mapper_add_meta($image_mapper_id,'hover',$hover);
			my_woo_image_mapper_add_meta($image_mapper_id,'quick_other',$quick_other);
}
/**
 * Get google fonts link
 * @return string|string|string
 */
function my_woo_image_mapper_get_google_fonts_link(){
	global $my_woo_page_included_fonts_1234;
	global $my_woo_image_mapper_fonts_include;
	if(empty($my_woo_image_mapper_fonts_include))return false;
	$families=array();
	
	foreach($my_woo_image_mapper_fonts_include as $k=>$v){
		$family=my_woo_image_mapper_get_font_famyly($k);
		$family_key_added=$k;
		
		if(!empty($v['variants'])){
			$my_variants=$v['variants'];
			foreach($my_variants as $k1=>$v1){
				$my_new_key=$family_key_added.$v1;
				if(isset($my_woo_page_included_fonts_1234[$my_new_key]))
				unset($my_variants[$k1]);
			}
			if(!empty($my_variants)){
				$families[]=$family.':'.implode(",",$my_variants);
			}else {
				if(!isset($my_woo_page_included_fonts_1234[$family_key_added])){
					$families[]=$family;
				}	
			}
			foreach($v['variants'] as $k1=>$v1){
				$my_var=$v1;
				$my_woo_page_included_fonts_1234[$family_key_added.'_'.$my_var]=1;
			}
		}else {
			if(!isset($my_woo_page_included_fonts_1234[$family_key_added])){
				$families[]=$family;
			}
		}
		$my_woo_page_included_fonts_1234[$family_key_added]=1;
		
	}
	if(!empty($families)){
		$ret='http'.(is_ssl()?'s':'');
		$ret.='://fonts.googleapis.com/css?family=';
		$ret.=urlencode(implode("|",$families));
		return $ret;
	}else return false;
}
/**
 * Get font family
 * @param $font_family
 */
function my_woo_image_mapper_get_font_famyly($font_family){
	$font_family=str_replace('+', ' ', $font_family);
	return $font_family;
}
/**
 * Add fonts to page
 * @param $id
 * @param $font
 */
function my_woo_image_mapper_add_font($id,$font){
	global $my_woo_checked_fonts;
	global $my_woo_immaper_font;
	global $my_woo_immaper_fonts_new;
	if(empty($my_woo_immaper_fonts_new)&&$my_woo_checked_fonts==1)return false;
	if(empty($my_woo_immaper_fonts_new)){
		$my_woo_immaper_fonts_new=get_option('br0_my_admin_web_fonts');//my_woo_image_mapper_get_google_fonts(true);
		$my_woo_checked_fonts=1;
		if(empty($my_woo_immaper_fonts_new))return false;
	}
	
	global $my_woo_image_mapper_fonts_include;
	$font_family=$font['font'];
	if($font_family=='default')return true;
	$font_size=$font['font_size'];
	$font_style=$font['font_style'];
	$font_weight=$font['font_weight'];
	//echo $font_family.' '.$font_style.'<br/>';
	$search_arr=array();
	if($font_style=='italic'){
		$search_arr[]=$font_style;
		$search_arr[]=$font_weight.$font_style;
	}else if($font_style=='normal'){
		$search_arr[]='regular';
		$search_arr[]=$font_weight;
		
	}
	/*echo '<pre>';
	print_r($my_woo_immaper_fonts);
	echo '</pre>';
	*/
	
	if(isset($my_woo_immaper_fonts_new[$font_family])){
		$google_font=$my_woo_immaper_fonts_new[$font_family];
		//print_r($google_font);
		$google_variants=$google_font['variants'];
		//print_r($google_variants);
		if(!isset($my_woo_image_mapper_fonts_include[$font_family])){
			//echo 'Not set';
			$my_woo_image_mapper_fonts_include[$font_family]=array(
				'added'=>true,
				'variants'=>array()
			);
			if(!empty($search_arr)){
				
			//print_r($search_arr);
			foreach($search_arr as $k=>$v){
				//if($v=='regular')continue;
				if(in_array($v,$google_variants)){
					$my_woo_image_mapper_fonts_include[$font_family]['variants'][]=$v;
				}
			}
			}
		}else {
			if(!empty($search_arr)){
			foreach($search_arr as $k=>$v){
				//if($v=='regular')continue;
				if(in_array($v,$google_variants)){
					if(!in_array($v,$my_woo_image_mapper_fonts_include[$font_family]['variants'])){
						$my_woo_image_mapper_fonts_include[$font_family]['variants'][]=$v;
					}
				}
			}
			}
		}
	
	}
	return true;
}
/**
 * Rgba color convereter
 * @param unknown_type $color
 * @param unknown_type $tr
 * @return string
 */
function my_woo_image_mapper_rgba_color($color,$tr){
	$color_rgba='rgba(';
	if(strpos($color,"#")===0)
	$col=substr($color,1);
	else $col=$color;
	if((strlen($col)!=6)||(strlen($col)!=3)){
		if(strlen($col)>3){
			$start=strlen($col);
			for($i=$start;$i<6;$i++)$col.='0';
		}else if(strlen($col)<3){
			$start=strlen($col);
			for($i=$start;$i<3;$i++)$col.='0';
		}
	}
	if(strlen($col)==6){
		list($r,$g,$b)=array(
			$col[0].$col[1],
			$col[2].$col[3],
			$col[4].$col[5]
		);
		
	}else if(strlen($col)==3){
		list($r,$g,$b)=array(
			$col[0].$col[0],
			$col[1].$col[1],
			$col[2].$col[2]
		);
	}
	$r_dec=hexdec($r);
	$g_dec=hexdec($g);
	$b_dec=hexdec($b);
	$color_rgba.=$r_dec.','.$g_dec.','.$b_dec.','.$tr.')';
	return $color_rgba;
	
	
}
/**
 * Generate css for a pin
 * @param $product_id
 * @param $id
 * @param $k
 * @param $pin_id
 * @param $pin
 * @param $general
 * @param $hover
 * @param $quick
 * @param $other
 */
function my_woo_image_mapper_get_css_pin($product_id,$id,$k,$pin_id,$pin,$general,$hover,$quick,$quick_other){
	$added_css='';
	$my_pin_id='imapper'.$id.'-pin'.$pin_id;
	$a_css='';
	global $my_wp_woo_mapper_is_pin_category_1234;
	if(empty($pin['pin_icon'])){
	if($pin['pin_enable_line']){
			
			
			ob_start();
			?>
			#<?php echo $my_pin_id?>:hover{
				border-color:<?php echo $pin['pin_hover_line_color']?> !important;
			}
			<?php 
			$a_css.=ob_get_clean();
			$added_css.=$a_css;
		}else {
			
			ob_start();
			?>
			#<?php echo $my_pin_id?> .my_inner_dot-front{
				margin-left:13px !important;
				margin-top:13px !important;
			}
			<?php 
			$a_css.=ob_get_clean();
			$added_css.=$a_css;
		}
		if($pin['pin_background_color']!=$pin['pin_hover_background_color']){
			$a_css='';
			ob_start();
			?>
			#<?php echo $my_pin_id?>:hover{
				background-color:<?php echo $pin['pin_hover_background_color'];?> !important;
				
			}
			<?php 
			$added_css.=ob_get_clean();
		}
		ob_start();
		?>
		
		#<?php echo $my_pin_id?>:hover{
				opacity:<?php echo $pin['pin_hover_background_transparency'];?> !important;
				
			}
		
		<?php 
		$added_css.=ob_get_clean();
		if($pin['pin_enable_dot']==1){
			ob_start();
			?>
			#<?php echo $my_pin_id?>:hover .my_inner_dot-front{
				border-color:<?php echo $pin['pin_hover_dot_color']?> !important;
			}		
			<?php 
			$added_css.=ob_get_clean();
		}
			/**
			 * Add css to hover popup
			 */
	}
		$my_hover_id='imapper'.$id.'-pin'.$pin_id.'-my-content-wrapper';
		ob_start();
		
		$my_hover_shadow_rgba_color=my_woo_image_mapper_rgba_color($hover[$k]['hover_shadow_color'],$hover[$k]['hover_shadow_transparency']);
		?>
		#<?php echo $my_hover_id; ?> .my_hover_inner_1234{
			background-color:<?php echo $hover[$k]['hover_background_color']?>;
			<?php if($hover[$k]['hover_enable_shadow']==0){?>
			box-shadow:none !important;
			<?php }else {?>
			box-shadow:0 0 5px 5px <?php echo $my_hover_shadow_rgba_color;//echo $hover[$k]['hover_shadow_color'];?>!important;
			<?php }?>
		}
		#<?php echo $my_hover_id;?>{
				
		}
		
		<?php if($hover[$k]['hover_enable_shadow']==1){?>
		#<?php echo $my_hover_id;?> .imapper-arrow-border::after{
			content:"";
			position:absolute;
			top:-18px;
			left:-7px;
			width:15px;
			height:15px;
			transform:rotate(45deg);
			-webkit-transform:rotate(45deg);
			-o-transform:rotate(45deg);
			-ms-transform:rotate(45deg);
			-moz-transform:rotate(45deg);
			background-color:transparent<?php //echo $hover[$k]['hover_background_color']?>;
			
			
			
			box-shadow:5px 5px 5px 0px <?php echo  $my_hover_shadow_rgba_color;//echo $hover[$k]['hover_shadow_color'];?>!important;
		}
		<?php }?>
		#<?php echo $my_hover_id;?> div.my_hover_title div{
			
			<?php /**
					* bilo je height
				  */	
			//Text overflow elippsis 
			?>
			<?php /* not using
			width:190px !important;
			text-overflow:ellipsis !important;
			white-space:nowrap;
			*/ ?>
			<?php /*
			padding-left:10px;
			padding-right:10px;
			*/ ?>
			<?php 
			//end new code for wrap
			?>
			max-height:<?php $h=$hover[$k]['hover_title_font']['font_size'];$h*=1.5;echo $h.'px';?>!important;
			line-height:1.5 !important;
			overflow:hidden;
		}
		#<?php echo $my_hover_id;?> div.my_hover_title div{
			color:<?php echo $hover[$k]['hover_title_color'];?>!important;
			
			<?php /*line-height:<?php $h=$hover[$k]['hover_title_font']['font_size'];$h+=2;echo $h.'px';?>!important;*/ ?>
			<?php 
			$my_font_family=$hover[$k]['hover_title_font']['font'];
			if($my_font_family!='default'){
				$my_font_family=my_woo_image_mapper_get_font_famyly($my_font_family);
				
				?>
			font-family:"<?php echo $my_font_family;//echo $hover[$k]['hover_title_font']['font'];?>" , serif !important;
			<?php }?>
			font-size:<?php echo $hover[$k]['hover_title_font']['font_size'];?>!important;
			font-style:<?php echo $hover[$k]['hover_title_font']['font_style'];?>!important;
			
			font-weight:<?php echo $hover[$k]['hover_title_font']['font_weight'];?>!important;
			
		}
		
		
		<?php 
		$added_css.=ob_get_clean();
		/**
		 * Add font to array
		 */
		my_woo_image_mapper_add_font($id,$hover[$k]['hover_title_font']);
		/**
		 * Css for front
		 */
		$pin_content_id='imapper'.$id.'-pin'.$pin_id.'-content';
		$pin_content_wrapper_id='imapper'.$id.'-pin'.$pin_id.'-content-wrapper';
		ob_start();
		?>
		#<?php echo $pin_content_id?> .my_product_header{
			border-bottom:2px solid <?php echo $quick[$k]['quick_line_color'];?>;
		}
		#<?php echo $pin_content_id?> .my_font_size{
			color:<?php echo $quick[$k]['quick_close_color']?>;
		}
		<?php /*
		#<?php echo $pin_content_id?> .my_font_size:hover{
			color:<?php echo $quick[$k]['quick_close_hover_color']?>!important;
		}*/ ?>
		#<?php echo $pin_content_id?> .my_triangle_left{
			background-color:<?php echo $quick[$k]['quick_background_color'];?>;
			
		}
		<?php 
		if($quick[$k]['quick_enable_shadow']==1){
			$my_quick_rgba_color=my_woo_image_mapper_rgba_color($quick[$k]['quick_shadow_color'],$quick[$k]['quick_shadow_transparency']);
			
		?>
		#<?php echo $pin_content_id?> {
			box-shadow:0 0 5px 5px <?php echo $my_quick_rgba_color;//echo $quick[$k]['quick_shadow_color'];?>!important;
			
		}
		<?php /*
		#<?php echo $pin_content_id?> .imapper-arrow-new::before{
			content:'';
			display:block;
			width:17px;
			height:0px;
			transform:rotate(-45deg);
			position:absolute;
			box-shadow:0 -5px 5px 5px   <?php echo $quick[$k]['quick_shadow_color'];?>!important;
			top:50%;
			margin-top:-5px;
			
		}
		*/ ?>
		#<?php echo $pin_content_id?> .imapper-arrow-new-top::after{
			content:' ';
			display:block;
			width:15px;
			height:15px;
			transform:rotate(-45deg);
			-webkit-transform:rotate(45deg);
			-o-transform:rotate(45deg);
			-ms-transform:rotate(45deg);
			-moz-transform:rotate(45deg);
			
			position:absolute;
			box-shadow:5px -5px 5px 0px <?php echo $my_quick_rgba_color;//echo $quick[$k]['quick_shadow_color'];?>!important;
			/*top:-8px;*/
			right:4px;
			margin-top:-8px;
			background-color:transparent;
		}
		#<?php echo $pin_content_id?> .imapper-arrow-new-top::after{
			content:' ';
			display:block;
			width:15px;
			height:15px;
			transform:rotate(-45deg);
			-webkit-transform:rotate(-45deg);
			-o-transform:rotate(-45deg);
			-ms-transform:rotate(-45deg);
			-moz-transform:rotate(-45deg);
			background-color:transparent<?php //echo $quick[$k]['quick_background_color'];?>;
			
			position:absolute;
			box-shadow:5px -5px 5px 0px <?php echo $my_quick_rgba_color;//echo $quick[$k]['quick_shadow_color'];?>!important;
			/*top:-8px;*/
			left:-8px;
			top:12px;
			margin-top:-8px;
		}
		#<?php echo $pin_content_id?> .imapper-arrow-new-bottom::after{
			content:' ';
			display:block;
			width:15px;
			height:15px;
			transform:rotate(135deg);
			-webkit-transform:rotate(135deg);
			-o-transform:rotate(135deg);
			-ms-transform:rotate(135deg);
			-moz-transform:rotate(135deg);
			
			position:absolute;
			box-shadow:5px -5px 5px 0px <?php echo $my_quick_rgba_color;//echo $quick[$k]['quick_shadow_color'];?>!important;
			/*top:-8px;*/
			left:-8px;
			top:-11px;
			margin-top:-8px;
			background-color:transparent<?php //echo $quick[$k]['quick_background_color'];?>;
		}
		#<?php echo $pin_content_id?> .imapper-arrow-new-right::after{
			content:' ';
			display:block;
			width:15px;
			height:15px;
			transform:rotate(45deg);
			-webkit-transform:rotate(45deg);
			-o-transform:rotate(45deg);
			-ms-transform:rotate(45deg);
			-moz-transform:rotate(45deg);
			
			position:absolute;
			box-shadow:5px -5px 5px 0px <?php echo $my_quick_rgba_color;//echo $quick[$k]['quick_shadow_color'];?>!important;
			/*top:-8px;*/
			right:4px;
			margin-top:-8px;
			background-color:transparent<?php //echo $quick[$k]['quick_background_color'];?>;
		}
		#<?php echo $pin_content_id?> .imapper-arrow-new::after{
			content:' ';
			display:block;
			width:15px;
			height:15px;
			transform:rotate(45deg);
			-webkit-transform:rotate(45deg);
			-o-transform:rotate(45deg);
			-ms-transform:rotate(45deg);
			-moz-transform:rotate(45deg);
			
			position:absolute;
			box-shadow:-5px 5px 5px 0px <?php echo $my_quick_rgba_color;//echo $quick[$k]['quick_shadow_color'];?>!important;
			/*top:-8px;*/
			left:4px;
			margin-top:-8px;
			border-color:<?php echo $quick[$k]['quick_background_color'];?>;
			
		}
		<?php 
		}
		$my_height=44;
		if($quick_other[$k]['quick_other_title_font']['font_size']>30){
			$my_height=$quick_other[$k]['quick_other_title_font']['font_size']*1.7;
			
			?>
		#<?php echo $pin_content_id?>	.my_product_title{
			height:<?php echo $my_height;?>px !important;
		}
		<?php }?>
		<?php 
		 	$my_enable_image=$quick[$k]['quick_enable_image'];
			if(!empty($my_wp_woo_mapper_is_pin_category_1234)){
				$att_id=get_woocommerce_term_meta($my_wp_woo_mapper_is_pin_category_1234,'thumbnail_id',true);
			$my_has_thumb=false;
			if(!empty($att_id)&&$my_enable_image){
				$my_has_thumb=true;
				$my_image_src=wp_get_attachment_image_src($att_id,'shop_single');
				if(empty($my_image_src)){
					$my_image_src=wp_get_attachment_image_src($att_id,'thumnbnail');
				
				}
				
			}	
			}else {
			$att_id=get_post_thumbnail_id($product_id);
			$my_has_thumb=false;
			if(!empty($att_id)&&$my_enable_image){
				$my_has_thumb=true;
				$my_image_src=wp_get_attachment_image_src($att_id,'shop_single');
				if(empty($my_image_src)){
					$my_image_src=wp_get_attachment_image_src($att_id,'thumnbnail');
				
				}
				
			}
			if(!$my_has_thumb)$my_enable_image=0;
			if($my_enable_image==1){
				if(!$my_has_thumb)$my_enable_image=0;
				}
			}
		/**
			Calculate bottom height
		 */		
		$my_b_height_1234=45;		
		$my_f_1=(int)$quick_other[$k]['quick_other_button_1_font']['font_size'];
		$my_f_2=(int)$quick_other[$k]['quick_other_button_2_font']['font_size'];
		$my_f=$my_f_1;
		if($my_f_2>$my_f)$my_f=$my_f_2;
		if($my_f>30){
			$my_b_height_1234=$my_f*1.7;
		}		
			
		$my_total_height=$my_height+2+$my_b_height_1234;
		$my_quick_height=$quick[$k]['quick_height']-$my_total_height;
		$my_quick_width=$quick[$k]['quick_width']/2;
		$my_total_quick_width_1234_67=$quick[$k]['quick_width'];
		/**
		 * Get product image try images that width height is bigger than container
		 */
		if($my_enable_image&&(($my_image_src[1]<$my_quick_width)|| ($my_image_src[2]<$my_quick_height))){
			$try=array('medium','large','full');
			foreach($try as $key=>$val){
				$my_image_src=wp_get_attachment_image_src($att_id,$val);
				if(($my_image_src[1]>$my_quick_width)|| ($my_image_src[2]>$my_quick_height)){
						break;
				}
				}
		}
		?>
			#<?php echo $pin_content_id?> .my_product_footer{
				height:<?php echo $my_b_height_1234?>px !important;
			}
			#<?php echo $pin_content_id?> .my_add_item div,#<?php echo $pin_content_id?> .my_view_item div{
				height:<?php echo $my_b_height_1234?>px !important;
			}
			#<?php echo $pin_content_id?>	.my_view_item_category div{
				width:<?php echo $quick[$k]['quick_width'];?>px !important;
			
			}
			#<?php echo $pin_content_id?>	.my_add_item div,#<?php echo $pin_content_id?>	.my_view_item div{
				width:<?php echo $my_quick_width;?>px !important;
			
			}
			<?php if($my_enable_image){?>		
			#<?php echo $pin_content_id ?> .my_product_image_div{
				background-image:url('<?php echo $my_image_src[0];?>');
				background-size:cover;
				background-repeat:no-repeat;
				background-position:center;
			}
			<?php }?>
			<?php /*
			#<?php echo $pin_content_id?>	.my_product_main{
			height:<?php echo $my_quick_height;?>px !important;
			}*/ ?>
		#<?php echo $pin_content_id?> .my_product_title_inner{
			color:<?php echo $quick_other[$k]['quick_other_title_color'];?>!important;
			line-height:1.5 !important;
			<?php 
			/**
			 * Added overflow
			 */
			?>
			width:<?php $my_w_1234_67=$my_total_quick_width_1234_67-50;echo $my_w_1234_67.'px'?> !important;
			text-overflow:ellipsis !important;
			white-space:nowrap;
			<?php 
			/**
			 * End overflow
			 */
			?>
			
			<?php /*line-height:<?php $h=$quick_other[$k]['quick_other_title_font']['font_size'];$h+=2;echo $h.'px';?>!important;
			*/ ?>
			<?php
			$my_font_family=$quick_other[$k]['quick_other_title_font']['font']; 
			
			if($my_font_family!='default'){
			$my_font_family=my_woo_image_mapper_get_font_famyly($my_font_family);
				
				?>
			font-family:"<?php echo $my_font_family;//echo $quick_other[$k]['quick_other_title_font']['font'];?>"  , serif !important;
			<?php }?>		
			font-size:<?php echo $quick_other[$k]['quick_other_title_font']['font_size'];?>!important;
			font-style:<?php echo $quick_other[$k]['quick_other_title_font']['font_style'];?>!important;
			
			font-weight:<?php echo $quick_other[$k]['quick_other_title_font']['font_weight'];?>!important;
			max-height:<?php $h=$quick_other[$k]['quick_other_title_font']['font_size'];$h*=1.5;echo $h.'px';?>!important;
		
		}
		<?php 
		/**
		 * Add font to array
		 */
		my_woo_image_mapper_add_font($id,$quick_other[$k]['quick_other_title_font']);
		?>
		#<?php echo $pin_content_id?> .my_product_price{
			color:<?php echo $quick_other[$k]['quick_other_price_font_color']?> !important;
			
			 
			line-height:<?php $h=$quick_other[$k]['quick_other_price_font']['font_size'];$s=$h;$h+=0.5*$s;echo $h.'px';?> !important;
			 
			<?php 
			$my_font_family=$quick_other[$k]['quick_other_price_font']['font'];
			$my_price_font_family=$my_font_family;
			if($my_font_family!="default"){
				$my_font_family=my_woo_image_mapper_get_font_famyly($my_font_family);
				?>
			font-family:"<?php echo $my_font_family;//$str=$quick_other[$k]['quick_other_price_font']['font']; $str=str_replace('/+/ims',' ',$str);echo $str;?>"  , serif !important;
			<?php }?>
			font-size:<?php echo $quick_other[$k]['quick_other_price_font']['font_size']?> !important;
			font-style:<?php echo $quick_other[$k]['quick_other_price_font']['font_style']?> !important;
			font-weight:<?php echo $quick_other[$k]['quick_other_price_font']['font_weight']?> !important;
			height:<?php $h=$quick_other[$k]['quick_other_price_font']['font_size'];$s=$h;$h+=$s*0.5;echo $h.'px';?> !important;
			
			
		}
		
		<?php
		my_woo_image_mapper_add_font($id,$quick_other[$k]['quick_other_price_font']); 
		/**
		 * Add font to array
		 */
		my_woo_image_mapper_add_font($id,$quick_other[$k]['quick_other_price_font']);
		?>
		#<?php echo $pin_content_id?> .my_view_item a,#<?php echo $pin_content_id?> .my_view_item_category a{
			<?php 
			$my_line_height=$quick_other[$k]['quick_other_button_1_font']['font_size']+2;
			$my_line_height*=1.5;
			?>
			text-decoration:none !important;
			color:<?php echo $quick_other[$k]['quick_other_button_1_color']?>;
			
			line-height:<?php echo $my_line_height.'px';//echo $quick_other[$k]['quick_other_button_1_font']['font_size'];?> !important;
			<?php 
			$my_font_family=$quick_other[$k]['quick_other_button_1_font']['font'];
			if($my_font_family!='default'){
				$my_font_family=my_woo_image_mapper_get_font_famyly($my_font_family);
			?>
			font-family:"<?php echo $my_font_family;?>"  , serif !important;
			<?php }?>
			font-size:<?php echo $quick_other[$k]['quick_other_button_1_font']['font_size']?> !important;
			font-style:<?php echo $quick_other[$k]['quick_other_button_1_font']['font_style']?> !important;
			font-weight:<?php echo $quick_other[$k]['quick_other_button_1_font']['font_weight']?> !important;
			height:<?php $my_line_height;//echo $quick_other[$k]['quick_other_button_1_font']['font_size']?> !important;
			
			
		}
		<?php 
		my_woo_image_mapper_add_font($id,$quick_other[$k]['quick_other_button_1_font']);
		?>
		#<?php echo $pin_content_id?> .my_view_item,#<?php echo $pin_content_id?> .my_view_item_category{
			background-color:<?php echo $quick_other[$k]['quick_other_button_1_background_color'];?>;
		}
		<?php /*
		#<?php echo $pin_content_id?> .my_view_item:hover{
			background-color:<?php echo $quick_other[$k]['quick_other_button_1_hover_background_color'];?> !important;
		}
		*/ ?>
		#<?php echo $pin_content_id?> .my_view_item:hover a{
			text-decoration:none !important;
			<?php /*color:<?php echo $quick_other[$k]['quick_other_button_1_hover_color'];?> !important;*/ ?>
		
		}
		#<?php echo $pin_content_id?> .my_add_item a{
			<?php $my_line_height=$quick_other[$k]['quick_other_button_2_font']['font_size'];
				  $my_line_height*=1.5;	
			?>
			text-decoration:none !important;
			color:<?php echo $quick_other[$k]['quick_other_button_2_color']?>;
			<?php 
			$my_font_family=$quick_other[$k]['quick_other_button_2_font']['font'];
			/**
			 * Price i button 2 isti font ako nije
			 * dodati Times New Roman
			 */
			/*if($my_price_font_family!=$my_font_family){
				$my_font_family='Times New Roman';
			}*/
			if($my_font_family!='default'){
				$my_font_family=my_woo_image_mapper_get_font_famyly($my_font_family);
			?>
			font-family:"<?php echo $my_font_family;?>"  , serif!important;
			<?php }?>
			line-height:<?php echo $my_line_height.'px';//echo $quick_other[$k]['quick_other_button_2_font']['font_size'];?> !important;
			font-size:<?php echo $quick_other[$k]['quick_other_button_2_font']['font_size']?> !important;
			font-style:<?php echo $quick_other[$k]['quick_other_button_2_font']['font_style']?> !important;
			font-weight:<?php echo $quick_other[$k]['quick_other_button_2_font']['font_weight']?> !important;
			height:<?php echo $my_line_height.'px';//echo $quick_other[$k]['quick_other_button_2_font']['font_size']?> !important;
			
			
		}
		<?php 
		//if($my_price_font_family!=$my_font_family){
			my_woo_image_mapper_add_font($id,$quick_other[$k]['quick_other_button_2_font']);
		//}
		?>
		#<?php echo $pin_content_id?> .my_add_item{
			background-color:<?php echo $quick_other[$k]['quick_other_button_2_background_color'];?>;
		}
		<?php /*
		#<?php echo $pin_content_id?> .my_add_item:hover{
			background-color:<?php echo $quick_other[$k]['quick_other_button_2_hover_background_color'];?> !important;
		} */ ?>
		#<?php echo $pin_content_id?> .my_add_item:hover a{
			text-decoration:none !important;
			<?php /*color:<?php echo $quick_other[$k]['quick_other_button_2_hover_color'];?> !important;*/ ?>
		
		}
	
		#<?php echo $pin_content_id?> .my_product_description{
		<?php $my_line_height=$quick_other[$k]['quick_other_description_font']['font_size']+6;
		?>
			<?php 
			/**
			 * Text overflow
			 */
			
			?>
			
			
			<?php 
			/**
			 * End text overflow
			 */
			?>
			
			color:<?php echo $quick_other[$k]['quick_other_description_color']?> !important;
			<?php 
			$my_font_family=$quick_other[$k]['quick_other_description_font']['font'];
			if($my_font_family!='default'){
				$my_font_family=my_woo_image_mapper_get_font_famyly($my_font_family);
			?>
			font-family:"<?php echo $my_font_family;?>"  , serif !important;
			<?php }?>
			line-height:<?php echo '1.5';//echo $my_line_height.'px';?> !important;
			font-size:<?php echo $quick_other[$k]['quick_other_description_font']['font_size']?> !important;
			font-style:<?php echo $quick_other[$k]['quick_other_description_font']['font_style']?> !important;
			font-weight:<?php echo $quick_other[$k]['quick_other_description_font']['font_weight']?> !important;
			<?php /*
			height:<?php echo $quick_other[$k]['quick_other_description_font']['font_size']?> !important;
			*/ ?>
		
		}
		
		<?php
		my_woo_image_mapper_add_font($id,$quick_other[$k]['quick_other_description_font']);
		 
		$added_css.=ob_get_clean();	
		$added_css=preg_replace('/\r\n/ims','',$added_css);
		$added_css=preg_replace('/\n/ims','',$added_css);
		
	
	return $added_css;
}
/**
 * Get post excerpt
 * @param unknown_type $id
 * @param unknown_type $len
 * @param unknown_type $total_length
 * @return string
 */
function my_woo_image_mapper_get_the_excerpt($id,$len=50,$total_length=500){
					$my_post=get_post($id);
					$post_excerpt=$my_post->post_excerpt;
					if(empty($post_excerpt)){
						$post_excerpt=$my_post->post_content;
						$post_excerpt=strip_tags($post_excerpt);
						
					}else {
						$post_excerpt=strip_tags($post_excerpt);
					}	
					$post_excerpt=strip_shortcodes($post_excerpt);
					$post_excerpt=trim($post_excerpt);
					$arr=explode(" ",$post_excerpt);
					//$arr=preg_split('/\b/',$post_excerpt);
					$ret=$post_excerpt;
					$total=0;
					$ret='';
					$c=1;
					foreach($arr as $k=>$v){
						$to_add=$v;
						$total_1=$total+strlen($to_add);
						if($total_1>=$total_length){
							break;
						}
						if($c==$len){
							break;	
						}
						$ret.=$to_add.' ';
						$total+=strlen($to_add);
					}				
			return $ret;
}
/**
 * get product price
 */
function my_woo_image_mapper_get_product_price($id){
	$ret['curr']=get_woocommerce_currency();
	$ret['regular']=get_post_meta($id,'_regural_price',true);
	$ret['sale']=get_post_meta($id,'_sale_price',true);
	return $ret;
	
}
/**
 * 
 * @param $pin
 */
function my_woo_image_mapper_pin_css($pin){
	$css='';
	$css.='background-color:'.$pin['pin_background_color'].';';
	$css.='opacity:'.$pin['pin_background_transparency'].';';
	if($pin['pin_enable_line']){
		$css.='border-color:'.$pin['pin_line_color'].';';
	}else $css.='border:none';
	
	
	return $css;
}
/**
 * 
 * @param $pin
 */
function my_woo_image_mapper_pin_dot_css($pin){
	$css='';
	if($pin['pin_enable_dot']==1){
		$css.='border-color:'.$pin['pin_dot_color'];
	}
	return $css;
}
/**
 * Delete mapper
 * @param unknown_type $id
 * @return multitype:number string
 */
function my_woo_image_mapper_delete($id){
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	$is_exists=my_woo_image_mapper_is_exist_object($id);
	if(empty($is_exists)){
		$ret=array(
			'error'=>1,
			'msg'=>__("Woo Image Mapper with the ID ","woo_image_mapper_domain").$id.__(" dont't exists !","woo_image_mapper_domain")
		);
	}else {
		$query_1="DELETE FROM ".$my_woo_table_immaper_object_meta." WHERE ";
		$query_1.=" object_id=%d";
		$query_1=$wpdb->prepare($query_1,$id);
		$query_2="DELETE FROM ".$my_woo_table_immaper_object." WHERE ";
		$query_2.=" ID=%d";
		$query_2=$wpdb->prepare($query_2,$id);
		//echo 'Query 1 '.$query_1.'<br/>';
		//echo 'Query 2 '.$query_2;
		$wpdb->query($query_1);
		$wpdb->query($query_2);
		$ret=array(
			'error'=>0,
			'msg'=>__("Woo Image Mapper has been deleted !","woo_image_mapper_domain")
		);
	}
	return $ret;	
}
/**
 * Get post title
 * @param $ID
 */
function my_woo_mapper_get_post_title($ID){
	global $wpdb;
	$query="SELECT post_title FROM ".$wpdb->posts;
	$query.=" WHERE ID=%d";
	$query=$wpdb->prepare($query,$ID);
	return $wpdb->get_var($query);
}
/**
 * Get obejct title
 * @param $object_id
 */
function my_woo_mapper_get_object_title($object_id){
	global $wpdb;
	global $my_woo_table_immaper_object;
	$query="SELECT title FROM ".$my_woo_table_immaper_object;
	$query.=" WHERE ID=%d";
	$query=$wpdb->prepare($query,$object_id);
	$var=$wpdb->get_var($query);
	$var=stripslashes($var);
	return $var;
}
/**
 * Get meta
 * @param $object_id
 * @param $key
 */
function my_woo_image_mapper_get_meta_val($object_id,$key){
	global $wpdb;
	global $my_woo_table_immaper_object_meta;
	$is_exixst=my_woo_image_mapper_is_exist_meta($object_id,$key);
	if(empty($is_exixst)){
		return array();
	}
	$query="SELECT meta_value FROM ".$my_woo_table_immaper_object_meta;
	$query.=" WHERE object_id=%d AND meta_key=%s";
	$query=$wpdb->prepare($query,$object_id,$key);
	$var=$wpdb->get_var($query);
	$var=maybe_unserialize($var);
	stripslashes_deep($var);
	return $var;
}
/**
 * Add meta
 * @param unknown_type $object_id
 * @param unknown_type $key
 * @param unknown_type $arr
 */
function my_woo_image_mapper_add_meta($object_id,$key,$arr){
	global $wpdb;
	//$wpdb->show_errors();
	$old_general_id=my_woo_image_mapper_get_meta($object_id,$key);
	$array_str=maybe_serialize($arr);
	global $my_woo_table_immaper_object_meta;
	
	if(empty($old_general_id)){
		$wpdb->insert($my_woo_table_immaper_object_meta,array(
			'meta_key'=>$key,
			'object_id'=>$object_id,
			'meta_value'=>$array_str
		));	
		
		
	}else {
		$wpdb->update($my_woo_table_immaper_object_meta,array(
			'meta_key'=>$key,
			'object_id'=>$object_id,
			'meta_value'=>$array_str
		),array('object_id'=>$object_id,'meta_key'=>$key));	
		
	}
}
/**
 * Check fields
 * @param unknown_type $val
 * @param unknown_type $field
 */
function my_woo_image_mapper_check_field($val,$field,$my_key=''){
	global $my_woo_immaper_fonts;
	global $my_woo_mapper_font_sizes_array;
	global $my_woo_mapper_font_styles;
	global $my_woo_mapper_font_weight;
	global $my_woo_mapper_my_animations_in;
	global $my_woo_mapper_my_animations_out;
	if($field['type']=='select'){
		if(strpos($my_key,'animation_in')!==false){
			$arr=$my_woo_mapper_my_animations_in;
			if(!array_key_exists($val,$arr)){
				$val=$field['default'];
				
			}
			return $val;
		}else if(strpos($my_key,'animation_out')!==false){
			$arr=$my_woo_mapper_my_animations_out;
			if(!array_key_exists($val,$arr)){
				$val=$field['default'];
				
			}
			return $val;
	
		}
		return $val;
		
		
	}
	else if($field['type']=='on_off'){
		$val=my_woo_image_mapper_check_on_off($val,$field);
		return $val;
	}else if($field['type']=='slider'){
		$min=$field['min'];
		$max=$field['max'];
		$val=(float)$val;
		if(($val<$min) || ($val > $max)){
			$val=$field['default'];
		}
		return (float)$val;
	}else if($field['type']=='color_picker'){
		return $val;
	}else if($field['type']=='font'){
		$default=$field['default'];
		foreach($val as $key=>$val_pre){
			if($key=='font'){
				if(!array_key_exists($val_pre,$my_woo_immaper_fonts)){
					$val[$key]=$default[$key];
				}
			}else if($key=='font_size'){
				$start=$my_woo_mapper_font_sizes_array['start'];
				$end=$my_woo_mapper_font_sizes_array['end'];
				if(($val_pre<$start) || ($val_pre>$end)){
					$val[$key]=$default[$key];
				}
				
				
			}else if($key=='font_style'){
				if(!array_key_exists($val_pre,$my_woo_mapper_font_styles)){
					$val[$key]=$default[$key];
				}
			}else if($key=='font_weight'){
				if(!array_key_exists($val_pre,$my_woo_mapper_font_weight)){
					$val[$key]=$default[$key];
				}
				
			}
		}
		return $val;
	}else {
		return $val;
	}
}
/**
 * 
 * @param unknown_type $val
 * @param unknown_type $options
 */
function my_woo_image_mapper_check_on_off($val,$field){
	if(empty($val))return 0;
	
	if(!in_array($val,array('true','false'))){
		$val=$field['default'];
	}
	if($val=='true')return 1;
	else if($val=='false')return 0;
	
}
/**
 * Save immaper
 */
function my_woo_image_mapper_save_mapper(){
	global $my_woo_immaper_fonts;
 	$my_woo_immaper_fonts=my_woo_image_mapper_get_google_fonts();
	
 	global $my_woo_mapper_my_animations_out;
	global $my_woo_mapper_my_animations_in;
	global $my_woo_mapper_font_weight;
	global $my_woo_mapper_font_styles;
	global $my_woo_mapper_font_sizes_array;
	global $my_woo_mapper_pre_options;
 	$ret['error']=0;
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	global $my_woo_mapper_debug;
global $my_woo_mapper_debug_data;
	global $my_woo_mapper_options;
$my_cats_123456=my_woo_mapper_get_categories();
$my_woo_mapper_options['category']['pin_category_id']['values']=$my_cats_123456;
	/**
	 * Check if we have id to save immaper
	 */
	$image_mapper_id=@$_POST['image_mapper_id'];
	if(!empty($image_mapper_id)){
		$is_exists_mapper=my_woo_image_mapper_is_exist_object($image_mapper_id);
		if(empty($is_exists_mapper)){
			$ret['error']=1;
			$ret['msg']=__("Woo Image Mapper don't exists !","woo_image_mapper_domain");
			return $ret;
		}
		$image_mapper_title=@$_POST['image_mapper_title'];
		if(empty($image_mapper_title)){
			$title=__("Default woomapper ","woo_image_mapper_domain").$image_mapper_id;
			
		}else $title=$image_mapper_title;
		$wpdb->update($my_woo_table_immaper_object,array(
			'title'=>$title),array('ID'=>$image_mapper_id));	
		$ret['id']=$image_mapper_id;
		
		my_woo_image_mapper_add_meta($image_mapper_id,'updated_time',time());
	}else {
		$image_mapper_title=@$_POST['image_mapper_title'];
		$wpdb->insert($my_woo_table_immaper_object,array(
			'title'=>$image_mapper_title
		));
		$image_mapper_id=$wpdb->insert_id;
		if(empty($image_mapper_title)){
			$title=__("Default woomapper ","woo_image_mapper_domain").$image_mapper_id;
			$wpdb->update($my_woo_table_immaper_object,array(
			'title'=>$title),array('ID'=>$image_mapper_id));	
		}
		$ret['id']=$image_mapper_id;
		my_woo_image_mapper_add_meta($image_mapper_id,'created_time',time());
	}
	global $my_woo_mapper_options;
	
	/**
	 * Save general data
	 */
	$general_options=$my_woo_mapper_options['general'];
	$general_options_array=array();
	$general_options_key='general';
	$image_url=@$_POST['map-image'];
	$image_id=@$_POST['map-image-id'];
	//$general_options_array['image_url']=$image_url;
	//$general_options_array['image_id']=$image_id;
	my_woo_image_mapper_add_meta($image_mapper_id,'image_id',$image_id);
		
	foreach($general_options as $k=>$v){
		$val=@$_POST[$k];
		/**
		 * Check field
		 * @var unknown_type
		 */
		$val=my_woo_image_mapper_check_field($val,$v);
		$general_options_array[$k]=$val;
		
	}
	my_woo_image_mapper_add_meta($image_mapper_id,$general_options_key,$general_options_array);
	if($my_woo_mapper_debug){
		$my_woo_mapper_debug_data['general']=$general_options_array;
	}
	/**
	 * Save pins options
	 */
	
	
	/**
	 * Save pins data
	 */
	//$all_options=array_merge()
	$my_pins=@$_POST['my_pins'];
	if(!empty($my_pins)){
		$my_pins_arr=explode(",",$my_pins);
		foreach($my_pins_arr as $k=>$v){
			if(empty($v))unset($my_pins_arr[$k]);
		}
		asort($my_pins_arr);
		if($my_woo_mapper_debug){
			$my_woo_mapper_debug_data['pins_arra']=$my_pins_arr;
			
		}
		if(!empty($my_pins_arr)){
			$pins_options=$my_woo_mapper_options['pin'];
			$pins_options_array=array();
			$quick_options_array=array();
			$hover_options_array=array();
			$quick_other_array=array();
			$category_all_array=array();
			$quick_options=$my_woo_mapper_options['quick'];
			$hover_options=$my_woo_mapper_options['hover'];
			$quick_other=$my_woo_mapper_options['quick_other'];
			$category_options=$my_woo_mapper_options['category'];
			foreach($my_pins_arr as $k=>$v){
				$pos_x_key='sort'.$v.'-imapper-item-x';
				$pos_y_key='sort'.$v.'-imapper-item-y';
				$product_id_key='hidden_pin_product_'.$v;
				$pos_x=@$_POST[$pos_x_key];
				$pos_y=@$_POST[$pos_y_key];
				$my_pin_icon=@$_POST['my_pin_icon_'.$v];
				$new_pins_array=array();
				$new_pins_array['pos_x']=$pos_x;
				$new_pins_array['pos_y']=$pos_y;
				$new_pins_array['product_id']=@$_POST[$product_id_key];
				$new_pins_array['pin_icon']=$my_pin_icon;
				foreach($pins_options as $key=>$field){
					if($field['type']=='font'){
						$default=$field['default'];
						$val=array();
						foreach($default as $k1=>$v1){
							$new_name=$k1.$key.'_'.$v;
							$val_tmp=@$_POST[$new_name];
							$val[$k1]=$val_tmp;
						}
						if($my_woo_mapper_debug){
							$my_woo_mapper_debug_data['fonts'][]=$val;
						}
					}else {
						$my_key=$key.'_'.$v;
						$val=@$_POST[$my_key];
					}
					$val=my_woo_image_mapper_check_field($val,$field,$key);
					$new_pins_array[$key]=$val;
				}
				$new_category_arr=array();
				foreach ($category_options as $key=>$field){
					$my_key=$key.'_'.$v;
					$val=@$_POST[$my_key];
					//echo 'Key '.$key.' my_key '.$my_key.' val '.$val;
					$val=my_woo_image_mapper_check_field($val,$field,$key);
					//echo 'New val '.$val;
					$new_category_arr[$key]=$val;
					//print_r($new_category_arr);
				}
				$new_hover_array=array();
					
				foreach($hover_options as $key=>$field){
					if($field['type']=='font'){
						$default=$field['default'];
						$val=array();
						foreach($default as $k1=>$v1){
							$new_name=$k1.$key.'_'.$v;
							$val_tmp=@$_POST[$new_name];
							$val[$k1]=$val_tmp;
						}
						if($my_woo_mapper_debug){
							$my_woo_mapper_debug_data['fonts'][]=$val;
						}
					}else {
						$my_key=$key.'_'.$v;
						$val=@$_POST[$my_key];
					}
					$val=my_woo_image_mapper_check_field($val,$field,$key);
					$new_hover_array[$key]=$val;
				}
				$new_quick_array=array();
				foreach($quick_options as $key=>$field){
					if($field['type']=='font'){
						$default=$field['default'];
						$val=array();
						foreach($default as $k1=>$v1){
							$new_name=$k1.$key.'_'.$v;
							$val_tmp=@$_POST[$new_name];
							$val[$k1]=$val_tmp;
						}
						if($my_woo_mapper_debug){
							$my_woo_mapper_debug_data['fonts'][]=$val;
						}
					}else {
						$my_key=$key.'_'.$v;
						$val=@$_POST[$my_key];
					}
					$val=my_woo_image_mapper_check_field($val,$field,$key);
					$new_quick_array[$key]=$val;
				}
				$new_quick_other_array=array();
				foreach($quick_other as $key=>$field){
					if($field['type']=='font'){
						$default=$field['default'];
						$val=array();
						foreach($default as $k1=>$v1){
							$new_name=$k1.$key.'_'.$v;
							$val_tmp=@$_POST[$new_name];
							$val[$k1]=$val_tmp;
						}
						if($my_woo_mapper_debug){
							$my_woo_mapper_debug_data['fonts'][]=$val;
						}
					}else {
						$my_key=$key.'_'.$v;
						$val=@$_POST[$my_key];
					}
					$val=my_woo_image_mapper_check_field($val,$field,$key);
					$new_quick_other_array[$key]=$val;
				}
				$hover_options_array[]=$new_hover_array;
				
				$pins_options_array[]=$new_pins_array;
				$quick_options_array[]=$new_quick_array;
				$quick_other_array[]=$new_quick_other_array;
				$category_all_array[]=$new_category_arr;
				//$pins_options_array['x']
			}
			
			my_woo_image_mapper_add_meta($image_mapper_id,'pins',$pins_options_array);
			my_woo_image_mapper_add_meta($image_mapper_id,'quick',$quick_options_array);
			my_woo_image_mapper_add_meta($image_mapper_id,'hover',$hover_options_array);
			my_woo_image_mapper_add_meta($image_mapper_id,'quick_other',$quick_other_array);
			my_woo_image_mapper_add_meta($image_mapper_id,'category',$category_all_array);
			
			
		}
	}
	if($my_woo_mapper_debug){
		$ret['my_debug_data']=$my_woo_mapper_debug_data;
	}
	
	$ret['error']=0;
	return $ret;
}
function my_woo_image_mapper_get_meta($id,$key){
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	//$wpdb->show_errors();
	$query="SELECT object_id AS num FROM ".$my_woo_table_immaper_object_meta." ";
	$query.="WHERE object_id=%d AND meta_key=%s";
	$query=$wpdb->prepare($query,$id,$key);
	$val=$wpdb->get_var($query);
	//echo 'Query '.$query.' val '.$val;
	return $val;
}

/**
 * is exist object meta
 */
function my_woo_image_mapper_is_exist_meta($id,$key){
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	//$wpdb->show_errors();
	$query="SELECT COUNT(*) AS num FROM ".$my_woo_table_immaper_object_meta." ";
	$query.="WHERE object_id=%d AND meta_key=%s";
	$query=$wpdb->prepare($query,$id,$key);
	$val=$wpdb->get_var($query);
	//echo 'Query '.$query.' val '.$val;
	return $val;
}
/*
 * is exists object
 */
function my_woo_image_mapper_is_exist_object($id){
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	//$wpdb->show_errors();
	$query="SELECT COUNT(*) AS num FROM ".$my_woo_table_immaper_object." ";
	$query.="WHERE id=%d";
	$query=$wpdb->prepare($query,$id);
	$val=$wpdb->get_var($query);
	//echo 'Query '.$query.' val '.$val;
	return $val;
}

/*
 * Debug
 */
function my_woo_image_mapper_debug($t,$o){
	global $my_woo_mapper_debug;
	if($my_woo_mapper_debug){
		?>
		<h4><?php echo $t;?></h4>
		<pre><?php print_r($o);?></pre>
		<?php 
	}
}
/**
 * Get woo product
 * @param unknown_type $term
 * @param unknown_type $limit
 */
function my_woo_image_mapper_get_woo_products($term,$limit=10){
	global $wpdb;
	global $my_woo_mapper_debug;
	global $my_woo_mapper_debug_data;
	global $my_woo_mapper_woo_product;
	if($my_woo_mapper_debug){
		$wpdb->show_errors();
	}
	$term=stripslashes($term);
	$term=preg_replace('/%/ims','',$term);
	$query="SELECT ID,post_title FROM ".$wpdb->posts." WHERE ";
	$query.=" post_type=%s AND post_status='publish' AND ";
	$query.=" post_title like %s";
	$query.=" limit 0,".$limit;
	$query=$wpdb->prepare($query,$my_woo_mapper_woo_product,$term."%");
	$ret_old=$wpdb->get_results($query);
	$ret=array();
	if(!empty($ret_old)){
		foreach($ret_old as $k=>$v){
			//$ret[$v->ID]=$v->post_title;
			
			$ret[]=array('id'=>$v->ID,'label'=>$v->post_title);
		}
	}
	if($my_woo_mapper_debug){
		$my_woo_mapper_debug_data['query'][]=array(
			'term'=>$term,
			'query'=>$query,
			'res'=>$ret_old,
			'ret'=>$ret
		);
	}
	return $ret;
	
	
}
/**
 * Prepare msg to javascript string
 * @param $msg
 */
function my_woo_image_mapper_format_str_to_jscript($msg){
	$msg=preg_replace('/"/ims','',$msg);
	return $msg;
}

/**
 * Get saved mappers
 * @param $per_page
 */
function my_woo_image_mapper_get_mappers($per_page=1){
	global $wpdb;
	global $my_woo_table_immaper_object;
	global $my_woo_table_immaper_object_meta;
	
	$page=@$_REQUEST['my_page'];
	if(!isset($page))$page=1;
	$wpdb->show_errors();
	$count_query="SELECT COUNT(*) AS num ";
	//$count_query.=" FROM ".$wpdb->prefix.'image_mapper';
	$count_query.=" FROM ".$my_woo_table_immaper_object;
	//$count_query=$wpdb->prepare($count_query,$post_id);
	$count=$wpdb->get_var($count_query);
	//echo 'Query '.$count_query.' count '.$count;
	$ret['page']=$page;
	$ret['count']=$count;
	$ret['results']=array();
	$ret['columns']['ID']=array('width'=>'5%','title'=>__("ID","woo_image_mapper_domain"),'order'=>false);
	$ret['columns']['name']=array('width'=>'30%','title'=>__("Name","woo_image_mapper_domain"),'order'=>false);
	$ret['columns']['shortcode']=array('width'=>'30%','title'=>__("Shortcode","woo_image_mapper_domain"),'order'=>false);
	$ret['actions']=array('delete'=>__("Delete","woo_image_mapper_domain"));
	
	
	$ret['form_params']['my_page']=$page;
	$pages=ceil($count/$per_page);
	$ret['page']=$page;
	$ret['pages']=$pages;
	
	if(($page<=0) ||($page>$pages))$page=1;
	$poc=($page-1)*$per_page;
	
	if($count==0){
		return $ret;
	}
	/*$my_order_col=@$_REQUEST['my_order_col'];
	if(!isset($my_order_col)){
		$my_order_col='';
		$my_order='';
	}else {
		$my_order=@$_REQUEST['my_order'];
	}*/
	$query="SELECT ID,title FROM ".$my_woo_table_immaper_object;
	$query.=" limit $poc,$per_page";
	$res=$wpdb->get_results($query);
	$ret_arr=array();
	if(!empty($res)){
		foreach($res as $k=>$v){
			$title=$v->title;
			$title=stripslashes($title);
			$id=$v->ID;
			$obj=new stdClass();
			$obj->ID=$id;
			$o_title=$title;
			if(strlen($o_title)>40){
				$o_title=substr($o_title,0,37).'...';
			}
			$url=admin_url('admin.php?page=woo-imagemapper_edit&id='.$id);
			$obj->name='<a title="'.__("Edit","woo_image_mapper_domain").'" href="'.$url.'">'.$o_title.'</a>';
			$obj->shortcode='[woo_mapper id="'.$id.'"]';
			$ret_arr[]=$obj;
		}
	}
	$ret['results']=$ret_arr;
	return $ret;
	
	
}
	       	
/*
 * Function to get google fonts
 */
function my_woo_image_mapper_get_google_fonts($json = false) {
				        $current_date = getdate(date("U"));
				     
				        $current_date = $current_date['weekday'] . $current_date['month'] . $current_date['mday'] . $current_date['year'];
				     	/**
				     	 * Option dont exists
				     	 */
				        if (!get_option('br0_my_admin_webfonts')) {
				            $file_get = wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt");
				            if (strlen($file_get) > 100) {
				            			
				                add_option('br0_my_admin_webfonts', $file_get);
				                add_option('br0_my_admin_webfonts_date', $current_date);
											
				            }
				        }
				     	/**
				     	 * Date is not same
				     	 */																			 
				        if (get_option('br0_my_admin_webfonts_date') != $current_date || get_option('br0_my_admin_webfonts_date') == '') {
				            //$my_init_file=plugin_dir_path(__FILE__).'fonts.txt';
				        	//$file_get =file_get_contents($my_init_file); 
				            
				            $file_get=wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt");
				            if (strlen($file_get) > 100) {
				            				 	
				                update_option('br0_my_admin_webfonts', wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt"));
				                update_option('br0_my_admin_webfonts_date', $current_date);
				            				    }
				        }
				        /*
				        	//Get fonts locally remove 
				        	//Localyy get fonts
 							$my_init_file=plugin_dir_path(__FILE__).'fonts.txt';
				        	//echo $my_init_file;
 							$file_get =file_get_contents($my_init_file); 
				            //echo $file_get;
				            
				            //$file_get=wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt");
				            if (strlen($file_get) > 100) {
				                update_option('br0_my_admin_webfonts', $file_get);//wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt"));
				                update_option('br0_my_admin_webfonts_date', $current_date);
				            }
				    	*/
				     							 	
				        $fontsjson = get_option('br0_my_admin_webfonts');
				        $decode = json_decode($fontsjson, true);
				        //print_r($decode);
				        $webfonts = array();
				        $webfonts['default'] = 'Default' . '|' . 'def';
				       	$my_web_fonts=array();
				        if(!empty($decode['items'])){
				        foreach ($decode['items'] as $key => $value) {
				            $item_family = $decode['items'][$key]['family'];
				            $item_family_trunc = str_replace(' ', '+', $item_family);
				            $webfonts[$item_family_trunc] = $item_family . '|' . $item_family_trunc;
				            $my_web_fonts[$item_family_trunc]=$value;
				        }
				       	}
				       				   	
				       	update_option("br0_my_admin_web_fonts",$my_web_fonts);
				        if ($json)
				            return $fontsjson;
				        return $webfonts;
}