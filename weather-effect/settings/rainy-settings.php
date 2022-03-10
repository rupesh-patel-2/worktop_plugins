<!--rain Falls Settings -->
		<div id="rain_weather_effect" class="tab-content">
			<!-- rain Effect Falls Settings -->
			<div id="rain_effect_sh"><br>
				<p class="bg-title"><?php esc_html_e( 'Rain Effect Settings', 'weather-effect' ); ?></p>
				<!-- icons Start -->
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['umbrella'] ) ) {
								$umbrella = $weather_effect_settings['umbrella'];
							} else {
								$umbrella = '';
							}
							?>
							<input type="checkbox" id="umbrella" name="umbrella" value="umbrella" 
							<?php
							if ( $umbrella == 'umbrella' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '1. Rainy Umbrella', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="rain_umbrella_sh">
						<div>
							<label class="lower_label"> <?php esc_html_e( 'Select Rain Falling Umbrella', 'weather-effect' ); ?></label>
							<?php
							if ( isset( $weather_effect_settings['rain_umbrella'] ) ) {
								$rain_umbrella = $weather_effect_settings['rain_umbrella'];
							} else {
								$rain_umbrella = 'umbrella1';
							}
							?>
							<select id="rain_umbrella" name="rain_umbrella" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="umbrella1" 
								<?php
								if ( $rain_umbrella == 'umbrella1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Umbrella 1', 'weather-effect' ); ?></option>
							</select>
						</div>
					</div>
				</div>
				<div>	
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['drop'] ) ) {
								$drop = $weather_effect_settings['drop'];
							} else {
								$drop = '';
							}
							?>
							<input type="checkbox" id="drop" name="drop" value="drop" 
							<?php
							if ( $drop == 'drop' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '2. Rainy Drops', 'weather-effect' ); ?> 
						</label>
					</div>
					<div class="rain_drops_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Rain Falling Drops', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['rain_drops'] ) ) {
							$rain_drops = $weather_effect_settings['rain_drops'];
						} else {
							$rain_drops = 'drops1';
						}
						?>
						<select id="rain_drops" name="rain_drops" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="drops1" 
							<?php
							if ( $rain_drops == 'drops1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Drops 1', 'weather-effect' ); ?></option>
						</select>
					</div>
				</div>	
				<div>	
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['cloud'] ) ) {
								$cloud = $weather_effect_settings['cloud'];
							} else {
								$cloud = '';
							}
							?>
							<input type="checkbox" id="cloud" name="cloud" value="cloud" 
							<?php
							if ( $cloud == 'cloud' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '3. Rainy Cloud', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="rain_cloud_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Rain Falling Cloud', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['rain_cloud'] ) ) {
							$rain_cloud = $weather_effect_settings['rain_cloud'];
						} else {
							$rain_cloud = 'cloud1';
						}
						?>
						<select id="rain_cloud" name="rain_cloud" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="cloud1" 
							<?php
							if ( $rain_cloud == 'cloud1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Cloud 1', 'weather-effect' ); ?></option>
						</select>
					</div>
				</div>	
			</div><br>
			<!-- icons  End-->	
				
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '2. Minimum Fall Size On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['rain_min_size_leaf'] ) ) {
					$rain_min_size_leaf = $weather_effect_settings['rain_min_size_leaf'];
				} else {
					$rain_min_size_leaf = 20;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="rain_min_size_leaf" name="rain_min_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $rain_min_size_leaf ); ?>" min="1" step="1" max="30">
					<span class="range-slider__value">0</span>
				</p>
			</div>	
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '3. Maximum Fall Size On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['rain_max_size_leaf'] ) ) {
					$rain_max_size_leaf = $weather_effect_settings['rain_max_size_leaf'];
				} else {
					$rain_max_size_leaf = 50;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="rain_max_size_leaf" name="rain_max_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $rain_max_size_leaf ); ?>" min="10" step="1" max="200">
					<span class="range-slider__value">0</span>
				</p>
			</div>
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '4. Falls On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['rain_flakes_leaf'] ) ) {
					$rain_flakes_leaf = $weather_effect_settings['rain_flakes_leaf'];
				} else {
					$rain_flakes_leaf = 5;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="rain_flakes_leaf" name="rain_flakes_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $rain_flakes_leaf ); ?>" min="1" step="1" max="100">
					<span class="range-slider__value">0</span>
				</p>
			</div>
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '5. Falls Speed On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['rain_speed'] ) ) {
					$rain_speed = $weather_effect_settings['rain_speed'];
				} else {
					$rain_speed = 5;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="rain_speed" name="rain_speed" class="range-slider__range" type="range" value="<?php echo esc_attr( $rain_speed ); ?>" min="1" step="1" max="10">
					<span class="range-slider__value">0</span>
				</p>
			</div>
		</div>
	<!-- rain Falls Settings End -->
<script>
<?php if ( $weather_occasion == 'rainy_check' ) { ?>
// Rain Effect Start
jQuery(document).ready(function(){
	<?php if ( $umbrella == 'umbrella' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/rain/'); ?><?php echo esc_js( $rain_umbrella ); ?>.png",
			minSize: <?php echo esc_js( $rain_min_size_leaf ); ?>, 
			maxSize: <?php echo esc_js( $rain_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $rain_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $rain_speed ); ?>
		});
	<?php } ?>
	<?php if ( $drop == 'drop' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/rain/'); ?><?php echo esc_js( $rain_drops ); ?>.png",
			minSize: <?php echo esc_js( $rain_min_size_leaf ); ?>, 
			maxSize: <?php echo esc_js( $rain_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $rain_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $rain_speed ); ?>
		});
	<?php } ?>
	<?php if ( $cloud == 'cloud' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/rain/'); ?><?php echo esc_js( $rain_cloud ); ?>.png",
			minSize: <?php echo esc_js( $rain_min_size_leaf ); ?>, 
			maxSize: <?php echo esc_js( $rain_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $rain_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $rain_speed ); ?>
		});
	<?php } ?>
}); 
// Rain Effect End
<?php } ?> 

