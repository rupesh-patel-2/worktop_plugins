<?php
	$weather_effect_settings = get_option( 'weather_effect_settings' );

if ( isset( $weather_effect_settings['weather_occasion'] ) ) {
	$weather_occasion = $weather_effect_settings['weather_occasion'];
} else {
	$weather_occasion = '';
}


	// Falls extra settings for every falls Start

	// spring falls
if ( isset( $weather_effect_settings['spring_min_size_leaf'] ) ) {
	$spring_min_size_leaf = $weather_effect_settings['spring_min_size_leaf'];
} else {
	$spring_min_size_leaf = '';
}
if ( isset( $weather_effect_settings['spring_max_size_leaf'] ) ) {
	$spring_max_size_leaf = $weather_effect_settings['spring_max_size_leaf'];
} else {
	$spring_max_size_leaf = '';
}
if ( isset( $weather_effect_settings['spring_flakes_leaf'] ) ) {
	$spring_flakes_leaf = $weather_effect_settings['spring_flakes_leaf'];
} else {
	$spring_flakes_leaf = '';
}
if ( isset( $weather_effect_settings['spring_speed'] ) ) {
	$spring_speed = $weather_effect_settings['spring_speed'];
} else {
	$spring_speed = '';
}
	// summer falls
if ( isset( $weather_effect_settings['summer_min_size_leaf'] ) ) {
	$summer_min_size_leaf = $weather_effect_settings['summer_min_size_leaf'];
} else {
	$summer_min_size_leaf = '';
}
if ( isset( $weather_effect_settings['summer_max_size_leaf'] ) ) {
	$summer_max_size_leaf = $weather_effect_settings['summer_max_size_leaf'];
} else {
	$summer_max_size_leaf = '';
}
if ( isset( $weather_effect_settings['summer_flakes_leaf'] ) ) {
	$summer_flakes_leaf = $weather_effect_settings['summer_flakes_leaf'];
} else {
	$summer_flakes_leaf = '';
}
if ( isset( $weather_effect_settings['summer_speed'] ) ) {
	$summer_speed = $weather_effect_settings['summer_speed'];
} else {
	$summer_speed = '';
}

	// Halloween falls
if ( isset( $weather_effect_settings['halloween_min_size_leaf'] ) ) {
	$halloween_min_size_leaf = $weather_effect_settings['halloween_min_size_leaf'];
} else {
	$halloween_min_size_leaf = '';
}
if ( isset( $weather_effect_settings['halloween_max_size_leaf'] ) ) {
	$halloween_max_size_leaf = $weather_effect_settings['halloween_max_size_leaf'];
} else {
	$halloween_max_size_leaf = '';
}
if ( isset( $weather_effect_settings['halloween_flakes_leaf'] ) ) {
	$halloween_flakes_leaf = $weather_effect_settings['halloween_flakes_leaf'];
} else {
	$halloween_flakes_leaf = '';
}
if ( isset( $weather_effect_settings['halloween_speed'] ) ) {
	$halloween_speed = $weather_effect_settings['halloween_speed'];
} else {
	$halloween_speed = '';
}

	// rain falls
if ( isset( $weather_effect_settings['rain_min_size_leaf'] ) ) {
	$rain_min_size_leaf = $weather_effect_settings['rain_min_size_leaf'];
} else {
	$rain_min_size_leaf = '';
}
if ( isset( $weather_effect_settings['rain_max_size_leaf'] ) ) {
	$rain_max_size_leaf = $weather_effect_settings['rain_max_size_leaf'];
} else {
	$rain_max_size_leaf = '';
}
if ( isset( $weather_effect_settings['rain_flakes_leaf'] ) ) {
	$rain_flakes_leaf = $weather_effect_settings['rain_flakes_leaf'];
} else {
	$rain_flakes_leaf = '';
}
if ( isset( $weather_effect_settings['rain_speed'] ) ) {
	$rain_speed = $weather_effect_settings['rain_speed'];
} else {
	$rain_speed = '';
}

	// thanksgiving falls
