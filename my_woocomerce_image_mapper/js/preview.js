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
			
			
			
			imapperInit(id, settings);

			
			width = $(this).find('.imapper-content').width();
			height = $(this).find('.imapper-content').height();
			
			
			map_width = $(this).find('#imapper' + id + '-map-image').width();
			map_height = $(this).find('#imapper' + id + '-map-image').height();

			
			var map_original_size = imapperGetOriginalSize('#imapper' + id + '-map-image');
			map_original_width = map_original_size[0];
			map_original_height = map_original_size[1];

			
			var parent_width = ($(this).parent().width() < map_original_width) ? $(this).parent().width() : map_original_width;

			
			multiplierArea = parent_width / map_original_width;
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
			
			
			$('.imapper' + id + '-pin').each( function() {
				var pinId = getPinId($(this));
				
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
					
					
				if (!($(this).hasClass(pinType1) || $(this).hasClass(pinType2) || $(this).hasClass(pinType3) || $(this).hasClass(pinType4) || $(this).hasClass(pinType5)))
				{
					$(this).css('top', -$(this).height() + 'px');
					$(this).css('left', -$(this).width()/2 + 'px');
				}
			});
			
			//mouseenter function for pins
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
			
			$('.imapper' + id + '-pin-content-wrapper').each(function() {
				var position = $(this).parent().data('open-position');
				var img_width = $(this).parent().find('.imapper' + id + '-pin').width();
				var img_height = $(this).parent().find('.imapper' + id + '-pin').height();
				var borderColor = $(this).data('border-color');

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
				}
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
				}
				
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
				}
				
				if ($(this).siblings('.imapper' + id + '-pin').attr('src')!==undefined) {
				var indexPosition = $(this).siblings('.imapper' + id + '-pin').attr('src').indexOf('images/');

				var position = $(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('/images/');
				pluginUrl = $(this).parent().find('.imapper' + id + '-pin').attr('src').substring(0, position);

				$(this).siblings('.imapper-pin-color').css('behavior', 'url(' + pluginUrl + '/pie/PIE.htc)');
				}
				
			});		
		
			var hheight;
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
			
		if (multiplier <= 1)
						{
						
							$(this).find('.imapper-pin-wrapper > img').parent().css('transform', 'scale(' + multiplier + ')');

							var windowWidth = parseInt($(window).width());
							if (settings.pinScalingCoefficient!=0 && windowWidth<600 && settings.itemDesignStyle == 'responsive' ) {
								$(this).find('.imapper-pin-wrapper > img ~ .imapper-content-wrapper').css({'transform': 'scale(' + (multiplierArea/multiplier) + ')','transform-origin':'0% 0%',
																																														'-webkit-transform-origin':'0% 0%',
																																														'-moz-transform-origin':'0% 0%',
																																														'-ms-transform-origin':'0% 0%',
																																														'-o-transform-origin':'0% 0%'});
							} 

							
						}
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
			
			$('.imapper' + id + '-pin-wrapper').each(function(){

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

				if (itemHoverAction == 'content')//handles pin hover event
				{



					$(this).children('.imapper' + id + '-pin').mouseover( function() {//hover in function for pins

						$(this).siblings('.imapper-content-wrapper').stop(true,true);
					$(this).siblings('.imapper-content-wrapper').find('.imapper-content').stop(true,true);

						if (settings.mapOverlay)
							addOverlay($(this),id);
		
						
						var properties2 = {};

						var contentOpenPosition = $(this).closest('.imapper-pin-wrapper').data('open-position');

						if (settings.slideAnimation == true) {

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
						
					});
					
					$(this).mouseleave( function() {//hover out function for pins

					
						
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
				}
				

				 if (itemClickAction!='none')//handles pin click
				{ 



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

							var cpWidth = ($(window).width() <= 600  && designStyle == 'responsive') ? ($(this).parent().parent().width() / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
								$(this).parent().css('transform').indexOf(',')))) : width;
							
							if (clicked[pinId] == 0)
							{

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
														
								$('.imapper' + id + '-pin').each(function() {
									var pid = getPinId($(this));

								 	if (clicked[pid] == 1) {
										$(this).trigger('click');
								 	}

								});

								if (settings.mapOverlay)
									addOverlay($(this),id);
								
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
								
								if ($(this).hasClass(pinType2))
								{
									if ($(this).parent().data('open-position') == 'right') {
										properties2 = {width: cpWidth};
									}
									else
										properties2 = {width: cpWidth, marginLeft: 0};
								}
								
								

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
						}
								
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

								$(this).siblings('.imapper-content-wrapper').animate(properties, duration);
								
								if ($(this).hasClass(pinType2))
									$(this).siblings('.imapper-content-wrapper').find('.imapper-content').animate(properties2,
									{
										duration: 400,
										queue: false,
										complete: function() {
											$(this).parent().css('visibility', 'hidden');
										}
								});
								
								$(this).css('z-index', '10');
								$(this).siblings('.imapper-value-tab-number').css('z-index', '10');
								$(this).siblings('.imapper-content-wrapper').css('z-index', '9');

								$(this).parent().css('z-index', '');
								
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

		


			});

			$(document).on('click','.imapper-category-item-wrapper', function(e) {//button for closing the pin content which is visible in responsive mode
				e.preventDefault();
				var catName = $(this).children('.imapper-category-button').attr('href');

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
			});
			
			if ($(window).width() <= 600  && designStyle == 'responsive')
			{

				var mapHeight = $('.imapper'+id+'-map-image').height();
				

				$('.imapper' + id + '-pin').each(function() {
					var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						

						var parentTopPercent = parseInt($(this).parent().data('top'))/100;
						var mapHeight = parseInt($(this).closest('.imagemapper-wrapper').height());
						var part1 = mapHeight*parentTopPercent / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')));
						var iconHeight = parseInt($(this).height()) * parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')));
						positionTop =  - (part1) + "px";

					
					var pinId = getPinId($(this));	
					var position = $(this).parent().data('open-position');
					
					var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-right-radius')) / 2 + 1;
					
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
								$(this).css({'height': map_original_height, 'right': right_content});
								right_content += 75 - radius;	
							});
						}
					}

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

					var pos = $(this).attr('src').indexOf('/images/');
					pluginUrl = $(this).attr('src').substring(0, pos);
					
					$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + '/images/close.jpg">');
					$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer'});
				});
			}
	
	$(window).resize(function() {
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
	});
	
	});
	
	}

	function getPinId(obj) {
		return obj.attr('id').substring(obj.attr('id').indexOf('-pin') + 4);
	}
	
	//function parameter is src of the image, return value is an array with the original image width and height - doesn't work in IE8 or lower
	function imapperGetOriginalSize(image)
	{
		var img = new Image(); 
		img.src = $(image).attr('src');
		var original_size = new Array();

		original_size[0] = img.naturalWidth;
		original_size[1] = img.naturalHeight;
		
		return original_size;
		
	}

	function addOverlay(obj, id) 
	{
		obj.addClass('imapper-no-overlay').closest('.imapper-pin-wrapper').siblings('#imapper'+id+'-map-image').wrap('<div class="imapper-overlay-wrapper"></div>');
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
			var pinImg = $(this).children('.imapper' + id + '-pin');//pin image
			var pinId = getPinId(pinImg);//pin id
			var pinSrc = pinImg.attr('src');//pin image src
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
			var dataTextColor = (imapperContentWrapper.attr('data-text-color') !== undefined) ? imapperContentWrapper.attr('data-text-color') : '#dbdbdb';
			var dataBackColor = (imapperContentWrapper.attr('data-back-color') !== undefined) ? imapperContentWrapper.attr('data-back-color') : '#1fb896';
			var dataBorderColor = (imapperContentWrapper.attr('data-border-color') !== undefined) ? imapperContentWrapper.attr('data-border-color') : '#1fb896';
			var dataBorderRadius = (imapperContentWrapper.attr('data-border-radius') !== undefined) ? imapperContentWrapper.attr('data-border-radius') : '10px';
			var dataWidth = (imapperContentWrapper.attr('data-width') !== undefined) ? imapperContentWrapper.attr('data-width') : '200px';
			var dataHeight = (imapperContentWrapper.attr('data-height') !== undefined) ? imapperContentWrapper.attr('data-height') : '150px';
			var dataFont = (imapperContentWrapper.attr('data-font') !== undefined) ? imapperContentWrapper.attr('data-font') : 'Arial';
			var imapperContent = imapperContentWrapper.children('.imapper-content');
			var dataTabNumber = imapperContent.length;
			
			if (pinImg.hasClass('iMapper-pin-1')) {
				pinImg.addClass('imapper-pin-type-1');
				pinImg.css({'color':dataPinColor});		
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

			imapperContentWrapper.css('color', dataTextColor);
			imapperContentWrapper.append('<div class="imapper-arrow" style="border-color: ' + dataBackColor + ' transparent transparent transparent;"></div>');

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