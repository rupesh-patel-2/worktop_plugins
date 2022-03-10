<!--summer Falls Settings -->
		<div id="summer_weather_effect" class="tab-content">
			<!-- summer Effect Falls Settings -->
			<div id="summer_effect_sh"><br>
				<p class="bg-title"><?php esc_html_e( 'Summer Effect Settings', 'weather-effect' ); ?></p>
				<!-- icons Start -->
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['drink'] ) ) {
								$drink = $weather_effect_settings['drink'];
							} else {
								$drink = '';
							}
							?>
							<input type="checkbox" id="drink" name="drink" value="drink" 
							<?php
							if ( $drink == 'drink' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '1. Summer Drink', 'weather-effect' ); ?> 
						</label>
					</div>
					<div class="summer_drink_sh">
						<div>
							<label class="lower_label"> <?php esc_html_e( 'Select Summer Falling Drink', 'weather-effect' ); ?></label>
							<?php
							if ( isset( $weather_effect_settings['summer_drink'] ) ) {
								$summer_drink = $weather_effect_settings['summer_drink'];
							} else {
								$summer_drink = 'drink1';
							}
							?>
							<select id="summer_drink" name="summer_drink" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="drink1" 
								<?php
								if ( $summer_drink == 'drink1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Drink 1', 'weather-effect' ); ?></option>
							</select>
						</div>
					</div>
				</div>
				<div>	
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['sun'] ) ) {
								$sun = $weather_effect_settings['sun'];
							} else {
								$sun = '';
							}
							?>
							<input type="checkbox" id="sun" name="sun" value="sun" 
							<?php
							if ( $sun == 'sun' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '2. Summer Sun', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="summer_sun_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select summer Falling Sun', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['summer_sun'] ) ) {
							$summer_sun = $weather_effect_settings['summer_sun'];
						} else {
							$summer_sun = 'sun1';
						}
						?>
						<select id="summer_sun" name="summer_sun" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="sun1" 
							<?php
							if ( $summer_sun == 'sun1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Sun 1', 'weather-effect' ); ?></option>
						</select>
					</div>
				</div>
			</div><br>
				<!-- icons  End-->
				
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '2. Minimum Fall Size On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['summer_min_size_leaf'] ) ) {
						$summer_min_size_leaf = $weather_effect_settings['summer_min_size_leaf'];
					} else {
						$summer_min_size_leaf = 20;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="summer_min_size_leaf" name="summer_min_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $summer_min_size_leaf ); ?>" min="1" step="1" max="30">
						<span class="range-slider__value">0</span>
					</p>
				</div>	
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '3. Maximum Fall Size On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['summer_max_size_leaf'] ) ) {
						$summer_max_size_leaf = $weather_effect_settings['summer_max_size_leaf'];
					} else {
						$summer_max_size_leaf = 50;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="summer_max_size_leaf" name="summer_max_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $summer_max_size_leaf ); ?>" min="10" step="1" max="200">
						<span class="range-slider__value">0</span>
					</p>
				</div>
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '4. Falls On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['summer_flakes_leaf'] ) ) {
						$summer_flakes_leaf = $weather_effect_settings['summer_flakes_leaf'];
					} else {
						$summer_flakes_leaf = 5;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="summer_flakes_leaf" name="summer_flakes_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $summer_flakes_leaf ); ?>" min="1" step="1" max="100">
						<span class="range-slider__value">0</span>
					</p>
				</div>
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '5. Falls Speed On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['summer_speed'] ) ) {
						$summer_speed = $weather_effect_settings['summer_speed'];
					} else {
						$summer_speed = 5;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="summer_speed" name="summer_speed" class="range-slider__range" type="range" value="<?php echo esc_attr( $summer_speed ); ?>" min="1" step="1" max="10">
						<span class="range-slider__value">0</span>
					</p>
				</div>
			</div>
	<!-- Summer Falls Settings End -->
<script>
	<?php if ( $weather_occasion == 'summer_check' ) { ?>
		// Summer Effect Start
			jQuery(document).ready(function(){
				<?php if ( $drink == 'drink' ) { ?>
					snowFall.snow(document.body, {
						image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/summer/'); ?><?php echo esc_js( $summer_drink ); ?>.png",
						minSize: <?php echo esc_js( $summer_min_size_leaf ); ?>, 
						maxSize: <?php echo esc_js( $summer_max_size_leaf ); ?>,
						flakeCount: <?php echo esc_js( $summer_flakes_leaf ); ?>,
						maxSpeed: <?php echo esc_js( $summer_speed ); ?>
					});
				<?php } ?>
				<?php if ( $sun == 'sun' ) { ?>
					snowFall.snow(document.body, {
						image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/summer/'); ?><?php echo esc_js( $summer_sun ); ?>.png",
						minSize: <?php echo esc_js( $summer_min_size_leaf ); ?>, 
						maxSize: <?php echo esc_js( $summer_max_size_leaf ); ?>,
						flakeCount: <?php echo esc_js( $summer_flakes_leaf ); ?>,
						maxSpeed: <?php echo esc_js( $summer_speed ); ?>
					});
				<?php } ?>
			}); 
		// Summer Effect End
	<?php } ?> 
	
	// Checkbox Show And Hide Settings Start
		var drink = jQuery('input[name="drink"]:checked').val();
			if(jQuery('#drink').is(":checked")) {
				jQuery('.summer_drink_sh').show();
			}else{
				jQuery('.summer_drink_sh').hide();
			}
		
		jQuery(document).ready(function() {
			jQuery('input[name="drink"]').change(function(){
				var drink = jQuery('input[name="drink"]:checked').val();
				if(jQuery(this).is(":checked")) {
					jQuery('.summer_drink_sh').show();
				}else{
					jQuery('.summer_drink_sh').hide();
				}
			});
		});
		
		var sun = jQuery('input[name="sun"]:checked').val();
			if(jQuery('#sun').is(":checked")) {
				jQuery('.summer_sun_sh').show();
			}else{
				jQuery('.summer_sun_sh').hide();
			}
		
		jQuery(document).ready(function() {
			jQuery('input[name="sun"]').change(function(){
				var sun = jQuery('input[name="sun"]:checked').val();
				if(jQuery(this).is(":checked")) {
					jQuery('.summer_sun_sh').show();
				}else{
					jQuery('.summer_sun_sh').hide();
				}
			});
		});
		// Checkbox Show And Hide Settings	End
</script>	
