<?php
	wp_enqueue_script( 'Christmas-checkbox-hide-show-settings', WE_PLUGIN_PATH . '/../assets/js/christmas-checkbox-hide-show-settings.js', array( 'jquery' ), '', true );
?>
<!-- Christmas Falls Settings -->
		<div id="christmas_weather_effect" class="tab-content">
			<div class="row">&nbsp;&nbsp;&nbsp;
				<p class="bg-title"><?php esc_html_e( 'Christmas Fall Types', 'weather-effect' ); ?> </p>
				<?php
				if ( isset( $weather_effect_settings['christmas_types'] ) ) {
					$christmas_types = $weather_effect_settings['christmas_types'];
				} else {
					$christmas_types = 'snow_effect';
				}
				?>
				<p class="col-xs-6 switch-field em_size_field padding_settings">
					<input class="widefat" id="christmas_types1" name="christmas_types" type="radio" value="snow_effect" 
					<?php
					if ( $christmas_types == 'snow_effect' ) {
						echo 'checked=checked';}
					?>
					>
					<label for="christmas_types1"><?php esc_html_e( 'Christmas Effect', 'weather-effect' ); ?></label>
					<input class="widefat" id="christmas_types2" name="christmas_types" type="radio" value="snowfall_master" 
					<?php
					if ( $christmas_types == 'snowfall_master' ) {
						echo 'checked=checked';}
					?>
					>
					<label for="christmas_types2"><?php esc_html_e( 'Snowfall Effect', 'weather-effect' ); ?></label>
				</p>
			</div>
			<!-- Christmas Effect Falls Settings -->
			<div id="snow_effect_sh"><br>
				<p class="bg-title"><?php esc_html_e( 'Christmas Effect Settings', 'weather-effect' ); ?></p>
				<!-- icons Start -->
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['ball'] ) ) {
								$ball = $weather_effect_settings['ball'];
							} else {
								$ball = '';
							}
							?>
							<input type="checkbox" id="ball" name="ball" value="ball" 
							<?php
							if ( $ball == 'ball' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
								<?php esc_html_e( '1. Christmas balls', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="christmas_balls_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Christmas Falling Ball', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['christmas_ball'] ) ) {
							$christmas_ball = $weather_effect_settings['christmas_ball'];
						} else {
							$christmas_ball = 'ball3';
						}
						?>
							<select id="christmas_ball" name="christmas_ball" class="form-control" style="margin-left: 25px; width: 300px;">
								<option value="ball1" 
								<?php
								if ( $christmas_ball == 'ball1' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Ball 1', 'weather-effect' ); ?></option>
								<option value="ball2" 
								<?php
								if ( $christmas_ball == 'ball2' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Ball 2', 'weather-effect' ); ?></option>
								<option value="ball3" 
								<?php
								if ( $christmas_ball == 'ball3' ) {
									echo 'selected=selected';}
								?>
								> <?php esc_html_e( 'Ball 3', 'weather-effect' ); ?></option>
							</select>
					</div>
				</div>
				
				<div>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<?php
							if ( isset( $weather_effect_settings['bell'] ) ) {
								$bell = $weather_effect_settings['bell'];
							} else {
								$bell = '';
							}
							?>
							<input type="checkbox" id="bell" name="bell" value="bell" 
							<?php
							if ( $bell == 'bell' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
							<?php esc_html_e( '2. Christmas bells', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="christmas_bells_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Christmas Falling Bell', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['christmas_bell'] ) ) {
							$christmas_bell = $weather_effect_settings['christmas_bell'];
						} else {
							$christmas_bell = 'bell3';
						}
						?>
						<select id="christmas_bell" name="christmas_bell" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="bell1" 
							<?php
							if ( $christmas_bell == 'bell1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Bell 1', 'weather-effect' ); ?></option>
							<option value="bell2" 
							<?php
							if ( $christmas_bell == 'bell2' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Bell 2', 'weather-effect' ); ?></option>
							<option value="bell3" 
							<?php
							if ( $christmas_bell == 'bell3' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Bell 3', 'weather-effect' ); ?></option>
						</select>
					</div>
				</div>
				<div>
					<?php
					if ( isset( $weather_effect_settings['candy'] ) ) {
						$candy = $weather_effect_settings['candy'];
					} else {
						$candy = '';
					}
					?>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<input type="checkbox" id="candy" name="candy" value="candy" 
							<?php
							if ( $candy == 'candy' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
							<?php esc_html_e( '3. Christmas Candy', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="christmas_candy_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Christmas Falling Candy', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['christmas_candy'] ) ) {
							$christmas_candy = $weather_effect_settings['christmas_candy'];
						} else {
							$christmas_candy = 'candy3';
						}
						?>
						<select id="christmas_candy" name="christmas_candy" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="candy1" 
							<?php
							if ( $christmas_candy == 'candy1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Candy 1', 'weather-effect' ); ?></option>
							<option value="candy2" 
							<?php
							if ( $christmas_candy == 'candy2' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Candy 2', 'weather-effect' ); ?></option>
							<option value="candy3" 
							<?php
							if ( $christmas_candy == 'candy3' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Candy 3', 'weather-effect' ); ?></option>
							</select>
					</div>
				</div>
				
				<div>
					<?php
					if ( isset( $weather_effect_settings['gift'] ) ) {
						$gift = $weather_effect_settings['gift'];
					} else {
						$gift = '';
					}
					?>
					<div class="checkbox">
						<label style="font-size: 1.2em">
							<input type="checkbox" id="gift" name="gift" value="gift" 
							<?php
							if ( $gift == 'gift' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
							<?php esc_html_e( '4. Christmas Gift', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="christmas_gift_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Christmas Falling Gift', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['christmas_gift'] ) ) {
							$christmas_gift = $weather_effect_settings['christmas_gift'];
						} else {
							$christmas_gift = 'gift3';
						}
						?>
						<select id="christmas_gift" name="christmas_gift" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="gift1" 
							<?php
							if ( $christmas_gift == 'gift1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Gift 1', 'weather-effect' ); ?></option>
							<option value="gift2" 
							<?php
							if ( $christmas_gift == 'gift2' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Gift 2', 'weather-effect' ); ?></option>
							<option value="gift3" 
							<?php
							if ( $christmas_gift == 'gift3' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Gift 3', 'weather-effect' ); ?></option>
						</select>
					</div>
				</div>
				<div>
					<div class="checkbox">
						<?php
						if ( isset( $weather_effect_settings['snowman'] ) ) {
							$snowman = $weather_effect_settings['snowman'];
						} else {
							$snowman = '';
						}
						?>
						<label style="font-size: 1.2em">
							<input type="checkbox" id="snowman" name="snowman" value="snowman" 
							<?php
							if ( $snowman == 'snowman' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
							<?php esc_html_e( '5. Christmas Snowman', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="christmas_snowman_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Christmas Falling Snowman', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['christmas_snowman'] ) ) {
							$christmas_snowman = $weather_effect_settings['christmas_snowman'];
						} else {
							$christmas_snowman = 'snowman3';
						}
						?>
						<select id="christmas_snowman" name="christmas_snowman" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="snowman1" 
							<?php
							if ( $christmas_snowman == 'snowman1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Snowman 1', 'weather-effect' ); ?></option>
							<option value="snowman2" 
							<?php
							if ( $christmas_snowman == 'snowman2' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Snowman 2', 'weather-effect' ); ?></option>
							<option value="snowman3" 
							<?php
							if ( $christmas_snowman == 'snowman3' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Snowman 3', 'weather-effect' ); ?></option>
						</select>
					</div>
				</div>
				<div>
					<div class="checkbox">
						<?php
						if ( isset( $weather_effect_settings['snow_flake'] ) ) {
							$snow_flake = $weather_effect_settings['snow_flake'];
						} else {
							$snow_flake = '';
						}
						?>
						<label style="font-size: 1.2em">
							<input type="checkbox" id="snow_flake" name="snow_flake" value="snow_flake" 
							<?php
							if ( $snow_flake == 'snow_flake' ) {
								echo 'checked';}
							?>
							>
							<span class="cr"><i class="cr-icon fa fa-check"></i></span>
							<?php esc_html_e( '6. Christmas Snow Flake', 'weather-effect' ); ?>
						</label>
					</div>
					<div class="christmas_snow_flake_sh">
						<label class="lower_label"> <?php esc_html_e( 'Select Christmas Falling Snow Flake', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['christmas_snow_flake'] ) ) {
							$christmas_snow_flake = $weather_effect_settings['christmas_snow_flake'];
						} else {
							$christmas_snow_flake = 'flack2';
						}
						?>
						<select id="christmas_snow_flake" name="christmas_snow_flake" class="form-control" style="margin-left: 25px; width: 300px;">
							<option value="flack1" 
							<?php
							if ( $christmas_snow_flake == 'flack1' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Snow Flake 1', 'weather-effect' ); ?></option>
							<option value="flack2" 
							<?php
							if ( $christmas_snow_flake == 'flack2' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Snow Flake 2', 'weather-effect' ); ?></option>
							<option value="flack3" 
							<?php
							if ( $christmas_snow_flake == 'flack3' ) {
								echo 'selected=selected';}
							?>
							> <?php esc_html_e( 'Snow Flake 3', 'weather-effect' ); ?></option>
						</select>
					</div>
				</div>
				<br>
				<!-- icons  End-->
				
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '2. Minimum Fall Size On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['christmas_min_size_leaf'] ) ) {
						$christmas_min_size_leaf = $weather_effect_settings['christmas_min_size_leaf'];
					} else {
						$christmas_min_size_leaf = 20;
					}
					?>
					<p class="range-slider padding_settings">
						<input id="christmas_min_size_leaf" name="christmas_min_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $christmas_min_size_leaf ); ?>" min="1" step="1" max="30">
						<span class="range-slider__value">0</span>
					</p>
				</div>	
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '3. Maximum Fall Size On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['christmas_max_size_leaf'] ) ) {
						$christmas_max_size_leaf = $weather_effect_settings['christmas_max_size_leaf'];
					} else {
						$christmas_max_size_leaf = 50;
					}
					?>
					<p class="range-slider padding_settings">
						<input id="christmas_max_size_leaf" name="christmas_max_size_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $christmas_max_size_leaf ); ?>" min="10" step="1" max="200">
						<span class="range-slider__value">0</span>
					</p>
				</div>
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '4. Falls On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['christmas_flakes_leaf'] ) ) {
						$christmas_flakes_leaf = $weather_effect_settings['christmas_flakes_leaf'];
					} else {
						$christmas_flakes_leaf = 5;
					}
					?>
					<p class="range-slider padding_settings">
						<input id="christmas_flakes_leaf" name="christmas_flakes_leaf" class="range-slider__range" type="range" value="<?php echo esc_attr( $christmas_flakes_leaf ); ?>" min="1" step="1" max="100">
						<span class="range-slider__value">0</span>
					</p>
				</div>
				<div class="row" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_lower_label"><?php esc_html_e( '5. Falls Speed On page', 'weather-effect' ); ?></label>
					<?php
					if ( isset( $weather_effect_settings['christmas_speed'] ) ) {
						$christmas_speed = $weather_effect_settings['christmas_speed'];
					} else {
						$christmas_speed = 5;
					}
					?>
					<p class="range-slider padding_settings">
						<input id="christmas_speed" name="christmas_speed" class="range-slider__range" type="range" value="<?php echo esc_attr( $christmas_speed ); ?>" min="1" step="1" max="10">
						<span class="range-slider__value">0</span>
					</p>
				</div>
			</div><br>
		
			
			<!-- Snowfall-master Settings -->
			<div id="snow_master_sh" class="tab-content">
				<p class="bg-title"><?php esc_html_e( 'Snowfall Effect Settings', 'weather-effect' ); ?></p>
				<!-- A. Round Type Settings Start -->
				<div class="row" style="padding-left: 20px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_label"><?php esc_html_e( 'A. Round Type', 'weather-effect' ); ?></label><br>
					<?php
					if ( isset( $weather_effect_settings['master_round'] ) ) {
						$master_round = $weather_effect_settings['master_round'];
					} else {
						$master_round = 'false';
					}
					?>
					<p class="col-xs-6 switch-field em_size_field padding_settings">
						<input class="widefat" id="master_round1" name="master_round" type="radio" value="true" 
						<?php
						if ( $master_round == 'true' ) {
							echo 'checked=checked';}
						?>
						>
						<label for="master_round1"><?php esc_html_e( 'Yes', 'weather-effect' ); ?></label>
						<input class="widefat" id="master_round2" name="master_round" type="radio" value="false" 
						<?php
						if ( $master_round == 'false' ) {
							echo 'checked=checked';}
						?>
						>
						<label for="master_round2"><?php esc_html_e( 'No', 'weather-effect' ); ?></label>
					</p>
				</div>	
				<div class="round_hide_show" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<div class="row" style="padding-left: 20px;">&nbsp;&nbsp;&nbsp;
						<label class="bg_lower_label"><?php esc_html_e( '1. Fall Type', 'weather-effect' ); ?></label><br>
						<?php
						if ( isset( $weather_effect_settings['round_type'] ) ) {
							$round_type = $weather_effect_settings['round_type'];
						} else {
							$round_type = 'true';
						}
						?>
						<p class="col-xs-6 switch-field em_size_field padding_settings">
							<input class="widefat" id="round_type1" name="round_type" type="radio" value="true" 
							<?php
							if ( $round_type == 'true' ) {
								echo 'checked=checked';}
							?>
							>
							<label for="round_type1"><?php esc_html_e( 'Round', 'weather-effect' ); ?></label>
							<input class="widefat" id="round_type2" name="round_type" type="radio" value="false" 
							<?php
							if ( $round_type == 'false' ) {
								echo 'checked=checked';}
							?>
							>
							<label for="round_type2"><?php esc_html_e( 'Square', 'weather-effect' ); ?></label>
						</p>
					</div><br>
					<div class="row" style="padding-left: 20px;">&nbsp;&nbsp;&nbsp;
						<label class="bg_lower_label"><?php esc_html_e( '2. Minimum Fall Size On page', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['min_size_round'] ) ) {
							$min_size_round = $weather_effect_settings['min_size_round'];
						} else {
							$min_size_round = 4;
						}
						?>
						<p class="range-slider padding_settings">
							<input id="min_size_round" name="min_size_round" class="range-slider__range" type="range" value="<?php echo esc_attr( $min_size_round ); ?>" min="1" step="1" max="10">
							<span class="range-slider__value">0</span>
						</p>
					</div>	
					<div class="row" style="padding-left: 20px;">&nbsp;&nbsp;&nbsp;
						<label class="bg_lower_label"><?php esc_html_e( '3. Maximum Fall Size On page', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['max_size_round'] ) ) {
							$max_size_round = $weather_effect_settings['max_size_round'];
						} else {
							$max_size_round = 20;
						}
						?>
						<p class="range-slider padding_settings">
							<input id="max_size_round" name="max_size_round" class="range-slider__range" type="range" value="<?php echo esc_attr( $max_size_round ); ?>" min="10" step="1" max="100">
							<span class="range-slider__value">0</span>
						</p>
					</div>
				</div><br>
				<!-- A. Round Type Settings End -->
				
				<!-- B. Shadows Type Settings Start -->
				<div class="row" style="padding-left: 20px;">&nbsp;&nbsp;&nbsp;
					<label class="bg_label"><?php esc_html_e( 'B. Shadows Type', 'weather-effect' ); ?></label><br>
					<?php
					if ( isset( $weather_effect_settings['master_shadows'] ) ) {
						$master_shadows = $weather_effect_settings['master_shadows'];
					} else {
						$master_shadows = 'false';
					}
					?>
					<p class="col-xs-6 switch-field em_size_field padding_settings">
						<input class="widefat" id="master_shadows1" name="master_shadows" type="radio" value="true" 
						<?php
						if ( $master_shadows == 'true' ) {
							echo 'checked=checked';}
						?>
						>
						<label for="master_shadows1"><?php esc_html_e( 'Yes', 'weather-effect' ); ?></label>
						<input class="widefat" id="master_shadows2" name="master_shadows" type="radio" value="false" 
						<?php
						if ( $master_shadows == 'false' ) {
							echo 'checked=checked';}
						?>
						>
						<label for="master_shadows2"><?php esc_html_e( 'No', 'weather-effect' ); ?></label>
					</p>
				</div>
				<div class="shadow_hide_show" style="padding-left: 10px;">&nbsp;&nbsp;&nbsp;
					<div class="row" style="padding-left: 20px;">&nbsp;&nbsp;&nbsp;
						<label class="bg_lower_label"><?php esc_html_e( '1. Show Falls Shadow', 'weather-effect' ); ?></label><br>
						<?php
						if ( isset( $weather_effect_settings['shadow_type'] ) ) {
							$shadow_type = $weather_effect_settings['shadow_type'];
						} else {
							$shadow_type = 'true';
						}
						?>
						<p class="col-xs-6 switch-field em_size_field padding_settings">
							<input class="widefat" id="shadow_type1" name="shadow_type" type="radio" value="true" 
							<?php
							if ( $shadow_type == 'true' ) {
								echo 'checked=checked';}
							?>
							>
							<label for="shadow_type1"><?php esc_html_e( 'Show', 'weather-effect' ); ?></label>
							<input class="widefat" id="shadow_type2" name="shadow_type" type="radio" value="false" 
							<?php
							if ( $shadow_type == 'false' ) {
								echo 'checked=checked';}
							?>
							>
							<label for="shadow_type2"><?php esc_html_e( 'Hide', 'weather-effect' ); ?></label>
						</p>
					</div><br>
					<div class="row" style="padding-left: 20px;">&nbsp;&nbsp;&nbsp;
						<label class="bg_lower_label"><?php esc_html_e( '2. Flakes On Page', 'weather-effect' ); ?></label>
						<?php
						if ( isset( $weather_effect_settings['flakes_shadow'] ) ) {
							$flakes_shadow = $weather_effect_settings['flakes_shadow'];
						} else {
							$flakes_shadow = 50;
						}
						?>
						<p class="range-slider padding_settings">
							<input id="flakes_shadow" name="flakes_shadow" class="range-slider__range" type="range" value="<?php echo esc_attr( $flakes_shadow ); ?>" min="10" step="1" max="300">
							<span class="range-slider__value">0</span>
						</p>
					</div>
				</div><br>
				<!-- B. Shadows Type Settings End -->
			</div>
			<!-- 3. Snowfall-master Settings End -->
		</div>
	<!-- 3. Christmas Falls Settings End -->
<script>
	<?php if ( $weather_occasion == 'christmas_check' ) { ?>
		// 1. Snow Effect Start
		// ball
		<?php if ( $christmas_types == 'snow_effect' ) { ?>
			jQuery(document).ready(function(){
				<?php if ( $ball == 'ball' ) { ?>
					snowFall.snow(document.body, {
						image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/christmas/'); ?><?php echo esc_js( $christmas_ball ); ?>.png",
						minSize: <?php echo esc_js( $christmas_min_size_leaf ); ?>,
						maxSize: <?php echo esc_js( $christmas_max_size_leaf ); ?>,
						flakeCount: <?php echo esc_js( $christmas_flakes_leaf ); ?>,
						maxSpeed: <?php echo esc_js( $christmas_speed ); ?>
					});
				<?php } ?>
				<?php if ( $bell == 'bell' ) { ?>
				snowFall.snow(document.body, {
					image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/christmas/'); ?><?php echo esc_js( $christmas_bell ); ?>.png",
					minSize: <?php echo esc_js( $christmas_min_size_leaf ); ?>,
					maxSize: <?php echo esc_js( $christmas_max_size_leaf ); ?>,
					flakeCount: <?php echo esc_js( $christmas_flakes_leaf ); ?>,
					maxSpeed: <?php echo esc_js( $christmas_speed ); ?>
				});
				<?php } ?>
				<?php if ( $candy == 'candy' ) { ?>
				snowFall.snow(document.body, {
					image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/christmas/'); ?><?php echo esc_js( $christmas_candy ); ?>.png",
					minSize: <?php echo esc_js( $christmas_min_size_leaf ); ?>,
					maxSize: <?php echo esc_js( $christmas_max_size_leaf ); ?>,
					flakeCount: <?php echo esc_js( $christmas_flakes_leaf ); ?>,
					maxSpeed: <?php echo esc_js( $christmas_speed ); ?>
				});
				<?php } ?>
				<?php if ( $gift == 'gift' ) { ?>
					snowFall.snow(document.body, {
					image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/christmas/'); ?><?php echo esc_js( $christmas_gift ); ?>.png",
					minSize: <?php echo esc_js( $christmas_min_size_leaf ); ?>,
					maxSize: <?php echo esc_js( $christmas_max_size_leaf ); ?>,
					flakeCount: <?php echo esc_js( $christmas_flakes_leaf ); ?>,
					maxSpeed: <?php echo esc_js( $christmas_speed ); ?>
				});
				<?php } ?>
				<?php if ( $snowman == 'snowman' ) { ?>
					snowFall.snow(document.body, {
						image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/christmas/'); ?><?php echo esc_js( $christmas_snowman ); ?>.png",
						minSize: <?php echo esc_js( $christmas_min_size_leaf ); ?>,
						maxSize: <?php echo esc_js( $christmas_max_size_leaf ); ?>,
						flakeCount: <?php echo esc_js( $christmas_flakes_leaf ); ?>,
						maxSpeed: <?php echo esc_js( $christmas_speed ); ?>
					});
				<?php } ?>
				<?php if ( $snow_flake == 'snow_flake' ) { ?>
					snowFall.snow(document.body, {
						image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'../assets/images/christmas/'); ?><?php echo esc_js( $christmas_snow_flake ); ?>.png",
						minSize: <?php echo esc_js( $christmas_min_size_leaf ); ?>,
						maxSize: <?php echo esc_js( $christmas_max_size_leaf ); ?>,
						flakeCount: <?php echo esc_js( $christmas_flakes_leaf ); ?>,
						maxSpeed: <?php echo esc_js( $christmas_speed ); ?>
					});
				<?php } ?>
			});
		<?php } ?>
		// 1. Snow Effect End

		//2. Snowfall-master
		<?php if ( $christmas_types == 'snowfall_master' ) { ?>
			// A. round type Start
			<?php if ( $master_round == 'true' ) { ?>
				jQuery(document).ready(function(){
					jQuery(document).snowfall({
						round : <?php echo esc_js( $round_type ); ?>,
						minSize: <?php echo esc_js( $min_size_round ); ?>,
						maxSize: <?php echo esc_js( $max_size_round ); ?>
					}); // add rounded
				});
			<?php } ?>
			//round type End
			// B. shadow type start
				<?php if ( $master_shadows == 'true' ) { ?>
					jQuery(document).ready(function(){
						snowFall.snow(document.body, {
							shadow : <?php echo esc_js( $shadow_type ); ?>,
							flakeCount:<?php echo esc_js( $flakes_shadow ); ?>
						});
					});
				<?php } ?> 
			// shadow type end
		<?php } ?> 
		//2. Snowfall-master End
	<?php } ?> 
	
//Christmas snow effect hide and show
	var christmas_types = jQuery('input[name="christmas_types"]:checked').val();
	if(christmas_types == "snow_effect") {
		jQuery('#snow_effect_sh').show();
		jQuery('#snow_master_sh').hide();
	}
	if(christmas_types == "snowfall_master") {
		jQuery('#snow_effect_sh').hide();
		jQuery('#snow_master_sh').show();
	}
	
	//on change effect
	jQuery(document).ready(function() {
		// snow effect hide and show 
		jQuery('input[name="christmas_types"]').change(function(){
			var christmas_types = jQuery('input[name="christmas_types"]:checked').val();
			if(christmas_types == "snow_effect") {
				jQuery('#snow_effect_sh').show();
				jQuery('#snow_master_sh').hide();
			}
			if(christmas_types == "snowfall_master") {
				jQuery('#snow_effect_sh').hide();
				jQuery('#snow_master_sh').show();
			}
		})
	});


//Snowfall master snow hide and show  
	// A. round type
	var round_type_setting = jQuery('input[name="master_round"]:checked').val();
	if(round_type_setting == "true") {
		jQuery('.round_hide_show').show();
	}
	if(round_type_setting == "false") {
		jQuery('.round_hide_show').hide();
	}
	//on change effect
	jQuery(document).ready(function() {
		// snow effect hide and show 
		jQuery('input[name="master_round"]').change(function(){
			var round_type_setting = jQuery('input[name="master_round"]:checked').val();
			if(round_type_setting == "true") {
				jQuery('.round_hide_show').show();
			}
			if(round_type_setting == "false") {
				jQuery('.round_hide_show').hide();
			}
		})	
	});	
	// A. round type End
	// B. Shadow type Start
	var shadow_type_setting = jQuery('input[name="master_shadows"]:checked').val();
	if(shadow_type_setting == "true") {
		jQuery('.shadow_hide_show').show();
	}
	if(shadow_type_setting == "false") {
		jQuery('.shadow_hide_show').hide();
	}
	//on change effect
	jQuery(document).ready(function() {
		// snow effect hide and show 
		jQuery('input[name="master_shadows"]').change(function(){
			var shadow_type_setting = jQuery('input[name="master_shadows"]:checked').val();
			if(shadow_type_setting == "true") {
				jQuery('.shadow_hide_show').show();
			}
			if(shadow_type_setting == "false") {
				jQuery('.shadow_hide_show').hide();
			}
		})	
	});	
	// B. Shadow type End
	// C. Shadow type Start
	var round_shadow_hide_show_setting = jQuery('input[name="master_round_shadows"]:checked').val();
	if(round_shadow_hide_show_setting == "true") {
		jQuery('.round_shadow_hide_show').show();
	}
	if(round_shadow_hide_show_setting == "false") {
		jQuery('.round_shadow_hide_show').hide();
	}
	//on change effect
	jQuery(document).ready(function() {
		// snow effect hide and show 
		jQuery('input[name="master_round_shadows"]').change(function(){
			var round_shadow_hide_show_setting = jQuery('input[name="master_round_shadows"]:checked').val();
			if(round_shadow_hide_show_setting == "true") {
				jQuery('.round_shadow_hide_show').show();
			}
			if(round_shadow_hide_show_setting == "false") {
				jQuery('.round_shadow_hide_show').hide();
			}
		})	
	});	
	// C. Shadow type End
</script>
