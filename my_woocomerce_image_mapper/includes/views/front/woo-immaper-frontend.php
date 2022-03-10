<?php
if(!defined('ABSPATH'))die('');
$is_exists=my_woo_image_mapper_is_exist_object($id);
$html='';
//echo $id;
if(!empty($is_exists)){
$my_image_mapper_id=$id;	
$mapper_title=my_woo_mapper_get_object_title($my_image_mapper_id);
$pins=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'pins');
$quick=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'quick');
$hover=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'hover');
$general=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'general');
$quick_other=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'quick_other');
//my_woo_image_mapper_debug("Quick other",$quick_other);
$my_mapper_title=my_woo_mapper_get_object_title($my_image_mapper_id);
$my_mapper_image_id=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'image_id');
$my_mapper_image_src=wp_get_attachment_image_src($my_mapper_image_id,'full');
$my_category_options=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'category');


$added_css='';
ob_start();
if($general['image_overlay']==1){
?>
.my_imapper_overlay_<?php echo $id;?>{
	background-color:<?php echo $general['image_overlay_color'];?>;
	opacity:<?php echo $general['image_overlay_transparency'];?>;
}
<?php }
$added_css.=ob_get_clean();
$added_css=preg_replace('/\r\n/ims','',$added_css);
		$added_css=preg_replace('/\n/ims','',$added_css);
?>

