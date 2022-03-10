<?php
if(!defined('ABSPATH'))die('');
?>
<div class="imapper_items_options">
	<div id="postbox-container-1" class="postbox-container">
				<div class="postbox">
					<h3 class='hndle imapper-backend-header' style="cursor:auto"><span><?php echo __("Publish Mapper","woo_image_mapper_domain");?></span></h3>
					<div class="inside">
						<div id="save-progress" class="waiting ajax-saved" style="background-image: url(<?php echo esc_url( admin_url( 'images/wpspin_light.gif' ) ); ?>)" ></div>
						<input name="preview-timeline" id="preview-timeline" value="Preview" class="button button-highlighted add-new-h2" style="padding:3px 25px" type="submit" />
						<input name="save-timeline" id="save-timeline" value="Save mapper" class="alignright button button-primary add-new-h2" style="padding:3px 15px" type="submit" />
						<img id="save-loader" src="<?php echo $this->url; ?>images/ajax-loader.gif" class="alignright" />
						<br class="clear" />		
					</div>
				</div>
	</div>			
				
					
</div>