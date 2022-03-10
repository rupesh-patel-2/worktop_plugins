<?php
if(!defined('ABSPATH'))die('');
$my_mapp=my_woo_mapper_get_all_mappers();
//$my_all_mapp=array_merge(array(""=>__("Select Mapper","woo_image_mapper_domain")),$my_mapp);

$arr=array(
	'styles'=>array(
		'width'=>'200px'
	),
	'id'=>'my_all_mappers_id',
	'type'=>'select',
	'default'=>0,
	'values'=>$my_mapp
	
);
//print_r($my_mapp);
?>
<div class="wrap imapper-admin-wrapper">
	<h2 class="imapper-backend-header" style="margin:0;">
	<?php echo __("Woocomerce Image Mapper Sliders","woo_image_mapper_domain");?>
	</h2>
	<div class="my_sliders_div postbox" style="margin:0;padding:10px;min-height:150px;background-color:white">
	<div style="width:50%;float:left">
	<ul>
		<li>
		<label for="my_enable_autoplay" class="my_label_form"><?php echo __("Enable Autoplay","woo_image_mapper_domain");?></label>
		</li>
		<li style="">
		<?php 
		$on_off=array(
			'type'=>'on_off',
			'default'=>0
		);
		Class_My_Module_Form_Static::render_element("my_enable_autoplay",$on_off);
		
		?>
		<div class="clear"></div>
		</li>
		<li class="my_auto_1234" style="/*display:none*/">
		<label for="my_enable_autoplay" class="my_label_form"><?php echo __("Autoplay After (seconds)","woo_image_mapper_domain");?></label>
		</li>
		<li class="my_auto_1234" style="/*diplay:none*/">
		<?php 
		$auto_arr=array(
			'styles'=>array(
				'width'=>'200px'
			),
			'id'=>'my_sleep_id',
			'type'=>'select',
			'default'=>10000,
			'values'=>array(
				/*3000=>'3s',*/
				5000=>'5s',
				8000=>'8s',
				10000=>'10s',
				12000=>'12s',
				15000=>'15s',
				20000=>'20s',
				25000=>'25s',
				30000=>'30s'		
			)
		);
		Class_My_Module_Form_Static::render_element("my_auto_sleep",$auto_arr);
		
		?>
		<div class="clear"></div>
		</li>
		<li>
		<label for="my_all_mappers_id" class="my_label_form"><?php echo __("Woo mappers","woo_image_mapper_domain");?></label>
		</li>
		<li>
		<?php 
		Class_My_Module_Form_Static::render_element("my_all_mappers",$arr);
		?>
		<div class="clear"></div>
		</li>
		<li>
			<input type="button" style="padding:3px 25px" class=" add-new-h2" value="<?php echo __("Add Woo Mapper to Slider","woo_image_mapper_domain");?>" id="my-add-mapper" name="preview-timeline"> 
		</li>
		
	</ul>
	</div>
	<div style="width:50%;float:left">
	<h2><?php echo __("Slider Shortcode","woo_image_mapper_domain");?></h2>
	<div class="my_sliders_shortcode">
		<input type="button" style="padding:3px 25px" class=" add-new-h2" value="<?php echo __("Remove Mapper From Slider","woo_image_mapper_domain");?>" id="my-remove-mapper" name="preview-timeline"> 
		<div>
			<ul class="my_navigation">
			
			</ul>
		</div>
		
		<p>
		<textarea class="my_sliders_textarea" style="width:400px;height:100px">[woo_mapper_slider id=""]</textarea>
		</p>
		
	</div>
	</div>
	<div class="clear"></div>
	
	</div>
<div style="margin-top:20px;">

<h2 class="imapper-backend-header"><?php echo __("Step by step instructions","woo_image_mapper_domain");?>:</h2>
<ul class="imapper-backend-ul">
	<li><h3><?php echo __("Adding woomaper to slider","woo_image_mapper_domain");?><span class="emphasize"><?php echo __('',"woo_image_mapper_domain");?></span><?php echo __(".","woo_image_mapper_domain");?></h3></li>	
	<li><h3><?php echo __("1. Select woo mapper from select","woo_image_mapper_domain");?><span class="emphasize"><?php echo __('"Woo mappers "',"woo_image_mapper_domain");?></span><?php echo __(".","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("2. Click the ","woo_image_mapper_domain");?><span class="emphasize"><?php echo __('"Add Woo Mapper to Slider"',"woo_image_mapper_domain");?></span><?php echo __("button","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("3. And your woomapper will be added to slider","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __('',"woo_image_mapper_domain");?></span> <?php echo __("","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("Removing woomapper from slider","woo_image_mapper_domain");?><span class="emphasize"><?php echo __('"Woo mappers "',"woo_image_mapper_domain");?></span><?php echo __(".","woo_image_mapper_domain");?></h3></li>
	
	<li><h3><?php echo __("1. Select woomapper from radio boxes at right ","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __('"Slider Shortcode"',"woo_image_mapper_domain");?></span></h3></li>
	<li><h3><?php echo __("2. Click the button ","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __("Remove Mapper From Slider","woo_image_mapper_domain");?></span><?php echo __("and woomaper willl be removed","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __("","woo_image_mapper_domain");?></span></h3></li>
	<li><h3><?php echo __("Copy generated shortcode to your page ","woo_image_mapper_domain");?><span class="emphasize"><?php echo __('',"woo_image_mapper_domain");?></span><?php echo __(".","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("Enjoy","woo_image_mapper_domain");?><span class="emphasize"><?php echo __('',"woo_image_mapper_domain");?></span><?php echo __(".","woo_image_mapper_domain");?></h3></li>	
		
	
		<?php /*
	<li><h3><?php echo __("1.","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __("Settings for pins","woo_image_mapper_domain");?></span><?php echo __("are located on the bottom","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("6. Save and ","woo_image_mapper_domain");?><span class="emphasize"><?php echo __("publish","woo_image_mapper_domain");?></span></h3></li>
	<li><h3><?php echo __("7. Enjoy","woo_image_mapper_domain");?></h3></li>
	*/ ?>
</ul>
</div>	
</div>	