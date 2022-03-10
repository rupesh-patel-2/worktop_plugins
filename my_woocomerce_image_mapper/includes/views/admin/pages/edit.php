<?php
if(!defined('ABSPATH'))die('');
$pageName = __('Name your WooMapper',"woo_image_mapper_domain");
$my_image_mapper_id=@$_GET['id'];
if(!isset($my_image_mapper_id))$my_image_mapper_id='';
if(!empty($my_image_mapper_id)){
$has_mapper=my_woo_image_mapper_is_exist_object($my_image_mapper_id);
$my_saved_values=array();
if(empty($has_mapper)){
	?>
	<h4 style="color:red"><?php echo __("Woo Image Mapper with this id don't exists.","woo_image_mapper_domain");?></h4>
	<?php 
	return;
}


//echo my_woo_image_mapper_rgba_color('#ffff',0.3);
/**
 * Get mapper
 */
$mapper_title=my_woo_mapper_get_object_title($my_image_mapper_id);
$pins=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'pins');
$quick=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'quick');
$hover=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'hover');
$general=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'general');
$quick_other=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'quick_other');
$my_category_options=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'category');
//print_r($my_category_options);
//my_woo_image_mapper_debug("Quick other",$quick_other);
$my_mapper_title=my_woo_mapper_get_object_title($my_image_mapper_id);
$my_mapper_image_id=my_woo_image_mapper_get_meta_val($my_image_mapper_id,'image_id');
$my_mapper_image_src=wp_get_attachment_image_src($my_mapper_image_id,'full');
//print_r($my_mapper_image_src);
}
/*$my_terms_12345=get_terms('product_cat',array('hide_empty'=>false
));
print_r($my_terms_12345);
*/
global $my_woo_mapper_options;
$my_cats_123456=my_woo_mapper_get_categories();
$my_woo_mapper_options['category']['pin_category_id']['values']=$my_cats_123456;

/**
 * Get google fonts
 */
global $my_woo_immaper_fonts;
 $my_woo_immaper_fonts=my_woo_image_mapper_get_google_fonts();
my_woo_image_mapper_debug('Fonts',$my_woo_immaper_fonts);
 ?>
