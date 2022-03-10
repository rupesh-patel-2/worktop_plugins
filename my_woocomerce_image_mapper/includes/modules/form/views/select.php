<?php
if(!defined('ABSPATH'))die('');
?>
<div class="imapper-admin-select-wrapper" style="<?php if(isset($styles)){foreach($styles as $k=>$v)echo $k.':'.$v.';';}?>">
	<span class="imapper-admin-select-span" my_name="<?php echo $name;?>"><?php if(isset($value))echo $values[$value];else echo $values[$default];?></span>
<?php 
if(!isset($value))$value=$default;
?>							
<select name="<?php echo $name;?>" id="<?php echo $id;?>" class="<?php if(isset($class))echo $class?>">
	<?php 
	if(!empty($values)){
		foreach($values as $k=>$v){
			?>
			<option <?php if($k==$value)echo 'selected="selected"';?> value="<?php echo $k;?>"><?php echo $v;?></option>
			<?php 
		}
	}
	?>
</select>
</div>