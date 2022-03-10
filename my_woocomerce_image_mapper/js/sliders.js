jQuery(document).ready(function($){
	my_enable_autocomplete=0;
	$(document).on('click','.imapper-checkbox-on',function(){
		$(this).removeClass('inactive');
		$(this).siblings('.imapper-checkbox-off').addClass('inactive');
		$(this).siblings('[type=checkbox]').attr('checked','checked');
		my_enable_autocomplete=1;
		my_generate_shortcode('',2);
	});

	$(document).on('click','.imapper-checkbox-off',function(){
		$(this).removeClass('inactive');
		$(this).siblings('.imapper-checkbox-on').addClass('inactive');
		$(this).siblings('[type=checkbox]').removeAttr('checked');
		my_enable_autocomplete=0;
		my_generate_shortcode('',2);
	});
	$("#my_sleep_id").change(function(e){
		//var val=$(this).find("option:selected").val();
		my_sliders_debug("Change timing");
		if(my_enable_autocomplete==1){
			my_generate_shortcode('',2);
		}
	});
	my_sliders_debug=function(t,o){
		return;
		if(window.console){
			console.log("**Sliders**\n"+t,o);
	
		}
	}
	my_sliders_debug("Loadded");
	$(document).on('click','.wrap.imapper-admin-wrapper select',function(){
		//console.log($(this));
		// var select = $(this).parent();
		$(this).siblings('span').text($(this).children(":selected").text());
	});
	var my_sliders_added={};
	var my_sliders_array=[];
	my_generate_shortcode=function(val,add){
		if(add==1){
			var ul_li='<li my-id="'+val+'"><input type="radio" name="my_added_sliders" value="'+val+'"/>'+my_sliders_added[val]+'</li>';
			$(".my_navigation").append(ul_li);
		}else if(add==0){
			$("li[my-id='"+val+"']").remove();
			delete my_sliders_added[val];
			new_arr=[];
			$.each(my_sliders_array,function(i,v){
				if(v!=val)new_arr[new_arr.length]=v;
			});
			my_sliders_array=new_arr;
		}
		var short='[woo_mapper_slider id="';
		var ids="";
		$.each(my_sliders_array,function(i,v){
			if(ids.length>0)ids+=",";
			ids+=v;
		});
		ids+='"';
		if(my_enable_autocomplete){
			my_sleep=$("#my_sleep_id option:selected").val();
			ids+=' my_autoplay="1" my_autoplay_sleep="'+my_sleep+'" ';
		}
		short+=ids+' ]';
		$(".my_sliders_shortcode .my_sliders_textarea").val(short);
	
	};
	$("#my-remove-mapper").click(function(e){
		var checked=$("input[name='my_added_sliders']:checked").val();
		if(typeof checked=='undefined'){
			alert("Please select mapper to remove from slider");
		}else {
			my_generate_shortcode(checked,0);
		}
	});
	$("#my-add-mapper").click(function(e){
		var val=$("#my_all_mappers_id option:selected").val();
		var text=$("#my_all_mappers_id option:selected").text();
		my_sliders_debug("Selected",{val:val,text:text});
		if(typeof my_sliders_added[val]!=='undefined'){
			alert("You have already added this woomapper");
			return;
		}
		if(val==0){
			alert("Please select woo mapper to add");
			return;
		}
		my_sliders_array[my_sliders_array.length]=val;
		my_sliders_added[val]=text;
		my_generate_shortcode(val,1);
	
	});
		
});
