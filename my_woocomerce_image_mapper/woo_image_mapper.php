<?php
/*
Plugin Name: Woocomerce Image Mapper
Plugin URI: http://www.shindiristudio.com/imagemapper/
Description: Woocommerce Image Mapper for Wordpress
Author: Br0
Version: 2.1
Author URI: http://www.shindiristudio.com/
*/
if(!defined('ABSPATH'))die('');
if (!class_exists("WooImageMapperAdmin")) 
{
	require_once dirname( __FILE__ ) . '/woo_image_mapper_class.php';	
	$imagemapper = new WooImageMapperAdmin (__FILE__);
}
