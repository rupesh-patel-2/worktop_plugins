	<?php
	/*
	 * WARNING: DO NOT REMOVE THIS TAG!
	 * We use the admin_head() hook to locate the template where we want, and that imply manually closing the <head> tag
	 */
	?>
	</head>

	<?php
		$site_types = One_And_One_Assistant_Sitetype_Filter::get_sitetypes();
		$action = isset( $_GET[ 'setup_action' ] ) ? sanitize_text_field( $_GET[ 'setup_action' ] ) : 'choose_appearance';
	?>

	<body class="oneandone">
		<div class="page-gradient-overlay"></div>

		<section class="header">
			<img src="<?php echo One_And_One_Assistant::get_images_url( '1and1-small.png' ); ?>"> WordPress
		</section>

		<section class="card-container">
			<div class="card">
				<div class="card-bg"></div>
				<div class="card-bg card-weave-red"></div>
				<div class="card-bg card-weave-blue"></div>

				<div class="card-step<?php echo ( $action === 'greeting' ) ? ' active' : '' ?>" id="card-greeting">
					<?php One_And_One_Assistant_View::load_template( 'assistant-greeting-step' ); ?>
				</div>

				<div class="card-step<?php echo ( $action === 'choose_appearance' ) ? ' active' : '' ?>" id="card-design">
					<?php One_And_One_Assistant_View::load_template( 'assistant-design-step' ); ?>
				</div>

				<div class="card-step" id="card-install">
					<?php One_And_One_Assistant_View::load_template( 'assistant-install-step' ); ?>
				</div>
			</div>
		</section>

		<?php
			do_action( 'admin_footer', '' );
			do_action( 'admin_print_footer_scripts' );
		?>
	</body>
</html>