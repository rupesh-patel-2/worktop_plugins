<!--valentine Falls Settings -->
		<div id="valentine_weather_effect" class="tab-content">
			<!-- valentine Effect Falls Settings -->
			<div id="valentine_effect_sh"><br>
				<p class="bg-title"><?php esc_html_e( 'Valentine Effect Settings', 'weather-effect' ); ?></p>
				<!-- icons Start -->
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['rose'] ) ) {
								$rose = $weather_effect_settings['rose'];
							} else {
								$rose = '';
							}
							?>
							<input type="checkbox" id="rose" name="rose" value="rose" 
							<?php
							if ( $rose == 'rose' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '1. Valentine Rose', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="valentine_rose_sh">
						<div>
							<label class="lower_label"> <?php esc_html_e( 'Select Valentine Falling Rose', 'weather-effect' ); ?></label>
							<?php
							if ( isset( $weather_effect_settings['valentine_rose'] ) ) {
								$valentine_rose = $weather_effect_settings['valentine_rose'];
							} else {
								$valentine_rose = 'rose1';
							}
							?>
							<select id="valentine_rose" name="valentine_rose" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="rose1" 
								<?php
								if ( $valentine_rose == 'rose1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Red Rose 1', 'weather-effect' ); ?></option>
								<option value="pinkrose" 
								<?php
								if ( $valentine_rose == 'pinkrose' ) {
									echo 'selected=selected';}
								?>
								>  <?php esc_html_e( 'Pink Rose', 'weather-effect' ); ?> </option>
								<option value="yellowrose1" 
								<?php
								if ( $valentine_rose == 'yellowrose1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Yellow Rose 1', 'weather-effect' ); ?></option>
								<option value="yellowrose2" 
								<?php
								if ( $valentine_rose == 'yellowrose2' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Yellow Rose 2', 'weather-effect' ); ?></option>
							</select>
						</div>
					</div>
				</div>
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['balloon'] ) ) {
								$balloon = $weather_effect_settings['balloon'];
							} else {
								$balloon = '';
							}
							?>
							<input type="checkbox" id="balloon" name="balloon" value="balloon" 
							<?php
							if ( $balloon == 'balloon' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '2. Valentine Balloon', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="valentine_balloon_sh">
						<div>
							<label class="lower_label"> <?php esc_html_e( 'Select Valentine Falling Balloon', 'weather-effect' ); ?></label>
							<?php
							if ( isset( $weather_effect_settings['valentine_balloon'] ) ) {
								$valentine_balloon = $weather_effect_settings['valentine_balloon'];
							} else {
								$valentine_balloon = 'valentine_balloon1';
							}
							?>
							<select id="valentine_balloon" name="valentine_balloon" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="valentine_balloon1" 
								<?php
								if ( $valentine_balloon == 'valentine_balloon1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Balloon 1', 'weather-effect' ); ?></option>
							</select>
						</div>
					</div>
				</div>
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['heart'] ) ) {
								$heart = $weather_effect_settings['heart'];
							} else {
								$heart = '';
							}
							?>
							<input type="checkbox" id="heart" name="heart" value="heart" 
							<?php
							if ( $heart == 'heart' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '3. Valentine Heart', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="valentine_heart_sh">
						<div>
							<label class="lower_label"> <?php esc_html_e( 'Select Valentine Falling Heart', 'weather-effect' ); ?></label>
							<?php
							if ( isset( $weather_effect_settings['valentine_heart'] ) ) {
								$valentine_heart = $weather_effect_settings['valentine_heart'];
							} else {
								$valentine_heart = 'valentine_heart2';
							}
							?>
							<select id="valentine_heart" name="valentine_heart" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="valentine_heart1" 
								<?php
								if ( $valentine_heart == 'valentine_heart1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Heart 1', 'weather-effect' ); ?></option>
								<option value="valentine_heart2" 
								<?php
								if ( $valentine_heart == 'valentine_heart2' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Heart 2', 'weather-effect' ); ?></option>
							</select>
						</div>
					</div>
				</div>
			</div><br>
			<!-- icons  End-->	
				
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '2. Minimum Fall Size On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['valentine_min_size_leaf'] ) ) {
					$valentine_min_size_leaf = $weather_effect_settings['valentine_min_size_leaf'];
				} else {
					$valentine_min_size_leaf = 20;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="valentine_min_size_leaf" name="valentine_min_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $valentine_min_size_leaf ); ?>" min="1" step="1" max="30">
					<span class="range-slider__value">0</span>
				</p>
			</div>	
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '3. Maximum Fall Size On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['valentine_max_size_leaf'] ) ) {
					$valentine_max_size_leaf = $weather_effect_settings['valentine_max_size_leaf'];
				} else {
					$valentine_max_size_leaf = 50;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="valentine_max_size_leaf" name="valentine_max_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $valentine_max_size_leaf ); ?>" min="10" step="1" max="200">
					<span class="range-slider__value">0</span>
				</p>
			</div>
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '4. Falls On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['valentine_flakes_leaf'] ) ) {
					$valentine_flakes_leaf = $weather_effect_settings['valentine_flakes_leaf'];
				} else {
					$valentine_flakes_leaf = 5;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="valentine_flakes_leaf" name="valentine_flakes_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $valentine_flakes_leaf ); ?>" min="1" step="1" max="100">
					<span class="range-slider__value">0</span>
				</p>
			</div>
			<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
				<label class="bg_lower_label"><?php esc_html_e( '5. Falls Speed On page', 'weather-effect' ); ?></label>
				<?php
				if ( isset( $weather_effect_settings['valentine_speed'] ) ) {
					$valentine_speed = $weather_effect_settings['valentine_speed'];
				} else {
					$valentine_speed = 5;
				}
				?>
							
				<p class="range-slider padding_settings">
					<input id="valentine_speed" name="valentine_speed" class="range-slider__range" type="range" value="<?php echo esc_attr( $valentine_speed ); ?>" min="1" step="1" max="10">
					<span class="range-slider__value">0</span>
				</p>
			</div>
		</div>
	<!-- valentine Falls Settings End -->
<script>
<?php if ( $weather_occasion == 'valentine_check' ) { ?>
// valentine Effect Start
jQuery(document).ready(function(){
	<?php if ( $rose == 'rose' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/valentine/'); ?><?php echo esc_js( $valentine_rose ); ?>.png",
			minSize: <?php echo esc_js( $valentine_min_size_leaf ); ?>, 
			maxSize: <?php echo esc_js( $valentine_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $valentine_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $valentine_speed ); ?>
		});
	<?php } ?>
	<?php if ( $balloon == 'balloon' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/valentine/'); ?><?php echo esc_js( $valentine_balloon ); ?>.png",
			minSize: <?php echo esc_js( $valentine_min_size_leaf ); ?>, 
			maxSize: <?php echo esc_js( $valentine_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $valentine_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $valentine_speed ); ?>
		});
	<?php } ?>
	<?php if ( $heart == 'heart' ) { ?>
		snowFall.snow(document.body, {
			image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/valentine/'); ?><?php echo esc_js( $valentine_heart ); ?>.png",
			minSize: <?php echo esc_js( $valentine_min_size_leaf ); ?>, 
			maxSize: <?php echo esc_js( $valentine_max_size_leaf ); ?>,
			flakeCount: <?php echo esc_js( $valentine_flakes_leaf ); ?>,
			maxSpeed: <?php echo esc_js( $valentine_speed ); ?>
		});
	<?php } ?>
}); 
// valentine Effect End
<?php } ?> 
	
