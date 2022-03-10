<?php
if(!defined("ABSPATH"))die('');
if(!class_exists('Class_My_Module_Form_Static')){
	class Class_My_Module_Form_Static{
		static function render_element($name,$element){
			$type=$element['type'];
			Class_My_Module_Form_Static::$type($name,$element);
		}
		static function on_off($name,$element){
			$type=$element['type'];
			$dir=plugin_dir_path(__FILE__).'/views/';
			$file=$dir.$type.'.php';
			extract($element);
			if(!isset($element['value'])){
				$value=$element['default'];
			}else $value=$element['value'];
			require $file;
			
		}
		static function text($name,$element){
			$type=$element['type'];
			$dir=plugin_dir_path(__FILE__).'/views/';
			$file=$dir.$type.'.php';
			extract($element);
			if(!isset($element['value'])){
				$value=$element['default'];
			}else $value=$element['value'];
			require $file;
			
		}
		static function font($name,$element){
			$type=$element['type'];
			$dir=plugin_dir_path(__FILE__).'/views/';
			$file=$dir.$type.'.php';
			extract($element);
			/*if(!isset($element['value'])){
				$value=$element['default'];
			}else $value=$element['value'];*/
			//require $file;
			global $my_woo_immaper_fonts;
			global $my_woo_mapper_font_styles;
			global $my_woo_mapper_font_weight;
			$default=$element['default'];
			//$value=$element['value'];
			$old_name=$name;
			foreach($default as $k=>$v){
				$new_name=$k.$old_name;
				$name=$new_name;
				$new_element=array();
				$new_element['type']='select';
				$new_element['id']=$k.$name;
			$new_element['default']=$default[$k];
					$new_element['styles']=array(
						//'display'=>'inline-block',
						'float'=>'left',
						'margin-right'=>'4px',
						
					);
					if(isset($element['value'][$k])){
						$new_element['value']=$element['value'][$k];
					}
				if($k=='font'){
					//$new_element['styles']['width']='30px';
					$values=array();//array_keys($my_woo_immaper_fonts);
					foreach($my_woo_immaper_fonts as $k=>$v){
						$str=preg_replace('/\|.*/ims','',$v);
						$values[$k]=$str;
					}
					$new_element['values']=$values;
					//$new_element['styles']['width']='200px';
					
				}else if($k=='font_size'){
					$values=array();
					global $my_woo_mapper_font_sizes_array;
					$start=$my_woo_mapper_font_sizes_array['start'];
					$step=$my_woo_mapper_font_sizes_array['step'];
					$end=$my_woo_mapper_font_sizes_array['end'];
					for($i=$start;$i<=$end;$i+=$step){
						$values[$i.'px']=$i.'px';
					}
					$new_element['values']=$values;
					$new_element['styles']['width']='90px';
				}else if($k=='font_style'){
					$values=$my_woo_mapper_font_styles;
					$new_element['styles']['width']='90px';
					$new_element['values']=$values;
				}else if($k=='font_weight'){
					$values=$my_woo_mapper_font_weight;
					$new_element['values']=$values;
					$new_element['styles']['width']='90px';
					
				}
				Class_My_Module_Form_Static::select($name,$new_element);
				
			}
		
	}
		static function autocomplete($name,$element){
			$type=$element['type'];
			$dir=plugin_dir_path(__FILE__).'/views/';
			$file=$dir.$type.'.php';
			extract($element);
			if(!isset($element['value'])){
				$value=$element['default'];
			}else $value=$element['value'];
			require $file;
		}
		static function select($name,$element){
			$type=$element['type'];
			$dir=plugin_dir_path(__FILE__).'/views/';
			$file=$dir.$type.'.php';
			extract($element);
			if(!isset($element['value'])){
				$value=$element['default'];
			}else $value=$element['value'];
			require $file;
		}
		static function color_picker($name,$element){
			$type=$element['type'];
			$dir=plugin_dir_path(__FILE__).'/views/';
			$file=$dir.$type.'.php';
			extract($element);
			if(!isset($element['value'])){
				$value=$element['default'];
			}else $value=$element['value'];
			require $file;
		}
		static function slider($name,$element){
			$type=$element['type'];
			$dir=plugin_dir_path(__FILE__).'/views/';
			$file=$dir.$type.'.php';
			extract($element);
			if(!isset($element['value'])){
				$value=$element['default'];
			}else $value=$element['value'];
			require $file;
		}
	}
}