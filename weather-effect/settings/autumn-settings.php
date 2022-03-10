<!--Autumn Falls Settings -->
		<div id="autumn_weather_effect" class="tab-content">
			<div class="row">&nbsp;&nbsp;&nbsp;
				<p class="bg-title"><?php esc_html_e( 'Autumn Fall', 'weather-effect' ); ?> </p>
			</div>
			<!-- Autumn Effect Falls Settings -->
			<div id="autumn_effect_sh"><br>
				<p class="bg-title"><?php esc_html_e( 'Autumn Effect Settings', 'weather-effect' ); ?></p>
				<!-- icons Start -->
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['leaf'] ) ) {
								$leaf = $weather_effect_settings['leaf'];
							} else {
								$leaf = '';
							}
							?>
							<input type="checkbox" id="leaf" name="leaf" value="leaf" 
							<?php
							if ( $leaf == 'leaf' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '1. Autumn Leafs', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="autumn_leaf_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Autumn Falling Leaf', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['autumn_leaf'] ) ) {
							$autumn_leaf = $weather_effect_settings['autumn_leaf'];
						} else {
							$autumn_leaf = 'autumn-leaf2';
						}
						?>
						<select id="autumn_leaf" name="autumn_leaf" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="autumn-leaf1" 
							<?php
							if ( $autumn_leaf == 'autumn-leaf1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Leaf 1', 'weather-effect' ); ?></option>
							<option value="autumn-leaf2" 
							<?php
							if ( $autumn_leaf == 'autumn-leaf2' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Leaf 2', 'weather-effect' ); ?></option>
							<option value="autumn-leaf3" 
							<?php
							if ( $autumn_leaf == 'autumn-leaf3' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Leaf 3', 'weather-effect' ); ?></option>
						</select>
						<p class="lower_label"><a href="https://awplife.com/account/signup/weather-effect-premium" target="_blank">For More Autumn Leaf's Falls Buy Now</a></p>
					</div>
				</div><br>
				<!-- icons  End-->
				
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '2. Minimum Fall Size On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['autumn_min_size_leaf'] ) ) {
						$autumn_min_size_leaf = $weather_effect_settings['autumn_min_size_leaf'];
					} else {
						$autumn_min_size_leaf = 20;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="autumn_min_size_leaf" name="autumn_min_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $autumn_min_size_leaf ); ?>" min="1" step="1" max="30">
						<span class="range-slider__value">0</span>
					</p>
				</div>	
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '3. Maximum Fall Size On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['autumn_max_size_leaf'] ) ) {
						$autumn_max_size_leaf = $weather_effect_settings['autumn_max_size_leaf'];
					} else {
						$autumn_max_size_leaf = 50;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="autumn_max_size_leaf" name="autumn_max_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $autumn_max_size_leaf ); ?>" min="10" step="1" max="200">
						<span class="range-slider__value">0</span>
					</p>
				</div>
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '4. Falls On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['autumn_flakes_leaf'] ) ) {
						$autumn_flakes_leaf = $weather_effect_settings['autumn_flakes_leaf'];
					} else {
						$autumn_flakes_leaf = 5;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="autumn_flakes_leaf" name="autumn_flakes_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $autumn_flakes_leaf ); ?>" min="1" step="1" max="100">
						<span class="range-slider__value">0</span>
					</p>
				</div>
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '5. Falls Speed On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['autumn_speed'] ) ) {
						$autumn_speed = $weather_effect_settings['autumn_speed'];
					} else {
						$autumn_speed = 5;
					}
					?>
								
					<p class="range-slider padding_settings">
						<input id="autumn_speed" name="autumn_speed" class="range-slider__range" type="range" value="<?php echo esc_attr( $autumn_speed ); ?>" min="1" step="1" max="10">
						<span class="range-slider__value">0</span>
					</p>
				</div>
			</div>
		</div>	
	<!-- Autumn Falls Settings End -->
<script>
	<?php if ( $weather_occasion == 'autumn_check' ) { ?>
	// Autumn Effect Start
		jQuery(document).ready(function(){
			<?php if ( $leaf == 'leaf' ) { ?>
				snowFall.snow(document.body, {
					image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/autumn/'); ?><?php echo esc_js( $autumn_leaf ); ?>.png",
					minSize: <?php echo esc_js( $autumn_min_size_leaf ); ?>, 
					maxSize: <?php echo esc_js( $autumn_max_size_leaf ); ?>,
					flakeCount: <?php echo esc_js( $autumn_flakes_leaf ); ?>,
					maxSpeed: <?php echo esc_js( $autumn_speed ); ?>
				});
			<?php } ?>
		}); 
	// Autumn Effect End
	<?php } ?> 
	// Checkbox Show And Hide Settings Start
	var leaf = jQuery('input[name="leaf"]:checked').val();
	if(jQuery('#leaf').is(":checked")) {
		jQuery('.autumn_leaf_sh').show();
	}else{
		jQuery('.autumn_leaf_sh').hide();
	}

	jQuery(document).ready(function() {
		jQuery('input[name="leaf"]').change(function(){
			var leaf = jQuery('input[name="leaf"]:checked').val();
			if(jQuery(this).is(":checked")) {
				jQuery('.autumn_leaf_sh').show();
			}else{
				jQuery('.autumn_leaf_sh').hide();
			}
		});
	});
	// Checkbox Show And Hide Settings End
</script>
