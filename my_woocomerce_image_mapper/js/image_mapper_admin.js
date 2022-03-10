(function($) {

var numberOfTabs = new Array();
my_debug=false;
my_admin_debug=function(t,o){
	if(my_debug){
		if(window.console){
			console.log('Wizard 1 \n'+t+' : '+JSON.stringify(o));
		}
	}
	
};
$(window).load(function(){	
	my_working_on_item=0;
	my_current_color_picker='';
	var numItems = 0;
	var itemClicked = 0;
	var first = 0;
	var itemIconListClicked = 0;
	var url = $('#plugin-url').val();
	my_attachemnt_data={};
	my_edit_pin='';
	my_autocomplete_cache={};
	my_added_pins=[];
	my_duplicate_pin='';
	/**
	 * Get image size
	 */
	my_imapperGetOriginalSize=function(image)
	{
		var img = new Image(); 
		img.src = $(image).attr('src');
		var original_size = new Array();

		original_size[0] = img.naturalWidth;
		original_size[1] = img.naturalHeight;
		my_admin_debug("image original size",original_size);
		return original_size;
		
	};
	$(document).on("change",".my_select_category",function(e){
		var id=$(this).attr('id');
		var val=$("#"+id+" option:selected").val();
		var text=$("#"+id+" option:selected").text();
		var pin_id=id.replace('pin_category_id_id_','');
		/*if(window.console){
			console.log('Change category',{id:id,val:val,text:text,pin_id:pin_id});
		}*/
		if(val==0){
			var text=$("#pin_product_id_"+pin_id).val();
			//if(text!=""){
			//}
			var o_title=text;
			if(o_title.length>20){
				o_title=o_title.substr(0,20)+'...';
			}
			$("#sort"+pin_id+"-mapper-pin-text").text(o_title);
			$("#imapper-sort"+pin_id+"-header small span").text(text);
			
		}else {
			var o_title=text;
			if(o_title.length>20){
				o_title=o_title.substr(0,20)+'...';
			}
			$("#sort"+pin_id+"-mapper-pin-text").text(o_title);
			$("#imapper-sort"+pin_id+"-header small span").text(text);
			
		}
	});
	/**
	 * Change pin icon
	 */
	my_change_pin_icon=function(my_img_src){	
		var my_input_id='my_pin_icon_id_'+thickboxId;
		$("#"+my_input_id).val(my_img_src);
		/*if(window.console){
			console.log('#my_pin_icon_'+thickboxId);
			var c=$("#my_pin_icon_"+thickboxId+" .my-icon-remove").length;
			console.log('count',c);
			
		}*/
		$("#my_pin_icon_"+thickboxId+" .my-icon-remove").parent('div').show();
		var img_html='<img src="'+my_img_src+'"/>';
		$("#my_pin_icon_"+thickboxId+" .my_image_icon_image").show();
		$("#my_pin_icon_"+thickboxId+" .my_image_icon_image div").html(img_html);
		
		//iconUploadBehavior();
		$("#my_pin_options_"+thickboxId+" ul li").each(function(i,v){
			if(i>0){
				$(v).css({
					width:'0px',
					height:'0px',
					'min-height':'0px',
					opacity:0
			});
		}
		});
		//$("#sort"+thickboxId+"-mapper-pin-wrapper").css('border','1px dashed red');
		
		$("#sort"+thickboxId+"-mapper-pin-wrapper").find(".imapper-pin-wrapper-my-inner").hide();
		$("#sort"+thickboxId+"-mapper-pin-wrapper .imapper-pin-my-out").find("img").remove();
		$("#sort"+thickboxId+"-mapper-pin-wrapper .imapper-pin-my-out").prepend(img_html);
		$("#sort"+thickboxId+"-mapper-pin-wrapper .imapper-pin-my-out img").data('my-id',thickboxId);
		$("#sort"+thickboxId+"-mapper-pin-wrapper .imapper-pin-my-out img").load(function(e){
			var my_id=$(this).data('my-id');
			my_admin_debug("Loaded img",my_id);
			var my_size=my_imapperGetOriginalSize($("#sort"+my_id+"-mapper-pin-wrapper img"));
			$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('width',my_size[0]+'px');
			$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('height',my_size[1]+'px');
			var w_t=my_size[0]/2;
			var h_t=my_size[1]/2;
			var my_l=my_size[0]+3;
			$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('position','absolute');
			$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('top','-'+h_t+'px');
			$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('left','-'+w_t+'px');
			$("#sort"+my_id+"-mapper-pin-text").css('top',h_t+'px');
			//var my_l_t=200-w_t;
			//$("#sort"+my_id+"-mapper-pin-text").css('left','-'+my_l_t+'px');
			
			$("#sort"+my_id+"-mapper-pin-delete").css('left','-'+my_l+'px');
			
			
		});
		
	};
	$(document).on('click', '.my-icon-custom', function(e) {
		thickboxId=$(this).attr('my_id');
		var send_attachment_bkp = wp.media.editor.send.attachment;
  	 	var button = $(this);
  	 	var id = button.attr('id').replace('_button', '');
  		_custom_media = true;
	    wp.media.editor.send.attachment = function(props, attachment){
	      if ( _custom_media ) {
	    	  my_admin_debug("Attachment",attachment);
	      	if(attachment.type=='image'){
	      		my_attachemnt_data=attachment;
	      		var h=attachment.sizes.full.height;
	      		var w=attachment.sizes.full.width;
	      		my_admin_debug("Image w,h",{w:w,h:h});
	      		my_change_pin_icon(attachment.url);
	      		/*$(".my-mapper-sort-image").removeAttr('style');
	      		var w_i=$(".my-mapper-sort-image").width();
	      		if(w_i>w){
	      			$(".my-mapper-sort-image").width(w);
	      			$(".my-mapper-sort-image").height(h);
	      		}
	      		
	      		$("#map-image").attr("src",attachment.url);//.siblings('input').attr('value', attachment.url);
	      		$("#map-input").val(attachment.url);
	      		$("#map-input-id").val(attachment.id);
	      		*/
	      	}else {
	      		alert(my_admin_woo_msgs.only_image_is_allowed);
	      		return;
	      	}
	      } else {
	        return _orig_send_attachment.apply( this, [props, attachment] );
	      };
	    };

	    wp.media.editor.open(button);
	    return false;


	});

	/**
	 * Click n dupliocate pin
	 */
	$(document).on('click','.my_diplicate_pin',function(e){
		e.preventDefault();
		var my_id=$(this).parents(".imapper-sortableItem").attr('id');
		my_admin_debug('Duplicate Pin Click on',my_id);
		my_id=my_id.replace('sort','');
		my_duplicate_pin=my_id;
		my_admin_debug("Duplicate pin",{my_id:my_id});
		var top=$(".mapper-sort-image-wrapper").offset().top;
		var msg=my_admin_woo_msgs.duplicate_pin_msg;
		msg=msg.replace(/{id}/g,my_id);
		alert(msg);
		$("html,body").animate({scrollTop:top});
	});
	/**
	 * Duplicate options
	 */
	my_duplicate_options=function(){
		var options=my_admin_options_array;
		var my_pin_icon_image=$("#my_pin_icon_id_"+my_duplicate_pin).val();
		
		$.each(options,function(i,v){
			var pre_name=i+'_'+my_duplicate_pin;
			var new_name=i+'_'+numItems;
			my_admin_debug("Field Duplicate",{i:i,v:v,pre_name:pre_name,new_name:new_name})
			if(i!='pin_product'){
			if(v=='font'){
				var arrays=['font','font_size','font_style','font_weight'];
				$.each(arrays,function(i1,v1){
					var prev_name=v1+i+'_'+my_duplicate_pin;
					var new_name=v1+i+'_'+numItems;
					var val=$("select[name='"+prev_name+"'] option:selected").val();
					my_admin_debug("Duplicate font ",{i:i,v:v,i1:i1,v1:v1,prev_name:prev_name,new_name:new_name,val:val});
					$("span[my_name='"+new_name+"']").text(val);
					
					//$("select[name='"+new_name+"']").filter("option[value='"+val+"']").prop("selected",true);
					$("select[name='"+new_name+"']").val(val);
					var l=$("select[name='"+new_name+"']").length;
					my_admin_debug("Select exists",l);
				});
			}else if(v=='on_off'){
				var is_checked=$("input[type='checkbox'][name='"+pre_name+"']").is(":checked");
				my_admin_debug("Duplicate Checkbox on_off",{is_checked:is_checked,new_name:new_name,prev_name:pre_name});
				if(is_checked){
					$("input[type='checkbox'][name='"+new_name+"']").prop('checked',true);
					
				}else {
					$("input[type='checkbox'][name='"+new_name+"']").prop('checked',false);
					
				}	
			}else if(v=='text'){
				var val=$("input[name='"+pre_name+"']").val();
				my_admin_debug("Duplicate Input Text",{new_name:new_name,prev_name:pre_name,val:val});
				$("input[name='"+new_name+"']").val(val);
			
			}else if(v=='select'){
				var val=$("select[name='"+pre_name+"'] option:selected").val();
				my_admin_debug("Duplicate Select",{new_name:new_name,prev_name:pre_name,val:val});
				$("select[name='"+new_name+"']").val(val);
				$("span[my_name='"+new_name+"']").text(val);
				
				var l=$("select[name='"+new_name+"']").length;
				my_admin_debug("Select exists",l);
			}else if(v=='slider'){
				//var prev_name=
				var val=$("input[name='"+pre_name+"']").val();
				my_admin_debug("Duplicate Slider",{new_name:new_name,prev_name:pre_name,val:val});
				var l=$("input[name='"+new_name+"']").length;
				my_admin_debug("Slider exists",l);
				$("input[name='"+new_name+"']").val(val);
				
			}else if(v=='color_picker'){
				//pre_name='hidden-'
				var val=$("input[name='"+pre_name+"']").val();
				my_admin_debug("Duplicate Color picker",{new_name:new_name,prev_name:pre_name,val:val});
				var l=$("input[name='"+new_name+"']").length;
				my_admin_debug("Color exists",l);
				$("input[name='"+new_name+"']").val(val);
				
			}
			}
		});
		/**
		 * Duplicate pin icon
		 */
		if(my_pin_icon_image!=""){
			my_admin_debug("Icon has icon change it ",my_pin_icon_image)
			thickboxId=numItems;
			my_change_pin_icon(my_pin_icon_image);
		}
		my_duplicate_pin='';
	};
	/*$('.imapper-admin-slider').slider({range: "min", max:500, slide: function( event, ui ) {
		$(this).siblings('input').val(ui.value);
	}});*/
	/**
	 * Duplicatepin
	 */
	
	/**
	 * Add pin dashed overlay and activate options 
	 */
	my_activate_pin=function(e){
		if(my_working_on_item==1){
			my_admin_debug("Working",1);
			return;
		}
		my_working_on_item=1;
		var attr=$(this).attr('my_open');
		
		if(typeof attr=='undefined'){
		
			$(".imapper-pin-wrapper ").each(function(i,v){
			$(v).find(".imapper-pin-my-out").css('border','none');
			$(v).find(".imapper-pin-delete").hide();
			$(v).removeAttr('my_open');
		});
		/**
		 * Hide visible adapters
		 */
		$(".dummy-adapter").filter(":visible").each(function(i,v){
			$(v).addClass('closed');
			//$(v).css('background-color','none');
			$(v).hide();
		});
		$(".imapper-sort-header").each(function(i,v){
			$(v).css('background-color','');
		});
		//$(this).css('width','30px');
		$(this).attr('my_open',1);
		$(this).find('.imapper-pin-my-out').css('border','1px dashed red');
		$(this).find(".imapper-pin-delete").show();
		my_id=$(this).attr('id');
		my_id=my_id.replace('sort','');
		my_id=my_id.replace('-mapper-pin-wrapper','');
		my_admin_debug("Edit pin",my_id);
		my_edit_pin=my_id;
		my_pin_to_edit_id='#sort'+my_id;
		/*$(".imapper-sortableItem").each(function(i,v){
			$(v).addClass('closed');
			$(v).find(".dummy-adapter").hide();
		});
		if($(this).find(".dummy-adapter").hasClass('closed')){
			$(my_pin_to_edit_id).find('.dummy-adapter').removeClass('closed');
		}else {
			$(my_pin_to_edit_id).find('.dummy-adapter').addClass('closed');
			
		}
		$(".dummy-adapter").filter(':visible').hide();
		$(".dummy-adapter").filter(':visible').siblings(".imapper-sort-header").css('background-color','none');
		*/
		$(my_pin_to_edit_id).find(".imapper-sort-header").css('background-color','rgb(200,200,200)');
		
		//if($(my_pin_to_edit_id).find(".dummy-adapter").filter(":visible").length==0){
		$(my_pin_to_edit_id).find(".dummy-adapter").slideToggle(function(){
			my_working_on_item=0;
		});
		//}}
		}
		my_working_on_item=0;
	};
	$(".imapper-pin-wrapper").click(my_activate_pin);
	/**
	 * Adjust slider ro input
	 */
	my_init_autocomplete=function(sel){
		$(sel).each(function(i,v){
			var id=$(v).attr('id');
			$("#"+id).autocomplete({
				minLenght:2,
				select:function(event,ui){
					var my_id=$(event.target).attr('id');
					var my_name=$(event.target).attr('name');
					my_admin_debug("Input id",my_id);
					my_admin_debug("Select",ui);
					if(typeof ui.item.id!='undefined'){
						my_admin_debug("Id",ui.item.id);
						var hidden_name='hidden_'+my_name;
						$("input[type='hidden'][name='"+hidden_name+"']").val(ui.item.id);
						var my_id_pin=my_id.replace("pin_product_id_","");
						var o_title=ui.item.label;
						if(o_title.length>20){
							o_title=o_title.substr(0,20)+'...';
						}
						var my_category_id='pin_category_id_id_'+my_id_pin;
						var my_sel_cat_val=$("#"+my_category_id+" option:selected").val();
						if(my_sel_cat_val==0){
							$("#imapper-sort"+my_id_pin+"-header small span").text(ui.item.label);
							$("#sort"+my_id_pin+"-mapper-pin-text").text(o_title);
						}
						$("#sort"+my_id_pin+"-mapper-pin-text").css('position','absolute');
						$("#sort"+my_id_pin+"-mapper-pin-text").css('left','-100px');
						$("#sort"+my_id_pin+"-mapper-pin-text").css('text-align','center');
						$("#sort"+my_id_pin+"-mapper-pin-text").css('width','200px');
						
						
						
						//$("#sort"+my_id_pin+"-mapper-pin-text").css('right', ((($("#sort"+my_id_pin+"-mapper-pin-text").width())/ 2)-8) + 'px');	
					}
				},
				source:function(request,response){
					var term=request.term;
					if(term in my_autocomplete_cache){
					response(my_autocomplete_cache[term]);
					return;
					}
					var my_nonce=$("#my_search_nonce_id").val();
					var data={
							action:'get_woo_products',
							my_nonce:my_nonce,
							term:term	
					};
					$.ajax({
						url:my_admin_ajax,
						dataType:'json',
						type:'POST',
						data:data,
						success:function(data){
							if(data.error==0){
								my_autocomplete_cache[term]=data.data;
								response(data.data);
							}
							else response({});
						
						},
						error:function(){
							response({});
						}
					});
				}
			});
		});
	};
	my_set_blur_on_slider_input=function(e){
		var val=$(this).val();
		val=parseFloat(val);
		var min=parseFloat($(this).attr('my_min'));
		var max=parseFloat($(this).attr('my_max'));
		if(isNaN(val) || (val<min) || (val > max)){
			//$(this).val(1);
			if(val<min)val=min;
			else val=max;
			my_admin_debug("Error",val);
			
			$(this).val(val);
		}
		my_admin_debug("Check",val);
		$(this).siblings(".imapper-admin-slider").slider("option","value",val);
	};//blur event on input
	$(".imapper-admin-wrapper .my_slider_input").blur(my_set_blur_on_slider_input);	
	my_init_sliders_main=function(sel){
	$(sel).each(function(i,v){
		var min=parseFloat($(v).siblings('input').attr('my_min'));
		var max=parseFloat($(v).siblings('input').attr('my_max'));
		var step=parseFloat($(v).siblings('input').attr('my_step'));
		var val=parseFloat($(v).siblings('input').val());
		
		my_admin_debug("Init Sliders",{min:min,max:max,step:step,val:val});
		$(v).slider({value:val,range: "min", max:max,min:min,step:step, slide: function( event, ui ) {
			$(this).siblings('input').val(ui.value);
		}});
	});
	};//init sliders
	my_init_sliders_main('.imapper-admin-wrapper .imapper-admin-slider');
	
	//$( '.imapper-admin-wrapper .color-picker-iris' ).
	my_init_color_picker=function(sel){
		$(sel).each(function(){
            //$(this).css('background', $(this).val());
		
			var name=$(this).attr('my_name');
			var color=$("input[type='hidden'][name='"+name+"']").val();
			$(this).siblings(".my_color_picker_color").css('background-color',color);
            my_admin_debug("Init colors",{name:name,color:color});
            $(this).data('my-color',color);
            $(this).iris({
				height: 145,
				color:color,
               // target:$(this).parent().find(".color-picker-iris-holder[name='"+name+"']"),
				change: function(event, ui) {
                    var color=ui.color.toString();
                    var name=$(this).attr('my_name');
                    $(this).siblings(".my_color_picker_color").css('background-color',color);
                    $("input[type='hidden'][name='"+name+"']").val(color);
                    //$(this).css( 'background-color', ui.color.toString());
                }              
            });
            
		});
		$(".iris-picker").each(function(i,v){
			if($(this).find(".iris-picker-inner .my_change_color_input_12").length==0){
			var h=$(this).height();
			h+=50;
			$(this).height(h);
			var color="";
			color=$(this).parents(".my_color_picker_title").data('my-color');
			my_admin_debug("Init color text field",color);
			//var color=$(this).iris("option",true);
			$(this).find(".iris-picker-inner").append('<div class="clear"></div><div style="margin-top:10px">'+my_admin_woo_msgs.color_hex+'<input type="text" class="my_change_color_input_12" value="'+color+'"/></div>');
			}
		});
		$(".my_change_color_input_12").unbind('keyup');
		$(".my_change_color_input_12").keyup(function(e){
			var keycode=e.which;
			my_admin_debug("Key code",keycode);
			var val=$(this).val();
			/*var l=val.length-1;
			if((keycode<48)||(keycode>57&&keycode<65)||(keycode>70)){
				
				val=val.substr(0,l);
				$(this).val(val);
				return;
			}*/
			
			if(val.length==0){
				$(this).val('#');
				val='#';
			}
			if(val.length>=8){
				val=val.substr(0,7);
				$(this).val(val);
			}
			my_admin_debug("Change input text",val);
			if(val.length>1){
				/*if(!val.match(/^\#[0-9]+[a-f]+[A-F]+$/)){
					alert(my_admin_woo_msgs.wrong_color_hex);
					return;
				}else 
				*/
				$(this).parents(".my_color_picker_title").iris("color",val);
			}
		});
		
	};
	$(document).on('click',".my_change_color_input_12",function(e){
		e.stopPropagation();
		
	});
	my_init_color_picker('.imapper-admin-wrapper .my_color_picker_title');
		
	$(document).on('click','.my_color_picker_title',function(e){
		/*$(".iris-picker").each(function(i,v){
			$(v).iris('hide');
		});*/
		e.stopPropagation();
		if(my_working_on_item==1)return;
		my_working_on_item=1;
		/*var off=$(this).offset();
		var top=off.top+25;
		var left=off.left;*/
		//my_admin_debug("Picker position",{top:top,left:left,off:off});
	
		
		var new_name=$(this).attr('my_name');
		my_admin_debug("Show picker",{curr:my_current_color_picker,new_name:new_name});
		if(my_current_color_picker==new_name){
			//$(".my_color_picker_title[my_name='"+my_current_color_picker+"']").text(my_admin_woo_msgs.select_color);
			
			my_admin_debug("Hide picker",my_current_color_picker);
			//$(".my_color_picker_title[my_name='"+my_current_color_picker+"']").iris("hide");
			$(".my_color_picker_title[my_name='"+my_current_color_picker+"'] .my_select_picker").show();
			$(".my_color_picker_title[my_name='"+my_current_color_picker+"'] .my_close_picker").hide();
			$(".my_color_picker_title[my_name='"+my_current_color_picker+"']").iris("hide");
			
			my_current_color_picker="";
			my_working_on_item=0;
			return;
		}
		if(my_current_color_picker!=''){
			my_admin_debug("Hide picker",my_current_color_picker);
			$(".my_color_picker_title[my_name='"+my_current_color_picker+"']").iris("hide");
			my_current_color_picker="";
		}
		
		
		//$(this).text(my_admin_woo_msgs.close_picker);
		my_current_color_picker=$(this).attr('my_name');
		$(".my_color_picker_title[my_name='"+my_current_color_picker+"'] .my_select_picker").hide();
		$(".my_color_picker_title[my_name='"+my_current_color_picker+"'] .my_close_picker").show();
		
		
		my_admin_debug("Show picker",my_current_color_picker)
		$(this).iris('show');
		my_working_on_item=0;
		//$(".iris-picker").filter(':visible').css('top',top);
		//$(".iris-picker").filter(':visible').css('left',left);
		
		
	});
	
	$(document).on('click',function(e){
		e.stopPropagation();
		if(my_working_on_item==1)return;
		my_working_on_item=1;
		if(my_current_color_picker!=''){
			//$(".my_color_picker_title[my_name='"+my_current_color_picker+"']").text(my_admin_woo_msgs.select_color);
			$(".my_color_picker_title[my_name='"+my_current_color_picker+"'] .my_select_picker").show();
			$(".my_color_picker_title[my_name='"+my_current_color_picker+"'] .my_close_picker").hide();
			
			my_admin_debug("Hide picker",my_current_color_picker);
			$(".my_color_picker_title[my_name='"+my_current_color_picker+"']").iris("hide");
			my_current_color_picker="";
		}
		my_working_on_item=0;
	}
	
	);
	/*$(document).on('click', '.color-picker-iris', function() {
		$('.color-picker-iris-holder').each(function() {
			$(this).css('display', 'none');
		});
		$(this).parent().find('.color-picker-iris-holder').css('display', 'block');
	});*/
	
	$('body').not('.color-picker-iris').click(function() {
		$('.color-picker-iris-holder').each(function() {
				$(this).css('display', 'none');
			});
	});
	
	//initialization for different pins
	/* different pins is not needed anymore removed
	if ($('#item-icon').attr('src').indexOf('images/icons/2/') >= 0)
	{
			$('#item-font-size').html('12');
			$('#item-font-size').attr('value', '12');
			$('#item-font-size').attr('readonly', 'readonly');
			$('#item-header-font-size').html('12');
			$('#item-header-font-size').attr('value', '12');
			$('#item-header-font-size').attr('readonly', 'readonly');
			$('#item-height').html('75');
			$('#item-height').attr('value', '75');
			$('#item-height').attr('readonly', 'readonly');
			
			$('#dummy-imapper-item-open-position').find('option').each(function() {
				if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
					$(this).remove();	
			});
			
			$('.imapper-sortable-real').each(function() {
				$(this).find('option').each(function() {
					if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
						$(this).remove();
				});
			});
	}
	


	if ($('#item-icon').attr('src').indexOf('images/icons/1/') >= 0 || $('#item-icon').attr('src').indexOf('images/icons/7/') >= 0)
	{
		$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new" /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
	}
	
	if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0)
	{
		var icons = createIconList();

		$('#imapper-sortable-dummy>li:eq(1)').after('<li id="dummy-li-item-picture" style="position: relative;"><label for="dummy-imapper-item-picture" style="display: inline-block; margin-top: -12px;">Item Pin Image</label><input id="dummy-imapper-item-picture" name="dummy-imapper-item-picture" value="icon-cloud-download" type="hidden"><i id="dummy-imapper-pin-icon" class="fawesome icon-2x icon-cloud-download" style="width: 32px; height: 27px; border: 1px solid black; margin: 0 5px 0 45px;"></i><div class="icon-list-button"><a class="arrow-down-admin-link" href="#"><div class="arrow-down-admin" style=""></div></a></div>' + icons + '</li>');
		
		$('.imapper-item-icon-list').mCustomScrollbar();	
	}
	*/
	
	$('.imapper-sortable-real').each(function() {
		var selected = -1;
	
		$(this).find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		if (selected == -1)
			$(this).find('option').eq(0).attr('selected', 'selected');
			
		var id = $(this).attr('id').substring(17);
		numberOfTabs[id] = $(this).find('textarea').length;
	});
	/**
	 * Go through pins and add pins to image
	 */
	$('.imapper-sortableItem').each( function(index) {
		if (parseInt($(this).attr('id').substring(4)) > numItems)
		{
			if (index == 0)
				first = parseInt($(this).attr('id').substring(4));
		
			numItems = parseInt($(this).attr('id').substring(4));
			var ind = numItems;
			
			var left = $('#sort' + numItems + '-imapper-item-x').attr('value');
			var top = $('#sort' + numItems + '-imapper-item-y').attr('value');
			
			var pinWrapper = createPin(numItems, left, top);	
			
			$('.my-mapper-sort-image').append(pinWrapper);
			
			$('#sort' + numItems + '-mapper-pin').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
			$('#sort' + numItems + '-mapper-pin').css('left', -($('#sort' + numItems + '-mapper-pin').width()/2) + 'px');
			$('#sort' + numItems + '-mapper-pin-delete').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
			$('#sort' + numItems + '-mapper-pin-delete').css('left', $('#sort' + numItems + '-mapper-pin').width()/2 - 15 + 'px');
			
			pinWrapper.draggable({
			 	containment: "parent",
				start: function(event,ui) {
					$(ui.helper).find('.imapper-pin-text').hide();
					
					$(ui.helper).trigger('click');
					itemClicked = itemIsClicked($(this).attr('id').substring(4, $(this).attr('id').indexOf('-')), itemClicked);
				},
				stop: function(event,ui) {
					$(ui.helper).find('.imapper-pin-text').show();
					
					var my_id=$(ui.helper).attr('id');
					my_id=my_id.replace('sort','');
					my_id=my_id.replace('-mapper-pin-wrapper','');
					/*if(window.console){
						console.log('My id',my_id);
					}*/	
					var coordX = $(this).offset().left;
					var coordY = $(this).offset().top;
					
					var mapCoord = $('#map-image').offset();
					var mapCoordX = mapCoord.left;
					var mapCoordY = mapCoord.top;
					
					var newPosX = (coordX - mapCoordX) / $('.my-mapper-sort-image').width() * 100;
					var newPosY = (coordY - mapCoordY) / $('.my-mapper-sort-image').height() * 100;
					
					$(this).css('left', newPosX + '%');
					$(this).css('top', newPosY + '%');
					
					$('#sort' + my_id+ '-imapper-item-x').attr('value', newPosX + '%');
					$('#sort' + my_id + '-imapper-item-y').attr('value', newPosY + '%');
				}
			});
		}
		
	});
	/**
	 * My edit pins set firts pin to edit
	 * my code 
	 */
	if((typeof my_edit_item!='undefined')&&my_edit_item==1){
		for(var k12=1;k12<=numItems;k12++){
			my_init_autocomplete("#pin_product_id_"+k12);
		}
		//my_init_autocomplete(".my_autocomplete");
		/**
		 * Adjust image window size
		 */
		var h=$("#map-image").height();
		var w=$("#map-image").width();
  		//var w=attachment.sizes.full.width;
  		my_admin_debug("Image w,h",{w:w,h:h});
  		$(".my-mapper-sort-image").removeAttr('style');
  		var w_i=$(".my-mapper-sort-image").width();
  		my_admin_debug("Holder width",w_i);
  		if(w_i>w){
  			$(".my-mapper-sort-image").width(w);
  			$(".my-mapper-sort-image").height(h);
  		}
		
	var last=numItems;
	my_admin_debug("Edit Mapper",{last:last});
	$("#sort"+last+"-mapper-pin-wrapper").find(".imapper-pin-my-out").css('border','none');
	$("#sort"+last+"-mapper-pin-wrapper").find(".imapper-pin-delete").hide();
	$("#imapper-sort"+last+"-header").css('background-color','');
	$(".imapper-pin-wrapper").each(function(i,v){
		var my_id=$(v).attr('id');
		if(i>0)
		$(v).find('.imapper-pin-delete').hide();
		if(i==0){
			$(v).find(".imapper-pin-my-out").css('border','1px dashed red');
		}
		my_id=my_id.replace('-mapper-pin-wrapper','');
		my_id=my_id.replace('sort','');
		/**
		 * Change pin icon
		 */
		var my_icon_image=$("#my_pin_icon_id_"+my_id).val();
		if(my_icon_image!=""){
			thickboxId=my_id;
			my_admin_debug("Change icon image",{id:my_id,icon:my_icon_image});
			my_change_pin_icon(my_icon_image);
		}
		var product_id="pin_product_id_"+my_id;
		var my_category_id="pin_category_id_id_"+my_id;
		var my_sel_cat_val=$("#"+my_category_id+" option:selected").val();
		if(my_sel_cat_val!=0){
			var o_title=$("#"+my_category_id+" option:selected").text();
			if(o_title.length>20){
				o_title=o_title.substr(0,20)+"...";
			}
		}else {
		var o_title=$("#"+product_id).val();
		if(o_title.length>20){
			o_title=o_title.substr(0,20)+"...";
		}
		}
		$(v).find('.imapper-pin-text').text(o_title);
		//$("#sort"+my_id+"-mapper-pin-text").css('right', ((($("#sort"+my_id+"-mapper-pin-text").width())/ 2)-8) + 'px');	
		$("#sort"+my_id+"-mapper-pin-text").css('position','absolute');
		$("#sort"+my_id+"-mapper-pin-text").css('left','-100px');
		$("#sort"+my_id+"-mapper-pin-text").css('text-align','center');
		$("#sort"+my_id+"-mapper-pin-text").css('width','200px');
		
		//$("#imapper-sort"+my_id+"-header").css('background-color','');
		
	});
	$(".imapper-pin-wrapper").click(my_activate_pin);
	}


		       var pinWidthOld = 0;
			 var pinHeightOld = 0;

	$('.imapper-area-pin').resizable({
			  	  start:function(){
			  	  		 pinWidthOld = $(this).width();
			 			 pinHeightOld = $(this).height();

			  		},
				  stop: function() {
				  	 var pinId = $(this).attr('id').substr(0,$(this).attr('id').indexOf('-mapper-pin'));
				  	 var pinWidth = $(this).width();
				  	 var pinHeight = $(this).height();

				  	 
				  	 
				  	 $(this).css({top:-pinHeight+'px',left:-(pinWidth/2)+'px'});


				  	var imageWidth = jQuery('#map-image').width();
				  	var imageHeight = jQuery('#map-image').height();

				  	 var pinWidthOffset = (pinWidth-pinWidthOld);
				  	 var pinHeightOffset = (pinHeight-pinHeightOld);

				  	


				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

				


				 	 $(this).closest('.imapper-pin-wrapper').css({'left':'+='+pinWidthOffset/2+'px','top':'+='+pinHeightOffset+'px'});
				  	 
				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

				  	 $(this).closest('.imapper-pin-wrapper').css({'left':pinLeftInPercent+'%','top':pinTopInPercent+'%'});


				  	 $('#'+ pinId +'-imapper-item-x').attr('value',pinLeftInPercent+'%');
				  	  $('#'+ pinId +'-imapper-item-y').attr('value',pinTopInPercent+'%');
				     
				  	 if ($('#imapper-'+pinId+'-header').css('background-color')=="rgb(200, 200, 200)") {
				  	 	$('#'+pinId+'-imapper-area-width, #dummy-imapper-area-width').attr('value',pinWidth);
				  		$('#'+pinId+'-imapper-area-height, #dummy-imapper-area-height').attr('value',pinHeight);
				  	 } else {
				  	 	$('#'+pinId+'-imapper-area-width').attr('value',pinWidth);
				  	 	$('#'+pinId+'-imapper-area-height').attr('value',pinHeight);
				  	 }
				  }
				});
	
	$('.imapper-pin-text').each(function () {
		//$(this).css('right', ($(this).width() / 2) + 'px');	
	});
	
	if (numItems > 0)
	{	
		//$('#imapper-sortable-dummy').css('visibility', 'visible');
		
		itemClicked = itemIsClicked(first, itemClicked);
	}

	// COLORPICKER
	var colPickerOn = false,
		colPickerShow = false, 
		pluginUrl = $('#plugin-url').val(),
		timthumb = pluginUrl + 'timthumb/timthumb.php';

		if (pluginUrl.substr(-1) != '/') pluginUrl += '/';

	// colorpicker field
	$('.cw-color-picker').each(function(){
		var $this = $(this),
			id = $this.attr('rel');
 
		$this.farbtastic('#' + id);
		$(document).on('click', $this, function(){
			$this.show();
		});
		$(document).on('click', '#' + id, function(){
			$('.cw-color-picker:visible').hide();
			$('#' + id + '-picker').show();
			colPickerOn = true;
			colPickerShow = true;
		});
		$(document).on('click', $this, function(){
			colPickerShow = true;	
		});
		
	});

		// map select
	$(document).on('click', '#map-change', function(e) {

		var send_attachment_bkp = wp.media.editor.send.attachment;
  	 	var button = $(this);
  	 	var id = button.attr('id').replace('_button', '');
  		_custom_media = true;
	    wp.media.editor.send.attachment = function(props, attachment){
	      if ( _custom_media ) {
	    	  my_admin_debug("Attachment",attachment);
	      	if(attachment.type=='image'){
	      		my_attachemnt_data=attachment;
	      		var h=attachment.sizes.full.height;
	      		var w=attachment.sizes.full.width;
	      		my_admin_debug("Image w,h",{w:w,h:h});
	      		$(".my-mapper-sort-image").removeAttr('style');
	      		var w_i=$(".my-mapper-sort-image").width();
	      		if(w_i>w){
	      			$(".my-mapper-sort-image").width(w);
	      			$(".my-mapper-sort-image").height(h);
	      		}
	      		
	      		$("#map-image").attr("src",attachment.url);//.siblings('input').attr('value', attachment.url);
	      		$("#map-input").val(attachment.url);
	      		$("#map-input-id").val(attachment.id);
	      		$(".imapper-pin-wrapper").show();
	      	}else {
	      		alert(my_admin_woo_msgs.only_image_is_allowed);
	      		return;
	      	}
	      } else {
	        return _orig_send_attachment.apply( this, [props, attachment] );
	      };
	    };

	    wp.media.editor.open(button);
	    return false;


	});

	 $('.add_media').on('click', function(){
    _custom_media = false;
  });




	// IMAGE UPLOAD
	var thickboxId =  '',
		thickItem = false; 
	
	// background images
	$('.cw-image-upload').click(function(e) {
		e.preventDefault();
		thickboxId = '#' + $(this).attr('id');
		formfield = $(thickboxId + '-input').attr('name');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		return false;
	});
	

	window.send_to_editor = function(html) {
		my_admin_debug("Send to editor",html);
		if(html.search('src="') != -1) {
			imgurl = html.substr(html.search('src="')+5);
			imgurl = imgurl.substr(0,imgurl.search('"'));
		}
		else
			imgurl = '';
		my_admin_debug("Image url",imgurl);
		//$(thickboxId + '-input').val(imgurl);
		if (thickItem) {
			thickItem = false;
			my_change_pin_icon(imgurl);
			/*$(thickboxId).attr('src', imgurl);
			$(thickboxId).parent().find('input').attr('value', imgurl);
			$(thickboxId).parent().find('.imapper-pin-wrapper').each(function() {
				$(this).css('display', 'block');	
			});	
			
			if (thickboxId == '#item-icon')
				iconUploadBehavior();
				*/
		}
		else {
			$(thickboxId).css('background', 'url('+imgurl+') repeat');
		}
		tb_remove();
		
	}
	/**
	 * Delete pin from image
	 */
	$(document).on('click', '.imapper-pin-delete', function(e) {
		e.stopPropagation();
		var id = $(this).attr('id').substring(4, $(this).attr('id').indexOf('-'));
		my_admin_debug("Delete pin from image",id);
		my_admin_debug("Working on item",my_working_on_item);
		$('#sort' + id).find('.imapper-delete').trigger('click');
	
	});

	
	/*Dont use key down for pin
	 * $(document).keydown(function(e){
    if (e.which == 46) { 
       var pinDelete = $('.imapper-pin-delete').filter(function(){
       	return $(this).css('display') == 'block';
       });
       pinDelete.trigger('click');
       e.preventDefault();
    }
	});*/
	
	$('.remove-image').click(function(e){
		e.preventDefault();
		$(this).parent().parent().find('input').val('');
		$(this).parent().parent().find('.cw-image-upload').css('background-image', 'url(' + pluginUrl + 'images/no_image.jpg)');
	});
	
	$(document).on('click', '.imapper-item-icon-list a', function(e) {
		e.preventDefault();
		
		$('#dummy-imapper-pin-icon').removeClass();
		$('#dummy-imapper-pin-icon').addClass($(this).find('i').attr('class'));
		$('#dummy-imapper-item-picture').attr('value', $(this).find('i').attr('class'));
		$('#dummy-imapper-pin-icon').addClass('icon-2x');
		$('#dummy-imapper-pin-icon').addClass('fawesome');
		
		$('.imapper-item-icon-list').css('display', 'none');
		itemIconListClicked = 0;
	});
	
	$(document).on('click', '.arrow-down-admin-link', function(e) {
		e.preventDefault();
		
		if (itemIconListClicked == 0)
		{
			$('.imapper-item-icon-list').css('display', 'block');
			$('.imapper-item-icon-list').mCustomScrollbar('update');
			itemIconListClicked = 1;
		}
		else
		{
			$('.imapper-item-icon-list').css('display', 'none');
			itemIconListClicked = 0;
		}
	});
	
	$(document).on('click', '#item-content-button-new', function() {
		numberOfTabs[itemClicked]++;
		
		$('#li-item-content').append('<textarea rows="6" style="resize: none;" id="dummy-imapper-item-content-' + numberOfTabs[itemClicked] + '" class="textarea-additional" name="dummy-imapper-item-content-' + numberOfTabs[itemClicked] + '" value="" type="text" ></textarea>');
		
		$('#imapper-sortable-' + itemClicked).find('li').eq(3).append('<textarea rows="6" id="sort' + itemClicked + '-imapper-item-content-' + numberOfTabs[itemClicked] + '" class="textarea-additional" name="sort' + itemClicked + '-imapper-item-content-' + numberOfTabs[itemClicked] + '" value="" type="text" ></textarea>');
	});
	
	$(document).on('click', '#item-content-button-remove', function() {
		$('#dummy-imapper-item-content-' + numberOfTabs[itemClicked]).remove();
		$('#sort' + itemClicked + '-imapper-item-content-' + numberOfTabs[itemClicked]).remove();
		
		if (numberOfTabs[itemClicked] > 1)
			numberOfTabs[itemClicked]--;
	});
	
	$(document).on('click', '.imapper-sort-header', function(){
		itemClicked = itemIsClicked($(this).attr('id').substring(12, $(this).attr('id').substring(8).indexOf('-') + 8), itemClicked);
		

	});
	
	$(document).on('click', '.imapper-pin', function() {

		itemClicked = itemIsClicked($(this).attr('id').substring(4, $(this).attr('id').indexOf('-')), itemClicked);
		$('#imapper-sort' + itemClicked + '-header').trigger('click');
	});
	
	$(document).on('input', '#dummy-imapper-item-title', function(e) {
		e.preventDefault();
		$('#imapper-sort' + itemClicked + '-header').find('small').find('i').find('span').html($('#dummy-imapper-item-title').attr('value'));
		
		$('#sort' + itemClicked + '-mapper-pin-text').html($('#dummy-imapper-item-title').attr('value'));
		$('#sort' + itemClicked + '-mapper-pin-text').css('right', ($('#sort' + itemClicked + '-mapper-pin-text').width() / 2 - 8) + 'px');
	});
	
	$('#map-image').click(function(e){
		e.preventDefault();
		my_admin_debug("Create pin",my_working_on_item);
		if(my_working_on_item)return;
		my_working_on_item=1;
		/**
		 * Close open dummy-adapter
		 */
		$(".dummy-adapter").filter(":visible").each(function(i,v){
			$(v).addClass('closed');
			//$(v).css('background-color','none');
			$(v).hide();
		});
		$(".imapper-sort-header").each(function(i,v){
			$(v).css('background-color','');
		});
		var pluginUrl = $('#plugin-url').val();
		if (pluginUrl.substr(-1) != '/') pluginUrl += '/';
		
		if ($('#map-image').attr('src') != pluginUrl + 'images/no_image.jpg')
		{
		
			numItems++;
			my_added_pins[my_added_pins.length]=numItems;
			var mapCoord = $(this).offset();
			var mapCoordX = mapCoord.left;
			var mapCoordY = mapCoord.top;
			
			var clickCoordX = e.pageX;
			var clickCoordY = e.pageY;
			
			var posX = clickCoordX - mapCoordX;
			var posY = clickCoordY - mapCoordY;
			
			var posPercentX = posX / $(this).width() * 100;
			var posPercentY = posY / $(this).height() * 100;
			
			var pinWrapper = createPin(numItems, posPercentX + '%', posPercentY + '%');
			
			$(this).parent().append(pinWrapper);
			setTimeout(function(){
				$('#sort' + numItems + '-mapper-pin-wrapper').click(my_activate_pin);

				
			},1000);
			
			$('#sort' + numItems + '-mapper-pin').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
			$('#sort' + numItems + '-mapper-pin').css('left', -($('#sort' + numItems + '-mapper-pin').width()/2) + 'px');
			$('#sort' + numItems + '-mapper-pin-delete').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
			$('#sort' + numItems + '-mapper-pin-delete').css('left', $('#sort' + numItems + '-mapper-pin').width()/2 - 15 + 'px');
			
			//return;
			if (numItems > 0)
			{
				//$('#imapper-sortable-dummy').css('visibility', 'visible');
				//var icon = $('#dummy-imapper-item-picture').val();
				//var color = $('#dummy-imapper-item-pin-color').val();
			}
			else
			{
				var icon = 'icon-cloud-download';
				var color = '#0000ff';
			}
			var items_options='<input type="hidden" id="sort' + numItems + '-imapper-item-x" name="sort' + numItems + '-imapper-item-x" value="' + posPercentX +'%" />'
				+ '<input type="hidden" id="sort' + numItems + '-imapper-item-y" name="sort' + numItems + '-imapper-item-y" value="' + posPercentY +'%" />'
			
			/*var items_options = '<ul id="imapper-sortable-' + numItems + '" class="imapper-sortable-real" style="display:none;" >'
							+ '<li>'
								+ '<input type="hidden" id="sort' + numItems + '-imapper-item-x" name="sort' + numItems + '-imapper-item-x" value="' + posPercentX +'%" />'
								+ '<input type="hidden" id="sort' + numItems + '-imapper-item-y" name="sort' + numItems + '-imapper-item-y" value="' + posPercentY +'%" />'
							+ '</li>'
							+ '<li>'
								+ '<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-title">Item title</label>'
								+ '<input style="margin-left:5px;" id="sort' + numItems + '-imapper-item-title" name="sort' + numItems + '-imapper-item-title" value="" type="text" />'
							+ '</li>';
							
			/*if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0 || $('#item-icon').attr('src').indexOf('images/icons/6/') >= 0 || $('#item-icon').attr('src').indexOf('images/icons/7/') >= 0) 
				items_options	+=	  '<li>'
									+	'<input id="sort' + numItems + '-imapper-item-pin-color" name="sort' + numItems + '-imapper-item-pin-color" class="imapper-item-pin-color" value="' + color + '" type="text" style="">'
								+	  '</li>';


				if ($('#item-icon').attr('src').indexOf('images/icons/6/') >= 0) 
				items_options	+=	  '<li id="sort'+numItems+'-li-item-border-color" >'
									+	'<input id="sort' + numItems + '-imapper-border-color" type="text" name="sort' + numItems + '-imapper-border-color">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-border-width" >'
									+	'<input id="sort' + numItems + '-imapper-border-width" type="text" name="sort' + numItems + '-imapper-border-width">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-border-radius" >'
									+	'<input id="sort' + numItems + '-imapper-border-radius" type="text" name="sort' + numItems + '-imapper-border-radius">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-area-width" >'
									+	'<input id="sort' + numItems + '-imapper-area-width" type="text" name="sort' + numItems + '-imapper-area-width" value="100">'
									+ '<input id="sort' + numItems + '-imapper-area-width-normalized" class="imapper-area-width-normalized" name="sort' + numItems + '-imapper-area-width-normalized" type="text">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-area-height" >'
									+	'<input id="sort' + numItems + '-imapper-area-height" type="text" name="sort' + numItems + '-imapper-area-height" value="100">'
									+ '<input id="sort' + numItems + '-imapper-area-height-normalized" class="imapper-area-height-normalized" name="sort' + numItems + '-imapper-area-height-normalized" type="text">'
								+	  '</li>';




			if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0)					
				items_options	+=	  '<li>'
									+	'<input id="sort' + numItems + '-imapper-item-picture" name="sort' + numItems + '-imapper-item-picture" class="imapper-item-picture" value="' + icon + '" type="text">'
								+	  '</li>';				
							
			items_options +=  '<li>'
								+ '<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-open-position">Item Open Position</label>'
								+ '<select name="sort' + numItems + '-imapper-item-open-position" id="sort' + numItems + '-imapper-item-open-position">'
									+ '<option value="left">Left</option>'
									+ '<option value="right">Right</option>';
			
			if ($('#item-icon').attr('src').indexOf('images/icons/2/') < 0)
				items_options	+= 	  '<option value="top">Top</option>'
									+ '<option value="bottom">Bottom</option>';
									
				items_options  += '</select>'
							+ '</li>'
							+ '<div class="clear"></div>'
							+ '<li>'
				 			+ '<label for="sort' + numItems + '-imapper-item-category">Item category</label>'+
				 			+ '<input style="margin-left: 75px; width: 230px;" id="sort' + numItems + '-imapper-item-category" name="sort' + numItems + '-imapper-item-category" value="" type="text" />'+
				 			+ '</li>'
				 			+ '<li>'
				 			+ '<label for="sort' + numItems + '-imapper-item-link">Item link</label>'+
				 			+ '<input style="margin-left: 75px; width: 230px;" id="sort' + numItems + '-imapper-item-link" name="sort' + numItems + '-imapper-item-link" value="" type="text" />'+
				 			+ '</li>'
							+ '<li>'
								+ '<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-content">Item content</label>'
								+ '<input style="margin-left:5px;" id="sort' + numItems + '-imapper-item-content" name="sort' + numItems + '-imapper-item-content" value="" type="text" />'
							+ '</li>'
						+ '</ul>';

			*/	
			var my_options_html=$(".my_pin_product_html").html();
			my_options_html=my_options_html.replace(/{id}/g,numItems);
			//$("#sort"+numItems+" ")
			
			$('.imapper_items_options').append(items_options);
			
			var itemss ='<li id="sort' + numItems + '" class="imapper-sortableItem">'
							
							+	'<div id="imapper-sort' + numItems + '-header" class="imapper-sort-header">'+my_admin_woo_msgs.pin+ numItems + ' <small><i>- <span></span></i></small><div class="my_buttons"><a href="#" class="my_diplicate_pin">'+my_admin_woo_msgs.duplicate_pin+'</a><a href="#" class="imapper-delete add-new-h2">'+my_admin_woo_msgs.delete_pin+'</a> &nbsp;</div></div><div class="dummy-adapter closed">'+my_options_html+'</div>'
							+ '</li>';
			
				
			$('#imapper-sortable-items').append(itemss);
			/**
			 * Duplicate pin options
			 */
			/*if(my_duplicate_pin!=''){
				my_duplicate_options();
			}*/
			new_id_of_options='my_all_pin_options_'+numItems;
			my_edit_pin=numItems;
			/**
			 * Inite elements
			 */
			setTimeout(function(){
				if(my_duplicate_pin!=''){
					my_duplicate_options();
				}
				$("#"+new_id_of_options+" .my_slider_input").blur(my_set_blur_on_slider_input);	
				my_init_sliders_main('#'+new_id_of_options+' .imapper-admin-slider');
				my_init_color_picker('#'+new_id_of_options+' .my_color_picker_title');
				my_init_autocomplete('#'+new_id_of_options+" .my_autocomplete");
				my_working_on_item=0;
				$("#sort"+my_edit_pin).find(".dummy-adapter").show();
				//$("#sort"+my_edit_pin).find("")
			},1000);
			if ($('.imapper-sort-header').length > 0)
			{
				itemClicked = itemIsClicked(numItems, itemClicked);
			}
			
			numberOfTabs[numItems] = 1;
			
			pinWrapper.draggable({
			 	containment: "parent",
				start: function(event,ui) {
				$(ui.helper).find('.imapper-pin-text').hide();
					$(ui.helper).trigger('click');
					itemClicked = itemIsClicked($(this).attr('id').substring(4, $(this).attr('id').indexOf('-')), itemClicked);
				},
				stop: function(event,ui) {
					$(ui.helper).find('.imapper-pin-text').show();
					var my_id=$(ui.helper).attr('id');
					my_id=my_id.replace('sort','');
					my_id=my_id.replace('-mapper-pin-wrapper','');
					/*if(window.console){
						console.log('My id',my_id);
					}*/

					var coordX = $(this).offset().left;
					var coordY = $(this).offset().top;
					
					var newPosX = (coordX - mapCoordX) / $('.my-mapper-sort-image').width() * 100;
					var newPosY = (coordY - mapCoordY) / $('.my-mapper-sort-image').height() * 100;
					
					$(this).css('left', newPosX + '%');
					$(this).css('top', newPosY + '%');
					
					$('#sort' + my_id + '-imapper-item-x').attr('value', newPosX + '%')
					$('#sort' + my_id + '-imapper-item-y').attr('value', newPosY + '%')
				}
			});

			
      var pinWidthOld = 0;
			 var pinHeightOld = 0;
			 
	$('.imapper-area-pin').resizable({
			  	  start:function(){
			  	  		 pinWidthOld = $(this).width();
			 			 pinHeightOld = $(this).height();

			  		},
				  stop: function() {
				  	 var pinId = $(this).attr('id').substr(0,$(this).attr('id').indexOf('-mapper-pin'));
				  	 var pinWidth = $(this).width();
				  	 var pinHeight = $(this).height();

				  	 
				  	 
				  	 $(this).css({top:-pinHeight+'px',left:-(pinWidth/2)+'px'});



				  	var imageWidth = jQuery('#map-image').width();
				  	var imageHeight = jQuery('#map-image').height();

				  	 var pinWidthOffset = (pinWidth-pinWidthOld);
				  	 var pinHeightOffset = (pinHeight-pinHeightOld);




				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;




				 	 $(this).closest('.imapper-pin-wrapper').css({'left':'+='+pinWidthOffset/2+'px','top':'+='+pinHeightOffset+'px'});
				  	 
				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

				  	 $(this).closest('.imapper-pin-wrapper').css({'left':pinLeftInPercent+'%','top':pinTopInPercent+'%'});

				  	 $('#'+ pinId +'-imapper-item-x').attr('value',pinLeftInPercent+'%');
				  	  $('#'+ pinId +'-imapper-item-y').attr('value',pinTopInPercent+'%');
				     
					
				  	 if ($('#imapper-'+pinId+'-header').css('background-color')=="rgb(200, 200, 200)") {
				  	 	$('#'+pinId+'-imapper-area-width, #dummy-imapper-area-width').attr('value',pinWidth);
				  		$('#'+pinId+'-imapper-area-height, #dummy-imapper-area-height').attr('value',pinHeight);
				  	 } else {
				  	 	$('#'+pinId+'-imapper-area-width').attr('value',pinWidth);
				  	 	$('#'+pinId+'-imapper-area-height').attr('value',pinHeight);
				  	 }
				  }
				});
		
		}
		
	});
/**
 * Click on pin edit from the list of the pins
 */	
	$(document).on('click','.imapper-sort-header', function(){
		if(my_working_on_item)return;
		my_working_on_item=1;
		var old_id=$(this).attr('id');
		my_admin_debug("Old id",old_id);
		id=old_id.replace('imapper-sort','');
		id=id.replace('-header','');
		my_admin_debug("Pin id",{id:id,my_edit_pin:my_edit_pin});
		/*
		 * close pin click on one pin that is editin
		 */
		if(my_edit_pin==id){
			var pin_wrapper='sort'+id+'-mapper-pin-wrapper';
			$("#"+pin_wrapper).find(".imapper-pin-delete").hide();
			$("#"+pin_wrapper).find(".imapper-pin-my-out").css('border','none');
			$("#"+pin_wrapper).removeAttr('my_open');
			$("#sort"+id).find(".dummy-adapter").hide();
			$("#sort"+id).find(".imapper-sort-header").css('background-color','');
			my_edit_pin=0;
			
			my_admin_debug("Editing this pin",id);
			my_working_on_item=0;
			return;
			
		}
		my_edit_pin=id;
		var my_id='#sort'+id+'-mapper-pin-wrapper';
			$(".imapper-pin-wrapper ").each(function(i,v){
				$(v).find(".imapper-pin-my-out").css('border','none');
				$(v).find(".imapper-pin-delete").hide();
				$(v).removeAttr('my_open');
			});
			//$(this).css('width','30px');
			$(my_id).attr('my_open',1);
			$(my_id).find(".imapper-pin-my-out").css('border','1px dashed red');
			$(my_id).find(".imapper-pin-delete").show();	
		$(".dummy-adapter").filter(":visible").each(function(i,v){
			$(v).addClass("closed");
			$(v).hide();
		});
		$("#sort"+id).find(".imapper-sort-header").css('background-color','rgb(200,200,200)');
		//$("#sort"+id).find(".dummy-adapter").slideToggle()
		/*if($(this).siblings(".dummy-adapter").hasClass('closed')){
			$(this).siblings('.dummy-adapter').removeClass('closed');
		}else {
			$(this).siblings('.dummy-adapter').removeClass('closed');
			
		}*/
		$(this).siblings(".dummy-adapter").slideToggle(function(){
			my_working_on_item=0;
		});
		
		/*if ($(this).siblings('.dummy-adapter').hasClass('closed')) {
			$('.dummy-adapter').addClass('closed');
			$(this).siblings('.dummy-adapter').removeClass('closed').append($('#imapper-sortable-dummy'));


		} else {
			$(this).siblings('.dummy-adapter').addClass('closed');
			$('.imapper_items_options #imapper-sortable-dummy').remove();
			$('.imapper_items_options').prepend($(this).siblings('.dummy-adapter').find('#imapper-sortable-dummy'));
		}

		$('.dummy-adapter .imapper-admin-select-wrapper span').each(function(){
		var text = $(this).siblings('select').find(':selected').text();
		$(this).text(text);
		*/
	//});
	});

	// delete pin
	$(document).on('click', '.imapper-delete', function(e){
		e.preventDefault();
		e.stopPropagation();
		my_admin_debug("my_working_on_item",my_working_on_item);
		
			
		if (!$(this).siblings('.dummy-adapter').hasClass('closed')) {
			$('.imapper_items_options').prepend($(this).siblings('.dummy-adapter').find('#imapper-sortable-dummy'));
		}
		
		$('#sort' + $(this).closest('li').attr('id').substring(4) + '-mapper-pin-wrapper').remove();
		$('#imapper-sortable-' + $(this).closest('li').attr('id').substring(4)).remove();
		$(this).closest('li').remove();
		
		if ($('.imapper-sortableItem').length == 0)
		{
			$('#dummy-imapper-item-title').attr('value', '');
			$('#dummy-imapper-item-content').attr('value', '');
			$('#imapper-sortable-dummy').css('visibility', 'hidden');
		}
		
		$('.imapper-sortableItem').each( function(index) {
			if (index == 0)
				first = parseInt($(this).attr('id').substring(4));
		});
		
		/*if (itemClicked == parseInt($(this).closest('li').attr('id').substring(4)))
			itemClicked = itemIsClicked(first, 0);*/
	});
	
	$(document).on('click', '.tsort-remove', function(e){
		e.preventDefault();
		$(this).parent().find('input').val('');
		$(this).parent().find('#map-image').attr('src', pluginUrl + 'images/no_image.jpg');
		//$(this).parent().find('img').attr('src', pluginUrl + 'images/no_image.jpg');
	});
	
	$('#map-image-remove').click(function() {
		$('.imapper-pin-wrapper').each(function() {
			$(this).css('display', 'none');	
		});
	});
	

//on-off checkboxes

$(document).on('click','.imapper-checkbox-on',function(){
	$(this).removeClass('inactive');
	$(this).siblings('.imapper-checkbox-off').addClass('inactive');
	$(this).siblings('[type=checkbox]').attr('checked','checked');
});

$(document).on('click','.imapper-checkbox-off',function(){
	$(this).removeClass('inactive');
	$(this).siblings('.imapper-checkbox-on').addClass('inactive');
	$(this).siblings('[type=checkbox]').removeAttr('checked');
});

$(document).on('click','.my-icon-remove',function(e){
	e.preventDefault();
	
	var my_id=$(this).attr('my_id');
	var my_input_id='my_pin_icon_id_'+my_id;
	my_admin_debug("Remove icon",my_id);
	$("#"+my_input_id).val("");
	
	$("#my_pin_icon_"+my_id+" .my-icon-remove").parent('div').hide();
	$("#my_pin_icon_"+my_id+" .my_image_icon_image").hide();
	$("#my_pin_options_"+my_id+" ul li").each(function(i,v){
		if(i>0){
			$(v).attr('style','');
	}
	});
	$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('width','');
	$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('height','');
	$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('top','');
	$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('left','');
	$("#sort"+my_id+"-mapper-pin-wrapper .imapper-pin-my-out").css('position','');
	
	
	
	$("#sort"+my_id+"-mapper-pin-wrapper").find(".imapper-pin-my-out img").remove();
	
	$("#sort"+my_id+"-mapper-pin-wrapper").find(".imapper-pin-wrapper-my-inner").show();
	$("#sort"+my_id+"-mapper-pin-text").css('top','15px');
	$("#sort"+my_id+"-mapper-pin-delete").css('left','-15px');

	
	
	
});

	//icon select functions
	$(document).on('click', '.my-icon-change', function(e) {
		e.preventDefault();
		thickboxId=$(this).attr('my_id');
		if(numItems==0){
			//alert
		}
		var my_old_html='<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="margin-left: -430px; width: 860px; height: 220px; margin-top: -200px; visibility: visible;"><div id="TB_title"><div id="TB_ajaxWindowTitle" style="padding:0px 10px;">'+my_admin_woo_msgs.upload_pin_icon+'</div><div id="TB_closeAjaxWindow"><a id="closeIconUpload" title="Close" href="#"><div class="tb-close-icon"></div></a></div></div><div class="clear"></div><div id="my_choose_pin"></div><div id="iconUploadContent" style="width:859px;height:150px;position:absolute;bottom:0px; border-top: 1px solid #DFDFDF;" name="TB_iframeContent427" hspace="0"></div></div>'
		$('body').append(my_old_html);
		//$('body').append('<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="margin-left: -430px; width: 860px; height: 220px; margin-top: -200px; visibility: visible;"><div id="TB_title"><div id="TB_ajaxWindowTitle" style="padding:0px 10px;">'+my_admin_woo_msgs.upload_pin_icon+'</div><div id="TB_closeAjaxWindow"><a id="closeIconUpload" title="Close" href="#"><div class="tb-close-icon"></div></a></div></div><a id="ourIconsContent" href="#" class="icon-upload-tab" style="margin-top: 7px;">Default iMapper Pins</a><a id="customIconsContent" href="#" class="icon-upload-tab" style="margin: 7px 0 0 220px;">Import your own pin</a><div class="clear"></div><div id="my_choose_pin"></div><div id="iconUploadContent" style="width:859px;height:150px;position:absolute;bottom:0px; border-top: 1px solid #DFDFDF;" name="TB_iframeContent427" hspace="0"></div><iframe id="TB_iframeContentIcon" frameborder="0" style="width:859px;height:412px;position:absolute;top:69px;border-top:1px solid #DFDFDF;padding-top:10px;display:none;" onload="" name="TB_iframeContent484" src="media-upload.php?type=image&" hspace="0"></iframe></div>');
		//$('body').append('<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="margin-left: -430px; width: 860px; height: 220px; margin-top: -200px; visibility: visible;"><div id="TB_title"><div id="TB_ajaxWindowTitle" style="padding:0px 10px;">'+my_admin_woo_msgs.upload_pin_icon+'</div><div id="TB_closeAjaxWindow"><a id="closeIconUpload" title="Close" href="#"><div class="tb-close-icon"></div></a></div><!--<div id="iconUploadContent" style="width:859px;height:150px;position:absolute;bottom:0px; border-top: 1px solid #DFDFDF;" name="TB_iframeContent427" hspace="0"></div>--><iframe id="TB_iframeContentIcon" frameborder="0" style="width:859px;height:412px;position:absolute;top:40px;/*border-top:1px solid #DFDFDF*/;padding-top:10px;display:block;" onload="" name="TB_iframeContent484" src="media-upload.php?type=image&" hspace="0"></iframe></div></div>');//<a id="ourIconsContent" href="#" class="icon-upload-tab" style="margin-top: 7px;">Default iMapper Pins</a><a id="customIconsContent" href="#" class="icon-upload-tab" style="margin: 7px 0 0 220px;">Import your own pin</a><div class="clear"></div><div id="iconUploadContent" style="width:859px;height:150px;position:absolute;bottom:0px; border-top: 1px solid #DFDFDF;" name="TB_iframeContent427" hspace="0"></div><iframe id="TB_iframeContentIcon" frameborder="0" style="width:859px;height:412px;position:absolute;top:69px;border-top:1px solid #DFDFDF;padding-top:10px;display:none;" onload="" name="TB_iframeContent484" src="media-upload.php?type=image&" hspace="0"></iframe></div>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:20px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/4/1.png"></div><span>Map pin</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:120px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/2/1.png"></div><span>Sliding pin</span></a>');
		
		$('#iconUploadContent').append('<a class="iconImage" style="left:220px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/3/1.png"></div><span>Shadow pin</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:320px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/1/1.png"></div><span>Glowing pin</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:420px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/5/purple.png"></div><span>Pin with icon</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:520px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/6/area_pin.png"></div><span>Area Pin</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:620px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/7/icon_pin.png"></div><span>Tab pin</span></a>');
		/*var my_html='';
		my_html='<ul><li><label for="my_choose_pin_select">'+my_admin_woo_msgs.select_pin+'</label><select id="my_choose_pin_select">';
		if(numItems>0){
			for(var i=1;i<=numItems;i++){
				var opt=my_admin_woo_msgs.pin+' '+i+' ';
				var title=$("#pin_product_id_"+i).val();
				if(title!=""){
					if(title.lenght>20){
						title=title.substr(0,17)+'...';
					}
					opt+=title;
				}
				my_html+='<option value="'+i+'">'+opt+'</option>';
				
			}
		}
		my_html+='</select>'
		$("#my_choose_pin").html(my_html);
		*/
	});


	
	
	$(document).on('click', '#customIconsContent', function(e) {
		e.preventDefault();

		$('#iconUploadContent').css('display', 'none');
		$('#TB_iframeContentIcon').css('display', 'block');
		
		
		
		thickItem = true;
		//thickboxId = '#' + $('#item-icon').attr('id');
		//formfield = $(thickboxId + '-input').attr('name');
	});
	
	$(document).on('click', '#ourIconsContent', function(e) {
		e.preventDefault();
		
		$('#TB_iframeContentIcon').css('display', 'none');
		$('#iconUploadContent').css('display', 'block');
		
	});
	
	$(document).on('click', '.iconImage', function(e) {
		e.preventDefault();	
		var my_icon_item;
		var my_img_src=$(this).find('img').attr('src');
		//$('#item-icon').attr('src', $(this).find('img').attr('src'));
		if ($(this).find('img').attr('src').indexOf('images/icons/5/') < 0){
			my_img_src=$(this).find('img').attr('src');
			//$('#item-icon-input').attr('value', $(this).find('img').attr('src'));
		}
		else {
			my_img_src=$(this).find('img').attr('src').substring(0, $(this).find('img').attr('src').indexOf('images/icons/5/')) + 'images/icons/5/1.png';
			//$('#item-icon-input').attr('value', $(this).find('img').attr('src').substring(0, $(this).find('img').attr('src').indexOf('images/icons/5/')) + 'images/icons/5/1.png');
		
		}
		my_change_pin_icon(my_img_src);
		
		$('#TB_overlay').remove();
		$('#TB_window').remove();	
	});

	
	$(document).on('click', '#closeIconUpload', function(e) {
		$('#TB_overlay').remove();
		$('#TB_window').remove();	
	});
	
	// item images
	$(document).on('click', '.tsort-start-item', function(e) {
		$('.tsort-start-item').attr('checked', false);
		$(this).attr('checked', 'checked');
	});
	
	// ----------------------------------------
	
	// AJAX subbmit
	$('#save-timeline').click(function(e){
		e.preventDefault();
		if(my_working_on_item==1)return;
		my_working_on_item=1;
		var title=$("#title").val();
		if(title==""){
			alert(my_admin_woo_msgs.title_is_required);
			my_working_on_item=0;
			$("#title").focus();
			return;
		
		}
	
		$('#sort' + itemClicked + '-imapper-item-title').attr('value', $('#dummy-imapper-item-title').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-content').attr('value', $('#dummy-imapper-item-content').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-open-position').find('option').eq($('#dummy-imapper-item-open-position').prop('selectedIndex')).attr('selected', 'selected');
		$('#sort' + itemClicked + '-imapper-item-pin-color').attr('value', $('#dummy-imapper-item-pin-color').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-picture').attr('value', $('#dummy-imapper-item-picture').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-category').attr('value', $('#dummy-imapper-item-category').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-link').attr('value', $('#dummy-imapper-item-link').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-click-action').find('option').eq($('#dummy-imapper-item-click-action').prop('selectedIndex')).attr('selected', 'selected');
		$('#sort' + itemClicked + '-imapper-item-hover-action').find('option').eq($('#dummy-imapper-item-hover-action').prop('selectedIndex')).attr('selected', 'selected');

		$('#sort' + itemClicked + '-imapper-border-color').attr('value', $('#dummy-imapper-border-color').val());
		$('#sort' + itemClicked + '-imapper-border-width').attr('value', $('#dummy-imapper-border-width').val());
		$('#sort' + itemClicked + '-imapper-border-radius').attr('value', $('#dummy-imapper-border-radius').val());
		$('#sort' + itemClicked + '-imapper-area-width').attr('value', $('#dummy-imapper-border-area-width').val());
		$('#sort' + itemClicked + '-imapper-area-height').attr('value', $('#dummy-imapper-border-area-height').val());

		
		
		for (var i = 2; i <= numberOfTabs[itemClicked]; i++)
			$('#sort' + itemClicked + '-imapper-item-content-' + i).attr('value', $('#dummy-imapper-item-content-' + i).attr('value'));

		/*	document.getElementById('hidden-map-overlay').disabled = false;
  			document.getElementById('hidden-blur-effect').disabled = false;
  			document.getElementById('hidden-slide-animation').disabled = false;
  			document.getElementById('hidden-lightbox-gallery').disabled = false;
  			document.getElementById('hidden-categories').disabled = false;
  			document.getElementById('hidden-show-all-category').disabled = false;
  			

		if(document.getElementById('map-overlay').checked){
  			document.getElementById('hidden-map-overlay').disabled = true;
		}
		if(document.getElementById('blur-effect').checked){
  			document.getElementById('hidden-blur-effect').disabled = true;
		}
		if(document.getElementById('slide-animation').checked){
  			document.getElementById('hidden-slide-animation').disabled = true;
		}
		if(document.getElementById('lightbox-gallery').checked){
  			document.getElementById('hidden-lightbox-gallery').disabled = true;
		}
		if(document.getElementById('categories').checked){
  			document.getElementById('hidden-categories').disabled = true;
		}
		if(document.getElementById('show-all-category').checked){
  			document.getElementById('hidden-show-all-category').disabled = true;
		}
	
		*/
		var imageWidth = jQuery('#map-image').width();
		var imageHeight = jQuery('#map-image').height();
		var imageWidthOriginal = document.getElementById('map-image').naturalWidth;
		var imageHeightOriginal = document.getElementById('map-image').naturalHeight;


		$('input[id$=imapper-area-width]').each(function(){
			var pinWidth = $(this).attr('value');
			var correctPinWidth = pinWidth * imageWidthOriginal / imageWidth;
			 $(this).siblings('.imapper-area-width-normalized').attr('value',correctPinWidth);
		});

		$('input[id$=imapper-area-height]').each(function(){
			var pinHeight = $(this).attr('value');
			var correctPinHeight = pinHeight * imageHeightOriginal / imageHeight;
			 $(this).siblings('.imapper-area-height-normalized').attr('value',correctPinHeight);
		});

		$('input[id$=imapper-item-x]').each(function(){
			var pinX = parseFloat($(this).attr('value'));
			var correctPinX = pinX *  imageWidth / imageWidthOriginal;
			 $(this).siblings('.imapper-item-x-normalized').attr('value',correctPinX+'%');
		});

		$('input[id$=imapper-item-y]').each(function(){
			var pinY = parseFloat($(this).attr('value'));
			var correctPinY = pinY *  imageHeight / imageHeightOriginal;
			 $(this).siblings('.imapper-item-y-normalized').attr('value',correctPinY+'%');
		});
		
		
		var my_nonce=$("#my_save_nonce_id").val();
		var my_pins='';
		var my_do=true;
		$(".imapper-sortableItem").each(function(i,v){
		
			var my_id=$(v).attr('id');
			my_id=my_id.replace('sort','');
			/**
			 * Check if we have the product setted
			 */
			var my_category_id='pin_category_id_id_'+my_id;
			var my_sel_cat_val=$("#"+my_category_id+" option:selected").val();
			var name='hidden_pin_product_'+my_id;
			var my_val=$("input[type='hidden'][name='"+name+"']").val();
			/*if(window.console){
				console.log('Pin id',{pin_id:my_id,my_cat:my_sel_cat_val,my_val:my_val})
			}*/
			if((my_sel_cat_val==0)&&(my_val=="")){
				
				alert(my_admin_woo_msgs.woo_commerce_product_is_required);
				my_working_on_item=0;
				$("#sort"+my_id).find(".imapper-sort-header").css('background-color','rgba(200,200,200)');
				$("#sort"+my_id).find(".dummy-adapter").show();
				$("#sort"+my_id+" .my_autocomplete").focus();
				my_do=false;
				return false;
				
			}
			
			if(my_pins.length>0)my_pins+=',';
			my_pins+=my_id;
			
		});
		if(!my_do)return;
		if(my_pins==""){
			alert(my_admin_woo_msgs.pins_are_required);
			my_working_on_item=0;
			return;
		}
		$('#save-loader').show();
		my_admin_debug("All pins",my_pins);
		$.ajax({
			type:'POST', 
			url: 'admin-ajax.php', 
			data:'action=my_save_mapper_save&my_pins='+my_pins+'&' + $('#post_form').serialize(), 
			dataType:'json',
			timeout:120000,
			success: function(data) {
				my_admin_debug("Ajax save",data);
				my_working_on_item=0
				if(data.error==0){
					$('#image_mapper_id').val(data.id);
					
					$('#save-loader').hide();
				}else {
					$('#save-loader').hide();
					alert(data.error);
				}
			},
			error:function(jq,status,error){
				my_working_on_item=0
				alert("Error :"+status);
			}
		});
	});
	/**
	 * Preview timeline
	 */
	$('#preview-timeline').click(function(e){
		e.preventDefault();
		
		itemClicked = itemIsClicked(itemClicked, itemClicked);

			var pinHeight = -$('.imapper-pin').height();
			var pinWidth =	-($('.imapper-pin').width())/2;

			var mapWidth = $('#map-image').width();
			var mapHeight = $('#map-image').height();
		
		var id = ($('#image_mapper_id').attr('value') != '') ? $('#image_mapper_id').attr('value') : '1';
		//var font = $('#item-font-type').val();
		//font = font.replace('+', ' ');
		var font;
		font='def';
		$('body').append('<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="width: 960px; height: 500px; margin-top: -250px; visibility: visible; margin-left: -480px;"><div id="TB_title"><div id="TB_ajaxWindowTitle">Preview</div><div id="TB_closeAjaxWindow"><a id="TBct_closeWindowButton" title="Close" href="#"><div class="tb-close-icon"></div></a></div></div></div>');
		
		var frontHtml = '';
		
		if ($('#map-image').attr('src').indexOf('images/no_image.jpg') < 0)
		{
		
		//if ($('#item-font-type').val() != 'def')
		//	frontHtml += '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + $('#item-font-type').val() + '">';

		frontHtml += '<div id="imagemapper' + id + '-wrapper" style="visibility: hidden; position:relative; margin: 0 auto;">'
		+	'<div id="imapper' + id + '-values" style="display: none">'
		+		'<div id="imapper' + id + '-value-item-open-style">' + $('#item-open-style').val() + '</div>'
		+	'</div>'
		+	'<img id="imapper' + id + '-map-image" style="max-width: 100%; max-height: 473px;" src="' + $('#map-image').attr('src') + '" />';
		/**
		 * Add pins
		 */
		var style_css="";
		var all_html='';
		for(var i=1;i<=numItems;i++){
			var my_pin_icon=$("#my_pin_icon_id_"+i).val();
			var enable_line=$("#pin_enable_line_"+i).is(":checked");
			var enable_dot=$("#pin_enable_dot_"+i).is(":checked");
			var dot_style="";
			var inner_dot_style="";
			var my_top=$("#sort"+i+"-imapper-item-y").val();
			var my_left=$("#sort"+i+"-imapper-item-x").val();
			var background_color_pin=$("#pin_background_color_"+i).val();
			dot_style="cursor:pointer;position:absolute;top:"+my_top+";left:"+my_left+";";
			dot_style+="background-color:"+background_color_pin+" ;";
			if(!enable_line)dot_style+="border:none;";
			var bg_opacity=$("#pin_background_transparency_"+i).val();
			dot_style+="opacity:"+bg_opacity+";";
			var pin_line_color=$("#pin_line_color_"+i).val();
			dot_style+="border-color:"+pin_line_color+";";
			
			var my_dot_html='<div id="my_mapper_id_'+i+'" style="'+dot_style+'" class="imapper-pin-wrapper-my-inner-front">';
			if(my_pin_icon!=""){
				my_dot_html='<div style="cursor:pointer;position:absolute;top:'+my_top+';left:'+my_left+'" id="my_mapper_id_'+i+'"><img src="'+my_pin_icon+'"/></div>';
			}else {
			if(enable_dot){
				var pin_dot_color=$("#pin_dot_color_3").val();
				inner_dot_style='background-color:'+pin_dot_color+";";
				my_dot_html+='<div class="my_inner_dot-front" style="'+inner_dot_style+'">';
				my_dot_html+='</div>';
			}
			}
			my_dot_html+='</div>';
			all_html+=my_dot_html;
			if(my_pin_icon==""){
				
			var pin_hover_bg=$("#pin_hover_background_color_"+i).val();
			var pin_hover_tr=$("#pin_hover_background_transparency_"+i).val();
			var pin_hover_line_c=$("#pin_hover_line_color_"+i).val();
			var pin_hover_dot_c=$("#pin_hover_dot_color_"+i).val();
	
			style_css+=" #my_mapper_id_"+i+":hover .my_inner_dot-front{";
			style_css+=" background-color:"+pin_hover_dot_c+" !important;}\n";
			style_css+=" #my_mapper_id_"+i+":hover{ bakcground-color:"+pin_hover_bg+" !important;";
			style_css+=" opacity:"+pin_hover_tr+" !important;";
			style_css+=" border-color:"+pin_hover_line_c+" !important;";
			style_css+="}\n";
			}
		}
		frontHtml+=all_html;
		frontHtml+='<style type="text/css">'+style_css+'</style>';
		/*$('.imapper-sortable-real').each(function() {
			var num = $(this).attr('id').substring(17);
	 		var count = 2;

			frontHtml += '<div id="imapper' + id + '-pin' + num + '-wrapper" class="imapper' + id + '-pin-wrapper imapper-pin-wrapper" style="position: absolute; left: ' + $('#sort' + num + '-imapper-item-x').attr('value') + '; top: ' + $('#sort' + num + '-imapper-item-y').attr('value') + ';" >';

			if ($('#item-icon').attr('src').indexOf('images/icons/6/') >= 0)
			frontHtml +='<div id="imapper' + id + '-pin' + num + '" class="imapper' + id + '-pin imapper-pin imapper-area-pin pin-style" style="width:'+$('#sort' + num + '-imapper-area-width-normalized').attr('value')+'px;height:'+$('#sort' + num + '-imapper-area-height-normalized').attr('value')+'px;border:'+$('#sort' + num + '-imapper-border-width').attr('value')+'px solid '+$('#sort' + num + '-imapper-border-color').attr('value')+';background:' + $(this).find('.imapper-item-pin-color').attr('value') + ';" ></div>';
		else if ($('#item-icon').attr('src').indexOf('images/icons/7/') >= 0)
			frontHtml +='<span id="imapper' + id + '-pin' + num + '" class="imapper' + id + '-pin iMapper-pin-1 imapper-pin pin-style" style="color: ' + $(this).find('.imapper-item-pin-color').attr('value') + ';"></span>';
		else {
		
			
			frontHtml +='<img id="imapper' + id + '-pin' + num + '" class="imapper' + id + '-pin" src="' + $('#item-icon-input').attr('value') + '" style="position:absolute;left:'+pinWidth+'px;top:'+pinHeight+'px;">';
		}
			
				
			if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0)				
				frontHtml +=		'<div id="imapper' + id + '-pin' + num + '-color" class="imapper-pin-color" style="background-color: ' + $(this).find('.imapper-item-pin-color').attr('value') + ';"></div>'
									+ '<i id="imapper' + id + '-pin' + num + '-icon" class="imapper-pin-icon fawesome icon-large ' + $(this).find('.imapper-item-picture').attr('value') + '"></i>';
									
			if ($('#item-icon').attr('src').indexOf('images/icons/3/') >= 0)
				frontHtml +=		'<img id="imapper' + id + '-pin' + num + '" class="imapper-pin-shadow" src="' + $('#item-icon-input').attr('value').substring(0, $('#item-icon-input').attr('value').indexOf('/icons/3/') + 9) + '1-1.png'  + '">';
				
				frontHtml +=		'<div id="imapper' + id + '-pin' + num + '-content-wrapper" class="imapper' + id + '-pin-content-wrapper imapper-content-wrapper" style="color: ' + $('#item-font-color').attr('value') + ';">'
									+	'<div id="imapper' + id + '-pin' + num + '-content" class="imapper-content" style="background-color: ' + $('#item-back-color').attr('value') + '; border-color: ' + $('#item-border-color').attr('value') + '; border-radius: ' + $('#item-border-radius').attr('value') + 'px; width: ' + $('#item-width').attr('value') + 'px; height: ' + $('#item-height').attr('value') + 'px; font-family: &quot;' + font + '&quot;; font-size: ' + $('#item-font-size').attr('value') + 'px;"><p class="imapper-content-header" style="font-size: ' + $('#item-header-font-size').attr('value') + 'px !important;">' + $('#sort' + num + '-imapper-item-title').attr('value') + '</p><div class="imapper-content-text">' + $('#sort' + num + '-imapper-item-content').attr('value') + '</div></div>';
				
						
			if ($(this).find('.textarea-additional').length > 0)
			{
				frontHtml += 			'<div id="imapper' + id + '-pin' + num + '-content-tab" class="imapper-content-tab" style="background-color: ' + $('#item-back-color').attr('value') + ';"><a href="#">1</a></div>';
				
				$(this).find('.textarea-additional').each(function() {
					frontHtml += 		'<div id="imapper' + id + '-pin' + num + '-content-' + count + '" class="imapper-content imapper-content-additional" style="background-color: ' + $('#item-back-color').attr('value') + '; border-color: ' + $('#item-border-color').attr('value') + '; border-radius: ' + $('#item-border-radius').attr('value') + 'px; width: ' + $('#item-width').attr('value') + 'px; height: ' + $('#item-height').attr('value') + 'px; font-family: &quot;' + font + '&quot;; font-size: ' + $('#item-font-size').attr('value') + 'px;"><div class="imapper-content-header" style="font-size: ' + $('#item-header-font-size').attr('value') + 'px !important;">' + $('#sort' + num + '-imapper-item-title').attr('value') + '</div><div class="imapper-content-text">' + $(this).attr('value') + '</div></div>';
					frontHtml +=		'<div id="imapper' + id + '-pin' + num + '-content-' + count + '-tab" class="imapper-content-tab" style="background-color: ' + $('#item-back-color').attr('value') + ';"><a href="#">' + count + '</a></div>';
					count++;
				});
				
			}
			
			frontHtml +=			'<div class="imapper-arrow" style="border-color: ' + $('#item-back-color').attr('value') + ' transparent transparent transparent;"></div>';
			
			if ($('#item-icon').attr('src').indexOf('images/icons/2/') < 0)
				frontHtml +=		'<div class="arrow-' + $('#sort' + num + '-imapper-item-open-position').val() + '-border"></div>';
			else
				frontHtml +=		'<div class="triangle-' + $('#sort' + num + '-imapper-item-open-position').val() + '-border"></div>';
			
			frontHtml +=			'</div><div id="imapper' + id + '-value-item' + num + '-open-position" class="imapper' + id + '-value-item-open-position" style="display:none;">' + $('#sort' + num + '-imapper-item-open-position').val() + '</div>';
				
			var tabStyle;				
			if (count > 2)
				tabStyle = 'display: block; width: 16px; height: 16px; border-radius: 8px; border: 1px solid #191970; background-color: #4f92d3; color: white; font-size: 10px; line-height: 1.4; text-align: center; position: absolute; top: -50px; left: 10px; z-index: 10;';
			else
				tabStyle = 'display: none;';
								
			frontHtml +=		'<div id="imapper' + id + '-value-item' + num + '-tab-number" class="imapper-value-tab-number" style="' + tabStyle + '">' + (count - 1) + '</div>'
							+	'<div id="imapper' + id + '-value-item' + num + '-border-color" class="imapper-value-border-color" style="display: none;">' + $('#item-border-color').attr('value') + '</div>'
						  + '</div>';
		});
		*/
		frontHtml += '</div>';

		//frontHtml += '<script type="text/javascript">(function($) { $(window).load(function() {$("#imagemapper' + id + 'wrapper").imageMapper({});});})(jQuery);</script>';

		$('#TB_window').append(frontHtml);
		$('#TB_window').append('<script type="text/javascript" src="' + url + 'js/preview.js"></script>');
		$('#TB_window').find('#imagemapper' + id + '-wrapper').css('width', $('#imapper' + id + '-map-image').width());
		$('#TB_window').find('#imagemapper' + id + '-wrapper').css('visibility', 'visible');

		var mapPreviewWidth = $('#imapper' + id + '-map-image').width();
		var mapPreviewHeight = $('#imapper' + id + '-map-image').height();

		$('.imapper' + id + '-pin').each(function(){
			var areaPinWidthPreview = $(this).width();
			var areaPinHeightPreview = $(this).height();
			var newAreaPinWidthPreview = areaPinWidthPreview*mapPreviewWidth/mapWidth;
			var newAreaPinHeightPreview = areaPinHeightPreview*mapPreviewHeight/mapHeight;
			$(this).width(areaPinWidthPreview*mapPreviewWidth/mapWidth);
			$(this).height(areaPinHeightPreview*mapPreviewHeight/mapHeight);
			$(this).css({'width':newAreaPinWidthPreview+'px','height':newAreaPinHeightPreview+'px','left':(-newAreaPinWidthPreview/2)+'px','top':(-newAreaPinWidthPreview)+'px',})

		});
		
		}
			
		$('#TBct_closeWindowButton').click(function(ev){
			ev.preventDefault();
			$('#TB_overlay').remove();
			$('#TB_window').remove();
		});
	});
	
	
});

//imapper admin select click event {
	$(document).on('click','.wrap.imapper-admin-wrapper select',function(){
		//console.log($(this));
		// var select = $(this).parent();
		$(this).siblings('span').text($(this).children(":selected").text());
	});


//funkcija koja menja kliknute vrednosti
function itemIsClicked(clicked, prevClicked) {
	my_admin_debug("itemIsClicked",{clicked:clicked,prevClicked:prevClicked});
	if (prevClicked > 0)
	{
		$('#sort' + prevClicked + '-imapper-item-title').attr('value', $('#dummy-imapper-item-title').attr('value'));
		$('#sort' + prevClicked + '-imapper-item-content').attr('value', $('#dummy-imapper-item-content').attr('value'));
		$('#sort' + prevClicked + '-imapper-item-content').html($('#dummy-imapper-item-content').attr('value'));
		
		$('#sort' + prevClicked + '-imapper-item-pin-color').attr('value', $('#dummy-imapper-item-pin-color').attr('value'));
		$('#sort' + prevClicked + '-imapper-item-picture').attr('value', $('#dummy-imapper-item-picture').attr('value'));

		$('#sort' + prevClicked + '-imapper-item-category').attr('value', $('#dummy-imapper-item-category').attr('value'));
		$('#sort' + prevClicked + '-imapper-item-link').attr('value', $('#dummy-imapper-item-link').attr('value'));
		
		$('#sort' + prevClicked + '-mapper-pin-delete').css('display', 'none');

		$('#sort' + prevClicked + '-imapper-border-color').attr('value', $('#dummy-imapper-border-color').attr('value'));
		$('#sort' + prevClicked + '-imapper-border-width').attr('value', $('#dummy-imapper-border-width').attr('value'));
		$('#sort' + prevClicked + '-imapper-border-radius').attr('value', $('#dummy-imapper-border-radius').attr('value'));
		$('#sort' + prevClicked + '-imapper-area-width').attr('value', $('#dummy-imapper-area-width').attr('value'));
		$('#sort' + prevClicked + '-imapper-area-height').attr('value', $('#dummy-imapper-area-height').attr('value'));


		$('#sort' + prevClicked + '-imapper-item-open-position').find('option').each(function(){
			$(this).removeAttr('selected');	
		});
		
		var selected = 0;
		$('#dummy-imapper-item-open-position').find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		$('#sort' + prevClicked + '-imapper-item-open-position').find('option').eq(selected).attr('selected', 'selected');


		
		
		var selected = 0;
		$('#dummy-imapper-item-click-action').find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		$('#sort' + prevClicked + '-imapper-item-click-action').find('option').eq(selected).attr('selected', 'selected');


		
		
		var selected = 0;
		$('#dummy-imapper-item-hover-action').find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		$('#sort' + prevClicked + '-imapper-item-hover-action').find('option').eq(selected).attr('selected', 'selected');


		
		for (var i = 2; i <= numberOfTabs[prevClicked]; i++)
		{
			$('#sort' + prevClicked + '-imapper-item-content-' + i).attr('value', $('#dummy-imapper-item-content-' + i).attr('value'));
			$('#sort' + prevClicked + '-imapper-item-content-' + i).html($('#dummy-imapper-item-content-' + i).attr('value'));
		}
	}
		
	$('.imapper-sort-header').each( function() {
		$(this).removeAttr('style');
	});
	
	$('img#sort' + prevClicked + '-mapper-pin').css('border', 'none');
	//$('img#sort' + clicked + '-mapper-pin').css('border', '1px dashed #ffffff');
	
	$('#imapper-sort' + clicked + '-header').css('background-image', 'none');
	$('#imapper-sort' + clicked + '-header').css('background-color', 'rgb(200, 200, 200)');
	
	
	$('#sort' + clicked + '-mapper-pin-delete').css('display', 'block');
		
	$('#dummy-imapper-item-title').attr('value', $('#sort' + clicked + '-imapper-item-title').attr('value'));
	$('#dummy-imapper-item-content').attr('value', $('#sort' + clicked + '-imapper-item-content').attr('value'));
	$('#dummy-imapper-item-content').html($('#sort' + clicked + '-imapper-item-content').html());

	$('#dummy-imapper-item-category').attr('value', $('#sort' + clicked + '-imapper-item-category').attr('value'));
	$('#dummy-imapper-item-link').attr('value', $('#sort' + clicked + '-imapper-item-link').attr('value'));

	$('#dummy-imapper-border-color').css('background-color',$('#sort' + clicked + '-imapper-border-color').attr('value')).attr('value', $('#sort' + clicked + '-imapper-border-color').attr('value'));
	$('#dummy-imapper-border-width').attr('value', $('#sort' + clicked + '-imapper-border-width').attr('value'));
	$('#dummy-imapper-border-radius').attr('value', $('#sort' + clicked + '-imapper-border-radius').attr('value'));
	$('#dummy-imapper-area-width').attr('value', $('#sort' + clicked + '-imapper-area-width').attr('value'));
	$('#dummy-imapper-area-height').attr('value', $('#sort' + clicked + '-imapper-area-height').attr('value'));
	$('#dummy-imapper-fill-color').prop('checked',$('#sort' + clicked + '-imapper-fill-color').is(':checked'));

	
	$('#dummy-imapper-item-pin-color').attr('value', $('#sort' + clicked + '-imapper-item-pin-color').attr('value'));
	$('#dummy-imapper-item-pin-color').css('background-color', $('#sort' + clicked + '-imapper-item-pin-color').attr('value'));
	$('#dummy-imapper-item-picture').attr('value', $('#sort' + clicked + '-imapper-item-picture').attr('value'));
	$('#dummy-imapper-pin-icon').removeClass();
	$('#dummy-imapper-pin-icon').addClass('fawesome');
	$('#dummy-imapper-pin-icon').addClass('icon-2x');
	$('#dummy-imapper-pin-icon').addClass($('#dummy-imapper-item-picture').attr('value'));
	
	$('#dummy-imapper-item-open-position').find('option').each(function(){
		$(this).removeAttr('selected');	
	});

	$('#dummy-imapper-item-click-action').find('option').each(function(){
		$(this).removeAttr('selected');	
	});

	$('#dummy-imapper-item-hover-action').find('option').each(function(){
		$(this).removeAttr('selected');	
	});
	
	var selected2 = 0;
	$('#sort' + clicked + '-imapper-item-open-position').find('option').each(function(index) {
		if ($(this).attr('selected') == 'selected')
			selected2 = index;
	});
	$('#dummy-imapper-item-open-position').find('option').eq(selected2).attr('selected', 'selected');

	
	$('#sort' + clicked + '-imapper-item-click-action').find('option').each(function(index) {
		if ($(this).attr('selected') == 'selected')
			selected2 = index;
	});
	$('#dummy-imapper-item-click-action').find('option').eq(selected2).attr('selected', 'selected');

	
	$('#sort' + clicked + '-imapper-item-hover-action').find('option').each(function(index) {
		if ($(this).attr('selected') == 'selected')
			selected2 = index;
	});
	$('#dummy-imapper-item-hover-action').find('option').eq(selected2).attr('selected', 'selected');
	
	for (var i = 2; i <= numberOfTabs[prevClicked]; i++)
		$('#dummy-imapper-item-content-' + i).remove();		
	for (var i = 2; i <= numberOfTabs[clicked]; i++)
		$('#li-item-content').append('<textarea class="textarea-additional" rows="6" style="width: 230px; resize: none;" id="dummy-imapper-item-content-' + i + '" name="dummy-imapper-item-content-' + i + '" value="' + $('#sort' + clicked + '-imapper-item-content-' + i).attr('value') + '" type="text" >' + $('#sort' + clicked + '-imapper-item-content-' + i).html() + '</textarea>');

	return clicked;
}

function iconUploadBehavior() {
	
		if ($('#item-icon').attr('src').indexOf('images/icons/6/')<0 && $('#item-icon').attr('src').indexOf('images/icons/7/')<0) {
			$('.imapper-pin').each(function(index) {

				var pinId = $(this).attr('id');		
				var href = $(this).attr('src');
				
				$(this).replaceWith('<img style="position:absolute;" id="'+pinId+'" class="imapper-pin" src="'+$('#item-icon').attr('src')+'" />');


			});

				 $('.imapper-pin').css('top', -$('.imapper-pin').height() + 'px');
				 $('.imapper-pin').css('left', -($('.imapper-pin').width()/2) + 'px');

				 $('.imapper-pin-delete').css('top', -$('.imapper-pin').height() + 'px');
				 $('.imapper-pin-delete').css('left', $('.imapper-pin').width()/2 - 15 + 'px');

		} else if ($('#item-icon').attr('src').indexOf('images/icons/6/')>=0) {
			 $('.imapper-pin').each(function() {
				 var hrefUnnecessary = $(this).attr('src');
				 var top = $(this).css('top');
				 var left = $(this).css('left');
				 var pinId = $(this).attr('id');
				 
				 $(this).replaceWith('<div id="'+pinId+'" class="imapper-pin imapper-area-pin" style="position:absolute;width:100px;height:100px;border:2px solid red;top:-100px;left:-50px;" ></div>')
			});

			  var pinWidthOld = 0;
			 var pinHeightOld = 0;

 	$('.imapper-area-pin').resizable({
			  	  start:function(){
			  	  		 pinWidthOld = $(this).width();
			 			 pinHeightOld = $(this).height();

			  		},
				  stop: function() {
				  	 var pinId = $(this).attr('id').substr(0,$(this).attr('id').indexOf('-mapper-pin'));
				  	 var pinWidth = $(this).width();
				  	 var pinHeight = $(this).height();

				  	 
				  	 
				  	 $(this).css({top:-pinHeight+'px',left:-(pinWidth/2)+'px'});

		

				  	var imageWidth = jQuery('#map-image').width();
				  	var imageHeight = jQuery('#map-image').height();

				  	 var pinWidthOffset = (pinWidth-pinWidthOld);
				  	 var pinHeightOffset = (pinHeight-pinHeightOld);

				  	


				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

					


				 	 $(this).closest('.imapper-pin-wrapper').css({'left':'+='+pinWidthOffset/2+'px','top':'+='+pinHeightOffset+'px'});
				  	 
				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

				  	 $(this).closest('.imapper-pin-wrapper').css({'left':pinLeftInPercent+'%','top':pinTopInPercent+'%'});

				  	 $('#'+ pinId +'-imapper-item-x').attr('value',pinLeftInPercent+'%');
				  	  $('#'+ pinId +'-imapper-item-y').attr('value',pinTopInPercent+'%');
				     
					 
				  	 if ($('#imapper-'+pinId+'-header').css('background-color')=="rgb(200, 200, 200)") {
				  	 	$('#'+pinId+'-imapper-area-width, #dummy-imapper-area-width').attr('value',pinWidth);
				  		$('#'+pinId+'-imapper-area-height, #dummy-imapper-area-height').attr('value',pinHeight);
				  	 } else {
				  	 	$('#'+pinId+'-imapper-area-width').attr('value',pinWidth);
				  	 	$('#'+pinId+'-imapper-area-height').attr('value',pinHeight);
				  	 }
				  }
				});
		} else if ($('#item-icon').attr('src').indexOf('images/icons/7/')>=0) {
			 $('.imapper-pin').each(function() {
				 var hrefUnnecessary = $(this).attr('src');
				 var top = $(this).css('top');
				 var left = $(this).css('left');
				 var pinId = $(this).attr('id');
				 
				 $(this).replaceWith('<span id="'+pinId+'" class="imapper-pin iMapper-pin-1 pin-style" ></span>');
			});
		} 
	
		$('#item-font-size').removeAttr('readonly');
		$('#item-header-font-size').removeAttr('readonly');
		$('#item-height').removeAttr('readonly');
			
		if ($('#dummy-imapper-item-open-position').find('option').length == 2)
		{
			$('#dummy-imapper-item-open-position').append('<option value="top">Top</option>');
			$('#dummy-imapper-item-open-position').append('<option value="bottom">Bottom</option>');
		}
			
		$('.imapper-sortable-real').each(function() {
			if ($(this).find('option').length == 2)
			{
				$(this).find('select').append('<option value="top">Top</option>');
				$(this).find('select').append('<option value="bottom">Bottom</option>');
			}
			$(this).find('.imapper-item-pin-color').parent().remove();
			$(this).find('.imapper-item-picture').parent().remove();

			$(this).find('.imapper-item-picture').parent().remove();

			$(this).children('li[id$="li-item-border-color"]').remove();
			$(this).children('li[id$="li-item-border-width"]').remove();
			$(this).children('li[id$="li-item-border-radius"]').remove();
			$(this).children('li[id$="li-item-area-width"]').remove();
			$(this).children('li[id$="li-item-area-height"]').remove();
		});
		
		$('#item-content-button-new').remove();
		$('#item-content-button-remove').remove();
		$('#dummy-li-item-pin-color').remove();
		$('#dummy-li-item-picture, #dummy-li-item-border-color, #dummy-li-item-border-width, #dummy-li-item-border-radius, #dummy-li-item-area-width, #dummy-li-item-area-height').remove();	
		
		if ($('#item-icon').attr('src').indexOf('images/icons/1/') < 0 || $('#item-icon').attr('src').indexOf('images/icons/7/') < 0)
		{	
			$('.textarea-additional').each(function() {
				$(this).remove();	
			});
			
			$('.imapper-sortable-real').each(function() {
				numberOfTabs[$(this).attr('id').substring(17)] = 1;
			});
		}
		
		if ($('#item-icon').attr('src').indexOf('images/icons/2/') >= 0)
		{
			$('#item-font-size').html('12');
			$('#item-font-size').attr('value', '12');
			$('#item-font-size').attr('readonly', 'readonly');
			$('#item-header-font-size').html('12');
			$('#item-header-font-size').attr('value', '12');
			$('#item-header-font-size').attr('readonly', 'readonly');
			$('#item-height').html('75');
			$('#item-height').attr('value', '75');
			$('#item-height').attr('readonly', 'readonly');
			
			$('#dummy-imapper-item-open-position').find('option').each(function() {
				if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
					$(this).remove();	
			});
			
			$('.imapper-sortable-real').each(function() {
				$(this).find('option').each(function() {
					$(this).removeAttr('selected');	
				});
				
				$(this).find('option').each(function() {
					if ($(this).attr('value') == 'left')
						$(this).attr('selected', 'selected');
					
					if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
						$(this).remove();
				});
			});
		} else if ($('#item-icon').attr('src').indexOf('images/icons/1/') >= 0) {
			$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new"  /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
		} else if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0 )
		{
			$('.imapper-sortable-real').each(function() {
				var sortId = $(this).attr('id').substring(17);
				
				$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li><input id="sort' + sortId + '-imapper-item-picture" name="sort' + sortId + '-imapper-item-picture" class="imapper-item-picture" value="icon-cloud-download" type="text"></li>');
			});
			
			var icons = createIconList();
			
			$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style=" background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-picture" style="position: relative;"><label for="dummy-imapper-item-picture" style="display: inline-block; margin-top: -12px;">Item Pin Image</label><br /><input id="dummy-imapper-item-picture" name="dummy-imapper-item-picture" value="icon-cloud-download" type="hidden"><i id="dummy-imapper-pin-icon" class="fawesome icon-2x icon-cloud-download" style="width: 32px; height: 27px; border: 1px solid black; margin: 0 5px 0 0 !important;"></i><div class="icon-list-button"><a class="arrow-down-admin-link" href="#"><div class="arrow-down-admin" style=""></div></a></div>' + icons + '</li>');
		
			$('.imapper-item-icon-list').mCustomScrollbar();
			
			$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
			{
				$(this).css('background', $(this).val());
	            $(this).iris({
					height: 145,
	                target:$(this).parent().find('.color-picker-iris-holder'),
					change: function(event, ui) {
	                    $(this).val(ui.color.toString());
	                    $(this).css( 'background-color', ui.color.toString());
	                }
	            });
			});
		} else if ($('#item-icon').attr('src').indexOf('images/icons/6/') >= 0)
		{
			$('.imapper-sortable-real').each(function() {
				var sortId = $(this).attr('id').substring(17);
				
				$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li id="sort' + sortId + '-li-item-border-color"><input style="margin-left: 75px; width: 230px;" class="color-picker-iris" id="sort' + sortId + '-imapper-border-color" name="sort' + sortId + '-imapper-border-color" value="transparent" type="text" style="background:transparent" /></li> <li id="sort' + sortId + '-li-item-border-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-width" name="sort' + sortId + '-imapper-border-width" type="text" /> px</li><li id="sort' + sortId + '-li-item-border-radius"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-radius" name="sort' + sortId + '-imapper-border-radius" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width" name="sort' + sortId + '-imapper-area-width" type="text" /> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width-normalized" class="imapper-area-width-normalized" name="sort' + sortId + '-imapper-area-width-normalized" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-height"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height" name="sort' + sortId + '-imapper-area-height" type="text"/> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height-normalized" class="imapper-area-height-normalized" name="sort' + sortId + '-imapper-area-height-normalized" type="text" /> px</li>');
			});
			
			var icons = createIconList();
			
			$('#imapper-sortable-dummy').append('<li id="dummy-li-item-border-width"><label for="dummy-imapper-border-width">Border width</label><br /><input id="dummy-imapper-border-width" name="dummy-imapper-border-width"  type="text" /> </li><li id="dummy-li-item-border-radius"><label for="dummy-imapper-border-radius">Border radius</label><br /><input id="dummy-imapper-border-radius" name="dummy-imapper-border-radius" type="text" /> </li><li id="dummy-li-item-border-color"><label for="dummy-imapper-border-color">Border color</label><br /><input class="color-picker-iris" id="dummy-imapper-border-color" name="dummy-imapper-border-color" type="text" style="background:transparent;" /><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-area-width"><label for="dummy-imapper-area-width">Area pin width</label><br /><input id="dummy-imapper-area-width" name="dummy-imapper-area-width"  type="text" value="100" disabled /> </li><li id="dummy-li-item-area-height"><label for="dummy-imapper-area-height">Area pin height</label><br /><input id="dummy-imapper-area-height" name="dummy-imapper-area-height" type="text" value="100" disabled /> </li><li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');

				
						
						
			
			$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
			{
				$(this).css('background', $(this).val());
	            $(this).iris({
					height: 145,
	                target:$(this).parent().find('.color-picker-iris-holder'),
					change: function(event, ui) {
	                    $(this).val(ui.color.toString());
	                    $(this).css( 'background-color', ui.color.toString());
	                }
	            });
			});
		} else if ($('#item-icon').attr('src').indexOf('images/icons/7/') >= 0) {
				$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new" /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');

				$('.imapper-sortable-real').each(function() {
				var sortId = $(this).attr('id').substring(17);
				
				$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li>');
			});
			
			
			$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');
			
			$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
			{
				$(this).css('background', $(this).val());
	            $(this).iris({
					height: 145,
	                target:$(this).parent().find('.color-picker-iris-holder'),
					change: function(event, ui) {
	                    $(this).val(ui.color.toString());
	                    $(this).css( 'background-color', ui.color.toString());
	                }
	            });
			});


		}

		$(".dummy-adapter li").each(function(){
			if($.trim($(this).html())=='')
				$(this).remove();
		});

}

