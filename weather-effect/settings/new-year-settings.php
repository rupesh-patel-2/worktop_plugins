<!--new_year Falls Settings -->
		<div id="new_year_weather_effect" class="tab-content">
			<!-- new_year Effect Falls Settings -->
			<div id="new_year_effect_sh"><br>
				<p class="bg-title"><?php esc_html_e( 'New Year Effect Settings', 'weather-effect' ); ?></p>
				<!-- icons Start -->
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['balloon_new'] ) ) {
								$balloon_new = $weather_effect_settings['balloon_new'];
							} else {
								$balloon_new = '';
							}
							?>
							<input type="checkbox" id="balloon_new" name="balloon_new" value="balloon_new" 
							<?php
							if ( $balloon_new == 'balloon_new' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '1. New Year Balloon', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="new_year_balloon_sh">
						<div>
							<label class="lower_label"> <?php esc_html_e( 'Select New Year Falling Balloon', 'weather-effect' ); ?></label>
							<?php
							if ( isset( $weather_effect_settings['newyear_balloon'] ) ) {
								$newyear_balloon = $weather_effect_settings['newyear_balloon'];
							} else {
								$newyear_balloon = 'newyear_balloon2';
							}
							?>
							<select id="newyear_balloon" name="newyear_balloon" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="newyear_balloon1" 
								<?php
								if ( $newyear_balloon == 'newyear_balloon1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Newyear Balloon 1', 'weather-effect' ); ?></option>
								<option value="newyear_balloon2" 
								<?php
								if ( $newyear_balloon == 'newyear_balloon2' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Newyear Balloon 2', 'weather-effect' ); ?></option>
								<option value="newyear_balloon3" 
								<?php
								if ( $newyear_balloon == 'newyear_balloon3' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Newyear Balloon 3', 'weather-effect' ); ?></option>
							</select>
						</div>
					</div>
				</div>
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['sticker'] ) ) {
								$sticker = $weather_effect_settings['sticker'];
							} else {
								$sticker = '';
							}
							?>
							<input type="checkbox" id="sticker" name="sticker" value="sticker" 
							<?php
							if ( $sticker == 'sticker' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '2. New Year Sticker', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="new_year_sticker_sh">
						<div>
							<label class="lower_label"> <?php esc_html_e( 'Select New Year Falling Sticker', 'weather-effect' ); ?></label>
							<?php
							if ( isset( $weather_effect_settings['new_year_sticker'] ) ) {
								$new_year_sticker = $weather_effect_settings['new_year_sticker'];
							} else {
								$new_year_sticker = 'newyear_sticker1';
							}
							?>
							<select id="new_year_sticker" name="new_year_sticker" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="newyear_sticker1" 
								<?php
								if ( $new_year_sticker == 'newyear_sticker1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Newyear Sticker 1', 'weather-effect' ); ?></option>
								<option value="newyear_sticker2" 
								<?php
								if ( $new_year_sticker == 'newyear_sticker2' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Newyear Sticker 2', 'weather-effect' ); ?></option>
							</select>
						</div>
					</div>
				</div>
				
			</div><br>
			<!-- icons  End-->	
				
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '2. Minimum Fall Size On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['newyear_min_size_leaf'] ) ) {
					$newyear_min_size_leaf = $weather_effect_settings['newyear_min_size_leaf'];
				} else {
					$newyear_min_size_leaf = 20;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="newyear_min_size_leaf" name="newyear_min_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $newyear_min_size_leaf ); ?>" min="1" step="1" max="30">
					<span class="range-slider__value">0</span>
				</p>
			</div>	
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '3. Maximum Fall Size On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['newyear_max_size_leaf'] ) ) {
					$newyear_max_size_leaf = $weather_effect_settings['newyear_max_size_leaf'];
				} else {
					$newyear_max_size_leaf = 50;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="newyear_max_size_leaf" name="newyear_max_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $newyear_max_size_leaf ); ?>" min="10" step="1" max="200">
					<span class="range-slider__value">0</span>
				</p>
			</div>
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '4. Falls On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['newyear_flakes_leaf'] ) ) {
					$newyear_flakes_leaf = $weather_effect_settings['newyear_flakes_leaf'];
				} else {
					$newyear_flakes_leaf = 5;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="newyear_flakes_leaf" name="newyear_flakes_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $newyear_flakes_leaf ); ?>" min="1" step="1" max="100">
					<span class="range-slider__value">0</span>
				</p>
			</div>
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '5. Falls Speed On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['newyear_speed'] ) ) {
					$newyear_speed = $weather_effect_settings['newyear_speed'];
				} else {
					$newyear_speed = 5;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="newyear_speed" name="newyear_speed" class="range-slider__range" type="range" value="<?php echo esc_attr( $newyear_speed ); ?>" min="1" step="1" max="10">
					<span class="range-slider__value">0</span>
				</p>
			</div>
		</div>
	<!-- new_year Falls Settings End -->
<script>
<?php if ( $weather_occasion == 'new_year_check' ) { ?>
// new_year Effect Start
jQuery(document).ready(function(){
	<?php if ( $balloon_new == 'balloon_new' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/newyear/'); ?><?php echo esc_js( $newyear_balloon ); ?>.png",
			minSize: <?php echo esc_js( $newyear_min_size_leaf ); ?>,
			maxSize: <?php echo esc_js( $newyear_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $newyear_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $newyear_speed ); ?>
		});
	<?php } ?>
	<?php if ( $sticker == 'sticker' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/newyear/'); ?><?php echo esc_js( $new_year_sticker ); ?>.png",
			minSize: <?php echo esc_js( $newyear_min_size_leaf ); ?>,
			maxSize: <?php echo esc_js( $newyear_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $newyear_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $newyear_speed ); ?>
		});
	<?php } ?>
}); 
// new_year Effect End
<?php } ?>

// Checkbox Show And Hide Settings Start
//balloon
var balloon_new = jQuery('input[name="balloon_new"]:checked').val();
if(jQuery('#balloon_new').is(":checked")) {
	jQuery('.new_year_balloon_sh').show();
}else{
	jQuery('.new_year_balloon_sh').hide();
}

jQuery(document).ready(function() {
jQuery('input[name="balloon_new"]').change(function(){
	var balloon_new = jQuery('input[name="balloon_new"]:checked').val();
	if(jQuery(this).is(":checked")) {
		jQuery('.new_year_balloon_sh').show();
	}else{
		jQuery('.new_year_balloon_sh').hide();
	}
});
});
//sticker
var sticker = jQuery('input[name="sticker"]:checked').val();
if(jQuery('#sticker').is(":checked")) {
	jQuery('.new_year_sticker_sh').show();
} else {
	jQuery('.new_year_sticker_sh').hide();
}

jQuery(document).ready(function() {
	jQuery('input[name="sticker"]').change(function(){
		var sticker = jQuery('input[name="sticker"]:checked').val();
		if(jQuery(this).is(":checked")) {
			jQuery('.new_year_sticker_sh').show();
		} else {
			jQuery('.new_year_sticker_sh').hide();
		}
	});
});
// Checkbox Show And Hide Settings	End
</script>
