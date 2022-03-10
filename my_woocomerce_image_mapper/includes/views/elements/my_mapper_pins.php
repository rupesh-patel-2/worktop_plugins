<?php
if(!defined('ABSPATH'))die('');
?>
<?php 
if(!empty($pins)){
foreach($pins as $k_pin=>$v_pin){
$product_id=$v_pin['product_id'];
$my_product_title=my_woo_mapper_get_post_title($product_id);	
$id_pin=$k_pin+1;
if(!empty($my_category_options[$k_pin]['pin_category_id'])){
	$id=$my_category_options[$k_pin]['pin_category_id'];
	$term=get_term($id,'product_cat');
	$my_cat_name_1234=$term->name;
	
}else {
	unset($my_cat_name_1234);
}
?>
<li class="imapper-sortableItem" id="sort<?php echo $id_pin;?>">
<div class="imapper-sort-header" id="imapper-sort<?php echo $id_pin;?>-header"><?php echo __("Pin","woo_image_mapper_domain").$id_pin;?><small><i>- <span><?php if(isset($my_cat_name_1234))echo $my_cat_name_1234;else echo $my_product_title;?></span></i></small><div class="my_buttons"><a class="my_diplicate_pin" href="#">Duplicate Pin</a><a class="imapper-delete add-new-h2" href="#">Delete Pin</a> &nbsp;</div></div>
<div class="dummy-adapter <?php if($id_pin!=1)echo 'closed'?>" style="<? if($id_pin!=1)echo 'display: none;';else echo 'display:block';?>">
<h2 class="imapper-sort-header-my" my_id="pin">-<?php echo __("Pin Settings","woo_image_mapper_domain");?></h2>
	<div class="my_padding_10" id="my_pin_icon_<?php echo $id_pin;?>">
 		<div class="my_width_100">
 		<div class="dummy-adapter-new <?php //if($id_pin!=1)echo 'closed'?>" style="display:block;<? //if($id_pin!=1)echo 'display: none;';else echo 'display:block';?>">
		<div style="float:left;margin-right:10px;">			
			<a my_id="<?php echo $id_pin;?>" class="tsort-change add-new-h2 my-icon-custom" style="width:150px" id="my-icon-change" href="#"><?php echo __("Add Custom Icon","woo_image_mapper_domain");?></a>
		</div>
		<?php /*
		<div style="float:left;margin-right:10px;">			
			<a my_id="<?php echo $id_pin;?>" class="tsort-change add-new-h2 my-icon-change" style="width:150px" id="my-icon-change" href="#"><?php echo __("Predefined Icons","woo_image_mapper_domain");?></a>
		</div>
		*/ ?>
		<div style="float:left;margin-right:10px;<?php if(empty($v_pin['pin_icon']))echo 'display:none';?>">			
		
			<a my_id="<?php echo $id_pin;?>" class="tsort-change add-new-h2 my-icon-remove" style="width:150px" id="my-icon-remove" href="#"><?php echo __("Remove pin icon","woo_image_mapper_domain");?></a>
		</div>
		<div class="clear"></div>
		<input type="hidden" id="my_pin_icon_id_<?php echo $id_pin?>" name="my_pin_icon_<?php echo $id_pin;?>" value="<?php if(!empty($v_pin['pin_icon']))echo esc_attr($v_pin['pin_icon'])?>"/>
			
		<div class="my_image_icon_image" style="<?php if(empty($v_pin['pin_icon']))echo 'display:none';?>">
			<h4><?php echo __("Pin image icon","woo_image_mapper_domain");?></h4>
			<div>
			<img src="<?php if(!empty($v_pin['pin_icon']))echo $v_pin['pin_icon'];?>"/>
			</div>	
		</div>					
		</div>
		</div>
 	</div>
 <div id="my_all_pin_options_<?php echo $id_pin;?>">
 	<h2 class="imapper-sort-header-my" my_id="pin">-<?php echo __("Display Category of products in pin","woo_image_mapper_domain");?></h2>
	
 	<div class="my_padding_10" id="my_pin_category_<?php echo $id_pin?>">
		<div class="my_width_100">
		<p><?php echo __("If you select category id from  select box pin will display a category information. Styling options for category button are same for Button 1 options. ","woo_image_mapper_domain");?></p>
		<?php 
		global $my_woo_mapper_options;
	?>
	<ul style="display:block;" class="imapper-sortable" id="imapper-sortable-dummy-my">
		<?php foreach($my_woo_mapper_options['category'] as $k=>$v){
		$name=$k.'_'.$id_pin;
		$v['id']=$k.'_id_'.$id_pin;
		if(isset($my_category_options[$k_pin][$k]))
		$v['value']=$my_category_options[$k_pin][$k];
		
		
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_'.$id_pin;?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($k.'_'.$id_pin,$v);?>
		</li>
	
	<?php }?>
	</ul>
	
		</div>
	</div>
	<div class="my_padding_10" id="my_pin_options_<?php echo $id_pin;?>">
	<div class="my_width_100">
	<?php 
		global $my_woo_mapper_options;
	?>
	<ul style="display:block;" class="imapper-sortable" id="imapper-sortable-dummy-my">
		<?php foreach($my_woo_mapper_options['pin'] as $k=>$v){
		if($k=='pin_product'){
			$v['value']=$my_product_title;
			$v['elem_id']=$v_pin['product_id'];
		}else $v['value']=$v_pin[$k];	
		$name=$k.'_'.$id_pin;
		$v['id']=$k.'_id_'.$id_pin;
		
			?>
		<li <?php if($k=='pin_product')echo 'style="width:100%"';else if(!empty($v_pin['pin_icon']))echo 'style="width:0px;height:0px;opacity:0;min-height:0px;"';?>>
			<label for="<?php echo $k.'_'.$id_pin;?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name,$v);?>
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
		$name=$k.'_'.$id_pin;
		$v['id']=$k.'_id_'.$id_pin;
		$v['value']=$hover[$k_pin][$k];
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_'.$id_pin;?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name,$v);?>
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
		$name=$k.'_'.$id_pin;
		$v['id']=$k.'_id_'.$id_pin;
		$v['value']=$quick[$k_pin][$k];
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_'.$id_pin;?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name,$v);?>
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
		$name=$k.'_'.$id_pin;
		$v['id']=$k.'_'.$id_pin;
		$v['value']=$quick_other[$k_pin][$k];
		
			?>
		<li <?php if($name=='pin_product')echo 'style="width:100%"';?>>
			<label for="<?php echo $k.'_'.$id_pin;?>"><?php echo $v['title'];?></label><br/><br/>
			<?php Class_My_Module_Form_Static::render_element($name,$v);?>
		</li>
																																			
		<?php if(in_array($k,array('quick_other_button_1_hover_background_color','quick_other_price_curr_pos','quick_other_description_color','quick_other_title_color'))){?>
		<li class="clear">&nbsp;</li>
		<?php }?>
	
	<?php }?>
	</ul>
	</div>
	</div>
	</div>
 </div>
</li>
<?php }?> 
<?php }?>