function createPin(numItems, left, top) {
	$(".imapper-pin-wrapper ").each(function(i,v){
		$(v).find('.imapper-pin-my-out').css('border','none');
		$(v).find(".imapper-pin-delete").hide();
		$(v).removeAttr('my_open');
	});
	var pinWrapper = $(document.createElement('div'));
	pinWrapper.attr('id', 'sort' + numItems + '-mapper-pin-wrapper');
	pinWrapper.attr('class', 'imapper-pin-wrapper');
	pinWrapper.css('position', 'absolute');
	pinWrapper.css('left', left);
	pinWrapper.css('top', top);
	var pin = $(document.createElement('div'));
	pin.attr('class','imapper-pin-my-out');
	var pinClass=$(document.createElement('div'));
	pinClass.attr('class','imapper-pin-wrapper-my-inner');
	/**
	 * Create pindot
	 */
	var pinDot=$(document.createElement('div'));
	
	pinDot.attr('class','my_inner_dot');
	pinClass.append(pinDot);
	pin.css('border','1px dashed red');
	pin.append(pinClass);
	
	/*		
	if ($('#item-icon').attr('src').indexOf('images/icons/6/')>=0) {
		var pin = $(document.createElement('div'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin imapper-area-pin');
		pin.css({'position': 'absolute',
			'width':(($('#sort' + numItems + '-imapper-area-width').attr('value') !== undefined) ? $('#sort' + numItems + '-imapper-area-width').attr('value')+'px'  : '100px'),
			'height':(($('#sort' + numItems + '-imapper-area-height').attr('value') !== undefined) ? $('#sort' + numItems + '-imapper-area-height').attr('value')+'px'  : '100px'),
			'border':'1px solid red'});
	} else if ($('#item-icon').attr('src').indexOf('images/icons/7/')>=0) {
		var pin = $(document.createElement('span'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin iMapper-pin-1');
		pin.css('position', 'absolute');
	} else {
		var pin = $(document.createElement('img'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin');
		pin.attr('src', $('#item-icon').attr('src'));
		pin.css('position', 'absolute');
	}
	*/		
	var pinText = $(document.createElement('div'));
	pinText.attr('id', 'sort' + numItems + '-mapper-pin-text');
	pinText.attr('class', 'imapper-pin-text');
	pinText.css('position', 'abosulte');
	//pinText.css('position','absolute');
	pinText.css('width','200px');
	pinText.css('text-align','center');
	pinText.css('z-index','10000000');
	//pinText.css('display','none');
	pinText.css('color', '#000000');
	pinText.css('top', '15px');
	pinText.html($('#sort' + numItems + '-imapper-item-title').attr('value'));
	
	var pinDelete = $(document.createElement('img'));
	pinDelete.attr('id', 'sort' + numItems + '-mapper-pin-delete');
	pinDelete.attr('class', 'imapper-pin-delete');
	pinDelete.css('display','none');
	pinDelete.attr('src', $('#plugin-url').val() + 'images/tb-close.png');
	pinDelete.css('position', 'absolute');
	pinDelete.css('cursor', 'pointer');
	pinDelete.css('display', 'none');
	//pinWrapper.css('border',"1px dashed red");
	//pinWrapper.css('height','15px');
	//pinWrapper.css('width','15px');
	
	pinWrapper.attr('my_open',1);
	pinWrapper.append(pin);
	pinWrapper.append(pinText);
	pinWrapper.append(pinDelete);


	$(".dummy-adapter li").each(function(){
			if($.trim($(this).html())=='')
				$(this).remove();
		});
	
	return pinWrapper;
}