<div class="my_pin_product_html" style="display:none">
	<h2 class="imapper-sort-header-my" my_id="pin">-<?php echo __("Pin Settings","woo_image_mapper_domain");?></h2>
 <div id="my_all_pin_options_{id}">
 	<div class="my_padding_10" id="my_pin_icon_{id}">
 		<div class="my_width_100">
 		<div class="dummy-adapter-new <?php //if($id_pin!=1)echo 'closed'?>" style="display:block;<? //if($id_pin!=1)echo 'display: none;';else echo 'display:block';?>">
		<div style="float:left;margin-right:10px;">			
			<a my_id="{id}" class="tsort-change add-new-h2 my-icon-custom" style="width:150px" id="my-icon-change" href="#"><?php echo __("Add Custom Icon","woo_image_mapper_domain");?></a>
		</div>
		<?php /*
		<div style="float:left;margin-right:10px;">			
			<a my_id="{id}" class="tsort-change add-new-h2 my-icon-change" style="width:150px" id="my-icon-change" href="#"><?php echo __("Predefined Icons","woo_image_mapper_domain");?></a>
		</div>
		*/  ?>
		<div style="float:left;margin-right:10px;display:none;">			
		
			<a my_id="{id}" class="tsort-change add-new-h2 my-icon-remove" style="width:150px" id="my-icon-remove" href="#"><?php echo __("Remove pin icon","woo_image_mapper_domain");?></a>
		</div>
		<div class="clear"></div>
		<input type="hidden" id="my_pin_icon_id_{id}" name="my_pin_icon_{id}" value=""/>
			
		<div class="my_image_icon_image" style="display:none">
			<h4><?php echo __("Pin image icon","woo_image_mapper_domain");?></h4>
			<div></div>	
		</div>					
		</div>
		</div>
 	</div>
 	<h2 class="imapper-sort-header-my" my_id="pin">-<?php echo __("Display Category of products in pin","woo_image_mapper_domain");?></h2>
	
 	<div class="my_padding_10" id="my_pin_category_{id}">
		<div class="my_width_100">
		<p><?php echo __("If you select category id from  select box pin will display a category information. Styling options for category button are same for Button 1 options. ","woo_image_mapper_domain");//echo __("If you select category from pin will display a category instead product. Styling options for category button is in Button 1 options. ","woo_image_mapper_domain");?></p>
		<?php 
		global $my_woo_mapper_options;
	?>
	<ul style="display:block;" class="imapper-sortable" id="imapper-sortable-dummy-my">
		<?php foreach($my_woo_mapper_options['category'] as $k=>$v){
		$name=$k;
		$v['id']=$name.'_id_{id}';
		
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_{id}';?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name.'_{id}',$v);?>
		</li>
	
	<?php }?>
	</ul>
	
		</div>
	</div>
	<div class="my_padding_10" id="my_pin_options_{id}">
	<div class="my_width_100">
		
	<?php 
		global $my_woo_mapper_options;
	?>
	<ul style="display:block;" class="imapper-sortable" id="imapper-sortable-dummy-my">
		<?php foreach($my_woo_mapper_options['pin'] as $k=>$v){
		$name=$k;
		$v['id']=$name.'_id_{id}';
		
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_{id}';?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name.'_{id}',$v);?>
		</li>
	
	<?php }?>
	</ul>
	</div>
	</div>
	<h2 class="imapper-sort-header-my" my_id="pin">-<?php echo __("Hover popUp Settings","woo_image_mapper_domain");?></h2>
	
	<div class="my_padding_10" id="my_hover_options_{id}">
	<div class="my_width_100">
	<?php 
		global $my_woo_mapper_options;
	?>
	<ul style="display:block;" class="imapper-sortable" id="imapper-sortable-dummy-my">
		<?php foreach($my_woo_mapper_options['hover'] as $k=>$v){
		$name=$k;
		$v['id']=$name.'_id_{id}';
		
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_{id}';?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name.'_{id}',$v);?>
		</li>
	
	<?php }?>
	</ul>
	</div>
	</div>
	<h2 class="imapper-sort-header-my" my_id="pin">-<?php echo __("Click Quick View Settings","woo_image_mapper_domain");?></h2>
	
	<div class="my_padding_10" id="my_quick_options_{id}">
	<div class="my_width_100">
	<?php 
		global $my_woo_mapper_options;
	?>
	<ul style="display:block;" class="imapper-sortable" id="imapper-sortable-dummy-my">
		<?php foreach($my_woo_mapper_options['quick'] as $k=>$v){
		$name=$k;
		$v['id']=$name.'_id_{id}';
		
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_{id}';?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name.'_{id}',$v);?>
		</li>
	
	<?php }?>
	</ul>
	</div>
	</div>
	<div class="my_border_wrapper"></div>
	<div class="my_padding_10" id="my_quick_options_{id}">
	<div class="my_width_100">
	<?php 
		global $my_woo_mapper_options;
	?>
	<ul style="display:block;" class="imapper-sortable" id="imapper-sortable-dummy-my">
		<?php foreach($my_woo_mapper_options['quick_other'] as $k=>$v){
		$name=$k;
		$v['id']=$name.'_id_{id}';
		
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_{id}';?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name.'_{id}',$v);?>
		</li>
		<?php if(in_array($k,array('quick_other_button_1_hover_background_color','quick_other_description_color','quick_other_title_color','quick_other_price_curr_pos'))){?>
		<li class="clear">&nbsp;</li>
		<?php }?>
	
	<?php }?>
	</ul>
	</div>
	</div>
	
 </div>
