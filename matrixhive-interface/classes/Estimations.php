<?php
namespace MatrixHive;
use \MatrixHive\Api;
use \MatrixHive\Session;

Class Estimations{
    public static  function saveEstimation(){
        header('Content-Type: application/json; charset=utf-8');
        
        $params = $_POST['estimation'];
        $response = [];
        $result = Api::post('api/save_quotation',$params);
        //var_dump($result['response']);exit;
        if($result['http_status'] == 200){
            $response = json_decode($result['response']);
        } 
        //var_dump($result);
        echo json_encode($response);
        exit;
    }

    public static function getDetails(){
        header('Content-Type: application/json; charset=utf-8');
        
        //var_dump($_POST['estimation_id']);exit;
        $response = [];
        $result = Api::get('api/get_estimation_details/'.$_POST['estimation_id']);
        
        if($result['http_status'] == 200){
            $response = json_decode($result['response']);
        } 
        //var_dump($result);
        echo json_encode($response);
        exit;
    }

    
}