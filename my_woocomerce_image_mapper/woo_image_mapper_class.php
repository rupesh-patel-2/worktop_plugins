<?php
if(!defined('ABSPATH'))die('');
	class WooImageMapperAdmin
	{
		var $main, $path, $name, $url;
		
		function __construct($file)
		{
			$this->main = $file;
			$this->init();
			return $this;
		}
		
		function init() 
		{
			
			
			$this->path = dirname( __FILE__ );//file path to the iMapper's folder
			$this->name = basename( $this->path );//iMapper's folder name
			$this->url = plugins_url( "/{$this->name}/" );//url path to the iMapper's folder
			define('MY_WOO_IMAGE_MAPPER_DIRNAME',plugin_dir_path(__FILE__));
			define('MY_WOO_IMAGE_MAPPER_CLASS_DIRNAME',plugin_dir_path(__FILE__).'includes/class/');
			define('MY_WOO_IMAGE_MAPPER_FUNCTIONS_DIRNAME',plugin_dir_path(__FILE__).'includes/functions/');
			define('MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME',plugin_dir_path(__FILE__).'includes/views/');
			define('MY_WOO_IMAGE_MAPPER_MODULES_DIRNAME',plugin_dir_path(__FILE__).'includes/modules/');
			
			/**
			 * Require functions
			 */
			$file=MY_WOO_IMAGE_MAPPER_FUNCTIONS_DIRNAME.'functions.php';
			require_once $file;
			$file=MY_WOO_IMAGE_MAPPER_FUNCTIONS_DIRNAME.'options.php';
			require_once $file;
			add_action('wp_ajax_nopriv_my_woo_add_to_cart',array(&$this,'ajax_add_to_cart'));
			add_action('wp_ajax_my_woo_add_to_cart',array(&$this,'ajax_add_to_cart'));
			
			add_action('admin_head',array(&$this,'admin_head'));
			if(is_admin()) 
			{
				register_activation_hook( $this->main , array(&$this, 'activate') );//run "activate" function when plugin is activated
				add_action('admin_menu', array(&$this, 'admin_menu')); //adds additional options to admin panel's menu
				//custom AJAX handlers
				add_action('wp_ajax_get_woo_products',array(&$this,'ajax_get_woo'));
				add_action('wp_ajax_my_save_mapper_save',array(&$this,'my_ajax_save'));
				add_action('wp_ajax_mapper_save', array(&$this, 'ajax_save'));  
				add_action('wp_ajax_mapper_preview', array(&$this, 'ajax_preview'));
				add_action('wp_ajax_mapper_frontend_get', array(&$this, 'ajax_frontend_get'));
				add_action('wp_ajax_nopriv_mapper_frontend_get', array(&$this, 'ajax_frontend_get'));
			}
			else
			{
				add_action('wp_head',array(&$this,'wp_head'));
				add_action('wp', array(&$this, 'frontend_includes'));//called after WP object is set up
				//add_shortcode('image_mapper', array(&$this, 'shortcode') );//binds an image_mapper shortcode to a function
				add_shortcode('woo_mapper',array(&$this,'my_frontend'));
				/*chnages #sliders
 				* slider options
 				*/
				add_shortcode('woo_mapper_slider',array(&$this,'my_sliders'));
				
			}
				
		}
		/*chnages #sliders
 		* slider options
 		*/
		function my_sliders($attrs){
			static $my_sliders_fotorama_inst=0;
			$my_sliders_fotorama_inst++;
			extract($attrs);
			if(empty($id))return '';
			if(strpos($id,",")!==false){
				$ids=explode(",",$id);
			}else $ids=array();
			
			$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'front/woo-mapper-slider.php';
			ob_start();
			require $file;
			$html=ob_get_clean();
			
			return $html;
			
		}
		/**
		 * Add product to cart
		 */
		function ajax_add_to_cart(){
			$ret['error']=0;
			$id=@$_POST['id'];
			$id=(int)$id;
			$str='my_woo_image_mapper_add_cart_'.$id;
			$nonce=@$_POST['nonce'];
			if(!wp_verify_nonce($nonce,$str)){
				$ret['msg']=__("Error","woo_image_mapper_domain");
			}else {
				//
				$my_post=get_post($id);
				if(!empty($my_post)){
					if(($my_post->post_type=='product')){
					global $woocommerce;
					$woocommerce->cart->add_to_cart($id,1);
					$ret['msg']=$ret['msg']=__("Product has been added to cart!","woo_image_mapper_domain");
				}else $ret['msg']=__("Error","woo_image_mapper_domain");
				
				}else __("Error","woo_image_mapper_domain");
				
				
			}
			echo json_encode($ret);
			die('');
		}
		/**
		 * Wp head
		 */
		function wp_head(){
			?>
			<script type="text/javascript">
			my_woo_image_mapper_admin_url="<?php echo admin_url("admin-ajax.php");?>";
			</script>
			<?php 
		}
		/**
		 * New function for saving data
		 */
		function my_ajax_save(){
			$nonce=@$_POST['my_save_nonce'];
			$my_str_nonce=$str='my_imapper_save_imapper_'.get_current_user_id();
			$ret['error']=0;
			$ret['msg']='';
			global $my_woo_mapper_debug;
			global $my_woo_mapper_debug_data;
			if($my_woo_mapper_debug){
				$my_woo_mapper_debug_data['post']=$_POST;
			}
			if(!current_user_can('manage_options')){
				$data['error']=1;
				$data['msg']=__("Error","woo_image_mapper_domain");
				if($my_woo_mapper_debug){
					$ret['my_msg']='error_cap';
				}
			}
			else if(!wp_verify_nonce($nonce,$my_str_nonce)){
				$data['error']=1;
				$data['msg']=__("Error","woo_image_mapper_domain");
				if($my_woo_mapper_debug){
					$ret['my_msg']='error_nonce';
				}
			}else {
				$ret=my_woo_image_mapper_save_mapper();
				
			}
			if($my_woo_mapper_debug){
				$ret['my_debug']=$my_woo_mapper_debug_data;
			}
			echo json_encode($ret);
			die();
		}
		function admin_head(){
			$page=@$_GET['page'];
			if(!empty($page)){
				if($page=='woo-imagemapper_edit'){
					$id=@$_GET['id'];
					?>
					<script type="text/javascript">
					//jQuery(document).ready(function($){
						my_edit_item=<?php if(!empty($id))echo '1';else echo '0'?>;
						my_admin_ajax="<?php echo admin_url('admin-ajax.php');?>";
						my_admin_woo_msgs={};
						my_admin_woo_msgs.only_image_is_allowed="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Only images are allowed !","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.close_picker="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Close","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.select_color="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Select Color ","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.delete_pin="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Delete Pin","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.duplicate_pin="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Duplicate Pin","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.title_is_required="<?php echo my_woo_image_mapper_format_str_to_jscript(__("The title is required !","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.woo_commerce_product_is_required="<?php echo my_woo_image_mapper_format_str_to_jscript(__("You have to add woo product , or category for a pin  !","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.pins_are_required="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Please add some pins !","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.duplicate_pin_msg="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Duplicate pin {id} ,please select position on the map !","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.color_hex="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Color HEX value","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.wrong_color_hex="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Please add a HEX color value !","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.upload_pin_icon="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Predefined pin icons","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.pin="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Pin","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.select_pin="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Select Pin","woo_image_mapper_domain"))?>";
						my_admin_woo_msgs.select_pin_button="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Change Image","woo_image_mapper_domain"))?>";
						
						
						
						my_admin_woo_msgs.pin="<?php echo my_woo_image_mapper_format_str_to_jscript(__("Pin","woo_image_mapper_domain"))?>";
						my_admin_options_array={};
						<?php 
						global $my_woo_mapper_pre_options;
						global $my_woo_mapper_options;
						foreach($my_woo_mapper_options as $k=>$v){
							if($k=='general')continue;
							foreach($v as $key=>$field){
							?>
							my_admin_options_array['<?php echo $key;?>']="<?php echo $field['type']?>";
							<?php 
					}		
				}
						?>	
						
						//});
					</script>
					<?php
				}
			}
		}
		/* Creates iMapper database table when the plugin is initialized */
		function activate() 
		{	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
				
			global $wpdb;
			$table_name = $wpdb->base_prefix . 'image_mapper_object';
		
			if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) 
			{
				$sql="CREATE TABLE IF NOT EXISTS ".$table_name."
									(ID bigint(20) NOT NULL AUTO_INCREMENT,
										title tinytext NOT NULL COLLATE utf8_general_ci,
										PRIMARY KEY (id)
										)";
				dbDelta($sql);
			}
			$table_name = $wpdb->base_prefix . 'image_mapper_object_meta';
		
			if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) 
			{
				$sql="CREATE TABLE IF NOT EXISTS ".$table_name." (
  									meta_id bigint(20) unsigned NOT NULL auto_increment,
  									object_id bigint(20) unsigned NOT NULL default '0' COLLATE utf8_general_ci,
  									meta_key varchar(255) default NULL COLLATE utf8_general_ci,
  									meta_value longtext COLLATE utf8_general_ci,
  									PRIMARY KEY  (meta_id),
  									KEY object_id (object_id),
  									KEY meta_key (meta_key)
					)";
				dbDelta($sql);	
			}
			/*
			$table_name = $wpdb->base_prefix . 'image_mapper';
		
			if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) 
			{
				$image_mapper_sql = "CREATE TABLE " . $table_name . " 
							(
							  id mediumint(9) NOT NULL AUTO_INCREMENT,
							  name tinytext NOT NULL COLLATE utf8_general_ci,
							  settings text NOT NULL COLLATE utf8_general_ci,
							  items text NOT NULL COLLATE utf8_general_ci,
							  PRIMARY KEY (id)
							);";
		
				dbDelta($image_mapper_sql);			
			}*/
	
		}	
		
		/*Adds iMapper menu pages for admin users*/
		function admin_menu() 
		{
			$title=__("Woo Image Mapper","woo_image_mapper_domain");
			$title_1=__("Add New","woo_image_mapper_domain");
			$title_2=__("Sliders","woo_image_mapper_domain");
			
			$mappermenu = add_menu_page( $title, $title, 'manage_options', 'woo-imagemapper', array(&$this, 'admin_page'));
			$submenu = add_submenu_page( 'woo-imagemapper', $title, $title_1, 'manage_options', 'woo-imagemapper_edit', array(&$this, 'admin_edit_page'));
			$submenu_1=add_submenu_page( 'woo-imagemapper', $title, $title_2, 'manage_options', 'woo-imagemapper_sliders', array(&$this, 'admin_sliders_page'));
			//add_action('load-'.$mappermenu, array(&$this, 'admin_menu_scripts')); 
			add_action('load-'.$submenu, array(&$this, 'admin_menu_scripts')); 
			add_action('load-'.$mappermenu, array(&$this, 'admin_menu_styles')); 
			add_action('load-'.$submenu, array(&$this, 'admin_menu_styles')); 
			add_action('load-'.$submenu_1, array(&$this, 'admin_menu_styles'));
			add_action('load-'.$submenu_1, array(&$this, 'admin_sliders_scripts')); 
			 
			
		}
		function admin_sliders_scripts(){
			wp_enqueue_script('jquery');
			wp_enqueue_script('image-mapper-admin-sliders-js', $this->url . 'js/sliders.js' );
			
		}
		/*Enqueues admin scripts*/
		function admin_menu_scripts() 
		{
			wp_enqueue_script('post');
			wp_enqueue_script('farbtastic');
			wp_enqueue_script('thickbox');
			wp_enqueue_script('image-mapper-admin-js', $this->url . 'js/image_mapper_admin.js' );
			
			wp_enqueue_media();
			wp_enqueue_script( 'custom-header' );
			
			wp_enqueue_script('jQuery-mousew', $this->url . 'js/frontend/jquery.mousewheel.min.js' );
			wp_enqueue_script('jQuery-customScroll-imapper', $this->url . 'js/frontend/jquery.mCustomScrollbar.min.js' );
			
			wp_enqueue_script('jquery-ui-core', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-widget', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-sortable', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-slider', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-draggable', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-resizable', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-autocomplete', array(), 1.0, true);
			///wp_enqueue_script('jquery-ui-tooltip', array(), 1.0, true);
			
			wp_enqueue_script('jquery-effects-core');
			wp_deregister_script('iris');
			wp_enqueue_script('iris-imapper', $this->url . 'js/iris.min.js', array(), 1.0, true);
			
			wp_enqueue_script('rollover-imapper', $this->url . 'js/frontend/rollover.js' );
		}
		
		function admin_menu_styles() 
		{
			wp_enqueue_style('farbtastic');	
			wp_enqueue_style('thickbox');
			wp_enqueue_style( 'image-mapper-admin-css', $this->url . 'css/image_mapper_admin.css' );
			wp_enqueue_style( 'image-mapper-thick-css', $this->url . 'css/thickbox.css' );
			wp_enqueue_style( 'image-mapper-css', $this->url . 'css/frontend/image_mapper.css' );
			wp_enqueue_style( 'customScroll-css', $this->url . 'css/frontend/jquery.mCustomScrollbar.css' );
			wp_enqueue_style('font-awesome-css', $this->url . 'font-awesome/css/font-awesome.css');
			wp_enqueue_style('icon-pin-css', $this->url . 'mapper_icons/style.css');
		}
		function ajax_get_woo(){
			global $my_woo_mapper_debug;
			global $my_woo_mapper_debug_data;
			if($my_woo_mapper_debug){
				$my_woo_mapper_debug_data['post']=$_POST;
			}
			$ret['error']=1;
			$ret['msg']=__("Error","woo_image_mapper_domain");
			$ret['data']=array();
			
			if(!current_user_can('manage_options')){
				echo json_encode($ret);
				exit();
			}
			$nonce=@$_POST['my_nonce'];
			$str='my_imapper_get_woo_'.get_current_user_id();
			if(!wp_verify_nonce($nonce,$str)){
				echo json_encode($ret);
				exit();
			}
			$term=@$_POST['term'];
			$ret['error']=0;
			$ret['data']=my_woo_image_mapper_get_woo_products($term);
			if($my_woo_mapper_debug){
				$ret['my_debug']=$my_woo_mapper_debug_data;
			}
			echo json_encode($ret);
				exit();
		}
		/**
		 * Save data to db
		 */
		function ajax_save() 
		{
			$id = false;
			$settings = '';
			$items = '';
		
			foreach( $_POST as $key => $value) 
			{
				if ($key != 'action') 
				{
					if ($key == 'image_mapper_id')
					{
						if ($value != '')
						{
							$id = (int)$value;
						}
					}
					else if ($key == 'image_mapper_title')
					{
						$name = stripslashes($value);
					}
					else if(strpos($key,'sort') === 0)
					{
						if (substr($key, 4, 1) != '-')
							$items .= $key . '::' . stripslashes($value) . '||';
					}
					else 
					{
						$settings .= $key . '::' . stripslashes($value) . '||';
					}
				}
			}
			if ($items != '') $items = substr($items,0,-2);
			if ($settings != '') $settings = substr($settings,0,-2);
			global $wpdb;
			$table_name = $wpdb->base_prefix . 'image_mapper';
			if($id) 
			{	
				$wpdb->update(
					$table_name,
					array(
						'name'=>$name,
						'settings'=>$settings,
						'items'=>$items),
					array( 'id' => $id ),
					array( 
						'%s',
						'%s',
						'%s'),
					array('%d')
				);
			}
			else 
			{
				$wpdb->insert(
					$table_name,
					array(
						'name'=>$name,
						'settings'=>$settings,
						'items'=>$items),	
					array(
						'%s',
						'%s',
						'%s')						
					
				);
				$id = $wpdb->insert_id;
			}
			
				
			echo $id;
			die();
		}
		
		function admin_page() 
		{
			$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'admin/pages/index.php';
			include_once($file);
			//include_once($this->path . '/pages/image_mapper_index.php');
		}
		function admin_sliders_page(){
			$class=MY_WOO_IMAGE_MAPPER_MODULES_DIRNAME.'form/class.php';
			require_once $class;
			$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'admin/pages/sliders.php';
			include_once($file);
			
		}
		function admin_edit_page() 
		{
			$class=MY_WOO_IMAGE_MAPPER_MODULES_DIRNAME.'form/class.php';
			require_once $class;
			$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'admin/pages/edit.php';
			include_once($file);
			
			//include_once($this->path . '/pages/image_mapper_edit.php');
		}
		function my_frontend($atts){
			extract(shortcode_atts(array
			(
				'id' => ''
			), $atts));
			$file=MY_WOO_IMAGE_MAPPER_VIEWS_DIRNAME.'front/woo-immaper-frontend.php';
			ob_start();
			require $file;
			$html=ob_get_clean();
			
			return $html;
		}
		/***
		 * Depreced new shortcode is used
		 */
		function shortcode($atts) 
		{
			extract(shortcode_atts(array
			(
				'id' => ''
			), $atts));

			include($this->path . '/pages/image_mapper_frontend.php');
			$frontHtml = preg_replace('/\s+/', ' ',$frontHtml);

			return do_shortcode($frontHtml);
		}
		
		function frontend_includes() 
		{
			wp_enqueue_script('jquery');
			wp_enqueue_script("jquery-touch-pounch");
			wp_enqueue_script('jquery-ui-core');
			wp_enqueue_script('jquery-effects-core');
			wp_enqueue_script('jquery-effects-scale');
			wp_enqueue_script('jquery-effects-slide');
			
			
			wp_enqueue_script('jQuery-image-mapper', $this->url . 'js/frontend/jquery.image_mapper.js' );
			wp_enqueue_script('jQuery-mousew-imapper', $this->url . 'js/frontend/jquery.mousewheel.min.js' );
			wp_enqueue_script('jQuery-customScroll-imapper', $this->url . 'js/frontend/jquery.mCustomScrollbar.min.js' );
 			wp_enqueue_script('rollover-imapper', $this->url . 'js/frontend/rollover.js' );
			wp_enqueue_script('jquery-prettyPhoto-imapper', $this->url . 'js/frontend/jquery.prettyPhoto.js' );//promenjen prettyPhoto
			//wp_enqueue_script('imapper-pie', $this->url . 'js/PIE.js');//izbaceno par skripti
			/*chnages #sliders
 			* slider options
 			*/
			//echo $this->url.'js/frontend/my_fotorama_js.js';
			
			wp_enqueue_script('my_12345_woo_mapper_my_slider_jscript',$this->url.'js/frontend/my_fotorama_js.js');
			wp_enqueue_style('my_woo_mapper_sliders_css',$this->url.'css/frontend/my_slider.css');
			/*
			 * end
			 */
			wp_enqueue_style( 'image-mapper-css', $this->url . 'css/frontend/image_mapper.css' );
			wp_enqueue_style( 'customScroll-css-imapper', $this->url . 'css/frontend/jquery.mCustomScrollbar.css' );
			wp_enqueue_style( 'prettyPhoto-css-imapper', $this->url . 'css/frontend/prettyPhoto.css' );
			wp_enqueue_style('font-awesome-css', $this->url . 'font-awesome/css/font-awesome.css');
			wp_enqueue_style('icon-pin-css', $this->url . 'mapper_icons/style.css');
			/*chnages #sliders
 			* slider options
 			*/
			//wp_enqueue_style('woo_mapper_my_fotorama_css',$this->url.'css/fotorama/fotorama.css');
			//wp_enqueue_script('woo_mapper_my_fotorama_jscript',$this->url.'css/fotorama/fotorama.js');
			/*
			 * end
			 */
		}
	}
?>