</div>
<div class="wrap imapper-admin-wrapper">
	
	<div class="form_result"></div>
	<form name="post_form"  method="post" id="post_form"><!-- items in this form should be saved -->
		<input type="hidden" name="my_search_nonce" id="my_search_nonce_id" value="<?php $my_str_nonce=$str='my_imapper_get_woo_'.get_current_user_id();echo wp_create_nonce($my_str_nonce);?>"/>
		
		<input type="hidden" id="plugin-url" value="<?php echo $this->url; ?>" />
		
		<input type="hidden" name="my_save_nonce" id="my_save_nonce_id" value="<?php $my_str_nonce=$str='my_imapper_save_imapper_'.get_current_user_id();echo wp_create_nonce($my_str_nonce);?>"/>
		
		<input type="hidden" name="image_mapper_id" id="image_mapper_id" value="<?php echo $my_image_mapper_id; ?>" />
		<div class="imapper_items_options">
			<?php 
			/**
			 * Set saved pins positions
			 */
			if(isset($pins)){
				if(!empty($pins)){
					foreach($pins as $k=>$v){
						$id_pin=$k+1;
					?>
					<input type="hidden" id="sort<?php echo $id_pin;?>-imapper-item-x" name="sort<?php echo $id_pin;?>-imapper-item-x" value="<?php echo $v['pos_x'];?>" />
					<input type="hidden" id="sort<?php echo $id_pin;?>-imapper-item-y" name="sort<?php echo $id_pin;?>-imapper-item-y" value="<?php echo $v['pos_y'];?>" />
			
					<?php 
					}
				}
			}
			
			?>
		</div>
		<div id="poststuf">
	
			<div id="post-body" class="metabox-holder columns-1" style="padding:0;">
				<div id="post-body-content">
				
				<div id="titlediv">
					<div id="titlewrap">
					<h2 class="imapper-backend-header"><?php echo $pageName; ?>
					<a href="<?php echo admin_url( "admin.php?page=woo-imagemapper" ); ?>" class="add-new-h2"><?php echo __("Cancel","woo_image_mapper_domain");?></a>
				</h2>
						<label class="hide-if-no-js" style="visibility:hidden" id="title-prompt-text" for="title"><?php echo __("Enter title Here","woo_image_mapper_domain");?></label>
						<input type="text" name="image_mapper_title" size="30" tabindex="1" value="<?php if(isset($my_mapper_title))echo $my_mapper_title;//if(isset($title))echo $title; ?>" id="title" autocomplete="off" />
					</div>
				</div>
				
				
				<div class="clear"></div>
		
				
			
				<div class="postbox" style="margin-right:300px">
				<h2 class="imapper-backend-header"><?php echo __("General WooMapper Options","woo_image_mapper_domain");; ?></h2>	
					<div class="inside">
					<ul class="my_ul_radio_list">
					<?php 
					
					foreach($my_woo_mapper_options['general'] as $k=>$v){
						/**
						 * Add values to gnerela
						 */
						if(isset($general)){
							$v['value']=$general[$k];
						}
						?>
						<li ><label for="<?php echo $k;?>"><?php echo $v['title'];?></label>
						<br/><br/>
						<div class="my_form_element" <?php if($k=='image_overlay_transparency')echo 'style="padding-top:2px"';?>>
						<?php Class_My_Module_Form_Static::render_element($k,$v);?>
						</div>
						</li>
						<?php 
						
					}
					?>
					</ul>
					</div>
			<div class="my_save_preview_options">			
			<div class="postbox">
					<h2 class='hndle imapper-backend-header' style="cursor:auto"><span><?php echo __("Publish WooMapper","woo_image_mapper_domain");?></span></h2>
					<div class="inside">
						<div style="padding-top:20px">
						<div id="save-progress" class="waiting ajax-saved" style="background-image: url(<?php echo esc_url( admin_url( 'images/wpspin_light.gif' ) ); ?>)" ></div>
						<input name="preview-timeline" id="preview-timeline" value="<?php echo __("Preview","woo_image_mapper_domain");?>" class="button button-highlighted add-new-h2" style="padding:3px 25px" type="submit" />
						<input name="save-timeline" id="save-timeline" value="<?php echo __("Save mapper","woo_image_mapper_domain");?>" class="alignright button button-primary add-new-h2" style="padding:3px 15px" type="submit" />
						<img id="save-loader" src="<?php echo $this->url; ?>images/ajax-loader.gif" class="alignright" />
						<br class="clear" />		
						</div>
					</div>
			</div>
			</div>
			</div><!-- imapper general options  -->
			<div class="clear"></div>
			<!-- Image part begins -->
				<div class="map-wrapper">
				<h2 class="imapper-backend-header" style="padding:0 0 10px 0;"><?php echo __("Woo Mapper Image","woo_image_mapper_domain");?><a href="#" id="map-change" style="display:inline;" class="tsort-change add-new-h2"><?php echo __("Change Image","woo_image_mapper_domain");?></a></h2>
					<div class="mapper-sort-image-wrapper">
					<div class="mapper-sort-image">
						<div class="my-mapper-sort-image">
						<img id="map-image" src="<?php if(isset($my_mapper_image_src))echo $my_mapper_image_src[0];else echo $this->url . 'images/no_image.jpg'; ?>" />
						<input id="map-input" name="map-image" type="hidden" value="<?php if(isset($my_mapper_image_src)) echo esc_attr($my_mapper_image_src[0]); ?>" />
						<input id="map-input-id" name="map-image-id" type="hidden" value="<?php if(isset($my_mapper_image_id))echo $my_mapper_image_id;?>" />
						
						<a href="#" id="map-image-remove" class="tsort-remove"><?php echo __("Remove","woo_image_mapper_domain");?></a>
						</div>
					</div>
					<div style="clear:both;"></div>
					</div>
				</div>
				<!-- Image part ends, items begin -->
			<div class="clear"></div>
				<?php /*
				<div class="my_use_custom_pins">
					<h2 class="imapper-backend-header" style="padding:0 0 10px 0;"><?php echo __("Pin Icon","woo_image_mapper_domain");?></h2>
					<div class="clear"></div>
					<ul id="imapper-sortable-items-new" class="imapper-sortable-new">
					<li class="imapper-sortableItem-new">
						<div class="dummy-adapter-new <?php //if($id_pin!=1)echo 'closed'?>" style="display:block;<? //if($id_pin!=1)echo 'display: none;';else echo 'display:block';?>">
					
							<a class="tsort-change add-new-h2" style="width:200px" id="icon-change" href="#"><?php echo __("Change pins Icons","woo_image_mapper_domain");?></a>
							
						</div>
					</li>
					
					</ul>
				</div>
				*/   ?>`
			
				<div class="items">
					<h2 class="imapper-backend-header" style="padding:0 0 10px 0;"><?php echo __("Active Pins","woo_image_mapper_domain");?></h2>
					<div class="clear"></div>
					<ul id="imapper-sortable-items" class="imapper-sortable">
					<?php 
					if(isset($pins)){
						$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'elements/my_mapper_pins.php';
						require $file;
					}
					?>
					</ul>
				</div>
				<div class="clear"></div>
		</div>
		</div>
		<div class="clear"></div>
		</div>
		
		
	</form>
	
</div>				
	
<?php /*	
<div id="poststuf">
	
		<div id="post-body" class="metabox-holder columns-2" style="margin-right:300px; padding:0;">
		
			<div id="post-body-content">
				
				<div id="titlediv">
					<div id="titlewrap">
					<h2 class="imapper-backend-header"><?php echo $pageName; ?>
		<a href="<?php echo admin_url( "admin.php?page=woo-imagemapper" ); ?>" class="add-new-h2"><?php echo __("Cancel","woo_image_mapper_domain");?></a>
	</h2>
						<label class="hide-if-no-js" style="visibility:hidden" id="title-prompt-text" for="title"><?php echo __("Enter title Here","woo_image_mapper_domain");?></label>
						<input type="text" name="image_mapper_title" size="30" tabindex="1" value="<?php echo $title; ?>" id="title" autocomplete="off" />
					</div>
				</div>
				
				
				<div class="clear"></div>
				<!-- Image part begins -->
				<div class="map-wrapper">
				<h2 class="imapper-backend-header" style="padding:0 0 10px 0;">Map <a href="#" id="map-change" style="display:inline;" class="tsort-change add-new-h2">Change</a></h2>
					<div class="mapper-sort-image-wrapper">
					<div class="mapper-sort-image">
						<img id="map-image" src="<?php if(isset($settings['map-image']))echo $settings['map-image'];else echo $this->url . 'images/no_image.jpg'; ?>" />
						<input id="map-input" name="map-image" type="hidden" value="<?php if(isset($settings['map-image'])) echo esc_attr($settings['map-image']); ?>" />
						<input id="map-input-id" name="map-image-id" type="hidden" value="<?php if(isset($settings['map-image-id']))echo $settings['map-image-id']; ?>" />
						
						<a href="#" id="map-image-remove" class="tsort-remove">Remove</a>
					</div>
					<div style="clear:both;"></div>
					</div>
				</div>
				<!-- Image part ends, items begin -->
				<div class="clear"></div>
				<div class="items">
					<h2 class="imapper-backend-header" style="padding:0 0 10px 0;">Active Pins</h2>
					<div class="clear"></div>
					<ul id="imapper-sortable-items" class="imapper-sortable">
					
					</ul>
				</div>
				<div class="clear"></div>
				
			</div>
		</div>
		<?php 
		$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'elements/my_mapper_options.php';
		include_once $file;
		?>
	</div>
	</form>
</div>
*/ ?>						