// Checkbox Show And Hide Settings Start
var umbrella = jQuery('input[name="umbrella"]:checked').val();
if(jQuery('#umbrella').is(":checked")) {
	jQuery('.rain_umbrella_sh').show();
} else {
	jQuery('.rain_umbrella_sh').hide();
}
//umbrella
jQuery(document).ready(function() {
	jQuery('input[name="umbrella"]').change(function(){
		var umbrella = jQuery('input[name="umbrella"]:checked').val();
		if(jQuery(this).is(":checked")) {
			jQuery('.rain_umbrella_sh').show();
		}else{
			jQuery('.rain_umbrella_sh').hide();
		}
	});
});
//drop
var drop = jQuery('input[name="drop"]:checked').val();
	if(jQuery('#drop').is(":checked")) {
		jQuery('.rain_drops_sh').show();
	}else{
		jQuery('.rain_drops_sh').hide();
	}

jQuery(document).ready(function() {
	jQuery('input[name="drop"]').change(function(){
		var drop = jQuery('input[name="drop"]:checked').val();
		if(jQuery(this).is(":checked")) {
			jQuery('.rain_drops_sh').show();
		}else{
			jQuery('.rain_drops_sh').hide();
		}
	});
});
//cloud
var cloud = jQuery('input[name="cloud"]:checked').val();
	if(jQuery('#cloud').is(":checked")) {
		jQuery('.rain_cloud_sh').show();
	}else{
		jQuery('.rain_cloud_sh').hide();
	}

jQuery(document).ready(function() {
	jQuery('input[name="cloud"]').change(function(){
		var cloud = jQuery('input[name="cloud"]:checked').val();
		if(jQuery(this).is(":checked")) {
			jQuery('.rain_cloud_sh').show();
		}else{
			jQuery('.rain_cloud_sh').hide();
		}
	});
});
// Checkbox Show And Hide Settings	End
</script>
