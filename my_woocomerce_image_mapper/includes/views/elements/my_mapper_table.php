<?php
if(!defined('ABSPATH'))die('');
$file=MY_WOO_IMAGE_MAPPER_CLASS_DIRNAME.'class-wp-my-image-mapper-table-view.php';
require_once $file;
$ret=my_woo_image_mapper_get_mappers(10);
$my_table_view=new Class_Wp_My_Image_Mapper_Table_View(array('id'=>'my_mappers','columns'=>$ret['columns'],'data'=>$ret,'actions'=>$ret['actions']));
echo $my_table_view->render();