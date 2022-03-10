<?php
if(!defined('ABSPATH'))die('');
?>
<span class="imapper-checkbox-on imapper-checkbox-span <?php if(!$value)echo 'inactive';?>"><?php echo __("On","woo_image_mapper_domain");?></span>
<span class="imapper-checkbox-off imapper-checkbox-span <?php if($value)echo 'inactive';?>"><?php echo __("Off","woo_image_mapper_domain");?></span>
<input id="hidden-<?php echo $name;?>" type="hidden" name="hidden-<?php echo $name;?>" value="<?php if($value==1)echo 'true';else echo 'false';?>">
<input id="<?php echo $name;?>" type="checkbox" <?php if(!empty($value))echo 'checked="checked";'?> value="true" name="<?php echo $name;?>">
