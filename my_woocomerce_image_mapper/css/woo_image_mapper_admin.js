(function($) {
	myWooImageMapperAdmin=function(o){
		var self;
		this.options=o;
		this.my_debug=true;
		self=this;
		/**
		 * Init plugin
		 */
		this.init=function(){
			$(document).on('click', '#map-change',self.my_change_image);
		};
		this.my_change_image=function(e){
			
		}
		
		/**
		 * Debug
		 */
		this.my_debug(t,o){
		
		};
	};
})(jQuery);