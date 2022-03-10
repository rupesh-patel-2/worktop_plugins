(function($){
	mySliderMapper=function(o){
		var self;
		this.debug=false;
		self=this;
		this.init_end=false;
		this.ids=[];
		this.widths={};
		this.max_width=0;
		this.transform=false;
		this.my_transforms_prefix='';
		this.resized=false;
		this.do_resized=[];
		this.count_items=0;
		this.curr_item=0;
		this.animation_durr=450;
		this.animation_durr_1=350;
		this.my_from_autoplay=false;
		this.init=function(o){
			self.options=o;
			self.my_debug("Options",o);
			this.ids=self.options.ids;
			self.is_transform();
			//self.transform=false;
			self.my_debug("Transitions",{transform:self.transform,prefix:self.my_transforms_prefix});
			setTimeout(self.init_finish,1000);
			$(window).resize(self.new_resize);
			self.new_resize();
			if(self.options.animation_durr){
				self.animation_durr=self.options.animation_durr;
			}
			var ww=$(window).width();
			if(self.options.is_mobile==1){
				//Disable hover on mobile devices
				$(".my_nav_outter_right").addClass('fotorama__arr--disabled');
				$(".my_nav_outter_left").addClass('fotorama__arr--disabled');
				
			}
			//Dont't Allow autoplay on mobile devices only with mouse
			if((self.options.autoplay==1)&&(self.options.is_mobile==0)){
				setTimeout(self.my_autoplay,self.options.autoplay_sleep);
				$('#'+self.options.id).mouseover(function(){
						self.my_debug("Mouse over");
						clearTimeout(self.my_timeout_obj);
						self.my_autoplay_flag=false;
				});
				$('#'+self.options.id).mouseleave(function(){
						self.my_debug("Mouse leave");
						self.my_autoplay_flag=true;
						self.my_timeout_obj=setTimeout(self.my_autoplay,self.options.autoplay_sleep);
						
				});
				$('#'+self.options.id).parent('.my_fotorama_outter').find(".my_nav_outter").mouseenter(function(){
					self.my_debug("Mouse over outer");
					clearTimeout(self.my_timeout_obj);
					self.my_autoplay_flag=false;
				
				});
				$('#'+self.options.id).parent('.my_fotorama_outter').find(".my_nav_outter").mouseleave(function(e){
					var is=self.is_inner_object("#"+self.options.id,e.pageX,e.pageY);
					if(!is){
						self.my_debug("Mouse outer nav start aniumation");
					//clearTimeout(self.my_timeout_obj);
						self.my_autoplay_flag=true;
						self.my_timeout_obj=setTimeout(self.my_autoplay,self.options.autoplay_sleep);
					
					}
				});
				$('#'+self.options.id).click(function(e){
					self.my_debug("Mouse over nav");
					clearTimeout(self.my_timeout_obj);
					self.my_autoplay_flag=false;
					
				});
			}
			/*$(".my_fotorama_mapper").fotorama({
				
			});*/
		};
		this.my_autoplay=function(){
			self.my_debug("Autoplay",{flag:self.my_autoplay_flag});
			if(self.my_autoplay_flag==false){
				self.my_timeout_obj=setTimeout(self.my_autoplay,self.options.autoplay_sleep);
				return;
			}
			if(self.my_working){
				self.my_timeout_obj=setTimeout(self.my_autoplay,self.options.autoplay_sleep);
				return;
			}else {
				self.my_from_autoplay=true;
				$('.my_nav_right').trigger('click');
				var durr=self.options.autoplay_sleep+self.options.duration;
				clearTimeout(self.my_timeout_obj);
				self.my_timeout_obj=setTimeout(self.my_autoplay,durr);
				
				
			}
		};
		this.new_resize=function(){
			var ww=$(window).width();
			self.my_debug("**Resize**",ww);
			if(ww<600){
				$(".my_nav_outter_right").addClass('fotorama__arr--disabled');
				$(".my_nav_outter_left").addClass('fotorama__arr--disabled');
				
				var my_scale=Math.round(ww/600*10)/10-0.3;
				if(my_scale<0.3)my_scale=0.3;
				self.my_debug("**Transmorms**",my_scale);
				if(self.transform){
					var my_l=40*(1-my_scale);
					self.my_debug("Change position",my_l);
					my_trans=self.my_transforms_prefix+'transform';
					$(".my_nav").css(my_trans,'scale('+my_scale+')');
					$(".my_nav_left").css('margin-left','-'+my_l+'px');
					$(".my_nav_right").css('margin-right','-'+my_l+'px');
					//$(".my_fotorama_prev_image").css('margin-top','-'+my_l+'px');
					//$(".my_fotorama_next_image").css('margin-top','-'+my_l+'px');
					
				}
			}else {
				$(".my_nav_right").removeClass('fotorama__arr--disabled');
				$(".my_nav_left").removeClass('fotorama__arr--disabled');
				
				if(self.transform){
					my_trans=self.my_transforms_prefix+'transform';
					$(".my_nav").css(my_trans,'');
					$(".my_nav_left").css('margin-left','');
					$(".my_nav_right").css('margin-right','');
					//$(".my_fotorama_prev_image").css('margin-top','');
					//$(".my_fotorama_next_image").css('margin-top','');
					
					
					
					
				}
			
			}
		};
		this.is_transform=function(){
			var obj = document.createElement('div');
            var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
            for (var i in props) {
		            if ( obj.style[ props[i] ] !== undefined ) {
		            if(props[i]=='transform'){
		            	self.my_transforms_prefix="";
			            
		            }else {
		            var my_pref=props[i].replace('Transform','').toLowerCase();
		            if(my_pref==""){
		            	self.my_transforms_prefix="";
		            }else {
		            	self.my_transforms_prefix="-"+my_pref+"-";
		            }
		            }
		           // my_admin_debug("TRansform Prefix ",my_transforms_prefix);
		              //return true;
		            self.transform=true;
		            }
		            }
        return false;    
		};
		this.getImageSize=function(image){
			
				var img = new Image(); 
				img.src = $(image).attr('src');
				var original_size = new Array();

				original_size[0] = img.naturalWidth;
				original_size[1] = img.naturalHeight;
				self.my_debug("image original size",original_size);
				return original_size;
				
			
				
		};
		this.resize=function(){
			var fotorama=$("#"+self.options.id).data('fotorama');
			var h=$(fotorama.activeFrame.$stageFrame).find(".imagemapper-wrapper").height();
			var w=$(fotorama.activeFrame.$stageFrame).find(".imagemapper-wrapper").width();
			var w_f=$("#"+self.options.id).parent('.my_fotorama_outter').width();
			
			self.my_debug("Fotorama resize",{w:w,h:h,w_f:w_f});
			fotorama.resize({
				width:w_f,
				height:h});
			//setTimeout(function(){
			self.resized=true;
			self.do_resized=[];
			/*$("#"+self.options.id+" .fotorama__active").find(".imagemapper-wrapper").each(function(i,v){
				
				var id=$(v).attr('id');
				id=id.replace('imagemapper','');
				id=id.replace('-wrapper','');
				self.do_resized[self.do_resized]=id;
				
				self.my_debug('Resize immaper',id);
				///$(v).width(w_f);
				/*img_s=self.getImageSize($(v).find("#imapper"+id+"-map-image"));
				im_w=img_s[0];
				if(im_w<w_f){
					self.my_debug("Set resized image",im_w);
					$(v).width(im_w);
					$(".my_fotorama_item[data-my-id='"+id+"']").width(w_f);
					
				}else {
					self.my_debug("Set resized full",w_f);
					$(v).width(w_f);
					$(".my_fotorama_item[data-my-id='"+id+"']").width(w_f);
					
				}*/
				//my_imapper_window_resize(id);
				/*var im_w=$(v).find("img").width();
				if(im_w<w_f){
					$(v).width(im_w);
				}*/
				
			//});
			/*$("#"+self.options.id).find(".imagemapper-wrapper").width(w_f);
			var im_w=$("#"+self.options.id).find(".imagemapper-wrapper img").width();
			if(w_f>im_w){
				$("#"+self.options.id).find(".imagemapper-wrapper").width(im_w);
				
			}*/
			var h=$(fotorama.activeFrame.$stageFrame).find(".imagemapper-wrapper").height();
			fotorama.resize({
				width:w_f,
				height:h});
			/*var ww=$(window).width();
			$.each(self.ids,function(i,v){
				if(ww>600){
				my_content_position_function(v);
				}
			});*/
			//},500);
		};
		this.init_finish=function(){
			var finish=true;
			$.each(self.ids,function(i,v){
			 var m_id='imagemapper'+v+'-wrapper';
			 self.my_debug("Check visibility",m_id);
			 if(!$("#"+m_id).is(':visible')){
				 finish=false;
				 self.my_debug("Not Finished")
				 return false;
			 }
			 
			});
			if(!finish)
			setTimeout(self.init_finish,1000);
			else {
				 self.init_slider_new();
				 self.my_debug("Init Finished");
				 self.init_end=true;
					
			}
			$(".fotorama__arr--next").mouseenter(self.animate_image_next);
			$(".fotorama__arr--next").mouseleave(self.animate_leave_image_next);
			
			$(".fotorama__arr--prev").mouseenter(self.animate_image_prev);
			$(".fotorama__arr--prev").mouseleave(self.animate_leave_image_prev);
		};
		this.set_next_prev_image=function(){
			
			var curr_item=self.curr_item;
			var my_count=self.count_items-1;
			if(my_count>0){
			var next_i;;
			var prev_i;
					
			var n=curr_item+1,p=curr_item-1;
			next_i=n+1;
			prev_i=p-1;
			if(n>my_count){
				n=0;
				next_i=1;
			}
			if(p<0){
				p=my_count;
				prev_i=p+1;
			}
			var my_total=self.count_items;
			var str='';
			var img=$(".my_slider_image[data-c='"+n+"']").html();
			str=next_i+'/'+my_total;
			
			//var img_html=img+'<span class="my_fotorama_blue">'+str+'</span>';
			$(".my_fotorama_next_image").html(img);
			var img=$(".my_slider_image[data-c='"+p+"']").html();
			//str=prev_i+'/'+my_total;
			//img_html=img+'<span class="my_fotorama_blue">'+str+'</span>';
			$(".my_fotorama_prev_image").html(img);
			
			}
		};
		this.init_slider_new=function(){
			
			var my_slider_id='#'+self.options.id;
			self.my_debug("**Init slider**",my_slider_id);
			var ww=$(my_slider_id).parent(".my_fotorama_outter").width();
			//$(my_slider_id).find(".my_fotorama_item").width(ww);
			
			var my_count=$(my_slider_id+" .my_fotorama_item").length;
			self.count_items=my_count;
			if(typeof self.options.curr_item!='undefined'){
				self.curr_item=self.options.curr_item;
			}
			self.my_debug("**Init slider** count",{count:my_count,curr:self.curr_item});
			
			var dots_html;
			var width=18*my_count;
			dots_html='<div class="my_fotorama_nav_items_div"  style="width:'+width+'px" data-my-id="'+self.options.id_n+'">';
			self.set_next_prev_image();
			/**
			 * Hide others
			 */
			for(var i=0;i<my_count;i++){
				dots_html+='<div class="my_fotorama_nav_items" data-c="'+i+'">';
				dots_html+='<div class="my_fotorama_nav_dot"></div></div>';
			}
			$(my_slider_id).parents(".my_fotorama_outter").after(dots_html);
			$(my_slider_id).find(".my_fotorama_item").each(function(i,v){
				$(v).find(".imagemapper-wrapper").data('my-slider',1);
				if(i!=self.curr_item){
					$(v).css('position','absolute');
					$(v).css('top','-10000px');
					$(v).css('left','-10000px');
					//$(v).css('opacity',0);
					//$(v).hide();
				}
				});
			self.set_icon_curr();
			$(my_slider_id).css('visibility','visible');
			//$(".fotorama__arr--prev").click(self.my_move_slider);
			//$(".fotorama__arr--next").click(self.my_move_slider);
			$(".my_nav_right").click(self.my_move_slider);
			$(".my_nav_left").click(self.my_move_slider);
			$(".my_fotorama_nav_items").click(self.my_jump);
		};
		this.my_jump=function(e){
			var n=$(this).data('c');
			var curr_item=self.curr_item;
			self.my_debug("Jump",{n:n,curr_item:curr_item});
			if(curr_item==n)return;
			if(self.my_working)return;
			self.my_working=true;
			var my_slider_id='#'+self.options.id;
			
			/*var curr_item=self.curr_item;
			var my_count=self.count_items-1;
			var dir='left';
			var n=0;
			if($(this).hasClass('fotorama__arr--next')){
				dir='right';
			}
			if(dir=='left'){
				n=curr_item-1;
				if(n<0)n=my_count;
			}else if(dir=='right'){
				n=curr_item+1;
				if(n>my_count)n=0;
			}
			self.my_debug("**Move slider **",{dir:dir,n:n});
			*/
			self.my_next=n;
			self.my_debug("**Move slider**",n);
			var h=$(my_slider_id+" .my_fotorama_item[data-my-c='"+curr_item+"']").height();
			self.my_first_h=h;
			$(my_slider_id+" .my_fotorama_outter").height(h);
			
			$(my_slider_id+" .my_fotorama_item[data-my-c='"+curr_item+"']").fadeOut(self.options.duration,function(){
				$(this).css('position','absolute');
				$(this).css('top','-10000px');
				$(this).css('left','-10000px');
				$(this).show();
			
				var hh=$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").height();
				if(self.options.correct_diff==1){
				
				var diff=hh-self.my_first_height;
				/*if(diff<0){
				 var scrolltop=$(window).scrollTop();
				 scrolltop-=Math.abs(diff);
				 if(scrolltop<0)scrolltop=0;
				 $(window).scrollTop(scrolltop);
				}else {
					var scrolltop=$(window).scrollTop();
					 scrolltop+=Math.abs(diff);
					 if(scrolltop<0)scrolltop=0;
					 $(window).scrollTop(scrolltop);
				}
				var diff=hh-self.my_first_height;
				}*/
				
				if(diff<0){
				 var scrolltop=$(window).scrollTop();
				self.my_debug("Scrolltop",scrolltop);
				
				 scrolltop-=Math.abs(diff);
				 if(scrolltop<0)scrolltop=0;
				 $(window).scrollTop(scrolltop);
				}else {
					var scrolltop=$(window).scrollTop();
					self.my_debug("Scrolltop",scrolltop);
					
					scrolltop+=Math.abs(diff);
					 if(scrolltop<0)scrolltop=0;
					 $(window).scrollTop(scrolltop);
				}
				self.my_debug("Scroll ",{diff:diff,scrolltop:scrolltop});
				}
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('position','');
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('left','');
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('top','');
				
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('opacity',0);
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").animate({opacity:1},self.options.duration,function(){
					self.my_debug("Animation fadein finishde",self.my_next);
					self.my_working=false;
					self.curr_item=self.my_next;
					self.set_next_prev_image();
					self.set_icon_curr();

				});
				//$("#"+self.options.id+" .my_fotorama_outter").height(h);
				
				/*$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").fadeIn(self.options.duration,function(){
					self.my_working=false;
					self.curr_item=self.my_next;
					self.set_next_prev_image();
					self.set_icon_curr();
				});*/
			});
		};
		this.set_icon_curr=function(){
		 $(".my_fotorama_nav_items .my_fotorama_nav_dot").removeClass('my_fotorama_nav_dot_active');
		 $(".my_fotorama_nav_items[data-c='"+self.curr_item+"'] .my_fotorama_nav_dot").addClass('my_fotorama_nav_dot_active');
		 
		};
		this.my_move_slider=function(e){
			if(self.my_working)return;
			self.my_working=true;
			var my_slider_id='#'+self.options.id;
			
			var curr_item=self.curr_item;
			var my_count=self.count_items-1;
			var dir='left';
			var n=0;
			if($(this).hasClass('fotorama__arr--next')){
				dir='right';
			}
			if(dir=='left'){
				n=curr_item-1;
				if(n<0)n=my_count;
			}else if(dir=='right'){
				n=curr_item+1;
				if(n>my_count)n=0;
			}
			if(!self.my_from_autoplay){
				self.my_durr_1=10;
				if(dir=='right'){
					$(".my_nav_right").trigger('mouseleave');
					
					self.my_animate_dot_hide($("my_nav_right"));
					setTimeout(function(){
					delete self.my_durr_1;
					},50);
				}else {
					$(".my_nav_right").trigger('mouseleave');
					
					self.my_animate_dot_hide($("my_nav_left"));
					setTimeout(function(){
						delete self.my_durr_1;
						},50);
				}
			}
			self.my_debug("**Move slider **",{dir:dir,n:n});
			self.my_next=n;
			var h=$(my_slider_id+" .my_fotorama_item[data-my-c='"+curr_item+"']").height();
			self.my_first_height=h;
			//$(my_slider_id+" .my_fotorama_outter").height(h);
				
			
			
			
			$(my_slider_id+" .my_fotorama_item[data-my-c='"+curr_item+"']").fadeOut(self.options.duration,function(){
				$(this).css('position','absolute');
				$(this).css('top','-10000px');
				$(this).css('left','-10000px');
				$(this).show();
				var hh=$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").height();
				self.my_debug("Height",{fisrt:self.my_first_height,hh:hh});
				var diff=hh-self.my_first_height;
				if(self.options.correct_diff){
				if(!self.my_from_autoplay){
				if(diff<0){
				 var scrolltop=$(window).scrollTop();
				self.my_debug("Scrolltop",scrolltop);
				
				 scrolltop-=Math.abs(diff);
				 if(scrolltop<0)scrolltop=0;
				 $(window).scrollTop(scrolltop);
				}else {
					var scrolltop=$(window).scrollTop();
					self.my_debug("Scrolltop",scrolltop);
					
					scrolltop+=Math.abs(diff);
					 if(scrolltop<0)scrolltop=0;
					 $(window).scrollTop(scrolltop);
				}
				self.my_debug("Scroll ",{diff:diff,scrolltop:scrolltop});
				}
				}
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('position','');
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('left','');
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('top','');
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").css('opacity','0');
				
				//$("#"+self.options.id+" .my_fotorama_outter").height(hh);
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").animate({opacity:1},self.options.duration,function(){
					self.my_debug("Animation fadein finishde",self.my_next);
					self.my_working=false;
					self.curr_item=self.my_next;
					self.set_next_prev_image();
					self.set_icon_curr();
					self.my_from_autoplay=false;

				});
				/*
				$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").fadeIn(5000,function(){
					self.my_debug("Animation fadein finishde",self.my_next);
					self.my_working=false;
					self.curr_item=self.my_next;
					self.set_next_prev_image();
					self.set_icon_curr();
				});*/
			});
			/*$(my_slider_id+" .my_fotorama_item[data-my-c='"+curr_item+"']").animate(
					{opacity:0},
					{
					step:function(now,fx){
						if(now==0.2){
							self.my_debug("Start showing next",now);
							$("#"+self.options.id+" .my_fotorama_item[data-my-c='"+self.my_next+"']").fadeIn(self.options.duration,function(){
								self.my_working=false;
								self.curr_item=self.next;
								self.set_next_prev_image();
								
							});
						}
					},
					complete:function(){
						$(this).hide();
					},
					duration:self.options.duration
						
					}
			);*/
			
		};
		this.my_animate_image=function(obj){
			var d1=self.animation_durr/2;
			
			$(obj).find("img").my_scale=0;
			$(obj).find("img").finish();
			self.my_debug("Animate image");
			if(self.transform){
				
				$(obj).find("img").my_scale=0;
				my_trans=self.my_transforms_prefix+'transform';
				$(obj).find("img").css(my_trans,'scale(0)');
				$(obj).find("img").css('display','block');
				$(obj).find("img").animate({
					my_scale:1
				},{
				step:function(now,fx){
					my_trans=self.my_transforms_prefix+'transform';
					$(this).css(my_trans,'scale('+now+')');
				},
				complete:function(){
					//delete self.my_animate_image_flag;
				},
				duration:d1
				});
			}else {
				$(obj).find("img").fadeIn(d1,function(){
					delete self.my_animate_image_flag;
				});
			}
		};
		this.my_animate_dot_hide=function(obj){
			var d1=self.animation_durr_1;
			if(typeof self.my_durr_1!='undefined'){
				d1=self.my_durr_1;
				//delete self.my_durr_1;
			}
			self.my_debug("Animate dot hide",$(obj).attr('class'));
			
			if(!self.transform){
				$(obj).find(".my_fotorama_blue").fadeOut(self.animation_durr,function(){
					$(this).hide();
				});
			}else {
				$(obj).find('.my_fotorama_blue').my_scale=1;
				my_trans=self.my_transforms_prefix+'transform';
				$(obj).find(".my_fotorama_blue").css(my_trans,'scale(0)');
				$(obj).find(".my_fotorama_blue").css('display','block');	
			$(obj).find(".my_fotorama_blue").animate({
				my_scale:0
			},{
			step:function(now,fx){
				if(fx.prop=='my_scale'){
					my_trans=self.my_transforms_prefix+'transform';
					$(this).css(my_trans,'scale('+now+')');
				}
			},
			complete:function(){
				//delete self.my_animate_image_flag;
				$(this).hide();
			},
			duration:d1
			});
			}
		};
		this.my_animate_dot=function(obj){
			self.my_debug("Animate dot show",$(obj).attr('class'));
			
			var d1=self.animation_durr/2;
			var curr=self.curr_item;
			var dir='left';
			if($(obj).parents(".my_nav_outter").hasClass('fotorama__arr--next'))dir='right';
			var str='';
			$(obj).find('span.my_nav_arrow').finish();
			if($(obj).find('.my_fotorama_blue').length>0){
				$(obj).find('.my_fotorama_blue').finish();
				$(obj).find('.my_fotorama_blue').remove();
			}
			$(obj).find(".my_nav_arrow").show();
			if(dir=='left'){
				var prev=curr;
				if(prev==0)prev=self.count_items;
				str=prev+'/'+self.count_items;
			}else {
				var next=curr+2;
				if(next>self.count_items)next=1;
				str=next+'/'+self.count_items;
			}
			$(obj).append('<span class="my_fotorama_blue">'+str+'</str>');
			var an_obj={};
			if(dir=='left'){
				an_obj={"margin-left":"-15px"};
				$(obj).find('.my_nav_arrow').css('margin-left','0px');
				
			}else {
				an_obj={"margin-left":"15px"};
				$(obj).find('.my_nav_arrow').css('margin-left','0px');
				
			}
			
			self.my_dir=dir;
			self.my_obj=obj;
			$(obj).find(".my_fotorama_blue").css('display','none');
			
			$(obj).find('.my_nav_arrow').animate(
					an_obj,{
				complete:function(){
						if(!self.transform){
							$(self.my_obj).find(".my_nav_arrow").hide();
							//$(self.my_obj).find('.my_fotorama_blue').my_scale=0;
							$(self.my_obj).find(".my_fotorama_blue").fadeIn(d1,function(){
								if(self.dir=='left'){
									$(self.my_obj).find(".my_nav_arrow").css('margin-left','');
								}else $(self.my_obj).find(".my_nav_arrow").css('margin-left','');
								$(self.my_obj).find(".my_nav_arrow").show();
							});
								
						}else {
						self.my_debug("Complte my_nav_arrow");		
						$(self.my_obj).find(".my_nav_arrow").hide();
						$(self.my_obj).find('.my_fotorama_blue').my_scale=0;
						var my_trans=self.my_transforms_prefix+'transform';
						$(self.my_obj).find(".my_fotorama_blue").css(my_trans,'scale(0)');
						$(self.my_obj).find(".my_fotorama_blue").css('display','block');
						$(self.my_obj).find(".my_fotorama_blue").animate({
							my_scale:1
							},{
								step:function(now,fx){
									if(fx.prop=='my_scale'){
											my_trans=self.my_transforms_prefix+'transform';
											$(this).css(my_trans,'scale('+now+')');
									}
								},
								complete:function(){
									//delete self.my_animate_image_flag;
									if(self.dir=='left'){
										$(self.my_obj).find(".my_nav_arrow").css('margin-left','');
									}else $(self.my_obj).find(".my_nav_arrow").css('margin-left','');
									$(self.my_obj).find(".my_nav_arrow").show();
								},
								duration:d1
							});
					}
						},
					
						duration:d1
					});
			
		};
		this.is_inner_object=function(my_class,x,y){
			var pos;
			var my_sel="."+my_class;
			if(my_class.indexOf("#")===0){
				pos=$(my_class).offset();
				my_sel=my_class;
			}
			else pos=$("."+my_class).offset();
			var pos_x1=pos.left;
			var pos_y1=pos.top;
			var pos_x2=pos_x1+$(my_sel).width();
			var pos_y2=pos_y1+$(my_sel).height();
			self.my_debug("Position",{c:my_class,x:x,y:y});
			self.my_debug("Position",{pos_x1:pos_x1,pos_y1:pos_y1,pos_x2:pos_x2,pos_y2:pos_y2});
			
			
			var found=false;
			if((x>pos_x1)&&(x<pos_x2)){
				if((y>pos_y1)&&(y<pos_y2)){
					found=true;
				}
			}
			self.my_debug("Found",{found:found});
			
			return found;
		};
		this.animate_image_next=function(e){
			/**
			 * check if is in
			 */
			if($(this).hasClass('fotorama__arr--disabled'))return;
			var showed=$(".my_fotorama_next_image").is(":visible");
			var animated=$(".my_fotorama_next_image").is(":animated");
			self.my_debug("***********Showed check return from animation**********",{showed:showed,is:is,animated:animated});
			
			if(showed&&!animated){
				
				var is=self.is_inner_object("my_nav_outter_right",e.pageX,e.pageY);
				
				self.my_debug("*************Showed return from animation*******",{showed:showed,is:is,animated:animated});
				if(is)return;
			}
			$(".my_fotorama_next_image").finish();
			var d1=self.animation_durr;
			/*if(typeof self.my_durr_1!='undefined'){
				d1=self.my_durr_1;
				//delete self.my_durr_1;
			}*/
			if(self.transform){
				self.my_animate_dot($(".my_nav_right"));
				$(".my_fotorama_next_image").my_scale=0;
				my_trans=self.my_transforms_prefix+'transform';
				$(".my_fotorama_next_image").css(my_trans,'scale(0)');
				$(".my_fotorama_next_image").show();
				$(".my_fotorama_next_image img").hide();
				$(".my_fotorama_next_image img").my_scale=0;
				$(".my_fotorama_next_image").animate(
						{
							my_scale:1,
							/*opacity:1*/
						},{
							step:function(now,fx){
								//fx.start=0;
								if(fx.prop=='my_scale'){
									if((now>0.6)&&(typeof self.my_animate_image_flag=='undefined')){
										self.my_animate_image_flag=1;
										self.my_animate_image(this);
									}
									//my_admin_debug("Now",now);
									my_trans=self.my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}
								
						},
							complete:function(){
							delete self.my_animate_image_flag;
							},
							duration:d1
							}		
				);
			}else {
				self.my_animate_dot($(".my_nav_right"));
				$(".my_fotorama_next_image").fadeIn(self.animation_durr);
				self.my_animate_image_flag=1;
				self.my_animate_image(this);
			}
		};
		this.animate_image_prev=function(e){
			var d1=self.animation_durr;
			
			/*if(typeof self.my_durr_1!='undefined'){
				d1=self.my_durr_1;
				//delete self.my_durr_1;
			}*/
			if($(this).hasClass('fotorama__arr--disabled'))return;
			var showed=$(".my_fotorama_prev_image").is(":visible");
			var animated=$(".my_fotorama_prev_image").is(":animated");
			self.my_debug("**********Showed check return from animation******",{showed:showed,is:is,animated:animated});
			
			if(showed&&!animated){
				var is=self.is_inner_object("my_nav_outter_left",e.pageX,e.pageY);
				self.my_debug("**********Showed return from animation*********",{showed:showed,is:is,animated:animated});
				
				if(is)return;
			}
			$(".my_fotorama_prev_image").finish();
			if(self.transform){
				self.my_animate_dot($(".my_nav_left"));
				$(".my_fotorama_prev_image").my_scale=0;
				my_trans=self.my_transforms_prefix+'transform';
				$(".my_fotorama_prev_image").css(my_trans,'scale(0)');
				$(".my_fotorama_prev_image").show();
				$(".my_fotorama_prev_image img").hide();
				$(".my_fotorama_prev_image img").my_scale=0;
				$(".my_fotorama_prev_image").animate({my_scale:1},{
							step:function(now,fx){
								//fx.start=0;
								if(fx.prop=='my_scale'){
									if((now>0.6)&&(typeof self.my_animate_image_flag=='undefined')){
										self.my_animate_image_flag=1;
										self.my_animate_image(this);
									}
									//my_admin_debug("Now",now);
									my_trans=self.my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}
							
						},
						duration:d1,
						complete:function(){
							delete self.my_animate_image_flag;
							
							//$(".my_fotorama_next_image").hide();
						}
						}
				);
			}else {
				self.my_animate_dot($(".my_nav_left"));
				$(".my_fotorama_prev_image").fadeIn(d1);
				self.my_animate_image_flag=1;
				self.my_animate_image(this);
				
			}
			
		};
		this.animate_leave_image_next=function(e){
			var d1=self.animation_durr_1;
			
			if(typeof self.my_durr_1!='undefined'){
				d1=self.my_durr_1;
				delete self.my_durr_1;
			}
			if($(this).hasClass('fotorama__arr--disabled'))return;
			var is=self.is_inner_object("my_nav_outter_right",e.pageX,e.pageY);
			
			if(is)return;
			
			if(self.transform){
				self.my_animate_dot_hide($(".my_nav_right"));
				/*this.my_scale=;*/
				$(".my_fotorama_next_image").animate(
						{
							my_scale:0
						},{
							step:function(now,fx){
								//fx.start=0;
								if(fx.prop=='my_scale'){
									//my_admin_debug("Now",now);
									my_trans=self.my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}},
							duration:d1,
							complete:function(){
									$(".my_fotorama_next_image").hide();
								}
							}		
				);
			}else {
				self.my_animate_dot_hide($(".my_nav_right"));
				
				$(".my_fotorama_next_image").fadeOut(d1);
				
			}
		};
		this.animate_leave_image_prev=function(e){
			
			if($(this).hasClass('fotorama__arr--disabled'))return;
			var is=self.is_inner_object("my_nav_outter_left",e.pageX,e.pageY);
			if(is)return;
			
			var d1=self.animation_durr_1;
			if(typeof self.my_durr_1!='undefined'){
				d1=self.my_durr_1;
				delete self.my_durr_1;
			}
			if(self.transform){
				self.my_animate_dot_hide($(".my_nav_left"));
				$(".my_fotorama_prev_image").my_scale=0;
				
				$(".my_fotorama_prev_image").animate({my_scale:0},
						{
							step:function(now,fx){
								//fx.start=0;
								if(fx.prop=='my_scale'){
									//my_admin_debug("Now",now);
									my_trans=self.my_transforms_prefix+'transform';
									$(this).css(my_trans,'scale('+now+')');	
								}
							
						},
						duration:d1,
						complete:function(){
							$(".my_fotorama_prev_image").hide();
						}
						}
				);
			}else {
				self.my_animate_dot_hide($(".my_nav_left"));
				
				$(".my_fotorama_prev_image").fadeOut(d1);
				
			}
		};
		this.init_slider=function(){
			
			var max_width=0;
			var t=0;
			var h=0;
			$.each(self.ids,function(i,v){
				
				var m_id='imagemapper'+v+'-wrapper';
				if(i>0){
					//$(".my_fotorama_item[data-my-id='"+v+"']").css('left',t+'px');
				}
				if(i==0){
					h=$("#"+m_id).height();
				}
				var w=$("#"+m_id).width();
				
				$(v).parent(".my_fotorama_item").width(w);
				
				t+=w;
				if(w>max_width)max_width=w;
			});
			self.my_debug("Max width",max_width);
			self.max_width=max_width;
			//$("#"+self.id+" .my_fotorama_mapper_inner").width(max_width);
			//$("#"+self.id+" .my_fotorama_mapper_out").width(t);
			/*$(".my_fotorama_mapper[data-my-id='"+self.id_n+"']").fotorama({
				width:self.max_width
			});*/
			var w_f=$("#"+self.options.id).parent('.my_fotorama_outter').width();
			self.my_debug("Id",self.options.id);
			$("#"+self.options.id).fotorama({
				width:w_f,
				height:h,
				arrows:'always',
				transition:'crossfade',
				trackpad:false,
				click:false,
				swipe:false
			});
			var first=self.ids[0];
			if(self.ids.length>1){
				var img=$(".my_slider_image[data-c='1']").html();
				$(".my_fotorama_next_image").html(img);
			}
			//self.init_actions(first);
			var ww=$(window).width();
			if(ww>600){
				my_imapper_content_position_function(first);
			}
				$.each(self.ids,function(i,v){
				//my_imapper_content_position_function(v);
			});
			$("#"+self.options.id+" .imagemapper-wrapper").data('my-slider',1);
			$("#"+self.options.id).on('fotorama:showend',self.set_height);
			self.my_debug("Max width",max_width);
			
		};
		self.init_actions=function(id){
			/*$("#"+self.options.id).find('.imapper' + id + '-pin').unbind('mouseenter');
			
			$("#"+self.options.id).find('.imapper' + id + '-pin').mouseenter(my_function_mousenter);
			$("#"+self.options.id).find('.imapper' + id + '-pin').unbind('mouseleave');
			$("#"+self.options.id).find('.imapper' + id + '-pin').mouseleave(my_function_mouseleave);
			*/
		};
		this.set_height=function(e,fotorama,ex){
			var my_c=fotorama.activeIndex;
			if(my_c>0){
				var c1=my_c-1;
				var img=$(".my_slider_image[data-c='"+c1+"']").html();
				$(".my_fotorama_prev_image").html(img);
			}
			count=self.ids.length-1;
			if(my_c<count){
				var c1=my_c+1;
				var img=$(".my_slider_image[data-c='"+c1+"']").html();
				$(".my_fotorama_next_image").html(img);
			
			}
			var my_id=$(fotorama.activeFrame.$stageFrame).find(".my_fotorama_item").data('my-id');
			self.my_debug("Id",my_id);
			/*if(self.resized){
				//if(! my_id in self.do_resized)
				var found=false;
				$.each(self.do_resized,function(i,v){
					if(v==my_id){
						found=true;
						return false;
					}
				});
				if(!found){
					var w_f=$("#"+self.options.id).parent('.my_fotorama_outter').width();
					
					self.do_resized[self.do_resized]=my_id;
					
					self.my_debug('Resize Immaper id',my_id);
					my_imapper_window_resize(my_id);
					
					/*$(v).width(w_f);
					img_s=self.getImageSize($(v).find("#imapper"+my_id+"-map-image"));
					im_w=img_s[0];
					if(im_w<w_f){
						self.my_debug("Set resized image",im_w);
						$(v).width(im_w);
					}else {
						self.my_debug("Set resized full",w_f);
						$(v).width(w_f);
					}*/
				
				//}
			//}
			var h=$(fotorama.activeFrame.$stageFrame).find(".imagemapper-wrapper").height();
			self.my_debug("Height",{id:fotorama.activeFrame.id,h:h});
			fotorama.setOptions({
				height:h});
			var ww=$(window).width();
			if(ww>600){
			
			my_imapper_content_position_function(my_id);
			}
		};
		this.my_debug=function(t,o){
			if(self.debug){
				if(window.console){
					console.log("Fotorama\n"+t,o);
			}
		}
		}
		this.init(o);
	};
})(jQuery);
