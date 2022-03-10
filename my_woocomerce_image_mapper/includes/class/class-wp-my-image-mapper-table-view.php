<?php
/*
 * Core class for loading files (models,classes.controllers etc)
 * all this classes are loaded and instance is set to GLOBALS
 * arrays $GLOBALS[$plugin_name]['class'] or ['views'] etc.
 * This class is common to all plugins that i did so it's same for 
 * all plugins and its loaded only once all plugins has their instance of this 
 * class
 * 
 */
//if (basename ( __FILE__ ) == basename ( $_SERVER ['SCRIPT_FILENAME'] ))
//	die ( 'This page cannot be called directly.' );
if(!class_exists('Class_Wp_My_Image_Mapper_Table_View')){
	class Class_Wp_My_Image_Mapper_Table_View{
		var $colums;
		var $data;
		var $search_form;
		var $search_title;
		var $show;
		var $show_by_page;
		var $url;
		private $plugin;
		
		function Class_Wp_My_Image_Mapper_Table_View($params=array()){
			foreach($params as $k=>$v){
				$this->$k=$v;
			}
			
		}
		function render($echo=false){
			ob_start();
				$this->render_header();
				?>
				<?php if(false){?>
				<pre><?php print_r($this->data);?></pre>
				<?php }?>
				<?php 
				if(empty($this->data['count'])){
					?>
					<div class="my_error_1"><?php echo __("There are no mappers !","woo_image_mapper_domain");?></div>
					<?php
				}else {
					$this->render_pagination();
					$this->render_data();
				}
			$html=ob_get_clean();
			if($echo)echo $html;
			else return $html;
		}
		/**
		 * Render pagionation
		 */
		private function render_pagination(){
			?>
			<div class="my_navigation" style="float:left">
			<?php echo __("Page","woo_image_mapper_domain").':'.$this->data['page'];?>&nbsp;
			<?php echo __("Pages","woo_image_mapper_domain").':'.$this->data['pages'];?>&nbsp;
			<?php echo __("Total Results","woo_image_mapper_domain").':'.$this->data['count'];?>&nbsp;
				<ul>
					<?php if($this->data['page']>1){?>
						<li><a href="#javascript" class="my_pagination_<?php echo $this->id?>" my_page="1" my_id="<?php echo $this->id;?>"><?php echo __("First Page","woo_image_mapper_domain");?></a></li>
					<?php }?>
					<?php if($this->data['page']>1){?>
						<li><a href="#javascript" class="my_pagination_<?php echo $this->id?>" my_page="<?php echo $this->data['page']-1;?>" my_id="<?php echo $this->id;?>">&laquo;</a></li>
					<?php }?>
					<?php if($this->data['page']<$this->data['pages']){?>
						<li><a href="#javascript" class="my_pagination_<?php echo $this->id?>" my_page="<?php echo $this->data['page']+1;?>" my_id="<?php echo $this->id;?>">&raquo;</a></li>
					<?php }?>
					<?php if($this->data['page']<$this->data['pages']){?>
						<li><a href="#javascript" class="my_pagination_<?php echo $this->id?>" my_page="<?php echo $this->data['pages'];?>" my_id="<?php echo $this->id;?>"><?php echo __("Last Page","woo_image_mapper_domain");?></a></li>
					<?php }?>
					
				</ul>
		
		</div>	
		
			
			
			<?php 
			
		}
		private function render_data(){
			?>
			<form id="<?php echo $this->id;?>" method="post">
				<input type="hidden" name="my_action" value=""/>
				<input type="hidden" name="my_object_id" value=""/>	
				<?php foreach($this->data['form_params'] as $k=>$v){?>
					<input type="hidden" name="<?php echo $k;?>" value="<?php echo $v;?>"/>
				<?php }?>
			</form>
			<table class="widefat">
				<thead>
					<tr>
					<?php foreach($this->columns as $k=>$v){
						$my_odrer=$v['order'];
						?>
						<th width="<?php echo $v['width'];?>" class="<?php if($v['order'])echo 'my-sortable'?> <?php if($my_odrer&&$this->data['form_params']['my_order_col']==$k){$val=$this->data['form_params']['my_order'];if($val=='asc')echo 'desc';else echo 'asc';}?>">
						<?php if($v['order']){
							?>
							<a href="#javascript" class="my_order_<?php echo $this->id;?>" my_name="<?php echo $k;?>"><span><?php echo $v['title']?></span><span class="my-sortable-indicator" <?php if($this->data['form_params']['my_order_col']==$k)echo 'style="display:block"';?>></span></a>
							<?php 
						
						}else { echo $v['title'];}?>
						</th>
						
					<?php }?>
					<?php if(!empty($this->actions)){?>
							<th width="35%"><?php echo __("Actions","woo_image_mapper_domain");?></th>
						<?php }?>
					</tr>
					<?php /*<tr><th><?php echo __("ID",$this->plugin_domain);?></th>
					<th class="my-sortable <?php if($my_order_col=="req_date"){ if($my_order!='asc')echo 'desc';else echo 'asc';}else echo $show;?>"><a href="#javascript" class="my_order" my_name="req_date"><span><?php echo __("Date",$this->plugin_domain)?></span><span class="my-sortable-indicator" <?php if($my_order_col=="req_date")echo 'style="display:block"';?>></span></a></th>
					<th class="my-sortable <?php if($my_order_col=="name"){ if($my_order!='asc')echo 'desc';else echo 'asc';}else echo $show;?>"><a href="#javascript" class="my_order" my_name="name"><span><?php echo __("Name",$this->plugin_domain)?></span><span class="my-sortable-indicator" <?php if($my_order_col=="name")echo 'style="display:block"';?>></span></a></th>
					<th class="my-sortable <?php if($my_order_col=="email"){ if($my_order!='asc')echo 'desc';else echo 'asc';}else echo $show;?>"><a href="#javascript" class="my_order" my_name="email"><span><?php echo __("Email",$this->plugin_domain);?></span><span class="my-sortable-indicator" <?php if($my_order_col=="email")echo 'style="display:block"';?>></span></a></th>
					<th class=""><?php echo __("Post",$this->plugin_domain);?></th>
					<th class="my-sortable <?php if($my_order_col=="project"){ if($my_order!='asc')echo 'desc';else echo 'asc';}else echo $show;?>"><a href="#javascript" class="my_order" my_name="project"><span><?php echo __("About my project",$this->plugin_domain);?></span><span class="my-sortable-indicator" <?php if($my_order_col=="project")echo 'style="display:block"';?>></span></a></th>
					<th class=""><?php echo __("Actions",$this->plugin_domain);?></th>
					</tr>
					*/?>
				</thead>
				<tbody>
			<?php 
				if(empty($this->data['results'])){
				?>
				<
				<?php 
				}else {
				foreach($this->data['results'] as $k=>$v){
					//$v=stripslashes_deep($v);
				if($k%2)$class="alternate";
				else $class="";
					?>
					<?php ?>
					<tr class="<?php echo $class;?>" id="tr_id_<?php  echo $v->ID?>">
						<?php foreach($v as $k1=>$v1){
							if(!isset($this->columns[$k1]))continue;
							
							?>
							<td><?php echo $v1;?></td>
						<?php }?>
						<?php if(!empty($this->actions)){?>
							<td>
								<a href="<?php $url=admin_url('admin.php?page=woo-imagemapper_edit&id='.$v->ID);echo $url;?>" class="imapper-edit-button"><?php echo __("Edit","woo_image_mapper_domain");?></a>
								<a href="#javascript<?php //$url=admin_url('admin.php?page=woo-imagemapper&my_clone='.$v->ID);echo $url;?>" class="my_actions_<?php echo $this->id;?> imapper-edit-button" my_id="<?php echo $v->ID?>" my_name="my_object_id" my_action="clone"><?php echo __("Clone","woo_image_mapper_domain");?></a>
								
								<a href="#javascript" class="my_actions_<?php echo $this->id;?> imapper-delete-button" my_id="<?php echo $v->ID?>" my_name="my_object_id" my_action="delete"><?php echo __("Delete","woo_image_mapper_domain");?></a>
								<?php /*&nbsp;
								<a href="#javascript" class="my_actions_<?php echo $this->id;?>" my_id="<?php echo $v->ID?>" my_name="my_object_id" my_action="translate"><?php echo __("Translate",$this->plugin->theme_domain);?></a>
								*/ ?>
							</td>
						<?php }?>
					</tr>
					<?php /*
					<td><?php echo $v->id;?></td>
					<td><?php echo $v->req_date;?></td>
					<td><?php echo stripslashes($v->name);?></td>
					<td><?php echo $v->email;?></td>
					<td><?php $post=get_post($v->post_id);echo $post->post_title;?></td>
					<td><?php $text=stripslashes($v->project);if(strlen($text)>50)echo substr($text,0,50).'...';else echo $text;?></td>
					<td>
					<a href="<?php echo $this->base_url.'&my_tab=1&my_edit='.$v->id.'&'.$query;?>"><?php echo __("Edit",$this->plugin_domain);?></a>
					&nbsp;
					<a href="<?php echo $this->base_url.'&my_tab=1&my_delete='.$v->id.'&'.$query;?>"><?php echo __("Delete",$this->plugin_domain);?></a>
					&nbsp;
					<a href="<?php echo $this->base_url.'&my_tab=1&my_view='.$v->id.'&'.$query;?>"><?php echo __("View",$this->plugin_domain);?></a>
					</td>
					</tr>*/ ?>
				<?php 
				}
				?>
				</tbody></table>
				<script type="text/javascript">
					jQuery(document).ready(function($){
						$(".my_pagination_<?php echo $this->id;?>").click(function(e){
							e.preventDefault();
							var my_page=$(this).attr('my_page');
							//console.log('my_page'+my_page);
							$("#<?php echo $this->id;?> [name='my_page']").val(my_page);
							$("#<?php echo $this->id;?>").submit();
							});
						$(".my_order_<?php echo $this->id;?>").click(function(e){
							e.preventDefault();
							var my_page=$(this).attr('my_name');
							//console.log('my_page'+my_page);
							$("#<?php echo $this->id;?> [name='my_order_col']").val(my_page);
							var value=$("#<?php echo $this->id;?> [name='my_order']").val();
							var new_val='';
							if(typeof value=='undefined'){
								new_val='asc';
								}else {
							if(value=='desc'){
								new_val='asc';	
							}else new_val='desc';
							}
							$("#<?php echo $this->id;?> [name='my_order']").val(new_val);
							
							$("#<?php echo $this->id;?>").submit();
							});
						 $(".my_actions_<?php echo $this->id;?>").click(function(e){
							 e.preventDefault();
							 var id=$(this).attr('my_id');
							 var action=$(this).attr('my_action');
							 //console.log('Id '+id+'action '+action);
							 $("#<?php echo $this->id;?> [name='my_action']").val(action);
							 $("#<?php echo $this->id;?> [name='my_object_id']").val(id);
							 $("#<?php echo $this->id;?>").submit();
							 });	
						
						
						});
				</script>
				<?php 
				}
			
			
		}
		/**
		 * Render header of form view
		 */
		private function render_header(){
			if(isset($this->search_form)){
				$this->plugin->file->load_class('form/my-form');
				$this->search_form['plugin']=&$this->plugin;
				$this->search_form['action']=$this->url;
			if(!empty($this->show_by_page)){
					$my_show_on_page=@$_REQUEST['my_show_on_page'];
					if(!isset($my_show_on_page))$my_show_on_page=$this->show_by_page[0];
					$this->search_form['elements']['my_show_on_page']['params']['values']=$this->show_by_page;
					$this->search_form['elements']['my_show_on_page']['params']['value']=$my_show_on_page;
				}else unset($this->search_form['elements']['my_show_on_page']);
				$form_class=new Class_My_Form($this->search_form);
				$form_html=$form_class->render(false);
				
			}
			if(isset($this->search_form)){
			?>
			<div class="postbox-container" style="width:100%;">
				<div class="metabox-holder" >
					<div class="postbox">
						<div class="handlediv" title="Click to toggle"><br></div>
							<h3 class="hndle"><span><?php echo $this->search_title;?></span></h3>
								<div class="inside" style="<?php if(empty($this->show))echo 'display:none';?>">
									<div style="padding:10px">
									<?php echo $form_html;?>
									</div>
								</div>		
					
					</div>
				</div>
			</div>
			<div style="clear:both"></div>
			<?php 
			}
			/*
			<?php if(!empty($this->show_by_page)){?>
				<?php $my_show_on_page=@$_REQUEST['my_show_on_page'];
				if(!isset($my_show_on_page))$my_show_on_page=$this->show_by_page[0];
				?>
				<div style="margin-top:10px;float:right;">
				<label><?php echo __("Show resulsts on  page",$this->plugin->theme_domain);?></label>
				<select name="my_show_on_page">
					<?php foreach($this->show_by_page as $k=>$v){?>
						<option value="<?php echo $v?>" <?php if($my_show_on_page==$v)echo 'selected="selected"'?>><?php echo $v;?></option>
					<?php }?>
				</select>
				</div>
				<div style="clear:both"></div>
			<?php }?>	
					*/ ?>	
			<?php 	
		}
	}
}	