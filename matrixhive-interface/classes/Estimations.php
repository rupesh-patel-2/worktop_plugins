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

    public static function print(){

       // echo "here";exit;
        
        $result = Api::get('api/print_estimation/'.$_GET['id']);
        //var_dump($result['headers'] );exit;
        if($result['http_status'] == 200){
            header("Cache-Control: maxage=1");
            header("Pragma: public");
            header("Content-type: application/pdf");
            header("Content-Disposition: inline; filename=Estimate.pdf");
            header("Content-Description: PHP Generated Data");
            header("Content-Transfer-Encoding: binary");
            echo $result['response'];
        }
        exit;
    }

    public function confirmOrder(){
        header('Content-Type: application/json; charset=utf-8');
        $result = Api::post('api/confirm_order',$_POST);
        echo $result['response'];exit;
    }
    
}