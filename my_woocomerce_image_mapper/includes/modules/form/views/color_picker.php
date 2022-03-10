<?php
if(!defined('ABSPATH'))die('');
?>
<input id="<?php echo $name;?>" name="<?php echo $name;?>" class="color-picker-iris"  value="<?php echo $value; ?>" type="hidden" style="background:#<?php echo $value; ?>;">	
<div class="my_color_picker">
	<div class="my_color_picker_color"></div>
	<div class="my_color_picker_title" my_name="<?php echo $name;?>">
	
	<span class="my_select_picker"><?php echo __("Select Color","woo_image_mapper_domain");?></span>
	<span class="my_close_picker" style="display:none"><?php echo __("Close","woo_image_mapper_domain");?></span>
	
	</div>
</div>
<div my_name="<?php echo $name;?>" class="color-picker-iris-holder" style="margin-left: -125px;"></div>
