<?php
if(!defined('ABSPATH'))die('');
?>

<input class="my_slider_input <?php if(isset($class))echo $class;?>" my_min="<?php echo $min;?>" my_step="<?php echo $step;?>" my_max="<?php echo $max;?>" id="<?php echo $name;?>" name="<?php echo $name;?>" value="<?php echo $value; ?>" size="5" type="<?php if($show_input)echo 'text';else echo 'hidden';?>"/>
<div class="imapper-admin-slider  my_class_<?php echo $name;?>" style="<?php if(isset($width))echo "width:$width"."px;"?>" ></div>