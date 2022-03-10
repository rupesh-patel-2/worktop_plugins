<?php
if(!defined('ABSPATH'))die('');
?>

<?php 
global $_wp_additional_image_sizes;
//print_r($_wp_additional_image_sizes);
/*my_woo_image_mapper_get_meta(1,'key');
my_woo_image_mapper_is_exist_meta(1,'key');
my_woo_image_mapper_is_exist_object(1);
*/

$my_action=@$_POST['my_action'];
if(!empty($my_action)){
	if($my_action=='delete'){
		$id=@$_POST['my_object_id'];
		$ret=my_woo_image_mapper_delete($id);
		if($ret['error']==1){
			?>
			<div class="error">
				<p>
				<?php echo $ret['msg'];?>
				</p>
			</div>
			
			<?php 
		}else {
			?>
			<div class="updated">
				<p>
				<?php echo $ret['msg'];?>
				</p>
			</div>
			<?php 
		}
	}else if($my_action=='clone'){
	$my_clone=@$_REQUEST['my_object_id'];
	if(!empty($my_clone)){
	$is_exists=my_woo_image_mapper_is_exist_object($my_clone);
	if(empty($is_exists)){
		?>
		<div class="error">
				<p>
				<?php echo __("Woomapper don't exists !","woo_image_mapper_domain");?>
				</p>
			</div>
		<?php 	
	}else {
		my_woo_image_mapper_clone_object($my_clone);
		?>
		<div class="updated">
				<p>
				<?php echo __("Woomapper has been cloned !","woo_image_mapper_domain");?>
				</p>
			</div>
		<?php 	
	}
}
	}
}
?>
<div class="wrap imapper-admin-wrapper">
	<h2 class="imapper-backend-header">
	
	<?php echo __("Woocomerce Image Mapper","woo_image_mapper_domain");?>
			<a href="<?php echo admin_url( "admin.php?page=woo-imagemapper_edit" ); ?>" class="add-new-h2"><?php echo __("Add New","woo_image_mapper_domain")?></a>
	</h2>

<?php 
	$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'elements/my_mapper_table.php';
	require $file;
?>
<div style="margin-top:20px;">

<h2 class="imapper-backend-header"><?php echo __("Step by step instructions","woo_image_mapper_domain");?>:</h2>
<ul class="imapper-backend-ul">
	<li><h3><?php echo __("1. Click the ","woo_image_mapper_domain");?><span class="emphasize"><?php echo __('"Add New"',"woo_image_mapper_domain");?></span><?php echo __("button","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("2. Name your mapper and click","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __('"Change"',"woo_image_mapper_domain");?></span> <?php echo __("button to insert your image","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("3. Click anywhere on the image to","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __("add a pin","woo_image_mapper_domain");?></span></h3></li>
	<li><h3><?php echo __("4. Added pins are shown","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __("directly on the image","woo_image_mapper_domain");?></span><?php echo __("and content of the pins can be edited","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __("below the image","woo_image_mapper_domain");?></span></h3></li>
	<li><h3><?php echo __("5.","woo_image_mapper_domain");?> <span class="emphasize"><?php echo __("Settings for pins","woo_image_mapper_domain");?></span><?php echo __("are located on the bottom","woo_image_mapper_domain");?></h3></li>
	<li><h3><?php echo __("6. Save and ","woo_image_mapper_domain");?><span class="emphasize"><?php echo __("publish","woo_image_mapper_domain");?></span></h3></li>
	<li><h3><?php echo __("7. Enjoy","woo_image_mapper_domain");?></h3></li>
</ul>
</div>
</div>	