<?php
if(!defined('ABSPATH'))die('');
?>
<input type="hidden" name="<?php echo 'hidden_'.$name?>" value="<?php if(isset($elem_id))echo esc_attr($elem_id);?>"/>
<input type="text" class="my_autocomplete" value="<?php if(isset($value))echo esc_attr($value);?>" <?php if(isset($width))echo 'style="width:'.$width.'"';?> name="<?php echo $name;?>" id="<?php echo $id;?>" class="<?php echo $class;?>"/>