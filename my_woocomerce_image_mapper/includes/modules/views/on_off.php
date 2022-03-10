<?php
if(!defined('ABSPATH'))die('');
?>
<span class="imapper-checkbox-on imapper-checkbox-span "  my_name="<?php echo $name;?>"><?php echo __("On","woo_image_mapper_domain");?></span>
<span class="imapper-checkbox-off imapper-checkbox-span inactive" my_name="<?php echo $name;?>"><?php echo __("Off","woo_image_mapper_domain");?></span>
<input id="hidden-<?php echo $name;?>" type="hidden" name="<?php echo $name;?>" value="<?php if($value==1)echo 'true';else echo 'false';?>">
<?php 


/*<input id="<?php echo $name;?>" type="checkbox" checked="" value="true" name="<?php echo $name;?>">
 * 
 */