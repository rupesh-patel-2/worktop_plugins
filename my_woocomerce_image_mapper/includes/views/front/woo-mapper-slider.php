<?php
if(!defined('ABSPATH'))die('');
//print_r($ids);
//echo $my_autoplay.' '.$my_autoplay_sleep;
if(!isset($my_autoplay))$my_autoplay=0;
if(!isset($my_autoplay_sleep))$my_autoplay_sleep=10000;
?>
<div class="my_fotorama_outter" style="width:100%;position:relative;">
	<div class="my_fotorama_mapper" data-my-id="<?php echo $my_sliders_fotorama_inst;?>" id="my_fotorama_slider_id_<?php echo $my_sliders_fotorama_inst;?>">
  	<!--  <div class="my_fotorama_mapper_out">
		<div class="my_fotorama_mapper_inner">-->
		<?php $c=0; 
		if(!empty($ids)){?>
			<?php foreach($ids as $k=>$v){?>
				<div data-my-c="<?php echo $c;?>" id="my_fotorama_item_<?php echo $my_sliders_fotorama_inst.'_'.$v?>" class="my_fotorama_item" data-my-id="<?php echo $v;?>">
				<?php echo do_shortcode('[woo_mapper id="'.$v.'"]');?>
				</div>
				<?php 
				$c++;
			}?>
		<?php }?>
	<!--  	</div>
	</div>-->
		
	
	
	 </div>
	 <div class="my_nav_outter my_nav_outter_left fotorama__arr--prev">
	 	<div class="my_nav my_nav_left ">
			<span class="my_nav_arrow"><i class="fawesome icon-angle-left"></i></span>
			<!--<span class="my_fotorama_blue">1/11</span>-->
		</div>
	</div>
	<div class="my_nav_outter my_nav_outter_right fotorama__arr--next">
		<div class="my_nav my_nav_right ">
			<span class="my_nav_arrow"><i class="fawesome icon-angle-right"></i></span>
		<!-- <span class="my_fotorama_blue">1/11</span>-->
		</div>
	</div>
	<div class="my_fotorama_prev_image"></div>
	<div class="my_fotorama_next_image"></div>
	
	<div class="my_images_hidded" style="display:none">
		<?php $c=0;
			if(!empty($ids)){?>
			<?php foreach($ids as $k=>$v){?>
			<div class="my_slider_image" data-c="<?php echo $c;?>" data-my-id="<?php echo $v;?>">
			<?php 
			$my_mapper_image_id=my_woo_image_mapper_get_meta_val($v,'image_id');
			$my_mapper_image_src=wp_get_attachment_image_src($my_mapper_image_id,'thumbnail');
			?>
			<img src="<?php echo $my_mapper_image_src[0];?>"/>
			
			</div>
			<?php 
			$c++;
			}
		}?>
	</div>
</div>	
<script type="text/javascript">
	(function($) {
		$(window).load(function() {
			
			var o={};
			o.ids=[];
			o.titles={};
			<?php foreach($ids as $k=>$v){?>
				o.titles[<?php echo $v;?>]="<?php $title=my_woo_mapper_get_object_title($v);echo my_woo_image_mapper_format_str_to_jscript($title);?>";
				o.ids[o.ids.length]=<?php echo $v;?>;
			<?php }?>
			o.autoplay=<?php echo $my_autoplay;?>;
			o.correct_diff=0;
			o.autoplay_sleep=<?php echo $my_autoplay_sleep;?>;
			o.is_mobile=<?php if(wp_is_mobile())echo '1';else echo '0';?>;
			o.items=".my_fotorama_item";
			o.duration=300;
			o.animation='slide';
			o.id_n=<?php echo $my_sliders_fotorama_inst;?>;
			o.id='my_fotorama_slider_id_<?php echo $my_sliders_fotorama_inst;?>';
			var mySlider;
			mySlider=new mySliderMapper(o);
			});
		}
	)(jQuery);
</script> 