<?php ob_start();?>
<div id="imagemapper<?php echo $id;?>-wrapper" class="imagemapper-wrapper" style="clear: both;">
		<img id="imapper<?php echo $id;?>-map-image" style="max-width: 100%;" src="<?php if(!empty($my_mapper_image_src))echo $my_mapper_image_src[0];else $this->url . 'images/no_image.jpg';?>" />
	<?php 
	foreach($pins as $k=>$pin){
		global $my_wp_woo_mapper_is_pin_category_1234;
		$my_wp_woo_mapper_is_pin_category_1234=0;
		if(!empty($my_category_options[$k]['pin_category_id'])){
			$my_wp_woo_mapper_is_pin_category_1234=$my_category_options[$k]['pin_category_id'];
			$my_wp_woo_mapper_term=get_term($my_wp_woo_mapper_is_pin_category_1234,'product_cat');
		}	
		$pin_id=$k+1;
		$pin_css=my_woo_image_mapper_pin_css($pin);
		$my_pin_id='imapper'.$id.'-pin'.$pin_id;
		$product_id=$pin['product_id'];
			$added_css.=my_woo_image_mapper_get_css_pin($product_id,$id,$k,$pin_id,$pin,$general,$hover,$quick,$quick_other);
			$my_enable_image=$quick[$k]['quick_enable_image'];
			/*if($my_enable_image){
			}*/
			$override_text_title=$quick_other[$k]['quick_other_overide_title_text'];
			if(empty($my_wp_woo_mapper_is_pin_category_1234)){
			$att_id=get_post_thumbnail_id($product_id);
			$my_has_thumb=false;
			if(!empty($att_id)&&$my_enable_image){
				$my_has_thumb=true;
				$my_image_src=wp_get_attachment_image_src($att_id,'shop_single');
				if(empty($my_image_src)){
					$my_image_src=wp_get_attachment_image_src($att_id,'thumnbnail');
				
				}
				
			}}else {
				$my_has_thumb=false;
				$att_id=get_woocommerce_term_meta($my_wp_woo_mapper_is_pin_category_1234,'thumbnail_id',true);
				if((empty($att_id)||(!$my_enable_image))){
					$my_has_thumb=false;
				}else $my_has_thumb=true;
			$my_image_src=wp_get_attachment_image_src($att_id,'shop_single');
				if(empty($my_image_src)){
					$my_image_src=wp_get_attachment_image_src($att_id,'thumnbnail');
				
				}
			}
			if(!$my_has_thumb)$my_enable_image=0;
			if($my_enable_image==1){
				if(!$my_has_thumb)$my_enable_image=0;
				}
			?>
			<div data-pin-id="<?php echo $pin_id;?>" id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>-my-content-wrapper" class="imapper<?php echo $id;?>-pin-my-content-wrapper imapper-my-content-wrapper" data-back-color="<?php echo $hover[$k]['hover_background_color']?>" data-border-color="<?php ?>" data-border-radius="0" data-width="<?php echo '200px';?>" data-height="<?php //$w=(float)$quick[$k]['quick_height'];echo $w.'px';?>" data-text-color="<?php ?>" data-font=" &quot;'<?php $font=$quick_other[$k]['quick_other_price_font']['font'];$font=str_replace('+',' ',$font);echo $font;?>'&quot;;" data-my-hover-open="top" data-my-hover-in-animation="<?php echo $hover[$k]['hover_animation_in']?>" data-my-hover-out-animation="<?php echo $hover[$k]['hover_animation_out'];?>" data-my-enable-shadow="<?php echo $hover[$k]['hover_enable_shadow']?>" data-my-shadow-width="10">
				<div class="my_hover_inner_1234">
				<div class="my_hover_title">
				<div>
				<?php
				
			if(!empty($my_wp_woo_mapper_is_pin_category_1234)){
				$title='';
				if(!empty($my_category_options[$k]['pin_category_title'])){
					$title=$my_category_options[$k]['pin_category_title'];}
				else if(!empty($my_wp_woo_mapper_term)){
					$title=$my_wp_woo_mapper_term->name;
				}	
				echo $title;
			}else {	 
			if(!empty($override_text_title)){
				echo $override_text_title;
			}else {
				$title=my_woo_mapper_get_post_title($product_id);
				echo $title;
			}
			}
			?>
				</div>
			</div>
			</div>
			</div><!--  hover div html --> 
		<div data-my-in-animation="<?php  echo $quick[$k]['quick_animation_in'];?>" data-my-out-animation="<?php echo $quick[$k]['quick_animation_out'];?>" data-pin-id="<?php echo $pin_id;?>" id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>-wrapper" data-open-position="<?php if(!isset($quick[$k]['quick_open_position']))echo 'right';else echo $quick[$k]['quick_open_position'];//Open position?>" data-left="<?php echo $pin['pos_x']//?>" data-top="<?php echo $pin['pos_y']?>" data-pin-color="<?php echo $pin['pin_background_color'];?>"  data-imapper-click-action="<?php echo 'content';?>" data-imapper-hover-action="<?php echo 'my_content';?>" class="imapper<?php echo $id;?>-pin-wrapper imapper-pin-wrapper" style="position: absolute;" data-my-hover-back-color="<?php echo $hover[$k]['hover_background_color']?>" data-my-hover-open="top" data-my-hover-in-animation="<?php echo $hover[$k]['hover_animation_in']?>" data-my-hover-out-animation="<?php echo $hover[$k]['hover_animation_out'];?>">
			<?php /*
			<span style="display:none" id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>" class="imapper<?php echo $id;?>-pin imapper-pin iMapper-pin-1"></span>
			*/ ?>
			<?php if(!empty($pin['pin_icon'])){
				
				?>
			<div data-pin-id="<?php echo $pin_id;?>" id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>" class="imapper<?php echo $id;?>-pin" style="<?php //echo $pin_css;?>">
				<img src="<?php echo $pin['pin_icon'];?>"/>
			</div>
			
			<?php }else {?>
			<div data-pin-id="<?php echo $pin_id;?>" id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>" class="imapper<?php echo $id;?>-pin imapper-pin-wrapper-my-inner-front" style="<?php echo $pin_css;?>">
				<?php
				
				if($pin['pin_enable_dot']==1){
					$pin_dot_css=my_woo_image_mapper_pin_dot_css($pin);
					?>
				<div class="my_inner_dot-front" style="<?php echo $pin_dot_css;?>"></div>
				<?php }?>
				
			</div><!-- end dot html -->
			<?php 
			}
			/*
			<?php 
			$product_id=$pin['product_id'];
			$override_text_title=$quick_other[$k]['quick_other_overide_title_text'];
			?>
			<div id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>-my-content-wrapper" class="imapper<?php echo $id;?>-pin-my-content-wrapper imapper-my-content-wrapper" data-back-color="<?php echo $hover[$k]['hover_background_color']?>" data-border-color="<?php ?>" data-border-radius="0" data-width="<?php echo '200px';?>" data-height="<?php //$w=(float)$quick[$k]['quick_height'];echo $w.'px';?>" data-text-color="<?php ?>" data-font=" &quot;'<?php $font=$quick_other[$k]['quick_other_price_font']['font'];$font=str_replace('+',' ',$font);echo $font;?>'&quot;;" >
				<div class="my_hover_title">
				<?php 
			if(!empty($override_text_title)){
				echo $override_text_title;
			}else {
				$title=my_woo_mapper_get_post_title($product_id);
				echo $title;
			}
			?></div>
			</div><!--  hover div html --> 
			*/ ?>
			<div id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>-content-wrapper" class="imapper<?php echo $id;?>-pin-content-wrapper imapper-content-wrapper" data-back-color="<?php echo $quick[$k]['quick_background_color']?>" data-border-color="<?php echo $quick[$k]['quick_background_color'];?>" data-border-radius="0" data-width="<?php $w=(float)$quick[$k]['quick_width'];echo $w.'px';?>" data-height="<?php $w=(float)$quick[$k]['quick_height'];echo $w.'px';?>" data-text-color="" data-font=" &quot;'<?php $font=$quick_other[$k]['quick_other_price_font']['font'];$font=str_replace('+',' ',$font);echo $font;?>'&quot;;">
			<div id="imapper<?php echo $id;?>-pin<?php echo $pin_id;?>-content" class="imapper-content" style="font-family: &quot;<?php echo $font ;?>&quot;;" data-my-enable-shadow="<?php echo $quick[$k]['quick_enable_shadow'];?>" data-my-shadow-width="10">
			<div class="my_product_header">
				<div class="my_product_title">
					<div class="my_product_title_inner">
					<?php 
					if(!empty($my_wp_woo_mapper_is_pin_category_1234)){
						$title='';
				if(!empty($my_category_options[$k]['pin_category_title'])){
					$title=$my_category_options[$k]['pin_category_title'];}
				else if(!empty($my_wp_woo_mapper_term)){
					$title=$my_wp_woo_mapper_term->name;
				}	
				echo $title;
					}else {	
					if(!empty($override_text_title)){
						echo $override_text_title;
					}else {
						$title=my_woo_mapper_get_post_title($product_id);
						echo $title;
					}
					}
					?>
				</div>
				<div class="my_product_close" data-color="<?php echo $quick[$k]['quick_close_color'];?>" data-hover-color="<?php echo $quick[$k]['quick_close_hover_color'];?>">
					<i class="my_font_size fawesome icon-remove-circle"></i>
				</div>
			
			</div>
			</div><!-- product header -->
			
			    <div class="my_product_main">
				<div class="my_product_text_div" style="<?php if($my_enable_image==1)echo 'width:50%;'?>">
					<div class="my_padding_left_20">
					<?php if(empty($my_wp_woo_mapper_is_pin_category_1234)){?>
					<div class="my_product_price" data-my-line-height="<?php $h_1234_1=$quick_other[$k]['quick_other_price_font']['font_size'];$s_1224=$h_1234_1;$h_1234_1+=0.5*$s_1224; echo $h_1234_1;?>" data-my-font-size="<?php echo $s_1224;?>">
						
					<?php 
					/*$my_price=my_woo_image_mapper_get_product_price($product_id);
					$my_price_str='';
					if(empty($my_price['sale'])){
						$my_price_str=$my_price['regular'].$my_price['curr'];
					}else {
						$my_price_str=$my_price['sale'].$my_price['curr'];
					
					}
					echo $my_price_str;*/
					
					//$my_product=WC_Product_Factory::get_product($product_id);
					//$sale_price=$my_product->get_sale_price();
					//$regular_price=$my_product->get_regular_price();
					$sale_price=get_post_meta($product_id,'_sale_price',true);
					$regular_price=get_post_meta($product_id,'_regular_price',true);
					$currency_symbol = get_woocommerce_currency_symbol('');
					$my_currency_12345_pos='left';
					if(!empty($quick_other[$k]['quick_other_price_curr_pos'])){
						$my_currency_12345_pos=$quick_other[$k]['quick_other_price_curr_pos'];
					}
					if($my_currency_12345_pos=='left'){	
						echo $currency_symbol;
						if(empty($sale_price)){
							echo $regular_price;
						}else echo $sale_price;
					}else {
						if(empty($sale_price)){
							echo $regular_price;
						}else echo $sale_price;
						echo ' '.$currency_symbol;
						
					}	
					//}
					//echo $my_product->get_price_html();
					//echo get_woocommerce_currency();?>
					</div>
					<?php }?>
				<?php /*<p class="imapper-content-header" style="font-size:<?php $font=$quick_other['quick_other_price_font']['font_size'];?>px!important;line-height:">
			
				</p>*/ ?>
					<div class="imapper-content-text-test my_product_description" style="">
					<?php 
					if(!empty($my_wp_woo_mapper_is_pin_category_1234)){
						echo '<div style="padding-top:15px">';
						$override_text=$my_category_options[$k]['pin_category_descr'];
						if(!empty($override_text)){
							echo $override_text;
						}else {
					
						if(!empty($my_wp_woo_mapper_term)){
							
							//print_r($my_wp_woo_mapper_term);
							echo $my_wp_woo_mapper_term->description;
						}
						}
						echo '</div>';
					}else {
					$override_description=$quick_other[$k]['quick_other_overide_description_text'];
					if(!empty($override_description)){
						echo $override_description;
					}else {
					$my_excerpt=my_woo_image_mapper_get_the_excerpt($product_id);
					echo $my_excerpt;
					}
					}
					?>
					</div>
					</div>
				</div><!-- my_product text_div -->
				<?php 
				if($my_enable_image){
				?>
				<div class="my_product_image_div">
					<?php //echo wp_get_attachment_image($att_id,'shop_single')?>
				</div>
				<?php }?>
				<div class="my_clear"></div>
				</div>
				<div class="my_product_footer">
				
				<?php
				if(!empty($my_wp_woo_mapper_is_pin_category_1234)){
					$override_text=$my_category_options[$k]['pin_category_text'];
					//echo $my_wp_woo_mapper_is_pin_category_1234;
					$term_link=get_term_link($my_wp_woo_mapper_term);
					//print_r($term_link);
					if(!is_wp_error($term_link))$url=$term_link;
					?>
					<div class="my_view_item_category" data-color="<?php echo $quick_other[$k]['quick_other_button_1_color']?>" data-hover-color="<?php echo $quick_other[$k]['quick_other_button_1_hover_color']?>" data-back-color="<?php echo $quick_other[$k]['quick_other_button_1_background_color'];?>" data-hover-back-color="<?php echo $quick_other[$k]['quick_other_button_1_hover_background_color']; ?>" data-my-target="<?php echo $quick_other[$k]['quick_other_button_1_open_window'];?>">
						<div>
						<a title="<?php echo $override_text;?>" href="<?php echo $url;//echo get_term_link($my_wp_woo_mapper_is_pin_category_1234,'product_cat');?>" target="_blank">
						<?php echo $override_text;?></a>
						</div>
						
					</div>
					<?php 
				}else { 
						$override_text=$quick_other[$k]['quick_other_button_1_text'];
						?>
						
					<div class="my_view_item" data-color="<?php echo $quick_other[$k]['quick_other_button_1_color']?>" data-hover-color="<?php echo $quick_other[$k]['quick_other_button_1_hover_color']?>" data-back-color="<?php echo $quick_other[$k]['quick_other_button_1_background_color'];?>" data-hover-back-color="<?php echo $quick_other[$k]['quick_other_button_1_hover_background_color']; ?>" data-my-target="<?php echo $quick_other[$k]['quick_other_button_1_open_window'];?>">
						<div>
						<a title="<?php echo $override_text;?>" href="<?php echo get_permalink($product_id);?>" target="_blank">
						<?php echo $override_text;?></a>
						</div>
						
					</div>
					
					<div class="my_add_item" data-color="<?php echo $quick_other[$k]['quick_other_button_2_color']?>" data-hover-color="<?php echo $quick_other[$k]['quick_other_button_2_hover_color']?>" data-back-color="<?php echo $quick_other[$k]['quick_other_button_2_background_color'];?>" data-hover-back-color="<?php echo $quick_other[$k]['quick_other_button_2_hover_background_color']; ?>" data-my-product-id="<?php echo $product_id;?>">
						<input type="hidden" name="my_nonce_<?php echo $id?>_<?php echo $pin_id;?>" value="<?php echo wp_create_nonce('my_woo_image_mapper_add_cart_'.$product_id);?>"/>
						<div>
						<?php 
						$override_text=$quick_other[$k]['quick_other_button_2_text'];
						/*ob_start();
						do_shortcode('[add_to_cart_url id="'.$product_id."']");
						$url=ob_get_clean();
						*/
						?>
						<a class="my_woo_add_to_cart" data-my-product-id="<?php echo $product_id;?>" title="<?php echo $override_text;?>" href="#javascript<?php //echo $url;?>" target="_blank"><?php echo $override_text;?></a>
						</div>
					</div>
					<?php }?>
				</div>
			<?php //arrow?>
			
			
			
			</div>
			</div>
		
		</div>
		
		<?php 
	}
	?>