if ( isset( $weather_effect_settings['thanksgiving_min_size_leaf'] ) ) {
	$thanksgiving_min_size_leaf = $weather_effect_settings['thanksgiving_min_size_leaf'];
} else {
	$thanksgiving_min_size_leaf = '';
}
if ( isset( $weather_effect_settings['thanksgiving_max_size_leaf'] ) ) {
	$thanksgiving_max_size_leaf = $weather_effect_settings['thanksgiving_max_size_leaf'];
} else {
	$thanksgiving_max_size_leaf = '';
}
if ( isset( $weather_effect_settings['thanksgiving_flakes_leaf'] ) ) {
	$thanksgiving_flakes_leaf = $weather_effect_settings['thanksgiving_flakes_leaf'];
} else {
	$thanksgiving_flakes_leaf = '';
}
if ( isset( $weather_effect_settings['thanksgiving_speed'] ) ) {
	$thanksgiving_speed = $weather_effect_settings['thanksgiving_speed'];
} else {
	$thanksgiving_speed = '';
}

	// valentine falls
if ( isset( $weather_effect_settings['valentine_min_size_leaf'] ) ) {
	$valentine_min_size_leaf = $weather_effect_settings['valentine_min_size_leaf'];
} else {
	$valentine_min_size_leaf = '';
}
if ( isset( $weather_effect_settings['valentine_max_size_leaf'] ) ) {
	$valentine_max_size_leaf = $weather_effect_settings['valentine_max_size_leaf'];
} else {
	$valentine_max_size_leaf = '';
}
if ( isset( $weather_effect_settings['valentine_flakes_leaf'] ) ) {
	$valentine_flakes_leaf = $weather_effect_settings['valentine_flakes_leaf'];
} else {
	$valentine_flakes_leaf = '';
}
if ( isset( $weather_effect_settings['valentine_speed'] ) ) {
	$valentine_speed = $weather_effect_settings['valentine_speed'];
} else {
	$valentine_speed = '';
}

	// new year falls
if ( isset( $weather_effect_settings['newyear_min_size_leaf'] ) ) {
	$newyear_min_size_leaf = $weather_effect_settings['newyear_min_size_leaf'];
} else {
	$newyear_min_size_leaf = '';
}
if ( isset( $weather_effect_settings['newyear_max_size_leaf'] ) ) {
	$newyear_max_size_leaf = $weather_effect_settings['newyear_max_size_leaf'];
} else {
	$newyear_max_size_leaf = '';
}
if ( isset( $weather_effect_settings['newyear_flakes_leaf'] ) ) {
	$newyear_flakes_leaf = $weather_effect_settings['newyear_flakes_leaf'];
} else {
	$newyear_flakes_leaf = '';
}
if ( isset( $weather_effect_settings['newyear_speed'] ) ) {
	$newyear_speed = $weather_effect_settings['newyear_speed'];
} else {
	$newyear_speed = '';
}

	// Falls extra settings for every falls End
	// christmas_check Start
