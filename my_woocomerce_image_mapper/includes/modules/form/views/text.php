<?php
if(!defined('ABSPATH'))die('');
?>
<input style="<?php if(isset($styles)){foreach($styles as $k=>$v)echo $k.':'.$v.';';}?>" type="text" name="<?php echo $name;?>" id="<?php echo $id;?>" value="<?php echo esc_attr($value); ?>"/>