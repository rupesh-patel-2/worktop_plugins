/*

Wordpress Image Mapper

Pin mapper for custom images.

Copyright (c) 2013 Br0 (shindiristudio.com)

Project site: http://codecanyon.net/
Project demo: http://shindiristudio.com/imgmapper

*/

(function($){
	
	var map_original_width;
	var map_original_height;
	var clicked;
	var tab_clicked;
	
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
	var openStyle;
	
	$(window).load(function() {
		
		map_original_width = new Array();
		map_original_height = new Array();
		
		contentWrapperOld = new Array();
		contentOld = new Array();
		contentHeaderOld = new Array();
		contentTextOld = new Array();
		contentTabOld = new Array();
		contentAdditionalOld = new Array();	
		
		openStyle = new Array();

		$("div[id*='imagemapper']").each( function() {
				
			var id = $(this).attr('id').substring(11, $(this).attr('id').indexOf('-'));
			openStyle[id] = $('#imapper' + id + '-value-item-open-style').html();
			
			width = $(this).find('.imapper-content').width();
			height = $(this).find('.imapper-content').height();
			
			var map_width = $(this).find('#imapper' + id + '-map-image').width();
			var map_height = $(this).find('#imapper' + id + '-map-image').height();
			
			var map_original_size = getOriginalSize('#imapper' + id + '-map-image')
			map_original_width[id] = map_original_size[0];
			map_original_height[id] = map_original_size[1];
			var parent_width = ($(this).parent().width() < map_original_width[id]) ? $(this).parent().width() : map_original_width[id];

			var multiplier = parent_width / map_original_width[id];
			cHeight = new Array();
			cWidth = new Array();
			
			designStyle = $('#imapper' + id + '-value-item-design-style').html();

			clicked = new Array();
			tab_clicked = new Array();
			
			contentWrapperOld[id] = new Array();
			contentOld[id] = new Array();
			contentHeaderOld[id] = new Array();
			contentTextOld[id] = new Array();
			contentTabOld[id] = new Array();
			contentAdditionalOld[id] = new Array();
			
			$(this).css('width', parent_width);
			//$(this).css('height', map_original_height[id]);
			
			$('.imapper' + id + '-pin').each( function() {
				var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
				clicked[pinId] = 0;
				tab_clicked[pinId] = 1;

				var img_width = $(this).width();
				var img_height = $(this).height();
				var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-left-radius')) / 2 + 1;
				
				contentTabOld[id][pinId] = new Array();
				contentAdditionalOld[id][pinId] = new Array();
				
				var tNumber = parseInt($(this).parent().find('.imapper-value-tab-number').html());
				cHeight[pinId] = ($(window).width() <= 600 && designStyle == 'responsive') ? map_original_height[id] - ((tNumber > 1) ? tNumber : 0) * (75 - radius) : height;
				cWidth[pinId] = ($(window).width() <= 600 && designStyle == 'responsive') ? map_original_width[id] - ((tNumber > 1) ? tNumber : 0) * (75 - radius) : width;
				
				if ($(this).attr('src').indexOf('images/icons/4/') >= 0)
					$(this).addClass('pin-mini-style');
				else
					$(this).addClass('pin-style');
					
				if ($(this).attr('src').indexOf('images/icons/2/') >= 0 || $(this).attr('src').indexOf('images/icons/1/') >= 0)
					$(this).parent().find('.imapper-content').wrapInner('<div class="imapper-content-inner" style="width: ' + width + 'px; height: ' + height + 'px;" />');			
				
				if ($(this).attr('src').indexOf('images/icons/5/') >= 0)
				{
					$(this).parent().find('.imapper-pin-icon').css('left', -$(this).parent().find('.imapper-pin-icon').width() / 2 - 1 + 'px');
				}
					
				if ($(this).attr('src').indexOf('/images/icons/1/') < 0 && $(this).attr('src').indexOf('/images/icons/2/') < 0 && $(this).attr('src').indexOf('/images/icons/3/') < 0 && $(this).attr('src').indexOf('/images/icons/4/') < 0 && $(this).attr('src').indexOf('/images/icons/5/') < 0)
				{
					$(this).css('top', -$(this).height() + 'px');
					$(this).css('left', -$(this).width()/2 + 'px');
				}
			});
			
			$('.imapper' + id + '-pin').mouseenter(function() {
				if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
				{
					var position = $(this).attr('src').indexOf('/images/');
					var pluginUrl = $(this).attr('src').substring(0, position);
					$(this).attr('src', pluginUrl + '/images/icons/1/1-1.png');
				}
				else if ($(this).attr('src').indexOf('images/icons/3/') >= 0)
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
			});
				
			$('.imapper' + id + '-pin').mouseleave(function() {
				if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
				{
					var position = $(this).attr('src').indexOf('/images/');
					var pluginUrl = $(this).attr('src').substring(0, position);
					$(this).attr('src', pluginUrl + '/images/icons/1/1.png');
				}
				else if ($(this).attr('src').indexOf('images/icons/3/') >= 0)
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
			});
			
			$('.imapper' + id + '-pin-content-wrapper').each(function() {
				var position = $(this).parent().find('.imapper' + id + '-value-item-open-position').html();
				var img_width = $(this).parent().find('.imapper' + id + '-pin').width();
				var img_height = $(this).parent().find('.imapper' + id + '-pin').height();
				var borderColor = $(this).parent().find('.imapper-value-border-color').html();
			
				if ($(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/2/') < 0)
				{
					if (position == 'top')
					{	
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('right', '0px');
						
						$(this).find('.arrow-top-border').css('top', height + 'px');
						$(this).find('.arrow-top-border').css('left', width/2 - 11 + 'px');
						$(this).find('.arrow-top-border').css('border-top-color', borderColor);
					
						$(this).css('width', width + 'px');
						$(this).css('height', height + img_height/2 + 40 + 'px');
						$(this).css('right', width/2 + 'px');
						$(this).css('bottom', height + img_height + 40 + 'px');
						
						if ($(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/4/') >= 0)
						{
							$(this).css('right', width/2 - 4 + 'px');
							$(this).css('bottom', height + 50 + 'px');
						}
							
						$(this).find('.imapper-arrow').addClass('arrow-down');
						$(this).find('.imapper-arrow').css('top', height + 'px');
					}
					else if (position == 'bottom')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('bottom', '0px');
						$(this).find('.imapper-content').css('right', '0px');
						
						$(this).find('.arrow-bottom-border').css('top', img_height/2 + 24 + 'px');
						$(this).find('.arrow-bottom-border').css('left', width/2 - 11 + 'px');
						$(this).find('.arrow-bottom-border').css('border-bottom-color', borderColor);
								
						$(this).css('width', width + 'px');
						$(this).css('height', height + img_height/2 + 40 + 'px');
						$(this).css('right', width/2 + 'px');
						$(this).css('bottom', img_height/2 + 'px');
						
						if ($(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/4/') >= 0)
						{
							$(this).css('right', width/2 - 4 + 'px');
							$(this).css('bottom', '0px');
						}
								
						$(this).find('.imapper-arrow').addClass('arrow-up');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
						$(this).find('.imapper-arrow').css('border-bottom-color', color);
						$(this).find('.imapper-arrow').css('top', img_height/2 + 25 + 'px');
					}
					else if (position == 'right')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('right', '0px');
						$(this).find('.imapper-content').css('bottom', '0px');
						
						$(this).find('.arrow-right-border').css('top', height/2 - 11 + 'px');
						$(this).find('.arrow-right-border').css('left', img_width/2 + 24 + 'px');
						$(this).find('.arrow-right-border').css('border-right-color', borderColor);
						
						$(this).css('width', width + img_width/2 + 40 + 'px');
						$(this).css('height', height + 'px');
						$(this).css('right', '0px');
						$(this).css('bottom', height/2 + img_height/2 + 'px');
						
						if ($(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/4/') >= 0)
						{
							$(this).css('right', '0px');
							$(this).css('bottom', height/2 + 10 + 'px');
						}
						
						$(this).find('.imapper-arrow').addClass('arrow-left');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
						$(this).find('.imapper-arrow').css('border-right-color', color);
						$(this).find('.imapper-arrow').css('top', height/2 - 10 + 'px');
						$(this).find('.imapper-arrow').css('left', img_width/2 + 25 + 'px');
					}
					else if (position == 'left')
					{
						$(this).find('.imapper-content').css('position', 'absolute');
						$(this).find('.imapper-content').css('bottom', '0px');
						
						$(this).find('.arrow-left-border').css('top', height/2 - 11 + 'px');
						$(this).find('.arrow-left-border').css('left', width + 'px');
						$(this).find('.arrow-left-border').css('border-left-color', borderColor);
						
						$(this).css('width', width + img_width/2 + 40 + 'px');
						$(this).css('height', height + 'px');
						$(this).css('right', width + img_width/2 + 40 + 'px');
						$(this).css('bottom', height/2 + img_height/2 + 'px');
						
						if ($(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/4/') >= 0)
						{
							$(this).css('right', width + 44 + 'px');
							$(this).css('bottom', height/2 + 10 + 'px');
						}
						
						$(this).find('.imapper-arrow').addClass('arrow-right');
						var color = $(this).find('.imapper-arrow').css('border-top-color');
						$(this).find('.imapper-arrow').css('border-top-color', 'transparent');
						$(this).find('.imapper-arrow').css('border-left-color', color);
						$(this).find('.imapper-arrow').css('top', height/2 - 10 + 'px');
						$(this).find('.imapper-arrow').css('left', width + 'px');
					}
				}
				else if ($(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/2/') >= 0)
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
				
				if ($(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('images/icons/1/') >= 0)
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
							
							$(this).css('border-top-left-radius', $(this).parent().find('.imapper-content').css('border-top-left-radius'));	
							$(this).css('border-top-right-radius', $(this).parent().find('.imapper-content').css('border-top-right-radius'));
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
							
							if ($(this).parent().parent().find('.imapper-value-tab-number').html() != '1')
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
							
							if ($(this).parent().parent().find('.imapper-value-tab-number').html() != '1')
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
				
				var position = $(this).parent().find('.imapper' + id + '-pin').attr('src').indexOf('/images/');
				var pluginUrl = $(this).parent().find('.imapper' + id + '-pin').attr('src').substring(0, position);
				$(this).parent().find('.imapper-pin-color').css('behavior', 'url(' + pluginUrl + 'pie/PIE.htc)');
			});		
						
			var hheight;
			$(this).find('.imapper-content-text').each(function(index) {
				if (index == 0)
					hheight = $(this).parent().find('.imapper-content-header').height();
					
				if ($(this).parent().find('.imapper-content-header').html() != '')
				{
					var dis;
					if ($(this).parent().attr('class') == 'imapper-content-inner')
						dis = $(this).parent();
					else
						dis = $(this);
				
					if ($(dis).parent().parent().parent().find('img').attr('src').indexOf('images/icons/2/') >= 0)
						$(this).css('height', $(this).parent().height() - hheight - 20 + 'px');
					else
						$(this).css('height', $(this).parent().height() - hheight - 30 + 'px');
				}
				else
				{
					$(this).parent().find('.imapper-content-header').css('padding', '0px');
					$(this).css('height', $(this).parent().height() - 20 + 'px');
				}
					
				$(this).imCustomScrollbar();
			});
			
			if (multiplier <= 1)
			{
				$(this).find('.imapper-pin-wrapper').each(function() {
					$(this).css('transform', 'scale(' + multiplier + ')');
				});
			}
			$(this).css('visibility', 'visible');
			
			$(document).on('click', '.imapper-content-tab a', function(e) {
				e.preventDefault();
				
				var pinId = $(this).parent().parent().parent().find('.imapper' + id + '-pin').attr('id').substring($(this).parent().parent().parent().find('.imapper' + id + '-pin').attr('id').indexOf('-pin') + 4);
				var newClick = parseInt($(this).html());
				var dis = $(this).parent().parent();
				var position = $(this).parent().parent().parent().find('.imapper' + id + '-value-item-open-position').html();
				
				if (newClick != tab_clicked[pinId])
				{		
					if (position == 'left' || position == 'right')
					{	
						if (newClick > tab_clicked[pinId])
						{
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
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							var bottomNew = parseInt($(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).css('bottom')) + cHeight[pinId];
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ height: 0, bottom: bottomNew}, {duration: 400});
								
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ height: cHeight[pinId]}, {duration: 400});
							
							for (var i = newClick; i < tab_clicked[pinId]; i++)
							{
								var bottomNew2 = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('bottom')) + cHeight[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ bottom: bottomNew2}, {duration: 400});
								
								if (i != newClick)
									$(dis).find('.imapper-content').eq(i - 1).css('bottom', parseInt($(dis).find('.imapper-content').eq(i - 1).css('bottom')) + cHeight[pinId]);
							}
						}
					}
					else if (position == 'top' || position == 'bottom')
					{
						if (newClick > tab_clicked[pinId])
						{
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
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).find('.imapper-content-inner').fadeOut('fast');
							var rightNew = parseInt($(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).css('right')) + cWidth[pinId];
							$(dis).find('.imapper-content').eq(tab_clicked[pinId] - 1).animate({ width: 0, right: rightNew}, {duration: 400});
								
							$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-inner').fadeIn('fast');
							$(dis).find('.imapper-content').eq(newClick - 1).animate({ width: cWidth[pinId]}, {duration: 400});
							
							for (var i = newClick; i < tab_clicked[pinId]; i++)
							{
								var rightNew2 = parseInt($(dis).find('.imapper-content-tab').eq(i - 1).css('right')) + cWidth[pinId];
								$(dis).find('.imapper-content-tab').eq(i - 1).animate({ right: rightNew2}, {duration: 400});
								
								if (i != newClick)
									$(dis).find('.imapper-content').eq(i - 1).css('right', parseInt($(dis).find('.imapper-content').eq(i - 1).css('right')) + cWidth[pinId]);
							}
						}
					}
					
					$(dis).find('.imapper-content').eq(newClick - 1).find('.imapper-content-text').imCustomScrollbar('update');
					tab_clicked[pinId] = newClick;

				}
			});
			
			if (openStyle[id] == 'hover')
			{
				$('.imapper' + id + '-pin').mouseover( function() {
					
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var properties2 = {};
					var duration = {duration: 400, queue: false};
					var cpWidth = ($(window).width() <= 600  && designStyle == 'responsive') ? ($(this).parent().parent().width() / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) : width;
					
					if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
					{
						$(this).css('z-index', '12');
						$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '12');
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '11');
					}
					else
					{
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '13');
					}

					$(this).parent().css('z-index', '100');
					
					if ($('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('visibility') == 'hidden')
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('visibility', 'visible');
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						{
							if ($(this).parent().find('.imapper' + id + '-value-item-open-position').html() == 'right')
								properties2 = {width: cpWidth};
							else
								properties2 = {width: cpWidth, marginLeft: 0};
								
							duration = {duration: 400, queue: false}
						}
					
					$('#imapper' + id + '-pin' + pinId + '-content-wrapper').stop(true).animate({
						opacity: 1
					}, duration);
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').find('.imapper-content').stop(true).animate(properties2, {
									duration: 400,
									queue: false
								});
					
				});
				
				$('.imapper-pin-wrapper').mouseleave( function() {

					if ($(this).find('.pin-style').attr('id') != undefined)
						var $this = $(this).find('.pin-style');
					else
						var $this = $(this).find('.pin-mini-style')
					
					var pinId = $this.attr('id').substring($this.attr('id').indexOf('-pin') + 4);	
					var properties = {opacity: 0};
					var properties2 = {};
					var duration = {};
					
					var cpWidth = ($(window).width() <= 600 && designStyle == 'responsive') ? ($(this).parent().width() / parseFloat($(this).css('transform').substring($(this).css('transform').indexOf('(') + 1, 
						$(this).css('transform').indexOf(',')))) : width;
					
					if ($this.attr('src').indexOf('images/icons/2/') >= 0)
					{
						if ($(this).find('.imapper' + id + '-value-item-open-position').html() == 'right')
							properties2 = {width: 0};
						else
							properties2 = {width: 0, marginLeft: cpWidth};
									
						duration = {duration: 400, queue: false};
					}
					else
					{
						duration = {
							duration: 400,
							queue: false,
							complete: function() {
								$(this).find('.imapper-content').parent().css('visibility', 'hidden');
							}
						};
					}
					
					$(this).find('.imapper-content-wrapper').stop(true).animate(properties, duration);
					
					if ($this.attr('src').indexOf('images/icons/2/') >= 0)
						$(this).find('.imapper-content').stop(true).animate(properties2, {
									duration: 400,
									queue: false,
									complete: function() {
										$(this).find('.imapper-content').parent().css('visibility', 'hidden');
									}
							});
					
					//if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
					//{
						$('#imapper' + id + '-pin' + pinId).css('z-index', '10');
						$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '10');
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '9');
						
					//}
					
					$(this).css('z-index', '');	
				});
			}
			else if (openStyle[id] == 'click')
			{
				$('.imapper' + id + '-pin').click( function() {
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var cpWidth = ($(window).width() <= 600  && designStyle == 'responsive') ? ($(this).parent().parent().width() / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) : width;
					
					if (clicked[pinId] == 0)
					{
						var properties = {opacity: 1};
						var properties2 = {};
						var duration = {duration: 400, queue: true};
												
						$('.imapper' + id + '-pin').each(function() {
							var pid = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
						 	if (clicked[pid] == 1)
								$(this).trigger('click');
						});
						
						if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
						{
							$(this).css('z-index', '12');
							$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '12');
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '11');
							
						}
						else
						{
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '13');
						}

						$(this).parent().css('z-index', '100');
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						{
							if ($(this).parent().find('.imapper' + id + '-value-item-open-position').html() == 'right')
								properties2 = {width: cpWidth};
							else
								properties2 = {width: cpWidth, marginLeft: 0};
						}
						
						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('visibility', 'visible').animate(properties, duration);
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').find('.imapper-content').animate(properties2,
							{
								duration: 400,
								queue: false
							});
						
						$(this).find('.imapper-content-text').imCustomScrollbar('update');
						clicked[pinId] = 1;
					}
					else
					{
						var properties = {opacity: 0};
						var properties2 = {};
						var duration = {};
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
						{
							if ($(this).parent().find('.imapper' + id + '-value-item-open-position').html() == 'right')
								properties2 = {width: 0};
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

						$('#imapper' + id + '-pin' + pinId + '-content-wrapper').animate(properties, duration);
						
						if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').find('.imapper-content').animate(properties2,
							{
								duration: 400,
								queue: false,
								complete: function() {
									$(this).parent().css('visibility', 'hidden');
								}
						});
						
						//if ($(window).width() > 600 && designStyle == 'responsive' || designStyle == 'fluid')
						//{
							$('#imapper' + id + '-pin' + pinId).css('z-index', '10');
							$('#imapper' + id + '-value-item' + pinId + '-tab-number').css('z-index', '10');
							$('#imapper' + id + '-pin' + pinId + '-content-wrapper').css('z-index', '9');
							
						//}

						$(this).parent().css('z-index', '');
						
						clicked[pinId] = 0;
					}
				});
				
				$('#imapper' + id + '-map-image').click(function() {
					$('.imapper' + id + '-pin').each(function() {
						var pid = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
						 if (clicked[pid] == 1)
							$(this).trigger('click');
					});
				});
			}
			
			$(document).on('click', '.imapper-close-button', function() {
				if (openStyle[id] == 'click')
					$(this).parent().parent().find('.imapper' + id + '-pin').trigger('click');
				else if (openStyle[id] == 'hover')
					$(this).parent().parent().trigger('mouseleave');
			});
			
			$('.imapper' + id + '-pin').each(function() {
				var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
				
				contentWrapperOld[id][pinId] = [ $(this).parent().find('.imapper-content-wrapper').css('top'), $(this).parent().find('.imapper-content-wrapper').css('left'), 
					$(this).parent().find('.imapper-content-wrapper').css('width'), $(this).parent().find('.imapper-content-wrapper').css('height'), $(this).parent().find('.imapper-content-wrapper').css('z-index') ];
				
				contentOld[id][pinId] = [ $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('top'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('left'), 
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('width'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('height'),  
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('bottom'), $(this).parent().find('.imapper-content').not('.imapper-content-additional').css('right')];
				
				contentHeaderOld[id][pinId] = [ $(this).parent().find('.imapper-content-header').css('width'), $(this).parent().find('.imapper-content-header').css('font-size'), 
					$(this).parent().find('.imapper-content-header').css('padding-left') ];
				
				contentTextOld[id][pinId] = [ $(this).parent().find('.imapper-content-text').css('width'), $(this).parent().find('.imapper-content-text').css('height'), 
					$(this).parent().find('.imapper-content-text').css('margin-top'), $(this).parent().find('.imapper-content-text').css('font-size'), $(this).parent().find('.imapper-content-text').css('padding-left') ];
				
				$(this).parent().find('.imapper-content-tab').each(function(index) {
					contentTabOld[id][pinId][index] = [ $(this).css('width'), $(this).css('height'), $(this).css('bottom'), $(this).css('right') ];	
				});
				
				$(this).parent().find('.imapper-content-additional').each(function(index) {
					contentAdditionalOld[id][pinId][index] = [ $(this).css('width'), $(this).css('height'), $(this).css('bottom'), $(this).css('right') ];
				});
			});
			
			if ($(window).width() <= 600  && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						
					var positionTop = (-parseInt($(this).parent().css('top')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
					
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);	
					var pos = $(this).attr('src').indexOf('/images/');
					var pluginUrl = $(this).attr('src').substring(0, pos);
					var position = $(this).parent().find('.imapper' + id + '-value-item-open-position').html();
					var radius = parseInt($(this).parent().find('.imapper-content').css('border-bottom-right-radius')) / 2 + 1;
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width[id] + 'px', 'height': map_original_height[id] + 'px', 'z-index': '15'});
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width[id] + 'px', 'height': map_original_height[id] + 'px'});
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
					{
						$(this).parent().find('.imapper-content').css('width', '0px');
						if (position == 'left')
							$(this).parent().find('.imapper-content').css('margin-left', map_original_width[id] + 'px');
					}
					else if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
					{
						if (position == 'left' || position == 'right')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'height': cHeight[pinId], 'top': '', 'bottom': '0px'});
							
							var bottom = cHeight[pinId];
							var bottom_content = cHeight[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'width': map_original_width[id], 'height': '75px', 'bottom': bottom});
								$(this).find('a').css({'height': '75px', 'font-size': '24px'});
								bottom += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'width': map_original_width[id], 'bottom': bottom_content});
								bottom_content += 75 - radius;	
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'width': cWidth[pinId], 'left': '', 'right': '0px'});
							
							var right = cWidth[pinId];
							var right_content = cWidth[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'height': map_original_height[id], 'width': '75px', 'right': right});
								$(this).find('a').css({'width': '75px', 'font-size': '24px', 'height': map_original_height[id]});
								right += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'height': map_original_height[id], 'right': right_content});
								right_content += 75 - radius;	
							});
						}
					}

					$(this).parent().find('.imapper-content-header').css({'width': map_original_width[id] - 30 + 'px', 'font-size': parseInt($(this).parent().find('.imapper-content-header').css('font-size')) * 2 + 'px', 
						'padding-left': '20px'});
					
					var textHeight = $(this).parent().find('.imapper-content').height() - $(this).parent().find('.imapper-content-header').height() - 50;
					$(this).parent().find('.imapper-content-text').css({'width': map_original_width[id] - 30 + 'px', 'height': textHeight, 'margin-top': '70px', 
						'font-size': parseInt($(this).parent().find('.imapper-content-text').css('font-size')) * 2 + 'px', 'padding-left': '20px'});
						
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).imCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'none');
					$(this).parent().find('.imapper-arrow-border').css('display', 'none');
					$(this).parent().find('.imapper-triangle-border').css('display', 'none');
					
					$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + 'images/close.jpg">');
					$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer'});
				});
			}
		});
	});
	
	$(window).resize(function() {
		$("div[id*='imagemapper']").each( function() {
				
			var id = $(this).attr('id').substring(11, $(this).attr('id').indexOf('-'));

			var parent_width = ($(this).parent().width() < map_original_width[id]) ? $(this).parent().width() : map_original_width[id];
			var multiplier = parent_width / map_original_width[id];
			$(this).css('width', parent_width);
			
			if (multiplier <= 1)
			{
				$(this).find('.imapper-pin-wrapper').each(function() {
					$(this).css('transform', 'scale(' + multiplier + ')');
				});
				
				$(this).find('.imapper-content-text').each(function() {
					$(this).imCustomScrollbar('update');
				});
			}
			
			if ($(window).width() <= 600  && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var positionLeft = (-parseInt($(this).parent().css('left')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						
					var positionTop = (-parseInt($(this).parent().css('top')) / parseFloat($(this).parent().css('transform').substring($(this).parent().css('transform').indexOf('(') + 1, 
						$(this).parent().css('transform').indexOf(',')))) + 'px';
						
					var pos = $(this).attr('src').indexOf('/images/');
					var pluginUrl = $(this).attr('src').substring(0, pos);
					var position = $(this).parent().find('.imapper' + id + '-value-item-open-position').html();
					var radius = parseInt($(this).parent().find('.imapper-content').not('.imapper-content-additional').css('border-bottom-right-radius')) / 2 + 1;
					
					var tNumber = parseInt($(this).parent().find('.imapper-value-tab-number').html());
					cHeight[pinId] = map_original_height[id] - ((tNumber > 1) ? tNumber : 0) * (75 - radius);
					cWidth[pinId] = map_original_width[id] - ((tNumber > 1) ? tNumber : 0) * (75 - radius);
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': positionTop, 'left': positionLeft, 'width': map_original_width[id] + 'px', 'height': map_original_height[id] + 'px', 'z-index': '15'});
					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '0px', 'left': '0px', 'width': map_original_width[id] + 'px', 'height': map_original_height[id] + 'px'});
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0)
					{
						if (clicked[pinId] == 0)
						{
							$(this).parent().find('.imapper-content').css('width', '0px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', map_original_width[id] + 'px');
						}
						else
						{
							$(this).parent().find('.imapper-content').css('width', map_original_width[id] + 'px');
							if (position == 'left')
								$(this).parent().find('.imapper-content').css('margin-left', '0px');
						}
					}
					else if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
					{
						tab_clicked[pinId] = 1;
						if (position == 'left' || position == 'right')
						{
						   $(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'height': cHeight[pinId], 'top': '', 'bottom': '0px'});
							
							var bottom = cHeight[pinId];
							var bottom_content = cHeight[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'width': map_original_width[id], 'height': '75px', 'bottom': bottom});
								$(this).find('a').css({'height': '75px', 'font-size': '24px'});
								bottom += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'width': map_original_width[id], 'height': '0px', 'bottom': bottom_content});
								bottom_content += 75 - radius;	
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
						   $(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'width': cWidth[pinId], 'left': '', 'right': '0px'});
							
							var right = cWidth[pinId];
							var right_content = cWidth[pinId] + (75 - radius);
							$(this).parent().find('.imapper-content-tab').each(function() {
								$(this).css({'height': map_original_height[id], 'width': '75px', 'right': right});
								$(this).find('a').css({'width': '75px', 'font-size': '24px', 'height': map_original_height[id]});
								right += 75 - radius;
							});
							$(this).parent().find('.imapper-content-additional').each(function() {
								$(this).css({'height': map_original_height[id], 'width': '0px', 'right': right_content});
								right_content += 75 - radius;	
							});
						}
					}
					
					$(this).parent().find('.imapper-content-header').css({'width': map_original_width[id] - 30 + 'px', 'font-size': parseInt(contentHeaderOld[id][pinId][1]) * 2 + 'px', 'padding-left': '20px'});
					
					var textHeight = $(this).parent().find('.imapper-content').height() - $(this).parent().find('.imapper-content-header').height() - 50;
					$(this).parent().find('.imapper-content-text').css({'width': map_original_width[id] - 30 + 'px', 'height': textHeight, 'margin-top': '70px', 'font-size': parseInt(contentTextOld[id][pinId][3]) * 2 + 'px', 
						'padding-left': '20px'});
						
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).imCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'none');
					$(this).parent().find('.imapper-arrow-border').css('display', 'none');
					$(this).parent().find('.imapper-triangle-border').css('display', 'none');
					
					$(this).parent().find('.imapper-content-wrapper').append('<img class="imapper-close-button" src="' + pluginUrl + 'images/close.jpg">');
					$(this).parent().find('.imapper-close-button').css({'position': 'absolute', 'right': '30px', 'top': '25px', 'z-index': '100', 'transform': 'scale(2.3)', 'cursor': 'pointer', 'box-shadow': 'none'});
					
				});
			}
			else if ($(window).width() > 600 && designStyle == 'responsive')
			{
				$('.imapper' + id + '-pin').each(function() {
					var pinId = $(this).attr('id').substring($(this).attr('id').indexOf('-pin') + 4);
					var position = $(this).parent().find('.imapper' + id + '-value-item-open-position').html();
					cHeight[pinId] = height;
					cWidth[pinId] = width;
					
					$(this).parent().find('.imapper-content-wrapper').css({'top': contentWrapperOld[id][pinId][0], 'left': contentWrapperOld[id][pinId][1], 'width': contentWrapperOld[id][pinId][2], 
						'height': contentWrapperOld[id][pinId][3], 'z-index': contentWrapperOld[id][pinId][4]});

					$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': contentOld[id][pinId][0], 'left': contentOld[id][pinId][1], 'width': contentOld[id][pinId][2], 'height': contentOld[id][pinId][3]});
					
					if ($(this).attr('src').indexOf('images/icons/2/') >= 0 && position == 'left')
					{
						if (clicked[pinId] == 0)
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', width);
						else
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('margin-left', '0px');
					}
					else if ($(this).attr('src').indexOf('images/icons/1/') >= 0)
					{
						tab_clicked[pinId] = 1;
						if (position == 'left' || position == 'right')
						{			
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css('top', '');
							$(this).parent().find('.imapper-content-tab').each(function(index) {
								$(this).css({'width': contentTabOld[id][pinId][index][0], 'height': contentTabOld[id][pinId][index][1], 'bottom': contentTabOld[id][pinId][index][2]});
								$(this).find('a').css({'height': '', 'font-size': '12px'});
							});
							$(this).parent().find('.imapper-content-additional').each(function(index) {
								$(this).css({'width': contentAdditionalOld[id][pinId][index][0], 'height': contentAdditionalOld[id][pinId][index][1], 'bottom': contentAdditionalOld[id][pinId][index][2]});
							});
						}
						else if (position == 'top' || position == 'bottom')
						{
							$(this).parent().find('.imapper-content').not('.imapper-content-additional').css({'top': '', 'left': ''});
							$(this).parent().find('.imapper-content-tab').each(function(index) {
								$(this).css({'width': contentTabOld[id][pinId][index][0], 'height': contentTabOld[id][pinId][index][1], 'right': contentTabOld[id][pinId][index][3]});
								$(this).find('a').css({'width': '', 'font-size': '12px', 'height': contentTabOld[id][pinId][index][1]});
							});
							$(this).parent().find('.imapper-content-additional').each(function(index) {
								$(this).css({'width': contentAdditionalOld[id][pinId][index][0], 'height': contentAdditionalOld[id][pinId][index][1], 'right': contentAdditionalOld[id][pinId][index][3]});
							});
						}
					}
					
					$(this).parent().find('.imapper-content-header').css({'width': contentHeaderOld[id][pinId][0], 'font-size': contentHeaderOld[id][pinId][1], 'padding-left': contentHeaderOld[id][pinId][2]});
					$(this).parent().find('.imapper-content-text').css({'width': contentTextOld[id][pinId][0], 'height': contentTextOld[id][pinId][1], 'margin-top': contentTextOld[id][pinId][2], 
						'font-size': contentTextOld[id][pinId][3], 'padding-left': contentTextOld[id][pinId][4]});
					
					$(this).parent().find('.imapper-content-text').each(function() {
						$(this).imCustomScrollbar('update');
					});
					
					$(this).parent().find('.imapper-arrow').css('display', 'block');
					$(this).parent().find('.imapper-arrow-border').css('display', 'block');
					$(this).parent().find('.imapper-triangle-border').css('display', 'block');
					
					$(this).parent().find('.imapper-close-button').remove();
	
				});
			}
		});
	});
	
	function getOriginalSize(image)
	{
		var img = new Image(); 
		img.src = $(image).attr('src'); 
		var original_size = new Array();
		original_size[0] = img.width;
		original_size[1] = img.height;
		
		return original_size;
	}
})(jQuery);