</div>	
	<style type="text/css" id="my_immaper_<?php echo $id;?>">
		<?php echo $added_css;?>
	</style>
	<script type="text/javascript">
		(function($) {
			
			$(window).load(function() {
				<?php 
				$font_link=my_woo_image_mapper_get_google_fonts_link();
				
				global $my_woo_image_mapper_fonts_include;
				$my_woo_image_mapper_fonts_include=array();
				/*
				$("link").attr({
					href:"<?php echo $font_link;?>",
					rel:"stylesheet",
					type:"text/css"
					}).appendTo("head");
					*/
				if($font_link!==false){
					$font_link=esc_html($font_link);
					?>	
				$("head").append('<link href="<?php echo $font_link?>" rel="stylesheet" type="text/css"/>');
				<?php }?>
				/*if(window.console){
					console.log('Init mapper',"imapemapper<?php echo $id?>-wrapper")
					}*/
				$("#imagemapper<?php echo $id?>-wrapper").imageMapper({	
						itemOpenStyle: 'click',
						itemDesignStyle: 'responsive',
						responsiveWidth:600,
						transformSmall:1,
						oldResponsive:0,
						animateOther:1000,
						pinScalingCoefficient: 1,
						/*categories:'.(isset($settings['categories']) ? $settings['categories'] : 'false' ).', 
						showAllCategory:'.(isset($settings['show-all-category']) ? $settings['show-all-category'] : 'false' ).', 
						allCategoryText:"'.(isset($settings['all-category-text']) ? $settings['all-category-text'] : 'All' ).'", 
						*/
						advancedPinOptions:true,
						pinClickAction:"content", 
						pinHoverAction:"my_content",
						/*lightboxGallery:'.(isset($settings['lightbox-gallery']) ? $settings['lightbox-gallery'] : 'false' ).'*/
						useTransitions:'1',
						animationDuration:170,
						mapOverlay:<?php if($general['image_overlay'])echo 'true';else echo 'false';?>,
						blurEffect:'<?php //if($general['image_overlay'])echo 'true';else echo 'false';?>',
						slideAnimation:'<?php ?>'
					});
			});
		})(jQuery);
		</script>
		
<?php 
$html=ob_get_clean();
}?>
<?php echo $html;?>