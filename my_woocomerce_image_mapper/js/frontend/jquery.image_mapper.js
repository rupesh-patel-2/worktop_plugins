/*

jQuery Image Mapper v2.0

Pin mapper for custom images.

Copyright (c) 2014 Br0 (shindiristudio.com)

Project site: http://codecanyon.net/
Project demo: http://shindiristudio.com/imgmapper

*/

(function($){//zasticen scope
	
	$.fn.imageMapper = function(options) {
	
	/**
	*Default plugin options
	*/
	var defaults = {
		itemOpenStyle: 'click',//click,hover
		itemDesignStyle: 'fluid',//fluid or responsive
		pinScalingCoefficient: 0, 
		categories:false, 
		showAllCategory: true,
		allCategoryText: 'All',
		advancedPinOptions: false, 
		pinClickAction:'none',//link, content, lightboxImage, lightboxIframe,  contentBelow, none
		pinHoverAction:'content',//content, none
		lightboxGallery: false, //enable galery on opened pin lightboxes
		mapOverlay: false, 
		blurEffect: false,
		slideAnimation: false
		
	};
	
	/**
	* Settings that are used throughout the plugin
	*/
	var settings = $.extend( {}, defaults, options);
	
	if (settings.pinScalingCoefficient>0)
		settings.pinScalingCoefficient = 1;
	else if (settings.pinScalingCoefficient<=0)
		pinScalingCoefficient = 0;

	/**
	* Global plugin variables
	*/
	var map_original_width;
	var map_original_height;
	var my_debug=true;

	var clicked;
	var tab_clicked;

	var map_width;
	var map_height;

	var pinType1 = 'imapper-pin-type-1', pinType2 = 'imapper-pin-type-2', pinType3 = 'imapper-pin-type-3', pinType4 = 'imapper-pin-type-4', pinType5 = 'imapper-pin-type-5', pinTypeCustom = 'imapper-pin-type-custom';
	var parent_width;

	var contentWrapperOld;
	var contentOld;
	var contentHeaderOld;
	var contentTextOld;
	var contentTabOld;
	var contentAdditionalOld;
	
	var width; 
	var height;
	
	var cHeight;
	var cWidth;
	
	var designStyle;

	var multiplier;
	var multiplierArea;

	var pluginHref = window.location.href;
	var pluginUrl = pluginHref.substring(0, pluginHref.lastIndexOf('/')+1 );

	/**
	* this is the plugin container
	*/
	return this.each( function() {
		
			var id = $(this).attr('id').substring(11, $(this).attr('id').indexOf('-'));
				
			var my_transitions;
			var my_transforms_prefix="";
			var my_transitions_prefix="";
			var my_transform;
			my_transitions=(function(){
				var obj = document.createElement('div');
	            var props=['transition','WebkitTransition','MozTransition','MsTransition','OTransition'];
	            for (var i in props) {
		            if ( obj.style[ props[i] ] !== undefined ) {
		            if(props[i]=='transition'){
		            	my_transitions_prefix="";
			            
		            }else {
		            var my_pref=props[i].replace('Transition','').toLowerCase();
		            if(my_pref==""){
		            my_transitions_prefix="";
		            }else {
		            my_transitions_prefix="-"+my_pref+"-";
		            }
		            }
		            my_admin_debug("TRansition Prefix ",my_transitions_prefix);
		              return true;
		            }
		            }
	            return false;
			}());
			//my_transitions_prefix='-webkit-';
			my_transform=(function(){
				var obj = document.createElement('div');
	              var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
	              for (var i in props) {
			            if ( obj.style[ props[i] ] !== undefined ) {
			            if(props[i]=='transform'){
			            	my_transforms_prefix="";
				            
			            }else {
			            var my_pref=props[i].replace('Transform','').toLowerCase();
			            if(my_pref==""){
			            	my_transforms_prefix="";
			            }else {
			            	my_transforms_prefix="-"+my_pref+"-";
			            }
			            }
			            my_admin_debug("TRansform Prefix ",my_transforms_prefix);
			              return true;
			            }
			            }
	          return false;    
			}());
			//my_admin_debug()
			/*
			my_transform=(function() {
		          var obj = document.createElement('div');
	              var props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
	          for (var i in props) {
	            if ( obj.style[ props[i] ] !== undefined ) {
	              var my_pref= props[i].replace('Perspective','').toLowerCase();
	              if(my_pref!="")
	              my_transform_prefix = "-" + my_pref;
	              
	              my_admin_debug("Prefix ",my_transform_prefix);
	              
	              return true;
	            }
	          }
	          return false;
	        }());
	        */
			my_admin_debug("Transitions",my_transitions);
			my_admin_debug("Transforms",my_transform);
			/**
			 * Immaper init
			 * init dots
			 */
			imapperInit(id, settings);

			
			width = $(this).find('.imapper-content').width();
			height = $(this).find('.imapper-content').height();
			
			
			map_width = $(this).find('#imapper' + id + '-map-image').width();
			map_height = $(this).find('#imapper' + id + '-map-image').height();

			
			var map_original_size = imapperGetOriginalSize('#imapper' + id + '-map-image');
			if(typeof map_original_size!='undefined'){
				map_original_width = map_original_size[0];
				map_original_height = map_original_size[1];
			}else {
				map_original_width=map_width;
				map_original_height=map_height;
			}

			
			var parent_width = ($(this).parent().width() < map_original_width) ? $(this).parent().width() : map_original_width;

			
			multiplierArea = parent_width / map_original_width;
			/**
			 * ako je pinScallingCoeficinet=1
			 * muliplier=1
			 * ne primenjuje se scalling elements
			 * ali se primenjuje scalling na imapper-content
			 * 
			 */
			if (settings.pinScalingCoefficient!=0) {
				multiplier = settings.pinScalingCoefficient;
			}
			else {
				multiplier = multiplierArea;
			}
			
			cHeight = new Array();
			cWidth = new Array();
			
			designStyle = settings.itemDesignStyle;

			clicked = new Array();
			tab_clicked = new Array();
			
			
			contentWrapperOld = new Array();
			contentOld = new Array();
			contentHeaderOld = new Array();
			contentTextOld = new Array();
			contentTabOld = new Array();
			contentAdditionalOld = new Array();
			
			$(this).css('width', parent_width);
			
			/*$(".imapper"+id+"-pin-content-wrapper").each(function(i,v){
				//var height=
				//$(this).find(".my_product_description").mCustomScrollbar({'scrollInertia':300});
				//$(this).find(".my_product_description").mCustomScrollbar("disable",true);
			});*/
			
			/**
			 * ajax add product to cart
			 */
			$("#imagemapper"+id+"-wrapper .my_add_item a").click(function(e){
				e.preventDefault();
			});
			/**
			 * Add product to cart
			 */
			$("#imagemapper"+id+"-wrapper .my_add_item").click(function(e){
				e.preventDefault();
				e.stopPropagation();
				var product_id=$(this).data("my-product-id");
				var nonce=$(this).find("input[type='hidden']").val();
				var data={
						action:'my_woo_add_to_cart',
						nonce:nonce,
						id:product_id
						
				};
				my_admin_debug("Add to cart",data);
				$.ajax({
					url:my_woo_image_mapper_admin_url,
					dataType:'json',
					type:'POST',
					data:data,
					timeout:60000,
					success:function(data){
						alert(data.msg);
					},
					error:function(){
					}	
				});
			});
			/**
			 * Click on buttons
			 */
			$(".imapper" + id +"-pin-wrapper .my_product_footer .my_view_item a").click(function(e){
				e.preventDefault();
				//e.stopPropagation();
				var href=$(this).find('a').attr('href');
				my_admin_debug("Click a view item",href);
			});
			$(".imapper" + id +"-pin-wrapper .my_product_footer .my_view_item_category a").click(function(e){
				e.preventDefault();
				//e.stopPropagation();
				var href=$(this).find('a').attr('href');
				my_admin_debug("Click a view item",href);
			});
			/*$(".imapper" + id +"-pin-wrapper .my_product_footer .my_add_item a").click(function(e){
				e.stopPropagation();
				var href=$(this).find('a').attr('href');
				my_admin_debug("Click a add item",href);
			});
			*/	
			/**
			 * Load product page
			 */
			$(".imapper" + id +"-pin-wrapper .my_product_footer .my_view_item ,"+".imapper" + id +"-pin-wrapper .my_product_footer .my_view_item_category").click(function(e){
				e.preventDefault();
				e.stopPropagation();
				var href=$(this).find('a').attr('href');
				my_admin_debug("Click view item",href);
				var my_target=$(this).data('my-target');
				if(my_target=='new'){
					var win=window.open(href,'_blank');
					win.focus();
				}else if(my_target=='same'){
					window.location.href=href;
				}
				
				
			});
			/*$(".imapper" + id +"-pin-wrapper .my_product_footer .my_add_item").click(function(e){
				e.preventDefault();
				e.stopPropagation();
				var href=$(this).find('a').attr('href');
				my_admin_debug("Click add item",href);
				
				$(this).find('a').trigger('click');
			});
			*/
			/**
			 * Scallimg pins to 
			 * responsive desing
			 */
			my_function_scalling_pins=function(id){
				my_admin_debug("Woo immaper scalling pins",id);
				var my_window_width=parseInt($(window).width());
				
				if(my_window_width<settings.responsiveWidth){
					var my_map_original_size = imapperGetOriginalSize('#imapper' + id + '-map-image');
					if(typeof my_map_original_size!='undefined'){
					var my_map_original_width = my_map_original_size[0];
					var my_map_original_height = my_map_original_size[1];

					
					var my_parent_width = ($("#imagemapper"+id+"-wrapper").width() < map_original_width) ? $("#imagemapper"+id+"-wrapper").parent().width() : map_original_width;

					}else {
						var my_parent_width = $("#imagemapper"+id+"-wrapper").width()*2;
						var my_map_original_width=$("#imagemapper"+id+"-wrapper").width();
						var my_map_original_height=$("#imagemapper"+id+"-wrapper").height();
					}
					var my_multiplierArea = my_parent_width / my_map_original_width;
					/**
					 * Dont scale box to much
					 */
					if(my_multiplierArea<0.4){
						my_multiplierArea=0.4;
					}
					my_admin_debug("Scalling pins",{width:my_window_width,respo:settings.responsiveWidth});
					//$('.imapper' + id + '-pin').each(function(i,v){
					var my_mult_coeff=my_multiplierArea;
					//$(this).parent().find('.imapper' + id + '-pin')
					var img_width = $('.imapper' + id + '-pin').outerWidth();
					var img_height = $('.imapper' + id + '-pin').outerHeight();
					var my_new_width=img_width*my_mult_coeff;
					var my_new_height=img_height*my_mult_coeff;
					my_admin_debug("Scalling pins",{img_width:img_height,img_width:img_width,coeff:my_mult_coeff,new_w:my_new_width,new_h:my_new_height});
					var my_scale_coeff_str='scale('+my_mult_coeff+')';
					my_admin_debug("Scalling str",my_scale_coeff_str);
					
					$(".imapper"+id+"-pin").each(function(i,v){
						var my_id=$(v).attr('id');
						my_admin_debug("Scalling id",my_id);
						$(v).data('my-scalling',my_mult_coeff);
						$(v).css('-webkit-transform',my_scale_coeff_str);
						$(v).css('-moz-transform',my_scale_coeff_str);
						$(v).css('-ms-transform',my_scale_coeff_str);
						$(v).css('-o-transform',my_scale_coeff_str);
						
						
						$(v).css({'transform':my_scale_coeff_str,'transform-origin':'50% 50%',
																		'-webkit-transform-origin':'50% 50%',
																		'-moz-transform-origin':'50% 50%',
																		'-ms-transform-origin':'50% 50%',
																		'-o-transform-origin':'50% 50%'});
																		
						/**
						 * Adjust margins of elements
						 */
						var my_scalle=$(this).data('my-scalling');
						var my_w=$(this).outerHeight()/2*my_scalle;
						var my_h=$(this).outerWidth()/2*my_scalle;
						/**
						 * Depreced by dragan 12.16.2014
						 * removed
						 */
						//$(this).css('top', -my_w + 'px');
						//$(this).css('left', -my_h + 'px');
					});
					/*
					$(".immaper"+id+"-pin").data('my-scalling',my_mult_coeff);
					$(".immaper"+id+"-pin").css('-webkit-transform',my_scale_coeff_str);
					$(".immaper"+id+"-pin").css('-moz-transform',my_scale_coeff_str);
					$(".immaper"+id+"-pin").css('-ms-transform',my_scale_coeff_str);
					$(".immaper"+id+"-pin").css('-o-transform',my_scale_coeff_str);
					
					
					$(".immaper"+id+"-pin").css({'transform':my_scale_coeff_str,'transform-origin':'50% 50%',
																	'-webkit-transform-origin':'50% 50%',
																	'-moz-transform-origin':'50% 50%',
																	'-ms-transform-origin':'50% 50%',
																	'-o-transform-origin':'50% 50%'});
					*/
					
					
					//$('.imapper' + id + '-pin').css('width',my_new_width+'px');
					//$('.imapper' + id + '-pin').css('height',my_new_height+'px');
					//var my_inner_dot=$()
					//});
				}else {
					my_admin_debug("Widnow > responsive view");
					var my_mult_coeff=1;
					var my_scale_coeff_str='scale(1);';
					/**
					 * Remove scalling if window is gratter
					 */
					var my_def=$(".imapper"+id+"-pin").data('my-scalling');
					if(typeof my_def!='undefined'){
					$(".imapper"+id+"-pin").each(function(i,v){
						var my_scalle=$(this).data('my-scalling');
						my_admin_debug("Scalling",my_scalle);
						if(typeof my_scalle!='undefined'){
						 
						var my_id=$(v).attr('id');
						my_admin_debug("Scalling id",my_id);
						
						$(v).data('my-scalling',my_mult_coeff);
						$(v).css('-webkit-transform',my_scale_coeff_str);
						$(v).css('-moz-transform',my_scale_coeff_str);
						$(v).css('-ms-transform',my_scale_coeff_str);
						$(v).css('-o-transform',my_scale_coeff_str);
						
						
						$(v).css({'transform':my_scale_coeff_str,'transform-origin':'50% 50%',
																	'-webkit-transform-origin':'50% 50%',
																		'-moz-transform-origin':'50% 50%',
																		'-ms-transform-origin':'50% 50%',
																	'-o-transform-origin':'50% 50%'});
						my_scalle=my_mult_coeff;
						var my_w=$(this).outerHeight()/2*my_scalle;
						var my_h=$(this).outerWidth()/2*my_scalle;
						$(this).css('top', -my_w + 'px');
						$(this).css('left', -my_h + 'px');	
						
						}
						
						});
					//if(typeof my_def!='undefined'){
						//my_content_position_function();
					//}
					}
				}
			};
			/**
			 * Call scalling pins on start
			 */
			my_function_scalling_pins(id);
			/**
			 * Add left and top margin to images
			 * so left -width/2 top -height/2
			 */
			$('.imapper' + id + '-pin').each( function() {
				
				var pinId = getPinId($(this));
				my_admin_debug("Array of pins pin",pinId);
				
				if ($(this).attr('src') !== undefined ) {
					if ($(this).attr('src').indexOf('images/icons/1/') >= 0) {
						$(this).addClass(pinType1);
					} else if ($(this).attr('src').indexOf('images/icons/2/') >= 0) {
						$(this).addClass(pinType2);
					} else if ($(this).attr('src').indexOf('images/icons/3/') >= 0) {
						$(this).addClass(pinType3);
					} else if ($(this).attr('src').indexOf('images/icons/4/') >= 0) {
						$(this).addClass(pinType4);
					} else if ($(this).attr('src').indexOf('images/icons/5/') >= 0) {
						$(this).addClass(pinType5);
					} else {
						$(this).addClass(pinTypeCustom);
					}
				}


				
				clicked[pinId] = 0;
				tab_clicked[pinId] = 1;

				
				var img_width = $(this).width();
				var img_height = $(this).height();

				
				var radius = parseInt($(this).siblings('.imapper-content').css('border-bottom-left-radius')) / 2 + 1;
				
				
				contentTabOld[pinId] = new Array();
				contentAdditionalOld[pinId] = new Array();

				 
				var tNumber = 1;
				var tabValueNumber = $(this).siblings('.imapper-value-tab-number');
				if (tabValueNumber.length > 0)
					tNumber = parseInt(tabValueNumber.html());
				
				cHeight[pinId] = ($(window).width() <= 600 && designStyle == 'responsive') ? map_original_height - ((tNumber > 1) ? tNumber : 0) * (75 - radius) : height;
				cWidth[pinId] = ($(window).width() <= 600 && designStyle == 'responsive') ? map_original_width - ((tNumber > 1) ? tNumber : 0) * (75 - radius) : width;
				
				if ($(this).hasClass(pinType4))
					$(this).addClass('pin-mini-style');
				else
					$(this).addClass('pin-style');
					
					
				if ($(this).hasClass(pinType2) || $(this).hasClass(pinType1))
					$(this).parent().find('.imapper-content').wrapInner('<div class="imapper-content-inner" style="width: ' + width + 'px; height: ' + height + 'px;" />');			
				
					
				if ($(this).hasClass(pinType5))
				{
					$(this).parent().find('.imapper-pin-icon').css('left', -$(this).parent().find('.imapper-pin-icon').width() / 2 - 1 + 'px');
				}
					
				if($(this).find("img").length>0){
					var my_size=imapperGetOriginalSize($(this).find("img"));
					if(typeof my_size!='undefined'){
						$(this).css('width',my_size[0]+'px');
						$(this).css('height',my_size[1]+'px');
					}
					
				}
				if (!($(this).hasClass(pinType1) || $(this).hasClass(pinType2) || $(this).hasClass(pinType3) || $(this).hasClass(pinType4) || $(this).hasClass(pinType5)))
				{
					var my_scalle=$(this).data('my-scalling');
					if(typeof my_scalle=='undefined')my_scalle=1;
					var my_w=$(this).outerHeight()/2*my_scalle;
					var my_h=$(this).outerWidth()/2*my_scalle;
					$(this).css('top', -my_w + 'px');
					$(this).css('left', -my_h + 'px');
				}
			});
			
			//mouseenter function for pins
			/**
			 * Enter on pin
			 * changed hover on pin
			 * not executed no pins type1
			 */
			$('.imapper' + id + '-pin').mouseenter(function() {

				

				if ($(this).hasClass(pinType1))
				{
					if (!$(this).is('span')) {
					var position = $(this).attr('src').indexOf('/images/');
					pluginUrl = $(this).attr('src').substring(0, position);
					$(this).attr('src', pluginUrl + '/images/icons/1/1-1.png');
					}
				}
				 else if ($(this).hasClass(pinType3))
				{
					
					$(this).animate({
						marginTop: -10,
						'padding-bottom': 10
					},
					{
						duration: 200,
						queue: false
					});
					
					$(this).parent().find('.imapper-pin-shadow').animate({
						marginTop: -80,
						marginLeft: -46
					},
					{
						duration: 200,
						queue: false
					});
				}
				else if ($(this).hasClass(pinTypeCustom)) {
					var hoverPin = $(this).data('imapper-hover-pin');
					var standardPin = $(this).attr('src');
					$(this).data('imapper-standard-pin',$(this).attr('src'));
					if (hoverPin!==undefined)
						$(this).attr('src', hoverPin);
				}
			});
				
			//mouseout function for pins - this and previous function are used only for pins with animated shadow and when icon changes on hover
			$('.imapper' + id + '-pin').mouseleave(function() {
				
				
					
					if ($(this).hasClass(pinType1))
					{
						if (!$(this).is('span')) {
							var position = $(this).attr('src').indexOf('/images/');
							pluginUrl = $(this).attr('src').substring(0, position);
							$(this).attr('src', pluginUrl + '/images/icons/1/1.png');
						}
					}
					else if ($(this).hasClass(pinType3))
					{
						
						$(this).animate({
							marginTop: 0,
							'padding-bottom': 0
						},
						{
							duration: 200,
							queue: false
						});
						
						$(this).parent().find('.imapper-pin-shadow').animate({
							marginTop: -75,
							marginLeft: -41
						},
						{
							duration: 200,
							queue: false
						});
					}
					else if ($(this).hasClass(pinTypeCustom)) {
						var standardPin = $(this).data('imapper-standard-pin');

						if (standardPin!==undefined)
							$(this).attr('src', standardPin);
					}
		
			});
			/**
			 * Change content position
			 * 
			 */
			my_change_content_position=function(id,id_pin,position){
				
				var my_id="#imapper"+id+"-pin"+id_pin+"-content-wrapper";
				var my_obj=$(my_id);
				
				//var position = my_obj.parent().data('open-position');
				var width=parseInt(my_obj.data('width'));
				var height=parseInt(my_obj.data('height'));
				var my_width=width+20;
				var my_height=height+20;
				
				/**
				 * Bilo je height i width promenjeno
				 * za width i height
				 */
				var img_width = my_obj.parent().find('.imapper' + id + '-pin').outerWidth();
				var img_height = my_obj.parent().find('.imapper' + id + '-pin').outerHeight();
				my_admin_debug("Change content position",{my_id:my_id,position:position,width:width,height:height,img_height:img_height,img_width:img_width});
				var my_hide=[];
				if(position=='right'){
					my_hide=['imapper-arrow-new-right','imapper-arrow-new-top','imapper-arrow-new-bottom'];
					//$(this).find(".imapper-content .imapper-arrow-new-right").hide();
					//$(this).find(".imapper-content .imapper-arrow-new-right").hide();
					
				}else if(position=='left'){
					my_hide=['imapper-arrow-new','imapper-arrow-new-top','imapper-arrow-new-bottom'];
					
				}else if(position=='top'){
					my_hide=['imapper-arrow-new-right','imapper-arrow-new','imapper-arrow-new-top'];
					
				}else if(position=='bottom'){
					my_hide=['imapper-arrow-new-right','imapper-arrow-new-bottom','imapper-arrow-new'];
					
				}
				my_obj.find(".imapper-content .imapper-arrow-new-right").show();
				my_obj.find(".imapper-content .imapper-arrow-new").show();
				my_obj.find(".imapper-content .imapper-arrow-new-top").show();
				my_obj.find(".imapper-content .imapper-arrow-new-bottom").show();
				
				//var my_obj=$(my_id);
				$.each(my_hide,function(i,v){
					my_obj.find("."+v).hide();
				});
				var my_width=width+20;
				var my_height=height+20;
				if(position=='top'){
					//var my_right=my_width/2+img_width/2;
					//var my_bottom=height+img_height+17;
					var my_right=my_width/2+img_width/2-3;
					my_right-=20;
					var my_bottom=my_height+img_height/2;
					my_bottom+=8;
					//$(this).find('.imapper-content').css('position', 'absolute');
					//$(this).find('.imapper-content').css('right', '0px');
					//$(this).find('.imapper-content').css('left', '0px');
					
					my_obj.css('width', my_width + 'px');
					my_obj.css('height', my_height+'px');
					my_obj.css('right',  my_right+ 'px');
					my_obj.css('bottom', my_bottom + 'px');
					
					
				}else if(position=='bottom'){
					var my_right=my_width/2+img_width/2-3;//bilo je -2
					my_right-=20;
					var my_bottom=-(img_height/2+20);
					my_bottom-=8;
					//var my_right=my_width/2+11;
					//var my_bottom=-17;
					//$(this).find('.imapper-content').css('position', 'absolute');
					//$(this).find('.imapper-content').css('right', '0px');
					my_obj.css('width', my_width + 'px');
					my_obj.css('height', my_height+'px');
					my_obj.css('right', my_right + 'px');
					my_obj.css('bottom', my_bottom+ 'px');
				
				}else if(position=='right'){
					var my_right=-17;
					var my_bottom=height/2+2;
					my_right=-(img_width/2);
					my_right-=8;
					my_right-=20;
					
					//my_obj.find('.imapper-content').css('position', 'absolute');
					//my_obj.find('.imapper-content').css('right', '0px');
					my_obj.css('width', my_width + 'px');
					my_obj.css('height', my_height+'px');
					my_obj.css('right', my_right + 'px');
					my_obj.css('bottom', my_bottom + 'px');
				
				
				}else if(position=='left'){
					var my_right=my_width+img_width/2+20;
					var my_bottom=height/2+2;
					my_right-=20;
					my_right+=7;//Added 18 from pin
					//$(this).find('.imapper-content').css('position', 'absolute');
					//$(this).find('.imapper-content').css('right', '0px');
					my_obj.css('width', my_width + 'px');
					my_obj.css('height', my_height+'px');
					my_obj.css('right', my_right + 'px');
					my_obj.css('bottom', my_bottom+ 'px');
				
				}
				
				
			};
			/**
			 * Ad dtransform to small
			 */
			my_add_transform_small=function(id,id_pin){
				if ((settings.transformSmall)&&($(window).width() <= settings.responsiveWidth ) && designStyle == 'responsive')
				{	
					my_admin_debug("my_add_transform_small",{id:id,id_pin:id_pin});
					//$("#imagemapper"+id+"-wrapper").data('my-small',1);
					var mapHeight = $('.imapper'+id+'-map-image').height();
					
					var my_map_h=$("#imapper"+id+"-map-image").height();
					var my_map_w=$("#imapper"+id+"-map-image").width();
					
					my_admin_debug("Rwponsive mapHeight",mapHeight);
					my_admin_debug("Map",{w:my_map_w,h:my_map_h});
					var my_transform_coeff=1;
					var my_id_pin="#imapper"+id+"-pin"+id_pin+"-content-wrapper";
					var my_orig_width=parseFloat($(my_id_pin).data('width'));
					var my_orig_height=parseFloat($(my_id_pin).data('height'));
					if((my_orig_width>my_map_w) || (my_orig_height>my_map_h)){
						var my_t_1=my_map_w/parseFloat(my_orig_width);
						var my_t_2=my_map_h/parseFloat(my_orig_height);
						if(my_t_1<my_t_2)my_transform_coeff=my_t_1;
						else my_transform_coeff=my_t_2;
					}else return false;
					
					my_admin_debug("Transform coeff",my_transform_coeff);
					var my_obj=$(my_id_pin);
					//$('.imapper' + id + '-pin').each(function() {
						
						/*var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
							$(this).parent().css('transform').indexOf(',')))) + 'px';
						*/
						
						var my_left_p=parseFloat(my_obj.parent().css('left'));
						my_admin_debug("My left p",my_left_p);
						var positionLeft=-((parseFloat(my_obj.parent().css('left')))/my_transform_coeff);///my_transform_coeff)+'px';
					
						/*positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
								$(this).css('transform').indexOf(',')))) + 'px';
							*/	
						my_admin_debug("position left",positionLeft);	
							var parentTopPercent = parseFloat(my_obj.parent().data('top'))/100;
							var my_parentLeftPercent=parseFloat(my_obj.parent().data('left'))/100;
							
							var mapHeight = parseInt(my_obj.closest('.imagemapper-wrapper').height());
							my_admin_debug("map height",mapHeight);
							var part1 = mapHeight*parentTopPercent/my_transform_coeff;// / my_transform_coeff;
							//var iconHeight = parseInt($(this).outerHeight()) * parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
							//$(this).css('transform').indexOf(',')));
							my_obj.parent().find(".my-imapper-arrow-new-1234").hide();
							
							positionTop =  - (part1) + "px";
							my_admin_debug("position top",positionTop);	
						/**
						 * My calculation
						 */
						//var my_top=my_map_h*parseFloat()	
						
						var pinId = getPinId(my_obj);	
						var position = my_obj.parent().data('open-position');
						
						//var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-right-radius')) / 2 + 1;
						/*if(my_map_h<200){
							var old_map_h=my_map_h;
							my_map_h=200;
							//positionTop-=Math.abs(my_map_h-old_map_h)/2;
						}*/
						/**
						 * 
						 */
						
						my_obj.parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width + 'px', 'height': map_original_height + 'px', 'z-index': '15'});
						my_obj.parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
						/**
						 * Try with
						 */
						var my_enable_shadow=my_obj.parent().find(".imapper-content").data('my-enable-shadow');
						var my_shadow_width=parseInt(my_obj.parent().find(".imapper-content").data('my-shadow-width'));
						my_admin_debug("Shadow",{my_e:my_enable_shadow,my_shadow_width:my_shadow_width});
						var my_i_w=my_map_w/my_transform_coeff;
						var my_i_h=my_map_h/my_transform_coeff;
						var my_i_top=0;
						var my_i_left=0;
						var my_i_w_12345=(my_i_w-50);
						$("#imapper"+id+"-pin"+id_pin+"-content-wrapper .my_product_title_inner").attr('style','width:'+(my_i_w_12345)+'px !important;');
						
						
						my_admin_debug("New width height",{width:my_i_w,height:my_i_h});
						positionLeft=-(parseFloat(my_parentLeftPercent)*my_map_w);///my_transform_coeff)+'px';
						part1 = my_map_h*parentTopPercent;
						positionTop=-(part1);
						my_admin_debug("Postions",{left:positionLeft,top:part1})
						/**
						 * Try with
						 */
						//positionLeft=-(my_map_w)
						positionLeft-=(my_i_w-my_map_w)/2;
						positionTop-=(my_i_h-my_map_h)/2;
						positionLeft+='px';
						positionTop+='px';
						my_admin_debug("Postions after",{left:positionLeft,top:positionTop})
						
						
						/*if(my_enable_shadow==1){
							my_i_w-=my_shadow_width*2;
							my_i_h-=my_shadow_width*2;
							my_i_top=my_shadow_width;
							my_i_left=my_shadow_width;
						}*/
						//$(this).parent().find('.imapper-content-wrapper').css('right','');
						//$(this).parent().find('.imapper-content-wrapper').css('bottom','');
						var my_transforms_prefix_new=my_transforms_prefix+'transform';
						my_obj.parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': my_i_w + 'px', 'height': my_i_h + 'px', 'z-index': '15'});
						my_obj.parent().find('.imapper-content-wrapper').css(my_transforms_prefix_new,'scale('+my_transform_coeff+')');
						
						
						my_obj.parent().find('.imapper-content').not('.imapper-content-additional').css({'top': my_i_top+'px', 'left': my_i_left+'px', 'width': my_i_w + 'px', 'height': my_i_h + 'px'});
						var my_h_1=my_obj.parent().find('.imapper-content .my_product_header').data('my-height');
						var my_h_2=my_obj.parent().find('.imapper-content .my_product_footer').data('my-height');
						my_h_1=parseInt(my_h_1);
						my_h_2=parseInt(my_h_2);
						my_admin_debug("My h 1",{my_h_1:my_h_1,my_h_2:my_h_2});
						var my_h_t=my_h_1+my_h_2;
						var my_h_t_2=my_i_h-my_h_t;
						var my_price_height_12345=my_obj.parent().find(".imapper-content .my_product_price").outerHeight();
						/**
						 * DEscription height
						 */
						var my_descr_h_123345=my_h_t_2-my_price_height_12345;
						my_obj.parent().find(".imapper-content .my_product_description").css('height',my_descr_h_123345+'px');
						
						my_obj.parent().find('.imapper-content .my_product_main').height(my_h_t_2);
						var my_w_1=my_i_w/2;
						my_admin_debug("Width of add view items",my_w_1);
						my_obj.parent().find(".imapper-content .my_product_footer .my_view_item_category div").attr('style','width:'+my_i_w+'px !important;');
						
						my_obj.parent().find(".imapper-content .my_product_footer .my_view_item div").attr('style','width:'+my_w_1+'px !important;');
						my_obj.parent().find(".imapper-content .my_product_footer .my_add_item div").attr('style','width:'+my_w_1+'px !important;');
						
						return true;
				
			};
			return false;
			};
			my_slide_show_quick_box=function(id,pinId,animat_durat,direction){
				
			};
			my_scale_show_quick_box=function(id,pinId,animat_durat){
				/**
				 * Finish animation
				 */
				
				/*var animat_dur=settings.animationDuration;
				animat_durat=5000;
				*/
				var my_id='#imapper'+id+'-pin'+pinId+'-content-wrapper';
				$(my_id).finish();
				var  my_image_height=$("#imapper"+id+"-pin"+pinId).outerHeight();
				var  my_image_width=$("#imapper"+id+"-pin"+pinId).outerWidth();
				//$(my_id).css('my_scale',1);
				$(my_id).show();
				$(my_id).css('visiblity','visible');
			
				$(my_id).find('.imapper-content').css('opacity',0);
				$(my_id).find('.imapper-content').show();
				$(my_id).find('.imapper-content').each(function(){this.my_scale=0.5;});
				var window_width=parseInt($(window).width());
				var my_position=$(my_id).data('my-new-position');
				my_admin_debug("Position",my_position);
				
				if(my_transform){
					/**
					 * REsponsive width transform
					 */
					if(window_width<settings.responsiveWidth){
						my_trans=my_transforms_prefix+'transform-origin';
						
						//my_trans=my_transforms_prefix+'transform';
						$(my_id).css(my_trans,'center center');
						$(my_id).find('.imapper-content').animate({
							my_scale:1,
							opacity:1
						},{
							step:function(now,fx){
								//fx.start=0;
								if(fx.prop=='my_scale'){
									//my_admin_debug("Now",now);
									my_trans=my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}
							}
						,duration:animat_durat});
					}else {
					my_trans=my_transforms_prefix+'transform-origin';
					var my_top_pos='';
					var my_right_pos='';
					if(my_position=='left'){
						//my_right_pos='0px';
						/*my_right_pos=20;
						var my_right_poc=my_right_pos-(my_image_width/2+5);//+my_right_pos;
						my_admin_debug("Right poc position",my_right_poc);
						
						$(my_id).find('.imapper-content').css('right',my_right_pos+'px');
						*/
						var my_right_pos;
						var my_right_c=$(my_id).offset().left;
						var my_right_i=$("#imapper"+id+"-pin"+pinId).offset().left;
						var my_diff=Math.abs(my_right_c-my_right_i);
						my_diff=my_image_width/2+18;
						
						my_admin_debug("Difference",{my_diff:my_diff,my_right_c:my_right_c,my_right_i:my_right_i});
						my_right_pos=parseFloat($(my_id).css('right'));
						//my_diff=Math.abs(my_right_pos)-10;
						$(my_id).data('my-right-pos',my_right_pos);
						var my_poc_pos=my_right_pos-my_diff;
						$(my_id).css('right',my_poc_pos+'px');
						
						
					//my_trans=my_transforms_prefix+'transform';
						$(my_id).find('.imapper-content').css(my_trans,'right center');
					}else if(my_position=='right'){
						/*my_right_pos=20;
						var my_right_poc=my_image_width/2+5+my_right_pos;
						my_admin_debug("Right poc position",my_right_poc);
						
						$(my_id).find('.imapper-content').css('right',my_right_poc+'px');
						*/
						var my_right_pos;
						var my_right_c=$(my_id).offset().left;
						var my_right_i=$("#imapper"+id+"-pin"+pinId).offset().left;
						var my_diff=Math.abs(my_right_c-my_right_i);
						//my_diff-=my_image_width/2;
						
						my_admin_debug("Difference",{my_diff:my_diff,my_left_c:my_right_c,my_right_i:my_right_i});
						
						my_right_pos=parseFloat($(my_id).css('right'));
						my_diff=Math.abs(my_right_pos)-10;
						$(my_id).data('my-right-pos',my_right_pos);
						var my_poc_pos=my_right_pos+my_diff;
						$(my_id).css('right',my_poc_pos+'px');
						
						$(my_id).find('.imapper-content').css(my_trans,'left center');
						
					}else if(my_position=='top'){
						/*var my_bottom=$(my_id).find('.imapper-content').css('bottom');
						my_bottom=20;
						//$(my_id).find('.imapper-content').data('my-old-bottom',my_bottom);
						
						var my_bottom_new=my_bottom-(my_image_height/2+5);
						$(my_id).find('.imapper-content').css('bottom',my_bottom_new+'px');
						*/
						var my_diff=my_image_height/2+18;
						var my_bottom=parseFloat($(my_id).css('bottom'));
						var my_bottom_new=my_bottom-my_diff;
						my_admin_debug("Bottom",{my_diff:my_diff,my_bottom:my_bottom,my_bottom_new:my_bottom_new});
						
						$(my_id).data('my-new-bottom',my_bottom);
						$(my_id).css('bottom',my_bottom_new+'px');
						
						$(my_id).find('.imapper-content').css(my_trans,'center bottom');
						
					}else if(my_position=='bottom'){
						/*var my_bottom=$(my_id).find('.imapper-content').css('top');
						var my_bottom_new;
						my_bottom=20;
						my_bottom_new=my_bottom+(my_image_height/2+5);
						*/
						//$(my_id).find('.imapper-content').data('my-old-bottom',my_bottom);
						//my_bottom=parseFloat(my_bottom);
						//var my_bottom_new=my_bottom+20;
						//$(my_id).find('.imapper-content').css('bottom',my_bottom_new+'px');
						var my_diff=my_image_height/2+18;
						var my_bottom=parseFloat($(my_id).css('bottom'));
						var my_bottom_new=my_bottom+my_diff;
						my_admin_debug("Bottom",{my_diff:my_diff,my_bottom:my_bottom,my_bottom_new:my_bottom_new});
						
						$(my_id).data('my-new-bottom',my_bottom);
						$(my_id).css('bottom',my_bottom_new+'px');
						
						$(my_id).find('.imapper-content').css(my_trans,'center top');
						
					}
					if((my_position=='left')||(my_position=='right')){
					$(my_id).animate({
						right:my_right_pos
					},{duration:animat_durat,
					complete:function(){
						var right=$(this).data('my-right-pos');
						$(this).css('right',right+'px');
						my_admin_debug("Show quick box Right",right);
						
						/*var right=$(this).css('right');
						my_admin_debug("Show quick box Right",right);
						$(this).css('right','');
						right=$(this).css('right');
						my_admin_debug("Show quick box after Right",right);
						*/
						
					}
					});
					$(my_id).find('.imapper-content').animate({
						my_scale:1,
						opacity:1
						/*right:my_right_pos*/
					},{
						step:function(now,fx){
							//fx.start=0;
							if(fx.prop=='my_scale'){
								//my_admin_debug("Now",now);
								my_trans=my_transforms_prefix+'transform';
								$(this).css(my_trans,'scale('+now+')');	
							}
						}
					,duration:animat_durat,
					complete:function(){
						var right=$(this).css('right');
						my_admin_debug("Show quick box Right",right);
						$(this).css('right','');
						right=$(this).css('right');
						my_admin_debug("Show quick box after Right",right);
						
						
					}
					});
					
					}else {
						$(my_id).animate({
							bottom:my_bottom
						},{duration:animat_durat,
						complete:function(){
							var right=$(this).data('my-new-bottom');
							$(this).css('bottom',right+'px');
							my_admin_debug("Show quick box Bottom",right);
							
							/*var right=$(this).css('right');
							my_admin_debug("Show quick box Right",right);
							$(this).css('right','');
							right=$(this).css('right');
							my_admin_debug("Show quick box after Right",right);
							*/
							
						}
						});
						$(my_id).find('.imapper-content').animate({
							my_scale:1,
							opacity:1,
							/*bottom:my_bottom*/
						},{
							step:function(now,fx){
								//fx.start=0;
								if(fx.prop=='my_scale'){
									//my_admin_debug("Now",now);
									my_trans=my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}
							}
						,duration:animat_durat,
						complete:function(){
							var top=$(this).css('bottom');
							my_admin_debug("Show quick box Bottom",top);
							//var old_top=$(this).data('my-old-bottom');
							$(this).css('bottom','');
							top=$(this).css('bottom');
							my_admin_debug("Show quick box Bottom after ",top);
							
						
						}
						});
					
					}
				}
				}
				//$(my_id).show('scale',{direction:"both",origin:["middle","center"]},animat_durat);
				/*$(my_id).find('.imapper-content').show('scale',{direction:"both",origin:["middle","center"]},animat_durat);
				//$(my_id).find('.immaper-content .my-imapper-arrow-new-1234').show('scale',{direction:"both",origin:["middle","center"]},animat_durat);
				$(my_id).find('.immaper-content .my-imapper-arrow-new-1234').animate({
					
				},animat_durat);
				*/
			};
			my_scale_hide_quick_box=function(id,pinId,animat_durat){
				/*var animat_dur=settings.animationDuration;
				animat_durat=5000;
				*/
				var my_id='#imapper'+id+'-pin'+pinId+'-content-wrapper';
				$(my_id).finish();
				var  my_image_height=$("#imapper"+id+"-pin"+pinId).outerHeight();
				var  my_image_width=$("#imapper"+id+"-pin"+pinId).outerWidth();
				
				//$(my_id).css('my_scale',1);
				$(my_id).find('.imapper-content').each(function(){this.my_scale=1;});
				$(my_id).find('.imapper-content').css('opacity',1);
				//$(my_id).show();
				//$(my_id).each(function(){this.my_scale=1;});
				//$(my_id).find('.imapper-content').hide('scale',{direction:"both",origin:["middle","center"]},animat_durat);
				//$(my_id).find('.immaper-content .my-imapper-arrow-new-1234').hide('scale',{direction:"both",origin:["middle","center"]},animat_durat);
				my_dont_set=0;
				var window_width=parseInt($(window).width());
				var my_position=$(my_id).data('my-new-position');
				my_admin_debug("Position",my_position);
				
				if(my_transform){
					if(window_width<settings.responsiveWidth){
						my_trans=my_transforms_prefix+'transform-origin';
						
						//my_trans=my_transforms_prefix+'transform';
						$(my_id).css(my_trans,'center center');
						$(my_id).find('.imapper-content').animate({
							my_scale:0.5,
							opacity:0
						},{
							step:function(now,fx){
								if(fx.prop=='my_scale'){
									//my_admin_debug("Now",now);
									my_trans=my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}
							}
						,duration:animat_durat,
						complete:function(){
							$(this).hide();
							$(this).parent('.imapper-content-wrapper').hide();
							$(this).css('opacity','1');
						}
						});
					}else {
					
						my_trans=my_transforms_prefix+'transform-origin';
					//var my_right_pos='';
					//var my_top_pos='';
						var my_top_pos='';
						var my_right_pos='';
					if(my_position=='left'){
							/*my_rigth_pos=20-(my_image_width/2+5);
							//$(my_id).find('.imapper-content').css('right','0px');
						//my_trans=my_transforms_prefix+'transform';
							$(my_id).find('.imapper-content').css('right','20px');
							*/
							var my_right_pos;
							var my_right_c=$(my_id).offset().left;
							var my_right_i=$("#imapper"+id+"-pin"+pinId).offset().left;
							var my_diff=Math.abs(my_right_c-my_right_i);
							//my_diff-=my_image_width/2
							my_admin_debug("Difference",{my_diff:my_diff,my_right_c:my_right_c,my_right_i:my_right_i});
							my_right_pos=parseFloat($(my_id).css('right'));
							my_diff=my_image_width/2+18;
							$(my_id).data('my-right-pos',my_right_pos);
							var my_poc_pos=my_right_pos-my_diff;
							//$(my_id).css('right',my_poc_pos+'px');
						
							$(my_id).find('.imapper-content').css(my_trans,'right center');
						}else if(my_position=='right'){
							//my_right_pos=20+(my_image_width/2+5);;
							//$(my_id).find('.imapper-content').css('right','20px');
							var my_right_pos;
							var my_right_c=$(my_id).offset().left;
							var my_right_i=$("#imapper"+id+"-pin"+pinId).offset().left;
							var my_diff=Math.abs(my_right_c-my_right_i);
							//my_diff-=my_image_width/2
							my_admin_debug("Difference",{my_diff:my_diff,my_right_c:my_right_c,my_right_i:my_right_i});
							my_right_pos=parseFloat($(my_id).css('right'));
							my_diff=Math.abs(my_right_pos)-10;
							$(my_id).data('my-right-pos',my_right_pos);
							var my_poc_pos=my_right_pos+my_diff;
							$(my_id).find('.imapper-content').css(my_trans,'left center');
							
						}else if(my_position=='top'){
							/*var my_bottom=20-(my_image_height/2+5);
							
							$(my_id).find('.imapper-content').css('bottom',20+'px');
							*/
							var my_diff=my_image_height/2+18;
							var my_bottom=parseFloat($(my_id).css('bottom'));
							var my_bottom_new=my_bottom-my_diff;
							my_admin_debug("Bottom",{my_bottom:my_bottom,my_bottom_new:my_bottom_new});
							
							//$(my_id).data('my-new-bottom',my_bottom);
							//$(my_id).css('bottom',bottom_new+'px');
							
							$(my_id).find('.imapper-content').css(my_trans,'center bottom');
							
						}else if(my_position=='bottom'){
							/*var my_bottom=20+(my_image_height/2+5);
							$(my_id).find('.imapper-content').css('bottom',20+'px');
							*/
							var my_diff=my_image_height/2+18;
							var my_bottom=parseFloat($(my_id).css('bottom'));
							var my_bottom_new=my_bottom+my_diff;
							my_admin_debug("Bottom",{my_bottom:my_bottom,my_bottom_new:my_bottom_new});
							
							$(my_id).data('my-new-bottom',my_bottom);
							//$(my_id).css('bottom',bottom_new+'px');
							
							$(my_id).find('.imapper-content').css(my_trans,'center top');
							
						}
					if(my_position=='left' || my_position=='right'){
						$(my_id).animate({
							right:my_poc_pos
						},{duration:animat_durat,
						complete:function(){
							var right=$(this).data('my-right-pos');
							$(this).css('right',right+'px');
							my_admin_debug("Show quick box Right",right);
							
							/*var right=$(this).css('right');
							my_admin_debug("Show quick box Right",right);
							$(this).css('right','');
							right=$(this).css('right');
							my_admin_debug("Show quick box after Right",right);
							*/
							
						}
						});
					$(my_id).find('.imapper-content').animate({
						my_scale:0.5,
						opacity:0,
						/*right:my_right_pos*/
					},{
						step:function(now,fx){
							//fx.start=1;
							if(fx.prop=='my_scale'&&my_dont_set){
								//my_admin_debug("Now",now);
								my_trans=my_transforms_prefix+'transform';
								$(this).css(my_trans,'scale('+now+')');	
							}
							my_dont_set=1;
						}
					,duration:animat_durat,
					complete:function(){
						var my_r=$(this).css('right');
						my_admin_debug("Hide quick box Right",my_r);
						$(this).css('right','');
						my_r=$(this).css('right');
						my_admin_debug("Hide quick box Right After",my_r);
						
						$(this).hide();
						$(this).parent('.imapper-content-wrapper').hide();
						$(this).css('opacity','1');
					}
					});
					}else {
						$(my_id).animate({
							bottom:my_bottom_new
						},{duration:animat_durat,
						complete:function(){
							var right=$(this).data('my-new-bottom');
							$(this).css('bottom',right+'px');
							my_admin_debug("Show quick box Bottom",right);
							
							/*var right=$(this).css('right');
							my_admin_debug("Show quick box Right",right);
							$(this).css('right','');
							right=$(this).css('right');
							my_admin_debug("Show quick box after Right",right);
							*/
							
						}
						});
						$(my_id).find('.imapper-content').animate({
							my_scale:0.5,
							opacity:0,
							/*bottom:my_bottom*/
						},{
							step:function(now,fx){
								//fx.start=1;
								if(fx.prop=='my_scale'&&my_dont_set){
									//my_admin_debug("Now",now);
									my_trans=my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}
								my_dont_set=1;
							}
						,duration:animat_durat,
						complete:function(){
							var my_r=$(this).css('bottom');
							my_admin_debug("Hide quick box Bottom",my_r);
							$(this).css('bottom','');
							my_r=$(this).css('bottom');
							my_admin_debug("Hide quick box Bottom After",my_r);
							$(this).hide();
							$(this).parent('.imapper-content-wrapper').hide();
							$(this).css('opacity','1');
						}
						});
						
					
					}
				}
				}
			};
			/**
			 * Slide hover button
			 */
			my_scale_show_hover=function(id,pinId,animat_durat){
				
				var my_id="#imapper"+id+"-pin"+pinId+"-my-content-wrapper"
				$(my_id).show();
				$(my_id).find(".my_hover_inner_1234").finish();
				var  my_image_height=$("#imapper"+id+"-pin"+pinId).outerHeight();
				var  my_image_width=$("#imapper"+id+"-pin"+pinId).outerWidth();
				
				$(my_id).each(function(){this.my_scale=0.5;});
				if(my_transform){
					my_trans=my_transforms_prefix+'transform-origin';
					$(my_id).find('.my_hover_inner_1234').css(my_trans,'center bottom');
					$(my_id).find('.my_hover_inner_1234').css('opacity',0);
					$(my_id).find('.my_hover_inner_1234').each(function(){this.my_scale=0.5;});
					var my_top_off=$(my_id).offset().top+12;
					var my_pin_off=$("#imapper"+id+"-pin"+pinId).offset().top;
					var my_height=$("#imapper"+id+"-pin"+pinId).outerHeight();
					my_pin_off-=my_height;
					var diff=my_top_off-my_pin_off;
					diff=my_image_height/2+12;
					//var my_top_pre=
					my_admin_debug("Diff",{diff:diff,my_top_css:my_top_css});
					var my_top_css=parseFloat($(my_id).css('top'));
					var my_top_css_1;
					my_top_css_1=my_top_css+diff;
					$(my_id).data('my-top-css',my_top_css);
					$(my_id).css('top',my_top_css_1+'px');
					my_admin_debug("New position",{diff:diff,my_top_css:my_top_css,my_tops_css_1:my_top_css_1});
					$(my_id).animate({
						top:my_top_css
					},{duration:animat_durat,
					complete:function(){
						
						var my_top=$(this).data('my-top-css');
						$(this).css('top',my_top+'px');
						$(my_id).css('z-index',120);
					}
					});
					$(my_id).find(".my_hover_inner_1234").animate({
						my_scale:1,
						opacity:1,
						/*top:my_top_css*/
					},{
						step:function(now,fx){
							
							if(fx.prop=='my_scale'){
								//fx.start=0.5;
								//	my_admin_debug("Now",now);
								my_trans=my_transforms_prefix+'transform';
								$(this).css(my_trans,'scale('+now+')');	
							}
						}
					,duration:animat_durat});
				}
				/*var animat_dur=settings.animationDuration;
				animat_durat=5000;
				var my_height=$(my_id).height();
				var my_width=$(my_id).width();
				my_h=parseInt(my_height)+20;
				//$(my_id).css('height',my_h+'px');
				$(my_id).show('scale',{direction:"both",origin:["middle","center"]},animat_durat);//,settings.animationDuration);
				var my_enable_shadow=$(my_id).data('my-enable-shadow');
				//if(my_enable_shadow==1){
					var my_shadow_width=parseInt($(my_id).data('my-shadow-width'));
					
					$(my_id).parent(" .ui-effects-wrapper").css('padding-top',my_shadow_width+'px');
					$(my_id).parent(" .ui-effects-wrapper").css('padding-left',my_shadow_width+'px');
					
					$(my_id).parent(" .ui-effects-wrapper").css('margin-top','-'+my_shadow_width+'px');
					$(my_id).parent(" .ui-effects-wrapper").css('margin-left','-'+my_shadow_width+'px');
					//$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
					$(my_id).parent(" .ui-effects-wrapper").height(+my_height+'px');
					
				/*}else {
				
				}*/
				
			};
			my_scale_hide_hover=function(id,pinId,animat_durat){
				var my_id="#imapper"+id+"-pin"+pinId+"-my-content-wrapper"
				var  my_image_height=$("#imapper"+id+"-pin"+pinId).outerHeight();
				var  my_image_width=$("#imapper"+id+"-pin"+pinId).outerWidth();
				$(my_id).find('.my_hover_inner_1234').finish();
				$(my_id).css('z-index',12);
				//$(my_id).css('my_scale_new',1);
				if(my_transform){
					my_trans=my_transforms_prefix+'transform';
					my_trans=my_transforms_prefix+'transform-origin';
					$(my_id).find('.my_hover_inner_1234').css(my_trans,'center bottom');
					$(my_id).find('.my_hover_inner_1234').each(function(){this.my_scale=1;});
					//$(my_id).css('opacity',0);
					var my_top_off=$(my_id).offset().top+12;
					var my_pin_off=$("#imapper"+id+"-pin"+pinId).offset().top;
					var my_height=$("#imapper"+id+"-pin"+pinId).outerHeight();
					my_pin_off-=my_height;
					var diff=my_top_off-my_pin_off;
					diff=my_image_height/2+12;
					
					//var my_top_pre=
					my_admin_debug("Diff",{diff:diff,my_top_css:my_top_css});
					var my_top_css=parseFloat($(my_id).css('top'));
					var my_top_css_1;
					my_top_css_1=my_top_css+diff;
					//$(my_id).css('top',my_top_css_1+'px');
					$(my_id).data('my-top-css',my_top_css);
					my_admin_debug("New position",{diff:diff,my_top_css:my_top_css,my_tops_css_1:my_top_css_1});
					$(my_id).animate({
						top:my_top_css_1
					},{duration:animat_durat,
					complete:function(){
						$(this).hide();
						var my_top=$(this).data('my-top-css');
						$(this).css('top',my_top+'px');
						
					}
					})
					$(my_id).find('.my_hover_inner_1234').animate({
						my_scale:0.5,
						opacity:0,
						/*top:my_top_css_1*/
					},{
						step:function(now,fx){
							
							if(fx.prop=='my_scale'){
								//fx.start=1;
								//my_admin_debug("Now",now);
								my_trans=my_transforms_prefix+'transform';
								$(this).css(my_trans,'scale('+now+')');	
							}
						}
					,duration:animat_durat,
					complete:function(){
						var my_top=$(this).data('my-top-css');
						my_admin_debug("Change top anim",my_top);
						$(this).css('top',my_top+'px');
						
					}
					}
					);
				}
				/*var animat_dur=settings.animationDuration;
				animat_durat=5000;
				var my_height=$(my_id).height();
				var my_width=$(my_id).width();
				my_h=parseInt(my_height)+20;
				//$(my_id).css('height',my_h+'px');
				$(my_id).show('scale',{direction:"both",origin:["middle","center"]},animat_durat);//,settings.animationDuration);
				var my_enable_shadow=$(my_id).data('my-enable-shadow');
				//if(my_enable_shadow==1){
					var my_shadow_width=parseInt($(my_id).data('my-shadow-width'));
					
					$(my_id).parent(" .ui-effects-wrapper").css('padding-top',my_shadow_width+'px');
					$(my_id).parent(" .ui-effects-wrapper").css('padding-left',my_shadow_width+'px');
					
					$(my_id).parent(" .ui-effects-wrapper").css('margin-top','-'+my_shadow_width+'px');
					$(my_id).parent(" .ui-effects-wrapper").css('margin-left','-'+my_shadow_width+'px');
					//$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
					$(my_id).parent(" .ui-effects-wrapper").height(+my_height+'px');
					
				/*}else {
				
				}*/
				
			};
			/**
			 * Get content position
			 */
			my_get_content_position=function(id,obj,pos){
				//return pos;
				var my_pin_id=$(obj).parent(".imapper-pin-wrapper").data('pin-id');
				var my_width=parseInt($(obj).data('width'));
				var my_height=parseInt($(obj).data('height'));
				var img_width = $(obj).parent().find('.imapper' + id + '-pin').outerWidth();
				var img_height = $(obj).parent().find('.imapper' + id + '-pin').outerHeight();
				var borderColor = $(obj).data('border-color');
				
				var my_check_pos=['right','left','top','bottom'];
				var my_left=$(obj).offset().left;
				var my_window_width=parseInt($(window).width());
				var my_left=$(obj).parent(".imapper-pin-wrapper").offset().left;
				var my_top=$(obj).parent(".imapper-pin-wrapper").offset().top;
				/*chnages #sliders
				 * slider options
				 */
				if(typeof $("#imagemapper"+id+"-wrapper").data('my-slider')!='undefined'){
					var pos=$("#imagemapper"+id+"-wrapper").parent(".my_fotorama_item").css('position');
					if((typeof pos!='undefined')&&(pos=='absolute')){
						/*if(window.console){
							console.log("**Change position is slider ** immaper"+id,{my_left:my_left,my_top:my_top});
						}*/
					my_left+=10000;
					my_top+=10000;
					var ww=$("#imagemapper"+id+"-wrapper").width();
					var par=$("#imagemapper"+id+"-wrapper").parents(".my_fotorama_outter").width();
					if(ww<par){
						my_left+=(par-ww)/2;
					}
					/*if(window.console){
						console.log("**Change position is slider **",{my_left:my_left,my_top:my_top});
					}*/
					}else {
						/*if(window.console){
							console.log("**Current immaper** immaper"+id,{my_left:my_left,my_top:my_top});
						}*/
					}
				}
				
				/*
				 * dn
				 */
				/**
				 * 
				 */
				//var my_img_width=$("imapper"+id+"-map-image")
				my_admin_debug("Position "+id+" pin id "+my_pin_id,{left:my_left,top:my_top});
				var my_check_pos_new=[pos];
				$.each(my_check_pos,function(i,v){
					if(v!=pos)my_check_pos_new[my_check_pos_new.length]=v;
				});
				my_admin_debug("Check pos new",my_check_pos_new);
				var my_pos,my_found=false;
				var my_add_width=20;
				var my_add_height=20;
				var my_bottom_pos=$(document).height();
				my_admin_debug("Window positions",{width:my_window_width,bottom:my_bottom_pos})
				$.each(my_check_pos_new,function(i,v){
					my_pos=v;
					my_admin_debug("Checking position",v);
					if(v=='right'){
						/*$(obj).find('.imapper-content').css('position', 'absolute');
						$(obj).find('.imapper-content').css('right', '0px');
						$(obj).css('width', width + 'px');
						$(obj).css('height', height + img_height/4 + 35 + 'px');
						$(obj).css('right', width/2 + 'px');
						$(obj).css('bottom', height + img_height + 40 + 'px');
						*/
						var my_content_width=my_width +my_add_width ;
						var my_content_height=(my_height+my_add_height)/2;
						var my_right=0;
						var my_right_pos=my_left+my_content_width-my_right+img_width/2;
						var my_top_pos=my_top-my_content_height;
						var my_bott_pos=my_top+my_content_height;
						
						my_admin_debug("Position",{my_right_pos:my_right_pos,my_width_cont:my_content_width});
						if(my_bottom_pos<my_bott_pos){
							my_admin_debug("Try oder position my_bott_pos="+my_bott_pos,{right:my_right_pos,top:my_top_pos});
							
						}
						else if(my_right_pos>my_window_width){
							my_admin_debug("Try oder position my_right_pos="+my_right_pos,{right:my_right_pos,top:my_top_pos});
						
						}else if(my_top_pos<0){
							my_admin_debug("Try other position my_top_pos="+my_top_pos,{right:my_right_pos,top:my_top_pos});
							
						}else {
							my_found=true;
							return false;
						}
						
					}else if(v=='left'){
						var my_content_width=my_width + my_add_width;
						var my_content_height=(my_height+my_add_height)/2;
						var my_right=0;
						var my_right_pos=my_left-my_content_width-my_right-img_width/2;
						var my_top_pos=my_top-my_content_height;
						my_admin_debug("Position",{my_right_pos:my_right_pos,my_width_cont:my_content_width});
						var my_bott_pos=my_top+my_content_height;
						
						//my_admin_debug("Position",{my_right_pos:my_right_pos,my_width_cont:my_content_width});
						if(my_bottom_pos<my_bott_pos){
							my_admin_debug("Try oder position my_bott_pos="+my_bott_pos,{right:my_right_pos,top:my_top_pos});
							
						}
						else if(my_right_pos<0){
							my_admin_debug("Try other position right",{my_right:my_right_pos,my_top:my_top_pos});
						
						}else if(my_top_pos<0){
							my_admin_debug("Try other position top",{my_right:my_right_pos,my_top:my_top_pos});
							
						}else {
							my_found=true;
							return false;
						}
					}else if(v=='top'){
						
						//var my_scroll_Top=$(window).scrollTop();
						//var my_def=Math.abs(my_top-my_scrollTop);
						var my_content_width=my_add_width+(my_width)/2;
						var my_content_height=my_height + my_add_width+img_height/2;
						var my_right=0;
						var my_top_pos=my_top-my_content_height;
						var my_right_pos=my_left+my_content_width;
						var my_left_pos=my_left-my_content_width;
						
						my_admin_debug("Position",{my_top_pos:my_top_pos,my_height_cont:my_content_height});
						if(my_top_pos<0){
							my_admin_debug("Try other position my_top_pos"+my_top_pos,{my_right:my_right_pos,my_top:my_top_pos});
						
						}else if(my_window_width<my_right_pos){
							my_admin_debug("Try other position my_right_pos"+my_right_pos,{my_right:my_right_pos,my_top:my_top_pos});
							
						
						}else if(my_left_pos<0){
							my_admin_debug("Try other position my_left_pos"+my_left_pos,{my_right:my_right_pos,my_top:my_top_pos});
							
						
						}else {
							my_found=true;
							return false;
						}
					}else if(v=='bottom'){
						var my_content_width=(my_width)/2 + my_add_width;
						var my_content_height=my_height + my_add_width+img_height/2;
						var my_right=0;
						var my_top_pos=my_top+my_content_height;
						var my_right_pos=my_left+my_content_width;
						var my_left_pos=my_left-my_content_width;
						
						my_admin_debug("Position",{my_top_pos:my_top_pos,my_height_cont:my_content_height});
						if(my_left_pos<0){
							my_admin_debug("Try other position my_left_pos"+my_left_pos,{my_right:my_right_pos,my_top:my_top_pos});
							
						}
						else if(my_top_pos>my_bottom_pos){
							my_admin_debug("Try other position my_top_pos"+my_top_pos,{my_right:my_right_pos,my_top:my_top_pos});
						
						}else if(my_window_width<my_right_pos){
							my_admin_debug("Try other position my_right_pos"+my_right_pos,{my_right:my_right_pos,my_top:my_top_pos});
							
						
						}else {
							my_found=true;
							return false;
						}
						//return false;
					}
				});
				if(my_found){
					$(obj).data('my-new-position',my_pos);
					return my_pos;
				}else {
					$(obj).data('my-new-position',pos);
					return pos;
				
				}
			};
			my_imapper_content_position_function=function(id){
			$('.imapper' + id + '-pin-content-wrapper').each(function(i,v) {
				var position = $(this).parent().data('open-position');
				var width=parseInt($(this).data('width'));
				var height=parseInt($(this).data('height'));
				
				/**
				 * Bilo je height i width promenjeno
				 * za width i height
				 */
				var img_width = $(this).parent().find('.imapper' + id + '-pin').outerWidth();
				var img_height = $(this).parent().find('.imapper' + id + '-pin').outerHeight();
				var borderColor = $(this).data('border-color');
				//$(this).find('imapper-content').data('my-enable-shadow');
				var my_get_position=my_get_content_position(id,this,position);
				position=my_get_position;
				var my_hide=[];
				if(position=='right'){
					my_hide=['imapper-arrow-new-right','imapper-arrow-new-top','imapper-arrow-new-bottom'];
					//$(this).find(".imapper-content .imapper-arrow-new-right").hide();
					//$(this).find(".imapper-content .imapper-arrow-new-right").hide();
					
				}else if(position=='left'){
					my_hide=['imapper-arrow-new','imapper-arrow-new-top','imapper-arrow-new-bottom'];
					
				}else if(position=='top'){
					my_hide=['imapper-arrow-new-right','imapper-arrow-new','imapper-arrow-new-top'];
					
				}else if(position=='bottom'){
					my_hide=['imapper-arrow-new-right','imapper-arrow-new-bottom','imapper-arrow-new'];
					
				}
				var my_obj=$(this);
				$.each(my_hide,function(i,v){
					my_obj.find(".imapper-content ."+v).hide();
				});
				my_admin_debug("Position",position);
				/**
				 * Hide old wrapper
				 * 
				 */
				$(this).find(".imapper-arrow").hide();
				$(this).find(".imapper-arrow-border").hide();
				/**
				 * Hide new wcontent and all elements
				 */
				$(v).find(".imapper-content").css('display','none');
				$(v).css('display','none');
				/**
				 * new functions of position
				 */
				var my_width=width+20;
				var my_height=height+20;
				if(position=='top'){
					var my_right=my_width/2+img_width/2-3;
					var my_bottom=my_height+img_height/2;
					my_bottom+=8;
					my_right-=20;
					$(this).find('.imapper-content').css('position', 'absolute');
					/**
					 * Change position 
					 * bilo je ovo *
					$(this).find('.imapper-content').css('right', '0px');
					*/
					//$(this).find('.imapper-content').css('left', '0px');
					
					$(this).css('width', my_width + 'px');
					$(this).css('height', my_height+'px');
					$(this).css('right',  my_right+ 'px');
					$(this).css('bottom', my_bottom + 'px');
					
					
				}else if(position=='bottom'){
					var my_right=my_width/2+img_width/2-3;//bilo je -2
					var my_bottom=-(img_height/2+20);
					my_bottom-=8;
					my_right-=20;
					$(this).find('.imapper-content').css('position', 'absolute');
					/* Bilo je right 0
					$(this).find('.imapper-content').css('right', '0px');
					*/
					$(this).css('width', my_width + 'px');
					$(this).css('height', my_height+'px');
					$(this).css('right', my_right + 'px');
					$(this).css('bottom', my_bottom+ 'px');
				
				}else if(position=='right'){
					var my_right=-17;
					/**
					 * Promena 20 px od posizije
					 */
					my_right=-(img_width/2);
					my_right-=28;
					var my_bottom=height/2+2;
					$(this).find('.imapper-content').css('position', 'absolute');
					/*Bilo je right 0
					$(this).find('.imapper-content').css('right', '0px');
					*/
					$(this).css('width', my_width + 'px');
					$(this).css('height', my_height+'px');
					$(this).css('right', my_right + 'px');
					//$(this).css('bottom', height/2+img_height/2 + 'px');
					$(this).css('bottom', my_bottom + 'px');
					
				
				
				}else if(position=='left'){
					var my_right=my_width+img_width/2+20;
					my_right+=7;//
					my_right-=20;
					var my_bottom=height/2+2;
					$(this).find('.imapper-content').css('position', 'absolute');
					/*Bilo je right 0
					$(this).find('.imapper-content').css('right', '0px');
					*/
					$(this).css('width', my_width + 'px');
					$(this).css('height', my_height+'px');
					$(this).css('right', my_right + 'px');
					//$(this).css('bottom', height/2+img_height/2 + 'px');
					$(this).css('bottom', my_bottom+ 'px');
				}
				return;
				if (!($(this).siblings('.imapper' + id + '-pin').hasClass(pinType2)))
				{
					if (position == 'top') 
					{	
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('right', '0px');
						
						$(this).find('.arrow-top-border').css('top', height + 1 + 'px');
						$(this).find('.arrow-top-border').css('left', width/2 - 11 + 'px');
						$(this).find('.arrow-top-border').css('border-top-color', borderColor);
					
						$(this).css('width', width + 'px');
						$(this).css('height', height + img_height/4 + 35 + 'px');
						$(this).css('right', width/2 + 'px');
						$(this).css('bottom', height + img_height + 40 + 'px');
						
						if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
						{
							$(this).css('right', width/2 - 4 + 'px');
							$(this).css('bottom', height + 50 + 'px');
						}
						else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
						$(this).css('bottom', height + img_height + 20 + 'px');
							
						$(this).find('.imapper-arrow').addClass('arrow-down');
						$(this).find('.imapper-arrow').css('top', height + 'px');
					}
					else if (position == 'bottom')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('bottom', '0px');
						$(this).find('.imapper-content').css('right', '0px');
						
						$(this).find('.arrow-bottom-border').css('top', img_height/4 + 24 + 'px');
						$(this).find('.arrow-bottom-border').css('left', width/2 - 11 + 'px');
						$(this).find('.arrow-bottom-border').css('border-bottom-color', borderColor);
								
						$(this).css('width', width + 'px');
						$(this).css('height', height + img_height/4 + 40 + 'px');
						$(this).css('right', width/2 + 'px');
						$(this).css('bottom', img_height/4 - 5 + 'px');
						
						if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
						{
							$(this).css('right', width/2 - 4 + 'px');
							$(this).css('bottom', '0px');
						}
						else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
							$(this).css('bottom', img_height/4 - 10 + 'px');
								
						$(this).find('.imapper-arrow').addClass('arrow-up');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
						$(this).find('.imapper-arrow').css('border-bottom-color', color);
						$(this).find('.imapper-arrow').css('top', img_height/4 + 25 + 'px');
					}
					else if (position == 'right')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('right', '0px');
						$(this).find('.imapper-content').css('bottom', '0px');
						
						$(this).find('.arrow-right-border').css('top', height/2 - 11 + 'px');
						$(this).find('.arrow-right-border').css('left', img_width/4 + 24 + 'px');
						$(this).find('.arrow-right-border').css('border-right-color', borderColor);
						
						$(this).css('width', width + img_width/4 + 40 + 'px');
						$(this).css('height', height + 'px');
						$(this).css('right', '-15px');
						$(this).css('bottom', height/2 + img_height/2 + 'px');
						
						if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
						{
							$(this).css('right', '0px');
							$(this).css('bottom', height/2 + 10 + 'px');
						}
						else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
							$(this).css('right', '-10px');
						
						$(this).find('.imapper-arrow').addClass('arrow-left');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
						$(this).find('.imapper-arrow').css('border-right-color', color);
						$(this).find('.imapper-arrow').css('top', height/2 - 10 + 'px');
						$(this).find('.imapper-arrow').css('left', img_width/4 + 25 + 'px');
					}
					else if (position == 'left')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('bottom', '0px');
						
						$(this).find('.arrow-left-border').css('top', height/2 - 11 + 'px');
						$(this).find('.arrow-left-border').css('left', width + 'px');
						$(this).find('.arrow-left-border').css('border-left-color', borderColor);
						
						$(this).css('width', width + img_width/4 + 40 + 'px');
						$(this).css('height', height + 'px');
						$(this).css('right', width + img_width - 2 + 'px');
						$(this).css('bottom', height/2 + img_height/2 + 'px');
						
						if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
						{
							$(this).css('right', width + 44 + 'px');
							$(this).css('bottom', height/2 + 10 + 'px');
						}
						else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
							$(this).css('right', width + img_width - 12 + 'px');
						
						$(this).find('.imapper-arrow').addClass('arrow-right');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
						$(this).find('.imapper-arrow').css('border-left-color', color);
						$(this).find('.imapper-arrow').css('top', height/2 - 10 + 'px');
						$(this).find('.imapper-arrow').css('left', width + 'px');
					}
				}//not pinType1
				else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType2))
				{
					$(this).find('.imapper-content-header').css('padding', '0px 10px 0px 10px');
					if (position == 'right')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('left', '19px');
						$(this).find('.imapper-content').css('border-top-left-radius', '0px');
						$(this).find('.imapper-content').css('border-bottom-left-radius', '0px');
						$(this).find('.imapper-content').css('border-left', 'none');
						
						$(this).css('width', width + 20 + 'px');
						$(this).css('height', height + 'px');
						$(this).css('right', '-2px');
						$(this).css('bottom', '75px');
						
						$(this).find('.imapper-content').css('width', '0px');
						
						$(this).find('.triangle-right-border').css('border-top-color', borderColor);
						$(this).find('.triangle-right-border').css('border-bottom-color', borderColor);
						
						$(this).find('.imapper-arrow').addClass('triangle-right');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-bottom-color', color);
						$(this).find('.imapper-arrow').css('position', 'absolute');
						$(this).find('.imapper-arrow').css('top', '1px');
					}
					else if (position == 'left')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('left', '0px');
						$(this).find('.imapper-content').css('border-top-right-radius', '0px');
						$(this).find('.imapper-content').css('border-bottom-right-radius', '0px');
						$(this).find('.imapper-content').css('border-right', 'none');
						
						$(this).find('.imapper-content').css('width', '0px');
						$(this).find('.imapper-content').css('margin-left', width + 'px');
						
						$(this).find('.triangle-left-border').css('border-top-color', borderColor);
						$(this).find('.triangle-left-border').css('border-bottom-color', borderColor);
						
						$(this).css('width', width + 20 + 'px');
						$(this).css('height', height + 'px');
						$(this).css('right', width + 18 + 'px');
						$(this).css('bottom', '75px');
						
						$(this).find('.imapper-arrow').addClass('triangle-left');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-bottom-color', color);
						$(this).find('.imapper-arrow').css('position', 'absolute');
						$(this).find('.imapper-arrow').css('right', '0px');
						$(this).find('.imapper-arrow').css('top', '1px');
					}
				}//pinType2
				
				if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType1))
				{
					
					var radius = (parseInt($(this).find('.imapper-content').css('border-top-left-radius')) / 2 + 1);
					var zindextab = 100;
					
					if (position == 'left' || position == 'right')
					{
						var bottom = parseInt($(this).css('height')) + 25 - radius;
						var bottom_tab = parseInt($(this).css('height'));
						
						$(this).find('.imapper-content-additional').each(function() {
							$(this).css('height', '0px');
							$(this).find('.imapper-content-inner').css('display', 'none');
						    $(this).css('bottom', bottom + 'px');
						    bottom += 25 - radius;

						});
						
						$(this).find('.imapper-content-tab').each(function(index) {
							$(this).css('height', '25px');	
							$(this).css('width', width + 'px');
							
							
							$(this).css('border-top-left-radius', $(this).siblings('.imapper-content').css('border-top-left-radius'));	
							$(this).css('border-top-right-radius', $(this).siblings('.imapper-content').css('border-top-right-radius'));
							$(this).css('border-style', 'solid');
							$(this).css('border-width', '1px 1px 0 1px');
							$(this).css('border-color', borderColor);
							
							$(this).find('a').css('padding', '0 0 0 10px');
							
							if (position == 'right')
								$(this).css('right', '0px');
								
							$(this).css('bottom', bottom_tab + 'px');
							bottom_tab += 25 - radius;
							
							$(this).css('z-index', zindextab);
							zindextab--;
						});
						
						$(this).find('.imapper-content').each(function(index) {
							
							var tNumber = 1;
							var tabValueNumber = $(this).parent().siblings('.imapper-value-tab-number');
							if (tabValueNumber.length > 0)
								tNumber = parseInt(tabValueNumber.html());

							if (tNumber != 1)
							{
								
								if (index == 0)
								{
									$(this).css('border-top-left-radius', '0px');	
									$(this).css('border-top-right-radius', '0px');
								}
								else
									$(this).css('border-radius', '0px');

								
									
								$(this).find('.imapper-content').css('border-width', '0 1px 1px 1px');
							}
						});
					}
					else if (position == 'top' || position == 'bottom')
					{
						var right = parseInt($(this).css('width')) + 25 - radius;
						var right_tab = parseInt($(this).css('width'));
						
						$(this).find('.imapper-content-additional').each(function() {
							$(this).css('width', '0px');
							$(this).find('.imapper-content-inner').css('display', 'none');
							$(this).css('right', right + 'px');
							right += 25 - radius;
						});
						
						$(this).find('.imapper-content-tab').each(function() {
							$(this).css('width', '25px');	
							$(this).css('height', height + 'px');
							$(this).find('a').css('height', height + 'px');
							
							$(this).css('border-top-left-radius', $(this).parent().find('.imapper-content').css('border-top-left-radius'));	
							$(this).css('border-bottom-left-radius', $(this).parent().find('.imapper-content').css('border-bottom-left-radius'));
							$(this).css('border-style', 'solid');
							$(this).css('border-width', '1px 0 1px 1px');
							$(this).css('border-color', borderColor);
							
							$(this).find('a').css('padding', '5px 0 0 5px');
							
							if (position == 'bottom')
								$(this).css('bottom', '0px');
								
							$(this).css('right', right_tab + 'px');
							right_tab += 25 - radius;
							
							$(this).css('z-index', zindextab);
							zindextab--;
						});
						
						$(this).find('.imapper-content').each(function(index) {

							var tNumber = 1;
							var tabValueNumber = $(this).parent().siblings('.imapper-value-tab-number');
							if (tabValueNumber.length > 0)
								tNumber = parseInt(tabValueNumber.html());
							if (tNumber != 1)
							{
								if (index == 0)
								{
									$(this).css('border-top-left-radius', '0px');	
									$(this).css('border-bottom-left-radius', '0px');
								}
								else
									$(this).css('border-radius', '0px');
									
								$(this).find('.imapper-content').css('border-width', '1px 1px 1px 0');
							}
						});
					}
				}//pin type 1
				
				if ($(this).siblings('.imapper' + id + '-pin').attr('src')!==undefined) {
				var indexPosition = $(this).siblings('.imapper' + id + '-pin').attr('src').indexOf('images/');

				var position = $(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('/images/');
				pluginUrl = $(this).parent().find('.imapper' + id + '-pin').attr('src').substring(0, position);

				$(this).siblings('.imapper-pin-color').css('behavior', 'url(' + pluginUrl + '/pie/PIE.htc)');
				}
				
			});//content wrapper		
			};
			my_imapper_content_position_function(id);
			/**my_imapper_content_position_function
			 * Set hover positions
			 */
			my_content_position_function=function(id){
			$(".imapper" + id + "-pin-my-content-wrapper").each(function(i,v){
							
				//$(this).css('z-index',120);	
				var my_id=$(this).data('pin-id');
				my_admin_debug("Pin",my_id);
				var my_width_1=$(this).width();
				var my_height_1=$(this).height();
				var position='top';//$(this).parent().data('my-hover-open');
				var borderColor=$(this).parent().data('my-hover-back-color');
				var img_width = $("#imapper"+id+"-pin"+my_id).outerWidth();//$(this).parent().find('.imapper' + id + '-pin').outerWidth();
				var img_height =$("#imapper"+id+"-pin"+my_id).outerHeight(); //$(this).parent().find('.imapper' + id + '-pin').outerHeight();
				/**
				 * Change position Dragan 12px above pin
				 */
				var my_new_left=$("#imapper"+id+"-pin"+my_id+"-wrapper").position().left;
				var my_new_top=$("#imapper"+id+"-pin"+my_id+"-wrapper").position().top;
				my_admin_debug("My new positions",{my_new_left:my_new_left,my_new_top:my_new_top,img_width:img_width,img_height:img_height});
				var my_top_pos=my_new_top-(img_height/2+22+my_height_1);
				var my_left_new=my_new_left-(my_width_1/2);//-img_width/2;
				$(v).css('position', 'absolute');
				$(v).css('top',my_top_pos+'px');
				$(v).css('left',my_left_new+'px');
				$(this).find('.arrow-top-border').css('left', my_width_1/2 - 11 + 'px');
				$(this).find('.arrow-top-border').css('border-top-color', borderColor);
				$(this).find('.imapper-arrow').hide();
				$(this).find('.imapper-arrow').addClass('arrow-down');
				$(this).hide();
				return;
				
				
				if ($(window).width() <= 600  && designStyle == 'responsive')
				{
				
				};
				var left_p=$("#imapper" + id + "-pin" +my_id +"-wrapper").data('left');//position().left;
				var top_p=$("#imapper" + id + "-pin" +my_id +"-wrapper").data('top');//position().top;
				/**
				 * Change positions
				 */
				
				
				
				
				if($("#imapper" + id + "-pin" +my_id +"-wrapper .my_inner_dot-front").length>0){
					var top_dot=$("#imapper" + id + "-pin" +my_id +"-wrapper .my_inner_dot-front").offset().top;
					var left_dot=$("#imapper" + id + "-pin" +my_id +"-wrapper .my_inner_dot-front").offset().left;
				
				
				}
				left_p=parseFloat(left_p);
				top_p=parseFloat(top_p);
				var top=top_p/100*$("#imapper"+id+"-map-image").height();
				var left=left_p/100*$("#imapper"+id+"-map-image").width();
				my_admin_debug("Position",{left:left,top:top,position:position,borderColor:borderColor,img_w:img_width,img_h:img_height,my_w:my_width_1,my_h:my_height_1});
				
				/**
				 * Add display none
				 */
				
				my_admin_debug("Immaper hover data",{pos:position,border:borderColor});
				$(v).css('position', 'absolute');
				var w=$(this).width();
				var l=left;
				//var l=left-(my_width_1/2);
				if(position=='top'){
					//$(v).css('right', '0px');
					//$(this).find('.arrow-top-border').css('top', my_height_1 + 1 + 'px');
					$(this).find('.arrow-top-border').css('left', my_width_1/2 - 11 + 'px');
					$(this).find('.arrow-top-border').css('border-top-color', borderColor);
				
					/*$(this).css('width', my_width_1 + 'px');
					//$(this).css('height', height + img_height/4 + 35 + 'px');
					$(this).css('right', my_width_1/2 + 'px');
					$(this).css('bottom', height + img_height + 40 + 'px');
					/*
					if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
					{
						$(this).css('right', width/2 - 4 + 'px');
						$(this).css('bottom', height + 50 + 'px');
					}
					else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
					*/
					//$(this).css('bottom', height + img_height + 20 + 'px');
					var my_enable_shadow=$(this).data('my-enable-shadow');
					var my_shadow_width=parseInt($(this).data('my-shadow-width'));
					var top_new=top;
					$(this).css('top', top_p+'%');
					$(this).css('left',left_p+'%');
					var left_new=$(this).position().left;
					//var top_new=$(this).position().top;
					my_admin_debug("New positions",{left_new:left_new,top_new:top_new});
					//top_new=top_new-img_height*1.5-my_height_1;
					/*if(my_enable_shadow==1){
						top_new=top_new-my_shadow_width/2;
					}else {
						top_new-=5;
					}*/
					/**
					 * 10 is for arroow 12 is for psd position
					 */
					top_new=top_new-my_height_1-img_height/2-20;
					left_new=left_new-(my_width_1/2)+2;//-img_width/2;
					my_admin_debug("Calculated positions",{left_new:left_new,top_new:top_new,img_w:img_width,img_h:img_height});
					
					$(this).css('top', top_new+'px');
					$(this).css('left',left_new+'px');
					/**
					 * Try with
					 */
					var my_image_top=$("#imagemapper" +id+ "-wrapper").offset().top;
					var my_image_left=$("#imagemapper" +id+"-wrapper").offset().left;
					var top_new_1=top_dot-my_image_top;
					var left_new_1;
					var dot_out_width;
					if($("#imapper" + id + "-pin" +my_id +"-wrapper .my_inner_dot-front").length==0){
						
						dot_out_width=$("#imapper" + id + "-pin" +my_id).outerWidth();
						left_dot=$("#imapper" + id + "-pin" +my_id).offset().left;
						left_new_1=left_dot-my_image_left+(dot_out_width/2)-(my_width_1/2);
						
					}
					else {
						dot_out_width=$("#imapper" + id + "-pin" +my_id +"-wrapper .my_inner_dot-front").outerWidth();
						left_new_1=left_dot-my_image_left+(dot_out_width/2)-(my_width_1/2);
						my_admin_debug("New positions",{dor_w:dot_out_width,top:top_new_1,left:left_new_1});
					}
					$(this).css('left',left_new_1+'px');
					
					$(this).find('.imapper-arrow').hide();
					$(this).find('.imapper-arrow').addClass('arrow-down');
					//$(this).find('.imapper-arrow').css('top', my_height_1 + 'px');
			
				}
				$(v).hide();
			});//end hover content positions
			};
			my_content_position_function(id);
			
			var hheight;
			/**
			 * Nisma ovo dirao
			 */
			$(this).find('.imapper-content-text').each(function(index) { 
				if (index == 0)
					hheight = $(this).siblings('.imapper-content-header').height();
					
				if ($(this).siblings('.imapper-content-header').html() != '')
				{

					var dis = $(this).closest('.imapper-content-inner');

					if (dis.length==0)
						dis = $(this);

			
					if ($(dis).closest('.imapper-content-wrapper').siblings('img').hasClass(pinType2))
						$(this).css('height', $(this).parent().height() - hheight - 20 + 'px');
					else
						$(this).css('height', $(this).parent().height() - hheight - 30 + 'px');
				}
				else
				{
					$(this).siblings('.imapper-content-header').css('padding', '0px');
					$(this).css('height', $(this).parent().height() - 20 + 'px');
				}
					
				$(this).mCustomScrollbar({'scrollInertia':300});
			});
		/**
		 * Responsive
		 * multiplier <=1
		 */	
		if ((multiplier <= 1)&&settings.oldResponsive)
						{
							//Don't use this code for responsive
							
							/**
							 * Change
							 */	
							//$(this).find('.imapper-pin-wrapper > img').parent().css('transform', 'scale(' + multiplier + ')');
							my_admin_debug("Multiplier",multiplier);
							$(this).find('.imapper'+id+'-pin-wrapper').css('transform', 'scale(' + multiplier + ')');
								
							var windowWidth = parseInt($(window).width());
							if (settings.pinScalingCoefficient!=0 && windowWidth<600 && settings.itemDesignStyle == 'responsive' ) {
								var my_multi_var=multiplierArea/multiplier;
								my_admin_debug("Scalling",my_multi_var);
								/*
								 * 
								 *Change
								 *imapper-pin-wrapper-my-inner-front
								 **/
								//$(this).find('.imapper-pin-wrapper > img ~ .imapper-content-wrapper').css({'transform': 'scale(' + (multiplierArea/multiplier) + ')','transform-origin':'0% 0%',
								$(this).find('.imapper-pin-wrapper-my-inner-front ~ .imapper-content-wrapper').css({'transform': 'scale(' + (multiplierArea/multiplier) + ')','transform-origin':'0% 0%',
																																															'-webkit-transform-origin':'0% 0%',
																																														'-moz-transform-origin':'0% 0%',
																																														'-ms-transform-origin':'0% 0%',
																																														'-o-transform-origin':'0% 0%'});
							} 

							
						}//end mulitplier
							$(this).find('.imapper-pin-wrapper > .imapper-area-pin').parent().css('transform', 'scale(' + multiplierArea + ')');

							var windowWidth = parseInt($(window).width());

							if (windowWidth>600 || settings.itemDesignStyle == 'fluid') {
								$(this).find('.imapper-pin-wrapper > img ~ .imapper-content-wrapper').each(function(){
									var openPosition = $(this).parent().data('open-position');
									switch(openPosition) {
									    case 'top':
									        $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'center bottom','-webkit-transform-origin':'center bottom','-moz-transform-origin':'center bottom','-ms-transform-origin':'center bottom','-o-transform-origin':'center bottom'});
									        break;
									    case 'bottom':
									              $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'center top','-webkit-transform-origin':'center top','-moz-transform-origin':'center top','-ms-transform-origin':'center top','-o-transform-origin':'center top'});
									        break;
									        case 'left':
									              $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'right center','-webkit-transform-origin':'right center','-moz-transform-origin':'right center','-ms-transform-origin':'right center','-o-transform-origin':'right center'});
									        break;
									        case 'right':
									              $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'left center','-webkit-transform-origin':'left center','-moz-transform-origin':'left center','-ms-transform-origin':'left center','-o-transform-origin':'left center'});
									        break;
									 }
									
								});
							}



			$(this).css('visibility', 'visible');
			/**
			 * Color animation
			 */
			/**
			 * Close button animation
			 */
			$(".imapper-content .my_product_close").mouseenter(function(e){
				$(this).find(".my_font_size").finish();
				var c1=$(this).data('color');
				var c2=$(this).data('hover-color');
				my_admin_debug("Mouse enter",{c1:c1,c2:c2});
				$(this).find(".my_font_size").css('color',c1);
				$(this).find(".my_font_size").animate({
					color:c2
				},settings.animateOther);
			});
			$(".imapper-content .my_product_close").mouseleave(function(e){
				$(this).find(".my_font_size").finish();
				
				var c1=$(this).data('color');
				var c2=$(this).data('hover-color');
				my_admin_debug("Mouse leave",{c1:c1,c2:c2});
				$(this).find(".my_font_size").css('color',c2);
				$(this).find(".my_font_size").animate({
					color:c1
				},settings.animateOther);
			});
			
			$(".imapper-content .my_add_item").mouseenter(function(e){
				$(this).find("a").finish();
				$(this).finish();
				var c1=$(this).data('color');
				var c2=$(this).data('hover-color');
				var bc1=$(this).data('back-color');
				var bc2=$(this).data('hover-back-color');
				my_admin_debug("Mouse enter",{c1:c1,c2:c2,bc1:bc1,bc2:bc2});
				
				$(this).find("a").css('color',c1);
				$(this).find("a").animate({
					color:c2
				},settings.animateOther);
				$(this).css('background-color',bc1);
				$(this).animate({
					'background-color':bc2
				},settings.animateOther);
			});
			$(".imapper-content .my_add_item").mouseleave(function(e){
				$(this).find("a").finish();
				$(this).finish();
				var c1=$(this).data('color');
				var c2=$(this).data('hover-color');
				var bc1=$(this).data('back-color');
				var bc2=$(this).data('hover-back-color');
				my_admin_debug("Mouse enter",{c1:c1,c2:c2,bc1:bc1,bc2:bc2});
				
				$(this).find("a").css('color',c2);
				$(this).find("a").animate({
					color:c1
				},settings.animateOther);
				$(this).css('background-color',bc2);
				$(this).animate({
					'background-color':bc1
				},settings.animateOther);
			});
			$(".imapper-content .my_view_item , .imapper-content .my_view_item_category").mouseenter(function(e){
				$(this).find("a").finish();
				$(this).finish();
				var c1=$(this).data('color');
				var c2=$(this).data('hover-color');
				var bc1=$(this).data('back-color');
				var bc2=$(this).data('hover-back-color');
				my_admin_debug("Mouse enter",{c1:c1,c2:c2,bc1:bc1,bc2:bc2});
				
				$(this).find("a").css('color',c1);
				$(this).find("a").animate({
					color:c2
				},settings.animateOther);
				$(this).css('background-color',bc1);
				$(this).animate({
					'background-color':bc2
				},settings.animateOther);
			});
			$(".imapper-content .my_view_item ,.imapper-content .my_view_item_category").mouseleave(function(e){
				$(this).find("a").finish();
				$(this).finish();
				var c1=$(this).data('color');
				var c2=$(this).data('hover-color');
				var bc1=$(this).data('back-color');
				var bc2=$(this).data('hover-back-color');
				my_admin_debug("Mouse enter",{c1:c1,c2:c2,bc1:bc1,bc2:bc2});
				
				$(this).find("a").css('color',c2);
				$(this).find("a").animate({
					color:c1
				},settings.animateOther);
				$(this).css('background-color',bc2);
				$(this).animate({
					'background-color':bc1
				},settings.animateOther);
			});
		
		/**
		 * Content tab
		 */
			$(document).on('click', '.imapper-content-tab a', function(e) {
				e.preventDefault();
				
			   
			    
				var pinId = getPinId($(this).closest('.imapper-content-wrapper').siblings('.imapper-pin-type-1'));
				
				var newClick = parseInt($(this).html());
				var dis = $(this).parent().parent();
				
				var position = $(this).closest('.imapper-pin-wrapper').data('open-position');
				
				if (newClick != tab_clicked[pinId])
				{	
					if (position == 'left' || position == 'right')
					{	
						if (newClick > tab_clicked[pinId])
						{
							

							 $(dis).find('.imapper-content').eq(newClick - 1).stop(true,true);

							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ height: 0}, {duration: 400});
							
							for (var i = tab_clicked[pinId]; i < newClick; i++)
							{
								var bottomNew = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('bottom')) - cHeight[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ bottom: bottomNew}, {duration: 400});
								
								if (i != tab_clicked[pinId])
									$(dis).find('.imapper-content').eq(i - 1).css('bottom', parseInt($(dis).find('.imapper-content').eq(i - 1).css('bottom')) - cHeight[pinId]);
							}
							
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							var bottomNew2 = parseInt($(dis).find('.imapper-content').eq(newClick - 1).css('bottom')) - cHeight[pinId];
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ height: cHeight[pinId], bottom: bottomNew2}, {duration: 400});
						}
						else
						{

							$(dis).find('.imapper-content').eq(newClick - 1).stop(true,true);

							

							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							var bottomNew = parseInt($(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).css('bottom')) + cHeight[pinId];
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ height: 0, bottom: bottomNew}, {duration: 400});
								
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ height: cHeight[pinId]}, {duration: 400});
							
							for (var i = newClick; i < tab_clicked[pinId]; i++)
							{
								var bottomNew2 = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('bottom')) + cHeight[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).stop(true,true).animate({ bottom: bottomNew2}, {duration: 400});
								
								if (i != newClick)
									$(dis).find('.imapper-content').eq(i - 1).css('bottom', parseInt($(dis).find('.imapper-content').eq(i - 1).css('bottom')) + cHeight[pinId]);
							}
						}
					}
					else if (position == 'top' || position == 'bottom')
					{
						if (newClick > tab_clicked[pinId])
						{

							$(dis).find('.imapper-content').eq(newClick - 1).stop(true,true);
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ width: 0}, {duration: 400});
							for (var i = tab_clicked[pinId]; i < newClick; i++)
							{
								var rightNew = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('right')) - cWidth[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ right: rightNew}, {duration: 400});
								
								if (i != tab_clicked[pinId])
									$(dis).find('.imapper-content').eq(i - 1).css('right', parseInt($(dis).find('.imapper-content').eq(i - 1).css('right')) - cWidth[pinId]);
							}
							
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							var rightNew2 = parseInt($(dis).find('.imapper-content').eq(newClick - 1).css('right')) - cWidth[pinId];
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ width: cWidth[pinId], right: rightNew2}, {duration: 400});
						}
						else
						{
							$(dis).find('.imapper-content').eq(newClick - 1).stop(true,true);

							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							var rightNew = parseInt($(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).css('right')) + cWidth[pinId];
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ width: 0, right: rightNew}, {duration: 400});
								
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ width: cWidth[pinId]}, {duration: 400});
							
							for (var i = newClick; i < tab_clicked[pinId]; i++)
							{
								var rightNew2 = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).stop(true,true).css('right')) + cWidth[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ right: rightNew2}, {duration: 400});
								
								if (i != newClick)
									$(dis).find('.imapper-content').eq(i - 1).css('right', parseInt($(dis).find('.imapper-content').eq(i - 1).css('right')) + cWidth[pinId]);
							}
						}
					}
					
					$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-text').mCustomScrollbar('update');
					tab_clicked[pinId] = newClick;

				}
			});
			
			/**
			 * Close pin
			 */
			$(document).on('click','.my_product_close', function() {
				my_admin_debug("Close window");

				var el = $('#imapper'+id+'-map-image');


				 if (settings.itemOpenStyle == 'hover' || $(this).closest('.imapper-pin-wrapper').data('imapper-hover-action') == 'content' )
					$(this).closest('.imapper-pin-wrapper').trigger('mouseleave');
				else 
					$(this).parent().siblings('.imapper' + id + '-pin').trigger('click');
			
				 imapperClearMap(el, id, clicked);
				 my_immaper_this=this;
				 setTimeout(function(){
				 $(my_immaper_this).find(".my_font_size").finish();
					var c1=$(my_immaper_this).data('color');
					var c2=$(my_immaper_this).data('hover-color');
					my_admin_debug("Close pin change color",{c1:c1,c2:c2});
					$(my_immaper_this).find(".my_font_size").css('color',c1);
				 },settings.animationDuration);
					/*
				 		
					*/
						/*$(this).find(".my_font_size").animate({
							color:c1
						},settings.animateOther);*/
					
			});
			var my_mouse_leave_during={};
			var my_in_animations={};
			var my_out_animations={};
			$('.imapper' + id + '-pin-wrapper').each(function(){
					
				/**
				 * set scale o to elements
				 */
				
				var itemClickAction;
				if (settings.itemOpenStyle == 'click')
					itemClickAction = 'content';
				else 
					itemClickAction = 'none';

				if (settings.advancedPinOptions == true && settings.pinClickAction!='')
					itemClickAction = settings.pinClickAction;

				if ($(this).attr('data-imapper-click-action') !== undefined)
					itemClickAction =  $(this).attr('data-imapper-click-action');

				var itemHoverAction;
				if (settings.itemOpenStyle == 'hover')
					itemHoverAction = 'content';
				else 
					itemHoverAction = 'none';

				if (settings.advancedPinOptions == true && settings.pinHoverAction!='')
					itemHoverAction = settings.pinHoverAction;

				if ($(this).attr('data-imapper-hover-action') !== undefined)
					itemHoverAction =  $(this).attr('data-imapper-hover-action');
				my_admin_debug("Hover Action",itemHoverAction);	
				if (itemHoverAction == 'my_content')//handles pin hover event
				{



					//$(this).children('.imapper' + id + '-pin').mouseover( function() {//hover in function for pins
					$(this).children('.imapper' + id + '-pin').mouseenter( function() {//hover in function for pins
							
					/**
						 * Dont display for small windows
						 */
						var my_window_width=$(window).width();
						if(my_window_width<settings.responsiveWidth){
							return;
						}
						var my_pin_id=$(this).data('pin-id');
						/**
						 * return if tab is clicked
						 */
						my_admin_debug("Clicked pins",clicked);
						if(clicked[my_pin_id]==1)return;
						my_in_animations[my_pin_id]=1;
						my_admin_debug("Hover immaper Pin id",my_pin_id);
						$(this).siblings('.imapper-content-wrapper').stop(true,true);
						$(this).siblings('.imapper-content-wrapper').find('.imapper-content').stop(true,true);

						/**
						 * Dont add overlay
						 */
						/*if (settings.mapOverlay)
							addOverlay($(this),id);
						*/
						
						var properties2 = {};

						var contentOpenPosition = $(this).closest('.imapper-pin-wrapper').data('my-hover-open');
						var inAnimation=$(this).closest('.imapper-pin-wrapper').data('my-hover-in-animation');
						var outAnimation=$(this).closest('.imapper-pin-wrapper').data('my-hover-out-animation');
						my_admin_debug("Hover in ",{openPos:contentOpenPosition,in_a:inAnimation,out_a:outAnimation});
						if (inAnimation!="") {

								var rightPos = 0;
								var bottomPos = 0;

								switch (contentOpenPosition) {
									case 'top':
									case 'bottom':
										bottomPos = parseInt($(this).siblings('.imapper-content-wrapper').css('bottom'));
										var duration = {duration: 400, queue: true, always: function() {
													$(this).css({'bottom':bottomPos+'px'}); } 
										};
									break;
									case 'left':
									case 'right':
										rightPos = parseInt($(this).siblings('.imapper-content-wrapper').css('right'));
										var duration = {duration: 400, queue: true, always: function() {
													$(this).css({'right':rightPos+"px"});
											}};
									break;
									default:
											var duration = {duration: 400, queue: true};
								}		

						} else {
								var duration = {duration: 400, queue: true};
						}

						var cpWidth = ($(window).width() <= 600  && designStyle == 'responsive') ? ($(this).closest('.imagemapper-wrapper').width() / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
							$(this).parent().css('transform').indexOf(',')))) : width;
						
						if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
						{
							$(this).css('z-index', '12');
							$(this).siblings('.imapper-value-tab-number').css('z-index', '12');
							$(this).siblings('.imapper-content-wrapper').css('z-index', '11');
						}
						else
						{
							$(this).siblings('.imapper-content-wrapper').css('z-index', '13');
						}

						$(this).parent().css('z-index', '100');
						
						if ($(this).siblings('.imapper-content-wrapper').css('visibility') == 'hidden')
							$(this).siblings('.imapper-content-wrapper').css('visibility', 'visible');
						
						if ($(this).hasClass(pinType2))
							{
								if ($(this).parent().data('open-position') == 'right')
									properties2 = {width: cpWidth};
								else
									properties2 = {width: cpWidth, marginLeft: 0};
									
								$(this).siblings('.imapper-content-wrapper').find('.imapper-content').animate(properties2, duration);
							}
						var my_hover_id='imapper'+id+'-pin'+my_pin_id+'-my-content-wrapper';
						var my_showed=$("#"+my_hover_id).data("my-showed");
						my_enable_shadow=$("#"+my_hover_id).data('my-enable-shadow');
						my_admin_debug("Enable shadow",my_enable_shadow);
						
						/**
						 * Stop animations
						 */
						if(outAnimation=='slideOut'){
							my_admin_debug("Stop animation",outAnimation);
							$("#"+my_hover_id).stop(true,true);
						}
						else {
							$("#"+my_hover_id).finish();
							$("#"+my_hover_id).find(".my_hover_inner_1234").finish();
						}
						//$("#"+my_hover_id).finish('my_hover');
						
						//$("#"+my_hover_id).stop(true,true);
						
						//$("#"+my_hover_id).parent(" .ui-effects-wrapper").children("#"+my_hover_id).finish();
						//$("#"+my_hover_id).stop(true,true);

						my_admin_debug("My showed",my_showed);
						
						/**
						 * If its showed return;
						 */
						if(typeof my_showed!='undefined' && my_showed==1)return;
						
						my_admin_debug("Hover action id",my_hover_id);
						$("#"+my_hover_id).data('my-showed',1);
						/*$("#"+my_hover_id).mouseleave(function(e){
							var my_pin_id_new=$(this).data('pin-id');
							my_admin_debug("Mouse leave during animation",{id:my_pin_id_new,anim:my_in_animations});
							if(my_pin_id_new in my_in_animations){
								my_admin_debug("Mouse leave during animation in is ",{id:my_pin_id_new,anim:my_in_animations});
								
							}
						});*/
						if(my_transitions){
							$("#"+my_hover_id).css(my_transitions_prefix+'transition',"");
							$("#"+my_hover_id).css(my_transforms_prefix+'transform','');
	
						}
						
						var my_transition_out=$("#"+my_hover_id).data("my-transition-out-1");
						my_admin_debug("Transition out",my_transition_out);
						if(typeof my_scale_out_timeout!='undefined')
						clearTimeout(my_scale_out_timeout);
						if((typeof my_transition_out !='undefined')&& inAnimation!='scaleIn'){
							my_admin_debug("Sclae element to one",inAnimation);
							$("#"+my_hover_id).css("opacity",0);
							$("#"+my_hover_id).css('display','block');
							
							//$("#"+my_hover_id).css('transform','scale(0)');
							/* Bilo je
							$("#"+my_hover_id).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform 0ms ease 0s");
							*/
							$("#"+my_hover_id).find('.my_hover_inner_1234').css(my_transitions_prefix+'transition','');
							$("#"+my_hover_id).find('.my_hover_inner_1234').css(my_transforms_prefix+'transform','scale(1)');
							
						
						$("#"+my_hover_id).css('display','none');
						$("#"+my_hover_id).css("opacity",1);
						$("#"+my_hover_id).find('.my_hover_inner_1234').css("opacity",1);
						
						}
						if(inAnimation=="scaleIn"){
							if(my_transform){
								/*Nepotrebno
								 * my_admin_debug("Scale image in ",my_transforms_prefix);
								$("#"+my_hover_id).css("opacity",0);
								$("#"+my_hover_id).css('display','block');
								
								
								$("#"+my_hover_id).css(my_transforms_prefix+'transform','scale(0)');
								//setTimeout(function(){
								$("#"+my_hover_id).css("opacity",1);
								*/
								my_scale_show_hover(id,my_pin_id,settings.animationDuration);	
								//},10);
							}
							else if(my_transitions&&(settings.useTransitions==1)){
								
								my_admin_debug("Transition scalke in");
								$("#"+my_hover_id).data('my-transition-in-1','scaleIn');
								
								$("#"+my_hover_id).css('display','block');
								$("#"+my_hover_id).css("opacity",0);
								
								/*
								 * bilo je ovako
								 *$("#"+my_hover_id).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform 1ms ease 0s");
								*/
								//if(typeof my_transition_out =='undefined'){
									$("#"+my_hover_id).css(my_transitions_prefix+'transition','');
									$("#"+my_hover_id).css(my_transforms_prefix+'transform','scale(0)');
								//}
								setTimeout(function(){
									$("#"+my_hover_id).css('display','block');
									$("#"+my_hover_id).css("opacity",1);
									$("#"+my_hover_id).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform "+settings.animationDuration+"ms ease 0s");
									$("#"+my_hover_id).css(my_transforms_prefix+'transform','scale(1)');
								},10);
							}
							else {
								
								$("#"+my_hover_id).show('scale',{direction:"both",origin:["middle","center"]},settings.animationDuration,function(){
									$(this).css('z-index',120);
								});
								var my_hover_height=$("#"+my_hover_id).height();
								//my_hover_height+=20;
								if(my_enable_shadow){
									
									var my_shadow_width=parseInt($("#"+my_hover_id).data('my-shadow-width'));
									my_admin_debug("Enable Shadow",my_shadow_width);
									
									var my_hover_width=$("#"+my_hover_id).width();
								my_hover_width+=my_shadow_width*2;
								$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-top',my_shadow_width+'px');
								$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-left',my_shadow_width+'px');
								
								$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+my_shadow_width+'px');
								$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+my_shadow_width+'px');
								$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
								}
							}
						}else if(inAnimation=="fadeIn"){
							//$("#"+my_hover_id).css("opacity",1);
							
							//$("#"+my_hover_id).show();
							$("#"+my_hover_id).fadeIn(settings.animationDuration,function(){
								$(this).css('z-index',120);
							});
							
							
						}else if(inAnimation=='slideIn'){
							/*if(my_transitions){
								my_admin_debug("Transition slideinb in");
								//$("#"+my_hover_id).css('transform','scale(1)');
								var my_width=$("#"+my_hover_id).width();
								var left=$("#"+my_hover_id).css('left');
								var width=$("#"+my_hover_id).width();
								var new_pos=left+width;
								$("#"+my_hover_id).css('left',new_pos);
								$("#"+my_hover_id).css('width',0);
								
								$("#"+my_hover_id).css('display','block');
								
								$("#"+my_hover_id).animate({left:left,width:width});
								
								//$("#"+my_hover_id).css('transition',"all 1000ms ease 0s");
								//$("#"+my_hover_id).css('transform','translate(');
							
							}else 
							*/
							/*if(typeof my_transition_out !='undefined'){
								//$("#"+my_hover_id).css('transform','scale(1)');
								//$("#"+my_hover_id).css('transition',"all 1ms ease 0s");
								$("#"+my_hover_id).css("opacity",0);
								$("#"+my_hover_id).css('display','block');
								
								//$("#"+my_hover_id).css('transform','scale(0)');
								
								$("#"+my_hover_id).css('transform','scale(1)');
								$("#"+my_hover_id).css('transition',"all 0ms ease 0s");
							
							}*/
						//	$("#"+my_hover_id).css('display','none');
							var my_hover_height=$("#"+my_hover_id).height();
							my_hover_height+=20;
							
							$("#"+my_hover_id).show('slide',{direction:'right'},settings.animationDuration,function(){
								$(this).css('z-index',120);
							});
							/*dont; use queeu
							 * $("#"+my_hover_id).dequeue('my_hover');
							*/
							/**
							 * Set height of ui-effects wrapper
							 */
							//$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('top','-5px');
							$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height',my_hover_height+'px');
							
							if(my_enable_shadow){
								
								var my_shadow_width=parseInt($("#"+my_hover_id).data('my-shadow-width'));
								my_admin_debug("Enable Shadow",my_shadow_width);
								
								var my_hover_width=$("#"+my_hover_id).width();
							my_hover_width+=my_shadow_width*2;
							$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-top',my_shadow_width+'px');
							$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-left',my_shadow_width+'px');
							
							$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+my_shadow_width+'px');
							$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+my_shadow_width+'px');
							$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
							}
							
							
							
							/*
							var my_hover_left=parseFloat($("#"+my_hover_id+" .my_arror_top_hover ").css('left'));
							$("#"+my_hover_id+" .my_arror_top_hover ").data("my-hover-left",my_hover_left);
							my_hover_left+=$("#"+my_hover_id).width();
							$("#"+my_hover_id+" .my_arror_top_hover ").css('left',my_hover_left);
							my_admin_debug("My hover left",my_hover_left);
							
							$("#"+my_hover_id+" .my_arror_top_hover ").animate({left:"-=200"});
							*/
							
						}
						
						/*	
						if (settings.slideAnimation) {

							var contentWrapperWidth = $(this).siblings('.imapper-content-wrapper').width();
							var contentWrapperHeight = $(this).siblings('.imapper-content-wrapper').height();

							switch (contentOpenPosition) {
									case 'top':
										$(this).siblings('.imapper-content-wrapper').css('bottom',(bottomPos+contentWrapperHeight/5)+"px");
										$(this).siblings('.imapper-content-wrapper').animate({opacity: 1, bottom: bottomPos+"px"}, duration);
										break;
									case 'bottom':
										$(this).siblings('.imapper-content-wrapper').css('bottom',(bottomPos-contentWrapperHeight/5)+"px");
										$(this).siblings('.imapper-content-wrapper').animate({opacity: 1, bottom: bottomPos+"px"}, duration);
										break;
									case 'left':
										$(this).siblings('.imapper-content-wrapper').css('right',(rightPos+contentWrapperWidth/5)+"px");
										$(this).siblings('.imapper-content-wrapper').animate({opacity: 1, right: rightPos+"px"}, duration);
										break;
									case 'right':
										$(this).siblings('.imapper-content-wrapper').css('right',(rightPos-contentWrapperWidth/5)+"px");
										$(this).siblings('.imapper-content-wrapper').animate({opacity: 1, right: rightPos+"px"}, duration);
										break;
									break;
									default:
										$(this).siblings('.imapper-content-wrapper').animate({opacity: 1}, duration);
								}		
						} else {
							$(this).siblings('.imapper-content-wrapper').animate({opacity: 1}, duration);
						}
						*/
					});
					
					$(this).mouseleave( function(e) {//hover out function for pins
						/**
						 * Hover on dot
						 */
						//var my_class=$(e.relevantTarget).attr('class');
						//my_admin_debug("Mouse leave ",my_class);
						/**
						 *Depreced 
						 *if($(this).find('.imapper-pin-wrapper-my-inner-front .my_inner_dot-front').length>0){
							var imgHeight=$(this).find('.imapper-pin-wrapper-my-inner-front .my_inner_dot-front').outerHeight();
							var imgWidth=$(this).find('.imapper-pin-wrapper-my-inner-front .my_inner_dot-front').outerWidth();
							var x_page=e.pageX;//left edge of document
							var y_page=e.pageY;//top edge of document
							my_admin_debug("Img width height",{imgHeight:imgHeight,imgWidth:imgWidth});
							var left_x_1=$(this).find('.imapper-pin-wrapper-my-inner-front .my_inner_dot-front').offset().left-imgWidth/2;
							var left_x_2=$(this).find('.imapper-pin-wrapper-my-inner-front .my_inner_dot-front').offset().left+imgWidth/2;
							var top_x_1=$(this).find('.imapper-pin-wrapper-my-inner-front .my_inner_dot-front').offset().top-imgHeight/2;
							var top_x_2=$(this).find('.imapper-pin-wrapper-my-inner-front .my_inner_dot-front').offset().top+imgHeight/2;
							my_admin_debug("Mouse leave",{x:x_page,y:y_page,x1:left_x_1,x2:left_x_2,y1:top_x_1,y2:top_x_2});
							if((x_page>=left_x_1)&&(x_page<=left_x_2)&&(y_page>=top_x_1)&&(y_page<=top_x_2)){
								my_admin_debug("Inner return");
								return;
						
							}	
						}
						if(my_class=='my_inner_dot-front')return;
						*/
						/**
						 * Don't show responsive views
						 */
						var my_window_width=$(window).width();
						if(my_window_width<settings.responsiveWidth){
							return;
						}
						var my_pin_id=$(this).data('pin-id');
						my_admin_debug("Mouse leave immaper Pin id",my_pin_id);
						var contentOpenPosition = $(this).closest('.imapper-pin-wrapper').data('my-hover-open');
						var my_class='imapper'+id+'-pin-my-content-wrapper';
						//$("."+my_class).stop();
						var contentOpenPosition = $(this).closest('.imapper-pin-wrapper').data('my-hover-open');
						var inAnimation=$(this).closest('.imapper-pin-wrapper').data('my-hover-in-animation');
						var outAnimation=$(this).closest('.imapper-pin-wrapper').data('my-hover-out-animation');
						var my_hover_id='imapper'+id+'-pin'+my_pin_id+'-my-content-wrapper';
						var my_showed=$("#"+my_hover_id).data("my-showed");
						my_admin_debug("My showed",my_showed);
						my_enable_shadow=$("#"+my_hover_id).data('my-enable-shadow');
						my_admin_debug("Enable shadow",my_enable_shadow);
						
						if((typeof my_showed!='undefined')&&(my_showed==0))return;
						
						if(my_transitions){
							$("#"+my_hover_id).css(my_transitions_prefix+'transition',"");
							$("#"+my_hover_id).css(my_transforms_prefix+'transform','');
	
						}
						/**
						 * Stop animations
						 */
						
						//$("#"+my_hover_id).parent(" .ui-effects-wrapper").finish();
						
						if(inAnimation=='slideIn'){
							my_admin_debug("Stop animation",inAnimation);
							$("#"+my_hover_id).stop(true,true);
							$("#"+my_hover_id).show();
							
						}else {
							$("#"+my_hover_id).finish();
							$("#"+my_hover_id).find(".my_hover_inner_1234").finish();
						}
						//$("#"+my_hover_id).finish('my_hover');
						$("#"+my_hover_id).data("my-showed",0);
						
						//$("#"+my_hover_id).parent(" .ui-effects-wrapper").children("#"+my_hover_id).finish();
						
						//$("#"+my_hover_id).stop(true,true);
	
						var my_transition_in=$("#"+my_hover_id).data("my-transition-in-1");
						
						if(outAnimation!=""){
							if(outAnimation=='scaleOut'){
								if(my_transform){
									//$("#"+my_hover_id).css('display','block');
									/*
									$("#"+my_hover_id).css('display','block');
									$("#"+my_hover_id).css("opacity",0);
									$("#"+my_hover_id).css(my_transforms_prefix+'transform','scale(0)');
									$("#"+my_hover_id).css("opacity",1);
									$("#"+my_hover_id).data("my-transition-out-1",'scaleOut');
									*/
									$("#"+my_hover_id).data("my-transition-out-1",'scaleOut');
									
									my_scale_hide_hover(id,my_pin_id,settings.animationDuration);	
									
								}
								else if(my_transitions&&(settings.useTransitions==1)){
									$("#"+my_hover_id).data("my-transition-out-1",'scaleOut');
									
									$("#"+my_hover_id).css('display','block');
									$("#"+my_hover_id).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform "+settings.animationDuration+"ms ease 0s");
									$("#"+my_hover_id).css(my_transforms_prefix+'transform','scale(0)');
									$("#"+my_hover_id).data('my-showed',0);
									my_scale_out_timeout=setTimeout(function(){
										$("#"+my_hover_id).hide();
									},settings.animationDuration);
										
								}else {
									$("#"+my_hover_id).hide('scale',{direction:'both',origin:['middle','center']},settings.animationDuration,function(){
										$(this).data('my-showed',0);
										$(this).css('z-index',12);
									});
									var my_hover_height=$("#"+my_hover_id).height();
									//my_hover_height+=20;
									if(my_enable_shadow){
										
										var my_shadow_width=parseInt($("#"+my_hover_id).data('my-shadow-width'));
										my_admin_debug("Enable Shadow",my_shadow_width);
										
										var my_hover_width=$("#"+my_hover_id).width();
									my_hover_width+=my_shadow_width*2;
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-top',my_shadow_width+'px');
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-left',my_shadow_width+'px');
									
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+my_shadow_width+'px');
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+my_shadow_width+'px');
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
									}
								}
							
								}else if(outAnimation=='fadeOut'){
								
								$("#"+my_hover_id).fadeOut(settings.animationDuration,function(){
									$(this).data("my-showed",0);
									$(this).css('z-index',12);
								});
							}else if(outAnimation=='slideOut'){
								/*if(typeof my_transition_in!='undefined'){
									$("#"+my_hover_id).css('transform','scale(1)');
									
								}*/
								var my_hover_height=$("#"+my_hover_id).height();
								my_hover_height+=20;
								$("#"+my_hover_id).hide('slide',{direction:'left'},settings.animationDuration,function(){
									$(this).data('my-showed',0);
									$(this).css('z-index',12);
								});
								/**
								 * Don't use queue 
								 *$("#"+my_hover_id).dequeue('my_hover');
								*/
								
								//$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height','75px');
								
								$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height',my_hover_height+'px');
								if(my_enable_shadow){
									var my_shadow_width=parseInt($("#"+my_hover_id).data('my-shadow-width'));
									my_admin_debug("Enable Shadow",my_shadow_width);
									
									var my_hover_width=$("#"+my_hover_id).width();
									my_hover_width+=my_shadow_width*2;
								//$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height','70px');
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-top',my_shadow_width+'px');
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-left',my_shadow_width+'px');
								
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+my_shadow_width+'px');
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+my_shadow_width+'px');
									$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
								}
								/*
								var my_hover_left=parseFloat($("#"+my_hover_id+" .my_arror_top_hover ").css('left'));
								$("#"+my_hover_id+" .my_arror_top_hover ").data("my-hover-left",my_hover_left);
								$("#"+my_hover_id+" .my_arror_top_hover ").show().animate({left:"-=200"},function(){
									//var left=$("#"+my_hover_id).css('left');
									var my_left_hover=parseFloat($(this).css('left'));
									var my_width_hover=$(this).parent(".imapper-my-content-wrapper").width();
									my_left_hover+=my_width_hover;
									my_admin_debug("End move",{my_left:my_left_hover,my_width:my_width_hover});
									$(this).css('left',my_left_hover);
									
									$(this).parent(".imapper-my-content-wrapper").data('my-showed',0);
								});
								*/
								
							}
						}
						return;
					
						
						var pinId = getPinId($(this).children('.imapper' + id + '-pin'));//id of the pin
						var properties = {opacity: 0};
						var properties2 = {};
						var duration = {};
						
						var cpWidth = ($(window).width() <= 600 && designStyle == 'responsive') ? ($(this).parent().width() / parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
							$(this).css('transform').indexOf(',')))) : width;

						

						if ($(this).children('.imapper' + id + '-pin').hasClass(pinType2))
						{
							
							if ($(this).data('open-position') == 'right')
								properties2 = {width: 0};
							else
								properties2 = {width: 0, marginLeft: cpWidth};
										
							duration = {duration: 300, queue: true};
						}
						else
						{
							duration = {
								duration: 300,
								queue: true,
								complete: function() {
									$(this).find('.imapper-content').parent().css('visibility', 'hidden');
								}
							};
						}
						


						$(this).find('.imapper-content-wrapper').delay(200).each(function(){
							if (!($(this).is(':hover'))) {
								$(this).animate(properties, duration);
							}

						});
						
						
						if ($(this).children('.imapper' + id + '-pin').hasClass(pinType2))
							$(this).find('.imapper-content').delay(200).animate(properties2, {
										duration: 300,
										queue: false,
										complete: function() {
											$(this).parent().css('visibility', 'hidden');
										}
								});
						
						$(this).children('.imapper' + id + '-pin').css('z-index', '10');
						$(this).children('.imapper-value-tab-number').css('z-index', '10');
						$(this).children('.imapper-content-wrapper').css('z-index', '9');

						$(this).css('z-index', '');	

						imapperClearMap($('#imapper'+id+'-map-image'), id, clicked);
					});
				}//Immaper hover animation
				

				 if (itemClickAction!='none')//handles pin click
				{ 


					my_admin_debug("Item Action",itemClickAction); 	
					if (itemClickAction=='content') {
						
						

						$(this).children('.imapper' + id + '-pin').click( function() {
							

							imapperClearMap($('#imapper'+id+'-map-image'), id, []);

							if ($(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').hasClass('imapper-cb-tabs-version'))
								$(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').addClass('imapper-content-below-invisible').html('');
							else 
								$(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').slideUp().addClass('imapper-content-below-invisible').html('');


							var pinId = getPinId($(this));

							if (clicked[pinId]===undefined) {//fail safe when there are multiple mappers on the page
								clicked[pinId]=0;
							}
							/*chnages #sliders
							 * slider options
							 */
							/*if(window.console){
								console.log("***Clicked Pin ***",{id:id,pinId:pinId,c:clicked});
							
							}*/
							/*
							 * 
							 */

							/*var cpWidth = ($(window).width() <= 600  && designStyle == 'responsive') ? ($(this).parent().parent().width() / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
								$(this).parent().css('transform').indexOf(',')))) : width;
							*/
							if (clicked[pinId] == 0)
							{
								
								
								/**
								 * Hide hover element
								 */
								var my_content_123456='#imapper'+id+'-pin'+pinId+'';
								my_admin_debug("Trigger mouse leave",my_content_123456);
								$(my_content_123456).trigger('mouseleave');
								//$(".imapper"+id+"-pin").css('z-index',1);
								$(".imapper"+id+"-pin-wrapper").css('z-index',1);
							var contentOpenPosition = $(this).closest('.imapper-pin-wrapper').data('open-position');
							
								var properties = {opacity: 1};
								var properties2 = {};
								var duration = {duration: 300, queue: true};

									var rightPos = 0;
									var bottomPos = 0;

								if (settings.slideAnimation == true) {
										switch (contentOpenPosition) {
											case 'top':
											case 'bottom':
												bottomPos = parseInt($(this).siblings('.imapper-content-wrapper').css('bottom'));
												var duration = {duration: 300, queue: true, always: function() {
															$(this).css({'bottom':bottomPos+'px'});
													}};
											break;
											case 'left':
											case 'right':
												rightPos = parseInt($(this).siblings('.imapper-content-wrapper').css('right'));
												var duration = {duration: 300, queue: true, always: function() {
															$(this).css({'right':rightPos+"px"});
													}};
											break;
										}		
								} 

								var clickedPinId = getPinId($(this));
								/**
								 * Close other pins
								 */						
								$('.imapper' + id + '-pin').each(function() {
									var pid = getPinId($(this));

								 	if (clicked[pid] == 1) {
										$(this).trigger('click');
								 	}

								});

								if (settings.mapOverlay)
									addOverlay($(this),id);
								if(typeof my_click_out_scale_timeout!='undefined')
								clearTimeout(my_click_out_scale_timeout);
								/*if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
								{
									$(this).css('z-index', '12');
									$(this).siblings('.imapper-value-tab-number').css('z-index', '12');
									$(this).siblings('.imapper-content-wrapper').css('z-index', '11');
									
								}
								else
								{
									$(this).siblings('.imapper-content-wrapper').css('z-index', '13');
								}*/
								$(this).siblings('.imapper-content-wrapper').css('z-index', '13');	
								$(this).parent().css('z-index', '100');
								/**
								 * MY animations
								 */
								
								var my_in_animation=$(this).parent('.imapper-pin-wrapper').data('my-in-animation');
								var my_out_animation=$(this).parent('.imapper-pin-wrapper').data('my-out-animation');
								
								my_admin_debug("In animation",my_in_animation);
								my_id_to="imapper"+id+"-pin"+pinId+"-content";//-wrapper";
								my_id_to_wrapper="imapper"+id+"-pin"+pinId+"-content-wrapper";
								my_admin_debug("In animation",my_id_to);
								var my_transition_out=$("#"+my_id_to).data("my-transition-out-1");
								my_admin_debug("Transition out",my_transition_out);
								var my_enable_shadow=$("#"+my_id_to).data('my-enable-shadow');
								$("#"+my_id_to+" .my_product_description").mCustomScrollbar({'scrollInertia':300});
								
								if(my_out_animation=='slideOut'){
									my_admin_debug("Stop animation",my_out_animation);
									$("#"+my_id_to).stop(true,true);
								}
								else {
									$("#"+my_id_to_wrapper).finish();
									$("#"+my_id_to).finish();
								}
								if((typeof my_transition_out !='undefined')&&(my_in_animation!='scaleIn')){
									$("#"+my_id_to_wrapper).css('opacity',0);
									$("#"+my_id_to_wrapper).show();
									$("#"+my_id_to_wrapper).css('visibility','visible');
									//$("#"+my_id_to).css("opacity",0);
									$("#"+my_id_to).css('display','block');
									
									//$("#"+my_hover_id).css('transform','scale(0)');
									/*bilo je
									$("#"+my_id_to).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform 1ms ease 0s");
									*/
									$("#"+my_id_to).css(my_transitions_prefix+'transition','');
									//$("#"+my_id_to).("my_transition_prefix
									$("#"+my_id_to).css(my_transforms_prefix+'transform','scale(1)');
									setTimeout(function(){
										
										$("#"+my_id_to_wrapper).css('opacity',1);
										//$("#"+my_id_to).css("opacity",1);
										$("#"+my_id_to).css(my_transitions_prefix+"transition","");
										$("#"+my_id_to).css(my_transforms_prefix+"transform","");
											
									
									},50);
									$("#"+my_id_to).css('display','none');
								
								}
								if(my_in_animation!=""){
									$("#"+my_id_to_wrapper).css('opacity',1);
									$("#"+my_id_to_wrapper).css('visibility','visible');
									$("#"+my_id_to_wrapper).show();
									//$("#"+my_id_to).css('visibility','visible');
									
									
									if(my_in_animation=="scaleIn"){
										if(my_transform){
											$("#"+my_id_to_wrapper).css('visibility','visible');
											$("#"+my_id_to_wrapper).show();
											$("#"+my_id_to_wrapper).css('opacity',0);
											$("#"+my_id_to).show();
											var my_p_12=my_transforms_prefix+'transform-origin';
											$("#"+my_id_to).css(my_p_12,'50% 50%');
											
											$("#"+my_id_to).data('my-transition-in','scaleIn');
											
											if(typeof my_transition_out =='undefined'){
												//$("#"+my_id_to).css(my_transitions_prefix+'transition',"");
												$("#"+my_id_to).css(my_transforms_prefix+'transform','scale(0)');
											}
											$("#"+my_id_to_wrapper).css('opacity',1);
											my_scale_show_quick_box(id,pinId,settings.animationDuration);
											
										}	
										/**
										 * If use transitions then add css
										 */
										else if(my_transitions&&(settings.useTransitions==1)){
											my_admin_debug("Transition scale in",my_transitions_prefix);
											$("#"+my_id_to_wrapper).css('opacity',0);
											$("#"+my_id_to_wrapper).css('visibility','visible');
											$("#"+my_id_to_wrapper).show();
											$("#"+my_id_to).show();
											$("#"+my_id_to).data('my-transition-in','scaleIn');
											$("#"+my_id_to).css('opacity','0');
											//$("#"+my_id_to).css('display','block');
											/**
											 * bilo je 1ms za ovaj transition 
											 *
											$("#"+my_id_to).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform 1ms ease 0s");
											*/
											if(typeof my_transition_out =='undefined'){
												$("#"+my_id_to).css(my_transitions_prefix+'transition',"");
												$("#"+my_id_to).css(my_transforms_prefix+'transform','scale(0)');
											}
											//my_admin_debug("TRansform prefix",$("#"+my_id_to).css(my_transforms_prefix+'transform'));
											setTimeout(function(){
											$("#"+my_id_to_wrapper).css('opacity',1);
												
											$("#"+my_id_to).css('opacity',1);
											$("#"+my_id_to).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform "+settings.animationDuration+"ms ease 0s");
											$("#"+my_id_to).css(my_transforms_prefix+'transform','scale(1)');
											//$("#"+my_id_to).data('my-transition-in','scaleIn');
											
											
											},10);
											/*setTimeout(function(){
												$("#"+my_id_to_wrapper).show();
											},settings.animationDuration);
											*/
											}
										else {
											my_admin_debug("Normal ui scale");
										//$("#"+my_id_to_wrapper).show('scale',{direction:"both",origin:["middle","left"]},5000);
										
											$("#"+my_id_to).show('scale',{direction:"both"},settings.animationDuration);
										
										///var w=$("#"+my_id_to).parent(".ui-effects-wrapper").width();
										///w+=20;
										//$("#"+my_id_to).parent(".ui-effects-wrapper").width(w);
										}
									}else if(my_in_animation=="fadeIn"){
										//$("#"+my_hover_id).show();
										$("#"+my_id_to).fadeIn(settings.animationDuration);
										
									}else if(my_in_animation=='slideIn'){
										$("#"+my_id_to).show('slide',{direction:'right'},settings.animationDuration,function(){
											//$(this).css('margin-top','');
											//$(this).css('margin-left','');
											
										});
										if(my_enable_shadow){
											var my_hover_id=my_id_to;
											var my_shadow_width=parseInt($("#"+my_id_to).data('my-shadow-width'));
											my_admin_debug("Enable Shadow",my_shadow_width);
											
											var my_hover_width=$("#"+my_id_to).width();
											my_hover_width+=my_shadow_width*4;
											var my_hover_height=$("#"+my_id_to).height();
											my_hover_height+=my_shadow_width*4;
											my_admin_debug("Shadow width",{w:my_hover_width,h:my_hover_height});
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height',my_hover_height+'px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('width',my_hover_width+'px');
											var my_padding=my_shadow_width*2;
											//$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height','70px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-top',my_padding+'px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-left',my_padding+'px');
											//$("#"+my_hover_id).css('margin-top',2*my_shadow_width+'px');
											//$("#"+my_hover_id).css('margin-left',2*my_shadow_width+'px');
											
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+my_padding+'px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+my_padding+'px');
											//$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
										}else {
											var my_hover_id=my_id_to;
											var my_hover_width=$("#"+my_id_to).width();
											my_hover_width+=30;
											//$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height',my_hover_height);
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('width',my_hover_width);
											
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+'15px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+'15px');
											
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding','15px');
										}
									}
								
								}
								
								
								if ($(this).hasClass(pinType2))
								{
									if ($(this).parent().data('open-position') == 'right') {
										properties2 = {width: cpWidth};
									}
									else
										properties2 = {width: cpWidth, marginLeft: 0};
								}
								
								
								/**
								 * No other animations
								 *
								if (settings.slideAnimation) {

							var contentWrapperWidth = $(this).siblings('.imapper-content-wrapper').width();
							var contentWrapperHeight = $(this).siblings('.imapper-content-wrapper').height();
							
							switch (contentOpenPosition) {
									case 'top':
										$(this).siblings('.imapper-content-wrapper').css('bottom',(bottomPos+contentWrapperHeight/5)+"px");
										$(this).stop(true).siblings('.imapper-content-wrapper').css('visibility', 'visible').animate({opacity: 1, bottom: bottomPos+"px"}, duration);
										break;
									case 'bottom':
										$(this).siblings('.imapper-content-wrapper').css('bottom',(bottomPos-contentWrapperHeight/5)+"px");
										$(this).stop(true).siblings('.imapper-content-wrapper').css('visibility', 'visible').animate({opacity: 1, bottom: bottomPos+"px"}, duration);
										break;
									case 'left':
										$(this).siblings('.imapper-content-wrapper').css('right',(rightPos+contentWrapperWidth/5)+"px");
										$(this).stop(true).siblings('.imapper-content-wrapper').css('visibility', 'visible').animate({opacity: 1, right: rightPos+"px"}, duration);
										break;
									case 'right':
										$(this).siblings('.imapper-content-wrapper').css('right',(rightPos-contentWrapperWidth/5)+"px");
										$(this).stop(true).siblings('.imapper-content-wrapper').css('visibility', 'visible').animate({opacity: 1, right: rightPos+"px"}, duration);
										break;
									break;
									default:
										$(this).stop(true).siblings('.imapper-content-wrapper').animate({opacity: 1}, duration);
								}		
						} else {
							$(this).stop(true).siblings('.imapper-content-wrapper').css('visibility', 'visible').animate(properties, duration);
						}*/
								
								if ($(this).hasClass(pinType2))
									$(this).siblings('.imapper-content-wrapper').find('.imapper-content').animate(properties2,
									{
										duration: 400,
										queue: false
									});
								
								$(this).siblings('.imapper-content-wrapper').find('.imapper-content-text').mCustomScrollbar('update');
								clicked[pinId] = 1;
								$(this).addClass('imapper-no-overlay');
							}
							else
							{
								$(".imapper"+id+"-pin-wrapper").css('z-index',13);
								/**
								 * click out pin
								 */
								var my_in_animation=$(this).parent('.imapper-pin-wrapper').data('my-out-animation');
								var my_in_animation_1=$(this).parent('.imapper-pin-wrapper').data('my-in-animation');
								
								my_admin_debug("Out animation",my_in_animation);
								my_id_to_wrapper="imapper"+id+"-pin"+pinId+"-content-wrapper";
								my_id_to="imapper"+id+"-pin"+pinId+"-content";
								$("#"+my_id_to+" .my_product_description").mCustomScrollbar("destroy");
								
								/**
								 * Finish animation
								 */
								if(my_in_animation_1=='slideIn'){
									my_admin_debug("Stop animation",my_in_animation_1);
									$("#"+my_id_to).stop(true,true);
									//$("#"+my_id_to_wrapper).show();
									//$("#"+my_id_to).show();
								}
								else {
									$("#"+my_id_to_wrapper).finish();
									$("#"+my_id_to).finish();
								}
								my_admin_debug("In animation",my_id_to);
								var my_enable_shadow=$("#"+my_id_to).data('my-enable-shadow');
								
								if(my_in_animation!=""){
									//$("#"+my_id_to_wrapper).css('opacity',1);
									if(my_in_animation=="scaleOut"){
										if(my_transform){
											$("#"+my_id_to).data("my-transition-out-1",1);
											$("#"+my_id_to).css('display','block');
											var my_p_12=my_transforms_prefix+'transform-origin';
											$("#"+my_id_to).css(my_p_12,'50% 50%');
											
											my_scale_hide_quick_box(id,pinId,settings.animationDuration);
										}else if(my_transitions&&(settings.useTransitions==1)){
											
											$("#"+my_id_to).data("my-transition-out-1",1);
											
											$("#"+my_id_to).css('display','block');
											$("#"+my_id_to).css(my_transitions_prefix+'transition',my_transforms_prefix+"transform "+settings.animationDuration+"ms ease 0s");
											$("#"+my_id_to).css(my_transforms_prefix+'transform','scale(0)');
											//$("#"+my_id_to).data('my-showed',0);
											my_click_out_scale_timeout=setTimeout(function(){
												$("#"+my_id_to_wrapper).hide();
											},settings.animationDuration);
												
										}else {
										//$("#"+my_id_to).css('transition','all 1000ms');
										
										//.hide('scale',{direction:"both",origin:["middle","middle"]});
										
										$("#"+my_id_to).hide('scale',{direction:"both",origin:["middle","middle"]},settings.animationDuration,function(){
											$(this).parent(".imapper-content-wrapper").css('display','none');
											
										});
										}
									}else if(my_in_animation=="fadeOut"){
										//$("#"+my_hover_id).show();
										$("#"+my_id_to).fadeOut(settings.animationDuration,function(){
											$(this).parent(".imapper-content-wrapper").css('display','none');
											
										});
										
									}else if(my_in_animation=='slideOut'){
										$("#"+my_id_to).hide('slide',{direction:'left'},settings.animationDuration,function(){
											$(this).parent(".imapper-content-wrapper").css('display','none');
											
											});
										
										/**
										 * Show border
										 */
										if(my_enable_shadow){
											var my_hover_id=my_id_to;
											var my_shadow_width=parseInt($("#"+my_id_to).data('my-shadow-width'));
											my_admin_debug("Enable Shadow",my_shadow_width);
											
											var my_hover_width=$("#"+my_id_to).width();
											my_hover_width+=my_shadow_width*4;
											var my_hover_height=$("#"+my_id_to).height();
											my_hover_height+=my_shadow_width*4;
											my_admin_debug("Shadow width",{w:my_hover_width,h:my_hover_height});
											
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height',my_hover_height+'px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('width',my_hover_width+'px');
											
											
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-top',2*my_shadow_width+'px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding-left',2*my_shadow_width+'px');
										
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+2*my_shadow_width+'px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+2*my_shadow_width+'px');
											//$("#"+my_hover_id).parent(" .ui-effects-wrapper").width(my_hover_width);
										}else {
											var my_hover_id=my_id_to;
											var my_hover_width=$("#"+my_id_to).width();
											my_hover_width+=30;
											//$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('height',my_hover_height);
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('width',my_hover_width);
											
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-top','-'+'15px');
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('margin-left','-'+'15px');
											
											
											$("#"+my_hover_id).parent(" .ui-effects-wrapper").css('padding','15px');
											
											
										}
										
									}
								
								}
								//return;
								var properties = {opacity: 0};
								var properties2 = {};
								var duration = {};
								
								if ($(this).hasClass(pinType2))
								{
									if ($(this).parent().data('open-position') == 'right') {
										properties2 = {width: 0};
									}
									else
										properties2 = {width: 0, marginLeft: cpWidth};
										
									duration = {duration: 400, queue: false};
								}
								else
									duration = {
									duration: 400,
									queue: false,
									complete: function() {
										$(this).css('visibility', 'hidden');
									}
								};
								/**
								 * commented dragan no animations 
								 *	
								$(this).siblings('.imapper-content-wrapper').animate(properties, duration);
								*/
								if ($(this).hasClass(pinType2))
									$(this).siblings('.imapper-content-wrapper').find('.imapper-content').animate(properties2,
									{
										duration: 400,
										queue: false,
										complete: function() {
											$(this).parent().css('visibility', 'hidden');
										}
								});
								
								//$(this).css('z-index', '10');
								$(this).siblings('.imapper-value-tab-number').css('z-index', '10');
								//$(this).siblings('.imapper-content-wrapper').css('z-index', '9');

								//$(this).parent().css('z-index', '');
								
								clicked[pinId] = 0;

								$('.imapper'+id+'-pin').removeClass('imapper-no-overlay');

								
							}


						});
						
						$('#imapper' + id + '-map-image').click(function() {//closes the opened items

							imapperClearMap($(this), id, clicked);


						});
					} else if (itemClickAction == 'link' ) {
						$(this).children('.imapper' + id + '-pin').click( function() {

							var link = $(this).parent().data('imapper-link');
							window.open(link);
						});
					} else if (itemClickAction == 'lightboxImage' || itemClickAction == 'lightboxIframe' ) {
						
						$(this).children('.imapper' + id + '-pin').click( function() {

						if ($(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').hasClass('imapper-cb-tabs-version'))
								$(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').addClass('imapper-content-below-invisible');
							else 
								$(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').slideUp().addClass('imapper-content-below-invisible');

							setTimeout(function(){
								$('.imapper'+id+'-content-below').html('');
							
							},400);


							$(this).siblings('.imapper-pretty-photo').trigger('click');
							
							
						});
					} else if (itemClickAction == 'contentBelow') {
						$(this).children('.imapper' + id + '-pin').click( function() {

							
							imapperClearMap($('#imapper'+id+'-map-image'), id, clicked);

							var pinId = getPinId($(this));
							
							var isPinOpen = $('.content-below-pin-'+pinId).length;

							if ( isPinOpen == 0 ) {

								if (settings.mapOverlay)
								addOverlay($(this),id);

								var contentHeader = $(this).siblings('.imapper-content-wrapper').find('.imapper-content-header').html();
								var contentText = $(this).siblings('.imapper-content-wrapper').find('.imapper-content-text').html();
								$(this).closest('.imagemapper-wrapper').siblings('.imapper'+id+'-content-below').css('display','block').addClass('imapper-content-below-invisible');

								
								
								if ($(this).siblings('.imapper-content-wrapper').find('.imapper-content').length>1) {
									
										var cbContent = '<div class="imapper-cb-content-wrapper content-below-pin-'+pinId+'">';
										var cbTabs = '<div class="imapper-cb-tabs">';
										var i = 1;

									$(this).siblings('.imapper-content-wrapper').find('.imapper-content').each(function(){

										var cbHeader = $(this).find('.imapper-content-header').html();
										var cbText = $(this).find('.imapper-content-text').html();

										cbTabs +='<div class="imapper-cb-tab-wrapper '+( i==1 ? "imapper-cb-tab-active" : "" )+'"><a class="imapper-cb-tab" href="imapper'+ id +'-pin'+pinId+'-cb-content-'+i+'">'+i+'</a><div class="imapper-category-arrow-bottom"></div></div>';
										cbContent += '<div class="imapper-cb-content '+( i==1 ? "imapper-cb-content-active" : "" )+'" id="imapper'+ id +'-pin'+pinId+'-cb-content-'+i+'"><div class="content-below-header">'+cbHeader+'</div><div class="content-below-text">'+cbText+'</div></div>';
										i++;
									});

									cbContent+='</div>';
									cbTabs+='</div>';
								$('.imapper'+id+'-content-below').html(cbTabs+cbContent).addClass('imapper-cb-tabs-version');
								 $('.imapper'+id+'-content-below').removeClass('imapper-content-below-invisible');
								}
								else {
									$('.imapper'+id+'-content-below').html('<div class="content-below-header content-below-pin-'+pinId+'">'+contentHeader+'</div><div class="content-below-text">'+contentText+'</div>');
									 $('.imapper'+id+'-content-below').removeClass('imapper-content-below-invisible').css('display','none').slideDown();
									
								}

								$('.imapper'+id+'-content-below .content-below-text *').removeClass();

							} else {
								$('#imapper' + id + '-map-image').trigger('click');
							}
						});

						$('#imapper' + id + '-map-image').click(function() {
							if ($(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').hasClass('imapper-cb-tabs-version'))
								$(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').addClass('imapper-content-below-invisible');
							else 
								$(this).closest('.imagemapper-wrapper').siblings('.imapper-content-below').slideUp().addClass('imapper-content-below-invisible');

							setTimeout(function(){
								$('.imapper'+id+'-content-below ').html('');
							
							},400);


							imapperClearMap($(this), id, clicked);
						});

						$(document).on('click','.imapper-cb-tab-wrapper',function(e){
							e.preventDefault();
							var contentId = $(this).children('.imapper-cb-tab').attr('href');
							$(this).addClass('imapper-cb-tab-active').siblings().removeClass('imapper-cb-tab-active');
							$('#'+contentId).addClass('imapper-cb-content-active').siblings().removeClass('imapper-cb-content-active');
						});
					}

				}

				$(document).on('click','.imapper-close-button', function() {

					var el = $('#imapper'+id+'-map-image');


					 if (settings.itemOpenStyle == 'hover' || $(this).closest('.imapper-pin-wrapper').data('imapper-hover-action') == 'content' )
						$(this).closest('.imapper-pin-wrapper').trigger('mouseleave');
					else 
						$(this).parent().siblings('.imapper' + id + '-pin').trigger('click');
				
					 imapperClearMap(el, id, clicked);
				});

				initAreaPinsBlur(settings,id);

		


			});//End content actions

			$(document).on('click','.imapper-category-item-wrapper', function(e) {//button for closing the pin content which is visible in responsive mode
				e.preventDefault();
				var catName = $(this).children('.imapper-category-button').attr('href');
/**
 * Categories
 */
$(this).addClass('imapper-category-active').siblings().removeClass('imapper-category-active');

				if (catName!='All') {
					var pinWrappers = $(this).closest('.imapper-categories-wrapper').nextAll('.imagemapper-wrapper').first().children('.imapper-pin-wrapper');
					pinWrappers.addClass('imapper-category-hidden').filter('[data-category=\''+catName+'\']').removeClass('imapper-category-hidden').addClass('imapper-category-visible');
					var catPins = pinWrappers.filter(':not(.imapper-category-hidden) > .imapper' + id + '-pin');
					var pinVisibleFlag = false;
					var pinId;
					catPins.each(function(){
						pinId = getPinId($(this));
						if (clicked[pinId] == 1)
							pinVisibleFlag = true;
						if ($('.content-below-pin-' + pinId).length > 0)
							pinVisibleFlag = true;
					});

					if (!pinVisibleFlag) {
						imapperClearMap($('#imapper'+id+'-map-image'), id, clicked);
						$('#imapper' + id + '-map-image').trigger('click');
					}
					
				} else {

					$('.imapper' + id + '-pin-wrapper').removeClass('imapper-category-hidden').addClass('imapper-category-visible');

				}
							});
				
			
			$('.imapper' + id + '-pin').each(function() {
				var pinId = getPinId($(this));
				
				contentWrapperOld[pinId] = [ $(this).parent().find('.imapper-content-wrapper').css('top'), $(this).parent().find('.imapper-content-wrapper').css('left'), 
					$(this).parent().find('.imapper-content-wrapper').css('width'), $(this).parent().find('.imapper-content-wrapper').css('height'), $(this).parent().find('.imapper-content-wrapper').css('z-index') ];
				
				contentOld[pinId] = [ $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('top'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('left'), 
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('width'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('height'),  
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('bottom'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('right')];
				
				contentHeaderOld[pinId] = [ $(this).parent().find('.imapper-content-header').css('width'), $(this).parent().find('.imapper-content-header').css('font-size'), 
					$(this).parent().find('.imapper-content-header').css('padding-left') ];
				
				contentTextOld[pinId] = [ $(this).parent().find('.imapper-content-text').css('width'), $(this).parent().find('.imapper-content-text').css('height'), 
					$(this).parent().find('.imapper-content-text').css('margin-top'), $(this).parent().find('.imapper-content-text').css('font-size'), $(this).parent().find('.imapper-content-text').css('padding-left') ];
				
				$(this).parent().find('.imapper-content-tab').each(function(index) {
					contentTabOld[pinId][index] = [ $(this).css('width'), $(this).css('height'), $(this).css('bottom'), $(this).css('right') ];	
				});
				
				$(this).parent().find('.imapper-content-additional').each(function(index) {
					contentAdditionalOld[pinId][index] = [ $(this).css('width'), $(this).css('height'), $(this).css('bottom'), $(this).css('right') ];
				});
			});//Save content width height of old wrappers
			/**
			 * Change this function without transform coefficient
			 */
			/**
			 * New function for position of elements;
			 */
			my_position_of_pin_window=function(id){
				if ($(window).width() <= settings.responsiveWidth  && designStyle == 'responsive')
				{	
					$("#imagemapper"+id+"-wrapper").data('my-small',1);
					var mapHeight = $('.imapper'+id+'-map-image').height();
					
					var my_map_h=$("#imapper"+id+"-map-image").height();
					var my_map_w=$("#imapper"+id+"-map-image").width();
					/*if(window.console){
						console.log("Width Image",{my_map_h:my_map_h,my_map_w:my_map_w});
					}*/	
					my_admin_debug("Rwponsive mapHeight",mapHeight);
					my_admin_debug("Map",{w:my_map_w,h:my_map_h});
					var my_transform_coeff=1;
					
					$('.imapper' + id + '-pin').each(function() {
						var pinId = getPinId($(this));
						var my_do_small=false;
						
						if(my_transform){
							my_do_small=my_add_transform_small(id,pinId);
						}
						if(!my_do_small){
						/*var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
							$(this).parent().css('transform').indexOf(',')))) + 'px';
						*/
							/*if(window.console){
								console.log("Small - new transform");
								console.log('Transform ',$(this).parent().find(".imapper-content-wrapper").css(my_transforms_prefix+'transform'));
							}*/
						$(this).parent().find(".imapper-content-wrapper").css(my_transforms_prefix+'transform','scale(1)');
						/*if(window.console){
							console.log("Small - new transform");
							console.log('Transform ',$(this).parent().find(".imapper-content-wrapper").css(my_transforms_prefix+'transform'));
						}*/
						var my_left_p=parseFloat($(this).parent().css('left'));
						my_admin_debug("My left p",my_left_p);
						var positionLeft=-((parseFloat($(this).parent().css('left')))/my_transform_coeff)+'px';
					
						/*positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
								$(this).css('transform').indexOf(',')))) + 'px';
							*/	
						my_admin_debug("position left",positionLeft);	
							var parentTopPercent = parseInt($(this).parent().data('top'))/100;
							var mapHeight = parseInt($(this).closest('.imagemapper-wrapper').height());
							my_admin_debug("map height",mapHeight);
							var part1 = mapHeight*parentTopPercent / my_transform_coeff;
							//var iconHeight = parseInt($(this).outerHeight()) * parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
							//$(this).css('transform').indexOf(',')));
							$(this).parent().find(".my-imapper-arrow-new-1234").hide();
							
							positionTop =  - (part1) + "px";
							my_admin_debug("position top",positionTop);	
						/**
						 * My calculation
						 */
						//var my_top=my_map_h*parseFloat()	
						
							
						var position = $(this).parent().data('open-position');
						
						var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-right-radius')) / 2 + 1;
						if(my_map_h<200){
							var old_map_h=my_map_h;
							//my_map_h=200;
							//positionTop-=Math.abs(my_map_h-old_map_h)/2;
						}
						/**
						 * 
						 */
						
						$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width + 'px', 'height': map_original_height + 'px', 'z-index': '15'});
						$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
						/**
						 * Try with
						 */
						var my_enable_shadow=$(this).parent().find(".imapper-content").data('my-enable-shadow');
						var my_shadow_width=parseInt($(this).parent().find(".imapper-content").data('my-shadow-width'));
						my_admin_debug("Shadow",{my_e:my_enable_shadow,my_shadow_width:my_shadow_width});
						var my_i_w=my_map_w;
						var my_i_h=my_map_h;
						var my_i_top=0;
						var my_i_left=0;
						/*if(my_enable_shadow==1){
							my_i_w-=my_shadow_width*2;
							my_i_h-=my_shadow_width*2;
							my_i_top=my_shadow_width;
							my_i_left=my_shadow_width;
						}*/
						//$(this).parent().find('.imapper-content-wrapper').css('right','');
						//$(this).parent().find('.imapper-content-wrapper').css('bottom','');
						var my_i_w_12345=my_i_w-50;
						$(this).parent().find(".imapper-content .my_product_title_inner").attr('style','width:'+(my_i_w_12345)+'px !important;');
						
						$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': my_map_w + 'px', 'height': my_map_h + 'px', 'z-index': '15'});
						$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': my_i_top+'px', 'left': my_i_left+'px', 'width': my_i_w + 'px', 'height': my_i_h + 'px'});
						var my_h_1=$(this).parent().find('.imapper-content .my_product_header').data('my-height');
						var my_h_2=$(this).parent().find('.imapper-content .my_product_footer').data('my-height');
						my_h_1=parseInt(my_h_1);
						my_h_2=parseInt(my_h_2);
						my_admin_debug("My h 1",{my_h_1:my_h_1,my_h_2:my_h_2});
						var my_h_t=my_h_1+my_h_2;
						var my_h_t_2=my_map_h-my_h_t;
						/**
						 * DEscription height
						 */
						var my_height_price=$(this).parent().find('.imapper-content-wrapper .my_product_price').outerHeight();
						var my_descr_height=my_h_t_2-my_height_price;
						/*if(window.console){
							console.log('Description height',{my_dscr_height:my_descr_height,my_h_t_2:my_h_t_2,my_height_price:my_height_price});
						}*/
						$(this).parent().find(".imapper-content-wrapper .my_product_description").height(my_descr_height+'px');
						
						//my_product_description_height(obj,my_h);
						$(this).parent().find('.imapper-content .my_product_main').height(my_h_t_2);
						var my_w_1=my_map_w/2;
						$(this).parent().find(".imapper-content .my_product_footer .my_view_item_category div").attr('style','width:'+my_map_w+'px !important;');
						
						$(this).parent().find(".imapper-content .my_product_footer .my_view_item div").attr('style','width:'+my_w_1+'px !important;');
						$(this).parent().find(".imapper-content .my_product_footer .my_add_item div").attr('style','width:'+my_w_1+'px !important;');
						
						return;
						}
						
						
						//$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
						
						/*if ($(this).hasClass(pinType2))
						{

							if (clicked[pinId] == 0)
							{
								$(this).parent().find('.imapper-content').css('width', '0px');
								if (position == 'left')
									$(this).parent().find('.imapper-content').css('margin-left', map_original_width + 'px');
							}
							else
							{
								$(this).parent().find('.imapper-content').css('width', map_original_width + 'px');
								if (position == 'left')
									$(this).parent().find('.imapper-content').css('margin-left', '0px');
							}

							
						}
						else if ($(this).hasClass(pinType1))
						{*/
							if (position == 'left' || position == 'right')
							{
								$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'height': cHeight[pinId], 'top': '', 'bottom': '0px'});
								
								var bottom = cHeight[pinId];
								var bottom_content = cHeight[pinId] + (75 - radius);
								$(this).parent().find('.imapper-content-tab').each(function() {
									$(this).css({'width': map_original_width, 'height': '75px', 'bottom': bottom});
									$(this).find('a').css({'height': '75px', 'font-size': '24px'});
									bottom += 75 - radius;
								});
								$(this).parent().find('.imapper-content-additional').each(function() {
									$(this).css({'width': map_original_width, 'bottom': bottom_content});
									bottom_content += 75 - radius;	
								});
							}
							
								if (position == 'top' || position == 'bottom')
							{
								$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'width': cWidth[pinId], 'left': '', 'right': '0px'});
								
								var right = cWidth[pinId];
								var right_content = cWidth[pinId] + (75 - radius);
								$(this).parent().find('.imapper-content-tab').each(function() {
									$(this).css({'height': map_original_height, 'width': '75px', 'right': right});
									$(this).find('a').css({'width': '75px', 'font-size': '24px', 'height': map_original_height});
									right += 75 - radius;
								});
								$(this).parent().find('.imapper-content-additional').each(function() {
									$(this).css({'height': map_original_height, 'right': right_content});
									right_content += 75 - radius;	
								});
							}
						//}

						$(this).parent().find('.imapper-content-header').css({'width': map_original_width - 30 + 'px', 'font-size': parseInt($(this).parent().find('.imapper-content-header').css('font-size')) * 2 + 'px', 
							'padding-left': '20px'});
						
						var textHeight = $(this).parent().find('.imapper-content').height() - $(this).parent().find('.imapper-content-header').height() - 50;
						$(this).parent().find('.imapper-content-text').css({'width': map_original_width - 30 + 'px', 'height': textHeight, 'margin-top': '70px', 
							'font-size': parseInt($(this).parent().find('.imapper-content-text').css('font-size')) * 2 + 'px', 'padding-left': '20px'});
							
						$(this).parent().find('.imapper-content-text').each(function() {
							$(this).mCustomScrollbar('update');
						});
						
						$(this).parent().find('.imapper-arrow').css('display', 'none');
						$(this).parent().find('.imapper-arrow-border').css('display', 'none');
						$(this).parent().find('.imapper-triangle-border').css('display', 'none');

						/*var pos = $(this).attr('src').indexOf('/images/');
						pluginUrl = $(this).attr('src').substring(0, pos);
						
						$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + '/images/close.jpg">');
						$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer'});
						*/
					});
				}else {
				 var my_small=$("#imagemapper"+id+"-wrapper").data('my-small');
				 my_admin_debug("My small",my_small);
				 if(typeof my_small!='undefined'){
					 $('.imapper' + id + '-pin').each(function() {
							
						 $(this).parent().find(".imapper-content .my_product_title_inner").attr('style','');
					 });
						 return;
						var my_map_h=$("#imapper"+id+"-map-image").height();
						var my_map_w=$("#imapper"+id+"-map-image").width();
						
						my_admin_debug("Rwponsive mapHeight",mapHeight);
						my_admin_debug("Map",{w:my_map_w,h:my_map_h});
						var my_transform_coeff=1;
						
					 $('.imapper' + id + '-pin').each(function() {
						 //$(this).parent().find(".imapper-arrow-new").show();
							
						
							var pinId = getPinId($(this));
							var position = $(this).parent().data('open-position');
							
							cHeight[pinId] = height;
							cWidth[pinId] = width;
							
							$(this).parent().find('.imapper-content-wrapper').css({'top': contentWrapperOld[pinId][0], 'left': contentWrapperOld[pinId][1], 'width': contentWrapperOld[pinId][2], 
								'height': contentWrapperOld[pinId][3], 'z-index': contentWrapperOld[pinId][4]});

							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': contentOld[pinId][0], 'left': contentOld[pinId][1], 'width': contentOld[pinId][2], 'height': contentOld[pinId][3]});
							
							if ($(this).hasClass(pinType2) && position == 'left')
							{
								if (clicked[pinId] == 0)
									$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', width);
								else
									$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', '0px');
							}
							else if ($(this).hasClass(pinType1))
							{
								tab_clicked[pinId] = 1;
								if (position == 'left' || position == 'right')
								{			
									$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('top', '');
									$(this).parent().find('.imapper-content-tab').each(function(index) {
										$(this).css({'width': contentTabOld[pinId][index][0], 'height': contentTabOld[pinId][index][1], 'bottom': contentTabOld[pinId][index][2]});
										$(this).find('a').css({'height': '', 'font-size': '12px'});
									});
									$(this).parent().find('.imapper-content-additional').each(function(index) {
										$(this).css({'width': contentAdditionalOld[pinId][index][0], 'height': contentAdditionalOld[pinId][index][1], 'bottom': contentAdditionalOld[pinId][index][2]});
									});
								}
								else if (position == 'top' || position == 'bottom')
								{
									$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '', 'left': ''});
									$(this).parent().find('.imapper-content-tab').each(function(index) {
										$(this).css({'width': contentTabOld[pinId][index][0], 'height': contentTabOld[pinId][index][1], 'right': contentTabOld[pinId][index][3]});
										$(this).find('a').css({'width': '', 'font-size': '12px', 'height': contentTabOld[pinId][index][1]});
									});
									$(this).parent().find('.imapper-content-additional').each(function(index) {
										$(this).css({'width': contentAdditionalOld[pinId][index][0], 'height': contentAdditionalOld[pinId][index][1], 'right': contentAdditionalOld[pinId][index][3]});
									});
								}
							}
							
							$(this).parent().find('.imapper-content-header').css({'width': contentHeaderOld[pinId][0], 'font-size': contentHeaderOld[pinId][1], 'padding-left': contentHeaderOld[pinId][2]});
							$(this).parent().find('.imapper-content-text').css({'width': contentTextOld[pinId][0], 'height': contentTextOld[pinId][1], 'margin-top': contentTextOld[pinId][2], 
								'font-size': contentTextOld[pinId][3], 'padding-left': contentTextOld[pinId][4]});
							
							$(this).parent().find('.imapper-content-text').each(function() {
								$(this).mCustomScrollbar('update');
							});
							/*
							 * dont display arrows
							$(this).parent().find('.imapper-arrow').css('display', 'block');
							$(this).parent().find('.imapper-arrow-border').css('display', 'block');
							$(this).parent().find('.imapper-triangle-border').css('display', 'block');
							*/
							$(this).parent().find('.imapper-close-button').remove();
							 	my_map_h=parseInt($(this).parent().find(".imapper-content-wrapper").data('height'));
								var my_h_1=$(this).parent().find('.imapper-content .my_product_header').data('my-height');
								var my_h_2=$(this).parent().find('.imapper-content .my_product_footer').data('my-height');
								my_h_1=parseInt(my_h_1);
								my_h_2=parseInt(my_h_2);
								my_admin_debug("My h 1",{my_h_1:my_h_1,my_h_2:my_h_2});
								var my_h_t=my_h_1+my_h_2;
								var my_h_t_2=my_map_h-my_h_t;
								$(this).parent().find('.imapper-content .my_product_main').height(my_h_t_2);
								var my_w_1=my_map_w/2;
								$(this).parent().find(".my_product_footer .my_view_item_category div").attr('style','width:'+my_map_w+'px !important;');
								
								$(this).parent().find(".my_product_footer .my_view_item div").attr('style','width:'+my_w_1+'px !important;');
								$(this).parent().find(".my_product_footer .my_add_item div").attr('style','width:'+my_w_1+'px !important;');
									
						});
					}
				}
					  
				
			};
			/**
			 * Resposive design widnow
			 */
			my_position_of_pin_window(id);
			/**
			 * Depreaced not using this
			 */
			if ($(window).width() <= 600  && designStyle == 'responsive' && (settings.oldResponsive==1))
			{
					
				var mapHeight = $('.imapper'+id+'-map-image').height();
				
				var my_map_h=$("#imapper"+id+"-map-image").height();
				var my_map_w=$("#imapper"+id+"-map-image").width();
				
				my_admin_debug("Rwponsive mapHeight",mapHeight);
				var my_transform_coeff=1;
				
				$('.imapper' + id + '-pin').each(function() {
					
					var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
					positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
							$(this).css('transform').indexOf(',')))) + 'px';
							
					my_admin_debug("position left",positionLeft);	
						var parentTopPercent = parseInt($(this).parent().data('top'))/100;
						var mapHeight = parseInt($(this).closest('.imagemapper-wrapper').height());
						my_admin_debug("map height",mapHeight);
						var part1 = mapHeight*parentTopPercent / parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
						$(this).css('transform').indexOf(',')));
						var iconHeight = parseInt($(this).outerHeight()) * parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
						$(this).css('transform').indexOf(',')));
						$(this).parent().find(".imapper-arrow-new").hide();
						
						positionTop =  - (part1) + "px";
						my_admin_debug("position top",positionTop);
						
					/**
					 * My calculation
					 */
					//var my_top=my_map_h*parseFloat()	
					var pinId = getPinId($(this));	
					var position = $(this).parent().data('open-position');
					
					var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-right-radius')) / 2 + 1;
					/**
					 * 
					 */
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width + 'px', 'height': map_original_height + 'px', 'z-index': '15'});
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
					/**
					 * Try with
					 */
					var my_enable_shadow=$(this).parent().find(".imapper-content").data('my-enable-shadow');
					var my_shadow_width=parseInt($(this).parent().find(".imapper-content").data('my-shadow-width'));
					my_admin_debug("Shadow",{my_e:my_enable_shadow,my_shadow_width:my_shadow_width});
					var my_i_w=my_map_w;
					var my_i_h=my_map_h;
					var my_i_top=0;
					var my_i_left=0;
					/*if(my_enable_shadow==1){
						my_i_w-=my_shadow_width*2;
						my_i_h-=my_shadow_width*2;
						my_i_top=my_shadow_width;
						my_i_left=my_shadow_width;
					}*/
					$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': my_map_w + 'px', 'height': my_map_h + 'px', 'z-index': '15'});
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': my_i_top+'px', 'left': my_i_left+'px', 'width': my_i_w + 'px', 'height': my_i_h + 'px'});
					var my_h_1=$(this).parent().find('.imapper-content .my_product_header').data('my-height');
					var my_h_2=$(this).parent().find('.imapper-content .my_product_footer').data('my-height');
					my_h_1=parseInt(my_h_1);
					my_h_2=parseInt(my_h_2);
					my_admin_debug("My h 1",{my_h_1:my_h_1,my_h_2:my_h_2});
					var my_h_t=my_h_1+my_h_2;
					var my_h_t_2=my_map_h-my_h_t;
					$(this).parent().find('.imapper-content .my_product_main').height(my_h_t_2);
					var my_w_1=my_map_w/2;
					$(".my_product_footer .my_view_item div").attr('style','width:'+my_w_1+'px !important;');
					$(".my_product_footer .my_add_item div").attr('style','width:'+my_w_1+'px !important;');
					
					
					
					
					
					//$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
					
					/*if ($(this).hasClass(pinType2))
					{

						if (clicked[pinId] == 0)
						{
							$(this).parent().find('.imapper-content').css('width', '0px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', map_original_width + 'px');
						}
						else
						{
							$(this).parent().find('.imapper-content').css('width', map_original_width + 'px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', '0px');
						}

						
					}
					else if ($(this).hasClass(pinType1))
					{*/
						if (position == 'left' || position == 'right')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'height': cHeight[pinId], 'top': '', 'bottom': '0px'});
							
							var bottom = cHeight[pinId];
							var bottom_content = cHeight[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'width': map_original_width, 'height': '75px', 'bottom': bottom});
								$(this).find('a').css({'height': '75px', 'font-size': '24px'});
								bottom += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'width': map_original_width, 'bottom': bottom_content});
								bottom_content += 75 - radius;	
							});
						}
						
							if (position == 'top' || position == 'bottom')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'width': cWidth[pinId], 'left': '', 'right': '0px'});
							
							var right = cWidth[pinId];
							var right_content = cWidth[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'height': map_original_height, 'width': '75px', 'right': right});
								$(this).find('a').css({'width': '75px', 'font-size': '24px', 'height': map_original_height});
								right += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'height': map_original_height, 'right': right_content});
								right_content += 75 - radius;	
							});
						}
					//}

					$(this).parent().find('.imapper-content-header').css({'width': map_original_width - 30 + 'px', 'font-size': parseInt($(this).parent().find('.imapper-content-header').css('font-size')) * 2 + 'px', 
						'padding-left': '20px'});
					
					var textHeight = $(this).parent().find('.imapper-content').height() - $(this).parent().find('.imapper-content-header').height() - 50;
					$(this).parent().find('.imapper-content-text').css({'width': map_original_width - 30 + 'px', 'height': textHeight, 'margin-top': '70px', 
						'font-size': parseInt($(this).parent().find('.imapper-content-text').css('font-size')) * 2 + 'px', 'padding-left': '20px'});
						
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).mCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'none');
					$(this).parent().find('.imapper-arrow-border').css('display', 'none');
					$(this).parent().find('.imapper-triangle-border').css('display', 'none');

					/*var pos = $(this).attr('src').indexOf('/images/');
					pluginUrl = $(this).attr('src').substring(0, pos);
					
					$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + '/images/close.jpg">');
					$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer'});
					*/
				});
			}//window width <600 show at 0px 0px of image set width height of image width 
			$(window).resize(function() {
				/**
				 * Scalling pins
				 */
				
				//$("div[id*='imagemapper']").each( function() {
				$("#imagemapper"+id+"-wrapper").each(function(){
					var my_small=$("#imagemapper"+id+"-wrapper").data('my-small');
					 my_admin_debug("My small",my_small);
					
					var id = $(this).attr('id').substring(11, $(this).attr('id').indexOf('-'));
					my_admin_debug("Window resize Pin id",id);
					var wrapperWidth = $('#imapper' + id + '-map-image').css('width');
				    $('.imapper'+id+'-content-below').css('maxWidth',wrapperWidth);

					var parent_width = ($(this).parent().width() < map_original_width) ? $(this).parent().width() : map_original_width;
					my_admin_debug("Parent width "+id,{parent_width:parent_width,map_w:map_original_width});
					/*chnages #sliders
					 * slider options
					 */
					if(typeof $(this).data('my-slider')!=='undefined'){
						my_w_12345_1234=$(this).parents(".my_fotorama_outter").width();
						/*if(window.console){
							console.log("***Is slider**",{map:map_original_width,parent_width:parent_width,new_w:my_w_12345_1234});
						}*/
						if(my_w_12345_1234<map_original_width){
							parent_width=my_w_12345_1234;
						}else {
							parent_width=map_original_width;
							}
					}
					/**
					 * Debug
					 */
					/*if(window.console){
							console.log("***REsize widnow **",{map:map_original_width,parent_width:parent_width});
						}*/
					
					
					$(this).css('width', parent_width);
					var my_window_width=parseInt($(window).width());
					/**
					 * Scalling pins to smaller window sizes
					 * or normal window size
					 */
					my_function_scalling_pins(id);
					my_position_of_pin_window(id);
					if(my_window_width<=settings.responsiveWidth){
						/**
						 * Reposisve position of pins and content
						 * windows
						 */
						var my_obj_1234_os=$(this).find(".my_product_description");
						if($(this).is(":visible")){
							/*if(window.console){
								console.log('Pin is visible');
							}*/
							$(my_obj_1234_os).mCustomScrollbar('update');
							
						}
						//$(my_obj_1234_os).mCustomScrollbar('update');
						
					}else {
						var my_obj_1234_os=$(this).find(".my_product_description");
						if($(this).is(":visible")){
							/*if(window.console){
								console.log('Pin is visible');
							}*/
							$(my_obj_1234_os).mCustomScrollbar('update');
							
						}
						//$(my_obj_1234_os).mCustomScrollbar('update');
						
						/**
						 * Position of hover images
						 */
						my_content_position_function(id);
						/**
						 * Go trough pins and check position left right
						 */
						$('.imapper' + id + '-pin-content-wrapper').each(function(i,v){
							 var my_small=$("#imagemapper"+id+"-wrapper").data('my-small');
								
							var my_id_123=$(this).attr('id');
							my_id_123=my_id_123.replace('imapper'+id+'-pin','');//3-content-wrapper')
							my_id_123=my_id_123.replace('-content-wrapper','');
							my_admin_debug("Go throufh pins Id",{immaper_id:id,pin_id:my_id_123});
							
							var position = $(this).parent().data('open-position');
							var width=parseInt($(this).data('width'));
							var height=parseInt($(this).data('height'));
							var my_add_width=20;
							var my_add_height=20;
							var my_width=width+my_add_width;
							var my_height=height+my_add_height;
							/**
							 * Bilo je height i width promenjeno
							 * za width i height
							 */
							var img_width = $(this).parent().find('.imapper' + id + '-pin').outerWidth();
							var img_height = $(this).parent().find('.imapper' + id + '-pin').outerHeight();
							var borderColor = $(this).data('border-color');
							my_admin_debug("Data of resize",{width:width,height:height,img_width:img_width,img_height:img_height});
							//$(this).find('imapper-content').data('my-enable-shadow');
							var old_pos=$(this).data('my-new-position');
							var my_get_position=my_get_content_position(id,this,position);
							position=my_get_position;
							/*chnages #sliders
							 * slider options
							 */
							/*if(window.console){
								console.log('**Resize imapper**'+id,{img_width:img_width,img_height:img_height,old_pos:old_pos,position:position});
								
							}*/
							/**
							 * 
							 */
							my_admin_debug("Change position",{position:position,old_pos:old_pos});
							/**
							 * Chage position
							 */
							if((old_pos!=position)|| (typeof my_small!='undefined')){
								if(typeof my_small!='undefined'){
									$(this).css('left','');
									$(this).css('top','');
									$(this).width(my_width);
									$(this).height(my_height);
									if(my_transform){
										var my_transforms_prefix_new=my_transforms_prefix+'transform';
										$(this).css(my_transforms_prefix_new,'scale(1)');
									}
									$(this).find('.imapper-content').width(width);
									$(this).find('.imapper-content').height(height);
									/*depreced right don't set
									$(this).find('.imapper-content').css('right','0px');
									*/
									$(this).find('.imapper-content').css('left','');
									
									var my_h_1=$(this).find('.imapper-content .my_product_header').data('my-height');
									var my_h_2=$(this).find('.imapper-content .my_product_footer').data('my-height');
									my_h_1=parseInt(my_h_1);
									my_h_2=parseInt(my_h_2);
									my_admin_debug("My h 1",{my_h_1:my_h_1,my_h_2:my_h_2});
									var my_h_t=my_h_1+my_h_2;
									var my_h_t_2=height-my_h_t;
									/**
									 * Description height
									 */
									var my_height_price=$(this).find(".my_product_price").outerHeight();
									var my_descr_height=my_h_t_2-my_height_price;
									$(this).find(".my_product_description").height(my_descr_height+'px');
									
									$(this).find('.imapper-content .my_product_main').height(my_h_t_2);
									var my_w_1=width/2;
									$(this).find(".my_product_footer .my_view_item_category div").attr('style','width:'+width+'px !important;');
									$(this).find(".my_product_footer .my_view_item div").attr('style','width:'+my_w_1+'px !important;');
									$(this).find(".my_product_footer .my_add_item div").attr('style','width:'+my_w_1+'px !important;');
									
									
								}
								//$(this).css({right:'0px',bottom:'0px'});
								var my_right_pos=$(this).css('right');
								var my_bottom_pos=$(this).css('bottom');
								my_change_content_position(id,my_id_123,position);
								$(this).data('my-new-position',position);
								/*
								
								
								
								var my_hide=[];
								$(this).find(".imapper-content .imapper-arrow-new-right").show();
								$(this).find(".imapper-content .imapper-arrow-new").show();
								$(this).find(".imapper-content .imapper-arrow-new-top").show();
								$(this).find(".imapper-content .imapper-arrow-new-bottom").show();
								
								if(position=='right'){
									my_hide=['imapper-arrow-new-right','imapper-arrow-new-top','imapper-arrow-new-bottom'];
									//$(this).find(".imapper-content .imapper-arrow-new-right").hide();
									//$(this).find(".imapper-content .imapper-arrow-new-right").hide();
									
								}else if(position=='left'){
									my_hide=['imapper-arrow-new','imapper-arrow-new-top','imapper-arrow-new-bottom'];
									
								}else if(position=='top'){
									my_hide=['imapper-arrow-new-right','imapper-arrow-new','imapper-arrow-new-bottom'];
									
								}else if(position=='bottom'){
									my_hide=['imapper-arrow-new-right','imapper-arrow-new-top','imapper-arrow-new'];
									
								}
								var my_obj=$(this);
								$.each(my_hide,function(i,v){
									my_obj.find(".imapper-content ."+v).hide();
									
								});
								
							
								if (position == 'top') 
								{	
								
									$(this).find('.imapper-content').css('position', 'absolute');
									$(this).find('.imapper-content').css('right', '0px');
									
									$(this).find('.arrow-top-border').css('top', height + 1 + 'px');
									$(this).find('.arrow-top-border').css('left', width/2 - 11 + 'px');
									$(this).find('.arrow-top-border').css('border-top-color', borderColor);
								
									$(this).css('width', width + 'px');
									$(this).css('height', height + img_height/4 + 35 + 'px');
									$(this).css('right', width/2 + 'px');
									$(this).css('bottom', height + img_height + 40 + 'px');
									
									if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
									{
										$(this).css('right', width/2 - 4 + 'px');
										$(this).css('bottom', height + 50 + 'px');
									}
									else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
									$(this).css('bottom', height + img_height + 20 + 'px');
										
									$(this).find('.imapper-arrow').addClass('arrow-down');
									$(this).find('.imapper-arrow').css('top', height + 'px');
								}
								else if (position == 'bottom')
								{
								
									
									$(this).find('.imapper-content').css('position', 'absolute');
									$(this).find('.imapper-content').css('bottom', '0px');
									$(this).find('.imapper-content').css('right', '0px');
									
									$(this).find('.arrow-bottom-border').css('top', img_height/4 + 24 + 'px');
									$(this).find('.arrow-bottom-border').css('left', width/2 - 11 + 'px');
									$(this).find('.arrow-bottom-border').css('border-bottom-color', borderColor);
											
									$(this).css('width', width + 'px');
									$(this).css('height', height + img_height/4 + 40 + 'px');
									$(this).css('right', width/2 + 'px');
									$(this).css('bottom', img_height/4 - 5 + 'px');
									
									if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
									{
										$(this).css('right', width/2 - 4 + 'px');
										$(this).css('bottom', '0px');
									}
									else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
										$(this).css('bottom', img_height/4 - 10 + 'px');
											
									$(this).find('.imapper-arrow').addClass('arrow-up');
									var color = $(this).find('.imapper-arrow').css('border-top-color');
									$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
									$(this).find('.imapper-arrow').css('border-bottom-color', color);
									$(this).find('.imapper-arrow').css('top', img_height/4 + 25 + 'px');
								}
								else if (position == 'right')
								{
									
									
									$(this).find('.imapper-content').css('position', 'absolute');
									$(this).find('.imapper-content').css('right', '0px');
									$(this).find('.imapper-content').css('bottom', '0px');
									
									$(this).find('.arrow-right-border').css('top', height/2 - 11 + 'px');
									$(this).find('.arrow-right-border').css('left', img_width/4 + 24 + 'px');
									$(this).find('.arrow-right-border').css('border-right-color', borderColor);
									
									$(this).css('width', width + img_width/4 + 40 + 'px');
									$(this).css('height', height + 'px');
									$(this).css('right', '-30px');
									$(this).css('bottom', height/2 + img_height/2 + 'px');
									
									if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
									{
										$(this).css('right', '0px');
										$(this).css('bottom', height/2 + 10 + 'px');
									}
									else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
										$(this).css('right', '-10px');
									
									$(this).find('.imapper-arrow').addClass('arrow-left');
									var color = $(this).find('.imapper-arrow').css('border-top-color');
									$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
									$(this).find('.imapper-arrow').css('border-right-color', color);
									$(this).find('.imapper-arrow').css('top', height/2 - 10 + 'px');
									$(this).find('.imapper-arrow').css('left', img_width/4 + 25 + 'px');
								}
								else if (position == 'left')
								{
									if(old_pos=='right'){
										
									}
									
									$(this).find('.imapper-content').css('position', 'absolute');
									$(this).find('.imapper-content').css('bottom', '0px');
									
									$(this).find('.arrow-left-border').css('top', height/2 - 11 + 'px');
									$(this).find('.arrow-left-border').css('left', width + 'px');
									$(this).find('.arrow-left-border').css('border-left-color', borderColor);
									
									$(this).css('width', width + img_width/4 + 40 + 'px');
									$(this).css('height', height + 'px');
									$(this).css('right', width + img_width - 2 + 'px');
									$(this).css('bottom', height/2 + img_height/2 + 'px');
									
									if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType4))
									{
										$(this).css('right', width + 44 + 'px');
										$(this).css('bottom', height/2 + 10 + 'px');
									}
									else if ($(this).siblings('.imapper' + id + '-pin').hasClass(pinType5))
										$(this).css('right', width + img_width - 12 + 'px');
									
									$(this).find('.imapper-arrow').addClass('arrow-right');
									var color = $(this).find('.imapper-arrow').css('border-top-color');
									$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
									$(this).find('.imapper-arrow').css('border-left-color', color);
									$(this).find('.imapper-arrow').css('top', height/2 - 10 + 'px');
									$(this).find('.imapper-arrow').css('left', width + 'px');
								}*/
							}
						});
					}
				});
				
			});
			/**
	 * Window resize old
	 */
	if(settings.oldResponsive){		
	$(window).resize(function() {
		my_function_scalling_pins();
		$("div[id*='imagemapper']").each( function() {
				
			var id = $(this).attr('id').substring(11, $(this).attr('id').indexOf('-'));

			var wrapperWidth = $('#imapper' + id + '-map-image').css('width');
		    $('.imapper'+id+'-content-below').css('maxWidth',wrapperWidth);

			var parent_width = ($(this).parent().width() < map_original_width) ? $(this).parent().width() : map_original_width;
			multiplierArea = parent_width / map_original_width;
			if (settings.pinScalingCoefficient!=0) {
				multiplier = settings.pinScalingCoefficient;
			}
			else {
				multiplier = multiplierArea;
			}

			$(this).css('width', parent_width);


			if (multiplier <= 1)//ratio of available width and original width of the image if the image is wider than the container
						{
						
														
							$(this).find('.imapper-pin-wrapper > img').parent().css('transform', 'scale(' + multiplier + ')');
								
							$(this).find('.imapper-pin-wrapper').css('transform', 'scale(' + multiplier + ')');

				
							var windowWidth = parseInt($(window).width());
							if (settings.pinScalingCoefficient!=0 && windowWidth<600 && settings.itemDesignStyle == 'responsive' ) {
								$(this).find('.imapper-pin-wrapper > img ~ .imapper-content-wrapper').css({'transform': 'scale(' + (multiplierArea/multiplier) + ')','transform-origin':'0% 0%',
																																														'-webkit-transform-origin':'0% 0%',
																																														 '-moz-transform-origin':'0% 0%',
																																														 '-ms-transform-origin':'0% 0%',
																																														 '-o-transform-origin':'0% 0%'});
							} 

							
						}
						
						var windowWidth = parseInt($(window).width());

						if (windowWidth>600 || settings.itemDesignStyle == 'fluid') {
							
								$(this).find('.imapper-pin-wrapper > img ~ .imapper-content-wrapper').each(function(){
									var openPosition = $(this).parent().data('open-position');
									switch(openPosition) {
									    case 'top':
									        $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'center bottom','-webkit-transform-origin':'center bottom','-moz-transform-origin':'center bottom','-ms-transform-origin':'center bottom','-o-transform-origin':'center bottom'});
									        break;
									    case 'bottom':
									              $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'center top','-webkit-transform-origin':'center top','-moz-transform-origin':'center top','-ms-transform-origin':'center top','-o-transform-origin':'center top'});
									        break;
									        case 'left':
									              $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'right center','-webkit-transform-origin':'right center','-moz-transform-origin':'right center','-ms-transform-origin':'right center','-o-transform-origin':'right center'});
									        break;
									        case 'right':
									              $(this).css({'transform': 'scale(' + (multiplier) + ')','transform-origin':'left center','-webkit-transform-origin':'left center','-moz-transform-origin':'left center','-ms-transform-origin':'left center','-o-transform-origin':'left center'});
									        break;
									 }
									
								});
							}


							$(this).find('.imapper-pin-wrapper > .imapper-area-pin').parent().css('transform', 'scale(' + multiplierArea + ')');


			$(this).find('.imapper-content-text').each(function() {
					$(this).mCustomScrollbar('update');
			 	});
			
			if ($(window).width() <= 600  && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var pinId = getPinId($(this));
					var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						
					var positionTop = (-parseInt($(this).parent().css('top')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';

					var parentTopPercent = parseInt($(this).parent().data('top'))/100;
						var mapHeight = parseInt($(this).closest('.imagemapper-wrapper').height());
						var part1 = mapHeight*parentTopPercent / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')));
						var iconHeight = parseInt($(this).height()) * parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')));
						positionTop =  - (part1) + "px";

					var position = $(this).parent().data('open-position');
					
					var radius = parseInt($(this).parent().find('.imapper-content').not('.imapper-content-additional').css('border-bottom-right-radius')) / 2 + 1;
					
					var tNumber = parseInt($(this).siblings('.imapper-value-tab-number').html());
					cHeight[pinId] = map_original_height - ((tNumber > 1) ? tNumber : 0) * (75 - radius);
					cWidth[pinId] = map_original_width - ((tNumber > 1) ? tNumber : 0) * (75 - radius);
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width + 'px', 'height': map_original_height + 'px', 'z-index': '15'});
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width + 'px', 'height': map_original_height + 'px'});
					
					if ($(this).hasClass(pinType2))
					{
						if (clicked[pinId] == 0)
						{
							$(this).parent().find('.imapper-content').css('width', '0px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', map_original_width + 'px');
						}
						else
						{
							$(this).parent().find('.imapper-content').css('width', map_original_width + 'px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', '0px');
						}
					}
					else if ($(this).hasClass(pinType1))
					{
						tab_clicked[pinId] = 1;
						if (position == 'left' || position == 'right')
						{
						   $(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'height': cHeight[pinId], 'top': '', 'bottom': '0px'});
							

							var bottom = cHeight[pinId];
							var bottom_content = cHeight[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'width': map_original_width, 'height': '75px', 'bottom': bottom});
								$(this).find('a').css({'height': '75px', 'font-size': '24px'});
								bottom += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'width': map_original_width, 'height': '0px', 'bottom': bottom_content});
								bottom_content += 75 - radius;	
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
						   $(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'width': cWidth[pinId], 'left': '', 'right': '0px'});
							
							var right = cWidth[pinId];
							var right_content = cWidth[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'height': map_original_height, 'width': '75px', 'right': right});
								$(this).find('a').css({'width': '75px', 'font-size': '24px', 'height': map_original_height});
								right += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'height': map_original_height, 'width': '0px', 'right': right_content});
								right_content += 75 - radius;	
							});
						}
					}
					
					$(this).parent().find('.imapper-content-header').css({'width': map_original_width - 30 + 'px', 'font-size': parseInt(contentHeaderOld[pinId][1]) * 2 + 'px', 'padding-left': '20px'});
					
					var textHeight = $(this).parent().find('.imapper-content').height() - $(this).parent().find('.imapper-content-header').height() - 50;
					$(this).parent().find('.imapper-content-text').css({'width': map_original_width - 30 + 'px', 'height': textHeight, 'margin-top': '70px', 'font-size': parseInt(contentTextOld[pinId][3]) * 2 + 'px', 
						'padding-left': '20px'});
						
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).mCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'none');
					$(this).parent().find('.imapper-arrow-border').css('display', 'none');
					$(this).parent().find('.imapper-triangle-border').css('display', 'none');

					var pos = $(this).attr('src').indexOf('/images/');
					pluginUrl = $(this).attr('src').substring(0, pos);
					
					$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + '/images/close.jpg">');
					$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer', 'box-shadow': 'none'});
					
				});
			}
			else if ($(window).width() > 600 && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var pinId = getPinId($(this));
					var position = $(this).parent().data('open-position');
					
					cHeight[pinId] = height;
					cWidth[pinId] = width;
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': contentWrapperOld[pinId][0], 'left': contentWrapperOld[pinId][1], 'width': contentWrapperOld[pinId][2], 
						'height': contentWrapperOld[pinId][3], 'z-index': contentWrapperOld[pinId][4]});

					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': contentOld[pinId][0], 'left': contentOld[pinId][1], 'width': contentOld[pinId][2], 'height': contentOld[pinId][3]});
					
					if ($(this).hasClass(pinType2) && position == 'left')
					{
						if (clicked[pinId] == 0)
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', width);
						else
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', '0px');
					}
					else if ($(this).hasClass(pinType1))
					{
						tab_clicked[pinId] = 1;
						if (position == 'left' || position == 'right')
						{			
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('top', '');
							$(this).parent().find('.imapper-content-tab').each(function(index) {
								$(this).css({'width': contentTabOld[pinId][index][0], 'height': contentTabOld[pinId][index][1], 'bottom': contentTabOld[pinId][index][2]});
								$(this).find('a').css({'height': '', 'font-size': '12px'});
							});
							$(this).parent().find('.imapper-content-additional').each(function(index) {
								$(this).css({'width': contentAdditionalOld[pinId][index][0], 'height': contentAdditionalOld[pinId][index][1], 'bottom': contentAdditionalOld[pinId][index][2]});
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '', 'left': ''});
							$(this).parent().find('.imapper-content-tab').each(function(index) {
								$(this).css({'width': contentTabOld[pinId][index][0], 'height': contentTabOld[pinId][index][1], 'right': contentTabOld[pinId][index][3]});
								$(this).find('a').css({'width': '', 'font-size': '12px', 'height': contentTabOld[pinId][index][1]});
							});
							$(this).parent().find('.imapper-content-additional').each(function(index) {
								$(this).css({'width': contentAdditionalOld[pinId][index][0], 'height': contentAdditionalOld[pinId][index][1], 'right': contentAdditionalOld[pinId][index][3]});
							});
						}
					}
					
					$(this).parent().find('.imapper-content-header').css({'width': contentHeaderOld[pinId][0], 'font-size': contentHeaderOld[pinId][1], 'padding-left': contentHeaderOld[pinId][2]});
					$(this).parent().find('.imapper-content-text').css({'width': contentTextOld[pinId][0], 'height': contentTextOld[pinId][1], 'margin-top': contentTextOld[pinId][2], 
						'font-size': contentTextOld[pinId][3], 'padding-left': contentTextOld[pinId][4]});
					
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).mCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'block');
					$(this).parent().find('.imapper-arrow-border').css('display', 'block');
					$(this).parent().find('.imapper-triangle-border').css('display', 'block');
					
					$(this).parent().find('.imapper-close-button').remove();
	
				});
			}
		});
	});//Window resize function
	}
	});
	
	};
	my_admin_debug=function(t,o){
		return;
		//if(my_debug){
			if(window.console){
				console.log('Wizard 1 \n'+t+' : '+JSON.stringify(o));
			}
	//	}
		
	};
	function getPinId(obj) {
		//my_admin_debug("Get pin",obj);
		return obj.attr('id').substring(obj.attr('id').indexOf('-pin') + 4);
	}
	
	//function parameter is src of the image, return value is an array with the original image width and height - doesn't work in IE8 or lower
	function imapperGetOriginalSize(image)
	{
		if(navigator.userAgent.match('CriOS')){
			//console.log('Chrome ios');
			var original_size = new Array();

			original_size[0] = 1000;
			original_size[1] = 1000;
			return original_size;	
		}else {
		var img = new Image(); 
		if(typeof img!='undefined'){
			img.src = $(image).attr('src');
			var original_size = new Array();

			original_size[0] = img.naturalWidth;
			original_size[1] = img.naturalHeight;
			my_admin_debug("image original size",original_size);
			return original_size;
		}else {
			var original_size = new Array();

			original_size[0] = 1000;
			original_size[1] = 1000;
			return original_size;
		}
		}
	}

	function addOverlay(obj, id) 
	{
		obj.addClass('imapper-no-overlay').closest('.imapper-pin-wrapper').siblings('#imapper'+id+'-map-image').wrap('<div class="my_imapper_overlay_' +id+' imapper-overlay-wrapper"></div>');
	}

	function imapperClearMap(obj, id, clicked) {
		
		 $('.imapper' + id + '-pin').each(function() {
		 						var pid = getPinId($(this));
		 						  if (clicked[pid] == 1)
									 $(this).trigger('click');
		 					});

if ($('#imapper'+id+'-map-image').parent().hasClass('imapper-overlay-wrapper')) {

	$('#imapper'+id+'-map-image').unwrap().siblings('.imapper-pin-wrapper').children().removeClass('imapper-no-overlay');
}							
				
	} 

	function initAreaPinsBlur(settings, id){
		$('.imapper' + id + '-pin-wrapper').each(function(){

				if (settings.mapOverlay && $(this).children('.imapper-area-pin').length>0) {

					var img = $('#imapper'+id+'-map-image');
					var original_size = imapperGetOriginalSize(img);
					var imgWidth = parseFloat(img.css('width'));
					var imgHeight = parseFloat(img.css('height'));

					var pinWrapperLeft = parseFloat($(this).position().left)*original_size[0]/imgWidth;
					var pinWrapperTop = Math.abs(parseFloat($(this).position().top))*original_size[1]/imgHeight;

					var areaPin = $(this).children('.imapper-area-pin');

					var areaPinLeft = parseFloat($(this).children('.imapper-area-pin').css('width'))/2;

					var areaPinTop = Math.abs(parseFloat($(this).children('.imapper-area-pin').css('height')));
	
					var areaPinBorderLeft = parseFloat(areaPin.css('border-left-width'));


					var areaPinBorderTop = parseFloat(areaPin.css('border-top-width'));
					

					$(this).children('.imapper-area-pin').find('img').css({'left':-pinWrapperLeft+areaPinLeft-areaPinBorderLeft+'px','top':-pinWrapperTop+areaPinTop-areaPinBorderTop+'px'});
				}
			
			});
	}
	/**
	 * Function init pins on mapper image
	 * removed pinImage from code
	 * 
	 */
	function imapperInit(id, settings)//creates the html code for mapper instance
	{
		var itemOpenStyle = settings.itemOpenStyle, itemDesignStyle = settings.itemDesignStyle, pinClickAction = settings.pinClickAction, showAllCategory = settings.showAllCategory, allCategoryText = settings.allCategoryText, lightboxGallery = settings.lightboxGallery, itemClickAction = '';

		cats = '';
		var tempCat;

		$('#imapper' + id + '-map-image').css('max-width', '100%');

		if (settings.blurEffect)
			$('#imapper' + id + '-map-image').addClass('imapper-blur-effect');

		if (settings.mapOverlay) {
			
			$('#imagemapper' + id + '-wrapper .imapper-area-pin').append($('#imapper' + id + '-map-image').clone());
			$('#imagemapper' + id + '-wrapper .imapper-area-pin img').removeAttr('id').removeClass();
		}

		$('#imagemapper' + id + '-wrapper').after('<div class="imapper-content-below imapper-content-below-invisible imapper'+id+'-content-below"></div>');

		var wrapperWidth = $('#imapper' + id + '-map-image').css('width');
		$('.imapper'+id+'-content-below').css({'maxWidth':wrapperWidth,'display':'none'});

		$('#imagemapper' + id + '-wrapper').children('.imapper-pin-wrapper').each(function() {//for each pin wrapper
			/**
			 * Changed don't need img for
			 * this type of pin
			 */
			//var pinImg = $(this).children('.imapper' + id + '-pin');//pin image
			var pinId='';
			var pinSrc='';
			if(typeof pinImg!='undefined'){
				pinId= getPinId(pinImg);//pin id
				pinSrc = pinImg.attr('src');//pin image src
			
			}
			var my_pin_id=$(this).data('pin-id');
			var dataLeft = ($(this).attr('data-left') !== undefined) ? $(this).attr('data-left') : '50%';
			var dataTop = ($(this).attr('data-top') !== undefined) ? $(this).attr('data-top') : '50%';
			var dataOpenPosition = ($(this).attr('data-open-position') !== undefined) ? $(this).attr('data-open-position') : 'left';
			var dataPinColor = ($(this).attr('data-pin-color') !== undefined) ? $(this).attr('data-pin-color') : '#0000ff';
			var dataPinIcon = ($(this).attr('data-pin-icon') !== undefined) ? $(this).attr('data-pin-icon') : 'icon-plane';
			var dataImapperLink = ($(this).attr('data-imapper-link') !== undefined) ? $(this).attr('data-imapper-link') : '';
			var itemClickAction = ($(this).attr('data-imapper-click-action') !== undefined) ? $(this).attr('data-imapper-click-action') : pinClickAction;
			var prettyPhotoWidth = ($(this).attr('data-imapper-lightbox-width') !== undefined) ? $(this).attr('data-imapper-lightbox-width') : '100%';
			var prettyPhotoHeight = ($(this).attr('data-imapper-lightbox-height') !== undefined) ? $(this).attr('data-imapper-lightbox-height') : '100%';
			var imapperContentWrapper = $(this).children('.imapper-content-wrapper');
			var my_imapperHoverWrapper=$(this).parents("#imagemapper"+id+"-wrapper").find("#imapper"+id+"-pin"+my_pin_id+"-my-content-wrapper");
			var dataTextColor = (imapperContentWrapper.attr('data-text-color') !== undefined) ? imapperContentWrapper.attr('data-text-color') : '#dbdbdb';
			var dataBackColor = (imapperContentWrapper.attr('data-back-color') !== undefined) ? imapperContentWrapper.attr('data-back-color') : '#1fb896';
			var dataBorderColor = (imapperContentWrapper.attr('data-border-color') !== undefined) ? imapperContentWrapper.attr('data-border-color') : '#1fb896';
			var dataBorderRadius = (imapperContentWrapper.attr('data-border-radius') !== undefined) ? imapperContentWrapper.attr('data-border-radius') : '10px';
			var dataWidth = (imapperContentWrapper.attr('data-width') !== undefined) ? imapperContentWrapper.attr('data-width') : '200px';
			var dataHeight = (imapperContentWrapper.attr('data-height') !== undefined) ? imapperContentWrapper.attr('data-height') : '150px';
			var dataFont = (imapperContentWrapper.attr('data-font') !== undefined) ? imapperContentWrapper.attr('data-font') : 'Arial';
			var imapperContent = imapperContentWrapper.children('.imapper-content');
			var dataTabNumber = imapperContent.length;
			/**
			 * Changed pin image
			 * dragan eremoved code
			 */
			if(typeof pinImg!='undefined'){
				if (pinImg.hasClass('iMapper-pin-1')) {
					pinImg.addClass('imapper-pin-type-1');
					pinImg.css({'color':dataPinColor});		
				}
			}


			// Why are the image elements added to the imapper-pretty-photo links? Because pretty photo plugin adds some weird characters above the image, when it can't find the alt attribute 
			if (itemClickAction == 'lightboxImage') {
				if (lightboxGallery)
					pinImg.after('<a class="imapper-pretty-photo" style="display:none;" rel="prettyPhoto[imapper-gallery-'+id+']" alt=""  href="'+dataImapperLink+'?width='+prettyPhotoWidth+'&height='+prettyPhotoHeight+'"><img href="'+dataImapperLink+'" style="display:none !important;" alt=" " /></a>');
				else
					pinImg.after('<a class="imapper-pretty-photo" style="display:none;" rel="prettyPhoto" alt="altText"  href="'+dataImapperLink+'?width='+prettyPhotoWidth+'&height='+prettyPhotoHeight+'"><img href="'+dataImapperLink+'" alt=" " style="display:none !important;" /></a>');
			} else if (itemClickAction == 'lightboxIframe') {
				if (lightboxGallery)
					pinImg.after('<a class="imapper-pretty-photo" rel="prettyPhoto[imapper-gallery-'+id+']"  href="'+dataImapperLink+'?iframe=true&width='+prettyPhotoWidth+'&height='+prettyPhotoHeight+'"><img alt=" " style="display:none !important;" /></a>');
				else
					pinImg.after('<a class="imapper-pretty-photo" rel="prettyPhoto"  href="'+dataImapperLink+'?iframe=true&width='+prettyPhotoWidth+'&height='+prettyPhotoHeight+'"><img alt=" " style="display:none !important;" /></a>');
			} 

		

			$(this).css({'position': 'absolute', 'left': dataLeft, 'top': dataTop});//setting position relative to the map
			
			if (dataTabNumber > 1)
				$(this).append('<div id="imapper' + id + '-value-item' + pinId + '-tab-number" class="imapper-value-tab-number" >' + dataTabNumber + '</div>');
			/**
			 * Init hover wrapper content
			 */
			
			var my_immaperHoverOpenPosition=$(this).data('my-hover-open');
			var my_imapperHoverBackColor=my_imapperHoverWrapper.data('back-color');
			my_imapperHoverWrapper.find(".my_hover_inner_1234").append('<div class="imapper-arrow my_arrow_new_test" style="border-color: ' + my_imapperHoverBackColor + ' transparent transparent transparent;"></div>');
			my_imapperHoverWrapper.find(".my_hover_inner_1234").append('<div class="my_arror_top_hover arrow-' + my_immaperHoverOpenPosition + '-border imapper-arrow-border" style="border-color:' + my_imapperHoverBackColor + ' transparent transparent transparent"></div>');
			var my_width_12345_os=my_imapperHoverWrapper.width();
			var my_width_12345_parent=my_width_12345_os+10;
			my_imapperHoverWrapper.find(".my_hover_inner_1234").css('width',my_width_12345_os+'px');
			
			my_imapperHoverWrapper.find(".my_hover_title").css('width',my_width_12345_os+'px');
			
			my_admin_debug("Immaper",{id:id,backColor:my_imapperHoverBackColor});
			
			imapperContentWrapper.css('color', dataTextColor);
			imapperContentWrapper.append('<div class="imapper-arrow" style="border-color:' + dataBackColor + 'transparent transparent transparent;"></div>');
				
			/**
			 * Add to content
			 */
			//if(dataOpenPosition=='right'){
				imapperContentWrapper.find(".imapper-content").append('<div class="my-imapper-arrow-new-1234 imapper-arrow-new arrow-left" style="border-color: transparent ' + dataBackColor + ' transparent transparent ;"></div>');
				imapperContentWrapper.find(".imapper-content").append('<div class="my-imapper-arrow-new-1234 imapper-arrow-new-right arrow-right" style="border-color: transparent transparent transparent ' + dataBackColor + '"></div>');
				imapperContentWrapper.find(".imapper-content").append('<div class="my-imapper-arrow-new-1234 imapper-arrow-new-top arrow-up" style="border-color:  transparent transparent '+dataBackColor+' transparent"></div>');
				imapperContentWrapper.find(".imapper-content").append('<div class="my-imapper-arrow-new-1234 imapper-arrow-new-bottom arrow-down" style="border-color:'+dataBackColor+'  transparent transparent transparent"></div>');
				
				
				
				
				
				
			/*}else if(dataOpenPosition=='left'){
				imapperContentWrapper.find(".imapper-content").append('<div class="imapper-arrow-new arrow-left" style="border-color: transparent transaprent transparent ' + dataBackColor + ';"></div>');
				
			}*/
			tempCat = $(this).data('category')
				if (cats.indexOf(tempCat)==-1 && tempCat !== undefined) {
					cats += '<div class="imapper-category-item-wrapper"><a class="imapper-category-button" href="'+tempCat+'">'+tempCat+'</a><div class="imapper-category-arrow-bottom"></div></div>';
			}

			

			imapperContent.css({'background-color': dataBackColor, 'border-color': dataBorderColor, 'border-radius': dataBorderRadius, 'width': dataWidth, 'height': dataHeight, 'font-family': '"' + dataFont + '"'});
			
			if (pinSrc!==undefined) {
			if ( pinSrc.indexOf('images/icons/2') >= 0)
			{
				imapperContent.css('height', '75px');//set fixed content height for the sliding pin
				if (dataOpenPosition != 'left' && dataOpenPosition != 'right')
				{
					dataOpenPosition = left;
					$(this).attr('data-open-position', 'left');
				}
				imapperContentWrapper.append('<div class="triangle-' + dataOpenPosition + '-border imapper-triangle-border"></div>');
			}
			else
				imapperContentWrapper.append('<div class="arrow-' + dataOpenPosition + '-border imapper-arrow-border"></div>');
			}
			//imapperContentWrapper.find(".imapper-content").append('<div class="arrow-' + dataOpenPosition + '-border imapper-arrow-border"></div>')
			/**
			 * Set height of product main
			 */
			var my_product_header_height=$(this).find(".my_product_header").outerHeight();
			var my_product_footer_height=$(this).find(".my_product_footer").outerHeight();
			my_admin_debug("Header height",my_product_header_height);
			my_admin_debug("Footer height",my_product_footer_height);
			
			/**
			 * Add height
			 */
			$(this).find(".my_product_header").data('my-height',my_product_header_height);
			$(this).find(".my_product_footer").data('my-height',my_product_footer_height);
			var my_height_1=parseFloat(dataHeight)-(my_product_footer_height+my_product_header_height);
			/**
			 * Product description height
			 */
			var my_height_price=$(this).find(".my_product_price").outerHeight();
			var my_descr_height=my_height_1-my_height_price;
			$(this).find(".my_product_description").height(my_descr_height+'px');
			
			my_admin_debug("Height",my_height_1);
			$(this).find(".my_product_main").height(my_height_1);
			//if(my_height_1>200){
				var l_h_1=parseInt($(this).find(".my_product_price").data('my-line-height'));
				var f_s_1=parseInt($(this).find(".my_product_price").data('my-font-size'));
				var rem=(l_h_1-f_s_1)/2;
				var p=15-rem;
				/*if(window.consple){
					console.log("Padding",rem);
				}*/
				if(p>0){
					$(this).find(".my_product_price").css('padding-top',p+'px');
					$(this).find(".my_product_price").css('padding-bottom',p+'px');
				}else {
					p=0;
					$(this).find(".my_product_price").css('padding-top',p+'px');
					$(this).find(".my_product_price").css('padding-bottom',p+'px');
				
				}
			//}
			
			if (dataTabNumber > 1)
				for (var i = 1; i <= dataTabNumber; i++)
				{
					if (i == 1)
					{
						var after = '#imapper' + id + '-pin' + pinId + '-content';
						var contentTab = '-content';
					}
					else
					{
						var after = '#imapper' + id + '-pin' + pinId + '-content-' + i;
						var contentTab = '-content-' + i;
					}
				// $('<div id="imapper' + id + '-pin' + pinId + contentTab + '-tab" class="imapper-content-tab" style="background-color: ' + dataBackColor + ';"><a href="#" style="color: ' + dataBorderColor + ';">' + i + '</a></div>').insertAfter(after);//append the element which contains the number of the pin
				}
					if (pinSrc!==undefined) {	
			if (pinSrc.indexOf('images/icons/3/') >= 0)//add shadow for an element with the shadow
				$(this).prepend('<img id="imapper' + id + '-pin' + pinId + '" class="imapper-pin-shadow" src="' + pinSrc.substring(0, pinSrc.length - 5) + '1-1.png">')
				
			if (pinSrc.indexOf('images/icons/5/') >= 0)//add icon and color for the pin with fawesome icons
			{
				$(this).children('.imapper' + id + '-pin').after('<i id="imapper' + id + '-pin' + pinId + '-icon" class="imapper-pin-icon fawesome icon-large ' + dataPinIcon + '"></i>');
				$(this).children('.imapper' + id + '-pin').after('<div id="imapper' + id + '-pin' + pinId + '-color" class="imapper-pin-color" style="background-color: ' + dataPinColor + ';"></div>');
			}

			
		}


		});
	if (cats.length!=0 && settings.categories==true) {
		if (showAllCategory)
			cats = '<div class="imapper-category-item-wrapper imapper-category-active"><a class="imapper-category-button" href="All">'+allCategoryText+'</a><div class="imapper-category-arrow-bottom"></div></div>' + cats;
			cats = '<div class="imapper'+id+'-categories-wrapper imapper-categories-wrapper">' +cats;
		$('#imagemapper' + id + '-wrapper').before(cats);
	}

	$('.imapper-pretty-photo').prettyPhoto({social_tools:false, theme:'pp_default'});

	}
	
})(jQuery);