<?php
namespace MatrixHive;
use \MatrixHive\Api;
use \MatrixHive\Session;

Class Products{
    public static  function findProducts(){
       header('Content-Type: application/json; charset=utf-8');
        
        $params = [
            'slug' => $_POST['slug']
        ];
        $response = [];
        $result = Api::get('api/products',$params);
        if($result['http_status'] == 200){
            $response = json_decode($result['response']);
        } 
        //var_dump($result);
        echo json_encode($response);
        exit;
    }

    public static function estimateData(){
        header('Content-Type: application/json; charset=utf-8');
        
        $params = [
            'slug' => $_POST['slug']
        ];
        $response = [];
        $result = Api::get('api/estimation_data',$params);
        if($result['http_status'] == 200){
            $response = json_decode($result['response']);
        } 
        //var_dump($result);
        echo json_encode($response);
        exit;
    }

    
}