function createIconList()
{
	var iconList = ['icon-cloud-download', 'icon-cloud-upload', 'icon-lightbulb', 'icon-exchange', 'icon-bell-alt', 'icon-file-alt', 'icon-beer', 'icon-coffee', 'icon-food', 'icon-fighter-jet', 'icon-user-md', 'icon-stethoscope', 'icon-suitcase', 'icon-building', 'icon-hospital', 'icon-ambulance', 'icon-medkit', 'icon-h-sign', 'icon-plus-sign-alt', 'icon-spinner', 'icon-angle-left', 'icon-angle-right', 'icon-angle-up', 'icon-angle-down', 'icon-double-angle-left', 'icon-double-angle-right', 'icon-double-angle-up', 'icon-double-angle-down', 'icon-circle-blank', 'icon-circle', 'icon-desktop', 'icon-laptop', 'icon-tablet', 'icon-mobile-phone', 'icon-quote-left', 'icon-quote-right', 'icon-reply', 'icon-github-alt', 'icon-folder-close-alt', 'icon-folder-open-alt', 'icon-adjust', 'icon-asterisk', 'icon-ban-circle', 'icon-bar-chart', 'icon-barcode', 'icon-beaker', 'icon-beer', 'icon-bell', 'icon-bell-alt', 'icon-bolt', 'icon-book', 'icon-bookmark', 'icon-bookmark-empty', 'icon-briefcase', 'icon-bullhorn', 'icon-calendar', 'icon-camera', 'icon-camera-retro', 'icon-certificate', 'icon-check', 'icon-check-empty', 'icon-circle', 'icon-circle-blank', 'icon-cloud', 'icon-cloud-download', 'icon-cloud-upload', 'icon-coffee', 'icon-cog', 'icon-cogs', 'icon-comment', 'icon-comment-alt', 'icon-comments', 'icon-comments-alt', 'icon-credit-card', 'icon-dashboard', 'icon-desktop', 'icon-download', 'icon-download-alt', 'icon-edit', 'icon-envelope', 'icon-envelope-alt', 'icon-exchange', 'icon-exclamation-sign', 'icon-external-link', 'icon-eye-close', 'icon-eye-open', 'icon-facetime-video', 'icon-fighter-jet', 'icon-film', 'icon-filter', 'icon-fire', 'icon-flag', 'icon-folder-close', 'icon-folder-open', 'icon-folder-close-alt', 'icon-folder-open-alt', 'icon-food', 'icon-gift', 'icon-glass', 'icon-globe', 'icon-group', 'icon-hdd', 'icon-headphones', 'icon-heart', 'icon-heart-empty', 'icon-home', 'icon-inbox', 'icon-info-sign', 'icon-key', 'icon-leaf', 'icon-laptop', 'icon-legal', 'icon-lemon', 'icon-lightbulb', 'icon-lock', 'icon-unlock', 'icon-magic', 'icon-magnet', 'icon-map-marker', 'icon-minus', 'icon-minus-sign', 'icon-mobile-phone', 'icon-money', 'icon-move', 'icon-music', 'icon-off', 'icon-ok', 'icon-ok-circle', 'icon-ok-sign', 'icon-pencil', 'icon-picture', 'icon-plane', 'icon-plus', 'icon-plus-sign', 'icon-print', 'icon-pushpin', 'icon-qrcode', 'icon-question-sign', 'icon-quote-left', 'icon-quote-right', 'icon-random', 'icon-refresh', 'icon-remove', 'icon-remove-circle', 'icon-remove-sign', 'icon-reorder', 'icon-reply', 'icon-resize-horizontal', 'icon-resize-vertical', 'icon-retweet', 'icon-road', 'icon-rss', 'icon-screenshot', 'icon-search', 'icon-share', 'icon-share-alt', 'icon-shopping-cart', 'icon-signal', 'icon-signin', 'icon-signout', 'icon-sitemap', 'icon-sort', 'icon-sort-down', 'icon-sort-up', 'icon-spinner', 'icon-star', 'icon-star-empty', 'icon-star-half', 'icon-tablet', 'icon-tag', 'icon-tags', 'icon-tasks', 'icon-thumbs-down', 'icon-thumbs-up', 'icon-time', 'icon-tint', 'icon-trash', 'icon-trophy', 'icon-truck', 'icon-umbrella', 'icon-upload', 'icon-upload-alt', 'icon-user', 'icon-user-md', 'icon-volume-off', 'icon-volume-down', 'icon-volume-up', 'icon-warning-sign', 'icon-wrench', 'icon-zoom-in', 'icon-zoom-out', 'icon-file', 'icon-file-alt', 'icon-cut', 'icon-copy', 'icon-paste', 'icon-save', 'icon-undo', 'icon-repeat', 'icon-text-height', 'icon-text-width', 'icon-align-left', 'icon-align-center', 'icon-align-right', 'icon-align-justify', 'icon-indent-left', 'icon-indent-right', 'icon-font', 'icon-bold', 'icon-italic', 'icon-strikethrough', 'icon-underline', 'icon-link', 'icon-paper-clip', 'icon-columns', 'icon-table', 'icon-th-large', 'icon-th', 'icon-th-list', 'icon-list', 'icon-list-ol', 'icon-list-ul', 'icon-list-alt', 'icon-angle-left', 'icon-angle-right', 'icon-angle-up', 'icon-angle-down', 'icon-arrow-down', 'icon-arrow-left', 'icon-arrow-right', 'icon-arrow-up', 'icon-caret-down', 'icon-caret-left', 'icon-caret-right', 'icon-caret-up', 'icon-chevron-down', 'icon-chevron-left', 'icon-chevron-right', 'icon-chevron-up', 'icon-circle-arrow-down', 'icon-circle-arrow-left', 'icon-circle-arrow-right', 'icon-circle-arrow-up', 'icon-double-angle-left', 'icon-double-angle-right', 'icon-double-angle-up', 'icon-double-angle-down', 'icon-hand-down', 'icon-hand-left', 'icon-hand-right', 'icon-hand-up', 'icon-circle', 'icon-circle-blank', 'icon-play-circle', 'icon-play', 'icon-pause', 'icon-stop', 'icon-step-backward', 'icon-fast-backward', 'icon-backward', 'icon-forward', 'icon-fast-forward', 'icon-step-forward', 'icon-eject', 'icon-fullscreen', 'icon-resize-full', 'icon-resize-small', 'icon-phone', 'icon-phone-sign', 'icon-facebook', 'icon-facebook-sign', 'icon-twitter', 'icon-twitter-sign', 'icon-github', 'icon-github-alt', 'icon-github-sign', 'icon-linkedin', 'icon-linkedin-sign', 'icon-pinterest', 'icon-pinterest-sign', 'icon-google-plus', 'icon-google-plus-sign', 'icon-sign-blank', 'icon-ambulance', 'icon-beaker', 'icon-h-sign', 'icon-hospital', 'icon-medkit', 'icon-plus-sign-alt', 'icon-stethoscope', 'icon-user-md' ];
		
	var iconDiv = '<div class="imapper-item-icon-list">';
	
	for (var i = 0; i < iconList.length; i++)
		if ((i + 1) % 10 != 0)
			iconDiv += '<a href="#"><i class="' + iconList[i] + ' fawesome" style="margin: 10px 0 0 10px;"></i></a>';
		else
			iconDiv += '<a href="#"><i class="' + iconList[i] + ' fawesome" style="margin: 10px 10px 0 10px;"></i></a><div class="clear"></div>';
	
	iconDiv += '</div>';
	
	return iconDiv;
}

})(jQuery)