if ( $weather_occasion == 'christmas_check' ) {
	if ( isset( $weather_effect_settings['christmas_types'] ) ) {
		$christmas_types = $weather_effect_settings['christmas_types'];
	} else {
		$christmas_types = '';
	}

		// 1. snow effect start
	if ( $christmas_types == 'snow_effect' ) {
		// Christmas falls
		if ( isset( $weather_effect_settings['ball'] ) ) {
			$ball = $weather_effect_settings['ball'];
		} else {
			$ball = '';
		}
		if ( isset( $weather_effect_settings['bell'] ) ) {
			$bell = $weather_effect_settings['bell'];
		} else {
			$bell = '';
		}
		if ( isset( $weather_effect_settings['candy'] ) ) {
			$candy = $weather_effect_settings['candy'];
		} else {
			$candy = '';
		}
		if ( isset( $weather_effect_settings['gift'] ) ) {
			$gift = $weather_effect_settings['gift'];
		} else {
			$gift = '';
		}
		if ( isset( $weather_effect_settings['snowman'] ) ) {
			$snowman = $weather_effect_settings['snowman'];
		} else {
			$snowman = '';
		}
		if ( isset( $weather_effect_settings['snow_flake'] ) ) {
			$snow_flake = $weather_effect_settings['snow_flake'];
		} else {
			$snow_flake = '';
		}

		if ( isset( $weather_effect_settings['christmas_min_size_leaf'] ) ) {
			$christmas_min_size_leaf = $weather_effect_settings['christmas_min_size_leaf'];
		} else {
			$christmas_min_size_leaf = '';
		}
		if ( isset( $weather_effect_settings['christmas_max_size_leaf'] ) ) {
			$christmas_max_size_leaf = $weather_effect_settings['christmas_max_size_leaf'];
		} else {
			$christmas_max_size_leaf = '';
		}
		if ( isset( $weather_effect_settings['christmas_flakes_leaf'] ) ) {
			$christmas_flakes_leaf = $weather_effect_settings['christmas_flakes_leaf'];
		} else {
			$christmas_flakes_leaf = '';
		}
		if ( isset( $weather_effect_settings['christmas_speed'] ) ) {
			$christmas_speed = $weather_effect_settings['christmas_speed'];
		} else {
			$christmas_speed = '';
		}

			// sub variable
		if ( isset( $weather_effect_settings['christmas_ball'] ) ) {
			$christmas_ball = $weather_effect_settings['christmas_ball'];
		} else {
			$christmas_ball = '';
		}
		if ( isset( $weather_effect_settings['christmas_bell'] ) ) {
			$christmas_bell = $weather_effect_settings['christmas_bell'];
		} else {
			$christmas_bell = '';
		}
		if ( isset( $weather_effect_settings['christmas_candy'] ) ) {
			$christmas_candy = $weather_effect_settings['christmas_candy'];
		} else {
			$christmas_candy = '';
		}
		if ( isset( $weather_effect_settings['christmas_gift'] ) ) {
			$christmas_gift = $weather_effect_settings['christmas_gift'];
		} else {
			$christmas_gift = '';
		}
		if ( isset( $weather_effect_settings['christmas_snowman'] ) ) {
			$christmas_snowman = $weather_effect_settings['christmas_snowman'];
		} else {
			$christmas_snowman = '';
		}
		if ( isset( $weather_effect_settings['christmas_snow_flake'] ) ) {
			$christmas_snow_flake = $weather_effect_settings['christmas_snow_flake'];
		} else {
			$christmas_snow_flake = '';
		}

		?>
				<script>
					jQuery(document).ready(function(){
				<?php if ( $ball == 'ball' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/christmas/'); ?><?php echo esc_js( $christmas_ball ); ?>.png",
								minSize: <?php echo esc_js( (int) $christmas_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $christmas_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $christmas_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $christmas_speed ); ?>, 
							});
						<?php } ?>
				<?php if ( $bell == 'bell' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/christmas/'); ?><?php echo esc_js( $christmas_bell ); ?>.png",
								minSize: <?php echo esc_js( (int) $christmas_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $christmas_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $christmas_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $christmas_speed ); ?>, 
							});
						<?php } ?>
				<?php if ( $candy == 'candy' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/christmas/'); ?><?php echo esc_js( $christmas_candy ); ?>.png",
								minSize: <?php echo esc_js( (int) $christmas_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $christmas_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $christmas_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $christmas_speed ); ?>, 
							});
						<?php } ?>
				<?php if ( $gift == 'gift' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/christmas/'); ?><?php echo esc_js( $christmas_gift ); ?>.png",
								minSize: <?php echo esc_js( (int) $christmas_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $christmas_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $christmas_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $christmas_speed ); ?>, 
							});
						<?php } ?>
				<?php if ( $snowman == 'snowman' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/christmas/'); ?><?php echo esc_js( $christmas_snowman ); ?>.png",
								minSize: <?php echo esc_js( (int) $christmas_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $christmas_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $christmas_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $christmas_speed ); ?>, 
							});
						<?php } ?>	
				<?php if ( $snow_flake == 'snow_flake' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/christmas/'); ?><?php echo esc_js( $christmas_snow_flake ); ?>.png",
								minSize: <?php echo esc_js( (int) $christmas_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $christmas_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $christmas_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $christmas_speed ); ?>, 
							});
						<?php } ?>	
					});
				</script>
		<?php
	}   //1. snow effect start End
		// 2. snowfall_master effect start
	if ( $christmas_types == 'snowfall_master' ) {
		   // A. round type Start
		if ( isset( $weather_effect_settings['master_round'] ) ) {
			$master_round = $weather_effect_settings['master_round'];
		} else {
			$master_round = '';
		}
		if ( isset( $weather_effect_settings['round_type'] ) ) {
			$round_type = $weather_effect_settings['round_type'];
		} else {
			$round_type = '';
		}
		if ( isset( $weather_effect_settings['min_size_round'] ) ) {
			$min_size_round = $weather_effect_settings['min_size_round'];
		} else {
			$min_size_round = '';
		}
		if ( isset( $weather_effect_settings['max_size_round'] ) ) {
			$max_size_round = $weather_effect_settings['max_size_round'];
		} else {
			$max_size_round = '';
		}
		if ( isset( $weather_effect_settings['master_shadows'] ) ) {
			$master_shadows = $weather_effect_settings['master_shadows'];
		} else {
			$master_shadows = '';
		}
		if ( isset( $weather_effect_settings['shadow_type'] ) ) {
			$shadow_type = $weather_effect_settings['shadow_type'];
		} else {
			$shadow_type = '';
		}
		if ( isset( $weather_effect_settings['flakes_shadow'] ) ) {
			$flakes_shadow = $weather_effect_settings['flakes_shadow'];
		} else {
			$flakes_shadow = '';
		}
		?>
			<script>
				// A. round type Start
				<?php if ( $master_round == 'true' ) { ?>
					jQuery(document).ready(function(){
						jQuery(document).snowfall({
							round : <?php echo esc_js( $round_type ); ?>, 
							minSize: <?php echo esc_js( (int) $min_size_round ); ?>, 
							maxSize:<?php echo esc_js( (int) $max_size_round ); ?>, 
						}); // add rounded
					});
				<?php } ?> 
				//round type End
			// B. shadow type start
			   <?php if ( $master_shadows == 'true' ) { ?>
					jQuery(document).ready(function(){
						snowFall.snow(document.body, {
							shadow : <?php echo esc_js( $shadow_type ); ?>, 
							flakeCount:<?php echo esc_js( $flakes_shadow ); ?>, 
						});
					});
				<?php } ?> 
			// shadow type end
			</script>
		   <?php
	} // 2. snowfall_master effect End
}// christmas_check End
?>
	<script>
		//Autumn_check Weather effect Start
		<?php
		if ( $weather_occasion == 'autumn_check' ) {
			// autumn falls
			if ( isset( $weather_effect_settings['leaf'] ) ) {
				$leaf = $weather_effect_settings['leaf'];
			} else {
				$leaf = '';
			}
			if ( isset( $weather_effect_settings['autumn_min_size_leaf'] ) ) {
				$autumn_min_size_leaf = $weather_effect_settings['autumn_min_size_leaf'];
			} else {
				$autumn_min_size_leaf = '';
			}
			if ( isset( $weather_effect_settings['autumn_max_size_leaf'] ) ) {
				$autumn_max_size_leaf = $weather_effect_settings['autumn_max_size_leaf'];
			} else {
				$autumn_max_size_leaf = '';
			}
			if ( isset( $weather_effect_settings['autumn_flakes_leaf'] ) ) {
				$autumn_flakes_leaf = $weather_effect_settings['autumn_flakes_leaf'];
			} else {
				$autumn_flakes_leaf = '';
			}
			if ( isset( $weather_effect_settings['autumn_speed'] ) ) {
				$autumn_speed = $weather_effect_settings['autumn_speed'];
			} else {
				$autumn_speed = '';
			}
			if ( isset( $weather_effect_settings['autumn_leaf'] ) ) {
				$autumn_leaf = $weather_effect_settings['autumn_leaf'];
			} else {
				$autumn_leaf = '';
			}
			?>
			// Autumn Effect Start
				jQuery(document).ready(function(){
						<?php if ( $leaf == 'leaf' ) { ?>
						snowFall.snow(document.body, {
							image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/autumn/'); ?><?php echo esc_js( $autumn_leaf ); ?>.png",
							minSize: <?php echo esc_js( (int) $autumn_min_size_leaf ); ?>, 
							maxSize: <?php echo esc_js( (int) $autumn_max_size_leaf ); ?>, 
							flakeCount: <?php echo esc_js( (int) $autumn_flakes_leaf ); ?>, 
							maxSpeed: <?php echo esc_js( (int) $autumn_speed ); ?>, 
						});
					<?php } ?>
				}); 
			// Autumn Effect End
		<?php } ?> 
		//Autumn_check Weather effect End
	</script>
	<script>
		//winter_check Start
			//Winter snow Falling Start
			<?php
			if ( $weather_occasion == 'winter_check' ) {

				if ( isset( $weather_effect_settings['snow_types'] ) ) {
					$snow_types = $weather_effect_settings['snow_types'];
				} else {
					$snow_types = '';
				}
					// winter_snow
				if ( isset( $weather_effect_settings['ice_cube'] ) ) {
					$ice_cube = $weather_effect_settings['ice_cube'];
				} else {
					$ice_cube = '';
				}
				if ( isset( $weather_effect_settings['min_size_christmas'] ) ) {
					$min_size_christmas = $weather_effect_settings['min_size_christmas'];
				} else {
					$min_size_christmas = '';
				}
				if ( isset( $weather_effect_settings['max_size_christmas'] ) ) {
					$max_size_christmas = $weather_effect_settings['max_size_christmas'];
				} else {
					$max_size_christmas = '';
				}
				if ( isset( $weather_effect_settings['flake_christmas'] ) ) {
					$flake_christmas = $weather_effect_settings['flake_christmas'];
				} else {
					$flake_christmas = '';
				}
					// falling_snow
				if ( isset( $weather_effect_settings['min_size_falling'] ) ) {
					$min_size_falling = $weather_effect_settings['min_size_falling'];
				} else {
					$min_size_falling = '';
				}
				if ( isset( $weather_effect_settings['max_size_falling'] ) ) {
					$max_size_falling = $weather_effect_settings['max_size_falling'];
				} else {
					$max_size_falling = '';
				}
				if ( isset( $weather_effect_settings['snow_falling_time'] ) ) {
					$snow_falling_time = $weather_effect_settings['snow_falling_time'];
				} else {
					$snow_falling_time = '';
				}
				if ( isset( $weather_effect_settings['snow_falling_color'] ) ) {
					$snow_falling_color = $weather_effect_settings['snow_falling_color'];
				} else {
					$snow_falling_color = '';
				}

					// 1. Winter Snow start
				if ( $snow_types == 'winter_snow' ) {
					?>
						jQuery(document).ready(function(){
							jQuery(document).snowfall({deviceorientation : false,
								round : <?php echo esc_js( $ice_cube ); ?>,  //snow structure Round or Cube
								minSize: <?php echo esc_js( (int) $min_size_christmas ); ?>,  // snow size
								maxSize: <?php echo esc_js( (int) $max_size_christmas ); ?>,   // snow cube size
								flakeCount : <?php echo esc_js( (int) $flake_christmas ); ?>,  // snow cube quantity
							}); 
						});
					<?php } ?>
					//Winter Snow End
					//2. falling snow Start	
					<?php if ( $snow_types == 'falling_snow' ) { ?>
						jQuery(document).ready( function(){
							jQuery.fn.snow({
								minSize:<?php echo esc_js( (int) $min_size_falling ); ?>, 
								maxSize:<?php echo esc_js( (int) $max_size_falling ); ?>, 
								newOn:<?php echo esc_js( (int) $snow_falling_time ); ?>, 
								flakeColor:'<?php echo esc_js( $snow_falling_color ); ?>'
							});
						});
					<?php } ?> 
		<?php } ?> 
			//Winter Falling End
		//winter_check end
	</script>
	<style>
		.we-flake{
			color: <?php echo esc_html( $snow_falling_color ); ?> !important;
		}
	</style>
	<script>
		// spring_check Effect End
		<?php
		if ( $weather_occasion == 'spring_check' ) {
			if ( isset( $weather_effect_settings['leaf_spring'] ) ) {
				$leaf_spring = $weather_effect_settings['leaf_spring'];
			} else {
				$leaf_spring = '';
			}
			if ( isset( $weather_effect_settings['spring_leaf'] ) ) {
				$spring_leaf = $weather_effect_settings['spring_leaf'];
			} else {
				$spring_leaf = '';
			}
			?>
				// spring Effect Start
					jQuery(document).ready(function(){
						<?php if ( $leaf_spring == 'leaf_spring' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/spring/'); ?><?php echo esc_js( $spring_leaf ); ?>.png",
								minSize: <?php echo esc_js( (int) $spring_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $spring_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $spring_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $spring_speed ); ?>, 
							});
						<?php } ?>
					}); 
				// spring Effect End
	   <?php } ?> 
	</script>
	<script>
		// summer_check Effect Start
		<?php
		if ( $weather_occasion == 'summer_check' ) {
			if ( isset( $weather_effect_settings['drink'] ) ) {
				$drink = $weather_effect_settings['drink'];
			} else {
				$drink = '';
			}
			if ( isset( $weather_effect_settings['sun'] ) ) {
				$sun = $weather_effect_settings['sun'];
			} else {
				$sun = '';
			}
			if ( isset( $weather_effect_settings['summer_drink'] ) ) {
				$summer_drink = $weather_effect_settings['summer_drink'];
			} else {
				$summer_drink = '';
			}
			if ( isset( $weather_effect_settings['summer_sun'] ) ) {
				$summer_sun = $weather_effect_settings['summer_sun'];
			} else {
				$summer_sun = '';
			}

			?>
			// Summer Effect Start
				jQuery(document).ready(function(){
					<?php if ( $drink == 'drink' ) { ?>
						snowFall.snow(document.body, {
							image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/summer/'); ?><?php echo esc_js( $summer_drink ); ?>.png",
							minSize: <?php echo esc_js( (int) $summer_min_size_leaf ); ?>, 
							maxSize: <?php echo esc_js( (int) $summer_max_size_leaf ); ?>, 
							flakeCount: <?php echo esc_js( (int) $summer_flakes_leaf ); ?>, 
							maxSpeed: <?php echo esc_js( (int) $summer_speed ); ?>, 
						});
					<?php } ?>
					<?php if ( $sun == 'sun' ) { ?>
						snowFall.snow(document.body, {
							image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/summer/'); ?><?php echo esc_js( $summer_sun ); ?>.png",
							minSize: <?php echo esc_js( (int) $summer_min_size_leaf ); ?>, 
							maxSize: <?php echo esc_js( (int) $summer_max_size_leaf ); ?>, 
							flakeCount: <?php echo esc_js( (int) $summer_flakes_leaf ); ?>, 
							maxSpeed: <?php echo esc_js( (int) $summer_speed ); ?>, 
						});
					<?php } ?>
				}); 
			// Summer Effect End
		<?php } ?>  //summer_check Effect End
	</script>
	<script>
		//halloween_check  Start
		<?php
		if ( $weather_occasion == 'halloween_check' ) {
			if ( isset( $weather_effect_settings['ghost'] ) ) {
				$ghost = $weather_effect_settings['ghost'];
			} else {
				$ghost = '';
			}
			if ( isset( $weather_effect_settings['bats'] ) ) {
				$bats = $weather_effect_settings['bats'];
			} else {
				$bats = '';
			}
			if ( isset( $weather_effect_settings['moon'] ) ) {
				$moon = $weather_effect_settings['moon'];
			} else {
				$moon = '';
			}
			if ( isset( $weather_effect_settings['pumpkin'] ) ) {
				$pumpkin = $weather_effect_settings['pumpkin'];
			} else {
				$pumpkin = '';
			}
			if ( isset( $weather_effect_settings['web'] ) ) {
				$web = $weather_effect_settings['web'];
			} else {
				$web = '';
			}
			if ( isset( $weather_effect_settings['witch'] ) ) {
				$witch = $weather_effect_settings['witch'];
			} else {
				$witch = '';
			}
			if ( isset( $weather_effect_settings['halloween_ghost'] ) ) {
				$halloween_ghost = $weather_effect_settings['halloween_ghost'];
			} else {
				$halloween_ghost = '';
			}
			if ( isset( $weather_effect_settings['halloween_bats'] ) ) {
				$halloween_bats = $weather_effect_settings['halloween_bats'];
			} else {
				$halloween_bats = '';
			}
			if ( isset( $weather_effect_settings['halloween_moon'] ) ) {
				$halloween_moon = $weather_effect_settings['halloween_moon'];
			} else {
				$halloween_moon = '';
			}
			if ( isset( $weather_effect_settings['halloween_pumpkin'] ) ) {
				$halloween_pumpkin = $weather_effect_settings['halloween_pumpkin'];
			} else {
				$halloween_pumpkin = '';
			}
			if ( isset( $weather_effect_settings['halloween_web'] ) ) {
				$halloween_web = $weather_effect_settings['halloween_web'];
			} else {
				$halloween_web = '';
			}
			if ( isset( $weather_effect_settings['halloween_witch'] ) ) {
				$halloween_witch = $weather_effect_settings['halloween_witch'];
			} else {
				$halloween_witch = '';
			}

			?>
					// Halloween Effect Start
					jQuery(document).ready(function(){
						<?php if ( $ghost == 'ghost' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/halloween/'); ?><?php echo esc_js( $halloween_ghost ); ?>.png",
								minSize: <?php echo esc_js( (int) $halloween_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $halloween_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $halloween_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $halloween_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $bats == 'bats' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/halloween/'); ?><?php echo esc_js( $halloween_bats ); ?>.png",
								minSize: <?php echo esc_js( (int) $halloween_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $halloween_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $halloween_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $halloween_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $moon == 'moon' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/halloween/'); ?><?php echo esc_js( $halloween_moon ); ?>.png",
								minSize: <?php echo esc_js( (int) $halloween_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $halloween_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $halloween_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $halloween_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $pumpkin == 'pumpkin' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/halloween/'); ?><?php echo esc_js( $halloween_pumpkin ); ?>.png",
								minSize: <?php echo esc_js( (int) $halloween_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $halloween_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $halloween_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $halloween_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $web == 'web' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/halloween/'); ?><?php echo esc_js( $halloween_web ); ?>.png",
								minSize: <?php echo esc_js( (int) $halloween_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $halloween_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $halloween_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $halloween_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $witch == 'witch' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/halloween/'); ?><?php echo esc_js( $halloween_witch ); ?>.png",
								minSize: <?php echo esc_js( (int) $halloween_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $halloween_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $halloween_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $halloween_speed ); ?>, 
							});
						<?php } ?>
					}); 
					// Halloween Effect End
		  <?php } ?> 
	  //halloween_check End
	</script>
	<script>
		//rainy_check Start
			<?php
			if ( $weather_occasion == 'rainy_check' ) {
				if ( isset( $weather_effect_settings['umbrella'] ) ) {
					$umbrella = $weather_effect_settings['umbrella'];
				} else {
					$umbrella = '';
				}
				if ( isset( $weather_effect_settings['drop'] ) ) {
					$drop = $weather_effect_settings['drop'];
				} else {
					$drop = '';
				}
				if ( isset( $weather_effect_settings['cloud'] ) ) {
					$cloud = $weather_effect_settings['cloud'];
				} else {
					$cloud = '';
				}
				if ( isset( $weather_effect_settings['rain_umbrella'] ) ) {
					$rain_umbrella = $weather_effect_settings['rain_umbrella'];
				} else {
					$rain_umbrella = '';
				}
				if ( isset( $weather_effect_settings['rain_drops'] ) ) {
					$rain_drops = $weather_effect_settings['rain_drops'];
				} else {
					$rain_drops = '';
				}
				if ( isset( $weather_effect_settings['rain_cloud'] ) ) {
					$rain_cloud = $weather_effect_settings['rain_cloud'];
				} else {
					$rain_cloud = '';
				}

				?>
					// Rain Effect Start
					jQuery(document).ready(function(){
						<?php if ( $umbrella == 'umbrella' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/rain/'); ?><?php echo esc_js( $rain_umbrella ); ?>.png",
								minSize: <?php echo esc_js( (int) $rain_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $rain_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $rain_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $rain_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $drop == 'drop' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/rain/'); ?><?php echo esc_js( $rain_drops ); ?>.png",
								minSize: <?php echo esc_js( (int) $rain_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $rain_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $rain_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $rain_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $cloud == 'cloud' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/rain/'); ?><?php echo esc_js( $rain_cloud ); ?>.png",
								minSize: <?php echo esc_js( (int) $rain_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $rain_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $rain_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $rain_speed ); ?>, 
							});
						<?php } ?>
					}); 
					// Rain Effect End
		  <?php } ?> 
	  //rainy_check end
	</script>
	<script>
		//thanks_giving_check start
			<?php
			if ( $weather_occasion == 'thanks_giving_check' ) {
				if ( isset( $weather_effect_settings['turkey'] ) ) {
					$turkey = $weather_effect_settings['turkey'];
				} else {
					$turkey = '';
				}
				if ( isset( $weather_effect_settings['thanksgiving_turkey'] ) ) {
					$thanksgiving_turkey = $weather_effect_settings['thanksgiving_turkey'];
				} else {
					$thanksgiving_turkey = '';
				}
				?>
				// thanksgiving Effect Start
					jQuery(document).ready(function(){
						<?php if ( $turkey == 'turkey' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/thanksgiving/'); ?><?php echo esc_js( $thanksgiving_turkey ); ?>.png",
								minSize: <?php echo esc_js( (int) $thanksgiving_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $thanksgiving_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $thanksgiving_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $thanksgiving_speed ); ?>, 
							});
						<?php } ?>
					}); 
				// thanksgiving Effect End
			<?php } ?> 
		//thanks_giving_check end
	</script>
	<script>
		//valentine_check start
			<?php
			if ( $weather_occasion == 'valentine_check' ) {
				if ( isset( $weather_effect_settings['rose'] ) ) {
					$rose = $weather_effect_settings['rose'];
				} else {
					$rose = '';
				}
				if ( isset( $weather_effect_settings['balloon'] ) ) {
					$balloon = $weather_effect_settings['balloon'];
				} else {
					$balloon = '';
				}
				if ( isset( $weather_effect_settings['heart'] ) ) {
					$heart = $weather_effect_settings['heart'];
				} else {
					$heart = '';
				}
				if ( isset( $weather_effect_settings['valentine_rose'] ) ) {
					$valentine_rose = $weather_effect_settings['valentine_rose'];
				} else {
					$valentine_rose = '';
				}
				if ( isset( $weather_effect_settings['valentine_balloon'] ) ) {
					$valentine_balloon = $weather_effect_settings['valentine_balloon'];
				} else {
					$valentine_balloon = '';
				}
				if ( isset( $weather_effect_settings['valentine_heart'] ) ) {
					$valentine_heart = $weather_effect_settings['valentine_heart'];
				} else {
					$valentine_heart = '';
				}
				?>
					// valentine Effect Start
					jQuery(document).ready(function(){
						<?php if ( $rose == 'rose' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/valentine/'); ?><?php echo esc_js( $valentine_rose ); ?>.png",
								minSize: <?php echo esc_js( (int) $valentine_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $valentine_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $valentine_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $valentine_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $balloon == 'balloon' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/valentine/'); ?><?php echo esc_js( $valentine_balloon ); ?>.png",
								minSize: <?php echo esc_js( (int) $valentine_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $valentine_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $valentine_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $valentine_speed ); ?>, 
							});
						<?php } ?>
						<?php if ( $heart == 'heart' ) { ?>
							snowFall.snow(document.body, {
								image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/valentine/'); ?><?php echo esc_js( $valentine_heart ); ?>.png",
								minSize: <?php echo esc_js( (int) $valentine_min_size_leaf ); ?>, 
								maxSize: <?php echo esc_js( (int) $valentine_max_size_leaf ); ?>, 
								flakeCount: <?php echo esc_js( (int) $valentine_flakes_leaf ); ?>, 
								maxSpeed: <?php echo esc_js( (int) $valentine_speed ); ?>, 
							});
						<?php } ?>
					}); 
					// valentine Effect End
		<?php } ?> 
		//valentine_check End
	</script>
	<script>
		//new_year_check start
			<?php
			if ( $weather_occasion == 'new_year_check' ) {
				if ( isset( $weather_effect_settings['balloon_new'] ) ) {
					$balloon_new = $weather_effect_settings['balloon_new'];
				} else {
					$balloon_new = '';
				}
				if ( isset( $weather_effect_settings['sticker'] ) ) {
					$sticker = $weather_effect_settings['sticker'];
				} else {
					$sticker = '';
				}
				if ( isset( $weather_effect_settings['newyear_balloon'] ) ) {
					$newyear_balloon = $weather_effect_settings['newyear_balloon'];
				} else {
					$newyear_balloon = '';
				}
				if ( isset( $weather_effect_settings['new_year_sticker'] ) ) {
					$new_year_sticker = $weather_effect_settings['new_year_sticker'];
				} else {
					$new_year_sticker = '';
				}
				?>
					// new_year Effect Start
						jQuery(document).ready(function(){
								<?php if ( $balloon_new == 'balloon_new' ) { ?>
								snowFall.snow(document.body, {
									image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/newyear/'); ?><?php echo esc_js( $newyear_balloon ); ?>.png",
									minSize: <?php echo esc_js( (int) $newyear_min_size_leaf ); ?>, 
									maxSize: <?php echo esc_js( (int) $newyear_max_size_leaf ); ?>, 
									flakeCount: <?php echo esc_js( (int) $newyear_flakes_leaf ); ?>, 
									maxSpeed: <?php echo esc_js( (int) $newyear_speed ); ?>, 
								});
							<?php } ?>
								<?php if ( $sticker == 'sticker' ) { ?>
								snowFall.snow(document.body, {
									image : "<?php echo esc_url(plugin_dir_url( __FILE__ ).'assets/images/newyear/'); ?><?php echo esc_js( $new_year_sticker ); ?>.png",
									minSize: <?php echo esc_js( (int) $newyear_min_size_leaf ); ?>, 
									maxSize: <?php echo esc_js( (int) $newyear_max_size_leaf ); ?>, 
									flakeCount: <?php echo esc_js( (int) $newyear_flakes_leaf ); ?>, 
									maxSpeed: <?php echo esc_js( (int) $newyear_speed ); ?>, 
								});
							<?php } ?>
						}); 
					// new_year Effect End
		<?php } ?> 
		//new_year_check end
	</script>