// Checkbox Show And Hide Settings Start
//rose
var rose = jQuery('input[name="rose"]:checked').val();
if(jQuery('#rose').is(":checked")) {
	jQuery('.valentine_rose_sh').show();
}else{
	jQuery('.valentine_rose_sh').hide();
}

jQuery(document).ready(function() {
jQuery('input[name="rose"]').change(function(){
	var rose = jQuery('input[name="rose"]:checked').val();
	if(jQuery(this).is(":checked")) {
		jQuery('.valentine_rose_sh').show();
	}else{
		jQuery('.valentine_rose_sh').hide();
	}
});
});
//ballon
var balloon = jQuery('input[name="balloon"]:checked').val();
if(jQuery('#balloon').is(":checked")) {
	jQuery('.valentine_balloon_sh').show();
}else{
	jQuery('.valentine_balloon_sh').hide();
}

jQuery(document).ready(function() {
jQuery('input[name="balloon"]').change(function(){
	var balloon = jQuery('input[name="balloon"]:checked').val();
	if(jQuery(this).is(":checked")) {
		jQuery('.valentine_balloon_sh').show();
	}else{
		jQuery('.valentine_balloon_sh').hide();
	}
});
});
//heart
var heart = jQuery('input[name="heart"]:checked').val();
if(jQuery('#heart').is(":checked")) {
	jQuery('.valentine_heart_sh').show();
}else{
	jQuery('.valentine_heart_sh').hide();
}

jQuery(document).ready(function() {
jQuery('input[name="heart"]').change(function(){
	var heart = jQuery('input[name="heart"]:checked').val();
	if(jQuery(this).is(":checked")) {
		jQuery('.valentine_heart_sh').show();
	}else{
		jQuery('.valentine_heart_sh').hide();
	}
});
});
// Checkbox Show And Hide Settings	End
</script>	
